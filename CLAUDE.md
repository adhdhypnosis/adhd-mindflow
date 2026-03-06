# Project Instructions for Claude Code

## Project: ADHD Self-Hypnosis Webapp
- Domain: adhdselfhypnosis.com
- Hosted on: Vercel
- Stack: Vite + React
- Repo: github.com/adhdhypnosis/adhd-mindflow

---

## TASK: Build the Hypnosis Generator at /hypnosis-generator

This page generates a personalized self-hypnosis audio session. The user fills a multi-step form, we call Fish Audio's TTS API to generate voice clips, then layer them with pre-made binaural beats + isochronic tones audio.

---

## ARCHITECTURE

```
User fills form → Frontend sends script segments to backend
→ Backend calls Fish Audio API for each voice clip
→ Backend stitches clips + silence gaps into one voice track
→ Frontend layers voice track on top of BB+ISO audio (pre-made file)
→ User downloads or streams the final mix
```

### Key files to create:
```
src/
  pages/
    HypnosisGenerator.jsx          ← Multi-step form UI
  components/
    hypnosis/
      StepFocus.jsx                ← Step 1: Choose symptom
      StepTrigger.jsx              ← Step 2: Describe trigger
      StepBodyCues.jsx             ← Step 3: Body warning signs
      StepSafePlace.jsx            ← Step 4: Safe place
      StepMusic.jsx                ← Step 5: Background music
      GeneratingView.jsx           ← Progress view during generation
      PlayerView.jsx               ← Audio player for final result
  api/
    generateHypnosis.js            ← Server-side: calls Fish Audio, stitches audio
  data/
    hypnosisScript.js              ← The 76-clip script template with tags
  assets/
    audio/
      bb-iso-track.mp3             ← Pre-made binaural beats + isochronic layer (25 min)
```

---

## PART 1: MULTI-STEP FORM UI

Design: calming, ADHD-friendly. Sage green (#7C9A82), warm (#C4A882), bg #FAFBF9, Poppins font.

### Step 1 — "Choose Your Focus"
Tile selector, pick one:
- emotional overwhelm
- rumination
- task paralysis
- rejection sensitivity
- sensory overload
- sleep anxiety
- social anxiety
- performance anxiety
- time pressure stress

### Step 2 — "Describe Your Trigger"
Required text input.
Placeholder: "e.g. When my boss gives me critical feedback..."

### Step 3 — "Your Body's Warning Signs" (optional)
Two text inputs:
- Body cue 1: "e.g. tight chest"
- Body cue 2: "e.g. jaw clenching"

### Step 4 — "Create Your Safe Place" (optional)
Tile selector: forest, beach, cozy room, mountains, cabin, garden, library, lakeside — or custom text
3 optional sensory inputs:
- Sound: "What sounds are there?"
- Texture: "What does it feel like?"
- Visual/Smell: "What do you see or smell?"

### Step 5 — "Background Music"
Tile selector (default: ambient pads):
- ambient pads
- nature soundscape
- piano minimal
- lo-fi calm
- binaural style
- no music

---

## PART 2: FISH AUDIO API INTEGRATION

### API Endpoint
```
POST https://api.fish.audio/v1/tts
```

### Request format for each clip:
```json
{
  "text": "(relaxed)(comforting) Welcome to this audio from Mind Refuge. My name is David.",
  "reference_id": "USER_VOICE_MODEL_ID",
  "format": "mp3",
  "mp3_bitrate": 128,
  "normalize": false,
  "latency": "normal",
  "prosody": {
    "speed": 0.85,
    "volume": 0
  }
}
```

### Headers:
```
Authorization: Bearer FISH_AUDIO_API_KEY
Content-Type: application/json
```

### Response: raw audio binary (audio/mpeg)

### Environment variables needed:
```
FISH_AUDIO_API_KEY=sk-...
FISH_AUDIO_VOICE_ID=...  (the reference_id for David's cloned voice "test D")
```

### IMPORTANT: normalize must be FALSE for emotion tags to work.

---

## PART 3: THE COMPLETE 76-CLIP SCRIPT

Store this in `src/data/hypnosisScript.js` as an exported array.
Each clip has: id, text (with Fish Audio emotion tags), pauseAfter (seconds), section name.

The script uses these placeholders that get replaced with user form inputs:
- {{MAIN_SYMPTOM}} → from Step 1
- {{TRIGGER}} → from Step 2
- {{BODY_CUE_LINE}} → built from Step 3 (see defaults below)
- {{SAFE_PLACE_TYPE}} → from Step 4
- {{SAFE_PLACE_SENSORY_1}} → from Step 4
- {{SAFE_PLACE_SENSORY_2}} → from Step 4
- {{SAFE_PLACE_SENSORY_3}} → from Step 4

### Conditional defaults (apply before generating):
```javascript
if (!SAFE_PLACE_TYPE) SAFE_PLACE_TYPE = "a quiet, comfortable place";
if (!SAFE_PLACE_SENSORY_1) SAFE_PLACE_SENSORY_1 = "wind moving through leaves, distant waves, or soft birdsong";
if (!SAFE_PLACE_SENSORY_2) SAFE_PLACE_SENSORY_2 = "a comfortable temperature, a gentle breeze, or the feeling of soft fabric supporting you";
if (!SAFE_PLACE_SENSORY_3) SAFE_PLACE_SENSORY_3 = "clean air, a subtle scent of pine or ocean, or warm light in the scene";

if (BODY_CUE_1 && BODY_CUE_2) {
  BODY_CUE_LINE = `When you notice ${BODY_CUE_1} or ${BODY_CUE_2}, that is your cue to do the long exhale early.`;
} else if (BODY_CUE_1) {
  BODY_CUE_LINE = `When you notice ${BODY_CUE_1}, or perhaps shoulders rising or thoughts speeding up, that is your cue to do the long exhale early.`;
} else if (BODY_CUE_2) {
  BODY_CUE_LINE = `When you notice ${BODY_CUE_2}, or perhaps tight chest or jaw clenching, that is your cue to do the long exhale early.`;
} else {
  BODY_CUE_LINE = "When you notice tight chest, jaw clenching, shoulders rising, or thoughts speeding up, that is your cue to do the long exhale early.";
}
```

### THE FULL SCRIPT (76 clips):

```javascript
export const hypnosisScript = [
  // ═══ SECTION 1: WELCOME ═══
  { id: 1, text: '(relaxed)(sincere) Welcome to this audio from Mind Refuge. My name is David.', pauseAfter: 3, section: 'Welcome' },
  { id: 2, text: '(sincere) Before we begin, a quick note. This audio is for education and relaxation. It is not medical or psychological treatment. If you have a medical condition, a mental health condition, or if you are unsure whether hypnosis is appropriate for you, check with a qualified healthcare professional before using this audio.', pauseAfter: 6, section: 'Welcome' },
  { id: 3, text: '(relaxed)(comforting) Now, get comfortable, in a way that lets your body rest for the next little while. If your eyes want to close... let them close.', pauseAfter: 4, section: 'Welcome' },
  { id: 4, text: '(comforting) This session is designed for an ADHD nervous system. So your attention does not need to behave perfectly. Your mind may wander. That is normal. Each time you notice... you gently return to the sound of my voice.', pauseAfter: 3, section: 'Welcome' },
  { id: 5, text: '(relaxed) And today, we are focusing on... {{MAIN_SYMPTOM}}. So everything we do here guides you toward a calmer, steadier response in that area.', pauseAfter: 10, section: 'Welcome' },

  // ═══ SECTION 2: BODY SCAN ═══
  { id: 6, text: '(comforting) Take a moment to notice how you are arriving right now. Not in your head... in your body.', pauseAfter: 4, section: 'Body Scan' },
  { id: 7, text: '(relaxed) Notice your jaw... your shoulders... your belly... your hands.', pauseAfter: 4, section: 'Body Scan' },
  { id: 8, text: '(empathetic) If you notice any tightness... you do not need to fight it. Just notice it.', pauseAfter: 10, section: 'Body Scan' },

  // ═══ SECTION 3: BREATHING ═══
  { id: 9, text: '(comforting) Now we use a simple breath pattern to tell your nervous system... safe enough, right now.', pauseAfter: 3, section: 'Breathing' },
  { id: 10, text: '(relaxed) Inhale slowly through the nose for about four seconds. Exhale gently for about eight seconds. Longer out than in. As long as it feels comfortable. If eight seconds is too long today, shorten it a little. Comfort first.', pauseAfter: 6, section: 'Breathing' },
  { id: 11, text: '(relaxed) Let us do a few together.', pauseAfter: 3, section: 'Breathing' },
  { id: 12, text: '(relaxed) Inhale... two... three... four.', pauseAfter: 1, section: 'Breathing' },
  { id: 13, text: '(relaxed) Exhale... two... three... four... five... six... seven... eight.', pauseAfter: 10, section: 'Breathing' },
  { id: 14, text: '(relaxed) Again. Inhale... two... three... four.', pauseAfter: 1, section: 'Breathing' },
  { id: 15, text: '(relaxed) Exhale... two... three... four... five... six... seven... eight.', pauseAfter: 12, section: 'Breathing' },
  { id: 16, text: '(comforting) Now, if you like, add a soft hum during the exhale. A gentle vibration. Not loud. Not forced. Just enough to feel it in the chest or throat.', pauseAfter: 3, section: 'Breathing' },
  { id: 17, text: '(relaxed) Inhale... two... three... four.', pauseAfter: 1, section: 'Breathing' },
  { id: 18, text: '(relaxed) Exhale... two... three... four... five... six... seven... eight.', pauseAfter: 14, section: 'Breathing' },
  { id: 19, text: '(relaxed) One more breath, at your own pace. Inhale. Slow exhale.', pauseAfter: 18, section: 'Breathing' },
  { id: 20, text: '(comforting) Good. From here, you do not need to count. Just keep a slightly longer exhale in the background.', pauseAfter: 10, section: 'Breathing' },

  // ═══ SECTION 4: TWICE AS RELAXED ═══
  { id: 21, text: '(relaxed) Now, a gentle experiment.', pauseAfter: 3, section: 'Deepening' },
  { id: 22, text: '(comforting) Imagine what it would feel like to be twice as relaxed as you are right now. No effort required. Just imagine the sensation.', pauseAfter: 12, section: 'Deepening' },
  { id: 23, text: '(comforting) And now imagine what it would feel like to be twice as relaxed as that. Again, no forcing. Just curiosity.', pauseAfter: 14, section: 'Deepening' },

  // ═══ SECTION 5: PROGRESSIVE RELAXATION ═══
  { id: 24, text: '(relaxed) Bring your awareness to the muscles around your eyes. Let them loosen. Let the eyelids rest.', pauseAfter: 8, section: 'Relaxation' },
  { id: 25, text: '(relaxed) Let that softness spread across the forehead. Down into the cheeks. The tongue resting. The jaw unclenching.', pauseAfter: 10, section: 'Relaxation' },
  { id: 26, text: '(relaxed) Let the neck lengthen. Let the shoulders drop. Let the arms become pleasantly heavy. Hands loosening.', pauseAfter: 12, section: 'Relaxation' },
  { id: 27, text: '(relaxed) Let the chest soften. Let the belly be allowed to move with the breath. Let the hips settle. Let the legs rest.', pauseAfter: 16, section: 'Relaxation' },
  { id: 28, text: '(comforting) If your mind wanders, that is fine. When you notice, come back to one simple thing... the long exhale.', pauseAfter: 12, section: 'Relaxation' },

  // ═══ SECTION 6: SAFE PLACE ═══
  { id: 29, text: '(comforting) Now imagine a place that feels calming and safe. A place just for you. Real or imaginary.', pauseAfter: 4, section: 'Safe Place' },
  { id: 30, text: '(relaxed) It might be {{SAFE_PLACE_TYPE}}. Or your mind can simply create a sense of safe enough without an image.', pauseAfter: 10, section: 'Safe Place' },
  { id: 31, text: '(relaxed) Now add a few gentle details.', pauseAfter: 3, section: 'Safe Place' },
  { id: 32, text: '(relaxed) For sound, notice... {{SAFE_PLACE_SENSORY_1}}.', pauseAfter: 12, section: 'Safe Place' },
  { id: 33, text: '(relaxed) For temperature or texture, notice... {{SAFE_PLACE_SENSORY_2}}.', pauseAfter: 12, section: 'Safe Place' },
  { id: 34, text: '(relaxed) For smell or visual detail, notice... {{SAFE_PLACE_SENSORY_3}}.', pauseAfter: 16, section: 'Safe Place' },
  { id: 35, text: '(comforting) Here, there are no demands. Nothing to solve right now. Just a reset.', pauseAfter: 14, section: 'Safe Place' },

  // ═══ SECTION 7: INDUCTION ═══
  { id: 36, text: '(relaxed)(comforting) Whether your conscious mind listens closely or wanders, your deeper mind can still follow along. You can relax the mind the same way you relax a muscle. Not by pushing. By letting go.', pauseAfter: 6, section: 'Induction' },
  { id: 37, text: '(relaxed) In a moment, you will count down silently in your mind from one hundred. Slowly. With space between the numbers. And if you lose your place or forget to count, that is perfectly fine. Often, that simply means you are drifting deeper.', pauseAfter: 4, section: 'Induction' },
  { id: 38, text: '(relaxed) Begin now. One hundred... ninety nine... ninety eight... and so on. Slower than usual. More space. Less effort.', pauseAfter: 40, section: 'Induction' },
  { id: 39, text: '(relaxed) And as the counting fades, let it fade. Let the mind drift. Let it float.', pauseAfter: 22, section: 'Induction' },
  { id: 40, text: '(relaxed) Now I will count from five down to one. And with each number, you can imagine descending into a quieter place inside. Like a gentle escalator going down.', pauseAfter: 4, section: 'Induction' },
  { id: 41, text: '(relaxed) Five. Deeper.', pauseAfter: 6, section: 'Induction' },
  { id: 42, text: '(relaxed) Four. Softer.', pauseAfter: 6, section: 'Induction' },
  { id: 43, text: '(relaxed) Three. Slower.', pauseAfter: 6, section: 'Induction' },
  { id: 44, text: '(relaxed) Two. Quieter.', pauseAfter: 6, section: 'Induction' },
  { id: 45, text: '(relaxed) One. Settled.', pauseAfter: 16, section: 'Induction' },

  // ═══ SECTION 8: TRIGGER REWIRING ═══
  { id: 46, text: '(comforting) Now bring to mind the situation that usually sets things off for you. {{TRIGGER}}.', pauseAfter: 4, section: 'Rewiring' },
  { id: 47, text: '(relaxed) You do not need to replay the whole story. Just let it be a small idea in the background, like a headline.', pauseAfter: 12, section: 'Rewiring' },
  { id: 48, text: '(empathetic) Notice what your system usually tries to do when this shows up. Maybe it speeds you up. Maybe it tightens you. Maybe it pulls you into overthinking. Maybe it urges you to brace, fix, explain, or escape.', pauseAfter: 10, section: 'Rewiring' },
  { id: 49, text: '(comforting)(sincere) Here is the rewire.', pauseAfter: 4, section: 'Rewiring' },
  { id: 50, text: '(confident)(comforting) When this trigger shows up, you recognize... this is activation. Not danger.', pauseAfter: 12, section: 'Rewiring' },
  { id: 51, text: '(comforting) And because it is not danger, you do not need emergency mode. You stay here. You stay grounded. You stay in your body.', pauseAfter: 12, section: 'Rewiring' },
  { id: 52, text: '(relaxed) So in that moment, you do one simple thing. One long exhale. Inhale gently. Exhale longer.', pauseAfter: 16, section: 'Rewiring' },
  { id: 53, text: '(relaxed) And as you exhale, you feel gravity again. You feel support again. You let the floor, the chair, the bed, hold you.', pauseAfter: 16, section: 'Rewiring' },
  { id: 54, text: '(sincere)(comforting) Now you choose steadiness. Not perfection. Steadiness.', pauseAfter: 4, section: 'Rewiring' },
  { id: 55, text: '(comforting) Steadiness means you respond from the present moment, not from alarm. Steadiness means you can take one step at a time. Steadiness means you do not abandon yourself.', pauseAfter: 18, section: 'Rewiring' },

  // ═══ SECTION 9: REHEARSAL LOOPS ═══
  { id: 56, text: '(relaxed) Now rehearse it as a simple loop.', pauseAfter: 4, section: 'Rehearsal' },
  { id: 57, text: '(relaxed)(comforting) The trigger shows up. You recognize activation, not danger. You take the long exhale. You stay grounded. You respond with steadiness.', pauseAfter: 22, section: 'Rehearsal' },
  { id: 58, text: '(relaxed) Again, even easier.', pauseAfter: 3, section: 'Rehearsal' },
  { id: 59, text: '(relaxed) Trigger. Not danger. Long exhale. Grounded. Steady.', pauseAfter: 22, section: 'Rehearsal' },
  { id: 60, text: '(relaxed) And again, as if this is becoming familiar.', pauseAfter: 3, section: 'Rehearsal' },
  { id: 61, text: '(relaxed) Trigger. Not danger. Long exhale. Grounded. Steady.', pauseAfter: 24, section: 'Rehearsal' },

  // ═══ SECTION 10: BODY CUE ═══
  { id: 62, text: '(comforting) Now add an early reminder from your body. {{BODY_CUE_LINE}} Not to fight the feeling. To guide it.', pauseAfter: 18, section: 'Body Cue' },
  { id: 63, text: '(relaxed) Now let the trigger fade into the background. Return to your safe place. Return to the simple sense of safe enough.', pauseAfter: 18, section: 'Body Cue' },

  // ═══ SECTION 11: CORE SUGGESTIONS ═══
  { id: 64, text: '(sincere)(comforting) Your nervous system can learn this. Not by willpower. By repetition.', pauseAfter: 6, section: 'Suggestions' },
  { id: 65, text: '(comforting) And over time, when {{TRIGGER}} happens, you may notice you recover faster. You may notice less escalation. You may notice more steadiness, and more choice in how you respond. Not all at once. But real. And growing.', pauseAfter: 18, section: 'Suggestions' },
  { id: 66, text: '(empathetic)(comforting) Stress and anxiety are often the body preparing for something. And sometimes it prepares when it does not need to. From now on, you get better at sending the message... thank you, body. I have this.', pauseAfter: 4, section: 'Suggestions' },
  { id: 67, text: '(relaxed) And the body learns to trust you.', pauseAfter: 20, section: 'Suggestions' },

  // ═══ SECTION 12: POST-SESSION CUE ═══
  { id: 68, text: '(sincere)(comforting) From this point forward, your cue is simple. When you notice activation, you do one long exhale. And you remain grounded.', pauseAfter: 4, section: 'Post-Cue' },
  { id: 69, text: '(comforting) That single move becomes the doorway back to steadiness.', pauseAfter: 18, section: 'Post-Cue' },

  // ═══ SECTION 13: REORIENTATION ═══
  { id: 70, text: '(relaxed) In a moment I will count from one up to five. And as I do, you will return to normal awake awareness, feeling clear, present, and steady.', pauseAfter: 4, section: 'Reorientation' },
  { id: 71, text: '(relaxed) One. Becoming aware of the room again.', pauseAfter: 5, section: 'Reorientation' },
  { id: 72, text: '(relaxed) Two. Feeling your body more. Hands. Feet. Posture.', pauseAfter: 5, section: 'Reorientation' },
  { id: 73, text: '(relaxed) Three. Taking a deeper breath. Gently energizing.', pauseAfter: 5, section: 'Reorientation' },
  { id: 74, text: '(relaxed) Four. Maybe stretching or rolling the shoulders. Bringing movement back.', pauseAfter: 5, section: 'Reorientation' },
  { id: 75, text: '(relaxed)(confident) Five. And when you are ready, opening your eyes, feeling present, grounded, and calm.', pauseAfter: 6, section: 'Reorientation' },
  { id: 76, text: '(sincere) End of session.', pauseAfter: 0, section: 'Reorientation' },
];
```

---

## PART 4: BACKEND — AUDIO GENERATION FLOW

Create a server-side API route (or Vite server function) that:

### Step 1: Replace placeholders
Take user form data and replace all {{PLACEHOLDER}} values in the script clips.

### Step 2: Generate voice clips via Fish Audio
For each of the 76 clips, call the Fish Audio API:
```javascript
async function generateClip(text, apiKey, voiceId) {
  const res = await fetch('https://api.fish.audio/v1/tts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      reference_id: voiceId,
      format: 'mp3',
      mp3_bitrate: 128,
      normalize: false,
      latency: 'normal',
      prosody: { speed: 0.85, volume: 0 },
    }),
  });
  return await res.arrayBuffer();
}
```

### Step 3: Stitch clips + silence gaps
Use ffmpeg (server-side) or Web Audio API (client-side) to concatenate:
- clip 1 audio → 3 seconds silence → clip 2 audio → 6 seconds silence → ... → clip 76

### Step 4: Layer with BB+ISO track
The binaural beats + isochronic tones track is a pre-made 25-minute MP3 stored in the project.
Mix the voice track on top at correct volume levels:
- Voice: 100% (loudest)
- BB+ISO: ~15-20% (subtle, underneath)

### Step 5: Return final audio
Return the mixed audio as a downloadable/streamable MP3.

---

## PART 5: FRONTEND — GENERATION PROGRESS

While generating, show:
- Progress bar (clip X of 76)
- Current section name
- Estimated time remaining
- Waveform visualization (optional)

After generation, show:
- Audio player with play/pause/seek
- Download button
- "Generate another" button

---

## PART 6: AUDIO VOLUME LEVELS

When mixing final audio:
```
Voice (Fish Audio output):     100%  (0 dB)
Isochronic tones (ZENmix):     45%  (-7 dB)
Binaural beats:                 15%  (-16.5 dB)
Background music (if any):      30%  (-10 dB)
```

---

## PART 7: VISUAL DESIGN

Same style as landing pages:
- Background: #FAFBF9
- Primary: #7C9A82 (sage green)
- Warm accent: #C4A882
- Text dark: #2D3436
- Text mid: #5A6B6D
- Font: Poppins (Google Fonts)
- Rounded corners: 16-20px
- Calming, minimal, ADHD-friendly (no clutter, clear progress, one step at a time)

Each form step should be full-screen with a "Next" button. Show step indicator (1/5, 2/5, etc).

---

## IMPORTANT NOTES

1. The Fish Audio API key and voice model ID should be stored as environment variables on Vercel, NOT exposed to the client.
2. All Fish Audio API calls MUST go through a server-side proxy/API route.
3. The `normalize: false` setting is critical — without it, emotion tags like (relaxed) won't work.
4. Speed 0.85 gives the slow, hypnotic pacing needed for a guided session.
5. The BB+ISO audio file is pre-made and ships with the app — it doesn't need to be generated per user.
6. Error handling: if a clip fails, retry up to 3 times before showing an error.
7. The full generation will take 3-5 minutes for 76 clips. Show clear progress to the user.

---

## DEPLOYMENT

After implementing:
1. Add environment variables on Vercel:
   - FISH_AUDIO_API_KEY
   - FISH_AUDIO_VOICE_ID
2. Commit and push to main
3. Vercel auto-deploys
4. Test at adhdselfhypnosis.com/hypnosis-generator
