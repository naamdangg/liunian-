# SPEC - shared contract for every agent
Read this first. Use these file names, ids, class names and tokens exactly. Extend what earlier tasks built; do not rename or restructure it.

## User's message (the authority)
MASTER PROMPT
Build a Cinematic Scroll-Driven 6-Year Anniversary Website as One Continuous Story World
You are an expert creative frontend engineer, interaction designer, motion designer, and cinematic web experience architect.
Your task is to generate a complete, production-quality, highly cinematic anniversary website from this specification.
This is NOT a normal landing page.
This is NOT a collection of independent sections.
This is NOT a slideshow.
This is NOT a gallery.
This is NOT a website where each scroll simply reveals another block.
The website must feel like a single continuous cinematic journey through six years of a relationship, where the viewer physically travels through a continuous visual world.
The central visual metaphor is a single continuous neon thread representing the relationship.
The thread is the spine of the entire experience.
The camera follows this thread.
Memories appear along this thread.
Photographs appear along this thread.
Messages form from this thread.
Text dissolves back into this thread.
The camera moves through the thread.
The thread changes direction.
The thread goes upward, downward, sideways, diagonally, loops, curves, approaches the camera, moves away from the camera, and occasionally becomes the text itself.
The entire website must feel like a cinematic camera flying through a beautiful, nonlinear road/highway of memories.

0. ABSOLUTE PRIORITY
The following rules have the highest priority.
If any later instruction conflicts with these rules, these rules win.
RULE 1 — ONE CONTINUOUS WORLD
Treat the entire website as ONE continuous cinematic world.
Do not implement every story section as an isolated page.
Do not create independent full-screen slides that have no spatial relationship with each other.
Do not use ordinary page-section scrolling as the primary architecture.
The viewer must feel that they are continuously travelling through the same world.
The entire experience should conceptually follow:
USER SCROLL
    ↓
SCROLL PROGRESS
    ↓
MASTER TIMELINE
    ↓
CAMERA POSITION
    ↓
CONTINUOUS THREAD POSITION
    ↓
MEMORY / TEXT / IMAGE STATE
    ↓
LOCAL TRANSITION
    ↓
NEXT PART OF THE SAME WORLD

1. TECHNICAL STACK
Use:
HTML
CSS
vanilla JavaScript
Do NOT use:
React
Vue
Angular
Svelte
Next.js
Nuxt
GSAP
Three.js
jQuery
animation frameworks
component frameworks
Use native browser APIs.
Allowed:
SVG
Canvas
CSS transforms
CSS filters
CSS variables
requestAnimationFrame
Web Animations API if useful
IntersectionObserver only for auxiliary tasks, NOT as the primary timeline system
native image decoding/loading APIs
native Audio API
The experience must work as a static HTML/CSS/JS project.

2. REQUIRED PROJECT ARCHITECTURE
Generate a clean project structure similar to:
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js
│   ├── assets.js
│   ├── story.js
│   ├── thread.js
│   ├── camera.js
│   ├── timeline.js
│   ├── memories.js
│   ├── collage99.js
│   ├── particles.js
│   └── main.js
├── picture/
│   ├── nf1.jpg
│   ├── nf2.jpg
│   ├── ...
│   ├── nf17.jpg
│   ├── 91.jpg
│   ├── 92.jpg
│   ├── 93.jpg
│   ├── 94.jpg
│   ├── 95.jpg
│   ├── 96.jpg
│   ├── 97.jpg
│   ├── 98.jpg
│   ├── 99.jpg
│   ├── IMG* (90 original filenames, unchanged)
│   ├── ltv.jpg
│   └── qr
└── music.mp3
If the actual n8n workflow chooses slightly different filenames for JS/CSS files, that is acceptable, but the responsibilities must remain separated.

3. CENTRAL CONFIGURATION
Create ONE centralized configuration object/file for global visual settings.
At minimum:
const THEME = {
    background: "#050505",
    darkRedBlack: "#16090D",
    deepMutedRed: "#632533",
    mainCrimson: "#A83F5A",
    neonPink: "#E05A78",
    softHighlight: "#FFD6DF"
};
The neon thread and neon text MUST use the same centralized color variables.
Do NOT hardcode different pink values throughout the project.
If the user changes:
#E05A78
then:
thread
thread glow
neon messages
neon transitions
thread particles
thread-derived text
must update consistently.
The thread is visually the same object throughout the story.

4. GLOBAL COLOR LANGUAGE
The visual language is:
dark cinematic crimson-red with a subtle pink undertone.
Avoid:
hot pink
candy pink
magenta
pure red
oversaturated neon pink
childish romantic pink
Use:
#050505 — primary background
#16090D — dark red-black
#632533 — deep muted red
#A83F5A — main crimson
#E05A78 — neon red/pink glow
#FFD6DF — soft highlight
Primary neon glow:
text-shadow:
    0 0 5px #E05A78,
    0 0 15px #E05A78,
    0 0 35px rgba(224, 90, 120, 0.45);
The overall emotional tone must be:
elegant
cinematic
emotional
slightly intense
nostalgic
mature
romantic
powerful but not aggressive

5. THE THREAD — MOST IMPORTANT VISUAL OBJECT
The neon thread is the central object of the entire website.
It is not a decorative line.
It is not a different line for every scene.
It is ONE continuous story thread.
Conceptually:
                   ┌── memory
                  /
───────╮─────────╯
       │
       ╰───────╮
               │
               ╰──── photo
                       \
                        ╰──── message
The exact shape must be much more sophisticated than this example.
The thread must contain:
curves
S-curves
diagonal movements
vertical movements
horizontal movements
turns
loops
spatial bends
changes of direction
sections that move toward the camera
sections that move away
branches or local detours where necessary
nodes where memories occur
NEVER make the entire story a single straight line.
A single straight line from beginning to end is explicitly forbidden.
The final overview must make the journey look beautiful and spatially composed.

6. THREAD CONTINUITY
The thread must feel physically continuous.
If the thread leaves the screen on the right:
it must conceptually continue outside the viewport.
When it later returns:
it must feel like the same thread returning.
Do not create a new unrelated line.
If text transforms into the thread:
TEXT
 ↓
particles / thread fragments
 ↓
continuous thread
If thread transforms into text:
THREAD
 ↓
particles / dots
 ↓
TEXT
Then:
TEXT
 ↓
dissolve / reassembly
 ↓
THE SAME THREAD
The thread must then continue travelling.
This transition must never feel like:
fade text out
wait
fade new object in
It must feel like physical transformation.

7. THREAD-TO-TEXT MORPH SYSTEM
Implement a reusable text/thread morph engine.
For complex morphs, use Canvas or SVG particle sampling.
The engine should support:
thread → text
text → thread
text A → thread → text B
thread → particles → text
text → particles → thread
Do not simply crossfade the two elements.
The viewer should feel that the thread itself is reorganizing into letters.
Likewise, letters should dissolve into the same thread.
All text content must remain exact.

8. SCROLL SYSTEM
This is a continuous scroll-progress experience.
It is NOT scroll snap.
It is NOT:
scroll once → scene 1
scroll again → scene 2
Instead:
scroll progress = continuous value from 0 to 1
Example:
0%
    thread begins

30%
    camera follows thread

60%
    camera approaches memory

80%
    image becomes dominant

100%
    image becomes visual focus
The user must be able to control the animation continuously.
If they scroll slowly:
the animation progresses slowly.
If they scroll quickly:
the camera travels faster.
If they stop scrolling:
the animation stops at the current visual state.
If they scroll backward:
the animation reverses smoothly.
EVERY scene must be deterministic from scroll progress.
Do NOT build the experience primarily with irreversible event listeners such as:
onScroll:
    playNextAnimation();
Instead:
targetProgress = calculateScrollProgress();

currentProgress = lerp(
    currentProgress,
    targetProgress,
    smoothing
);

render(currentProgress);
Use requestAnimationFrame.

9. CAMERA ENGINE
The camera must behave like a cinematic flycam.
The camera is not simply the browser viewport.
Simulate a camera travelling through a large virtual world.
The virtual world should be much larger than the viewport.
Use:
translate
scale
rotation when appropriate
depth-like parallax
blur
focus
camera easing
The camera may:
move downward
move upward
move left
move right
move diagonally
zoom in
zoom out
follow a curve
approach a photograph
pass through a thread
pull away from a memory
circle around a composition
reveal the entire journey
However:
Do not over-rotate the camera when text needs to remain readable.
Cinematic movement must never destroy readability.

10. CAMERA FOLLOWING THE THREAD
The camera should be able to sample the position of the master thread.
If the thread is an SVG path:
use mechanisms such as:
path.getTotalLength()
path.getPointAtLength()
to calculate:
camera position
tangent direction
local path orientation
The camera should travel along the thread.
The thread should therefore behave like a road.
The viewer should feel:
I am travelling along the path of this relationship.

11. IMAGE ZOOM RULE
When the camera approaches an image:
the image may visually expand until it dominates or fills the viewport.
BUT:
NEVER distort the image.
Preserve:
original orientation
original aspect ratio
original proportions
For example:
portrait remains portrait.
landscape remains landscape.
square remains square.
If the image needs to visually fill the viewport:
use a blurred/extended background layer.
Concept:
┌─────────────────────────────┐
│ blurred extended image      │
│                             │
│       sharp original        │
│          image              │
│                             │
│ blurred extended image      │
└─────────────────────────────┘
The central image remains sharp.
The surrounding area may use:
blur
enlarged duplicate image
opacity
darkening
subtle vignette
But NEVER stretch the original image.
The viewer should feel like they are stepping into a memory.

12. TYPOGRAPHY
Use a readable modern font.
Do NOT use:
Times New Roman
overly decorative wedding fonts
childish handwritten fonts
extremely thin fonts
overly futuristic fonts
Recommended font stack:
font-family:
    Inter,
    "SF Pro Display",
    "Helvetica Neue",
    "Segoe UI",
    Arial,
    sans-serif;
The font must support Vietnamese correctly.
Typography must remain consistent throughout the entire website.
Text must NEVER be clipped.
For example:
Xin chà
o
is forbidden.
Use:
responsive font sizing
appropriate max-width
line-height
overflow-wrap
safe padding
responsive textbox sizing
dynamic layout where required
Long Vietnamese text must wrap naturally.
No important word may be hidden outside the viewport.

13. PRESENTATION MODE
When the website opens:
the viewer should immediately enter the cinematic presentation.
Do not show:
navigation bar
top menu
unnecessary controls
conventional website header
visible page sections
buttons asking the user where to go
The viewer's primary interaction is:
scroll.
The entire story is experienced from beginning to end by scrolling.

14. AUDIO
The background music is:
music.mp3
Attempt to start the music when the experience opens.
However, browser autoplay restrictions may prevent immediate playback.
Therefore:
Attempt autoplay.
If blocked, do not break the experience.
Start audio on the first valid user interaction such as:
scroll
wheel
touch
click
Do not force the user to navigate to a separate audio page.
Do not create a large music-control UI unless absolutely necessary.
The music should feel integrated into the cinematic experience.

15. ASSET MAPPING
There are two different image systems.
A. Normal story images
All normal story images are:
picture/
Mapping:
ẢNH 1  → picture/nf1.jpg
ẢNH 2  → picture/nf2.jpg
ẢNH 3  → picture/nf3.jpg
...
ẢNH 17 → picture/nf17.jpg
Do not confuse these with the 99-memory images.

B. 99-memory images
picture/
contains:
91.jpg
92.jpg
93.jpg
94.jpg
95.jpg
96.jpg
97.jpg
98.jpg
99.jpg
IMG*
The first nine are:
picture/91.jpg
...
picture/99.jpg
They must appear in order.
The remaining 90 are inside:
picture/IMG*
Their original filenames must be preserved.
Do not assume the filenames represent the desired display order.

16. IMPORTANT ASSET AUDIT
Before generating the final website, inspect the supplied assets.
Verify:
picture/nf1.jpg
through the required normal images
picture/91.jpg through 9.jpg
picture/IMG*
picture/ltv.jpg
picture/qr
music.mp3
For the Tata V BTS scene, use the supplied Tata image asset if it exists.
Do NOT silently replace a missing asset with an unrelated image.
If a required asset is missing:
clearly identify it
preserve the intended scene architecture
use a controlled placeholder only if necessary
never silently substitute an unrelated photograph

17. EXACT TEXT PRESERVATION
Every piece of text inside quotation marks in this specification is immutable content.
Do not:
rewrite
correct grammar
translate
improve wording
change punctuation
change capitalization
remove informal wording
replace slang
change repeated words
change :))))
change elongated words such as đóoooooo
If the source says:
“Chắc không đóoooooo”
use exactly:
Chắc không đóoooooo
If the source says:
“Bonus ảnh áo phao dzai Hàn Quốc nè:))”
do not correct dzai.
If the source says:
“Dù có cách cả ngàn cây số”
do not change it.
Vietnamese must remain Vietnamese.
Chinese must remain Chinese.
English must remain English.
Never translate user-provided story text.

18. SCENE 01 — OPENING IMAGE
On initial entry:
fade in:
ẢNH 1
from:
picture/nf1.jpg
Do not simply put the image as a flat full-screen <img>.
Create a sophisticated glass-like presentation inspired by modern Apple-style visual language.
The image should feel like it exists behind:
translucent glass
soft reflections
subtle depth
layered blur
controlled transparency
The goal is:
cinematic glass memory
not:
a giant photograph covering the entire screen.

19. OPENING ZOOM / BLUR
As the user scrolls:
the background image gradually becomes blurred.
Combine:
progressive blur
zoom
depth
inverted cover-like zoom transition
gradual reduction of brightness
Then show:
Cùng bắt đầu hành trình diệu kỳ này nhé!
The transition must be continuous.

20. BLACK TRANSITION
Continue scrolling.
The center of the screen gradually becomes black.
The surrounding visual world appears to be pulled outward.
Brightness gradually decreases.
Eventually:
background → #050505
The pink neon typography then appears.
Do not hard-cut to black.
The viewer must feel like they are being pulled into the center of the story.

21. OPENING MESSAGE
Show:
Nơi mọi chuyện bắt đầu
in the established neon pink style.
Then transform this text into the thread.
Do NOT simply fade the text out and spawn a thread.
Use:
“Nơi mọi chuyện bắt đầu”
        ↓
letter particles
        ↓
thread fragments
        ↓
continuous neon thread
The thread must retain exactly the same neon color and perceived brightness.

22. LƯƠNG THẾ VINH LOCATION
The thread begins travelling.
The camera follows it.
The thread leads toward a map-location marker:
📍
Conceptually resembling a location pin.
Reveal:
Trường THCS&THPT Lương Thế Vinh - Cơ Sở Cầu Giấy
Then create a stylized neon illustration of Lương Thế Vinh.
Reference:
picture/ltv.jpg
Do NOT simply display the source image.
Use it as the visual reference for a line-art reconstruction.
Style:
black background
+
white neon line art
The LTV illustration should feel like it is being drawn by light.

23. LTV → MEMORY THREAD
Continue scrolling.
Camera zooms into the location.
The pink thread reappears.
It forms:
Vào một ngày mà những tia nắng đã đưa nụ cười của cậu vào trái tim tớ
The message must be created by the thread/morph system.
Then the thread exits toward the right side of the screen.
Do not simply delete it.

24. SCENE — PHOTO 2 + PHOTO 3
Use:
picture/nf2.jpg
picture/nf3.jpg
These are portrait photographs.
Do NOT stretch them to full screen.
Use:
portrait orientation
blurred surrounding area
subtle irregular edges
worn/torn-paper feeling
nostalgic physical-photo feeling
subtle shadow
slight depth
Photo 2 appears first.
Then Photo 3 gradually appears on top of Photo 2.
The transition must feel like:
placing one physical photograph on top of another.
Not:
slideshow transition.

25. S-CURVE THREAD
Continue scrolling.
The photographs move toward the left.
The thread returns from the right.
The camera follows the thread extremely closely.
The thread begins making a complex S-shaped path.
IMPORTANT:
During the first part of the S:
the viewer must NOT immediately recognize it as an S.
The camera is too close.
The viewer sees only curves and movement.
Only after the S has been completed:
zoom the camera out.
Now the S-shape becomes visually recognizable.
The thread then completes the message:
Sau một năm, có lẽ santa đã dùng phép màu giáng sinh đã đưa 2 trái tim lại gần hơn

26. TATA V BTS LOCAL COLOR TRANSITION
Continue following the thread.
The camera gradually zooms directly toward the thread.
Pink begins filling the viewport.
Then, ONLY FOR THIS LOCAL SCENE:
the pink environment transitions into the red color associated with Tata V BTS.
This is a localized color transition.
It must NOT redefine the global theme.
After the Tata scene:
restore the original pink thread settings automatically.
Do not permanently change:
#E05A78
or the global thread glow.

27. TATA SCENE
Reveal the Tata V BTS image.
Use a speech bubble above Tata:
Bảo nhận quà nhưng không nhận tình à?
The speech bubble should appear naturally.
Continue scrolling.
The first speech bubble disappears.
A second speech bubble appears:
Chắc không đóoooooo
Do not display both speech bubbles simultaneously.

28. TATA → THREAD
Continue scrolling.
Tata gradually disappears.
The pink thread returns.
The thread forms:
Có vẻ là không nhỉ

29. TEXT TWIST / UNRAVEL TRANSITIONS
This is a special transition system.
Do NOT fade between the following messages.
Instead:
Có vẻ là không nhỉ
must twist / knot / deform / unravel.
Then reform as:
Bởi vì
Then twist/unravel again into:
Ngày này 6 năm trước
Then twist/unravel again.
But this time it must NOT simply become another static text.
The particles/thread gradually reorganize into:
24-10-2020
This must feel like the same material transforming.

30. DROP TRANSITION
Continue scrolling.
The screen suddenly drops downward.
The date:
24-10-2020
remains visible above.
The camera moves downward rapidly.
The feeling should resemble:
falling through the story.
Do not instantly replace the date.
The date should remain physically above the viewer's new position.

31. IPHONE 6 / CHAT MEMORY
On the black background:
the neon thread draws an iPhone-6-like phone outline.
This is NOT a real Zalo UI recreation.
Do NOT create a modern chat application interface.
Do NOT use a real Zalo screenshot.
Instead:
create a nostalgic neon-line memory sketch.
The thread draws:
phone frame
basic chat bubbles
recipient title
messages
Recipient:
Bảo Hà - LTV 6A5
Then, according to scroll progress, show:
Vậy c đồng ý làm ng của tớ nhé
Then the reply:
Um
The phone should feel like a memory reconstructed from neon light.

32. CHAT → THREAD
The phone/chat memory recedes.
The thread returns.
It forms:
và đó là khi mọi thứ chính thức bắt đầu

33. 24-10-2020 → 2 4 1 0
The camera travels upward again.
Return toward:
24-10-2020
Zoom into the date.
Progressively remove the hyphens.
Then:
2020
fades away.
Eventually only:
2 4 1 0
remains centered.
Do not hard cut.

34. 2-4-1-0 MEANING
As the user continues scrolling:
transform:
2 4 1 0
into:
2 trái tim
4 chữ trọn đời trọn kiếp
1 tình yêu
0 bao giờ phai
The four lines should appear with cinematic sequencing.
Then the text converges back into the thread.

35. NEXT MESSAGE
Show:
Chúng ta đã cùng nhau trải qua rất nhiều chuyện cùng nhau nhỉ
Then transform back into the thread.

36. FLYCAM HIGHWAY TRANSITION
The thread now appears diagonally.
The visual feeling should resemble:
a flycam looking down from above and entering a highway lane.
The thread behaves like a road.
The camera joins the path.
Then the thread travels approximately parallel across a laptop-like cinematic world.
This is not literally required to be a physical laptop.
The important feeling is:
the viewer has entered the road of memories.

37. PHOTO MEMORY HIGHWAY
From this point onward:
the thread keeps travelling.
Photos appear beside it.
Each photo is accompanied by a textbox/caption.
IMPORTANT:
Older photos do NOT simply fade out.
When the camera moves forward:
the old memories remain behind.
They visually lag behind the camera.
This creates a sense that the viewer is travelling forward through time.
Concept:
camera →
             old memory
                    old memory
                          current memory
                                thread →
The thread remains visible throughout.

38. PHOTO 4 + PHOTO 5
Use:
picture/nf4.jpg
picture/nf5.jpg
Both are portrait.
Use physical stacking:
PHOTO 4
   ↓
PHOTO 5 placed on top
Caption:
Lần đầu cùng đi chơi với lớp dưới danh nghĩa “một cặp”
The caption belongs to the memory.

39. PHOTO 6
Use:
picture/nf6.jpg
This is a long PTB image.
Caption:
Lần đầu chụp ptb
Because the image is long:
as the user scrolls, move the thread gradually upward to create enough room for the caption on the right side of the image.
Do not allow the textbox to overlap the important image content.

40. PHOTO 7
Use:
picture/nf7.jpg
Portrait.
Caption:
Lần đầu chụp kỷ yếu

41. PHOTO 8 — TEASING MEMORY
Use:
picture/nf8.jpg
The thread changes direction slightly.
First show text:
Lần đầu “chung chăn gối”?
This is intentionally teasing/misleading.
The text appears first.
Then it fades.
Then the photograph appears in the SAME visual position.
Do NOT place the caption next to the photo.
The photograph replaces the text.
The photograph itself should reveal the innocent context.

42. PHOTO 9
Use:
picture/nf9.jpg
This time:
Photo appears first.
Photo gradually fades.
Text replaces the photo in the same position.
Sequence:
Lần đầu
then fade.
Then:
Lần đầu được doodle ảnh ptb
then fade.
Then:
:))))
The thread remains visible.

43. THREAD → MEMORY MESSAGE
The thread gathers itself and forms:
Thực ra thì tất cả mọi trải nghiệm yêu đương của cả 2 đều là những lần đầu vô cùng đáng nhớ nhỉ
Then:
Vì bọn mình là tình đầu của nhau mà
Then:
cuộn chuột mỏi tay chưa
Then:
cùng tớ ôn lại thêm thật nhiều nữa nhé
Each replaces the previous one.
Do not create a wall of text.

44. ANNIVERSARY MEMORY SECTION
The thread continues through the next memories.
Format:
image
+
caption
The layout can alternate spatially where appropriate, but should remain cinematic and integrated with the thread.

PHOTO 10
Use:
picture/nf10.jpg
Landscape.
Caption:
Anni 2 năm

PHOTO 11
Use:
picture/nf11.jpg
Landscape.
Caption:
ANNI 4 NĂM
Preserve capitalization exactly.

PHOTO 12
Use:
picture/nf12.jpg
Landscape.
Caption:
ANNI 5 NĂM

45. DIFFICULT TIMES
Thread forms:
Ngoài những khoảnh khắc lãng mạn
Then:
Tớ với Bông còn cùng nhau trải qua những lúc khó khăn
Each should replace the previous.

46. PHOTO 13
Use:
picture/nf13.jpg
Portrait.
Caption sequence:
Này là hồi lớp 9 cãi nhau xong tí thì chia tay nè
Then change to:
xong lại cùng nhau vượt qua như mọi lần
The photograph remains while the caption changes.

47. PHOTO 14
Use:
picture/nf14.jpg
Portrait.
Text sequence:
Này lại là đợt lớp 12 nè
then:
Cũng suýt nữa thì để mất nhau
then:
Nhưng mà vẫn thế, lại cùng nhau vượt qua
then:
Trên đường về tớ vui quá nên chụp ảnh nè
The photograph remains.
Only the caption transforms.

48. PHOTO 15
Use:
picture/nf15.jpg
Portrait.
Caption:
Bonus ảnh áo phao dzai Hàn Quốc nè:))
Then:
Tại cậu bảo đợt đó mặc áo này nhìn đẹp zai nên mới xuôi xuôi
Preserve exact wording.

49. PHOTO 16
Use:
picture/nf16.jpg
Square.
Caption:
Cùng nhau đội mưa nữa
Then the text disappears.
The photograph remains.
New text:
cũng tính là một kiểu vượt khó ha

50. PHOTO 17
Use:
picture/nf17.jpg
Landscape.
Text sequence:
Kể cả là đến hiện tại
then:
Chúng ta vẫn luôn tìm ra cách để vượt qua những khó khăn ha
then:
Dù có cách cả ngàn cây số
This particular line should move upward during the transition.
Then show:
Chúng ta vẫn luôn tìm được cách để cả 2 trái tim trở nên đồng điệu

51. THREAD → HAPPINESS MESSAGE
The thread returns.
It forms:
Nhưng tất nhiên chủ yếu là
Then transforms into:
Tớ và cậu đều đã có những khoảng thời gian hạnh phúc nhất với nhau
This concludes the preceding memory road.

52. SCENE — 99 KỶ NIỆM / MEMORY COLLAGE
This is one of the most important scenes.
The scene remains inside the SAME continuous world.
It is NOT a separate page.
It is NOT a route change.
It is NOT an independent gallery.
The thread continues into this memory universe.
The visual concept is:
a person taking a physical stack of photographs and spreading them across a table.
The final composition should feel physical.
Not digital-gallery-like.
Not grid-like.
Not slideshow-like.

53. 99 IMAGE DIRECTORY STRUCTURE
Exact structure:
picture/
├── 91.jpg
├── 92.jpg
├── 93.jpg
├── 94.jpg
├── 95.jpg
├── 96.jpg
├── 97.jpg
├── 98.jpg
├── 99.jpg
├── IMG* (90 original filenames, unchanged)
├── nf1.jpg ... nf17.jpg
├── ltv.jpg
└── qr
There must be exactly:
9 + 90 = 99 photographs
Do not accidentally include:
nf1.jpg through nf17.jpg
ltv.jpg
qr
in this 99-photo count.

54. 99 PHOTO COLOR RULE
All 99 photos must retain original colors.
Absolutely no:
grayscale
black and white
sepia
monochrome
color grading that changes the original photograph
global tint
Allowed only for animation:
temporary blur
temporary opacity
temporary brightness
shadow
glow around the photograph
The photograph itself must retain its original color.

55. 99 PHOTO ORIENTATION RULE
Preserve the original aspect ratio of every photograph.
Portrait stays portrait.
Landscape stays landscape.
Square stays square.
Never:
stretch
distort
force-crop
squash
Use sizing equivalent to:
object-fit: contain;
when appropriate.

56. INDIVIDUAL 99 PHOTO ANIMATION
Each photograph follows:
blurred
    ↓
fade in
    ↓
scale up
    ↓
visual focus
    ↓
scale down
    ↓
move backward
    ↓
slight rotation
    ↓
place into collage
Conceptually:
pick up photograph → inspect it closely → put it onto the table.
The image must NOT disappear after being inspected.
Once placed:
it remains.

57. 99 PHOTO PHASE 1
The photograph starts:
small
slightly blurred
low opacity
As scrolling progresses:
blur decreases
opacity increases
scale increases

58. 99 PHOTO PHASE 2
The photograph becomes the visual focus.
It may become very large.
It may approach full viewport.
But:
NEVER distort it.
Use blurred extensions around it when necessary.
The viewer should feel:
I am approaching this specific memory.

59. 99 PHOTO PHASE 3
After visual focus:
the image:
scales down
rotates slightly
moves backward
moves toward final collage position
It must feel like physically placing the photograph on a table.

60. FIRST NINE PHOTOGRAPHS
The first nine:
91.jpg
92.jpg
93.jpg
94.jpg
95.jpg
96.jpg
97.jpg
98.jpg
99.jpg
must appear exactly in this order.
Each follows:
blur
→ fade in
→ scale up
→ focus
→ scale down
→ move backward
→ place
Photo 2 begins after photo 1.
Photo 3 begins after photo 2.
Continue until photo 9.

61. CENTRAL 9 COMPOSITION
After photograph 9:
the first nine become the visual core.
Do NOT arrange them as:
grid
rows
columns
perfect masonry
perfect symmetry
Instead:
slight rotations
overlaps
offsets
different scales
physical stacking
controlled irregularity
They should feel like photographs physically placed on a table.

62. ZOOM OUT AFTER PHOTO 9
After photo 9 is placed:
the camera slowly zooms out.
The nine central photos become smaller.
But they must remain visually important.
They must NOT become tiny thumbnails.
The surrounding black space gradually becomes visible.
The viewer should suddenly understand:
these nine photographs are the central core of something much larger.

63. THE OTHER 90 PHOTOGRAPHS
Then the remaining 90 photographs begin appearing.
They come from:
picture/IMG*
Their display order may be randomized.
However:
the randomness must be deterministic/stable.
Use a seeded random generator.
Do not produce a different layout every time the page is rendered.

64. CONTROLLED RANDOMNESS
The 90 photographs may vary in:
x
y
rotation
scale
overlap
order
BUT the randomness must be constrained.
They must expand outward from the central nine.
Do NOT place random photos immediately at arbitrary points across the entire screen.
The composition should gradually grow:
           photo
       photo       photo

    photo   CORE    photo

       photo       photo
            photo
but without becoming a symmetrical diagram.
The final composition must be organic.

65. 99 PHOTO VISUAL HIERARCHY
The original nine remain visually dominant.
Think:
9 core memories
        +
90 memories expanding outward
The 90 photos must never completely hide the central nine.
Do not allow:
complete obstruction
extreme shrinking
loss of central focus

66. FINAL 99 COLLAGE
At the end:
all 99 photographs coexist.
Do NOT fade them all out.
Do NOT turn them into thumbnails.
Do NOT transform them into a conventional gallery.
The final feeling must be:
an actual pile of memories physically spread over a table.
Natural.
Layered.
Deep.
Slightly messy.
Intentional.
Beautiful.

67. EMOTIONAL TEXT SCENE
After the 99-photo collage:
the images gradually disappear.
Transition to black.
Then begin the emotional text sequence.
VERY IMPORTANT:
The quoted lines below are NOT meant to appear simultaneously.
Each line replaces the previous line.
Do not create a wall of text.
Each scroll segment should transition:
old phrase
    ↓
disappear
    ↓
new phrase
Use the same cinematic neon typography.

68. EXACT EMOTIONAL TEXT SEQUENCE
Use these EXACT strings:
Đẹp thật nhỉ,
then:
chuyện tình mình.
then:
Nói thật lòng với cậu là
then:
trong lúc làm món quà này
then:
khi tớ xem lại toàn bộ những bức ảnh, những kỉ niệm trong máy
then:
tớ có nhiều cảm xúc đến mức không biết phải diễn tả ra sao
then:
Nhìn lại cả một đoạn hành trình mà cậu đã đồng hành cùng tớ
then:
⅓ cuộc đời hiện tại của tớ
then:
tớ lại cảm thấy biết bao cảm xúc hỗn độn, cảm thấy bản thân may mắn, cảm thấy biết ơn, cảm thấy hạnh phúc, cảm thấy bản thân mắc nợ cậu quá nhiều
then:
Mặc dù tớ đã nói câu này nhiều lần lắm rồi
then:
Nhưng tớ vẫn muốn nói lại
then:
Tớ yêu Bông
then:
Tớ yêu Bông rất nhiều
then:
Yêu Bông nhiều nhất thế giới
then:
Tớ vẫn luôn và sẽ luôn biết ơn cậu rất nhiều vì đã xuất hiện trong cuộc đời của tớ, cùng tớ trưởng thành
then:
Cậu đã luôn và sẽ luôn là lý do để tớ tiếp tục cố gắng
then:
Tớ biết rằng bản thân tớ sẽ làm được
then:
Và cũng biết rằng cả 2 chúng ta sẽ cùng nhau làm được
then:
Tớ biết rằng tớ và cậu sẽ lại cùng nhau vượt qua tất cả những gì sẽ tới trong tương lai
then:
Mặc dù còn chả biết đó là gì, nhưng tớ biết
then:
Chỉ cần có cậu ở bên, dù có là chuyện gì rồi cũng có thể vượt qua hết
then:
Ngày này 6 năm trước, chuyện tình của mình bắt đầu
then:
Đến ngày hôm nay
then:
Cả tớ và Bông đã cùng nhau tiếp tục bước sang những giai đoạn mới
then:
Đây là giai đoạn mà cả hai cùng nuôi dưỡng tương lai của bản thân và của chính đôi mình
then:
Mặc dù có những lúc bất lực vì nỗi nhớ chợt đến mà không thể làm gì
then:
Nhưng tớ vẫn tin rằng tất cả mọi thứ đều xứng đáng
then:
Ngày này 6 năm trước,
then:
Tớ tin rằng hai đứa trẻ ấy chắc chắn đều không thể ngờ được rằng 6 năm sau chúng lại đang sống trong một tương lai hạnh phúc đến thế
then:
Tớ chúc cho chúng ta có thể tiếp tục hạnh phúc,
then:
hạnh phúc đến mức tớ và Bông ở hiện tại nếu nhìn vào sẽ phản ứng như cách tớ và Bông của 2020 phản ứng với hiện tại này
then:
Rồi lại chúc cho tớ và Bông của 60 năm sau, khi nhìn lại cả một cuộc đời mà một nửa thực sự là đối phương sẽ mỉm cười từ tận đáy lòng bởi đã luôn nỗ lực, luôn hết mình vì hiện tại
then:
Một lần nữa, Nam xin cảm ơn Bông, cảm ơn cậu vì đã giúp tớ trở thành phiên bản hiện tại của chính tớ. Nam xin lỗi Bông vì những lần đã làm cậu tổn thương trong quá khứ. Nam chắc chắn sẽ yêu cậu nhiều hơn, cũng xin được cậu yêu nhiều hơn, xin cho Bông luôn hạnh phúc, xin cho chúng mình sẽ được tiếp tục có nhau là người yêu, là tri kỉ, và xin cho đoạn duyên này sẽ không bao giờ đứt, xin cho tất cả những sự chân thành, tất cả những nỗ lực của cả 2 sẽ được bánh xe của số phận tác thành.
Then:
Bông ơi
Then:
Tớ yêu cậu

69. EMOTIONAL TEXT VISUAL STYLE
The text scene should be restrained.
Do not add excessive decoration.
Black background.
Neon typography.
Large emotional whitespace.
The viewer should feel alone with the words.
The strongest lines may become visually larger.
Especially:
Tớ yêu Bông
Tớ yêu Bông rất nhiều
Yêu Bông nhiều nhất thế giới
But do not turn the scene into a flashy neon advertisement.
It must remain intimate.

70. EMOTIONAL TEXT → COMPLETE ESSAY
After the individual emotional phrases:
continue scrolling.
Now transform the fragmented text experience into one complete readable essay.
This is the ONE place where a large text block is intentionally allowed.
Do not treat it as a wall-of-text mistake.
This is deliberately the retrospective reading phase.
Use exactly this content:
Đẹp thật nhỉ, chuyện tình mình. Nói thật lòng với cậu là trong lúc làm món quà này, khi tớ xem lại toàn bộ những bức ảnh, những kỉ niệm trong máy, tớ có nhiều cảm xúc đến mức không biết phải diễn tả ra sao.

Nhìn lại cả một đoạn hành trình mà cậu đã đồng hành cùng tớ - ⅓ cuộc đời hiện tại của tớ - tớ lại cảm thấy biết bao cảm xúc hỗn độn, cảm thấy bản thân may mắn, cảm thấy biết ơn, cảm thấy hạnh phúc, cảm thấy bản thân mắc nợ cậu quá nhiều. Mặc dù tớ đã nói câu này nhiều lần lắm rồi, nhưng tớ vẫn muốn nói lại:
“Tớ yêu Bông”
“Tớ yêu Bông rất nhiều”
“Yêu Bông nhiều nhất thế giới”

Tớ vẫn luôn và sẽ luôn biết ơn cậu rất nhiều vì đã xuất hiện trong cuộc đời của tớ, cùng tớ trưởng thành. Cậu đã luôn và sẽ luôn là lý do để tớ tiếp tục cố gắng.

Tớ biết rằng bản thân tớ sẽ làm được, và cũng biết rằng cả 2 chúng ta sẽ cùng nhau làm được. Tớ biết rằng tớ và cậu sẽ lại cùng nhau vượt qua tất cả những gì sẽ tới trong tương lai. Mặc dù còn chả biết đó là gì, nhưng tớ biết, chỉ cần có cậu ở bên, dù có là chuyện gì rồi cũng có thể vượt qua hết.

Ngày này 6 năm trước, chuyện tình của mình bắt đầu. Đến ngày hôm nay, cả tớ và Bông đã cùng nhau tiếp tục bước sang những giai đoạn mới. Đây là giai đoạn mà cả hai cùng nuôi dưỡng tương lai của bản thân và của chính đôi mình. Mặc dù có những lúc bất lực vì nỗi nhớ chợt đến mà không thể làm gì. Nhưng tớ vẫn tin rằng tất cả mọi thứ đều xứng đáng. Ngày này 6 năm trước, tớ tin chắc hai đứa trẻ ấy chắc chắn đều không thể ngờ được rằng 6 năm sau chúng lại đang sống trong một tương lai hạnh phúc đến thế.

Tớ chúc cho chúng ta có thể tiếp tục hạnh phúc, hạnh phúc đến mức tớ và Bông ở hiện tại nếu nhìn vào sẽ phản ứng như cách tớ và Bông của 2020 phản ứng với hiện tại này. Rồi lại chúc cho tớ và Bông của 60 năm sau, khi nhìn lại cả một cuộc đời mà một nửa thực sự là đối phương sẽ mỉm cười từ tận đáy lòng bởi đã luôn nỗ lực, luôn hết mình vì hiện tại

Một lần nữa, Nam xin cảm ơn Bông, cảm ơn cậu vì đã giúp tớ trở thành phiên bản hiện tại của chính tớ. Nam xin lỗi Bông vì những lần đã làm cậu tổn thương trong quá khứ. Nam chắc chắn sẽ yêu cậu nhiều hơn, cũng xin được cậu yêu nhiều hơn, xin cho Bông luôn hạnh phúc, xin cho chúng mình sẽ được tiếp tục có nhau là người yêu, là tri kỉ, và xin cho đoạn duyên này sẽ không bao giờ đứt, xin cho tất cả những sự chân thành, tất cả những nỗ lực của cả 2 sẽ được bánh xe của số phận tác thành.

Thượng Hải, 24/10/2026

Người yêu của cậu -

Nam Dang
Do not rewrite this essay.
Do not correct its grammar.
Do not modify punctuation.

71. ESSAY PRESENTATION
Unlike the previous emotional sequence:
the essay MAY occupy a large vertical area.
It should be comfortable to read.
Use:
generous line height
readable width
responsive typography
subtle neon glow
dark background
elegant margins
Do not cram the essay into a tiny box.
Do not clip text.
Do not force a fixed-height container that causes text to disappear.

72. FINAL JOURNEY OVERVIEW
After the essay:
continue scrolling.
The camera begins zooming out.
The viewer should gradually see an overview of the journey that the thread has travelled.
This is an important cinematic payoff.
The viewer should realize:
the entire website was one connected journey.
The camera should reveal the thread from earlier sections.

73. ABSOLUTE RULE FOR THE FINAL OVERVIEW
DO NOT make the thread a straight line.
This is one of the most important visual constraints.
Forbidden:
────────────────────────────────────────────
scene 1 → scene 2 → scene 3 → scene 4 → end
That would be boring.
Instead use a beautifully designed nonlinear path:
       ╭──── memory ────╮
        │                ╰─────╮
    ╭───╯                      │
    │                    ╭────╯
    ╰───────╮         ╭──╯
            ╰─────────╯
                  ╲
                   ╰──── memory
                         ╲
                          ╰──── text
But the actual implementation should be significantly more elegant and complex.
Use:
loops
S-curves
diagonals
elevation-like movements
spatial turns
nodes
memory clusters
varying scale
The overview should resemble a beautiful abstract journey/map.

74. WHAT TO SHOW IN THE FINAL OVERVIEW
The overview should summarize the journey.
For the emotional text portion:
ONLY show the complete essay.
Do NOT show every individual emotional phrase again.
The viewer should see:
journey thread
+
memory nodes
+
photograph clusters
+
essay node
Not:
every single previous sentence

75. THREAD → DOUBLE LILY
Continue scrolling.
The thread leaves the overview.
It travels upward.
Then:
the thread begins blooming.
It transforms into a double lily flower.
This should feel like the culmination of the relationship journey.
The flower should be generated with elegant visual geometry using SVG/canvas/CSS.
Do not use a generic stock flower.
The transition should be:
thread
 ↓
petal-like curves
 ↓
flower structure
 ↓
double lily
The viewer should feel that the thread itself has bloomed.

76. LILY FIELD
Continue scrolling.
The camera zooms slightly outward.
One flower becomes many.
Reveal an entire field/forest of lilies.
The scene should feel expansive.
Use:
depth
layers
subtle parallax
foreground flowers
background flowers
atmospheric haze
Avoid making every flower identical.
Use controlled procedural variation.

77. FIREWORKS
Continue scrolling.
Fireworks begin launching.
First:
normal fireworks.
Then some explosions begin forming:
yêu Bông
and:
❤️
The fireworks should be particle-based.
The text fireworks should feel like fireworks naturally organizing into letters.
Do not simply place static text on top of a firework image.
Concept:
particles
   ↓
explosion
   ↓
particles organize
   ↓
"yêu Bông"
and hearts.

78. FINAL QR MEMORY
After the fireworks:
transition toward:
picture/qr
This is the final QR red-envelope image.
The final scene should be calm after the fireworks.
Do not end with another busy animation.
Allow the QR image to become the final focal point.
Preserve the image correctly.
Do not distort the QR.
Do not blur the QR itself.
If a glow is added:
the actual QR must remain readable.
The relationship thread may gently approach or frame the final QR.
The final feeling should be:
the journey has reached its final destination.

79. FINAL SCENE EMOTIONAL RHYTHM
The final sequence should feel like:
huge emotional journey
        ↓
overview
        ↓
flower
        ↓
flower field
        ↓
fireworks
        ↓
quiet
        ↓
final QR
Do not immediately cut from fireworks to QR.
Give the final transition breathing room.

80. PERFORMANCE REQUIREMENTS
The website contains many photographs and complex animation.
Performance matters.
Use:
lazy loading
image decoding
progressive loading
only render high-cost effects when needed
avoid unnecessary DOM updates
requestAnimationFrame
transform/opacity for frequent animation
avoid layout-triggering properties during continuous scrolling
use will-change selectively
avoid hundreds of continuously animated expensive CSS filters
avoid rebuilding the entire DOM on every frame
For the 99-photo scene:
do not decode all 99 full-size photographs immediately if unnecessary.
Load the first nine early.
Progressively load the remaining 90 as their scene becomes relevant.

81. IMPORTANT: 99 FILE MANIFEST
A browser cannot reliably enumerate arbitrary local directory contents.
Therefore, if the browser cannot directly discover filenames inside:
picture/IMG*
the n8n generation process must create a manifest.
For example:
const MEMORY_90 = [
    "original-name-1.jpg",
    "original-name-2.jpg",
    ...
];
Do not assume JavaScript can magically list a local directory.
The n8n workflow should generate this manifest from the supplied asset folder when possible.
The original filenames must remain unchanged.

82. RESPONSIVE BEHAVIOR
The primary target is a desktop/laptop cinematic experience.
However, the implementation should degrade gracefully on smaller screens.
Do not redesign the story.
Preserve:
sequence
text
thread
memories
final QR
On smaller screens:
adjust:
camera scale
text size
photo scale
world coordinates
spacing
Do not change the narrative.

83. REVERSE SCROLL
Every animation must work backward.
For example:
If the viewer scrolls forward:
thread → image → memory
then scrolls backward:
memory → image → thread
The website must reverse smoothly.
Do NOT rely on one-way event triggers.
Everything must be derived from normalized timeline progress.

84. NO RANDOM UNCONTROLLED MOTION
Do not add animations merely because they look cool.
Every animation must have a narrative purpose.
Good:
thread bends
→ camera follows
→ memory appears
Bad:
random floating particles everywhere
random zoom
random rotation
random flashing
The website should feel intentional.

85. NO GENERIC WEBSITE EFFECTS
Avoid generic:
parallax template
fade-up sections
card hover effects
standard scroll reveal
generic gradient background
generic glassmorphism cards everywhere
generic love website templates
The website must feel custom-built for this story.

86. THREAD VISUAL CONSISTENCY
The thread must maintain:
same color
same brightness
same glow language
same visual identity
throughout the story.
Only the Tata section is allowed to temporarily transition into a localized red environment.
After Tata:
restore the original thread.
The thread should visually feel like the same physical object that has travelled through six years.

87. THREAD VISIBILITY RULE
The thread should always exist conceptually.
When the camera is focused on a photograph:
the thread may:
move outside the viewport
become subtle
become partially obscured
lose visual dominance
But it must not feel like it has ceased to exist.
When moving toward the next memory:
the thread returns naturally.

88. MEMORY PHOTOGRAPH RULE
When an image becomes the main visual focus:
the image gets priority.
The thread may become less prominent.
Do not force the thread to visually cross directly over the important subject of a photograph.
The thread is the guide, not the obstacle.

89. TRANSITION QUALITY STANDARD
Every transition should answer:
What physical thing is happening?
Examples:
Text becomes thread:
letters are physically unraveling into the thread.
Thread becomes message:
thread particles assemble into letters.
Photo appears:
camera approaches a photograph.
Photo recedes:
viewer puts the photograph back onto the table.
99 collage:
memories are physically spread across a table.
Final flower:
the relationship thread blooms.
Fireworks:
accumulated emotion explodes into celebration.
QR:
final destination.
Avoid arbitrary transitions without physical/cinematic logic.

90. MASTER TIMELINE ARCHITECTURE
Create one master timeline.
Conceptually:
const STORY = [
    {
        id: "opening",
        start: 0.00,
        end: 0.04
    },
    {
        id: "opening-message",
        start: 0.04,
        end: 0.07
    },
    {
        id: "thread-origin",
        start: 0.07,
        end: 0.10
    },

    ...
];
The exact numerical ranges are implementation details.
The important requirement:
Every visual state must map to a continuous normalized progress.
Use helper functions such as:
mapRange(progress, start, end)
and:
clamp()
lerp()
easeInOut()
smoothstep()
to create cinematic movement.

91. LOCAL TIMELINE MODEL
Each scene should have local progress:
localProgress = normalize(
    masterProgress,
    scene.start,
    scene.end
);
Then all scene elements are calculated from that local progress.
For example:
sceneProgress = 0
    image blurred

sceneProgress = 0.5
    image sharp and large

sceneProgress = 1
    image placed into world
This makes the entire experience reversible.

92. CAMERA ANCHORS
Define semantic camera anchors for major story points.
Examples:
opening
ltv
photo2
photo3
sCurve
tata
date
chat
2410
photo4
photo5
photo6
photo7
photo8
photo9
photo10
photo11
photo12
photo13
photo14
photo15
photo16
photo17
collage99
emotionalText
essay
overview
lily
flowerField
fireworks
qr
These anchors should live inside the same world coordinate system.

93. WORLD COORDINATE SYSTEM
Do not position every scene relative to the viewport independently.
Create a large virtual world.
For example conceptually:
WORLD
────────────────────────────────────────

opening

       LTV

              photos

     S curve

                     Tata

          date

             chat

                    2 4 1 0

      memory road

                    photos

          99 collage

                      essay

             overview

                    lily field

                         fireworks

                              QR
The exact geometry should be designed creatively.
But it must be one world.

94. IMPORTANT: DO NOT MAKE IT LITERALLY ONE LONG PAGE OF BLOCKS
The implementation may technically use a long scroll container.
But visually it must NOT behave like:
SECTION 1
SECTION 2
SECTION 3
SECTION 4
SECTION 5
Instead the viewer should feel:
one camera
travelling through one environment

95. INITIAL PRESENTATION
At page load:
the cinematic viewport should be immediately visible.
Do not expose the entire scroll length.
The page itself can have a large invisible scroll driver.
The visible experience must remain cinematic.

96. SCROLL DRIVER
A recommended architecture:
<body>
    <div id="scroll-driver"></div>

    <main id="cinematic-world">
        ...
    </main>
</body>
The world is pinned/fixed visually.
The scroll driver provides the continuous scroll distance.
The camera/world transforms based on normalized document scroll.
This allows:
scroll position
→ progress
→ camera
→ story
without requiring separate HTML sections.

97. SMOOTHING
Use target/current progress.
Example conceptual model:
targetProgress = getScrollProgress();

currentProgress +=
    (targetProgress - currentProgress) * smoothing;
Then render.
The smoothing must be carefully tuned.
Too much:
the website feels delayed.
Too little:
the website feels mechanical.
The final result should feel like a camera with physical inertia.

98. CAMERA INERTIA
The camera should have slight cinematic inertia.
When the user scrolls:
the camera follows.
When the user stops:
the camera settles.
Do not make it so elastic that it feels disconnected from scrolling.

99. DEBUG MODE
Create a hidden development/debug mode if practical.
For example:
?debug=1
can display:
current master progress
current scene
camera coordinates
thread length
asset loading status
This debug UI must NOT appear in the normal presentation.

100. ACCESSIBILITY / FALLBACK
Default mode should preserve the intended cinematic experience.
If:
prefers-reduced-motion
is enabled:
reduce extreme motion and camera movement.
However, do not destroy the story.
All essential text must remain accessible.

101. TEXT BOX SAFETY
For every textbox:
ensure:
max-width
padding
line-height
overflow-wrap
are safe.
Do not allow:
clipped text
text escaping its container
text hidden under another layer
text extending outside viewport
unreadable neon blur
Long text should automatically occupy multiple lines.

102. IMAGE SAFETY
Every image must:
preserve aspect ratio
remain sharp when focused
have sufficient contrast
not be unintentionally cropped
not be distorted
For full-screen memory immersion:
use:
sharp original image
+
blurred enlarged background
rather than stretching the original.

103. VISUAL DEPTH
Use multiple depth layers where appropriate:
foreground
middle
thread
memory
background
atmosphere
But do not overdo it.
The experience should feel cinematic rather than like a game.

104. FINAL QUALITY BAR
Before considering the website complete, verify:
Scroll
Is the scroll continuous?
Is there no mandatory scroll snap?
Does reverse scrolling work?
Does the camera have cinematic inertia?
Thread
Is there truly one continuous thread?
Does it visually connect the major scenes?
Is it never reduced to one boring straight line?
Does text genuinely morph into thread?
Does thread genuinely morph into text?
Color
Is the global neon color centralized?
Is the thread the same pink throughout?
Does Tata's local red transition restore the original pink?
Images
Are all normal images mapped correctly?
Are all 99 collage images present?
Are portrait images still portrait?
Are landscape images still landscape?
Is original color preserved?
Is aspect ratio preserved?
99 collage
Exactly 99 images?
First 9 in order?
Remaining 90 organically distributed?
Central 9 remain dominant?
No grid?
No carousel?
No slideshow?
Text
Exact Vietnamese wording?
No automatic corrections?
No clipping?
Emotional sequence replaces text rather than accumulating?
Final essay is allowed to be one complete text block?
Final
Overview exists?
Overview uses nonlinear thread?
Double lily?
Flower field?
Fireworks?
“yêu Bông” fireworks?
Heart fireworks?
Final QR image?

105. IMPORTANT NEGATIVE CONSTRAINTS
The generated implementation must NOT:
Turn this into a normal landing page.
Use a navbar.
Use a conventional hero → section → section layout as the visual experience.
Use scroll snap.
Make the thread a straight line.
Create a new unrelated thread for each scene.
Randomly recolor the thread.
Turn the 99 photos into a grid.
Turn the 99 photos into a carousel.
Turn the 99 photos into a slideshow.
Convert the 99 photos to black and white.
Distort portrait photographs.
Distort landscape photographs.
Correct the user's Vietnamese.
Rewrite informal wording.
Remove emojis or emoticons.
Create random decorative animation without narrative purpose.
Use generic romantic website templates.
Make text unreadably decorative.
allow text clipping.
Use a real Zalo UI for the 2020 chat memory.
Permanently change the global pink color during the Tata scene.
Treat the 99-photo scene as an independent page.
Show all emotional sentences simultaneously.
Show all previous emotional text again during the final overview.
Make the final journey overview a straight line.

106. CORE CREATIVE PRINCIPLE
The website should feel as if:
someone took six years of memories, photographs, messages, places, difficult moments, happy moments, and emotions, turned all of them into one glowing thread, and then invited the viewer to physically travel along that thread.
The viewer should feel:
I am not scrolling through a website.

I am travelling through a memory.
The thread is the road.
The camera is the viewer.
The photographs are memories.
The text is emotion.
The 99-photo collage is accumulated life.
The essay is reflection.
The flower is growth.
The fireworks are celebration.
The QR is the final destination.

107. FINAL IMPLEMENTATION PHILOSOPHY
When implementing any scene, ask:
What is the camera doing?
What is the thread doing?
Where is the viewer physically located?
What object is the viewer approaching?
What object is being left behind?
How does this object transform into the next object?
Where does the same thread continue afterward?
Every scene must answer these questions.
Do not implement scenes independently.
Always think in terms of:
WORLD
+
CAMERA
+
THREAD
+
MEMORY
+
TIME

108. FINAL REQUIRED OUTPUT FROM THE CODE-GENERATION WORKFLOW
The n8n workflow should generate a complete runnable website.
At minimum provide:
index.html
styles.css
config.js
assets.js
story.js
thread.js
camera.js
timeline.js
memories.js
collage99.js
particles.js
main.js
plus all required asset references.
If the workflow can generate documentation, also generate:
README.md
containing:
how to place assets
how the image numbering works
how the 99-photo manifest works
how to change neon colors
how to change music
how to run the static website
how to enable debug mode

109. FINAL ACCEPTANCE TEST
The website should only be considered successful if the following mental test passes:
Start at the beginning.
Scroll slowly.
You see the first photograph.
It becomes glass-like.
It blurs.
You are pulled into darkness.
Pink text appears.
The text becomes a thread.
You follow the thread.
It leads to Lương Thế Vinh.
It becomes another message.
It continues.
You see photograph 2.
Then photograph 3 is physically placed on it.
The thread returns.
You follow it.
You do not immediately know it is an S.
The camera pulls away.
You suddenly see the S.
The thread writes a message.
You follow it into Tata.
The local color changes.
Tata speaks.
Tata disappears.
The thread returns.
Text twists into other text.
Text becomes a date.
You fall downward.
The date remains above.
A neon iPhone appears.
The chat memory appears.
The thread continues.
The date becomes:
2 4 1 0
Then becomes the four meanings.
Then becomes the thread again.
You enter the highway of memories.
Photographs remain behind you.
You continue.
You reach the 99-photo memory universe.
One photo.
Then another.
Then another.
Nine central memories.
Camera pulls away.
Ninety more memories spread around them.
All 99 remain.
The collage feels physical.
It fades.
Black.
One emotional sentence.
Then another.
Then another.
You reach:
Tớ yêu Bông
Then:
Tớ yêu Bông rất nhiều
Then:
Yêu Bông nhiều nhất thế giới
You continue.
The entire emotional journey becomes one essay.
You continue.
The camera pulls away.
You suddenly see the whole thread.
It is beautiful.
It is NOT straight.
It is a journey.
The thread travels upward.
It blooms.
A double lily.
Then an entire field.
Then fireworks.
Fireworks form:
yêu Bông
and hearts.
Then everything becomes quiet.
The final QR appears.
And the viewer understands:
the entire website was one continuous journey.
That is the intended result.
Do not optimize this into a conventional website.
Do not simplify the story into independent sections.
Do not replace the continuous thread architecture with generic scroll animations.
Build the experience as one cinematic world controlled by one continuous scroll timeline.

## Requirements checklist
- [R1] MASTER PROMPT Build a Cinematic Scroll-Driven 6-Year Anniversary Website as One Continuous Story World You are an expert creative frontend engineer, interaction designer, motion designer, and cinematic web experience architect. Your task is to generate a complete, production-quality, highly cinemati / 0. ABSOLUTE PRIORITY: The following rules have the highest priority. If any later instruction conflicts with these rules, these rules win. RULE 1 — ONE CONTINUOUS WORLD Treat the entire website as ONE continuous cinematic world. Do not implem... (full text in section "0. ABSOLUTE PRIORITY" of the message) / 1. TECHNICAL STACK: Use: HTML CSS vanilla JavaScript Do NOT use: React Vue Angular Svelte Next.js Nuxt GSAP Three.js jQuery animation frameworks component frameworks Use native browser APIs. Allowed: SVG Canvas CSS transforms CSS filters CS... (full text in section "1. TECHNICAL STACK" of the message) / 2. REQUIRED PROJECT ARCHITECTURE: Generate a clean project structure similar to: / ├── index.html ├── css/ │   └── styles.css ├── js/ │   ├── config.js │   ├── assets.js │   ├── story.js │   ├── thread.js │   ├── camera.js │   ├── timeline.js │   ├── mem... (full text in section "2. REQUIRED PROJECT ARCHITECTURE" of the message)
- [R2] 3. CENTRAL CONFIGURATION: Create ONE centralized configuration object/file for global visual settings. At minimum: const THEME = { background: "#050505", darkRedBlack: "#16090D", deepMutedRed: "#632533", mainCrimson: "#A83F5A", neonPink: "#E05A78... (full text in section "3. CENTRAL CONFIGURATION" of the message) / 4. GLOBAL COLOR LANGUAGE: The visual language is: dark cinematic crimson-red with a subtle pink undertone. Avoid: hot pink candy pink magenta pure red oversaturated neon pink childish romantic pink Use: #050505 — primary background #16090D — dark... (full text in section "4. GLOBAL COLOR LANGUAGE" of the message) / 5. THE THREAD — MOST IMPORTANT VISUAL OBJECT: The neon thread is the central object of the entire website. It is not a decorative line. It is not a different line for every scene. It is ONE continuous story thread. Conceptually: ┌── memory / ───────╮─────────╯ │ ╰──... (full text in section "5. THE THREAD — MOST IMPORTANT VISUAL OBJECT" of the message) / 6. THREAD CONTINUITY: The thread must feel physically continuous. If the thread leaves the screen on the right: it must conceptually continue outside the viewport. When it later returns: it must feel like the same thread returning. Do not cre... (full text in section "6. THREAD CONTINUITY" of the message)
- [R3] 7. THREAD-TO-TEXT MORPH SYSTEM: Implement a reusable text/thread morph engine. For complex morphs, use Canvas or SVG particle sampling. The engine should support: thread → text text → thread text A → thread → text B thread → particles → text text → par... (full text in section "7. THREAD-TO-TEXT MORPH SYSTEM" of the message) / 8. SCROLL SYSTEM: This is a continuous scroll-progress experience. It is NOT scroll snap. It is NOT: scroll once → scene 1 scroll again → scene 2 Instead: scroll progress = continuous value from 0 to 1 Example: 0% thread begins 30% camera... (full text in section "8. SCROLL SYSTEM" of the message) / 9. CAMERA ENGINE: The camera must behave like a cinematic flycam. The camera is not simply the browser viewport. Simulate a camera travelling through a large virtual world. The virtual world should be much larger than the viewport. Use: t... (full text in section "9. CAMERA ENGINE" of the message) / 10. CAMERA FOLLOWING THE THREAD: The camera should be able to sample the position of the master thread. If the thread is an SVG path: use mechanisms such as: path.getTotalLength() path.getPointAtLength() to calculate: camera position tangent direction l... (full text in section "10. CAMERA FOLLOWING THE THREAD" of the message)
- [R4] 11. IMAGE ZOOM RULE: When the camera approaches an image: the image may visually expand until it dominates or fills the viewport. BUT: NEVER distort the image. Preserve: original orientation original aspect ratio original proportions For exa... (full text in section "11. IMAGE ZOOM RULE" of the message) / 12. TYPOGRAPHY: Use a readable modern font. Do NOT use: Times New Roman overly decorative wedding fonts childish handwritten fonts extremely thin fonts overly futuristic fonts Recommended font stack: font-family: Inter, "SF Pro Display"... (full text in section "12. TYPOGRAPHY" of the message) / 13. PRESENTATION MODE: When the website opens: the viewer should immediately enter the cinematic presentation. Do not show: navigation bar top menu unnecessary controls conventional website header visible page sections buttons asking the user ... (full text in section "13. PRESENTATION MODE" of the message) / 14. AUDIO: The background music is: music.mp3 Attempt to start the music when the experience opens. However, browser autoplay restrictions may prevent immediate playback. Therefore: Attempt autoplay. If blocked, do not break the ex... (full text in section "14. AUDIO" of the message)
- [R5] 15. ASSET MAPPING: There are two different image systems. A. Normal story images All normal story images are: picture/ Mapping: ẢNH 1  → picture/nf1.jpg ẢNH 2  → picture/nf2.jpg ẢNH 3  → picture/nf3.jpg ... ẢNH 17 → picture/nf17.jpg Do not... (full text in section "15. ASSET MAPPING" of the message) / 16. IMPORTANT ASSET AUDIT: Before generating the final website, inspect the supplied assets. Verify: picture/nf1.jpg through the required normal images picture/91.jpg through 9.jpg picture/IMG* picture/ltv.jpg picture/qr music.mp3 For the Tata V B... (full text in section "16. IMPORTANT ASSET AUDIT" of the message) / 17. EXACT TEXT PRESERVATION: Every piece of text inside quotation marks in this specification is immutable content. Do not: rewrite correct grammar translate improve wording change punctuation change capitalization remove informal wording replace sl... (full text in section "17. EXACT TEXT PRESERVATION" of the message) / 18. SCENE 01 — OPENING IMAGE: On initial entry: fade in: ẢNH 1 from: picture/nf1.jpg Do not simply put the image as a flat full-screen <img>. Create a sophisticated glass-like presentation inspired by modern Apple-style visual language. The image sho... (full text in section "18. SCENE 01 — OPENING IMAGE" of the message)
- [R6] 19. OPENING ZOOM / BLUR: As the user scrolls: the background image gradually becomes blurred. Combine: progressive blur zoom depth inverted cover-like zoom transition gradual reduction of brightness Then show: Cùng bắt đầu hành trình diệu kỳ này... (full text in section "19. OPENING ZOOM / BLUR" of the message) / 20. BLACK TRANSITION: Continue scrolling. The center of the screen gradually becomes black. The surrounding visual world appears to be pulled outward. Brightness gradually decreases. Eventually: background → #050505 The pink neon typography t... (full text in section "20. BLACK TRANSITION" of the message) / 21. OPENING MESSAGE: Show: Nơi mọi chuyện bắt đầu in the established neon pink style. Then transform this text into the thread. Do NOT simply fade the text out and spawn a thread. Use: “Nơi mọi chuyện bắt đầu” ↓ letter particles ↓ thread fra... (full text in section "21. OPENING MESSAGE" of the message) / 22. LƯƠNG THẾ VINH LOCATION: The thread begins travelling. The camera follows it. The thread leads toward a map-location marker: 📍 Conceptually resembling a location pin. Reveal: Trường THCS&THPT Lương Thế Vinh - Cơ Sở Cầu Giấy Then create a styliz... (full text in section "22. LƯƠNG THẾ VINH LOCATION" of the message)
- [R7] 23. LTV → MEMORY THREAD: Continue scrolling. Camera zooms into the location. The pink thread reappears. It forms: Vào một ngày mà những tia nắng đã đưa nụ cười của cậu vào trái tim tớ The message must be created by the thread/morph system. Then ... (full text in section "23. LTV → MEMORY THREAD" of the message) / 24. SCENE — PHOTO 2 + PHOTO 3: Use: picture/nf2.jpg picture/nf3.jpg These are portrait photographs. Do NOT stretch them to full screen. Use: portrait orientation blurred surrounding area subtle irregular edges worn/torn-paper feeling nostalgic physica... (full text in section "24. SCENE — PHOTO 2 + PHOTO 3" of the message) / 25. S-CURVE THREAD: Continue scrolling. The photographs move toward the left. The thread returns from the right. The camera follows the thread extremely closely. The thread begins making a complex S-shaped path. IMPORTANT: During the first ... (full text in section "25. S-CURVE THREAD" of the message) / 26. TATA V BTS LOCAL COLOR TRANSITION: Continue following the thread. The camera gradually zooms directly toward the thread. Pink begins filling the viewport. Then, ONLY FOR THIS LOCAL SCENE: the pink environment transitions into the red color associated with... (full text in section "26. TATA V BTS LOCAL COLOR TRANSITION" of the message)
- [R8] 27. TATA SCENE: Reveal the Tata V BTS image. Use a speech bubble above Tata: Bảo nhận quà nhưng không nhận tình à? The speech bubble should appear naturally. Continue scrolling. The first speech bubble disappears. A second speech bubble... (full text in section "27. TATA SCENE" of the message) / 28. TATA → THREAD: Continue scrolling. Tata gradually disappears. The pink thread returns. The thread forms: Có vẻ là không nhỉ / 29. TEXT TWIST / UNRAVEL TRANSITIONS: This is a special transition system. Do NOT fade between the following messages. Instead: Có vẻ là không nhỉ must twist / knot / deform / unravel. Then reform as: Bởi vì Then twist/unravel again into: Ngày này 6 năm trướ... (full text in section "29. TEXT TWIST / UNRAVEL TRANSITIONS" of the message) / 30. DROP TRANSITION: Continue scrolling. The screen suddenly drops downward. The date: 24-10-2020 remains visible above. The camera moves downward rapidly. The feeling should resemble: falling through the story. Do not instantly replace the ... (full text in section "30. DROP TRANSITION" of the message)
- [R9] 31. IPHONE 6 / CHAT MEMORY: On the black background: the neon thread draws an iPhone-6-like phone outline. This is NOT a real Zalo UI recreation. Do NOT create a modern chat application interface. Do NOT use a real Zalo screenshot. Instead: create ... (full text in section "31. IPHONE 6 / CHAT MEMORY" of the message) / 32. CHAT → THREAD: The phone/chat memory recedes. The thread returns. It forms: và đó là khi mọi thứ chính thức bắt đầu / 33. 24-10-2020 → 2 4 1 0: The camera travels upward again. Return toward: 24-10-2020 Zoom into the date. Progressively remove the hyphens. Then: 2020 fades away. Eventually only: 2 4 1 0 remains centered. Do not hard cut. / 34. 2-4-1-0 MEANING: As the user continues scrolling: transform: 2 4 1 0 into: 2 trái tim 4 chữ trọn đời trọn kiếp 1 tình yêu 0 bao giờ phai The four lines should appear with cinematic sequencing. Then the text converges back into the thread... (full text in section "34. 2-4-1-0 MEANING" of the message)
- [R10] 35. NEXT MESSAGE: Show: Chúng ta đã cùng nhau trải qua rất nhiều chuyện cùng nhau nhỉ Then transform back into the thread. / 36. FLYCAM HIGHWAY TRANSITION: The thread now appears diagonally. The visual feeling should resemble: a flycam looking down from above and entering a highway lane. The thread behaves like a road. The camera joins the path. Then the thread travels appr... (full text in section "36. FLYCAM HIGHWAY TRANSITION" of the message) / 37. PHOTO MEMORY HIGHWAY: From this point onward: the thread keeps travelling. Photos appear beside it. Each photo is accompanied by a textbox/caption. IMPORTANT: Older photos do NOT simply fade out. When the camera moves forward: the old memorie... (full text in section "37. PHOTO MEMORY HIGHWAY" of the message) / 38. PHOTO 4 + PHOTO 5: Use: picture/nf4.jpg picture/nf5.jpg Both are portrait. Use physical stacking: PHOTO 4 ↓ PHOTO 5 placed on top Caption: Lần đầu cùng đi chơi với lớp dưới danh nghĩa “một cặp” The caption belongs to the memory.
- [R11] 39. PHOTO 6: Use: picture/nf6.jpg This is a long PTB image. Caption: Lần đầu chụp ptb Because the image is long: as the user scrolls, move the thread gradually upward to create enough room for the caption on the right side of the ima... (full text in section "39. PHOTO 6" of the message) / 40. PHOTO 7: Use: picture/nf7.jpg Portrait. Caption: Lần đầu chụp kỷ yếu / 41. PHOTO 8 — TEASING MEMORY: Use: picture/nf8.jpg The thread changes direction slightly. First show text: Lần đầu “chung chăn gối”? This is intentionally teasing/misleading. The text appears first. Then it fades. Then the photograph appears in the S... (full text in section "41. PHOTO 8 — TEASING MEMORY" of the message) / 42. PHOTO 9: Use: picture/nf9.jpg This time: Photo appears first. Photo gradually fades. Text replaces the photo in the same position. Sequence: Lần đầu then fade. Then: Lần đầu được doodle ảnh ptb then fade. Then: :)))) The thread r... (full text in section "42. PHOTO 9" of the message)
- [R12] 43. THREAD → MEMORY MESSAGE: The thread gathers itself and forms: Thực ra thì tất cả mọi trải nghiệm yêu đương của cả 2 đều là những lần đầu vô cùng đáng nhớ nhỉ Then: Vì bọn mình là tình đầu của nhau mà Then: cuộn chuột mỏi tay chưa Then: cùng tớ ô... (full text in section "43. THREAD → MEMORY MESSAGE" of the message) / 44. ANNIVERSARY MEMORY SECTION: The thread continues through the next memories. Format: image + caption The layout can alternate spatially where appropriate, but should remain cinematic and integrated with the thread. PHOTO 10 Use: picture/nf10.jpg Lan... (full text in section "44. ANNIVERSARY MEMORY SECTION" of the message) / 45. DIFFICULT TIMES: Thread forms: Ngoài những khoảnh khắc lãng mạn Then: Tớ với Bông còn cùng nhau trải qua những lúc khó khăn Each should replace the previous. / 46. PHOTO 13: Use: picture/nf13.jpg Portrait. Caption sequence: Này là hồi lớp 9 cãi nhau xong tí thì chia tay nè Then change to: xong lại cùng nhau vượt qua như mọi lần The photograph remains while the caption changes.
- [R13] 47. PHOTO 14: Use: picture/nf14.jpg Portrait. Text sequence: Này lại là đợt lớp 12 nè then: Cũng suýt nữa thì để mất nhau then: Nhưng mà vẫn thế, lại cùng nhau vượt qua then: Trên đường về tớ vui quá nên chụp ảnh nè The photograph rem... (full text in section "47. PHOTO 14" of the message) / 48. PHOTO 15: Use: picture/nf15.jpg Portrait. Caption: Bonus ảnh áo phao dzai Hàn Quốc nè:)) Then: Tại cậu bảo đợt đó mặc áo này nhìn đẹp zai nên mới xuôi xuôi Preserve exact wording. / 49. PHOTO 16: Use: picture/nf16.jpg Square. Caption: Cùng nhau đội mưa nữa Then the text disappears. The photograph remains. New text: cũng tính là một kiểu vượt khó ha / 50. PHOTO 17: Use: picture/nf17.jpg Landscape. Text sequence: Kể cả là đến hiện tại then: Chúng ta vẫn luôn tìm ra cách để vượt qua những khó khăn ha then: Dù có cách cả ngàn cây số This particular line should move upward during the t... (full text in section "50. PHOTO 17" of the message)
- [R14] 51. THREAD → HAPPINESS MESSAGE: The thread returns. It forms: Nhưng tất nhiên chủ yếu là Then transforms into: Tớ và cậu đều đã có những khoảng thời gian hạnh phúc nhất với nhau This concludes the preceding memory road. / 52. SCENE — 99 KỶ NIỆM / MEMORY COLLAGE: This is one of the most important scenes. The scene remains inside the SAME continuous world. It is NOT a separate page. It is NOT a route change. It is NOT an independent gallery. The thread continues into this memory u... (full text in section "52. SCENE — 99 KỶ NIỆM / MEMORY COLLAGE" of the message) / 53. 99 IMAGE DIRECTORY STRUCTURE: Exact structure: picture/ ├── 91.jpg ├── 92.jpg ├── 93.jpg ├── 94.jpg ├── 95.jpg ├── 96.jpg ├── 97.jpg ├── 98.jpg ├── 99.jpg ├── IMG* (90 original filenames, unchanged) ├── nf1.jpg ... nf17.jpg ├── ltv.jpg └── qr There m... (full text in section "53. 99 IMAGE DIRECTORY STRUCTURE" of the message) / 54. 99 PHOTO COLOR RULE: All 99 photos must retain original colors. Absolutely no: grayscale black and white sepia monochrome color grading that changes the original photograph global tint Allowed only for animation: temporary blur temporary opa... (full text in section "54. 99 PHOTO COLOR RULE" of the message)
- [R15] 55. 99 PHOTO ORIENTATION RULE: Preserve the original aspect ratio of every photograph. Portrait stays portrait. Landscape stays landscape. Square stays square. Never: stretch distort force-crop squash Use sizing equivalent to: object-fit: contain; whe... (full text in section "55. 99 PHOTO ORIENTATION RULE" of the message) / 56. INDIVIDUAL 99 PHOTO ANIMATION: Each photograph follows: blurred ↓ fade in ↓ scale up ↓ visual focus ↓ scale down ↓ move backward ↓ slight rotation ↓ place into collage Conceptually: pick up photograph → inspect it closely → put it onto the table. The ... (full text in section "56. INDIVIDUAL 99 PHOTO ANIMATION" of the message) / 57. 99 PHOTO PHASE 1: The photograph starts: small slightly blurred low opacity As scrolling progresses: blur decreases opacity increases scale increases / 58. 99 PHOTO PHASE 2: The photograph becomes the visual focus. It may become very large. It may approach full viewport. But: NEVER distort it. Use blurred extensions around it when necessary. The viewer should feel: I am approaching this spec... (full text in section "58. 99 PHOTO PHASE 2" of the message)
- [R16] 59. 99 PHOTO PHASE 3: After visual focus: the image: scales down rotates slightly moves backward moves toward final collage position It must feel like physically placing the photograph on a table. / 60. FIRST NINE PHOTOGRAPHS: The first nine: 91.jpg 92.jpg 93.jpg 94.jpg 95.jpg 96.jpg 97.jpg 98.jpg 99.jpg must appear exactly in this order. Each follows: blur → fade in → scale up → focus → scale down → move backward → place Photo 2 begins after ... (full text in section "60. FIRST NINE PHOTOGRAPHS" of the message) / 61. CENTRAL 9 COMPOSITION: After photograph 9: the first nine become the visual core. Do NOT arrange them as: grid rows columns perfect masonry perfect symmetry Instead: slight rotations overlaps offsets different scales physical stacking controll... (full text in section "61. CENTRAL 9 COMPOSITION" of the message) / 62. ZOOM OUT AFTER PHOTO 9: After photo 9 is placed: the camera slowly zooms out. The nine central photos become smaller. But they must remain visually important. They must NOT become tiny thumbnails. The surrounding black space gradually becomes v... (full text in section "62. ZOOM OUT AFTER PHOTO 9" of the message)
- [R17] 63. THE OTHER 90 PHOTOGRAPHS: Then the remaining 90 photographs begin appearing. They come from: picture/IMG* Their display order may be randomized. However: the randomness must be deterministic/stable. Use a seeded random generator. Do not produce a... (full text in section "63. THE OTHER 90 PHOTOGRAPHS" of the message) / 64. CONTROLLED RANDOMNESS: The 90 photographs may vary in: x y rotation scale overlap order BUT the randomness must be constrained. They must expand outward from the central nine. Do NOT place random photos immediately at arbitrary points across t... (full text in section "64. CONTROLLED RANDOMNESS" of the message) / 65. 99 PHOTO VISUAL HIERARCHY: The original nine remain visually dominant. Think: 9 core memories + 90 memories expanding outward The 90 photos must never completely hide the central nine. Do not allow: complete obstruction extreme shrinking loss of c... (full text in section "65. 99 PHOTO VISUAL HIERARCHY" of the message) / 66. FINAL 99 COLLAGE: At the end: all 99 photographs coexist. Do NOT fade them all out. Do NOT turn them into thumbnails. Do NOT transform them into a conventional gallery. The final feeling must be: an actual pile of memories physically spre... (full text in section "66. FINAL 99 COLLAGE" of the message)
- [R18] 67. EMOTIONAL TEXT SCENE: After the 99-photo collage: the images gradually disappear. Transition to black. Then begin the emotional text sequence. VERY IMPORTANT: The quoted lines below are NOT meant to appear simultaneously. Each line replaces t... (full text in section "67. EMOTIONAL TEXT SCENE" of the message) / 68. EXACT EMOTIONAL TEXT SEQUENCE: Use these EXACT strings: Đẹp thật nhỉ, then: chuyện tình mình. then: Nói thật lòng với cậu là then: trong lúc làm món quà này then: khi tớ xem lại toàn bộ những bức ảnh, những kỉ niệm trong máy then: tớ có nhiều cảm xúc ... (full text in section "68. EXACT EMOTIONAL TEXT SEQUENCE" of the message) / 69. EMOTIONAL TEXT VISUAL STYLE: The text scene should be restrained. Do not add excessive decoration. Black background. Neon typography. Large emotional whitespace. The viewer should feel alone with the words. The strongest lines may become visually la... (full text in section "69. EMOTIONAL TEXT VISUAL STYLE" of the message) / 70. EMOTIONAL TEXT → COMPLETE ESSAY: After the individual emotional phrases: continue scrolling. Now transform the fragmented text experience into one complete readable essay. This is the ONE place where a large text block is intentionally allowed. Do not t... (full text in section "70. EMOTIONAL TEXT → COMPLETE ESSAY" of the message)
- [R19] 71. ESSAY PRESENTATION: Unlike the previous emotional sequence: the essay MAY occupy a large vertical area. It should be comfortable to read. Use: generous line height readable width responsive typography subtle neon glow dark background elegan... (full text in section "71. ESSAY PRESENTATION" of the message) / 72. FINAL JOURNEY OVERVIEW: After the essay: continue scrolling. The camera begins zooming out. The viewer should gradually see an overview of the journey that the thread has travelled. This is an important cinematic payoff. The viewer should reali... (full text in section "72. FINAL JOURNEY OVERVIEW" of the message) / 73. ABSOLUTE RULE FOR THE FINAL OVERVIEW: DO NOT make the thread a straight line. This is one of the most important visual constraints. Forbidden: ──────────────────────────────────────────── scene 1 → scene 2 → scene 3 → scene 4 → end That would be boring. Inst... (full text in section "73. ABSOLUTE RULE FOR THE FINAL OVERVIEW" of the message) / 74. WHAT TO SHOW IN THE FINAL OVERVIEW: The overview should summarize the journey. For the emotional text portion: ONLY show the complete essay. Do NOT show every individual emotional phrase again. The viewer should see: journey thread + memory nodes + photogr... (full text in section "74. WHAT TO SHOW IN THE FINAL OVERVIEW" of the message)
- [R20] 75. THREAD → DOUBLE LILY: Continue scrolling. The thread leaves the overview. It travels upward. Then: the thread begins blooming. It transforms into a double lily flower. This should feel like the culmination of the relationship journey. The flo... (full text in section "75. THREAD → DOUBLE LILY" of the message) / 76. LILY FIELD: Continue scrolling. The camera zooms slightly outward. One flower becomes many. Reveal an entire field/forest of lilies. The scene should feel expansive. Use: depth layers subtle parallax foreground flowers background fl... (full text in section "76. LILY FIELD" of the message) / 77. FIREWORKS: Continue scrolling. Fireworks begin launching. First: normal fireworks. Then some explosions begin forming: yêu Bông and: ❤️ The fireworks should be particle-based. The text fireworks should feel like fireworks naturally... (full text in section "77. FIREWORKS" of the message) / 78. FINAL QR MEMORY: After the fireworks: transition toward: picture/qr This is the final QR red-envelope image. The final scene should be calm after the fireworks. Do not end with another busy animation. Allow the QR image to become the fin... (full text in section "78. FINAL QR MEMORY" of the message)
- [R21] 79. FINAL SCENE EMOTIONAL RHYTHM: The final sequence should feel like: huge emotional journey ↓ overview ↓ flower ↓ flower field ↓ fireworks ↓ quiet ↓ final QR Do not immediately cut from fireworks to QR. Give the final transition breathing room. / 80. PERFORMANCE REQUIREMENTS: The website contains many photographs and complex animation. Performance matters. Use: lazy loading image decoding progressive loading only render high-cost effects when needed avoid unnecessary DOM updates requestAnimat... (full text in section "80. PERFORMANCE REQUIREMENTS" of the message) / 81. IMPORTANT: 99 FILE MANIFEST: A browser cannot reliably enumerate arbitrary local directory contents. Therefore, if the browser cannot directly discover filenames inside: picture/IMG* the n8n generation process must create a manifest. For example: co... (full text in section "81. IMPORTANT: 99 FILE MANIFEST" of the message) / 82. RESPONSIVE BEHAVIOR: The primary target is a desktop/laptop cinematic experience. However, the implementation should degrade gracefully on smaller screens. Do not redesign the story. Preserve: sequence text thread memories final QR On smalle... (full text in section "82. RESPONSIVE BEHAVIOR" of the message)
- [R22] 83. REVERSE SCROLL: Every animation must work backward. For example: If the viewer scrolls forward: thread → image → memory then scrolls backward: memory → image → thread The website must reverse smoothly. Do NOT rely on one-way event trigg... (full text in section "83. REVERSE SCROLL" of the message) / 84. NO RANDOM UNCONTROLLED MOTION: Do not add animations merely because they look cool. Every animation must have a narrative purpose. Good: thread bends → camera follows → memory appears Bad: random floating particles everywhere random zoom random rotati... (full text in section "84. NO RANDOM UNCONTROLLED MOTION" of the message) / 85. NO GENERIC WEBSITE EFFECTS: Avoid generic: parallax template fade-up sections card hover effects standard scroll reveal generic gradient background generic glassmorphism cards everywhere generic love website templates The website must feel custom-b... (full text in section "85. NO GENERIC WEBSITE EFFECTS" of the message) / 86. THREAD VISUAL CONSISTENCY: The thread must maintain: same color same brightness same glow language same visual identity throughout the story. Only the Tata section is allowed to temporarily transition into a localized red environment. After Tata: ... (full text in section "86. THREAD VISUAL CONSISTENCY" of the message)
- [R23] 87. THREAD VISIBILITY RULE: The thread should always exist conceptually. When the camera is focused on a photograph: the thread may: move outside the viewport become subtle become partially obscured lose visual dominance But it must not feel like i... (full text in section "87. THREAD VISIBILITY RULE" of the message) / 88. MEMORY PHOTOGRAPH RULE: When an image becomes the main visual focus: the image gets priority. The thread may become less prominent. Do not force the thread to visually cross directly over the important subject of a photograph. The thread is the... (full text in section "88. MEMORY PHOTOGRAPH RULE" of the message) / 89. TRANSITION QUALITY STANDARD: Every transition should answer: What physical thing is happening? Examples: Text becomes thread: letters are physically unraveling into the thread. Thread becomes message: thread particles assemble into letters. Photo ap... (full text in section "89. TRANSITION QUALITY STANDARD" of the message) / 90. MASTER TIMELINE ARCHITECTURE: Create one master timeline. Conceptually: const STORY = [ { id: "opening", start: 0.00, end: 0.04 }, { id: "opening-message", start: 0.04, end: 0.07 }, { id: "thread-origin", start: 0.07, end: 0.10 }, ... ]; The exact nu... (full text in section "90. MASTER TIMELINE ARCHITECTURE" of the message)
- [R24] 91. LOCAL TIMELINE MODEL: Each scene should have local progress: localProgress = normalize( masterProgress, scene.start, scene.end ); Then all scene elements are calculated from that local progress. For example: sceneProgress = 0 image blurred sc... (full text in section "91. LOCAL TIMELINE MODEL" of the message) / 92. CAMERA ANCHORS: Define semantic camera anchors for major story points. Examples: opening ltv photo2 photo3 sCurve tata date chat 2410 photo4 photo5 photo6 photo7 photo8 photo9 photo10 photo11 photo12 photo13 photo14 photo15 photo16 phot... (full text in section "92. CAMERA ANCHORS" of the message) / 93. WORLD COORDINATE SYSTEM: Do not position every scene relative to the viewport independently. Create a large virtual world. For example conceptually: WORLD ──────────────────────────────────────── opening LTV photos S curve Tata date chat 2 4 1 0... (full text in section "93. WORLD COORDINATE SYSTEM" of the message) / 94. IMPORTANT: DO NOT MAKE IT LITERALLY ONE LONG PAGE OF BLOCKS: The implementation may technically use a long scroll container. But visually it must NOT behave like: SECTION 1 SECTION 2 SECTION 3 SECTION 4 SECTION 5 Instead the viewer should feel: one camera travelling through one en... (full text in section "94. IMPORTANT: DO NOT MAKE IT LITERALLY ONE LONG PAGE OF BLOCKS" of the message)
- [R25] 95. INITIAL PRESENTATION: At page load: the cinematic viewport should be immediately visible. Do not expose the entire scroll length. The page itself can have a large invisible scroll driver. The visible experience must remain cinematic. / 96. SCROLL DRIVER: A recommended architecture: <body> <div id="scroll-driver"></div> <main id="cinematic-world"> ... </main> </body> The world is pinned/fixed visually. The scroll driver provides the continuous scroll distance. The camera/... (full text in section "96. SCROLL DRIVER" of the message) / 97. SMOOTHING: Use target/current progress. Example conceptual model: targetProgress = getScrollProgress(); currentProgress += (targetProgress - currentProgress) * smoothing; Then render. The smoothing must be carefully tuned. Too much... (full text in section "97. SMOOTHING" of the message) / 98. CAMERA INERTIA: The camera should have slight cinematic inertia. When the user scrolls: the camera follows. When the user stops: the camera settles. Do not make it so elastic that it feels disconnected from scrolling.
- [R26] 99. DEBUG MODE: Create a hidden development/debug mode if practical. For example: ?debug=1 can display: current master progress current scene camera coordinates thread length asset loading status This debug UI must NOT appear in the nor... (full text in section "99. DEBUG MODE" of the message)

## Images (never change anything in uploads/)
- uploads/nf1.jpg … uploads/nf17.jpg: Story photos ẢNH 1–17 -> Opening glass image (nf1), then the photo2/3 stack, highway memories nf4–nf17 with captions
- uploads/91.jpg … uploads/99.jpg: Core 9 memories -> First nine collage99 photos, in order, forming the central core
- uploads/1000*.jpg (61), uploads/IMG_*.jpg (23), uploads/MIN*.jpg (6): 90 further memories -> MEMORY_90 manifest, seeded organic spread around the core in collage99
- uploads/ltv.jpg: Lương Thế Vinh school -> Reference for the white neon line-art reconstruction (not displayed raw)
- uploads/tata.jpg: Tata V BTS -> Tata scene with speech bubbles under local red tint
- uploads/qr.jpg: QR red envelope -> Final calm focal point, never blurred or distorted
- music.mp3: Background music -> audio#bgm, autoplay attempt then unlock on first interaction

## Build spec
# SPEC — "Sợi chỉ 6 năm" cinematic anniversary site

The story text comes from `STORY_CONTENT.md`. Copy every quoted line verbatim. Do not translate or correct anything, and keep `:))`, `đóoooooo`, `dzai`, `⅓` and `❤️` exactly as written. Static HTML, CSS and vanilla JS only. No frameworks, GSAP or Three.js (R1).

**Assets live in `uploads/` (not `picture/`).** Never rename or move them. In code, the `picture/…` names from the prompt map to `uploads/…`.

## Files
- `index.html`: the only page. It holds the fixed world and the scroll driver, with no nav (R1, R4, R25)
- `css/styles.css`: tokens, layers, `.neon-text`, photo frames and text safety (R2, R4)
- `js/config.js`: `THEME`, `TATA_RED`, timing, smoothing and seed. It writes THEME to the CSS variables (R2)
- `js/assets.js`: `STORY_IMAGES` (nf1–nf17), `CORE_9`, the hard-coded `MEMORY_90` manifest, the asset audit and lazy decode (R5, R21)
- `js/story.js`: the `STORY` array of `{id,start,end,anchor}` and all text strings (R5, R23)
- `js/timeline.js`: `clamp`, `lerp`, `mapRange`, `smoothstep`, `easeInOut`, `localProgress`, plus target/current smoothing in a rAF loop (R3, R22, R24, R25)
- `js/thread.js`: one master SVG path `#thread-path` in world coordinates, sampled with `getPointAtLength`. It also holds the drawn length and the S-curve, loops and diagonals (R2, R3)
- `js/camera.js`: `CAMERA_ANCHORS`, follow-thread mode, zoom, tilt, blur and reduced-motion damping (R3, R24)
- `js/particles.js`: the canvas morph engine (thread⇄text, text→text twist, text→date), fireworks, and the "yêu Bông" and heart shapes (R3, R8, R20)
- `js/memories.js`: photo nodes, captions, stacking, the Tata scene, the neon phone, the date and 2410, the emotional lines, the essay, lilies and the QR (R6–R13, R18–R20)
- `js/collage99.js`: the seeded (mulberry32) table layout and the pick-up → focus → place phases (R14–R17)
- `js/main.js`: boot, resize, audio unlock and `?debug=1` (R4, R26)
- `README.md`: assets, numbering, manifest, colours, music, running and debug (R26)

## Assets (all keep their aspect ratio and never get recoloured)
- `uploads/nf1.jpg`–`nf17.jpg`: story photos ẢNH 1–17. nf2–5, 7, 13–15 are portrait; nf6 is a long PTB shot; nf10–12 and nf17 are landscape; nf16 is square
- `uploads/91.jpg`–`99.jpg`: the core 9, shown in that order
- The other 90 files (`1000*.jpg` ×61, `IMG_*.jpg` ×23, `MIN*.jpg` ×6) go into `MEMORY_90` under their exact names. This excludes nf*, 91–99, ltv, qr and tata
- `uploads/ltv.jpg`: tracing reference only, never shown directly
- `uploads/tata.jpg`: the Tata image
- `uploads/qr.jpg`: the final QR, kept sharp
- `music.mp3`: autoplay is attempted, then retried on the first wheel, touch, key or click

## DOM (one page, no sections)
```
body
 #scroll-driver            (height = CONFIG.scrollLength vh)
 main#cinematic-world      (position:fixed; inset:0)
  #camera > #world         (one transform per frame)
    svg#thread-layer > path#thread-path, g#ltv-art, g#phone-art, g#lily-art
    #memory-layer          (.memory-node items)
    #collage-layer         (.collage-photo ×99)
    #text-layer            (.neon-text, .caption, .speech-bubble)
    #essay                 (.essay)
  canvas#particle-canvas   (morphs/fireworks, screen space)
  #immersion-bg            (blurred duplicate behind focused photo)
  #tata-tint               (local red overlay)
  #debug-panel             (only ?debug=1)
 audio#bgm[src=music.mp3]
```

## Timeline scene ids, in order (one world, anchored by `CAMERA_ANCHORS`)
`opening` (glass nf1 → blur, zoom and "Cùng bắt đầu…", R5, R6) → `blackPull` (R6) → `openingMessage` (text → thread, R6) → `ltv` (📍, name and white line art, R6) → `ltvMessage` (R7) → `photo2`/`photo3` (torn-paper stack, R7) → `sCurve` (tight follow, then zoom out, R7) → `tata` (local red, two bubbles shown one at a time, R7, R8) → `twist` (Có vẻ là không nhỉ → Bởi vì → Ngày này 6 năm trước → 24-10-2020, R8) → `drop` (R8) → `chat` (neon iPhone, "Bảo Hà - LTV 6A5", R9) → `chatMessage` → `date2410` → `meaning2410` (R9) → `togetherMessage` → `highway` (R10) → `photo4`…`photo9` (R10, R11) → `firstsMessage` (R12) → `photo10`–`photo12` (R12) → `hardTimes` → `photo13`–`photo17` (R12, R13) → `happyMessage` (R14) → `collage99` (R14–R17) → `emotionalText` (R18) → `essay` (R18, R19) → `overview` (R19) → `lily` → `lilyField` → `fireworks` → `quiet` → `qr` (R20, R21).

Everything is derived from `localProgress`, so scrolling backwards reverses it all (R22). There is no scroll-snap and no one-way triggers.

## Tokens (`:root`, set from `THEME`)
```
--bg:#050505; --red-black:#16090D; --muted-red:#632533;
--crimson:#A83F5A; --neon:#E05A78; --highlight:#FFD6DF;
--neon-glow: 0 0 5px var(--neon),0 0 15px var(--neon),0 0 35px rgba(224,90,120,.45);
--font: Inter,"SF Pro Display","Helvetica Neue","Segoe UI",Arial,sans-serif;
--text-max: min(88vw, 34ch); --essay-max: min(90vw, 68ch);
```
Every pink value (thread, glow, particles and neon text) reads `--neon` / `THEME.neonPink`. Only `#tata-tint` and `TATA_RED` are local, and they reset after the Tata scene (R2, R22).

## Shared classes
`.neon-text`, `.neon-text--hero` (the three "Tớ yêu Bông" lines), `.caption`, `.speech-bubble`, `.memory-node`, `.photo-frame`, `.photo-frame--torn`, `.photo-sharp`, `.photo-blur-ext`, `.collage-photo`, `.collage-photo--core`, `.essay`, `.is-hidden`.

## Rules
- Text uses `overflow-wrap:anywhere` (`word-break:keep-all` is avoided), clamp() sizing and safe padding, so nothing is ever clipped (R4).
- Emotional lines replace each other one at a time. The essay is the only block of text, and it is fully scrollable and readable (R18, R19).
- The overview shows the non-straight thread, the memory nodes, the photo clusters and the essay node only (R19).
- Motion animates transforms and opacity, and blur is applied only to the focused layer. Ninety photos load progressively (R21).
- Under `prefers-reduced-motion`, camera travel is reduced but the full story is kept (R21).

## Tone
Intimate, mature, nostalgic Vietnamese letters, glowing quietly on black. No decorative fonts, no generic effects and no motion without a purpose (R22).

## Task order
1. (codex) Create the page shell and story timeline - files: index.html, js/config.js, js/story.js - covers: R1, R2, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R18, R19, R20, R23, R24, R25, R26
2. (claude) Build the cinematic visual system and master thread - files: css/styles.css, js/thread.js - covers: R1, R2, R3, R4, R6, R7, R8, R9, R10, R11, R12, R13, R14, R16, R19, R20, R22, R23, R24, R25
3. (codex) Map and audit the supplied assets - files: js/assets.js, README.md - covers: R5, R14, R15, R16, R17, R21, R26
4. (codex) Create the camera and continuous scroll timeline - files: js/timeline.js, js/camera.js - covers: R1, R3, R8, R9, R10, R22, R23, R24, R25
5. (claude) Implement the memory scenes and text/photo transitions - files: js/memories.js - covers: R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R18, R19, R20, R22, R24
6. (claude) Build the morph, particle, and finale effects - files: js/particles.js, js/collage99.js - covers: R2, R3, R8, R14, R15, R16, R17, R20, R22, R23
7. (codex) Wire startup, rendering, audio, and debug mode - files: js/main.js - covers: R1, R3, R4, R8, R21, R22, R23, R24, R25, R26
8. (claude) Polish visual continuity and responsive safety - files: css/styles.css, index.html - covers: R1, R2, R4, R5, R14, R15, R16, R17, R18, R19, R20, R21, R22, R25, R26

## Notes from agents
(Add one line here when the next agent must know something: a new class, file or decision.)
Shell exposes the shared scene containers and globals `CONFIG`, `THEME`, `TATA_RED`, `STORY`, `STORY_COPY`, and `CAMERA_ANCHORS`; anchors are normalized world coordinates.
thread.js (global `THREAD`, auto-init) rebuilds `#thread-path` through every CAMERA_ANCHORS point (world 6000×4200px, anchor px = [x*6000, y*4200]) and wraps it in `g.thread-strand` with halo/glow clones, `#thread-head` and `g#thread-nodes`. API: `pointAt(frac)→{x,y,angle}`, `fractionAtProgress(masterP)`, `anchorFraction(id)`, `anchorPoint(id)`, `sample(n,from,to)`, `screenSample`, `toScreen`, `setDrawn(end,start)`, `setPresence(o)`, `setWidthScale(1/zoom)`, `setTint(0–1)` (Tata only, 0 restores), `color()`, `setActiveNode(id)`. The CSS also has `.neon-text--date`, `.neon-text--white`, `.glass-memory` (+`__pane`, `--glass-blur`), `.location-pin` and `.draw-path` (pathLength=1, `--draw`), and positioned text/nodes use `translate:-50% -50%` so JS `transform` stays free. Note for camera and memory agents: from `highway` to `qr` the anchors are only 60–90 world px apart in x, so zoom in or offset nodes beside the thread.
timeline.js exposes `Timeline` (normalized `progress`, `target`, `subscribe`, `start`, `stop`, helpers; emits `timeline:progress`); camera.js exposes `Camera.init()` and `Camera.update(progress)` and transforms `#world` each frame. Main should start Timeline and call Camera.update(state.progress), then pass the same progress to scene renderers.
memories.js exposes `Memories.update(progress, camState)` (call it after Camera.update, passing its return; if it is never called directly it falls back to the `timeline:progress` event). It also drives `THREAD.setDrawn/setPresence/setTint/setActiveNode`, `#tata-tint`, `#immersion-bg` and a screen-space QR overlay (z 9), and fills `#essay`. `Memories.morphTargets` lists the visible messages each frame as `{text, el, form 0–1, release 0–1, mode:'thread'|'twist'|'fade'|'date'}` so particles.js can sample `el` for thread⇄text morphs. Camera bug for the next agents: camera.js `semanticAt` sets zoom .125 for the whole essay scene and jumps zoom at the essay, overview and qr boundaries (memories.js compensates by dividing by the live zoom).
particles.js (`Particles`) and collage99.js (`Collage99`) both expose `update(progress, camState)` and fall back to `timeline:progress` like Memories; main must call them AFTER `Memories.update` (Particles reads that frame's `Memories.morphTargets`). Collage99 builds `.collage-table` in #collage-layer (its own `.photo-blur-ext` focus backdrop), lifts #collage-layer to z-index 5 only during the collage, and shows a small photo cluster during `overview`; fireworks + "yêu Bông"/hearts draw on the canvas in `fireworks`, then fade out early in `quiet`. Neither file was run in a browser (no tool permission), so check them in one.
Polish (agent 8): z-order is now collage 2 (JS lifts to 5) < thread 3 < memory-layer 4 < text 5 = essay 5 (with dark pool behind it); because config.js writes `--text-max` inline on :root, narrow-screen widths are set on `.neon-text` itself; config glow's 35px stop now derives from THEME.neonPink; color-mix() has an rgba fallback. Still not checked in a browser.
