// ACC-015: every non-merge commit a push adds to dev must carry a readable Agent: trailer,
// read the way git reads it: git log --format=%(trailers:key=Agent,valueonly).
// Usage: node build/check-commits.mjs <before> <after>   (the pushed range, before..after)
// Commits older than this check are skipped: those that neither descend from the commit
// that added this file nor were committed after it. History is not rewritten (ACC-015).
// Prints OK or lists each commit that fails and exits 1.
import { execFileSync } from 'node:child_process';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const tryGit = (...args) => { try { return git(...args); } catch { return null; } };
const lines = (s) => (s ? s.split('\n').filter(Boolean) : []);

const [beforeArg, afterArg] = process.argv.slice(2);
const after = afterArg || 'HEAD';
if (!tryGit('rev-parse', '--verify', '--quiet', `${after}^{commit}`)) { console.error(`check-commits: unknown commit ${after}`); process.exit(1); }

const first = lines(git('log', '--format=%H', '--diff-filter=A', '--reverse', after, '--', 'build/check-commits.mjs'))[0];
if (!first) { console.error('check-commits: cannot find the commit that added build/check-commits.mjs'); process.exit(1); }
const firstTime = Number(git('log', '-1', '--format=%ct', first));

// A new branch, a forced push or a manual run has no usable "before": check everything since the check began.
const zero = /^0+$/;
const before = beforeArg && !zero.test(beforeArg) && tryGit('rev-parse', '--verify', '--quiet', `${beforeArg}^{commit}`);
const range = before ? [`${before}..${after}`] : [after];
const added = lines(git('rev-list', '--no-merges', ...range));
const descendants = new Set([first, ...lines(git('rev-list', '--ancestry-path', `${first}..${after}`))]);

const agentShape = /^[a-z0-9][a-z0-9-]*@agenticcells\.[a-z0-9][a-z0-9.-]*$/i;
const errors = [];
let checked = 0;
for (const c of added) {
  const ct = Number(git('log', '-1', '--format=%ct', c));
  if (!descendants.has(c) && ct < firstTime) continue;
  checked++;
  const agents = lines(git('log', '-1', '--format=%(trailers:key=Agent,valueonly)', c)).map((s) => s.trim());
  const subject = git('log', '-1', '--format=%s', c);
  if (!agents.length) errors.push(`${c.slice(0, 7)} ${subject}: no readable Agent: trailer (it must sit in the final trailer block)`);
  else if (!agents.every((a) => agentShape.test(a))) errors.push(`${c.slice(0, 7)} ${subject}: Agent: trailer is not role@agenticcells.person (${agents.join(', ')})`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`FAILED (${errors.length} of ${checked} commits checked)`);
  process.exit(1);
}
console.log(`OK (${checked} commits checked, ${added.length - checked} older than the check skipped)`);
