// The team's console, read-only (ACC-007). A page module for build.mjs's page hook:
// default async function(ctx) returning [{path, title, description, html}].
// At build time it reads board/ACC-*.md, team/keys.json (and team/keys/*.json not yet
// merged), team/activity/*.jsonl and git history, and renders /console/ plus one replay
// page per day: /console/<date>/. It also writes site/console/console.json.
// Shows only short fingerprints and short commit hashes, never public keys or full hashes.
// No JavaScript on the page. Code under Apache-2.0.
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Our wording rule: no em dashes, even when quoting older text.
const clean = (s) => String(s ?? '').replace(/—/g, ', ').trim();
const shortHash = (h) => String(h ?? '').slice(0, 7);
const shortFp = (f) => { const m = String(f ?? '').match(/^(sha256:)?([0-9a-f]+)/i); return m ? (m[1] || '') + m[2].slice(0, 16) : ''; };
const day = (t) => String(t).slice(0, 10);
const hhmm = (t) => String(t).slice(11, 16);

function git(root, args) {
  try { return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 << 20 }); }
  catch { return null; }
}

function parseItem(src, file) {
  const lines = src.split('\n');
  const head = (lines[0] || '').match(/^#\s+(ACC-\d+)\s*·\s*(.*)$/);
  const meta = (lines[1] || '').match(/^Owner:\s*(.*?)\s*·\s*Status:\s*(.*)$/);
  return {
    id: head ? head[1] : file.replace(/\.md$/, ''),
    title: clean(head ? head[2] : lines[0].replace(/^#\s*/, '')),
    owner: clean(meta ? meta[1] : ''),
    status: clean(meta ? meta[2] : ''),
  };
}
function statusClass(s) {
  const t = s.toLowerCase();
  if (t.startsWith('done')) return 'done';
  if (t.startsWith('in progress') || t.startsWith('in review')) return 'doing';
  if (t.startsWith('waits') || t.startsWith('blocked')) return 'waits';
  return 'idea';
}

function boardNow(root) {
  const dir = join(root, 'board');
  return readdirSync(dir).filter((f) => /^ACC-\d+\.md$/.test(f)).sort()
    .map((f) => parseItem(readFileSync(join(dir, f), 'utf8'), f));
}
// The board as it was in a given commit.
function boardAt(root, rev) {
  const names = (git(root, ['ls-tree', '--name-only', rev, 'board/']) || '').split('\n')
    .filter((p) => /^board\/ACC-\d+\.md$/.test(p)).sort();
  return names.map((p) => parseItem(git(root, ['show', `${rev}:${p}`]) || '', p.slice(6)));
}

function keyRows(list, merged) {
  return (Array.isArray(list) ? list : [list]).filter((k) => k && k.label).map((k) => ({
    agent: clean(k.label),
    fingerprint: shortFp(k.fingerprint || k.id),
    signing_fingerprint: shortFp(k.signing_fingerprint),
    created: clean(k.created),
    in_keys_json: merged,
  }));
}
function keysNow(root) {
  const keys = existsSync(join(root, 'team/keys.json')) ? keyRows(JSON.parse(readFileSync(join(root, 'team/keys.json'), 'utf8')), true) : [];
  const dir = join(root, 'team/keys');
  if (existsSync(dir)) for (const f of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    for (const k of keyRows(JSON.parse(readFileSync(join(dir, f), 'utf8')), false)) {
      if (!keys.some((x) => x.fingerprint === k.fingerprint)) keys.push(k);
    }
  }
  return keys;
}
function keysAt(root, rev) {
  const src = git(root, ['show', `${rev}:team/keys.json`]);
  try { return src ? keyRows(JSON.parse(src), true) : []; } catch { return []; }
}

function activity(root) {
  const dir = join(root, 'team/activity');
  if (!existsSync(dir)) return [];
  const out = [];
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.jsonl')).sort()) {
    for (const line of readFileSync(join(dir, f), 'utf8').split('\n')) {
      if (!line.trim()) continue;
      try {
        const a = JSON.parse(line);
        out.push({ kind: 'activity', time: clean(a.time), agent: clean(a.agent), item: clean(a.item || '-'),
          action: clean(a.action), summary: clean(a.summary), ...(a.commit ? { commit: shortHash(a.commit) } : {}) });
      } catch { /* a broken line is skipped, not fatal */ }
    }
  }
  return out;
}

function commits(root) {
  const US = '\x1f', RS = '\x1e';
  const raw = git(root, ['log', '--abbrev=7', `--format=%h${US}%aI${US}%P${US}%s${US}%(trailers:key=Agent,valueonly,separator=%x2C)${US}%b${RS}`]);
  if (!raw) return [];
  return raw.split(RS).map((r) => r.replace(/^\n/, '')).filter(Boolean).map((r) => {
    const [h, t, parents, subject, trailer, body] = r.split(US);
    let agent = clean(trailer), source = 'trailer';
    if (!agent) {
      const m = (body || '').match(/^Agent:\s*(\S+@\S+)\s*$/m);
      if (m) { agent = m[1]; source = 'body'; }
      else { agent = ''; source = 'subject only'; }
    }
    const time = new Date(t).toISOString().replace(/\.\d{3}Z$/, 'Z');
    return { kind: 'commit', time, hash: shortHash(h), subject: clean(subject), agent, agent_from: source,
      merge: parents.trim().split(/\s+/).length > 1 };
  });
}

// --- rendering -------------------------------------------------------------

const css = '<link rel="stylesheet" href="/assets/console.css">';

function boardTable(items) {
  if (!items.length) return '<p>No board items.</p>';
  const rows = items.map((i) => `<tr><td><code>${esc(i.id)}</code></td><td>${esc(i.title)}<br><small>${esc(i.owner)}</small></td><td><span class="st st-${statusClass(i.status)}">${esc(i.status)}</span></td></tr>`).join('\n');
  return `<div class="table-wrap"><table class="console-board">\n<thead><tr><th>Item</th><th>What and who</th><th>Status</th></tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>`;
}

function agentsTable(agents) {
  if (!agents.length) return '<p>No agents seen.</p>';
  const rows = agents.map((a) => `<tr><td>${esc(a.agent)}</td><td>${a.fingerprint ? `<code>${esc(a.fingerprint)}</code>${a.in_keys_json ? '' : '<br><small>published, not yet in team/keys.json</small>'}` : '<small>no key published</small>'}</td><td>${a.steps}</td><td>${a.commits}</td><td>${a.last ? esc(a.last.replace('T', ' ').replace('Z', ' UTC')) : '-'}</td></tr>`).join('\n');
  return `<div class="table-wrap"><table class="console-agents">\n<thead><tr><th>Agent</th><th>Key (short fingerprint)</th><th>Steps</th><th>Commits</th><th>Last seen</th></tr></thead>\n<tbody>\n${rows}\n</tbody></table></div>`;
}

function timeline(events) {
  if (!events.length) return '<p>Nothing recorded.</p>';
  return `<ol class="timeline">\n${events.map((e) => e.kind === 'commit'
    ? `<li class="ev ev-commit"><time datetime="${esc(e.time)}">${esc(hhmm(e.time))}</time> <span class="tag">commit</span> <code>${esc(e.hash)}</code> ${esc(e.subject)}<br><small>${e.agent ? esc(e.agent) + (e.agent_from === 'body' ? ' (Agent: line not in the trailer block)' : '') : 'no Agent: trailer'}${e.merge ? ', merge' : ''}</small></li>`
    : `<li class="ev ev-activity"><time datetime="${esc(e.time)}">${esc(hhmm(e.time))}</time> <span class="tag">${esc(e.action)}</span> ${esc(e.summary)}<br><small>${esc(e.agent)}, ${esc(e.item)}${e.commit ? `, commit <code>${esc(e.commit)}</code>` : ''}</small></li>`).join('\n')}\n</ol>`;
}

function agentsFrom(keys, acts, cms) {
  const map = new Map();
  const get = (name) => { if (!map.has(name)) map.set(name, { agent: name, fingerprint: '', signing_fingerprint: '', in_keys_json: false, steps: 0, commits: 0, last: '' }); return map.get(name); };
  for (const k of keys) Object.assign(get(k.agent), { fingerprint: k.fingerprint, signing_fingerprint: k.signing_fingerprint, in_keys_json: k.in_keys_json });
  for (const a of acts) if (a.agent) { const x = get(a.agent); x.steps++; if (a.time > x.last) x.last = a.time; }
  for (const c of cms) if (c.agent) for (const name of c.agent.split(',').map((s) => s.trim()).filter(Boolean)) { const x = get(name); x.commits++; if (c.time > x.last) x.last = c.time; }
  return [...map.values()].sort((a, b) => a.agent.localeCompare(b.agent));
}

export default async function consolePages(ctx = {}) {
  const root = ctx.root || join(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const out = ctx.out || join(root, 'site');
  const version = ctx.version || process.env.SITE_VERSION || 'local';

  const board = boardNow(root);
  const keys = keysNow(root);
  const acts = activity(root);
  const cms = commits(root);
  const hold = existsSync(join(root, 'board/HOLD.md'));
  const head = cms[0] ? cms[0].hash : '';
  const events = [...acts, ...cms].sort((a, b) => (a.time < b.time ? 1 : a.time > b.time ? -1 : a.kind === 'commit' ? -1 : 1));
  const days = [...new Set(events.map((e) => day(e.time)))].sort().reverse();
  const agents = agentsFrom(keys, acts, cms);

  // Replay: the board and keys as committed at the end of each day, with that day's events.
  const replays = days.map((d) => {
    const rev = (git(root, ['rev-list', '-1', `--before=${d}T23:59:59Z`, 'HEAD']) || '').trim();
    const dayEvents = events.filter((e) => day(e.time) === d);
    const dayKeys = rev ? keysAt(root, rev) : [];
    return { date: d, as_of_commit: shortHash(rev), board: rev ? boardAt(root, rev) : [], keys: dayKeys,
      agents: agentsFrom(dayKeys, dayEvents.filter((e) => e.kind === 'activity'), dayEvents.filter((e) => e.kind === 'commit')),
      events: dayEvents };
  });

  const data = {
    about: 'The AgentiCCells team console, read-only. Built from files in the repository at build time. Short fingerprints and short commit hashes only.',
    version, built_from_commit: head, hold: hold ? 'board/HOLD.md exists: the team is stopped' : 'absent',
    board, agents, events, days,
  };
  mkdirSync(join(out, 'console'), { recursive: true });
  writeFileSync(join(out, 'console', 'console.json'), JSON.stringify({ ...data, replays }, null, 1) + '\n');

  const nav = days.length ? `<ul class="days">${days.map((d) => `<li><a href="/console/${d}/">${d}</a></li>`).join('')}</ul>` : '<p>No days recorded yet.</p>';
  const holdLine = hold ? '<p class="hold"><strong>Stopped:</strong> board/HOLD.md exists. No agent works while it is there.</p>'
    : '<p class="hold-ok">Stop file <code>board/HOLD.md</code>: absent, so work may go on.</p>';

  const main = `${css}
<h1>The team's console</h1>
<p>What the AgentiCCells agents are doing, read from the files they keep: the board, their public keys, their activity logs and the git history. Read-only: there are no controls here. Built from commit <code>${esc(head)}</code>, site version ${esc(version)}. Times are UTC. The same data is in <a href="/console/console.json">console.json</a>.</p>
${holdLine}
<h2>Board</h2>
${boardTable(board)}
<h2>Agents and their keys</h2>
<p>Each agent makes its own key pair; only the public half is in the repository. Shown here by short fingerprint.</p>
${agentsTable(agents)}
<h2>Replay a day</h2>
<p>Each day shows the board and keys as they were committed at the end of that day, and everything that happened in it.</p>
${nav}
<h2>Timeline</h2>
${days.map((d) => `<h3><a href="/console/${d}/">${d}</a></h3>\n${timeline(events.filter((e) => day(e.time) === d))}`).join('\n')}
<p><small>Started from the simulated console described in <a href="https://newsroom.sgit.ai/articles/an-agentic-console.html">An agentic console</a>. Steps marked "reconstructed" were logged after the fact.</small></p>`;

  const pages = [{ path: '/console/', title: 'Console: the AgentiCCells team, read-only',
    description: 'The board, the agents and their keys, and a timeline of what the AgentiCCells team did, built from its files.', html: main }];

  for (const r of replays) {
    const i = days.indexOf(r.date);
    const prev = days[i + 1], next = days[i - 1];
    const html = `${css}
<p><a href="/console/">Console</a>${prev ? ` · <a href="/console/${prev}/">${prev}</a>` : ''}${next ? ` · <a href="/console/${next}/">${next}</a>` : ''}</p>
<h1>Replay: ${esc(r.date)}</h1>
<p>The board and keys as committed at the end of ${esc(r.date)} (UTC)${r.as_of_commit ? `, at commit <code>${esc(r.as_of_commit)}</code>` : ''}, and every step and commit that day: ${r.events.length} in all.</p>
<h2>Board at the end of the day</h2>
${boardTable(r.board)}
<h2>Agents that day</h2>
${agentsTable(r.agents)}
<h2>What happened</h2>
${timeline(r.events)}`;
    pages.push({ path: `/console/${r.date}/`, title: `Console replay: ${r.date}`,
      description: `The AgentiCCells board, keys and activity as they were on ${r.date}.`, html });
  }
  return pages;
}
