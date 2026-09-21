# Step 3 — Compose

Turn `reelcraft-plan.md` into `composition-config.json` in the output folder. This
file is consumed directly by the matching Remotion composition
(`renderer/src/MarketingReel.tsx` or `renderer/src/TrainingReel.tsx`) as props — do
not generate or edit any `.tsx` file per run. The two templates already exist and
are generic; your only job here is to fill in this config correctly.

## Crop screenshots tight before referencing them

A raw full-viewport screenshot of a mobile web app is mostly dead background —
content usually clusters in one area, not the whole capture. `SceneMedia`
renders each screenshot at its own natural size (no forced aspect ratio), so a
loose screenshot just shows as a card that's mostly empty. Before copying a
screenshot into `media/screenshots/`, crop it to its actual content bounding
box (plus a little padding) — if the meaningful UI spans two separate regions
with a large empty gap between them (e.g. a header and a footer with dead
space in between), crop and stack those regions into one tighter composite
instead of shipping the gap.

## Media paths are relative to `<output folder>/media/`

Copy every asset the config references — the chosen music track, any SFX cues,
screenshots you captured — into `<output folder>/media/` (e.g.
`media/music/<file>.mp3`, `media/screenshots/<name>.png`), then reference them in
the JSON below by their path *relative to `media/`* (e.g. `"musicTrack":
"music/<file>.mp3"`). Step 4 renders with `--public-dir` pointed at this `media/`
folder, so these are the paths Remotion's `staticFile()` will resolve — an
absolute or repo-relative path here will fail to load at render time.

## Schema

```jsonc
{
  "mode": "marketing", // or "training"
  "title": "string",
  "format": "landscape", // "landscape" | "vertical" | "square"
  "fps": 30,
  "durationInFrames": 600, // fps * target seconds
  "theme": {
    "primaryColor": "#hex",   // pulled from the actual product's UI, not guessed
    "backgroundColor": "#hex",
    "fontFamily": "Heebo",    // "Heebo" or "Rubik" for Hebrew content, else a Google Font
    "rtl": false              // true if title/captions are Hebrew
  },
  "audio": {
    "musicTrack": "music/<file>.mp3", // copied from assets/music/ — see "Media paths" above
    "musicVolume": 0.35,
    "sfxEnabled": true,
    "voiceover": null // or { "lang": "en", "clips": [{ "sceneId": "step-1", "text": "..." }] }
  },
  "scenes": [ /* mode-specific — see below */ ]
}
```

### Marketing scenes

```jsonc
{ "id": "hook", "kind": "hook", "durationInFrames": 75, "text": "...", "mediaRef": "screenshot or null" }
{ "id": "reveal", "kind": "reveal", "durationInFrames": 90, "text": "...", "mediaRef": "..." }
{ "id": "highlight-1", "kind": "highlight", "durationInFrames": 150, "text": "...", "mediaRef": "...", "sfxCue": "sfx/<file>.mp3" }
{ "id": "punchline", "kind": "punchline", "durationInFrames": 90, "text": "..." }
```

### Training scenes

```jsonc
{ "id": "before", "kind": "before", "durationInFrames": 120, "caption": "...", "mediaRef": "..." }
{ "id": "step-1", "kind": "step", "stepNumber": 1, "durationInFrames": 240, "caption": "...", "narrationText": "...", "mediaRef": "...", "highlight": { "x": 0.5, "y": 0.3, "w": 0.2, "h": 0.1 } }
{ "id": "after", "kind": "after", "durationInFrames": 180, "caption": "..." }
```

`highlight` (training only, optional) is a fractional box (0–1 of frame width/
height) the `Highlight`/`Arrow` components draw attention to — use it when a scene
calls out one specific UI element.

## Picking audio

1. Read `assets/LICENSES.md` for the current track/SFX manifest (name, mood tags,
   duration, cue file).
2. Pick one music track whose mood tag matches the plan's audio direction. Never
   reference a file that isn't in the manifest. Copy it into
   `<output folder>/media/music/`.
3. For marketing highlight scenes, optionally copy one SFX file per scene into
   `<output folder>/media/sfx/` for a transition/impact accent — don't add SFX to
   every scene, it gets noisy.
4. If `--voice` was passed, follow `references/voiceover.md` to generate the
   narration audio files into `<output folder>/media/voice/`, then reference them
   by path (relative to `media/`) in `audio.voiceover.clips`.
5. If `--no-music` / `--no-sfx` were passed, set `musicTrack: null` / `sfxEnabled: false`.

## Validate before moving on

- `durationInFrames` on the root config must equal the sum of all scene
  `durationInFrames`.
- Every `mediaRef` and audio path must point to a file that actually exists.
- `rtl: true` must be set whenever `text`/`caption`/`narrationText` fields contain
  Hebrew.
