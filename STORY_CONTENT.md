You are modifying an already-developed anniversary website.
IMPORTANT:
Read and understand the existing anniversary file completely before making changes.
ALL existing assets, images, text, animations, structure, and materials are already inside the anniversary file.
DO NOT recreate the project from scratch.
DO NOT create a new file or move the implementation elsewhere.
ONLY modify the existing code inside the anniversary file.
Preserve everything that is already working unless explicitly changed below.
Do not remove existing assets or content unnecessarily.
Keep the current visual style: black/dark background, romantic muted neon-pink/red aesthetic, cinematic transitions, red thread, photographs, flowers, fireworks, and QR reveal.

1. REWORK THE OVERVIEW / LETTER SECTION
Currently, a large paragraph is printed before the overview. Remove that behavior.
The long Vietnamese text should NOT appear as a large block before the overview anymore. The same content is already represented during the scrolling/red-thread sequence, so move the actual full paragraph presentation into the Overview section.
When the user reaches the Overview:
The entire paragraph should appear progressively, sentence by sentence, rather than appearing all at once.
Keep the paragraph in the same general area as the current text placement, but move it slightly toward the right side of the screen.
Give it a moderate readable width. Do NOT make it a very narrow vertical column.
Reduce the font size if necessary because the paragraph is long.
The paragraph should feel like a cinematic handwritten/romantic letter rather than a giant wall of text.
Add a subtle blurred/darkened background area around and underneath the text so the text remains clearly readable without being disturbed by the photographs underneath.
The background treatment must remain subtle: the photographs should still be visible, but must not reduce text readability.
Maintain good spacing and visual balance between the paragraph and the images.
At the bottom-right area of the Overview, display the signature clearly and relatively large, like the closing signature of a physical love letter:
"Thượng Hải, 24/10/2026
Người yêu của cậu -
Nam Dang"
The signature should be clearly readable and visually balanced against the long paragraph. It should feel like a genuine letter/signature, not like ordinary body text.
The final Overview composition should feel like:
full-screen photographic composition
paragraph slightly right of center
subtle dark/blurred readability layer behind the paragraph
large signature positioned toward the lower-right
elegant cinematic letter presentation

2. REWORK THE TRANSITION FROM OVERVIEW TO THE 99-PHOTO SEQUENCE
After the user finishes scrolling through ALL of the emotional text, including the full paragraph in the Overview:
Keep the existing zoom-out concept, because that part is correct.
BUT remove the currently messy red-thread path during this transition.
Temporarily make the red thread disappear.
Bring the first two photographs closer together.
The full set of 99 photographs must become clearly visible as a complete composition.
The 99 photos must NOT remain buried behind the background or get heavily covered by photos 3–17 as they currently do.
All 99 photos need to remain visible within the viewport.
Reorganize the layout so no important photo disappears outside the screen.
The images should feel like they "pop up" into the scene, then gently settle downward/back into the composition.
Do NOT use the current effect where the 99 photos seem to penetrate the screen and then retract.
Instead, use a clear:
POP UP → slight downward settling → gradually filling/occupying the screen
animation language.
The final state should remain within the viewer's field of view and allow the audience to understand the entire 99-photo collection at once.
IMPORTANT:
The paragraph from the Overview must remain visible in its existing position during this composition. Do not move it away or hide it just because the 99-photo sequence appears.
Overall visual result:
FULL-SCREEN PHOTO COMPOSITION — NO EMPTY GAPS — paragraph remains slightly right of center — photos progressively pop into view, settle gently, and eventually fill the screen.

3. REWORK THE DOUBLE-LILY FLOWER SEQUENCE
The double-lily sequence currently appears immediately after the Overview. Change the timing completely.
Desired sequence:
Overview is visible.
User scrolls.
The ENTIRE Overview disappears.
The red thread reappears.
The red thread travels and forms a CLOSED / UNBLOOMED double lily flower.
At this moment, the flower must remain CLOSED.
Only after the user scrolls again should the flower bloom/open.
Continue scrolling:
the red thread moves downward
the ground transforms into a field/forest of double lilies
initially, most/all flowers are CLOSED / UNBLOOMED
With continued scrolling, flowers bloom progressively:
some flowers bloom earlier
some bloom later
new CLOSED flowers can continue spawning into the scene
newly spawned flowers can subsequently bloom
The blooming should feel organic and progressive rather than all flowers opening simultaneously.
Continue this progression until the existing fireworks sequence.
After the fireworks, preserve the existing QR-code reveal.
The flower section should feel like the relationship is gradually growing into a whole field of flowers.
Do NOT make the entire flower field appear already fully bloomed immediately after the Overview.

4. SIMPLIFY THE RED THREAD ANIMATION
The red relationship thread should no longer follow the complicated path currently implemented.
Replace it with a much simpler sinusoidal/wave-like path.
Desired behavior:
simple smooth sine-wave movement
elegant and continuous
romantic and cinematic
no unnecessarily complicated zigzag/path geometry
the thread should move through the viewport naturally
The tail of the red thread should NOT remain permanently visible.
After a segment of the thread passes through the screen:
its tail gradually fades
then disappears after leaving the viewport
do not keep the entire historical thread rendered behind it
The fading should resemble the visual afterimage/trailing-light effect of a car's red taillights moving rapidly through an anime scene:
soft motion trail
gradual fade
brief afterimage
then complete disappearance
The result should feel like a moving glowing red thread rather than a giant permanent line drawn across the entire page.

5. PRESERVE EXISTING FUNCTIONALITY
Do NOT break:
existing scroll-driven interaction
existing images/assets
existing Vietnamese content
existing fireworks
existing QR-code reveal
existing romantic visual style
existing responsive behavior
existing working animations that are unrelated to the requested changes
Do not replace working components unnecessarily.
The priority is to MODIFY the existing implementation intelligently, not rebuild it.
Before editing, inspect the current code and identify:
the Overview rendering logic
the paragraph/text animation logic
the 99-photo composition
the red-thread path/animation
the double-lily spawning/blooming system
the transition states between these sections
Then modify only the necessary parts while preserving the rest of the existing implementation.
