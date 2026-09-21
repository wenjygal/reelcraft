# Step 4 — Deliver

Render the final video from `composition-config.json` and finish the output folder.

## 1. Render

From the `renderer/` directory of this skill (not the target project):

```bash
npx remotion render <MarketingReel|TrainingReel> out.mp4 \
  --props="<absolute path to composition-config.json>" \
  --public-dir="<absolute path to output folder>/media"
```

Pick the composition id matching `mode` in the config (`MarketingReel` for
`marketing`, `TrainingReel` for `training`). `--public-dir` is required — it's what
makes the `staticFile()` calls inside the templates resolve against this run's
`media/` folder (assets copied there in step 3) instead of the renderer's own
`public/`.

Move/copy the rendered file to `<output folder>/reelcraft.mp4`.

## 2. Poster frame

Extract frame 0 as the poster and bake it back in as the first frame (matches
brag's approach — gives platforms a clean thumbnail without a black flash):

```bash
ffmpeg -i reelcraft.mp4 -vframes 1 reelcraft.jpg
```

## 3. Share copy (marketing mode only)

Write `share-copy.txt` using the "Share copy draft" line from `reelcraft-plan.md`,
adapted into two short variants: one for X/Twitter (casual, under 280 chars), one
for LinkedIn (one sentence more context, still short). Training mode does not
produce this file.

## 4. Sanity check before reporting done

- Open (or at least stat) `reelcraft.mp4` — confirm it's non-empty and roughly the
  expected duration.
- Confirm `reelcraft-output-<timestamp>/` contains exactly: `reelcraft-plan.md`,
  `composition-config.json`, `reelcraft.mp4`, `reelcraft.jpg`, and (marketing only)
  `share-copy.txt`.
- Report the output folder path to the user — don't just say "done."
