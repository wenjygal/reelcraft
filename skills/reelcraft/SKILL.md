# /reelcraft

Turn the current project into a short video: a marketing launch reel, or a
step-by-step training video. Renders through Remotion. Uses free/royalty-free
assets by default.

## Invocation

```
/reelcraft --mode <marketing|training> [options]
```

`--mode` is required — this skill does not guess between marketing and training.
If the user didn't specify one and it isn't obvious from context (e.g. "make a
launch video" vs "make an onboarding/how-to video"), ask before proceeding.

## Options

| Flag | Values | Default | Notes |
|---|---|---|---|
| `--mode` | `marketing` \| `training` | *(required)* | Picks the storyboard rubric and the Remotion template. |
| `--tone` | preset name or freeform text | `default` | See `references/tones.md`. Freeform text overrides/refines a preset. |
| `--format` | `landscape` \| `vertical` \| `square` | `landscape` for training, `vertical` for marketing | |
| `--duration` | seconds | mode default (training: 60–180s, marketing: 15–25s) | |
| `--title` | text | inferred from project | |
| `--voice` | flag | off | Enables voiceover narration. See `references/voiceover.md`. |
| `--voice-lang` | `en` \| `he` | `en` | Only meaningful with `--voice`. |
| `--no-music` | flag | off | Skip background music. |
| `--no-sfx` | flag | off | Skip sound effects. |

## Process

Run these four steps in order. Each writes one artifact into
`reelcraft-output-YYYY-MM-DD-HHmmss/` in the current project's root (create it if
missing; never overwrite a previous run — each run gets its own timestamped folder).

1. `references/steps/step-1-inspect.md` — understand the project (no file output).
2. `references/steps/step-2-plan.md` — writes `reelcraft-plan.md`.
3. `references/steps/step-3-compose.md` — writes `composition-config.json` (+ copies
   chosen audio into the output folder).
4. `references/steps/step-4-deliver.md` — renders `reelcraft.mp4`, extracts the
   poster frame, and (marketing mode only) writes `share-copy.txt`.

Do not skip steps or merge them — each step's output is the next step's input, and
skipping the plan step is what produces generic, unspecific videos.

## Hard constraints (both modes)

- Every visual claim must be backed by something actually observed in step 1. Do not
  invent UI, features, or numbers that aren't in the code.
- Use only assets from `assets/music/` and `assets/sfx/` (or a `--voice` provider
  listed in `references/voiceover.md`). Never fetch audio from the network at
  render time — licensing is only guaranteed for what's vendored in this repo.
- If `--mode training` and the project has no clear step-by-step flow to teach,
  say so and ask the user to point you at the flow, rather than fabricating steps.

## Output

```
reelcraft-output-<timestamp>/
  reelcraft-plan.md
  composition-config.json
  reelcraft.mp4
  reelcraft.jpg          # poster frame, baked as frame 0
  share-copy.txt         # marketing mode only
```
