# Off-Axis Window

A browser recreation of the "graphics feel too real" effect:
**face tracking + off-axis projection + a shadow-casting animated model**.

## How it works
1. **Face tracking.** MediaPipe's BlazeFace finds your eyes in the webcam feed. The gap between your eyes gives your distance, and their midpoint gives your x/y position.
2. **Off-axis projection.** The camera sits at your eye position, and its frustum is skewed (asymmetric left/right/top/bottom) so its edges always pass through the screen's corners. The monitor stops looking like a flat image and reads as a window into a box behind it.
3. **Virtual shadow.** A spotlight in front of the glass throws the mech's shadow onto the concrete walls and floor. The shadow moves correctly as you move, which is what makes the depth convincing.
4. **Animated rig.** The head turns to look at you, the jaw snaps, and the eyes flare and the pupils tighten as you lean in.

## Run it with head tracking
The camera needs a page served over http(s):

```bash
cd offaxis-window
python3 -m http.server 8000
# open http://localhost:8000 in Chrome, click "Use webcam", sit centred, press "Recenter"
```

Without a camera it falls back to pointer mode: move the mouse (or drag) to move your "eye", and scroll to move closer.

Tuning lives near the top of `trackFace()`: `SCREEN_H_M` (your screen's physical height in metres) and the assumed webcam field of view.
For the most convincing result, look with **one eye closed**. Like the reel, the illusion is monocular.
