// D-PARTNER-INFO (designer@AgentiCCells.dinis, 2026-11-17): four inline-SVG figures for the three partner pages.
// Token in content/: {{partner-fig:flow|lanes|fit|money:freelancer|consultancy|firm}} on a line of its own.
// One system (grid, type, line weight, colour roles), one accent and one glyph per partner type (CSS: .pfig[data-p]).
// No script, no external file, no numbers except the 50/50 split Dinis gave (board/BRIEF.md, 2026-11-17 ~19:30 UTC).
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const TYPES = {
  freelancer: { label: 'Freelancer', who: 'You', find: 'YOU', glyph: '<circle cx="12" cy="9" r="4"/><path d="M4 24c0-5 3.5-8 8-8s8 3 8 8"/>' },
  consultancy: { label: 'Consultancy', who: 'You and your team', find: 'YOU AND YOUR TEAM', glyph: '<circle cx="12" cy="9" r="3.4"/><path d="M5 24c0-4.4 3-7 7-7s7 2.6 7 7"/><circle cx="3.5" cy="12" r="2.2"/><circle cx="20.5" cy="12" r="2.2"/>' },
  firm: { label: 'Larger firm', who: 'You and your team', find: 'YOUR TEAM', glyph: '<rect x="3" y="4" width="14" height="20" rx="1.5"/><path d="M17 12h5v12h-5M7 9h2M11 9h2M7 14h2M11 14h2M7 19h2M11 19h2"/>' },
};
const t = (x, y, s, c = 'p-t', a) => `<text class="${c}" x="${x}" y="${y}"${a ? ` text-anchor="${a}"` : ''}>${esc(s)}</text>`;
const lines = (x, y, arr, c = 'p-s', step = 18) => arr.map((s, i) => t(x, y + i * step, s, c)).join('');
const head = (k) => `<g class="p-head" transform="translate(10 6)"><g class="p-glyph">${TYPES[k].glyph}</g></g>${t(40, 25, TYPES[k].label.toUpperCase() + ' PARTNER', 'p-cap')}<line class="p-rule" x1="10" y1="40" x2="350" y2="40"/>`;
const arrowDown = (x, y1, y2) => `<path class="p-ar" d="M${x} ${y1}V${y2}"/><path class="p-ar" d="M${x - 5} ${y2 - 7}L${x} ${y2}L${x + 5} ${y2 - 7}"/>`;
const fig = (k, kind, vb, title, desc, body, cap) => `<figure class="pfig" data-p="${k}" data-kind="${kind}"><svg viewBox="0 0 360 ${vb}" role="img" aria-labelledby="pf-${kind}-${k}-t pf-${kind}-${k}-d"><title id="pf-${kind}-${k}-t">${esc(title)}</title><desc id="pf-${kind}-${k}-d">${esc(desc)}</desc>${head(k)}${body}</svg><figcaption>${cap}</figcaption></figure>`;
const PROPOSAL = 'A proposal: no deal has run through a partner yet.';

// 1. The flow of a deal.
const LAST = {
  freelancer: ['After', 'YOU', ['You sell the care: support, changes,', 'hosting, at prices you set.']],
  consultancy: ['After', 'YOU AND YOUR TEAM', ['Repeat with the next customer: the setup', 'is automated. Keep your own repositories.']],
  firm: ['After', 'YOUR TEAM', ['The next project, case by case, with the', 'experts the work needs.']],
};
function flow(k) {
  const steps = [
    ['Find', TYPES[k].find, ['A customer who wants a website,', 'a workflow or an agent email.']],
    ['Material', 'YOU AND THE CUSTOMER', ['Photos, videos and a short description.', 'Some of it can already be public.']],
    ['Set up by the factory', 'AGENTICCELLS', ['We set up the agent team and its', 'behaviour policies, and load the material.']],
    ['Five designs', 'THE AGENT TEAM', ['The team builds five designs of the site.', 'You and the customer pick and comment.']],
    ['Hand-over', 'AGENTICCELLS', ['The repository moves to the customer\'s', 'GitHub, with its history. You get admin.']],
    LAST[k],
  ];
  const y0 = 66, h = 80;
  const body = `<line class="p-spine" x1="28" y1="${y0 + 10}" x2="28" y2="${y0 + 5 * h + 10}"/>` + steps.map(([a, w, l], i) => {
    const y = y0 + i * h;
    return `<circle class="p-dot${i === 5 ? ' p-dot-open' : ''}" cx="28" cy="${y + 10}" r="15"/>${t(28, y + 15, String(i + 1), 'p-num', 'middle')}${t(56, y + 4, w, 'p-who')}${t(56, y + 24, a, 'p-h')}${lines(56, y + 43, l)}`;
  }).join('');
  const vb = y0 + 5 * h + 74;
  return fig(k, 'flow', vb, `How a deal runs, for a ${TYPES[k].label.toLowerCase()} partner`, `Six steps in order. 1 Find: ${steps[0][1].toLowerCase()} find a customer. 2 Material: photos, videos and a short description from the customer. 3 Set up by the factory: AgentiCCells sets up the agent team and its behaviour policies. 4 Five designs: the agent team builds five designs and the customer chooses. 5 Hand-over: the repository moves to the customer's GitHub with its history and the partner gets admin access. 6 After: ${LAST[k][2].join(' ')}`, body, `The flow of a deal, first conversation to after hand-over. ${PROPOSAL}`);
}

// 2. Who does what: four lanes.
function lanes(k) {
  const mine = {
    freelancer: ['Finds the customer, collects the material,', 'shows the previews, hands over, sells the care.'],
    consultancy: ['Your team finds customers and runs many deals,', 'collects material, shows previews, sells care.'],
    firm: ['Your team leads the project and the customer', 'relationship, and brings the bigger brief.'],
  }[k];
  const roles = ['conductor', 'researcher', 'designer', 'developer', 'security reviewer'];
  let y = 54;
  const lane = (title, tag, h, inner, cls = '') => { const s = `<g class="p-lane ${cls}"><rect class="p-card" x="10" y="${y}" width="340" height="${h}" rx="12"/><rect class="p-band" x="10" y="${y}" width="8" height="${h}" rx="3"/>${t(30, y + 24, title, 'p-h')}${t(340, y + 24, tag, 'p-who', 'end')}${inner(y)}</g>`; y += h + 12; return s; };
  const pos = [[30, 0, 96], [134, 0, 104], [246, 0, 90], [30, 1, 104], [142, 1, 150]];
  const chips = (yy) => roles.map((r, i) => { const [x, row, w] = pos[i]; return `<rect class="p-chip" x="${x}" y="${yy + 38 + row * 34}" width="${w}" height="26" rx="13"/>${t(x + w / 2, yy + 56 + row * 34, r, 'p-chiptxt', 'middle')}`; }).join('');
  const body =
    lane(TYPES[k].who, 'PARTNER', 84, (yy) => lines(30, yy + 46, mine, 'p-s', 18)) +
    lane('AgentiCCells', 'THE FACTORY', 84, (yy) => lines(30, yy + 46, ['Builds the setup and the flow, runs the', 'agent team, hands the site over. Ends there.'], 'p-s', 18), 'p-lane-us') +
    lane('The agent team', 'UNDER POLICIES', 132, (yy) => chips(yy) + t(30, yy + 118, 'Each agent signs its own work and logs it.', 'p-s'), 'p-lane-team') +
    lane('The customer', 'OWNS THE SITE', 84, (yy) => lines(30, yy + 46, ['Gives the photos and words, picks a design,', 'approves it, and owns the repository.'], 'p-s', 18));
  return fig(k, 'lanes', y + 8, `Who does what, for a ${TYPES[k].label.toLowerCase()} partner`, `Four lanes. The partner: ${mine.join(' ')} AgentiCCells: builds the setup and the flow, runs the agent team and hands the site over; its job ends there. The agent team: a conductor, researcher, designer, developer and security reviewer, each under a behaviour policy, each signing its own work. The customer: gives photos and words, chooses and approves a design, and owns the repository.`, body, `Four parties and what each does. The agent team's roles are our own team's; the behaviour policies come from riskmandate.ai.`);
}

// 3. How it fits together.
function fitFig(k) {
  const body =
    `<g class="p-lane"><rect class="p-card p-us" x="10" y="54" width="150" height="58" rx="10"/>${t(24, 78, 'You', 'p-h')}${t(24, 98, 'bring the business', 'p-s')}</g>` +
    `<g class="p-lane"><rect class="p-card" x="200" y="54" width="150" height="58" rx="10"/>${t(214, 78, 'The customer', 'p-h')}${t(214, 98, 'wants the site', 'p-s')}</g>` +
    `<path class="p-ar" d="M164 83H196"/><path class="p-ar" d="M188 78L196 83L188 88"/>` +
    arrowDown(85, 112, 146) + t(96, 134, 'material', 'p-s') +
    `<rect class="p-card p-big" x="10" y="146" width="340" height="164" rx="12"/>${t(26, 170, 'AGENTICCELLS FACTORY', 'p-who')}` +
    ['conductor', 'researcher', 'designer', 'developer', 'security reviewer'].map((r, i) => { const xs = [26, 126, 226, 26, 126][i], ws = [90, 90, 90, 90, 150][i], yy = i < 3 ? 182 : 216; return `<rect class="p-chip" x="${xs}" y="${yy}" width="${ws}" height="26" rx="13"/>${t(xs + ws / 2, yy + 18, r, 'p-chiptxt', 'middle')}`; }).join('') +
    `<rect class="p-pol" x="26" y="254" width="308" height="42" rx="8"/>${t(180, 272, 'Behaviour policies for every agent', 'p-polt', 'middle')}${t(180, 288, 'from riskmandate.ai', 'p-who', 'middle')}` +
    arrowDown(180, 310, 346) + t(192, 334, 'hand-over', 'p-s') +
    `<rect class="p-card p-dashed" x="10" y="346" width="340" height="132" rx="12"/>${t(26, 370, 'THE CUSTOMER\'S OWN ACCOUNTS', 'p-who')}` +
    `<rect class="p-card" x="26" y="382" width="148" height="80" rx="10"/>${t(40, 406, 'GitHub', 'p-h')}${lines(40, 426, ['The repository,', 'with its history.'], 'p-s', 16)}` +
    `<rect class="p-card" x="186" y="382" width="148" height="80" rx="10"/>${t(200, 406, 'Claude', 'p-h')}${lines(200, 426, ['Manages the site', 'after hand-over.'], 'p-s', 16)}`;
  return fig(k, 'fit', 494, `How it fits together, for a ${TYPES[k].label.toLowerCase()} partner`, 'The partner brings the business and sells to the customer. The partner sends the material to the AgentiCCells factory, where the conductor, researcher, designer, developer and security reviewer work under agent behaviour policies from riskmandate.ai. The factory hands the site over into the customer\'s own accounts: a GitHub repository with its history, and Claude to manage the site afterwards. The partner gets admin access to the repository.', body, 'How the parts connect. The partner gets admin access to the delivered repository; the customer owns it.');
}

// 4. The money.
function money(k) {
  const keep = ['hosting', 'support', 'retainers', 'subscriptions', 'changes', 'installation'];
  const caseBy = k === 'firm' ? 'Larger projects: the split is agreed case by case, before work starts.' : 'Payment terms are agreed for each deal.';
  const body =
    `<rect class="p-card" x="10" y="54" width="340" height="62" rx="10"/>${t(26, 80, 'The customer pays for the site', 'p-h')}${t(26, 101, 'Whoever has the customer invoices.', 'p-s')}` +
    arrowDown(180, 116, 150) +
    `<rect class="p-split p-us" x="10" y="150" width="166" height="84" rx="10"/><rect class="p-split p-them" x="184" y="150" width="166" height="84" rx="10"/>` +
    t(93, 188, '50%', 'p-big p-big-on', 'middle') + t(267, 188, '50%', 'p-big', 'middle') + t(93, 214, 'You', 'p-on', 'middle') + t(267, 214, 'AgentiCCells', 'p-split-txt', 'middle') +
    t(180, 256, 'The split of the sale, when we are involved.', 'p-s', 'middle') +
    `<rect class="p-card p-dashed" x="10" y="276" width="340" height="132" rx="12"/>${t(26, 302, 'What you keep entirely, at your prices', 'p-h')}` +
    keep.map((w, i) => { const col = i % 2, row = (i / 2) | 0; return `<rect class="p-chip" x="${26 + col * 160}" y="${316 + row * 28}" width="148" height="24" rx="12"/>${t(100 + col * 160, 333 + row * 28, w, 'p-chiptxt', 'middle')}`; }).join('') +
    t(180, 436, 'We take no share and no part of these.', 'p-s', 'middle') + t(180, 458, caseBy, 'p-s', 'middle');
  return fig(k, 'money', 472, `The money, for a ${TYPES[k].label.toLowerCase()} partner`, `The customer pays for the site; whoever has the customer invoices. The sale is split 50 percent to the partner and 50 percent to AgentiCCells when we are involved. The partner keeps entirely, at their own prices: hosting, support, retainers, subscriptions, changes and installation. AgentiCCells takes no share of these. ${caseBy}`, body, `The 50/50 split is Dinis Cruz's, 2026-11-17 (<a href="https://github.com/AgentiCCells/AgentiCCells__Website/blob/dev/board/briefs/website-cell-sales-2026-11-17.md">the brief</a>). A proposal, not a contract.`);
}

const KINDS = { flow, lanes, fit: fitFig, money };
export function partnerFig(kind, type) {
  if (!KINDS[kind] || !TYPES[type]) throw new Error(`partner-fig: unknown ${kind}:${type}`);
  return KINDS[kind](type);
}
export const PARTNER_FIG_RE = /^\{\{partner-fig:(flow|lanes|fit|money):(freelancer|consultancy|firm)\}\}$/;
