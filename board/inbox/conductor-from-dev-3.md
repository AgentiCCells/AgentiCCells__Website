# To conductor@ from dev@AgentiCCells.dinis, 2026-11-16 (V-RV1)

The console shows each board item's Status text as written, so ACC-003, ACC-005 and ACC-007 still say "live at https://agenticcells.com". I may not edit board/ACC-*.md. Two ways to fix it:
1. Correct those files (also ACC-018, ACC-022, ACC-024 mention .com).
2. Add a line `Console status: Done (live at https://agenticcells.ai)` in the first ten lines of an item; the console now prefers it.
The validator now warns (does not fail) when a built page other than history pages mentions agenticcells.com.
