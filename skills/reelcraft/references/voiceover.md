# Voiceover

Off by default (`--voice` not passed). When enabled, the provider depends on
`--voice-lang`, because no single free option is both commercially safe and
Hebrew-capable — see the two providers below.

## English (`--voice-lang en`, default when `--voice` is passed)

**Kokoro TTS** — Apache-2.0, runs fully local, no API key, safe for commercial
client work.

```bash
npx kokoro-tts generate --text "<narration text>" --voice af_heart --out clip.wav
```

(Check `npx kokoro-tts --help` for the current voice list — pick a neutral voice
unless the plan calls for something specific.)

## Hebrew (`--voice-lang he`)

No free, fully local, commercially-clear TTS currently supports Hebrew (Kokoro's
Hebrew fork is trained on a non-commercial dataset; edge-tts has Hebrew voices but
ambiguous commercial terms as an unofficial wrapper around a cloud service — do not
use either for client-facing deliverables).

Use **ElevenLabs** instead (paid, but with a clear commercial license from their
$6/mo Starter tier — see their pricing page):

```bash
curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/<voice_id>" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "<narration text>", "model_id": "eleven_v3"}' \
  --output clip.mp3
```

Use `eleven_v3` (or the current model that lists Hebrew support — verify against
ElevenLabs' docs if this has changed) — the older `eleven_multilingual_v2` model
does **not** include Hebrew.

Requires `ELEVENLABS_API_KEY` to be set in the environment. **Never hardcode the
key in any file in this repo or in `composition-config.json`.** If the variable
isn't set, stop and tell the user to provide their own ElevenLabs API key — do not
fall back to a free provider silently, since that would produce a track under
different (and here, unclear) licensing terms than what was agreed.

## After generating

Save each clip into `<output folder>/media/voice/` (not `assets/`, since these are
per-run, not reusable), and reference it in `composition-config.json` under
`audio.voiceover.clips[].audioFile` as a path relative to `media/` (e.g.
`"voice/step-1.mp3"`) — see step-3-compose.md's "Media paths" note.
