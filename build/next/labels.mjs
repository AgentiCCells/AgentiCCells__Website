// Labels shared by parts.mjs and design-kit.mjs, kept apart so neither imports the other for them.
// The example label, exactly by kind (designer's rule, team/rounds/2-designer.md): "Made for <name>" only where consent
// to be named is recorded; "Demo"; "Our own"; anything else "Example".
// Moved here from design-kit.mjs by developer.agenticcells-ai@AgentiCCells.dinis, 2026-11-19 (round 3). Code under Apache-2.0.
export function exLabel(x) {
  const kind = String((x && x.kind) || '');
  if (/demo/i.test(kind) || (x && x.demo === true)) return { cls: 'demo', text: 'Demo' };
  if (/our own/i.test(kind)) return { cls: 'own', text: 'Our own' };
  if (/agreed to be named/i.test(kind) && /consent/i.test(String(x.consent_basis || ''))) return { cls: 'owner', text: `Made for ${x.title}` };
  return { cls: 'demo', text: 'Example' };
}

// The label on the offer card and the price blocks: copy.offer_title (the writer's words), never internal names.
export const offerTitle = (copy) => {
  const v = copy && copy.offer_title;
  return typeof v === 'string' && v.trim() ? v.trim() : 'Your own website';
};

// The label wherever a table, figure or the £50 offer card speaks of the website (round R1, writer's R2): copy.website_title
// ("The Sovereign Agentic Website"). offer_title is now the ladder's entry, so it never labels the website.
export const websiteTitle = (copy) => {
  const v = copy && copy.website_title;
  return typeof v === 'string' && v.trim() ? v.trim() : 'The Sovereign Agentic Website';
};
