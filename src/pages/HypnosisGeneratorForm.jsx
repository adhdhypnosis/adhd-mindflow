import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { hypnosisScript, prepareScript } from "../data/hypnosisScript.js";
import GeneratingView from "../components/hypnosis/GeneratingView.jsx";
import PlayerView from "../components/hypnosis/PlayerView.jsx";

const SAGE = "#7C9A82";
const SAGE_LIGHT = "#A8C5AE";
const SAGE_PALE = "#E8F0EA";
const SAGE_DEEP = "#4A6B50";
const WARM = "#C4A882";
const WARM_LIGHT = "#F5EDE3";
const TEXT_DARK = "#2D3436";
const TEXT_MID = "#555E60";
const TEXT_LIGHT = "#7B8789";
const BG = "#FAFBF9";
const WHITE = "#FFFFFF";

const FOCUS_OPTIONS = [
  { id: "emotional overwhelm", label: "Emotional Overwhelm", icon: "\uD83C\uDF0A" },
  { id: "rumination", label: "Rumination", icon: "\uD83D\uDD04" },
  { id: "task paralysis", label: "Task Paralysis", icon: "\u26A0\uFE0F" },
  { id: "rejection sensitivity", label: "Rejection Sensitivity", icon: "\uD83D\uDC94" },
  { id: "sensory overload", label: "Sensory Overload", icon: "\uD83D\uDD0A" },
  { id: "sleep anxiety", label: "Sleep Anxiety", icon: "\uD83C\uDF19" },
  { id: "social anxiety", label: "Social Anxiety", icon: "\uD83D\uDE36" },
  { id: "performance anxiety", label: "Performance Anxiety", icon: "\uD83C\uDFAF" },
  { id: "time pressure stress", label: "Time Pressure Stress", icon: "\u23F3" },
];

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

const MUSIC_OPTIONS = [
  { id: "ambient-pads", label: "Ambient Pads", icon: "\uD83C\uDFB6", isDefault: true },
  { id: "nature-soundscape", label: "Nature Soundscape", icon: "\uD83C\uDF3F" },
  { id: "piano-minimal", label: "Piano Minimal", icon: "\uD83C\uDFB9" },
  { id: "lofi-calm", label: "Lo-fi Calm", icon: "\uD83C\uDFA7" },
  { id: "binaural-style", label: "Binaural Style", icon: "\uD83E\uDDE0" },
  { id: "no-music", label: "No Music", icon: "\uD83D\uDD07" },
];

function TileSelector({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
      {options.map(opt => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            style={{
              padding: "16px 20px",
              borderRadius: 16,
              border: `2px solid ${selected ? SAGE : "#E8ECEA"}`,
              background: selected ? SAGE_PALE : WHITE,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              minWidth: 120,
              transition: "all 0.2s ease",
              transform: selected ? "scale(1.02)" : "scale(1)",
              boxShadow: selected ? `0 4px 20px ${SAGE}20` : "none",
            }}
          >
            <span style={{ fontSize: 28 }}>{opt.icon}</span>
            <span style={{
              fontSize: 13, fontWeight: selected ? 600 : 500,
              color: selected ? SAGE_DEEP : TEXT_MID,
              fontFamily: "'Poppins', sans-serif",
            }}>{opt.label}</span>
            {opt.isDefault && (
              <span style={{ fontSize: 10, color: TEXT_LIGHT, fontStyle: "italic" }}>default</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function TextInput({ label, placeholder, value, onChange, required }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <label style={{
          display: "block", fontSize: 14, fontWeight: 500, color: TEXT_DARK,
          marginBottom: 8, fontFamily: "'Poppins', sans-serif",
        }}>
          {label}
          {required && <span style={{ color: "#D9534F", marginLeft: 4 }}>*</span>}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: 12,
          border: `2px solid #E8ECEA`,
          fontSize: 15,
          fontFamily: "'Poppins', sans-serif",
          color: TEXT_DARK,
          background: WHITE,
          outline: "none",
          transition: "border-color 0.2s ease",
          boxSizing: "border-box",
        }}
        onFocus={e => e.target.style.borderColor = SAGE}
        onBlur={e => e.target.style.borderColor = "#E8ECEA"}
      />
    </div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i <= step ? SAGE : "#E8ECEA",
          transition: "background 0.3s ease",
        }} />
      ))}
    </div>
  );
}

// Create silence as a WAV-compatible AudioBuffer
function createSilenceBuffer(audioCtx, durationSeconds) {
  const sampleRate = audioCtx.sampleRate;
  const numSamples = Math.floor(sampleRate * durationSeconds);
  return audioCtx.createBuffer(1, numSamples, sampleRate);
}

// Mix voice track on top of background track at specified volume levels
function mixAudioBuffers(audioCtx, voiceBuffer, bgBuffer, bgVolume) {
  const length = Math.max(voiceBuffer.length, bgBuffer ? bgBuffer.length : 0);
  const numChannels = Math.max(voiceBuffer.numberOfChannels, bgBuffer ? bgBuffer.numberOfChannels : 1);
  const mixed = audioCtx.createBuffer(numChannels, length, audioCtx.sampleRate);

  for (let ch = 0; ch < numChannels; ch++) {
    const output = mixed.getChannelData(ch);
    const voiceCh = ch < voiceBuffer.numberOfChannels ? voiceBuffer.getChannelData(ch) : voiceBuffer.getChannelData(0);
    const bgCh = bgBuffer ? (ch < bgBuffer.numberOfChannels ? bgBuffer.getChannelData(ch) : bgBuffer.getChannelData(0)) : null;

    for (let i = 0; i < length; i++) {
      let sample = 0;
      if (i < voiceBuffer.length) sample += voiceCh[i];
      if (bgCh && i < bgBuffer.length) sample += bgCh[i] * bgVolume;
      // Soft clip to prevent distortion
      output[i] = Math.max(-1, Math.min(1, sample));
    }
  }
  return mixed;
}

// Encode AudioBuffer to WAV blob
function audioBufferToWav(buffer) {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataLength = buffer.length * blockAlign;
  const headerLength = 44;
  const totalLength = headerLength + dataLength;

  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  function writeString(offset, str) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(0, 'RIFF');
  view.setUint32(4, totalLength - 8, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataLength, true);

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = buffer.getChannelData(ch)[i];
      const clamped = Math.max(-1, Math.min(1, sample));
      const intSample = clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

export default function HypnosisGeneratorForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    focus: "",
    trigger: "",
    bodyCue1: "",
    bodyCue2: "",
    safePlace: "",
    sensory1: "",
    sensory2: "",
    sensory3: "",
    music: "ambient-pads",
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState({ current: 0, total: 76, section: '' });
  const [genError, setGenError] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    document.title = "Build Your Self-Hypnosis | Mind Refuge";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const id = "generator-form-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
      @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; }
    `;
    document.head.appendChild(style);
  }, []);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!form.focus;
    if (step === 1) return form.trigger.trim().length > 0;
    return true;
  };

  const generateSession = useCallback(async () => {
    cancelRef.current = false;
    setIsGenerating(true);
    setGenError(null);
    setAudioUrl(null);
    setStep(5);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      // Prepare the script with user's form data
      const safePlaceLabel = form.safePlace
        ? SAFE_PLACE_OPTIONS.find(o => o.id === form.safePlace)?.label.toLowerCase() || form.safePlace
        : '';
      const scriptClips = prepareScript({
        focus: FOCUS_OPTIONS.find(o => o.id === form.focus)?.label.toLowerCase() || form.focus,
        trigger: form.trigger,
        bodyCue1: form.bodyCue1,
        bodyCue2: form.bodyCue2,
        safePlace: safePlaceLabel,
        sensory1: form.sensory1,
        sensory2: form.sensory2,
        sensory3: form.sensory3,
      });

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const clipBuffers = [];

      // Generate each clip via the API
      for (let i = 0; i < scriptClips.length; i++) {
        if (cancelRef.current) return;

        const clip = scriptClips[i];
        setGenProgress({ current: i + 1, total: scriptClips.length, section: clip.section });

        const response = await fetch('/api/generateClip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: clip.text }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || `Failed to generate clip ${clip.id}`);
        }

        const audioData = await response.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(audioData);
        clipBuffers.push({ buffer: audioBuffer, pauseAfter: clip.pauseAfter });
      }

      if (cancelRef.current) return;

      // Calculate total voice track length
      let totalLength = 0;
      for (const { buffer, pauseAfter } of clipBuffers) {
        totalLength += buffer.length + Math.floor(audioCtx.sampleRate * pauseAfter);
      }

      // Create stitched voice track
      const voiceTrack = audioCtx.createBuffer(1, totalLength, audioCtx.sampleRate);
      const voiceData = voiceTrack.getChannelData(0);
      let offset = 0;

      for (const { buffer, pauseAfter } of clipBuffers) {
        const clipData = buffer.getChannelData(0);
        voiceData.set(clipData, offset);
        offset += buffer.length;
        // Silence gap is already zeroed
        offset += Math.floor(audioCtx.sampleRate * pauseAfter);
      }

      // Load BB+ISO background track
      let bgBuffer = null;
      try {
        const bgResponse = await fetch('/images/bb-iso-track.mp3');
        if (bgResponse.ok) {
          const bgData = await bgResponse.arrayBuffer();
          bgBuffer = await audioCtx.decodeAudioData(bgData);
        }
      } catch {
        // Continue without background track if it fails to load
      }

      // Mix: voice at 100%, BB+ISO at ~18% (-15 dB)
      const bbIsoVolume = 0.18;
      const finalBuffer = mixAudioBuffers(audioCtx, voiceTrack, bgBuffer, bbIsoVolume);

      // Encode to WAV and create blob URL
      const wavBlob = audioBufferToWav(finalBuffer);
      const url = URL.createObjectURL(wavBlob);

      setAudioUrl(url);
      setIsGenerating(false);
      await audioCtx.close();
    } catch (err) {
      if (!cancelRef.current) {
        setGenError(err.message || 'An unexpected error occurred');
        setIsGenerating(false);
      }
    }
  }, [form]);

  const next = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      generateSession();
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const startOver = () => {
    cancelRef.current = true;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsGenerating(false);
    setGenError(null);
    setGenProgress({ current: 0, total: 76, section: '' });
    setStep(0);
    setForm({
      focus: "", trigger: "", bodyCue1: "", bodyCue2: "",
      safePlace: "", sensory1: "", sensory2: "", sensory3: "",
      music: "ambient-pads",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepTitles = [
    "Choose Your Focus",
    "Describe Your Trigger",
    "Your Body's Warning Signs",
    "Create Your Safe Place",
    "Background Music",
  ];

  const stepSubtitles = [
    "What pattern hits you hardest? Pick one.",
    'What situation triggers this pattern?',
    "How does your body signal that this pattern is activating? (Optional)",
    "Where does your mind go when it feels safe? (Optional)",
    "What should play underneath your session?",
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: TEXT_DARK, background: BG, minHeight: "100vh" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, background: `${BG}EE`,
        backdropFilter: "blur(16px)", borderBottom: "1px solid #E8ECEA", padding: "14px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: WHITE, fontSize: 15, fontWeight: 700,
            }}>M</div>
            <span style={{ fontSize: 17, fontWeight: 600, color: TEXT_DARK, letterSpacing: "-0.01em" }}>Mind Refuge</span>
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Step 5: Generating or Player */}
        {step === 5 ? (
          isGenerating || genError ? (
            <GeneratingView
              currentClip={genProgress.current}
              totalClips={genProgress.total}
              currentSection={genProgress.section}
              error={genError}
              onRetry={generateSession}
            />
          ) : audioUrl ? (
            <PlayerView audioUrl={audioUrl} onStartOver={startOver} />
          ) : null
        ) : (
          /* Steps 0-4: Form */
          <div style={{ animation: "fadeUp 0.5s ease both" }} key={step}>
            <ProgressBar step={step} total={5} />

            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{
                display: "inline-block", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase", color: SAGE,
                background: SAGE_PALE, padding: "7px 18px", borderRadius: 30,
                marginBottom: 16,
              }}>Step {step + 1} of 5</div>
              <h1 style={{
                fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 700,
                lineHeight: 1.25, letterSpacing: "-0.01em", marginBottom: 8,
              }}>{stepTitles[step]}</h1>
              <p style={{ fontSize: 15, color: TEXT_MID, lineHeight: 1.6 }}>{stepSubtitles[step]}</p>
            </div>

            {/* Step 0: Focus */}
            {step === 0 && (
              <TileSelector
                options={FOCUS_OPTIONS}
                value={form.focus}
                onChange={val => update("focus", val)}
              />
            )}

            {/* Step 1: Trigger */}
            {step === 1 && (
              <TextInput
                label="Describe the situation"
                placeholder='e.g. "When my boss gives me critical feedback..."'
                value={form.trigger}
                onChange={val => update("trigger", val)}
                required
              />
            )}

            {/* Step 2: Body cues */}
            {step === 2 && (
              <>
                <TextInput
                  label="First body signal"
                  placeholder="e.g. tight chest, racing heart"
                  value={form.bodyCue1}
                  onChange={val => update("bodyCue1", val)}
                />
                <TextInput
                  label="Second body signal"
                  placeholder="e.g. jaw clenching, shoulders rising"
                  value={form.bodyCue2}
                  onChange={val => update("bodyCue2", val)}
                />
                <p style={{ fontSize: 13, color: TEXT_LIGHT, textAlign: "center", marginTop: 8 }}>
                  Skip if unsure — we'll use common ADHD patterns as defaults.
                </p>
              </>
            )}

            {/* Step 3: Safe place */}
            {step === 3 && (
              <>
                <TileSelector
                  options={SAFE_PLACE_OPTIONS}
                  value={form.safePlace}
                  onChange={val => update("safePlace", form.safePlace === val ? "" : val)}
                />
                <div style={{ marginTop: 32 }}>
                  <TextInput
                    label="What do you hear there?"
                    placeholder="e.g. birds, rain on leaves, crackling fire"
                    value={form.sensory1}
                    onChange={val => update("sensory1", val)}
                  />
                  <TextInput
                    label="What do you feel?"
                    placeholder="e.g. warm breeze, soft blanket, cool grass"
                    value={form.sensory2}
                    onChange={val => update("sensory2", val)}
                  />
                  <TextInput
                    label="What do you smell or see?"
                    placeholder="e.g. pine trees, ocean mist, golden light"
                    value={form.sensory3}
                    onChange={val => update("sensory3", val)}
                  />
                </div>
              </>
            )}

            {/* Step 4: Music */}
            {step === 4 && (
              <TileSelector
                options={MUSIC_OPTIONS}
                value={form.music}
                onChange={val => update("music", val)}
              />
            )}

            {/* Navigation buttons */}
            <div style={{
              display: "flex", justifyContent: "space-between", marginTop: 48, gap: 16,
            }}>
              {step > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  style={{
                    padding: "14px 32px",
                    borderRadius: 60,
                    border: `2px solid ${SAGE}`,
                    background: "transparent",
                    color: SAGE_DEEP,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.2s ease",
                  }}
                >Back</button>
              ) : <div />}

              <button
                type="button"
                onClick={next}
                disabled={!canNext()}
                style={{
                  padding: "14px 40px",
                  borderRadius: 60,
                  border: "none",
                  background: canNext() ? SAGE : "#D0D5D1",
                  color: WHITE,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: canNext() ? "pointer" : "not-allowed",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.2s ease",
                }}
              >{step === 4 ? "Generate Session" : "Continue"}</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: WHITE, borderTop: "1px solid #E8ECEA", padding: "24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 12.5, color: TEXT_LIGHT, lineHeight: 1.6 }}>
            Mind Refuge is a wellness tool designed to complement professional care.
            It is not a substitute for medical advice, diagnosis, or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
}
