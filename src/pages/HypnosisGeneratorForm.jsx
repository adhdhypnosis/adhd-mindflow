import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  { id: "emotional-overwhelm", label: "Emotional Overwhelm", icon: "\uD83C\uDF0A" },
  { id: "rumination", label: "Rumination", icon: "\uD83D\uDD04" },
  { id: "task-paralysis", label: "Task Paralysis", icon: "\u26A0\uFE0F" },
  { id: "rejection-sensitivity", label: "Rejection Sensitivity", icon: "\uD83D\uDC94" },
  { id: "sensory-overload", label: "Sensory Overload", icon: "\uD83D\uDD0A" },
  { id: "sleep-anxiety", label: "Sleep Anxiety", icon: "\uD83C\uDF19" },
  { id: "social-anxiety", label: "Social Anxiety", icon: "\uD83D\uDE36" },
  { id: "performance-anxiety", label: "Performance Anxiety", icon: "\uD83C\uDFAF" },
  { id: "time-pressure", label: "Time Pressure Stress", icon: "\u23F3" },
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

const DEFAULTS = {
  sensory1: "wind moving through leaves, distant waves, or soft birdsong",
  sensory2: "a comfortable temperature, a gentle breeze, or the feeling of soft fabric supporting you",
  sensory3: "clean air, a subtle scent of pine or ocean, or warm light in the scene",
  safePlace: "a quiet, comfortable place",
  bodyCues: "tight chest, jaw clenching, shoulders rising, or thoughts speeding up",
};

function buildSSML(data) {
  const focus = FOCUS_OPTIONS.find(o => o.id === data.focus)?.label || data.focus;
  const trigger = data.trigger;
  const safePlace = data.safePlace
    ? SAFE_PLACE_OPTIONS.find(o => o.id === data.safePlace)?.label.toLowerCase() || DEFAULTS.safePlace
    : DEFAULTS.safePlace;
  const music = MUSIC_OPTIONS.find(o => o.id === data.music)?.label || "Ambient Pads";

  let bodyCues;
  if (data.bodyCue1 && data.bodyCue2) {
    bodyCues = `${data.bodyCue1} and ${data.bodyCue2}`;
  } else if (data.bodyCue1) {
    bodyCues = `${data.bodyCue1}, along with other signals like jaw clenching or shoulders rising`;
  } else if (data.bodyCue2) {
    bodyCues = `${data.bodyCue2}, along with other signals like tight chest or thoughts speeding up`;
  } else {
    bodyCues = DEFAULTS.bodyCues;
  }

  const sensory1 = data.sensory1 || DEFAULTS.sensory1;
  const sensory2 = data.sensory2 || DEFAULTS.sensory2;
  const sensory3 = data.sensory3 || DEFAULTS.sensory3;

  return `<speak>
  <prosody rate="slow" pitch="-2st">

    <!-- INDUCTION (3 min) -->
    <p>Close your eyes. <break time="1500ms"/> Let your body settle into wherever you are right now. <break time="1000ms"/> You don't need to try to relax. <break time="800ms"/> Just notice your breath. <break time="1500ms"/> In <break time="500ms"/> and out. <break time="1500ms"/> That's all you need to do right now.</p>
    <break time="2000ms"/>

    <p>With each exhale, let your body grow a little heavier. <break time="1200ms"/> Your shoulders dropping. <break time="800ms"/> Your jaw softening. <break time="1200ms"/> And if your mind wanders — that's fine. <break time="800ms"/> It always comes back.</p>
    <break time="2000ms"/>

    <!-- DEEPENER (2 min) -->
    <p>Now imagine a gentle staircase leading down. <break time="1000ms"/> Ten steps. <break time="800ms"/> With each step, you go deeper into comfort. <break time="1500ms"/></p>
    <p>Ten. <break time="1200ms"/> Nine. <break time="1200ms"/> Eight. <break time="1200ms"/> Deeper and more comfortable. <break time="1500ms"/> Seven. <break time="1200ms"/> Six. <break time="1200ms"/> Five. <break time="1500ms"/> Halfway down now. <break time="1200ms"/> Four. <break time="1200ms"/> Three. <break time="1200ms"/> Two. <break time="1500ms"/> One. <break time="2000ms"/> Good.</p>
    <break time="2000ms"/>

    <!-- SAFE PLACE (3 min) -->
    <p>Now let yourself arrive in ${safePlace}. <break time="1500ms"/> Take a moment to look around. <break time="1200ms"/> Notice ${sensory1}. <break time="1500ms"/> Feel ${sensory2}. <break time="1500ms"/> And breathe in ${sensory3}. <break time="2000ms"/> This is your safe place. <break time="1000ms"/> Nothing can reach you here unless you allow it.</p>
    <break time="2000ms"/>

    <!-- THERAPEUTIC CORE: ${focus} (12 min) -->
    <p>Now, from this safe place, I want you to think about your experience with ${focus.toLowerCase()}. <break time="1500ms"/> Specifically, the pattern that shows up when ${trigger}. <break time="2000ms"/></p>

    <p>Notice how your body responds. <break time="1200ms"/> Perhaps you feel ${bodyCues}. <break time="1500ms"/> These are your body's warning signs. <break time="1000ms"/> And right now, in this deep state of relaxation, <break time="800ms"/> you can observe them without being controlled by them.</p>
    <break time="2000ms"/>

    <p>Your subconscious mind is listening now. <break time="1200ms"/> And I want it to know something important: <break time="1500ms"/> this pattern was never your fault. <break time="1200ms"/> Your brain developed this response to protect you. <break time="1500ms"/> But you don't need this particular protection anymore.</p>
    <break time="2500ms"/>

    <p>From now on, when you notice ${bodyCues}, <break time="1200ms"/> your subconscious will create a small pause. <break time="1500ms"/> Just enough space to choose. <break time="1200ms"/> Not to suppress. <break time="800ms"/> Not to fight. <break time="800ms"/> Just to notice <break time="500ms"/> and choose.</p>
    <break time="2000ms"/>

    <p>Each time you listen to this session, <break time="1200ms"/> that pause grows a little wider. <break time="1500ms"/> The pattern loses a little more of its grip. <break time="1500ms"/> And you gain a little more freedom.</p>
    <break time="3000ms"/>

    <!-- REFRAME (3 min) -->
    <p>Return now to ${safePlace}. <break time="1500ms"/> Feel the safety of this space. <break time="1200ms"/> And know that this calm, <break time="800ms"/> this clarity, <break time="800ms"/> this sense of being okay — <break time="1200ms"/> it's not something outside of you. <break time="1500ms"/> It lives in you. <break time="1200ms"/> You're simply learning to access it.</p>
    <break time="2500ms"/>

    <!-- EMERGENCE (2 min) -->
    <p>In a moment, I'm going to count from one to five. <break time="1000ms"/> With each number, you'll gradually return to full awareness. <break time="1500ms"/> Feeling refreshed. <break time="800ms"/> Feeling calm. <break time="800ms"/> Feeling like something has shifted — even if you can't name it yet.</p>
    <break time="1500ms"/>

    <p>One. <break time="1200ms"/> Beginning to return. <break time="1200ms"/> Two. <break time="1200ms"/> Becoming more aware of your body. <break time="1200ms"/> Three. <break time="1200ms"/> Energy returning to your fingers and toes. <break time="1200ms"/> Four. <break time="1200ms"/> Almost fully alert now. <break time="1500ms"/> And five. <break time="1500ms"/> Eyes open. <break time="1000ms"/> Welcome back.</p>

  </prosody>
</speak>`;
}

function TileSelector({ options, value, onChange, multi }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
      {options.map(opt => {
        const selected = multi ? value?.includes(opt.id) : value === opt.id;
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
  const [ssml, setSSML] = useState("");

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

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const canNext = () => {
    if (step === 0) return !!form.focus;
    if (step === 1) return form.trigger.trim().length > 0;
    return true;
  };

  const next = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSSML(buildSSML(form));
      setStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

        {step < 5 ? (
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
        ) : (
          /* Step 5: SSML Preview */
          <div style={{ animation: "fadeUp 0.5s ease both" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", fontSize: 28, color: WHITE,
              }}>&#10003;</div>
              <h1 style={{
                fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 700,
                lineHeight: 1.25, marginBottom: 8,
              }}>Your Session is Ready</h1>
              <p style={{ fontSize: 15, color: TEXT_MID }}>
                Below is the generated SSML script for your personalized self-hypnosis session.
              </p>
            </div>

            <div style={{
              background: WHITE,
              border: "1px solid #E8ECEA",
              borderRadius: 16,
              padding: 24,
              maxHeight: 500,
              overflow: "auto",
            }}>
              <pre style={{
                fontSize: 12,
                lineHeight: 1.6,
                color: TEXT_MID,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily: "'Courier New', monospace",
              }}>{ssml}</pre>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
              <button
                type="button"
                onClick={() => { setStep(0); setSSML(""); }}
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
                }}
              >Start Over</button>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(ssml);
                }}
                style={{
                  padding: "14px 32px",
                  borderRadius: 60,
                  border: "none",
                  background: SAGE,
                  color: WHITE,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >Copy SSML</button>
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
