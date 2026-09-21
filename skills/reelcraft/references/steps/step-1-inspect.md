# Step 1 — Inspect

Read the project before writing anything. Do not skip to planning from a guess.

Read, in this order: `README.md`, `package.json` (or equivalent manifest), the
entry point / main route, the core UI components or screens, and — if present —
existing docs or a CHANGELOG. For `--mode training`, also find the actual user
flow you'll be teaching (the sequence of screens/actions a real user goes through).

Answer the rubric for the active mode. Do not write a file yet — this step's output
is your own understanding, carried into step 2.

## Marketing rubric

1. What does this app/tool actually do, in one sentence?
2. What's the single most impressive or surprising thing about it?
3. What's the strongest visual hook — a screen, an interaction, a result — that
   proves the above rather than just claiming it?
4. What UI/output should the video actually show on screen?
5. What's the shortest version of this story that still feels satisfying (not just
   short)?
6. What tone fits this project honestly? (see `tones.md` — don't force "cinematic"
   onto a utility script)
7. What should the audio feel like — energetic, minimal, playful?
8. Draft a one-line share caption.
9. What are the user-flow beats worth showing, in order?

## Training rubric

1. What is the end result the viewer should be able to do after watching?
2. What are the discrete steps between "before" and that end result? List them in
   order — this becomes the scene list. Don't compress multiple distinct actions
   into one step; don't split one action into several.
3. For each step: what's on screen, and what's the one thing the viewer needs to
   notice (a button, a field, a state change)?
4. What's the "before" state worth showing at the start, and the "after"/result
   worth showing at the end?
5. What's a realistic pace — long enough that on-screen text/actions are readable,
   not so long it drags? (training scenes run longer than marketing scenes — see
   SKILL.md duration defaults)
6. What tone fits — usually calmer and more literal than marketing; avoid hype
   language ("game-changing", "revolutionary") in instructional copy.
7. Does anything need narration to make sense (e.g. a config value, a "why"), or is
   on-screen caption text enough?

If the project doesn't have a clear step-by-step flow to teach, stop and ask the
user to point you at one instead of inventing steps.
