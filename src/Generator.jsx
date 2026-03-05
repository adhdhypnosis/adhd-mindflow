import { useState, useEffect, useRef, useCallback } from "react";

const MAIN_SYMPTOMS = [
  { id: "emotional", label: "Emotional Dysregulation", icon: "🌊", color: "#7C9A82" },
  { id: "focus", label: "Inattention & Focus", icon: "🔍", color: "#6B8F72" },
  { id: "executive", label: "Executive Dysfunction", icon: "🧩", color: "#8DB394" },
  { id: "hyperactivity", label: "Hyperactivity & Restlessness", icon: "⚡", color: "#5A7D60" },
  { id: "time", label: "Time Blindness", icon: "⏳", color: "#89A68F" },
  { id: "memory", label: "Memory Issues", icon: "💭", color: "#A8C5AE" },
  { id: "sleep", label: "Sleep Difficulties", icon: "🌙", color: "#B8A88A" },
  { id: "social", label: "Social Challenges", icon: "🤝", color: "#C4A882" },
];

const SUB_SYMPTOMS = {
  emotional: ["Mood swings","Low self-esteem","Stress & anxiety","Rejection sensitivity","Emotional overwhelm","Irritability","Shame spirals","Frustration intolerance"],
  focus: ["Mind wandering","Difficulty concentrating","Easily distracted","Zoning out in conversations","Losing track of tasks","Trouble following instructions","Difficulty prioritizing","Mental fog"],
  executive: ["Difficulty starting tasks","Poor planning","Disorganization","Decision paralysis","Task switching struggles","Breaking down projects","Procrastination","Goal setting challenges"],
  hyperactivity: ["Physical restlessness","Racing thoughts","Fidgeting","Difficulty sitting still","Need for stimulation","Inner restlessness","Talking excessively","Impulsive actions"],
  time: ["Chronic lateness","Poor time estimation","Deadline struggles","Losing track of time","Difficulty with routines","Underestimating task duration","Schedule management","Time perception gaps"],
  memory: ["Forgetting appointments","Losing belongings","Working memory gaps","Difficulty retaining info","Forgetting names","Misplacing items","Short-term memory lapses","Forgetting mid-conversation"],
  sleep: ["Racing mind at bedtime","Delayed sleep onset","Difficulty waking up","Inconsistent sleep schedule","Nighttime restlessness","Sleep anxiety","Oversleeping","Poor sleep quality"],
  social: ["Interrupting others","Difficulty listening","Social anxiety","Misreading social cues","Oversharing","Maintaining friendships","Feeling misunderstood","Conversation difficulties"],
};

const FALLBACK_VOICES = [
  { id: "fallback1", elevenId: "21m00Tcm4TlvDq8ikWAM", name: "Rachel", desc: "Calm & warm female", gender: "female", tag: "Popular" },
  { id: "fallback2", elevenId: "29vD33N1CtxCmqQRPOHJ", name: "Drew", desc: "Soothing male", gender: "male", tag: "Deep" },
];

async function fetchVoices(apiKey) {
  try {
    const res = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": apiKey },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.voices || data.voices.length === 0) return null;
    const tags = ["Popular", "Gentle", "Deep", "Warm", "Refined", "Comfort", "Smooth", "Calm", "Resonant", "Soft"];
    return data.voices.slice(0, 8).map((v, i) => ({
      id: v.voice_id,
      elevenId: v.voice_id,
      name: v.name,
      desc: (v.labels?.description || v.labels?.accent || "AI voice"),
      gender: v.labels?.gender || "unknown",
      tag: tags[i % tags.length],
      previewUrl: v.preview_url || null,
    }));
  } catch (e) {
    return null;
  }
}

const SAFE_PLACE_OPTIONS = [
  { id: "forest", label: "Forest", icon: "\uD83C\uDF32" },
  { id: "beach", label: "Beach", icon: "\uD83C\uDFD6\uFE0F" },
  { id: "cozy-room", label: "Cozy Room", icon: "\uD83D\uDECB\uFE0F" },
  { id: "mountains", label: "Mountains", icon: "\u26F0\uFE0F" },
  { id: "cabin", label: "Cabin", icon: "\uD83C\uDFE1" },
  { id: "garden", label: "Garden", icon: "\uD83C\uDF3B" },
  { id: "library", label: "Library", icon: "\uD83D\uDCDA" },
  { id: "lakeside", label: "Lakeside", icon: "\uD83C\uDFDE\uFE0F" },
];

const PREMIUM_TRACKS = [
  { id: "p1", title: "Soothe Stress & Anxiety", therapist: "Dr. Sarah Mitchell", duration: "22 min", price: 20, color: "#7ecec1", icon: "🍃" },
  { id: "p2", title: "Boost Self-Esteem", therapist: "James Harlow, CHt", duration: "25 min", price: 20, color: "#d4a574", icon: "✨" },
  { id: "p3", title: "Deep Focus Flow State", therapist: "Dr. Sarah Mitchell", duration: "20 min", price: 20, color: "#7C9A82", icon: "🎯" },
  { id: "p4", title: "Calm the Inner Storm", therapist: "Lena Vasquez, CHt", duration: "28 min", price: 20, color: "#C4A882", icon: "🌊" },
  { id: "p5", title: "Restful Sleep Journey", therapist: "James Harlow, CHt", duration: "30 min", price: 20, color: "#6B8F72", icon: "🌙" },
  { id: "p6", title: "Overcome Procrastination", therapist: "Lena Vasquez, CHt", duration: "18 min", price: 20, color: "#f59e0b", icon: "🚀" },
];

function resolveBodyCues(bodyCue1, bodyCue2) {
  const c1 = bodyCue1?.trim();
  const c2 = bodyCue2?.trim();
  if (c1 && c2) return c1 + " or " + c2;
  if (c1) return c1 + ", jaw clenching, or shoulders rising";
  if (c2) return c2 + ", tight chest, or thoughts speeding up";
  return "tight chest, jaw clenching, shoulders rising, or thoughts speeding up";
}

function resolveSafePlace(safePlace) {
  if (!safePlace) return "a quiet, comfortable place";
  return SAFE_PLACE_OPTIONS.find(o => o.id === safePlace)?.label.toLowerCase() || "a quiet, comfortable place";
}

const P6 = '<break time="3.0s" /><break time="3.0s" />';
const P10 = '<break time="3.0s" /><break time="3.0s" /><break time="3.0s" />';
const P12 = '<break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="3.0s" />';
const P14 = '<break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="2.0s" />';
const P16 = '<break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="3.0s" />';
const P18 = '<break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="3.0s" /><break time="3.0s" />';
const P20 = P18 + '<break time="2.0s" />';
const P22 = P18 + '<break time="3.0s" />';
const P24 = P18 + '<break time="3.0s" /><break time="3.0s" />';
const P40 = P24 + P16;

function generateFullScript({ mainSymptom, subSymptoms, trigger, safePlace, bodyCue1, bodyCue2 }) {
  const symptomLabel = MAIN_SYMPTOMS.find(s => s.id === mainSymptom)?.label || "emotional dysregulation";
  const safePlaceLabel = resolveSafePlace(safePlace);
  const bodyCues = resolveBodyCues(bodyCue1, bodyCue2);
  const s1 = bodyCue1?.trim() || "";
  const s2 = bodyCue2?.trim() || "";

  const sensory1 = "wind moving through leaves, distant waves, or soft birdsong";
  const sensory2 = "a comfortable temperature, a gentle breeze, or the feeling of soft fabric supporting you";
  const sensory3 = "clean air, a subtle scent of pine or ocean, or warm light in the scene";

  return `Welcome to this audio from Mind Refuge.

Before we begin, a quick note. This audio is for education and relaxation. It is not medical or psychological treatment. If you have a medical condition, a mental health condition, or if you are unsure whether hypnosis is appropriate for you, check with a qualified healthcare professional before using this audio.

${P6}

Now, get comfortable, in a way that lets your body rest for the next little while. If your eyes want to close, let them close.

This session is designed for an ADHD nervous system. So your attention does not need to behave perfectly. Your mind may wander. That is normal. Each time you notice, you gently return to the sound of my voice.

And today, we are focusing on: ${symptomLabel}. So everything we do here guides you toward a calmer, steadier response in that area.

${P10}

Take a moment to notice how you are arriving right now. Not in your head. In your body.

Notice your jaw. Your shoulders. Your belly. Your hands.

If you notice any tightness, you do not need to fight it. Just notice it.

${P10}

Now we use a simple breath pattern to tell your nervous system: safe enough, right now.

Inhale slowly through the nose for about 4 seconds. Exhale gently for about 8 seconds. Longer out than in. As long as it feels comfortable. If 8 seconds is too long today, shorten it a little. Comfort first.

${P6}

Let us do a few together.

Inhale, 2, 3, 4. <break time="1.0s" /> Exhale, 2, 3, 4, 5, 6, 7, 8.

${P10}

Again. Inhale, 2, 3, 4. <break time="1.0s" /> Exhale, 2, 3, 4, 5, 6, 7, 8.

${P12}

Now, if you like, add a soft hum during the exhale. A gentle vibration. Not loud. Not forced. Just enough to feel it in the chest or throat.

Inhale 4. Exhale 8, with a quiet hum.

${P14}

One more breath, at your own pace. Inhale. Slow exhale. Optional hum.

${P18}

Good. From here, you do not need to count. Just keep a slightly longer exhale in the background.

${P10}

Now, a gentle experiment.

Imagine what it would feel like to be twice as relaxed as you are right now. No effort required. Just imagine the sensation.

${P12}

And now imagine what it would feel like to be twice as relaxed as that. Again, no forcing. Just curiosity.

${P14}

Bring your awareness to the muscles around your eyes. Let them loosen. Let the eyelids rest.

<break time="3.0s" /><break time="3.0s" /><break time="2.0s" />

Let that softness spread across the forehead. Down into the cheeks. The tongue resting. The jaw unclenching.

${P10}

Let the neck lengthen. Let the shoulders drop. Let the arms become pleasantly heavy. Hands loosening.

${P12}

Let the chest soften. Let the belly be allowed to move with the breath. Let the hips settle. Let the legs rest.

${P16}

If your mind wanders, that is fine. When you notice, come back to one simple thing: the long exhale.

${P12}

Now imagine a place that feels calming and safe. A place just for you. Real or imaginary.

It might be ${safePlaceLabel}. Or your mind can simply create a sense of safe enough without an image.

${P10}

Now add a few gentle details.

For sound, notice: ${sensory1}.

${P12}

For temperature or texture, notice: ${sensory2}.

${P12}

For smell or visual detail, notice: ${sensory3}.

${P16}

Here, there are no demands. Nothing to solve right now. Just a reset.

${P14}

Whether your conscious mind listens closely or wanders, your deeper mind can still follow along. You can relax the mind the same way you relax a muscle. Not by pushing. By letting go.

In a moment, you will count down silently in your mind from 100. Slowly. With space between the numbers. And if you lose your place or forget to count, that is perfectly fine. Often, that simply means you are drifting deeper.

Begin now. 100... 99... 98... slower than usual... more space... less effort...

${P40}

And as the counting fades, let it fade. Let the mind drift. Let it float.

${P22}

Now I will count from 5 down to 1. And with each number, you can imagine descending into a quieter place inside. Like a gentle escalator going down.

5... deeper. ${P6} 4... softer. ${P6} 3... slower. ${P6} 2... quieter. ${P6} 1... settled.

${P16}

Now bring to mind the situation that usually sets things off for you. ${trigger}.

You do not need to replay the whole story. Just let it be a small idea in the background, like a headline.

${P12}

Notice what your system usually tries to do when this shows up. Maybe it speeds you up. Maybe it tightens you. Maybe it pulls you into overthinking. Maybe it urges you to brace, fix, explain, or escape.

${P10}

Here is the rewire.

When this trigger shows up, you recognize: This is activation. Not danger.

${P12}

And because it is not danger, you do not need emergency mode. You stay here. You stay grounded. You stay in your body.

${P12}

So in that moment, you do one simple thing. One long exhale. Inhale gently. Exhale longer. Optional hum.

${P16}

And as you exhale, you feel gravity again. You feel support again. You let the floor, the chair, the bed, hold you.

${P16}

Now you choose steadiness. Not perfection. Steadiness.

Steadiness means you respond from the present moment, not from alarm. Steadiness means you can take one step at a time. Steadiness means you do not abandon yourself.

${P18}

Now rehearse it as a simple loop.

The trigger shows up. You recognize activation, not danger. You take the long exhale. You stay grounded. You respond with steadiness.

${P22}

Again, even easier.

Trigger. Not danger. Long exhale. Grounded. Steady.

${P22}

And again, as if this is becoming familiar.

Trigger. Not danger. Long exhale. Grounded. Steady.

${P24}

Now add an early reminder from your body.

When you notice ${bodyCues}, that is your cue to do the long exhale early. Not to fight the feeling. To guide it.

${P18}

Now let the trigger fade into the background. Return to your safe place. Return to the simple sense of safe enough.

${P18}

Your nervous system can learn this. Not by willpower. By repetition.

And over time, when ${trigger} happens, you may notice you recover faster. You may notice less escalation. You may notice more steadiness and more choice in how you respond. Not all at once. But real. And growing.

${P18}

Stress and anxiety are often the body preparing for something. And sometimes it prepares when it does not need to. From now on, you get better at sending the message: Thank you, body. I have this.

And the body learns to trust you.

${P20}

From this point forward, your cue is simple. When you notice activation, you do one long exhale. Optional hum. And you remain grounded.

That single move becomes the doorway back to steadiness.

${P18}

In a moment I will count from 1 up to 5. And as I do, you will return to normal awake awareness, feeling clear, present, and steady.

1, becoming aware of the room again. <break time="3.0s" /><break time="2.0s" /> 2, feeling your body more, hands, feet, posture. <break time="3.0s" /><break time="2.0s" /> 3, taking a deeper breath, gently energizing. <break time="3.0s" /><break time="2.0s" /> 4, maybe stretching or rolling the shoulders, bringing movement back. <break time="3.0s" /><break time="2.0s" /> 5, and when you are ready, opening your eyes, feeling present, grounded, and calm.

${P6}

End of session.`;
}

function generatePreviewScript({ trigger, bodyCue1, bodyCue2 }) {
  const bodyCues = resolveBodyCues(bodyCue1, bodyCue2);
  return `Now bring to mind the situation that usually sets things off for you. ${trigger}.

You do not need to replay the whole story. Just let it be a small idea in the background, like a headline.

<break time="3.0s" />

Here is the rewire.

When this trigger shows up, you recognize: This is activation. Not danger.

<break time="3.0s" />

And because it is not danger, you do not need emergency mode. You stay here. You stay grounded. You stay in your body.

<break time="3.0s" />

When you notice ${bodyCues}, that is your cue to do the long exhale early. Not to fight the feeling. To guide it.`;
}

async function generateSpeech(text, voiceId, apiKey, onProgress) {
  onProgress("Connecting to ElevenLabs...");
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
    method: "POST",
    headers: { "Content-Type": "application/json", "xi-api-key": apiKey },
    body: JSON.stringify({
      text: text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.75, similarity_boost: 0.75, speed: 0.8 },
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const detail = err.detail?.message || err.detail?.status || err.message || JSON.stringify(err);
    if (response.status === 401) throw new Error("API key unauthorized for TTS. Details: " + detail);
    if (response.status === 429) throw new Error("Rate limit reached. Wait a moment and try again.");
    if (response.status === 422) throw new Error("Invalid request: " + detail);
    throw new Error("ElevenLabs error (" + response.status + "): " + detail);
  }
  onProgress("Generating audio...");
  const blob = await response.blob();
  onProgress("Audio ready!");
  return blob;
}

function VoicePreviewButton({ previewUrl }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    if (!previewUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(previewUrl);
      audioRef.current.addEventListener("ended", () => setPlaying(false));
    }
    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  if (!previewUrl) return null;
  return (
    <button onClick={(e) => { e.stopPropagation(); toggle(); }} style={{
      marginTop: "10px", padding: "6px 16px", borderRadius: "8px", cursor: "pointer",
      background: playing ? "rgba(196,168,130,0.25)" : "rgba(255,255,255,0.08)",
      border: playing ? "1px solid rgba(196,168,130,0.4)" : "1px solid rgba(255,255,255,0.12)",
      color: playing ? "#C4A882" : "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600,
      fontFamily: "'Quicksand', sans-serif", transition: "all 0.2s",
    }}>{playing ? "Stop" : "Preview"}</button>
  );
}

function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          background: "radial-gradient(circle, " + ["rgba(124,154,130,0.15)","rgba(168,197,174,0.12)","rgba(107,143,114,0.1)","rgba(126,206,193,0.12)","rgba(212,165,116,0.1)","rgba(196,168,130,0.1)"][i] + ", transparent)",
          width: (200 + i * 80) + "px", height: (200 + i * 80) + "px",
          left: [10,60,80,20,70,40][i] + "%", top: [20,60,10,80,40,90][i] + "%",
          animation: "floatOrb" + i + " " + (15 + i * 3) + "s ease-in-out infinite",
          filter: "blur(40px)",
        }} />
      ))}
      <style>{
        "@keyframes floatOrb0{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}" +
        "@keyframes floatOrb1{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,30px)}}" +
        "@keyframes floatOrb2{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,50px)}}" +
        "@keyframes floatOrb3{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,-20px)}}" +
        "@keyframes floatOrb4{0%,100%{transform:translate(0,0)}50%{transform:translate(50px,20px)}}" +
        "@keyframes floatOrb5{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,40px)}}"
      }</style>
    </div>
  );
}

function GlassCard({ children, style, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "24px",
      transition: "all 0.3s ease", cursor: onClick ? "pointer" : "default", ...style,
    }}>{children}</div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "40px" }}>
      {[...Array(total)].map((_, i) => (
        <div key={i} style={{
          width: i === step ? "40px" : "12px", height: "4px", borderRadius: "2px",
          background: i <= step ? "linear-gradient(90deg, #7C9A82, #C4A882)" : "rgba(255,255,255,0.15)",
          transition: "all 0.4s ease",
        }} />
      ))}
    </div>
  );
}

function AudioPlayer({ audioBlob, name, voiceName, isGenerating, genProgress, onGenerate }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (audioBlob) {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const url = URL.createObjectURL(audioBlob);
      urlRef.current = url;
      const audio = new Audio(url);
      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
        if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
      });
      audio.addEventListener("ended", () => { setPlaying(false); setProgress(100); });
      audioRef.current = audio;
    }
    return () => { audioRef.current?.pause(); if (urlRef.current) URL.revokeObjectURL(urlRef.current); };
  }, [audioBlob]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause(); else audioRef.current.play();
    setPlaying(!playing);
  };

  const fmt = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");

  if (!audioBlob) {
    return (
      <GlassCard style={{ padding: "32px", textAlign: "center" }}>
        {isGenerating ? (
          <div>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", margin: "0 auto 16px", border: "3px solid rgba(124,154,130,0.2)", borderTopColor: "#7C9A82", animation: "spin 1s linear infinite" }} />
            <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
            <div style={{ color: "#A8C5AE", fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>{genProgress || "Generating..."}</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>This may take 15-30 seconds</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.7 }}>🎧</div>
            <div style={{ color: "#E0EDE2", fontSize: "18px", fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>Ready to generate your preview</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "24px" }}>We will create a ~30 second preview from your therapeutic core using ElevenLabs AI</div>
            <button onClick={onGenerate} style={{
              padding: "14px 40px", borderRadius: "14px", cursor: "pointer",
              background: "linear-gradient(135deg, #7C9A82, #C4A882)", border: "none",
              color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
              boxShadow: "0 4px 30px rgba(124,154,130,0.4)",
            }}>Generate Preview Audio</button>
          </div>
        )}
      </GlassCard>
    );
  }

  return (
    <GlassCard style={{ padding: "32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
        <button onClick={togglePlay} style={{
          width: "64px", height: "64px", borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #7C9A82, #C4A882)", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 30px rgba(124,154,130,0.4)",
        }}>
          <span style={{ fontSize: "24px", color: "#fff", marginLeft: playing ? "0" : "4px" }}>{playing ? "⏸" : "▶"}</span>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#E0EDE2", fontSize: "18px", fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>Self-Hypnosis Preview</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Personalized for {name || "you"} • {voiceName}</div>
        </div>
      </div>
      <div style={{ position: "relative", height: "40px", display: "flex", alignItems: "center", gap: "2px", marginBottom: "8px" }}>
        {[...Array(60)].map((_, i) => {
          const h = 8 + Math.sin(i * 0.5) * 12 + Math.cos(i * 0.3) * 8 + Math.sin(i * 1.2) * 6;
          const filled = (i / 60) * 100 <= progress;
          return <div key={i} style={{ flex: 1, height: h + "px", borderRadius: "2px", background: filled ? "linear-gradient(180deg, #7C9A82, #C4A882)" : "rgba(255,255,255,0.1)", transition: "background 0.15s" }} />;
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
        <span>{fmt(currentTime)}</span><span>{fmt(duration)}</span>
      </div>
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <button onClick={onGenerate} style={{
          padding: "8px 20px", borderRadius: "10px", background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)",
          fontSize: "12px", cursor: "pointer", fontFamily: "'Quicksand', sans-serif",
        }}>Regenerate with different voice</button>
      </div>
    </GlassCard>
  );
}

function ApiKeyPanel({ apiKey, setApiKey, onClose }) {
  const [tempKey, setTempKey] = useState(apiKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const testKey = async () => {
    if (!tempKey.trim()) return;
    setTesting(true); setTestResult(null);
    try {
      const res = await fetch("https://api.elevenlabs.io/v1/user", { headers: { "xi-api-key": tempKey.trim() } });
      if (res.ok) {
        const data = await res.json();
        const charsLeft = data.subscription?.character_limit - data.subscription?.character_count;
        setTestResult({ ok: true, msg: "Connected! " + (charsLeft?.toLocaleString() || "Unknown") + " characters remaining this month." });
      } else {
        setTestResult({ ok: false, msg: "Invalid API key. Please check and try again." });
      }
    } catch (e) { setTestResult({ ok: false, msg: "Network error. Check your connection." }); }
    setTesting(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}>
      <GlassCard style={{ maxWidth: "480px", width: "100%", padding: "36px", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "20px", cursor: "pointer" }}>✕</button>
        <div style={{ fontSize: "14px", marginBottom: "4px" }}>🔑</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, marginBottom: "8px" }}>ElevenLabs API Key</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.6, marginBottom: "24px" }}>Your key stays in your browser and is only sent directly to ElevenLabs. We never store or transmit it elsewhere.</p>
        <div style={{ marginBottom: "16px" }}>
          <input type="password" value={tempKey} onChange={e => setTempKey(e.target.value)} placeholder="sk_xxxxxxxxxxxxxxxxxxxxxxxx"
            style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#E0EDE2", fontSize: "14px", fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = "rgba(124,154,130,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
        </div>
        {testResult && (
          <div style={{ padding: "12px 16px", borderRadius: "10px", marginBottom: "16px", fontSize: "13px", background: testResult.ok ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: "1px solid " + (testResult.ok ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"), color: testResult.ok ? "#86efac" : "#fca5a5" }}>{testResult.msg}</div>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={testKey} disabled={testing || !tempKey.trim()} style={{ flex: 1, padding: "12px", borderRadius: "12px", cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#A8C5AE", fontSize: "14px", fontWeight: 600, fontFamily: "'Quicksand', sans-serif", opacity: (testing || !tempKey.trim()) ? 0.4 : 1 }}>{testing ? "Testing..." : "Test Connection"}</button>
          <button onClick={() => { setApiKey(tempKey.trim()); onClose(); }} disabled={!tempKey.trim()} style={{ flex: 1, padding: "12px", borderRadius: "12px", cursor: "pointer", background: "linear-gradient(135deg, #7C9A82, #4A6B50)", border: "none", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif", opacity: !tempKey.trim() ? 0.4 : 1 }}>Save Key</button>
        </div>
        <div style={{ marginTop: "20px", padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "8px", fontWeight: 600 }}>How to get your key:</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
            1. Go to <span style={{ color: "#A8C5AE" }}>elevenlabs.io</span> and create a free account<br />
            2. Click your profile icon then Profile + API key<br />
            3. Copy the key (starts with sk_) and paste it above<br />
            <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Free tier: ~10,000 characters/month (5-6 sessions)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

const IS = { width: "100%", padding: "14px 16px", borderRadius: "12px", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#E0EDE2", fontSize: "15px", fontFamily: "'Quicksand', sans-serif", outline: "none" };

export default function Generator({ onBack }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [mainSymptom, setMainSymptom] = useState(null);
  const [subSymptoms, setSubSymptoms] = useState([]);
  const [trigger, setTrigger] = useState("");
  const [safePlace, setSafePlace] = useState("");
  const [bodyCue1, setBodyCue1] = useState("");
  const [bodyCue2, setBodyCue2] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  // Stripe checkout will be integrated later for $8 payment
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [premiumCart, setPremiumCart] = useState(null);
  const [activePage, setActivePage] = useState("create");
  const [apiKey, setApiKey] = useState("");
  const [showApiPanel, setShowApiPanel] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState("");
  const [genError, setGenError] = useState(null);
  const [voices, setVoices] = useState(FALLBACK_VOICES);
  const [voicesLoading, setVoicesLoading] = useState(false);

  useEffect(() => {
    if (!apiKey) return;
    let cancelled = false;
    setVoicesLoading(true);
    fetchVoices(apiKey).then((fetched) => {
      if (cancelled) return;
      if (fetched && fetched.length > 0) {
        setVoices(fetched);
        setSelectedVoice(fetched[0].id);
      }
      setVoicesLoading(false);
    });
    return () => { cancelled = true; };
  }, [apiKey]);

  const toggleSub = (sub) => setSubSymptoms(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);

  const handleGenerate = async () => {
    if (!apiKey) { setShowApiPanel(true); return; }
    const voice = voices.find(v => v.id === selectedVoice);
    if (!voice) { setGenError("No voice selected. Go back and select a voice."); return; }
    const previewText = generatePreviewScript({ trigger, bodyCue1, bodyCue2 });
    setIsGenerating(true); setGenError(null); setAudioBlob(null);
    try {
      const blob = await generateSpeech(previewText, voice.elevenId, apiKey, setGenProgress);
      setAudioBlob(blob);
    } catch (err) { setGenError(err.message); }
    setIsGenerating(false);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => { setPaymentProcessing(false); setPaymentComplete(true); }, 2500);
  };

  const canProceed = () => {
    if (step === 0) return mainSymptom !== null;
    if (step === 1) return subSymptoms.length > 0;
    if (step === 2) return trigger.trim().length > 0;
    if (step === 3) return true; // safe space is optional
    if (step === 4) return true; // body cues are optional
    if (step === 5) return selectedVoice !== null;
    return true;
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a110d 0%, #101a14 30%, #0d1510 60%, #0a0f0c 100%)", color: "#E0EDE2", fontFamily: "'Quicksand', 'Segoe UI', sans-serif", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <FloatingOrbs />
      {showApiPanel && <ApiKeyPanel apiKey={apiKey} setApiKey={setApiKey} onClose={() => setShowApiPanel(false)} />}

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,17,13,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={onBack}>
          <div style={{ width: "36px", height: "36px", borderRadius: "12px", background: "linear-gradient(135deg, #7C9A82, #C4A882)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🧠</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600 }}>Mind Refuge</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          {[{ key: "create", label: "Create Session" }, { key: "premium", label: "Premium Library" }].map(tab => (
            <button key={tab.key} onClick={() => { setActivePage(tab.key); if (tab.key === "create") { setStep(0); setShowPayment(false); setPaymentComplete(false); } }}
              style={{ padding: "8px 20px", borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600, fontFamily: "'Quicksand', sans-serif", background: activePage === tab.key ? "rgba(124,154,130,0.25)" : "transparent", color: activePage === tab.key ? "#A8C5AE" : "rgba(255,255,255,0.5)", transition: "all 0.3s" }}>{tab.label}{tab.key === "premium" && <span style={{ marginLeft: "6px", padding: "2px 6px", borderRadius: "4px", background: "rgba(196,168,130,0.2)", color: "#C4A882", fontSize: "10px", fontWeight: 700 }}>PRO</span>}</button>
          ))}
          <button onClick={() => setShowApiPanel(true)} style={{
            padding: "8px 14px", borderRadius: "10px", border: "none", cursor: "pointer",
            background: apiKey ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.12)",
            color: apiKey ? "#86efac" : "#fca5a5", fontSize: "12px", fontWeight: 600,
            fontFamily: "'Quicksand', sans-serif", marginLeft: "4px",
          }}>
            {apiKey ? "🔑 Key Set" : "🔑 Set API Key"}
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px", position: "relative", zIndex: 1 }}>
{/* ═══ CREATE SESSION ═══ */}
        {activePage === "create" && !showPayment && !paymentComplete && (
          <>
            <ProgressBar step={step} total={7} />

            {/* Step 0: Main Symptoms */}
            {step === 0 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 600, marginBottom: "8px", background: "linear-gradient(135deg, #A8C5AE, #C4A882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>What is your main challenge?</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>Select the area you would like to focus on today.</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
                  {MAIN_SYMPTOMS.map(s => (
                    <GlassCard key={s.id} onClick={() => setMainSymptom(s.id)} style={{
                      textAlign: "center", padding: "28px 20px",
                      border: mainSymptom === s.id ? "2px solid " + s.color : "1px solid rgba(255,255,255,0.08)",
                      background: mainSymptom === s.id ? s.color + "22" : "rgba(255,255,255,0.04)",
                      transform: mainSymptom === s.id ? "scale(1.03)" : "scale(1)",
                    }}>
                      <div style={{ fontSize: "36px", marginBottom: "12px" }}>{s.icon}</div>
                      <div style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.4 }}>{s.label}</div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Sub Symptoms */}
            {step === 1 && mainSymptom && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Which of these resonate with you?</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>Select all that apply. ({subSymptoms.length} selected)</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                  {SUB_SYMPTOMS[mainSymptom].map(sub => {
                    const sel = subSymptoms.includes(sub);
                    return (
                      <div key={sub} onClick={() => toggleSub(sub)} style={{
                        padding: "16px 20px", borderRadius: "14px", cursor: "pointer",
                        background: sel ? "rgba(124,154,130,0.2)" : "rgba(255,255,255,0.04)",
                        border: sel ? "1px solid rgba(124,154,130,0.5)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", alignItems: "center", gap: "12px", transition: "all 0.25s",
                      }}>
                        <div style={{
                          width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                          border: sel ? "none" : "2px solid rgba(255,255,255,0.2)",
                          background: sel ? "linear-gradient(135deg, #7C9A82, #C4A882)" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "#fff",
                        }}>{sel && "\u2713"}</div>
                        <span style={{ fontSize: "14px", fontWeight: sel ? 600 : 400 }}>{sub}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Trigger */}
            {step === 2 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Describe Your Trigger</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>What situation triggers this pattern?</p>
                </div>
                <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>Describe the situation</label>
                  <input value={trigger} onChange={e => setTrigger(e.target.value)} placeholder='e.g. "When my boss gives me critical feedback..."'
                    style={{ ...IS, fontSize: "16px", padding: "16px 20px", borderRadius: "14px" }}
                    onFocus={e => e.target.style.borderColor = "rgba(124,154,130,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", marginTop: "12px" }}>This helps personalize your hypnosis session to address your specific pattern.</p>
                </div>
              </div>
            )}

            {/* Step 3: Safe Space (Optional) */}
            {step === 3 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Create Your Safe Space</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>Where does your mind go when it feels safe? <span style={{ opacity: 0.6 }}>(Optional)</span></p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "14px", maxWidth: "650px", margin: "0 auto" }}>
                  {SAFE_PLACE_OPTIONS.map(opt => {
                    const sel = safePlace === opt.id;
                    return (
                      <GlassCard key={opt.id} onClick={() => setSafePlace(safePlace === opt.id ? "" : opt.id)} style={{
                        textAlign: "center", padding: "24px 16px",
                        border: sel ? "2px solid #7C9A82" : "1px solid rgba(255,255,255,0.08)",
                        background: sel ? "rgba(124,154,130,0.15)" : "rgba(255,255,255,0.04)",
                        transform: sel ? "scale(1.03)" : "scale(1)",
                      }}>
                        <div style={{ fontSize: "32px", marginBottom: "10px" }}>{opt.icon}</div>
                        <div style={{ fontSize: "13px", fontWeight: 600 }}>{opt.label}</div>
                      </GlassCard>
                    );
                  })}
                </div>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", textAlign: "center", marginTop: "16px" }}>Skip if unsure — we will use calming defaults.</p>
              </div>
            )}

            {/* Step 4: Body Cues (Optional) */}
            {step === 4 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Your Body's Warning Signs</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>How does your body signal that this pattern is activating? <span style={{ opacity: 0.6 }}>(Optional)</span></p>
                </div>
                <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>First body signal</label>
                  <input value={bodyCue1} onChange={e => setBodyCue1(e.target.value)} placeholder="e.g. tight chest, racing heart"
                    style={{ ...IS, fontSize: "15px", padding: "14px 18px", borderRadius: "14px", marginBottom: "16px" }}
                    onFocus={e => e.target.style.borderColor = "rgba(124,154,130,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>Second body signal</label>
                  <input value={bodyCue2} onChange={e => setBodyCue2(e.target.value)} placeholder="e.g. jaw clenching, shoulders rising"
                    style={{ ...IS, fontSize: "15px", padding: "14px 18px", borderRadius: "14px" }}
                    onFocus={e => e.target.style.borderColor = "rgba(124,154,130,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", textAlign: "center", marginTop: "16px" }}>Skip if unsure — we will use common ADHD patterns as defaults.</p>
                </div>
              </div>
            )}

            {/* Step 5: Voice Selection */}
            {step === 5 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Choose your guide's voice</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>
                    Powered by ElevenLabs AI — studio-quality voices.
                    {!apiKey && <span style={{ color: "#fca5a5" }}> Set your API key first using the button above to load voices.</span>}
                    {voicesLoading && <span style={{ color: "#A8C5AE" }}> Loading your available voices...</span>}
                  </p>
                </div>
                {voicesLoading ? (
                  <div style={{ textAlign: "center", padding: "40px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", margin: "0 auto 16px", border: "3px solid rgba(124,154,130,0.2)", borderTopColor: "#7C9A82", animation: "spin 1s linear infinite" }} />
                    <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Fetching voices from ElevenLabs...</div>
                  </div>
                ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px", maxWidth: "700px", margin: "0 auto" }}>
                  {voices.map(v => {
                    const active = selectedVoice === v.id;
                    return (
                      <GlassCard key={v.id} onClick={() => setSelectedVoice(v.id)} style={{
                        textAlign: "center", padding: "28px 16px",
                        border: active ? "2px solid #7C9A82" : "1px solid rgba(255,255,255,0.08)",
                        background: active ? "rgba(124,154,130,0.15)" : "rgba(255,255,255,0.04)",
                      }}>
                        <div style={{ width: "52px", height: "52px", borderRadius: "50%", margin: "0 auto 12px", background: active ? "linear-gradient(135deg, #7C9A82, #C4A882)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{v.gender === "female" ? "\u2640" : "\u2642"}</div>
                        <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "2px" }}>{v.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "8px" }}>{v.desc}</div>
                        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "6px", background: "rgba(124,154,130,0.15)", fontSize: "10px", fontWeight: 700, color: "#A8C5AE", textTransform: "uppercase", letterSpacing: "1px" }}>{v.tag}</span>
                        <VoicePreviewButton previewUrl={v.previewUrl} />
                      </GlassCard>
                    );
                  })}
                </div>
                )}
              </div>
            )}

            {/* Step 6: Hypnosis Track Preview */}
            {step === 6 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Your Session Preview</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>Listen to a 30-second preview from the therapeutic core of your session.</p>
                </div>
                <AudioPlayer audioBlob={audioBlob} name={name} voiceName={voices.find(v => v.id === selectedVoice)?.name} isGenerating={isGenerating} genProgress={genProgress} onGenerate={handleGenerate} />
                {genError && (
                  <div style={{ marginTop: "16px", padding: "14px 20px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span>{genError}</span>
                    {genError.includes("API key") && <button onClick={() => setShowApiPanel(true)} style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(239,68,68,0.2)", border: "none", color: "#fca5a5", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Set Key</button>}
                  </div>
                )}
                <GlassCard style={{ marginTop: "20px", padding: "20px" }}>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Session Details</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
                    <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Voice: </span>{voices.find(v => v.id === selectedVoice)?.name}</div>
                    <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Focus: </span>{MAIN_SYMPTOMS.find(s => s.id === mainSymptom)?.label}</div>
                    <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Full Length: </span>~20 minutes</div>
                    {safePlace && <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Safe Space: </span>{SAFE_PLACE_OPTIONS.find(o => o.id === safePlace)?.label}</div>}
                  </div>
                  <div style={{ marginTop: "12px" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Addressing: </span>
                    <span style={{ fontSize: "14px" }}>{subSymptoms.join(", ")}</span>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* NAV BUTTONS */}
            <div style={{ display: "flex", justifyContent: step > 0 ? "space-between" : "flex-end", marginTop: "48px", gap: "16px" }}>
              {step > 0 && <button onClick={() => { setStep(s => s - 1); if (step === 6) setAudioBlob(null); }} style={{ padding: "14px 32px", borderRadius: "14px", cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#A8C5AE", fontSize: "15px", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>{step === 6 ? "Edit Choices" : "\u2190 Back"}</button>}
              {step < 6 ? (
                <button disabled={!canProceed()} onClick={() => setStep(s => s + 1)} style={{
                  padding: "14px 40px", borderRadius: "14px", cursor: canProceed() ? "pointer" : "not-allowed",
                  background: canProceed() ? "linear-gradient(135deg, #7C9A82, #4A6B50)" : "rgba(255,255,255,0.06)",
                  border: "none", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                  opacity: canProceed() ? 1 : 0.4, boxShadow: canProceed() ? "0 4px 20px rgba(124,154,130,0.4)" : "none",
                }}>Continue \u2192</button>
              ) : (
                <button onClick={() => setShowPayment(true)} disabled={!audioBlob} style={{
                  padding: "14px 40px", borderRadius: "14px", cursor: audioBlob ? "pointer" : "not-allowed",
                  background: audioBlob ? "linear-gradient(135deg, #7C9A82, #C4A882)" : "rgba(255,255,255,0.1)",
                  border: "none", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                  opacity: audioBlob ? 1 : 0.4, boxShadow: audioBlob ? "0 4px 30px rgba(124,154,130,0.5)" : "none",
                }}>Download Full Session \u2192</button>
              )}
            </div>
          </>
        )}

        {/* ═══ PAYMENT ═══ */}
        {activePage === "create" && showPayment && !paymentComplete && (
          <div style={{ animation: "fadeUp 0.6s ease", maxWidth: "500px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Download Your Full Session</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>One-time payment. Lifetime access to your personalized hypnosis.</p>
            </div>
            <GlassCard style={{ padding: "32px" }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <div style={{ fontSize: "48px", fontWeight: 800, color: "#A8C5AE", fontFamily: "'Quicksand', sans-serif", marginBottom: "4px" }}>$8</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>One-time payment</div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", marginBottom: "20px" }}>
                {[
                  "Full 20-minute personalized session",
                  "High-quality MP3 download",
                  "Lifetime access — download anytime",
                  "AI voice by ElevenLabs",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                    <span style={{ color: "#7C9A82", fontSize: "16px" }}>&#10003;</span>
                    {item}
                  </div>
                ))}
              </div>
              <button onClick={handlePayment} disabled={paymentProcessing} style={{
                width: "100%", padding: "16px", borderRadius: "14px", cursor: paymentProcessing ? "wait" : "pointer",
                background: paymentProcessing ? "rgba(124,154,130,0.3)" : "linear-gradient(135deg, #7C9A82, #C4A882)",
                border: "none", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                boxShadow: "0 4px 30px rgba(124,154,130,0.4)",
              }}>{paymentProcessing ? "Processing..." : "Pay $8 & Download MP3"}</button>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Secured by</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(124,154,130,0.6)" }}>Stripe</span>
              </div>
              <p style={{ textAlign: "center", fontSize: "11px", color: "rgba(255,255,255,0.25)", marginTop: "12px" }}>Stripe checkout will be configured soon. This is a preview of the payment flow.</p>
            </GlassCard>
            <button onClick={() => setShowPayment(false)} style={{ display: "block", margin: "20px auto 0", padding: "10px 24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "14px", fontFamily: "'Quicksand', sans-serif" }}>&#8592; Back to preview</button>
          </div>
        )}

        {/* ═══ PAYMENT SUCCESS ═══ */}
        {activePage === "create" && paymentComplete && (
          <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease", paddingTop: "60px" }}>
            <div style={{ width: "100px", height: "100px", borderRadius: "50%", margin: "0 auto 32px", background: "linear-gradient(135deg, #22c55e, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", boxShadow: "0 0 60px rgba(34,197,94,0.3)" }}>✓</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 600, marginBottom: "12px" }}>Thank you, {name}!</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", maxWidth: "400px", margin: "0 auto 32px" }}>Your personalized self-hypnosis session is ready.</p>
            <GlassCard style={{ display: "inline-block", padding: "20px 40px" }}>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>Your session</div>
              <div style={{ fontSize: "18px", fontWeight: 600 }}>{MAIN_SYMPTOMS.find(s => s.id === mainSymptom)?.label}</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>{subSymptoms.length} focus areas • {voices.find(v => v.id === selectedVoice)?.name} • ~20 min</div>
            </GlassCard>
            <div style={{ marginTop: "40px" }}>
              <button onClick={() => { setStep(0); setShowPayment(false); setPaymentComplete(false); setSubSymptoms([]); setMainSymptom(null); setTrigger(""); setSafePlace(""); setBodyCue1(""); setBodyCue2(""); setAudioBlob(null); }} style={{
                padding: "14px 32px", borderRadius: "14px", cursor: "pointer",
                background: "linear-gradient(135deg, #7C9A82, #4A6B50)", border: "none",
                color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
              }}>Create Another Session</button>
            </div>
          </div>
        )}

        {/* ═══ PREMIUM LIBRARY ═══ */}
        {activePage === "premium" && !premiumCart && (
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 600, marginBottom: "12px" }}>Premium Hypnosis Library</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>Professional sessions crafted by certified hypnotherapists.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {PREMIUM_TRACKS.map(track => (
                <GlassCard key={track.id} style={{ padding: "0", overflow: "hidden" }}>
                  <div style={{ height: "120px", background: "linear-gradient(135deg, " + track.color + "33, " + track.color + "11)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", borderBottom: "1px solid " + track.color + "22" }}>{track.icon}</div>
                  <div style={{ padding: "24px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, marginBottom: "6px" }}>{track.title}</h3>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "4px" }}>by {track.therapist}</div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", marginBottom: "20px" }}>{track.duration} • Studio Quality MP3</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "24px", fontWeight: 700, color: "#A8C5AE" }}>${track.price}</span>
                      <button onClick={() => setPremiumCart(track)} style={{ padding: "10px 24px", borderRadius: "12px", border: "none", cursor: "pointer", background: "linear-gradient(135deg, " + track.color + ", " + track.color + "cc)", color: "#fff", fontSize: "13px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif" }}>Purchase</button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {activePage === "premium" && premiumCart && (
          <div style={{ animation: "fadeUp 0.6s ease", maxWidth: "500px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600 }}>Complete Your Purchase</h2>
            </div>
            <GlassCard style={{ padding: "32px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "14px", flexShrink: 0, background: "linear-gradient(135deg, " + premiumCart.color + "44, " + premiumCart.color + "22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>{premiumCart.icon}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>{premiumCart.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>by {premiumCart.therapist} • {premiumCart.duration}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: "24px", fontWeight: 700, color: "#A8C5AE", flexShrink: 0 }}>${premiumCart.price}</div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <input placeholder="Email address" style={{ ...IS, marginBottom: "10px" }} />
                <input placeholder="Card number" style={{ ...IS, marginBottom: "10px" }} />
                <div style={{ display: "flex", gap: "10px" }}>
                  <input placeholder="MM / YY" style={IS} />
                  <input placeholder="CVC" style={IS} />
                </div>
              </div>
              <button onClick={() => setPremiumCart(null)} style={{
                width: "100%", padding: "16px", borderRadius: "14px", cursor: "pointer",
                background: "linear-gradient(135deg, " + premiumCart.color + ", " + premiumCart.color + "cc)",
                border: "none", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                boxShadow: "0 4px 30px " + premiumCart.color + "44",
              }}>Pay ${premiumCart.price} & Download</button>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Secured by</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(124,154,130,0.6)" }}>Stripe</span>
              </div>
            </GlassCard>
            <button onClick={() => setPremiumCart(null)} style={{ display: "block", margin: "20px auto 0", padding: "10px 24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "14px", fontFamily: "'Quicksand', sans-serif" }}>← Back to library</button>
          </div>
        )}
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "11px", position: "relative", zIndex: 1, lineHeight: 1.6 }}>
        <div style={{ marginBottom: "6px", fontFamily: "'Playfair Display', serif", fontSize: "15px", color: "rgba(255,255,255,0.3)" }}>Mind Refuge</div>
        <div style={{ maxWidth: "500px", margin: "0 auto 6px" }}>Mind Refuge is a wellness tool, not a substitute for professional medical or psychological treatment. If you have ADHD or suspect you do, please consult a licensed healthcare provider.</div>
        <div>© 2026 Mind Refuge. All rights reserved.</div>
      </footer>

      <style>{
        "@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}" +
        "input::placeholder{color:rgba(255,255,255,0.25)}" +
        "::-webkit-scrollbar{width:6px}" +
        "::-webkit-scrollbar-track{background:transparent}" +
        "::-webkit-scrollbar-thumb{background:rgba(124,154,130,0.3);border-radius:3px}" +
        "*{margin:0;padding:0;box-sizing:border-box}"
      }</style>
    </div>
  );
}
