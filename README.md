# AgentiCCells website

Static site for agenticcells.ai, built from files with Node only (v22, no dependencies). Rules: see CLAUDE.md. What exists: see REALITY.md.

## Layout
`content/` markdown pages with `title` and `description` front matter; `data/` JSON (`cells.json` is the ladder, every price a first proposal); `build/` build and validator; `assets/` css; `CNAME`; `.github/workflows/pages.yml`.

## Build and check
```
node build/build.mjs     # writes site/ (not committed)
node build/validate.js   # must print OK
```
Open `site/index.html` to look at it.

## Release
1. Work on a `claude/` branch; run build and validate; both must pass. Never weaken a check.
2. Commit with an `Agent: role@agenticcells.person` trailer.
3. Dinis merges to `dev` (the default branch). The workflow builds, validates and deploys to GitHub Pages. In the repository settings, Pages source must be "GitHub Actions" and the custom domain agenticcells.ai.

## Versions
Set by the Pages workflow, never by hand or by an agent. The first release is v0.1.0; every push to `dev` that deploys becomes the next patch (v0.1.1, v0.1.2, ...). The workflow tags the released commit and writes the number into the footer and `site/version.json`. Major and minor (`VERSION_BASE` in the workflow) change only when Dinis says.

Licences: code Apache-2.0, text and images CC BY 4.0.
