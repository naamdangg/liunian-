# SPEC - shared contract for every agent
Read this first. Use these file names, ids, class names and tokens exactly. Extend what earlier tasks built; do not rename or restructure it.

## User's message (the authority)
You are continuing to modify the EXISTING anniversary website.
CRITICAL RULES
Read the existing anniversary file completely before editing.
ONLY modify the existing code inside the anniversary file.
Do NOT rebuild the website.
Do NOT create a new file or duplicate the implementation.
ALL existing assets, images, Vietnamese text, animations, and materials are already inside this file.
Preserve everything that is already working unless explicitly changed below.
The simplified SINUSOIDAL / SINE-WAVE red-thread path from the previous revision is already correct. KEEP IT.
Do NOT restore the old complicated red-thread path.
Do NOT restore the old checkpoint-dot system after the Overview.
The main priority is fixing the Overview and the transition immediately after it.

1. HIGHEST PRIORITY — FIX THE OVERVIEW
The Overview currently has several problems.
1.1 Fix the paragraph size and overflow
The Vietnamese paragraph is currently much too large.
Its final portion is being cut off because the text overflows the viewport.
Fix this completely:
ALL of the original Vietnamese paragraph must be displayed.
Nothing may be clipped.
Nothing may disappear below the viewport.
Do not hide overflow as a workaround.
Reduce the font size and/or line height.
Give the paragraph a controlled text box.
Make the text wrap naturally.
Ensure the entire paragraph can be read comfortably within the Overview scene.
The paragraph should feel like a long romantic letter, NOT like a giant headline.

1.2 Move the paragraph significantly further RIGHT
The paragraph is currently too close to the center.
Move it further toward the RIGHT side of the screen.
The existing signature placement is already GOOD — do not significantly change it.
Use the signature as the horizontal reference point.
The paragraph should occupy roughly the vertical area:
slightly below the top of the viewport
down to slightly above the signature
And horizontally:
clearly right of center
aligned visually with the signature area
wide enough to avoid becoming a very narrow vertical column
Think of the composition as:
               [ paragraph ]
                [ paragraph ]
                [ paragraph ]
                [ paragraph ]

                          [ signature ]
The paragraph and signature should feel like the text portion of a physical handwritten love letter placed over the memory photographs.

1.3 Fix Vietnamese Unicode / font rendering
This is a technical issue and MUST be fixed.
Vietnamese characters currently have broken diacritics.
Examples include:
á à ả ã ạ
ấ ầ ẩ ẫ ậ
ắ ằ ẳ ẵ ặ
é è ẻ ẽ ẹ
ê and all accented ê forms
ó ò ỏ õ ọ
ô and all accented ô forms
ơ and all accented ơ forms
ú ù ủ ũ ụ
ư and all accented ư forms
đ
Fix the actual font/rendering implementation.
Do NOT modify or simplify the Vietnamese text itself.
Make sure:
UTF-8 is preserved.
The selected font properly supports Vietnamese.
Font loading is correct.
CSS does not cause combining marks to render incorrectly.
The entire paragraph and signature render Vietnamese Unicode correctly.

2. TEXT AND ALL PHOTOS MUST ENTER TOGETHER
The current Overview timing is wrong.
Right now:
the first two photos appear
the text appears
then the remaining photos appear later
Change this.
The Overview entrance should make:
THE TEXT + ALL PHOTO ELEMENTS
begin appearing at essentially the SAME TIME.
They should feel like one coordinated cinematic reveal.
The first two photos must NOT appear significantly earlier than the rest.
The paragraph must NOT appear significantly earlier than the rest of the photos.
The entire photo composition and the text should enter together with synchronized timing while keeping the existing smooth cinematic animation quality.

3. MAKE THE PHOTOS LOOK RANDOM AND MESSY
The current photo animation itself is good.
KEEP:
photos staying inside the viewport
pop-up animation
settling animation
no photos escaping outside the frame
However, the final arrangement is currently TOO ORDERLY.
The photos are:
too evenly spaced
too aligned
too straight
too grid-like
too mathematically organized
This is NOT the desired aesthetic.
I want the photographs to look like someone physically took old printed photographs and casually scattered them across a table.
The composition should feel like:
old memories casually placed on a table
Implement controlled randomness:
varied rotation angles
varied scale
irregular spacing
different vertical positions
different horizontal positions
slight overlaps
different depths/layers
some photos slightly tilted clockwise
some slightly tilted counter-clockwise
some almost straight
some partially overlapping others
Avoid:
straight rows
columns
uniform gaps
repeated positioning patterns
obvious grid structures
BUT this must be controlled randomness, not uncontrolled randomness.
Every important photo must remain visible enough to recognize.
No photo should be pushed completely outside the viewport.
The overall composition should look messy, nostalgic, organic, and handmade while still remaining visually balanced.

4. AFTER THE OVERVIEW — COMPLETE RESET TO BLACK
This is extremely important.
When the Overview finishes, the entire previous visual scene must disappear.
The screen must become:
PURE BLACK.
There must be NO:
photographs
Overview text
signature
background image
residual glow
old thread segments
old photo elements
visible during this transition.
There should be a clear moment where the viewer sees a completely black screen.

5. PERMANENTLY REMOVE THE OLD CHECKPOINT DOTS AFTER THE OVERVIEW
This is VERY IMPORTANT.
The old red thread has checkpoint dots / circular nodes along its path.
Those checkpoint dots belong ONLY to the earlier red-thread sequence.
From the moment the Overview ends:
ALL OLD CHECKPOINT DOTS MUST BE COMPLETELY GONE.
They must NOT reappear anywhere later.
This means:
Lily section:
NO checkpoint dots.
Flower forest:
NO checkpoint dots.
Fireworks:
NO checkpoint dots.
QR section:
NO checkpoint dots.
From the end of the Overview until the very end of the website, there must be ZERO visible checkpoint dots from the old thread system.
Do not merely fade them temporarily.
Remove/disable their rendering after the Overview state.
If the existing checkpoint elements are generated dynamically, make sure the later scene states cannot render them again.
The red thread itself may continue to exist, but the checkpoint/node decoration must be permanently disabled after the Overview.

6. NEW TRANSITION: BLACK SCREEN → FALLING THREAD → ONE CLOSED LILY
After the Overview:
STEP 1 — Pure black
The screen becomes completely black.
Pause briefly in this state.
STEP 2 — Red thread appears
The red thread appears again.
IMPORTANT:
Use the NEW simple sinusoidal/sine-wave thread.
Do NOT restore the old path.
Do NOT show checkpoint dots.
STEP 3 — The thread FALLS DOWNWARD
The thread should move/fall downward through the black screen.
It should feel as though the thread is descending toward the ground.
The screen remains predominantly black during this movement.
This downward movement must happen BEFORE the flower appears.
STEP 4 — The thread reaches the ground
Once the thread reaches the lower/ground area, pause briefly.
STEP 5 — ONE single CLOSED double-lily grows
A SINGLE double-lily grows upward from the ground.
It must initially be:
COMPLETELY CLOSED / UNBLOOMED.
The flower should:
emerge from the ground
grow upward
remain closed
then slowly begin opening
fully bloom
The bloom should be gradual and elegant.
Do NOT spawn the entire forest immediately.
The sequence must clearly communicate:
black → falling red thread → ground → one closed lily → gradual bloom → flower forest

7. REMOVE THE OLD PRE-BLOOMED LILY COMPLETELY
The previous code contains an older double-lily that is already blooming / already visible.
This old flower is causing duplication with the new flower system.
REMOVE THE OLD IMPLEMENTATION.
There must be only ONE active lily system.
Make sure there is no:
old flower underneath the new flower
duplicate flower mesh
duplicate DOM/canvas element
pre-bloomed flower appearing in the background
old animation still running
old flower state leaking into the new scene
Reuse the existing flower assets/materials if appropriate, but remove obsolete flower instances and obsolete animation logic.

8. ONLY AFTER THE FIRST FLOWER BLOOMS → FLOWER FOREST
Once the FIRST single flower has successfully bloomed:
Then continue the existing scroll-driven progression into the flower field.
The forest should develop gradually.
Initially:
many flowers are closed
Then with continued scrolling:
some flowers bloom
some bloom later
new closed flowers can spawn
newly spawned flowers can later bloom
The forest should feel alive and progressive.
Do NOT make all flowers fully bloomed immediately.
The intended progression is:
ONE CLOSED FLOWER
→ ONE FLOWER BLOOMS
→ MORE CLOSED FLOWERS APPEAR
→ SOME BLOOM
→ MORE FLOWERS SPAWN
→ MORE BLOOM
→ FULL FLOWER FIELD
→ FIREWORKS
→ QR

9. PRESERVE THE CORRECT PARTS
Do NOT unnecessarily modify:
the new sinusoidal red-thread path
red-thread glow
99-photo system
photo pop-up/settling animation
photo viewport containment
signature position
fireworks
QR-code reveal
scroll-driven interaction
Vietnamese content
existing visual style
Only patch the systems necessary to achieve the requested behavior.

10. FINAL STATE MACHINE
The intended sequence should now be:
EARLIER RED THREAD SEQUENCE
↓
CHECKPOINT DOTS EXIST
↓
OVERVIEW
↓
TEXT + ALL PHOTOS ENTER TOGETHER
↓
PHOTOS FORM A CONTROLLED RANDOM / MESSY TABLE-LIKE COMPOSITION
↓
OVERVIEW FINISHES
↓
EVERYTHING DISAPPEARS
↓
PURE BLACK SCREEN
↓
ALL OLD CHECKPOINT DOTS ARE PERMANENTLY DISABLED
↓
SIMPLE SINUSOIDAL RED THREAD REAPPEARS
↓
THREAD FALLS DOWNWARD
↓
THREAD REACHES GROUND
↓
ONE CLOSED DOUBLE-LILY GROWS
↓
LILY SLOWLY BLOOMS
↓
FLOWER FOREST BEGINS
↓
FLOWERS SPAWN + BLOOM PROGRESSIVELY
↓
FIREWORKS
↓
QR CODE
CRITICAL:
From the END OF THE OVERVIEW onward, checkpoint dots must NEVER appear again anywhere in the remaining experience.
Before finalizing the modification, inspect the existing code for obsolete duplicate Overview, red-thread, checkpoint, and lily implementations and remove/disable only the obsolete ones. Do not leave old animations running underneath the new implementation.

## Requirements checklist
- [R1] You are continuing to modify the EXISTING anniversary website. CRITICAL RULES Read the existing anniversary file completely before editing. ONLY modify the existing code inside the anniversary file. Do NOT rebuild the website. Do NOT create a new file or duplicate the implementation. ALL existing as
- [R2] 1. HIGHEST PRIORITY — FIX THE OVERVIEW: The Overview currently has several problems. 1.1 Fix the paragraph size and overflow The Vietnamese paragraph is currently much too large. Its final portion is being cut off because the text overflows the viewport. Fix t... (full text in section "1. HIGHEST PRIORITY — FIX THE OVERVIEW" of the message)
- [R3] 2. TEXT AND ALL PHOTOS MUST ENTER TOGETHER: The current Overview timing is wrong. Right now: the first two photos appear the text appears then the remaining photos appear later Change this. The Overview entrance should make: THE TEXT + ALL PHOTO ELEMENTS begin app... (full text in section "2. TEXT AND ALL PHOTOS MUST ENTER TOGETHER" of the message)
- [R4] 3. MAKE THE PHOTOS LOOK RANDOM AND MESSY: The current photo animation itself is good. KEEP: photos staying inside the viewport pop-up animation settling animation no photos escaping outside the frame However, the final arrangement is currently TOO ORDERLY. The p... (full text in section "3. MAKE THE PHOTOS LOOK RANDOM AND MESSY" of the message)
- [R5] 4. AFTER THE OVERVIEW — COMPLETE RESET TO BLACK: This is extremely important. When the Overview finishes, the entire previous visual scene must disappear. The screen must become: PURE BLACK. There must be NO: photographs Overview text signature background image residua... (full text in section "4. AFTER THE OVERVIEW — COMPLETE RESET TO BLACK" of the message)
- [R6] 5. PERMANENTLY REMOVE THE OLD CHECKPOINT DOTS AFTER THE OVERVIEW: This is VERY IMPORTANT. The old red thread has checkpoint dots / circular nodes along its path. Those checkpoint dots belong ONLY to the earlier red-thread sequence. From the moment the Overview ends: ALL OLD CHECKPOINT ... (full text in section "5. PERMANENTLY REMOVE THE OLD CHECKPOINT DOTS AFTER THE OVERVIEW" of the message)
- [R7] 6. NEW TRANSITION: BLACK SCREEN → FALLING THREAD → ONE CLOSED LILY: After the Overview: STEP 1 — Pure black The screen becomes completely black. Pause briefly in this state. STEP 2 — Red thread appears The red thread appears again. IMPORTANT: Use the NEW simple sinusoidal/sine-wave threa... (full text in section "6. NEW TRANSITION: BLACK SCREEN → FALLING THREAD → ONE CLOSED LILY" of the message)
- [R8] 7. REMOVE THE OLD PRE-BLOOMED LILY COMPLETELY: The previous code contains an older double-lily that is already blooming / already visible. This old flower is causing duplication with the new flower system. REMOVE THE OLD IMPLEMENTATION. There must be only ONE active ... (full text in section "7. REMOVE THE OLD PRE-BLOOMED LILY COMPLETELY" of the message)
- [R9] 8. ONLY AFTER THE FIRST FLOWER BLOOMS → FLOWER FOREST: Once the FIRST single flower has successfully bloomed: Then continue the existing scroll-driven progression into the flower field. The forest should develop gradually. Initially: many flowers are closed Then with continu... (full text in section "8. ONLY AFTER THE FIRST FLOWER BLOOMS → FLOWER FOREST" of the message)
- [R10] 9. PRESERVE THE CORRECT PARTS: Do NOT unnecessarily modify: the new sinusoidal red-thread path red-thread glow 99-photo system photo pop-up/settling animation photo viewport containment signature position fireworks QR-code reveal scroll-driven interac... (full text in section "9. PRESERVE THE CORRECT PARTS" of the message)
- [R11] 10. FINAL STATE MACHINE: The intended sequence should now be: EARLIER RED THREAD SEQUENCE ↓ CHECKPOINT DOTS EXIST ↓ OVERVIEW ↓ TEXT + ALL PHOTOS ENTER TOGETHER ↓ PHOTOS FORM A CONTROLLED RANDOM / MESSY TABLE-LIKE COMPOSITION ↓ OVERVIEW FINISHES ... (full text in section "10. FINAL STATE MACHINE" of the message)

## Images (never change anything in uploads/)
- uploads/nf1.jpg … uploads/nf17.jpg: the 17 story photographs -> unchanged memory nodes; nf1+nf2 are the Overview pair (renderOverviewPair) and enter at the same moment as the grid and letter (R3)
- uploads/91.jpg … uploads/99.jpg + uploads/1000*.jpg, IMG_*.jpg, MIN*.jpg: the 99 collage memory photos -> #collage-layer .collage-photo; in the Overview they are scattered like prints on a table (R4)
- uploads/ltv.jpg, uploads/tata.jpg, uploads/qr.jpg, music.mp3: LTV scene, Tata scene, final QR, background music -> unchanged (R10)

## Build spec
The agents patch the existing static site in place (R1). Do not add files, rename ids or classes, move assets or edit any Vietnamese string in `STORY_COPY` or `COPY`. Keep the sine-wave thread, the trail glow, the pop/settle animation, the viewport containment, the signature position, fireworks and the QR reveal (R10).

## Files (all existing)
- `index.html`: add one Google Fonts `<link>` (`Noto Serif` ital 400 and `Dancing Script` 500, `&subset=vietnamese&display=swap`) plus `preconnect` (R2). Nothing else changes.
- `js/config.js`: token changes are listed below.
- `css/styles.css`: letter box, font fixes, `.thread-nodes.is-disabled`.
- `js/story.js`: retime only `lily` and `lilyField` (R7).
- `js/thread.js`: add `setNodesEnabled(on)` and `setFall(dyPx)` (R6, R7).
- `js/memories.js`: `renderEssay`, `renderOverviewPair`, `renderThread`, `buildLily`/`sizeLily`/`renderLily`, `renderImmersion`.
- `js/collage99.js`: overview timing and messy table layout (R3, R4).
- Do not edit: `particles.js`, `timeline.js`, `assets.js`, `main.js`, `camera.js`, `README.md`, `STORY_CONTENT.md`.

## Scene order (single scroll page, `STORY` ids)
`opening` … `emotionalText` stay unchanged and keep `.thread-node` dots (R11).

1. **Overview = `essay` .80 → `overview` .90** (R2, R3, R4)
   - One shared entrance window, `ENTER = [SCENE.essay.start, at('essay', .25)]`. The `#essay` letter (all sentences `.is-shown` together), `.essay__signoff`, the nf1/nf2 pair and all 99 `.collage-photo` begin within it. Per-photo stagger ≤ .15 of the window, and nf1/nf2 get no head start.
   - `#essay` box:
     - Fixed position: `left: var(--letter-left)`, `top: 7vh`, `bottom: calc(var(--signoff-top-gap) + 7vh)`, `width: var(--letter-max)`.
     - `overflow: visible`. Font size comes from `--letter-size`, line height from `--letter-line`.
     - JS `fitEssay()` (called in `measureEssay` and on resize) steps the font size down 0.02rem until `scrollHeight` ≤ the box height, so the full text shows and nothing is clipped.
     - The right edge lines up with the signoff's right edge (`right: 6vw`).
   - Collage photos are spread across a jittered table, not a grid. Seeded per photo:
     - position: Poisson-ish scatter, cells jittered ±45%
     - rotation: −14° to +14°, about a third within ±3°
     - scale: .8 to 1.25
     - z-order: random, with 8–20% overlap
   - Every photo's centre stays inside 4vw/4vh margins.
2. **`lily` .90–.935**: black, then the falling thread, then one closed lily (R5–R8)
   - 0–.12: the Overview, collage, pair, letter, signoff, `#immersion-bg`, `#tata-tint` and the lily haze all reach opacity 0, and the particle canvas is cleared.
   - .12–.22: **pure black**. Thread presence is 0.
   - From `SCENE.lily.start` on, call `THREAD.setNodesEnabled(false)`. This sets `display:none` and `.is-disabled` on `#thread-nodes` and makes `setActiveNode` a no-op. Also hide `#thread-head`. Re-enable only when p < `SCENE.essay.start`. No dots ever show after the Overview (R6).
   - .22–.30: the sine thread fades in near the top of the screen.
   - .30–.52: `THREAD.setFall(dy)` translates the strand and its trails downward. dy eases from −.35vh to the ground line (`.36vh` below `pointFor('lily')`).
   - .52–.58: hold.
   - .58–.78: one hero lily (`els.lily.hero`) grows from the ground, fully closed. It uses `#mem-lily-bud`, and its stem scaleY goes from 0 to 1.
   - .78–1: the hero opens slowly. Petals in `flowerMarkup` rotate and spread from the bud shape to their open angles, with an eased, gradual bloom.
   - **Delete** the old `L.main` draw-path flower, the lazily created `L.bud`, and its crossfade code. Only one hero exists (R8).
3. **`lilyField` .935–.95 through `fireworks` end** (R9)
   - Field items get `spawn` ≥ the hero's bloom end.
   - Items start as `#mem-lily-bud` and bloom later (`bloom = spawn + .1–.45`).
   - Later spawns keep arriving. Blooms never all happen at once.
4. `fireworks`, `quiet`, `qr`: unchanged (R10).

Navigation stays scroll-driven only, with no menus.

## Tokens (`CONFIG.cssTokens` → `:root`)
Keep the existing tokens: `--bg #050505; --red-black #16090D; --muted-red #632533; --crimson #A83F5A; --neon #E05A78; --highlight #FFD6DF; --neon-glow`.

Changed or new:
```
--letter-left: 46vw;
--letter-max: min(48vw, 60ch);
--letter-size: clamp(.72rem, .58rem + .34vw, .95rem);
--letter-line: 1.55;
--signoff-top-gap: 9rem;
--font-letter: "Noto Serif", "Times New Roman", "Segoe UI", serif;
--font-signature: "Dancing Script", "Noto Serif", "Times New Roman", cursive;
```
Under 760px: `--letter-left: 5vw; --letter-max: 90vw`, set on `.essay` as now.

## Vietnamese rendering (R2)
- Keep `<meta charset="utf-8">`.
- Remove `letter-spacing` and `text-transform` from `.essay` and `.essay__signoff`.
- Set `font-synthesis: none`, `font-variant-ligatures: normal` and `text-rendering: auto` on both.
- Drop Segoe Script, which lacks Vietnamese stacked marks.
- Run `text.normalize('NFC')` on render only, so the source strings stay untouched.

## Shared class names
`.essay`, `.essay__veil`, `.essay__sentence`, `.is-shown`, `.essay__signoff`, `.essay__signoff-line`, `.is-hidden`, `.collage-photo`, `.collage-table`, `.thread-node`, `.thread-nodes.is-disabled`, `.thread-head`, `.thread-trail`, `.lily-bud`.

## Tone
No new copy. The letter should read like a long handwritten love letter: italic serif in a quiet, dark, cinematic frame, muted neon pink and red, with old prints scattered on a table underneath.

## Task order
1. (codex) Set overview typography tokens and load Vietnamese fonts - files: index.html, js/config.js - covers: R1, R2
2. (claude) Style the overview letter and disabled thread nodes - files: css/styles.css - covers: R2, R6
3. (codex) Synchronize and scatter the Overview collage - files: js/collage99.js - covers: R3, R4, R10
4. (claude) Fit the letter and coordinate the Overview reveal - files: js/memories.js - covers: R2, R3, R10
5. (codex) Disable thread nodes after Overview and retime lily scenes - files: js/thread.js, js/story.js - covers: R5, R6, R7, R9, R10
6. (claude) Replace duplicate lily behavior and complete scene reset - files: js/memories.js - covers: R1, R5, R6, R7, R8, R9, R10
7. (codex) Cover requirements the plan missed - files: - - covers: R11

## Notes from agents
(Add one line here when the next agent must know something: a new class, file or decision.)
- agent 2: `.essay` is now a top/bottom box (7vh → calc(--signoff-top-gap + 7vh)), border-box, no translate/max-height. fitEssay() should compare scrollHeight to clientHeight and write `style.fontSize` inline. The 380px `.essay` font-size override is gone, and `.thread-nodes.is-disabled` sets display:none !important.
- agent 4: memories.js `overviewPresence(p)` is the one Overview opacity (ease over [essay.start, at('essay',.25)] × fade over lily 0–.2), used by renderEssay and renderOverviewPair. Sentences and the signoff toggle `.is-shown` together while lily < .1. `el()` and the SVG text writers render via `nfc()`. `fitEssay()` runs inside measureEssay (resize + fonts.ready).- agent 5: `LILY_TIMING` in story.js defines the lily sequence phases; memories.js must call `THREAD.setNodesEnabled(false)` from lily start, re-enable before essay, and drive `THREAD.setFall(dyPx)` during the strand fall.
- agent 6: memories.js lily is one hero (`els.lily.hero`, inline flowerMarkup with per-petal `.mem-petal` groups opened by `petalTf`); `#mem-lily-bud` is now the same flower with folded petals. renderThread drives setNodesEnabled/setFall and hides `#thread-head` from lily start; `clearForLily()` wipes the particle canvas during lily; collage99 + overview now fade out by `LILY_TIMING.overviewFadeEnd` (.12); memory nodes stay hidden for all p ≥ essay start. node --check could not be run (permission denied), so please syntax-check memories.js and collage99.js.
- agent 7: I checked R11 by reading the code. The LILY_TIMING beats run in the state-machine order, and the dots are disabled from lily start. renderThread now also fades `#thread-nodes` opacity with the strand, so no dots are left floating over the Overview. node --check was denied again, so the syntax check is still open.
- reviewer 1: in collage99 `layoutGrid`, each photo now keeps its own `P.cell` (the containment had been computed for a different photo). Jitter is the full ±45%, the empty last-row slots are shuffled, and about a third of the photos are within ±3°. node --check was denied for me too; the edited lines were checked by reading them.
