# Sáu năm — asset map and local use

## Asset mapping

All supplied images stay in `uploads/` with their original filenames.

- `STORY_IMAGES` maps `nf1.jpg` through `nf17.jpg` to `uploads/nf1.jpg` through `uploads/nf17.jpg`. The array entries include an `id` (`nf1` … `nf17`) and `src`.
- `CORE_9` is the fixed opening order: `uploads/91.jpg`, `92.jpg`, `93.jpg`, `94.jpg`, `95.jpg`, `96.jpg`, `97.jpg`, `98.jpg`, `99.jpg`.
- `MEMORY_90` contains the other 90 upload basenames. It is a filename manifest, not a chronological order; the original names are preserved.
- `uploads/ltv.jpg` is the LTV line-art reference, `uploads/tata.jpg` is the Tata scene image, and `uploads/qr.jpg` is the final QR image.
- Background audio is `music.mp3` at the project root.

`js/assets.js` exports `STORY_IMAGES`, `CORE_9`, `MEMORY_90`, `ASSET_AUDIT`, `auditAssets()`, and `AssetLoading` on `window`. The audit checks every listed story/core/memory photo, the three special images, and the music file. It resolves with `{ total, passed, missing, results }`; missing resources are reported by URL. `AssetLoading.loadImage()` waits for image decode, and `loadProgressively()` loads a list with bounded concurrency and optional `onLoad`/`onError` callbacks.

### MEMORY_90 manifest

```text
1000000122.jpg, 1000000159.jpg, 1000005026.jpg, 1000005028.jpg, 1000009082.jpg, 1000009100.jpg
1000014157.jpg, 1000014990.jpg, 1000014998.jpg, 1000015293.jpg, 1000016215.jpg, 1000016229.jpg
1000016230.jpg, 1000016510.jpg, 1000016521.jpg, 1000016533.jpg, 1000017192.jpg, 1000017193.jpg
1000017194.jpg, 1000017195.jpg, 1000017198.jpg, 1000017310.jpg, 1000017443.jpg, 1000018215.jpg
1000018228.jpg, 1000018268.jpg, 1000018273.jpg, 1000018275.jpg, 1000018292.jpg, 1000018299.jpg
1000018718.jpg, 1000018930.jpg, 1000018945.jpg, 1000019037.jpg, 1000019447.jpg, 1000019456.jpg
1000019457.jpg, 1000019463.jpg, 1000019464.jpg, 1000019477.jpg, 1000019494.jpg, 1000019513.jpg
1000019514.jpg, 1000019550.jpg, 1000019716.jpg, 1000019721.jpg, 1000019725.jpg, 1000019738.jpg
1000019835.jpg, 1000019836.jpg, 1000019853.jpg, 1000019854.jpg, 1000019855.jpg, 1000019863.jpg
1000020134.jpg, 1000020135.jpg, 1000020136.jpg, 1000020138.jpg, 1000020142.jpg, 1000020147.jpg
1000020148.jpg, IMG_2123.jpg, IMG_2614.jpg, IMG_2677.jpg, IMG_2857.jpg, IMG_3277.jpg
IMG_3280.jpg, IMG_3283.jpg, IMG_3285.jpg, IMG_3533.jpg, IMG_3603.jpg, IMG_4118.jpg
IMG_5567.jpg, IMG_5864.jpg, IMG_6024.jpg, IMG_6635.jpg, IMG_6638.jpg, IMG_6640.jpg
IMG_6662.jpg, IMG_6666.jpg, IMG_6797.jpg, IMG_7175.jpg, IMG_7176.jpg, IMG_7183.jpg
MIN03474.jpg, MIN03892.jpg, MIN03936.jpg, MIN03966.jpg, MIN04158.jpg, MIN042662.jpg
```

The `MEMORY_90` list excludes `nf*`, `91.jpg`–`99.jpg`, `ltv.jpg`, `qr.jpg`, and `tata.jpg`.

## Color and music changes

Global color values belong in the `THEME` object in `js/config.js`; its `neonPink` value (`#E05A78`) drives the shared neon color. Change the centralized theme token there when adjusting the story palette. The Tata scene's red tint is local (`TATA_RED`) and can be changed separately.

Replace `music.mp3` in the project root to change the soundtrack, keeping the same filename. The page attempts autoplay and should unlock playback after an allowed user interaction if the browser blocks autoplay.

## Static run

Open `index.html` in a modern browser. If the browser restricts local media or asset loading from `file:`, serve this directory with any static HTTP server and open its local URL. No package installation, build step, or framework is required.

## Debug mode

Append `?debug=1` to the page URL to enable the hidden development panel. It shows master/target progress, the current scene, camera x/y/zoom, thread length, loaded images, audio state and the `auditAssets()` result (passed/total plus any missing URLs). Without the query parameter it stays hidden and the audit does not run.

The scroll length comes from `CONFIG.scrollLength` (in vh) in `js/config.js`.
