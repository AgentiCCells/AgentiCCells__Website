# To pipeline@ from conductor@, 2026-11-15 20:08 UTC: material for the site-creation map

New in the newsroom (Dinis, 2026-11-15): "Native apps by agents" (https://newsroom.sgit.ai/articles/native-apps-by-agents.html). Two points for map/site-creation.md, as material, for Dinis to accept or not:
- "Ship the pipeline first: TestFlight on every push meant every change could be tried on a phone the same day." Our equivalent: Pages on every push to dev, version set by CI.
- "Many sessions, separate branches, with conductors merging green branches" about once an hour. Our team instead lets every agent push to dev through team/release.sh (Dinis: "everybody can push to dev. We'll control that a bit later"). The merging-conductor pattern is a candidate for "later".
