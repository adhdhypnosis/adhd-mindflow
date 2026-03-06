export const hypnosisScript = [
  // SECTION 1: WELCOME
  { id: 1, text: '(relaxed)(sincere) Welcome to this audio from Mind Refuge. My name is David.', pauseAfter: 3, section: 'Welcome' },
  { id: 2, text: '(sincere) Before we begin, a quick note. This audio is for education and relaxation. It is not medical or psychological treatment. If you have a medical condition, a mental health condition, or if you are unsure whether hypnosis is appropriate for you, check with a qualified healthcare professional before using this audio.', pauseAfter: 6, section: 'Welcome' },
  { id: 3, text: '(relaxed)(comforting) Now, get comfortable, in a way that lets your body rest for the next little while. If your eyes want to close... let them close.', pauseAfter: 4, section: 'Welcome' },
  { id: 4, text: '(comforting) This session is designed for an ADHD nervous system. So your attention does not need to behave perfectly. Your mind may wander. That is normal. Each time you notice... you gently return to the sound of my voice.', pauseAfter: 3, section: 'Welcome' },
  { id: 5, text: '(relaxed) And today, we are focusing on... {{MAIN_SYMPTOM}}. So everything we do here guides you toward a calmer, steadier response in that area.', pauseAfter: 10, section: 'Welcome' },

  // SECTION 2: BODY SCAN
  { id: 6, text: '(comforting) Take a moment to notice how you are arriving right now. Not in your head... in your body.', pauseAfter: 4, section: 'Body Scan' },
  { id: 7, text: '(relaxed) Notice your jaw... your shoulders... your belly... your hands.', pauseAfter: 4, section: 'Body Scan' },
  { id: 8, text: '(empathetic) If you notice any tightness... you do not need to fight it. Just notice it.', pauseAfter: 10, section: 'Body Scan' },

  // SECTION 3: BREATHING
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

  // SECTION 4: TWICE AS RELAXED
  { id: 21, text: '(relaxed) Now, a gentle experiment.', pauseAfter: 3, section: 'Deepening' },
  { id: 22, text: '(comforting) Imagine what it would feel like to be twice as relaxed as you are right now. No effort required. Just imagine the sensation.', pauseAfter: 12, section: 'Deepening' },
  { id: 23, text: '(comforting) And now imagine what it would feel like to be twice as relaxed as that. Again, no forcing. Just curiosity.', pauseAfter: 14, section: 'Deepening' },

  // SECTION 5: PROGRESSIVE RELAXATION
  { id: 24, text: '(relaxed) Bring your awareness to the muscles around your eyes. Let them loosen. Let the eyelids rest.', pauseAfter: 8, section: 'Relaxation' },
  { id: 25, text: '(relaxed) Let that softness spread across the forehead. Down into the cheeks. The tongue resting. The jaw unclenching.', pauseAfter: 10, section: 'Relaxation' },
  { id: 26, text: '(relaxed) Let the neck lengthen. Let the shoulders drop. Let the arms become pleasantly heavy. Hands loosening.', pauseAfter: 12, section: 'Relaxation' },
  { id: 27, text: '(relaxed) Let the chest soften. Let the belly be allowed to move with the breath. Let the hips settle. Let the legs rest.', pauseAfter: 16, section: 'Relaxation' },
  { id: 28, text: '(comforting) If your mind wanders, that is fine. When you notice, come back to one simple thing... the long exhale.', pauseAfter: 12, section: 'Relaxation' },

  // SECTION 6: SAFE PLACE
  { id: 29, text: '(comforting) Now imagine a place that feels calming and safe. A place just for you. Real or imaginary.', pauseAfter: 4, section: 'Safe Place' },
  { id: 30, text: '(relaxed) It might be {{SAFE_PLACE_TYPE}}. Or your mind can simply create a sense of safe enough without an image.', pauseAfter: 10, section: 'Safe Place' },
  { id: 31, text: '(relaxed) Now add a few gentle details.', pauseAfter: 3, section: 'Safe Place' },
  { id: 32, text: '(relaxed) For sound, notice... {{SAFE_PLACE_SENSORY_1}}.', pauseAfter: 12, section: 'Safe Place' },
  { id: 33, text: '(relaxed) For temperature or texture, notice... {{SAFE_PLACE_SENSORY_2}}.', pauseAfter: 12, section: 'Safe Place' },
  { id: 34, text: '(relaxed) For smell or visual detail, notice... {{SAFE_PLACE_SENSORY_3}}.', pauseAfter: 16, section: 'Safe Place' },
  { id: 35, text: '(comforting) Here, there are no demands. Nothing to solve right now. Just a reset.', pauseAfter: 14, section: 'Safe Place' },

  // SECTION 7: INDUCTION
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

  // SECTION 8: TRIGGER REWIRING
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

  // SECTION 9: REHEARSAL LOOPS
  { id: 56, text: '(relaxed) Now rehearse it as a simple loop.', pauseAfter: 4, section: 'Rehearsal' },
  { id: 57, text: '(relaxed)(comforting) The trigger shows up. You recognize activation, not danger. You take the long exhale. You stay grounded. You respond with steadiness.', pauseAfter: 22, section: 'Rehearsal' },
  { id: 58, text: '(relaxed) Again, even easier.', pauseAfter: 3, section: 'Rehearsal' },
  { id: 59, text: '(relaxed) Trigger. Not danger. Long exhale. Grounded. Steady.', pauseAfter: 22, section: 'Rehearsal' },
  { id: 60, text: '(relaxed) And again, as if this is becoming familiar.', pauseAfter: 3, section: 'Rehearsal' },
  { id: 61, text: '(relaxed) Trigger. Not danger. Long exhale. Grounded. Steady.', pauseAfter: 24, section: 'Rehearsal' },

  // SECTION 10: BODY CUE
  { id: 62, text: '(comforting) Now add an early reminder from your body. {{BODY_CUE_LINE}} Not to fight the feeling. To guide it.', pauseAfter: 18, section: 'Body Cue' },
  { id: 63, text: '(relaxed) Now let the trigger fade into the background. Return to your safe place. Return to the simple sense of safe enough.', pauseAfter: 18, section: 'Body Cue' },

  // SECTION 11: CORE SUGGESTIONS
  { id: 64, text: '(sincere)(comforting) Your nervous system can learn this. Not by willpower. By repetition.', pauseAfter: 6, section: 'Suggestions' },
  { id: 65, text: '(comforting) And over time, when {{TRIGGER}} happens, you may notice you recover faster. You may notice less escalation. You may notice more steadiness, and more choice in how you respond. Not all at once. But real. And growing.', pauseAfter: 18, section: 'Suggestions' },
  { id: 66, text: '(empathetic)(comforting) Stress and anxiety are often the body preparing for something. And sometimes it prepares when it does not need to. From now on, you get better at sending the message... thank you, body. I have this.', pauseAfter: 4, section: 'Suggestions' },
  { id: 67, text: '(relaxed) And the body learns to trust you.', pauseAfter: 20, section: 'Suggestions' },

  // SECTION 12: POST-SESSION CUE
  { id: 68, text: '(sincere)(comforting) From this point forward, your cue is simple. When you notice activation, you do one long exhale. And you remain grounded.', pauseAfter: 4, section: 'Post-Cue' },
  { id: 69, text: '(comforting) That single move becomes the doorway back to steadiness.', pauseAfter: 18, section: 'Post-Cue' },

  // SECTION 13: REORIENTATION
  { id: 70, text: '(relaxed) In a moment I will count from one up to five. And as I do, you will return to normal awake awareness, feeling clear, present, and steady.', pauseAfter: 4, section: 'Reorientation' },
  { id: 71, text: '(relaxed) One. Becoming aware of the room again.', pauseAfter: 5, section: 'Reorientation' },
  { id: 72, text: '(relaxed) Two. Feeling your body more. Hands. Feet. Posture.', pauseAfter: 5, section: 'Reorientation' },
  { id: 73, text: '(relaxed) Three. Taking a deeper breath. Gently energizing.', pauseAfter: 5, section: 'Reorientation' },
  { id: 74, text: '(relaxed) Four. Maybe stretching or rolling the shoulders. Bringing movement back.', pauseAfter: 5, section: 'Reorientation' },
  { id: 75, text: '(relaxed)(confident) Five. And when you are ready, opening your eyes, feeling present, grounded, and calm.', pauseAfter: 6, section: 'Reorientation' },
  { id: 76, text: '(sincere) End of session.', pauseAfter: 0, section: 'Reorientation' },
];

export function prepareScript(formData) {
  const {
    focus,
    trigger,
    bodyCue1,
    bodyCue2,
    safePlace,
    sensory1,
    sensory2,
    sensory3,
  } = formData;

  const SAFE_PLACE_TYPE = safePlace || 'a quiet, comfortable place';
  const SAFE_PLACE_SENSORY_1 = sensory1 || 'wind moving through leaves, distant waves, or soft birdsong';
  const SAFE_PLACE_SENSORY_2 = sensory2 || 'a comfortable temperature, a gentle breeze, or the feeling of soft fabric supporting you';
  const SAFE_PLACE_SENSORY_3 = sensory3 || 'clean air, a subtle scent of pine or ocean, or warm light in the scene';

  let BODY_CUE_LINE;
  if (bodyCue1 && bodyCue2) {
    BODY_CUE_LINE = `When you notice ${bodyCue1} or ${bodyCue2}, that is your cue to do the long exhale early.`;
  } else if (bodyCue1) {
    BODY_CUE_LINE = `When you notice ${bodyCue1}, or perhaps shoulders rising or thoughts speeding up, that is your cue to do the long exhale early.`;
  } else if (bodyCue2) {
    BODY_CUE_LINE = `When you notice ${bodyCue2}, or perhaps tight chest or jaw clenching, that is your cue to do the long exhale early.`;
  } else {
    BODY_CUE_LINE = 'When you notice tight chest, jaw clenching, shoulders rising, or thoughts speeding up, that is your cue to do the long exhale early.';
  }

  return hypnosisScript.map(clip => ({
    ...clip,
    text: clip.text
      .replace(/\{\{MAIN_SYMPTOM\}\}/g, focus)
      .replace(/\{\{TRIGGER\}\}/g, trigger)
      .replace(/\{\{BODY_CUE_LINE\}\}/g, BODY_CUE_LINE)
      .replace(/\{\{SAFE_PLACE_TYPE\}\}/g, SAFE_PLACE_TYPE)
      .replace(/\{\{SAFE_PLACE_SENSORY_1\}\}/g, SAFE_PLACE_SENSORY_1)
      .replace(/\{\{SAFE_PLACE_SENSORY_2\}\}/g, SAFE_PLACE_SENSORY_2)
      .replace(/\{\{SAFE_PLACE_SENSORY_3\}\}/g, SAFE_PLACE_SENSORY_3),
  }));
}
