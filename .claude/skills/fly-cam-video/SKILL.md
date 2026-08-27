---
name: fly-cam-video
description: Write "Fly Cam" image-to-video prompts — a single still photograph turned into a 30-second, ONE continuous flying-camera cinematic shot (frozen-time or slow-motion suspension) in the Seedance 2.5 / InVideo Agent Two style, and optionally generate the video. Use this skill whenever the user wants a fly cam / flying camera / drone-through-a-photo video, says "fly cam", "frozen time", "time freeze", "bullet-time", "slow-motion suspension", "one continuous shot through a photo", "make my photo cinematic with a moving camera", "camera flies through the image", mentions drawing a red line / flight path on a photo, or uploads a still image they want converted into a single unbroken cinematic camera move. Also trigger when they ask for a Seedance or InVideo Agent Two prompt in this style, even if they don't name the format.
---

# Fly Cam Video — Frozen-Time / Slow-Motion Flying Camera Prompts

Turn one still photograph into a 30-second, single continuous flying-camera cinematic
video. The photo gains full 3D depth, but time inside it stays (almost) completely
still — the camera is the only thing that truly moves, drifting through a suspended
moment, inspecting faces and details at close range, until time "unfreezes" in the
final seconds as the payoff.

Target generator: **Seedance 2.5 image-to-video** (works inside InVideo Agent Two;
the same prompts run on Higgsfield's Seedance models via `generate_video`).

## Workflow

1. **Get the source image.** One still photo is the entire scene. Ask for it if the
   user hasn't provided one. Everything in the prompt must describe what is actually
   in that image — real signage, real subjects, real light. Never invent architecture
   or shift the color.
2. **Plan the camera flight path.** Ideally the user marks the photo with a red line
   whose two arrow ends are marker 1 (where the shot enters) and marker 2 (where it
   exits/settles). If there's no drawn line, define the path in words: pick 3–6
   interesting subjects in the image and route one smooth curve through them, near to
   far or low to high. Spirals/loops work too (one unbroken banking arc, never
   reversing). If markings exist, the prompt must say they dissolve in the first half
   second and never reappear.
3. **Pick the time concept** (see Concepts below): Frozen Time, Slow-Motion
   Suspension, or Frozen Time with micro-motion.
4. **Write the prompt** using the exact structure below. For the fill-in-the-blanks
   version read `references/template.md`. For three complete worked examples
   (street scene, crowd/protest spiral, riverside glide) read
   `references/examples.md` — read at least one before writing your first prompt.
5. **Deliver / generate.** Output the prompt as a single plain-text block the user can
   paste into InVideo Agent Two (or any Seedance 2.5 interface) along with the
   uploaded photo. If the user asks you to generate it and Higgsfield tools are
   available, use `generate_video` with the source image as the reference frame.

## Prompt anatomy (always this structure, in this order)

```
Image-to-video, [30] seconds, ONE continuous flying camera shot, no cuts.

FIRST FRAME: exact copy of the attached image — [describe scene: era / location /
subjects / mood], including the red drawn line and its arrow-marked ends; the red
markings dissolve completely within the first half second and must NEVER reappear.

CONCEPT — [FROZEN TIME / SLOW-MOTION SUSPENSION]: [what is suspended and how;
what, if anything, carries a tiny micro-movement; "NOTHING moves except the
camera" for a hard freeze].

KEEP THE ORIGINAL [BLACK-AND-WHITE / COLOR] LOOK: [photographic style — grain,
light, tone, weather]. All signage and detail stays EXACTLY as in the photo and
perfectly legible: [list the key text / objects / wardrobe to preserve].
Strictly [era / location]-accurate throughout.

CAMERA PATH: the red line is the flight trajectory — enter at [marker 1], end at
[marker 2]. [Shape: S-curve / spiral loop / rising-and-falling glide.]

00–01s: Static frame identical to the input; red markings dissolve. [First hint
that time is frozen — dust motes hanging, a wisp of haze drifting.]

[TIMESTAMP RANGE]: [camera move — dives / rises / orbits / threads] to
[SUBJECT 1] — [what the close-up reveals].

[Repeat one beat per stop along the path, subject by subject, moving from
marker 1 toward marker 2 — each with its own close-up detail.]

[FINAL RANGE, e.g. 28–30s]: THE PAYOFF — time suddenly UNFREEZES / snaps to real
time: [the snap-back motion for each subject], and the frame cuts to black
mid-motion.

Physics & consistency: [freeze rule] until the payoff — not a single object or
person moves out of turn; rock-solid geometry on every face and letterform from
every angle; no morphing, no melting features; the camera never clips through
objects.

AUDIO: a frozen/slowed world — near silence with a low dreamlike drone; soft airy
whooshes as the camera passes objects; faint reverberant echoes of [location
sounds] suspended in time. At the payoff, sound SNAPS on with the unfreeze:
[list the sounds that return], full ambience for the final two seconds.
```

## The three concepts

- **Frozen Time (hard freeze):** every person, vehicle, particle of dust is locked
  mid-motion like a vast sculpture — a running boy frozen mid-stride, dust hanging
  solid in the air, wheels stopped mid-spin. NOTHING moves except the camera.
- **Slow-Motion Suspension:** time drops into extreme slow motion, not a hard freeze —
  chests rise and fall, eyes blink, smoke curls, fabric ripples, like 1000fps
  stretched across 30 seconds. Only the camera moves at normal speed.
- **Frozen Time with micro-motion:** near-total stillness, but the ONE subject the
  camera is currently studying carries a subtle extreme-slow micro-movement — a
  fraction of a blink, a bead of water sliding a hair, a feather flexing — which
  settles back into stillness as the camera moves on.

## Rules that make it work

- **One unbroken shot.** No cuts, no cross-fades, no whip-pans, no snapping between
  positions. Every transition is the camera physically arcing through space; it is
  always mid-arc, already banking into the next curve before the last one finishes.
- **Beat per subject.** Divide the duration into timestamped ranges (5–7 beats for
  30s). Each beat = one camera move + one subject + one specific close-up detail
  (a license plate, a strand of hair mid-flutter, ropes locked taut). Specific
  physical details are what sell the freeze.
- **Lock the look.** Name the photographic style (monochrome grain / documentary
  color, light, weather) and explicitly list text and objects that must stay exactly
  as photographed. Watermarks or print artifacts in the source should be declared as
  flat print artifacts unaffected by the camera.
- **The payoff.** Reserve the last ~2 seconds for the unfreeze: motion and sound snap
  back to real time simultaneously, then cut to black mid-motion. This contrast is
  the emotional point of the whole shot.
- **Physics paragraph is mandatory.** It's what prevents morphing faces, melting
  signage, and the camera clipping through people.
- **Audio mirrors time.** Frozen world = drone + whooshes + reverberant suspended
  echoes; unfreeze = full ambience snapping on.

## References

- `references/template.md` — fill-in-the-blanks reusable template (drop in any
  red-line-marked photo, fill the brackets, done).
- `references/examples.md` — three complete production prompts: Old Calcutta Street
  (B&W, frozen time, S-curve), Protest Barricade (color, slow-motion suspension,
  spiral loop), Benares Ghats (color, frozen time with micro-motion, continuous
  glide). Match your scene to the closest example and mirror its density and voice.
