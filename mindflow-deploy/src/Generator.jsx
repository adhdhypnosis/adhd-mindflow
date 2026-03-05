import { useState, useEffect, useRef, useCallback } from "react";

const MAIN_SYMPTOMS = [
  { id: "emotional", label: "Emotional Dysregulation", icon: "🌊", color: "#8b5cf6" },
  { id: "focus", label: "Inattention & Focus", icon: "🔍", color: "#6366f1" },
  { id: "executive", label: "Executive Dysfunction", icon: "🧩", color: "#a78bfa" },
  { id: "hyperactivity", label: "Hyperactivity & Restlessness", icon: "⚡", color: "#7c3aed" },
  { id: "time", label: "Time Blindness", icon: "⏳", color: "#818cf8" },
  { id: "memory", label: "Memory Issues", icon: "💭", color: "#c084fc" },
  { id: "sleep", label: "Sleep Difficulties", icon: "🌙", color: "#a5b4fc" },
  { id: "social", label: "Social Challenges", icon: "🤝", color: "#e879f9" },
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
    }));
  } catch (e) {
    return null;
  }
}

const PREMIUM_TRACKS = [
  { id: "p1", title: "Soothe Stress & Anxiety", therapist: "Dr. Sarah Mitchell", duration: "22 min", price: 20, color: "#7ecec1", icon: "🍃" },
  { id: "p2", title: "Boost Self-Esteem", therapist: "James Harlow, CHt", duration: "25 min", price: 20, color: "#d4a574", icon: "✨" },
  { id: "p3", title: "Deep Focus Flow State", therapist: "Dr. Sarah Mitchell", duration: "20 min", price: 20, color: "#8b5cf6", icon: "🎯" },
  { id: "p4", title: "Calm the Inner Storm", therapist: "Lena Vasquez, CHt", duration: "28 min", price: 20, color: "#e879f9", icon: "🌊" },
  { id: "p5", title: "Restful Sleep Journey", therapist: "James Harlow, CHt", duration: "30 min", price: 20, color: "#6366f1", icon: "🌙" },
  { id: "p6", title: "Overcome Procrastination", therapist: "Lena Vasquez, CHt", duration: "18 min", price: 20, color: "#f59e0b", icon: "🚀" },
];

function generateScript(name, mainSymptom, subSymptoms, full) {
  const symptomLabel = MAIN_SYMPTOMS.find(s => s.id === mainSymptom)?.label || "";
  const subList = subSymptoms.join(", ").toLowerCase();
  const fn = name || "friend";
  const intro = "Welcome, " + fn + ". This is your personal self-hypnosis session, designed specifically for you. Find a comfortable position, and when you are ready, gently close your eyes.\n\nTake a deep, slow breath in through your nose. Hold it for a moment. And release it slowly through your mouth. Good. Again, breathe in calm, breathe out tension. One more time, breathe in peace, breathe out everything that no longer serves you.\n\nWith each breath, you feel your body becoming heavier, more relaxed. Your shoulders drop. Your jaw unclenches. The space between your thoughts grows wider and quieter.";
  const induction = "\n\nNow, " + fn + ", imagine yourself standing at the top of a beautiful staircase. There are ten steps leading down to a place of deep inner peace. With each step, you go deeper into relaxation.\n\nTen, feeling calm and safe. Nine, your body grows heavier. Eight, thoughts drifting away like clouds. Seven, deeper still. Six, a warm wave of comfort washes over you. Five, halfway down, so deeply relaxed. Four, peaceful and still. Three, almost there. Two, so deep, so calm. One, you have arrived at your place of perfect peace.";
  const symptomWork = "\n\nYou are here to work with your experience of " + symptomLabel.toLowerCase() + ", " + fn + ". Specifically, the way " + subList + " have been showing up in your life. And that is okay. You are not broken. Your mind simply works differently, and today, you are giving it exactly what it needs.\n\nImagine each of these challenges as a knot in a golden thread. One by one, you reach out and gently untie them. Each knot releases easily, smoothly. Where there was tension, there is now flow. Where there was struggle, there is now ease.\n\n" + fn + ", repeat silently after me: I am capable. I am enough. My mind is my greatest ally. I release what I cannot control, and I embrace my unique way of experiencing the world.";
  const deepening = "\n\nGoing deeper now. Feel a warm golden light beginning at the crown of your head, slowly flowing down through your body. It fills every cell with calm confidence. This light knows exactly where to go. It finds the places that have been holding tension around " + subList + ", and it dissolves that tension completely.\n\nYou are rewiring. You are healing. Not by force, but by gentle permission. Your subconscious mind is listening, absorbing every positive suggestion, making it a permanent part of who you are.\n\n" + fn + ", you are becoming the version of yourself who handles " + symptomLabel.toLowerCase() + " with grace and self-compassion. This version of you already exists. You are simply stepping into them now.";
  const emergence = "\n\nIn a moment, I will count from one to five, and with each number, you will return to full waking awareness, feeling refreshed, empowered, and deeply at peace.\n\nOne, beginning to return, feeling the suggestions taking root. Two, awareness growing, body feeling light and energized. Three, almost there, a smile forming on your lips. Four, eyes ready to open, feeling wonderful. Five, eyes open, fully awake, fully present, carrying this peace with you throughout your day.\n\nWell done, " + fn + ". This session is yours to return to whenever you need it.";
  if (full) return intro + induction + symptomWork + deepening + emergence;
  return intro;
}

async function generateSpeech(text, voiceId, apiKey, onProgress) {
  onProgress("Connecting to ElevenLabs...");
  const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/" + voiceId, {
    method: "POST",
    headers: { "Content-Type": "application/json", "xi-api-key": apiKey },
    body: JSON.stringify({
      text: text,
      model_id: "eleven_monolingual_v1",
      voice_settings: { stability: 0.75, similarity_boost: 0.75, style: 0.35, use_speaker_boost: true },
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error("Invalid API key. Check your ElevenLabs key.");
    if (response.status === 429) throw new Error("Rate limit reached. Wait a moment and try again.");
    throw new Error(err.detail?.message || "ElevenLabs error (" + response.status + ")");
  }
  onProgress("Generating audio...");
  const blob = await response.blob();
  onProgress("Audio ready!");
  return blob;
}

function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%",
          background: "radial-gradient(circle, " + ["rgba(139,92,246,0.15)","rgba(168,85,247,0.12)","rgba(99,102,241,0.1)","rgba(126,206,193,0.12)","rgba(212,165,116,0.1)","rgba(232,121,249,0.1)"][i] + ", transparent)",
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
          background: i <= step ? "linear-gradient(90deg, #8b5cf6, #e879f9)" : "rgba(255,255,255,0.15)",
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
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", margin: "0 auto 16px", border: "3px solid rgba(139,92,246,0.2)", borderTopColor: "#8b5cf6", animation: "spin 1s linear infinite" }} />
            <style>{"@keyframes spin{to{transform:rotate(360deg)}}"}</style>
            <div style={{ color: "#c4b5fd", fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>{genProgress || "Generating..."}</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px" }}>This may take 15-30 seconds</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.7 }}>🎧</div>
            <div style={{ color: "#e2d9f3", fontSize: "18px", fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>Ready to generate your preview</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "24px" }}>We will create a ~2 min audio preview using ElevenLabs AI</div>
            <button onClick={onGenerate} style={{
              padding: "14px 40px", borderRadius: "14px", cursor: "pointer",
              background: "linear-gradient(135deg, #8b5cf6, #e879f9)", border: "none",
              color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
              boxShadow: "0 4px 30px rgba(139,92,246,0.4)",
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
          background: "linear-gradient(135deg, #8b5cf6, #e879f9)", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 30px rgba(139,92,246,0.4)",
        }}>
          <span style={{ fontSize: "24px", color: "#fff", marginLeft: playing ? "0" : "4px" }}>{playing ? "⏸" : "▶"}</span>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#e2d9f3", fontSize: "18px", fontFamily: "'Playfair Display', serif", marginBottom: "4px" }}>Self-Hypnosis Preview</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>Personalized for {name || "you"} • {voiceName}</div>
        </div>
      </div>
      <div style={{ position: "relative", height: "40px", display: "flex", alignItems: "center", gap: "2px", marginBottom: "8px" }}>
        {[...Array(60)].map((_, i) => {
          const h = 8 + Math.sin(i * 0.5) * 12 + Math.cos(i * 0.3) * 8 + Math.sin(i * 1.2) * 6;
          const filled = (i / 60) * 100 <= progress;
          return <div key={i} style={{ flex: 1, height: h + "px", borderRadius: "2px", background: filled ? "linear-gradient(180deg, #8b5cf6, #e879f9)" : "rgba(255,255,255,0.1)", transition: "background 0.15s" }} />;
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
            style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#e8e0f0", fontSize: "14px", fontFamily: "monospace", outline: "none", boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
        </div>
        {testResult && (
          <div style={{ padding: "12px 16px", borderRadius: "10px", marginBottom: "16px", fontSize: "13px", background: testResult.ok ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", border: "1px solid " + (testResult.ok ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"), color: testResult.ok ? "#86efac" : "#fca5a5" }}>{testResult.msg}</div>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={testKey} disabled={testing || !tempKey.trim()} style={{ flex: 1, padding: "12px", borderRadius: "12px", cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#c4b5fd", fontSize: "14px", fontWeight: 600, fontFamily: "'Quicksand', sans-serif", opacity: (testing || !tempKey.trim()) ? 0.4 : 1 }}>{testing ? "Testing..." : "Test Connection"}</button>
          <button onClick={() => { setApiKey(tempKey.trim()); onClose(); }} disabled={!tempKey.trim()} style={{ flex: 1, padding: "12px", borderRadius: "12px", cursor: "pointer", background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", border: "none", color: "#fff", fontSize: "14px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif", opacity: !tempKey.trim() ? 0.4 : 1 }}>Save Key</button>
        </div>
        <div style={{ marginTop: "20px", padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "8px", fontWeight: 600 }}>How to get your key:</div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
            1. Go to <span style={{ color: "#c4b5fd" }}>elevenlabs.io</span> and create a free account<br />
            2. Click your profile icon then Profile + API key<br />
            3. Copy the key (starts with sk_) and paste it above<br />
            <span style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic" }}>Free tier: ~10,000 characters/month (5-6 sessions)</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

const IS = { width: "100%", padding: "14px 16px", borderRadius: "12px", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8e0f0", fontSize: "15px", fontFamily: "'Quicksand', sans-serif", outline: "none" };

export default function Generator({ onBack }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [mainSymptom, setMainSymptom] = useState(null);
  const [subSymptoms, setSubSymptoms] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [donationAmount, setDonationAmount] = useState(4);
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
    const previewScript = generateScript(name, mainSymptom, subSymptoms, false);
    setIsGenerating(true); setGenError(null); setAudioBlob(null);
    try {
      const blob = await generateSpeech(previewScript, voice.elevenId, apiKey, setGenProgress);
      setAudioBlob(blob);
    } catch (err) { setGenError(err.message); }
    setIsGenerating(false);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => { setPaymentProcessing(false); setPaymentComplete(true); }, 2500);
  };

  const canProceed = () => {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return mainSymptom !== null;
    if (step === 2) return subSymptoms.length > 0;
    if (step === 3) return selectedVoice !== null;
    return true;
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0a1a 0%, #1a1033 30%, #120e24 60%, #0d0b1a 100%)", color: "#e8e0f0", fontFamily: "'Quicksand', 'Segoe UI', sans-serif", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <FloatingOrbs />
      {showApiPanel && <ApiKeyPanel apiKey={apiKey} setApiKey={setApiKey} onClose={() => setShowApiPanel(false)} />}

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(15,10,26,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={onBack}>
          <div style={{ width: "36px", height: "36px", borderRadius: "12px", background: "linear-gradient(135deg, #8b5cf6, #e879f9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🧠</div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600 }}>Mind Refuge</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          {[{ key: "create", label: "Create Session" }, { key: "premium", label: "Premium Library" }].map(tab => (
            <button key={tab.key} onClick={() => { setActivePage(tab.key); if (tab.key === "create") { setStep(0); setShowPayment(false); setPaymentComplete(false); } }}
              style={{ padding: "8px 20px", borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600, fontFamily: "'Quicksand', sans-serif", background: activePage === tab.key ? "rgba(139,92,246,0.25)" : "transparent", color: activePage === tab.key ? "#c4b5fd" : "rgba(255,255,255,0.5)", transition: "all 0.3s" }}>{tab.label}</button>
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
        {/* DISCLAIMER */}
        <div style={{ background: "rgba(212,165,116,0.08)", border: "1px solid rgba(212,165,116,0.2)", borderRadius: "12px", padding: "12px 16px", marginBottom: "32px", fontSize: "12px", color: "rgba(212,165,116,0.8)", lineHeight: 1.6 }}>
          ⚕️ <strong>Disclaimer:</strong> Mind Refuge is a wellness tool, not a substitute for professional medical or psychological treatment. If you have ADHD or suspect you do, please consult a licensed healthcare provider.
        </div>

        {/* ═══ CREATE SESSION ═══ */}
        {activePage === "create" && !showPayment && !paymentComplete && (
          <>
            <ProgressBar step={step} total={5} />

            {step === 0 && (
              <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease" }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, marginBottom: "12px", background: "linear-gradient(135deg, #c4b5fd, #e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Journey Begins Here</h1>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "17px", maxWidth: "500px", margin: "0 auto 48px" }}>Create a self-hypnosis session tailored to your unique mind.</p>
                <div style={{ maxWidth: "400px", margin: "0 auto" }}>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "2px" }}>What is your first name?</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name..."
                    style={{ ...IS, fontSize: "20px", textAlign: "center", padding: "18px 24px", borderRadius: "16px" }}
                    onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", marginTop: "12px" }}>Your name will be woven into the hypnosis script for deeper personalization.</p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Hi {name} — what is your main challenge?</h2>
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

            {step === 2 && mainSymptom && (
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
                        background: sel ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.04)",
                        border: sel ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
                        display: "flex", alignItems: "center", gap: "12px", transition: "all 0.25s",
                      }}>
                        <div style={{
                          width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                          border: sel ? "none" : "2px solid rgba(255,255,255,0.2)",
                          background: sel ? "linear-gradient(135deg, #8b5cf6, #e879f9)" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "#fff",
                        }}>{sel && "✓"}</div>
                        <span style={{ fontSize: "14px", fontWeight: sel ? 600 : 400 }}>{sub}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Choose your guide's voice</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>
                    Powered by ElevenLabs AI — studio-quality voices.
                    {!apiKey && <span style={{ color: "#fca5a5" }}> Set your API key first using the button above to load voices.</span>}
                    {voicesLoading && <span style={{ color: "#c4b5fd" }}> Loading your available voices...</span>}
                  </p>
                </div>
                {voicesLoading ? (
                  <div style={{ textAlign: "center", padding: "40px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", margin: "0 auto 16px", border: "3px solid rgba(139,92,246,0.2)", borderTopColor: "#8b5cf6", animation: "spin 1s linear infinite" }} />
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
                        border: active ? "2px solid #8b5cf6" : "1px solid rgba(255,255,255,0.08)",
                        background: active ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                      }}>
                        <div style={{ width: "52px", height: "52px", borderRadius: "50%", margin: "0 auto 12px", background: active ? "linear-gradient(135deg, #8b5cf6, #e879f9)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{v.gender === "female" ? "♀" : "♂"}</div>
                        <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "2px" }}>{v.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "8px" }}>{v.desc}</div>
                        <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "6px", background: "rgba(139,92,246,0.15)", fontSize: "10px", fontWeight: 700, color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "1px" }}>{v.tag}</span>
                      </GlassCard>
                    );
                  })}
                </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div style={{ animation: "fadeUp 0.6s ease" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Your Session Preview</h2>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>Generate and listen to a preview of your personalized session.</p>
                </div>
                <AudioPlayer audioBlob={audioBlob} name={name} voiceName={voices.find(v => v.id === selectedVoice)?.name} isGenerating={isGenerating} genProgress={genProgress} onGenerate={handleGenerate} />
                {genError && (
                  <div style={{ marginTop: "16px", padding: "14px 20px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5", fontSize: "13px", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span>⚠ {genError}</span>
                    {genError.includes("API key") && <button onClick={() => setShowApiPanel(true)} style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(239,68,68,0.2)", border: "none", color: "#fca5a5", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Set Key</button>}
                  </div>
                )}
                <GlassCard style={{ marginTop: "20px", padding: "20px" }}>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Session Details</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
                    <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Name: </span>{name}</div>
                    <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Voice: </span>{voices.find(v => v.id === selectedVoice)?.name}</div>
                    <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Focus: </span>{MAIN_SYMPTOMS.find(s => s.id === mainSymptom)?.label}</div>
                    <div><span style={{ color: "rgba(255,255,255,0.4)" }}>Full Length: </span>~20 minutes</div>
                  </div>
                  <div style={{ marginTop: "12px" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Addressing: </span>
                    <span style={{ fontSize: "14px" }}>{subSymptoms.join(", ")}</span>
                  </div>
                </GlassCard>
                <GlassCard style={{ marginTop: "20px", padding: "20px", background: "rgba(139,92,246,0.08)" }}>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Script Preview</div>
                  <div style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", whiteSpace: "pre-wrap", maxHeight: "200px", overflow: "auto" }}>{generateScript(name, mainSymptom, subSymptoms, false)}</div>
                </GlassCard>
              </div>
            )}

            {/* NAV BUTTONS */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px", gap: "16px" }}>
              {step > 0 && <button onClick={() => { setStep(s => s - 1); setAudioBlob(null); }} style={{ padding: "14px 32px", borderRadius: "14px", cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#c4b5fd", fontSize: "15px", fontWeight: 600, fontFamily: "'Quicksand', sans-serif" }}>← Back</button>}
              <div style={{ flex: 1 }} />
              {step < 4 ? (
                <button disabled={!canProceed()} onClick={() => setStep(s => s + 1)} style={{
                  padding: "14px 40px", borderRadius: "14px", cursor: canProceed() ? "pointer" : "not-allowed",
                  background: canProceed() ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "rgba(255,255,255,0.06)",
                  border: "none", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                  opacity: canProceed() ? 1 : 0.4, boxShadow: canProceed() ? "0 4px 20px rgba(139,92,246,0.4)" : "none",
                }}>Continue →</button>
              ) : (
                <button onClick={() => setShowPayment(true)} disabled={!audioBlob} style={{
                  padding: "14px 40px", borderRadius: "14px", cursor: audioBlob ? "pointer" : "not-allowed",
                  background: audioBlob ? "linear-gradient(135deg, #8b5cf6, #e879f9)" : "rgba(255,255,255,0.1)",
                  border: "none", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                  opacity: audioBlob ? 1 : 0.4, boxShadow: audioBlob ? "0 4px 30px rgba(139,92,246,0.5)" : "none",
                }}>Download Full Session →</button>
              )}
            </div>
          </>
        )}

        {/* ═══ PAYMENT ═══ */}
        {activePage === "create" && showPayment && !paymentComplete && (
          <div style={{ animation: "fadeUp 0.6s ease", maxWidth: "500px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 600, marginBottom: "8px" }}>Download Your Session</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>Mind Refuge is donation-based. Pay what feels right — minimum $4.</p>
            </div>
            <GlassCard style={{ padding: "32px" }}>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Choose your contribution</label>
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                  {[4, 8, 12, 20].map(amt => (
                    <button key={amt} onClick={() => setDonationAmount(amt)} style={{
                      flex: 1, padding: "14px 8px", borderRadius: "12px", cursor: "pointer",
                      background: donationAmount === amt ? "linear-gradient(135deg, #8b5cf6, #7c3aed)" : "rgba(255,255,255,0.05)",
                      border: donationAmount === amt ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: "#fff", fontSize: "18px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                    }}>${amt}</button>
                  ))}
                </div>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", fontSize: "18px" }}>$</span>
                  <input type="number" min="4" value={donationAmount} onChange={e => setDonationAmount(Math.max(4, parseInt(e.target.value) || 4))} style={{ ...IS, fontSize: "18px", paddingLeft: "32px" }} />
                </div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px", marginBottom: "24px" }}>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "12px" }}>Card Details</div>
                <input placeholder="Card number" style={{ ...IS, marginBottom: "10px" }} />
                <div style={{ display: "flex", gap: "10px" }}>
                  <input placeholder="MM / YY" style={IS} />
                  <input placeholder="CVC" style={IS} />
                </div>
              </div>
              <button onClick={handlePayment} disabled={paymentProcessing} style={{
                width: "100%", padding: "16px", borderRadius: "14px", cursor: paymentProcessing ? "wait" : "pointer",
                background: paymentProcessing ? "rgba(139,92,246,0.3)" : "linear-gradient(135deg, #8b5cf6, #e879f9)",
                border: "none", color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "'Quicksand', sans-serif",
                boxShadow: "0 4px 30px rgba(139,92,246,0.4)",
              }}>{paymentProcessing ? "Processing..." : "Pay $" + donationAmount + " & Download MP3"}</button>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Secured by</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(139,92,246,0.6)" }}>Stripe</span>
              </div>
            </GlassCard>
            <button onClick={() => setShowPayment(false)} style={{ display: "block", margin: "20px auto 0", padding: "10px 24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "14px", fontFamily: "'Quicksand', sans-serif" }}>← Back to preview</button>
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
              <button onClick={() => { setStep(0); setShowPayment(false); setPaymentComplete(false); setSubSymptoms([]); setMainSymptom(null); setAudioBlob(null); }} style={{
                padding: "14px 32px", borderRadius: "14px", cursor: "pointer",
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", border: "none",
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
                      <span style={{ fontSize: "24px", fontWeight: 700, color: "#c4b5fd" }}>${track.price}</span>
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
                <div style={{ marginLeft: "auto", fontSize: "24px", fontWeight: 700, color: "#c4b5fd", flexShrink: 0 }}>${premiumCart.price}</div>
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
                <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(139,92,246,0.6)" }}>Stripe</span>
              </div>
            </GlassCard>
            <button onClick={() => setPremiumCart(null)} style={{ display: "block", margin: "20px auto 0", padding: "10px 24px", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "14px", fontFamily: "'Quicksand', sans-serif" }}>← Back to library</button>
          </div>
        )}
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "12px", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "8px", fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "rgba(255,255,255,0.35)" }}>Mind Refuge</div>
        <div>Self-hypnosis wellness tool — not a substitute for professional care.</div>
        <div style={{ marginTop: "4px" }}>© 2026 Mind Refuge. All rights reserved.</div>
      </footer>

      <style>{
        "@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}" +
        "input::placeholder{color:rgba(255,255,255,0.25)}" +
        "::-webkit-scrollbar{width:6px}" +
        "::-webkit-scrollbar-track{background:transparent}" +
        "::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.3);border-radius:3px}" +
        "*{margin:0;padding:0;box-sizing:border-box}"
      }</style>
    </div>
  );
}
