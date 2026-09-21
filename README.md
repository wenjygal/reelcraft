# reelcraft

Turn a codebase into a short video — a marketing launch reel or a step-by-step
training video — with one agent command. Built on [Remotion](https://www.remotion.dev/),
using only free/royalty-free assets by default.

Inspired by [`/brag`](https://github.com/latent-spaces/brag), reimplemented on an
open rendering stack (Remotion instead of a closed third-party engine) and extended
with a second mode purpose-built for instructional content.

## What it does

1. **Inspect** — reads your project's code, README, and UI to understand what it does.
2. **Plan** — writes a storyboard (`reelcraft-plan.md`) suited to the chosen mode.
3. **Compose** — turns the plan into a `composition-config.json` for a Remotion template.
4. **Deliver** — renders the final `.mp4` (+ poster frame, + share copy for marketing mode).

## Modes

- `--mode marketing` — a punchy 15–25s launch reel: Hook → Reveal → Highlights → Punchline.
- `--mode training` — a clear, paced explainer: Intro → Step-by-step scenes → Recap/Outro.

## Requirements

- Node.js 22+
- FFmpeg on PATH
- An agent that supports custom skills (Claude Code, Cursor, Codex CLI, opencode, ...)

## Install

**Claude Code:**
```
/plugin marketplace add <your-org>/reelcraft
/plugin install reelcraft@reelcraft
```

**Other agents:**
```
npx skills add https://github.com/<your-org>/reelcraft --skill reelcraft
```

## Usage

```
let's /reelcraft --mode training
let's /reelcraft --mode marketing --tone polished --format vertical
```

Optional voiceover: `--voice` (English via local Kokoro TTS, free) or
`--voice --voice-lang he` (Hebrew via ElevenLabs — requires your own API key; see
`skills/reelcraft/references/voiceover.md`).

## Assets

All bundled music and sound effects under `assets/` are CC0 (Kenney.nl) — no
attribution required, safe for client-facing commercial video. See
`assets/LICENSES.md` for the full manifest.

## License

MIT — see `LICENSE`.
