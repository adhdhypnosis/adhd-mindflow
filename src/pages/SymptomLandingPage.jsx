import { useState, useEffect } from "react";

// ─── PALETTE ───
const SAGE = "#7C9A82";
const SAGE_LIGHT = "#A8C5AE";
const SAGE_PALE = "#E8F0EA";
const SAGE_DEEP = "#4A6B50";
const WARM = "#C4A882";
const WARM_LIGHT = "#F5EDE3";
const WARM_BG = "#F7F3ED";
const TEXT_DARK = "#2D3436";
const TEXT_MID = "#555E60";
const TEXT_LIGHT = "#7B8789";
const BG = "#FAFBF9";
const WHITE = "#FFFFFF";

// ─── HERO DECORATIONS ───
const LeafSVG = ({ style }) => (
  <svg viewBox="0 0 80 120" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M40 5 C60 25 70 55 60 85 C55 100 45 110 40 115 C35 110 25 100 20 85 C10 55 20 25 40 5Z" fill={SAGE_LIGHT} opacity="0.25" />
    <path d="M40 20 L40 100" stroke={SAGE} strokeWidth="1.2" opacity="0.2" />
    <path d="M40 40 L28 32" stroke={SAGE} strokeWidth="0.8" opacity="0.15" />
    <path d="M40 55 L52 45" stroke={SAGE} strokeWidth="0.8" opacity="0.15" />
    <path d="M40 70 L26 64" stroke={SAGE} strokeWidth="0.8" opacity="0.15" />
  </svg>
);

const CircleRingSVG = ({ style }) => (
  <svg viewBox="0 0 100 100" fill="none" style={{ position: "absolute", ...style }}>
    <circle cx="50" cy="50" r="42" stroke="#D0D0D0" strokeWidth="1.8" opacity="0.35" strokeDasharray="8 6" />
  </svg>
);

const DotGridSVG = ({ style }) => (
  <svg viewBox="0 0 100 100" fill="none" style={{ position: "absolute", ...style }}>
    {[0,1,2,3,4].map(r => [0,1,2,3,4].map(c => (
      <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r="2.2" fill={SAGE} opacity={0.12 + (r + c) * 0.03} />
    )))}
  </svg>
);

const SpiralSVG = ({ style }) => (
  <svg viewBox="0 0 120 120" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M60 60 C60 52 68 48 72 54 C78 62 70 72 60 72 C46 72 40 58 46 46 C54 30 76 28 84 44 C94 64 80 88 60 88 C34 88 24 62 32 40 C42 14 80 8 96 34" stroke={WARM} strokeWidth="2.2" fill="none" opacity="0.4" strokeLinecap="round" />
    <circle cx="60" cy="60" r="3" fill={WARM} opacity="0.5" />
  </svg>
);

const LotusSVG = ({ style }) => (
  <svg viewBox="0 0 100 80" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M50 15 C55 30 58 50 50 65 C42 50 45 30 50 15Z" fill={SAGE_LIGHT} opacity="0.3" />
    <path d="M35 25 C42 35 46 52 38 62 C28 52 28 35 35 25Z" fill={SAGE_LIGHT} opacity="0.22" />
    <path d="M22 38 C30 44 36 56 28 64 C18 56 15 44 22 38Z" fill={SAGE} opacity="0.15" />
    <path d="M65 25 C58 35 54 52 62 62 C72 52 72 35 65 25Z" fill={SAGE_LIGHT} opacity="0.22" />
    <path d="M78 38 C70 44 64 56 72 64 C82 56 85 44 78 38Z" fill={SAGE} opacity="0.15" />
    <path d="M25 68 Q50 55 75 68" stroke={SAGE} strokeWidth="1.5" opacity="0.2" strokeLinecap="round" fill="none" />
  </svg>
);

const FloatingDotSVG = ({ style }) => (
  <svg viewBox="0 0 20 20" fill="none" style={{ position: "absolute", ...style }}>
    <circle cx="10" cy="10" r="5" fill={WARM} opacity="0.35" />
  </svg>
);

// ─── SCIENCE SECTION DECORATIONS ───
const DNAHelixSVG = ({ style }) => (
  <svg viewBox="0 0 60 140" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M15 10 Q45 30 15 50 Q-5 70 15 90 Q45 110 15 130" stroke={SAGE} strokeWidth="1.8" fill="none" opacity="0.22" strokeLinecap="round" />
    <path d="M45 10 Q15 30 45 50 Q65 70 45 90 Q15 110 45 130" stroke={SAGE_LIGHT} strokeWidth="1.8" fill="none" opacity="0.18" strokeLinecap="round" />
    {[20,40,60,80,100,120].map((y,i) => (
      <line key={i} x1={i%2===0 ? 20 : 18} y1={y} x2={i%2===0 ? 40 : 42} y2={y} stroke={SAGE} strokeWidth="1" opacity="0.12" />
    ))}
  </svg>
);

const BrainSVG = ({ style }) => (
  <svg viewBox="0 0 150 120" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M75 15 C95 12 115 18 125 35 C135 52 132 70 125 82 C118 94 105 102 90 105 C80 107 68 105 58 100 C48 95 40 88 35 78 C28 65 25 50 30 38 C38 22 55 14 75 15Z" stroke={SAGE} strokeWidth="1.6" fill="none" opacity="0.2" strokeLinecap="round" />
    <path d="M40 55 C50 48 62 50 70 58" stroke={SAGE_LIGHT} strokeWidth="1.2" fill="none" opacity="0.15" strokeLinecap="round" />
    <path d="M72 30 C82 28 95 32 105 42" stroke={SAGE_LIGHT} strokeWidth="1.2" fill="none" opacity="0.15" strokeLinecap="round" />
    <path d="M38 72 C48 65 62 68 75 75" stroke={SAGE_LIGHT} strokeWidth="1.1" fill="none" opacity="0.12" strokeLinecap="round" />
    <path d="M80 20 C78 35 72 50 68 65 C65 75 60 85 55 95" stroke={SAGE} strokeWidth="1.3" fill="none" opacity="0.15" strokeLinecap="round" />
    <path d="M50 60 C60 58 75 62 90 70 C100 75 110 82 118 90" stroke={SAGE} strokeWidth="1.2" fill="none" opacity="0.13" strokeLinecap="round" />
    <path d="M115 50 C120 58 122 68 120 78" stroke={SAGE_LIGHT} strokeWidth="1" fill="none" opacity="0.1" strokeLinecap="round" />
    <path d="M58 100 C55 108 52 115 55 118 C58 120 65 118 68 112 C70 108 68 102 62 100" stroke={SAGE} strokeWidth="1.4" fill="none" opacity="0.16" strokeLinecap="round" />
    <path d="M90 95 C100 98 108 100 112 96 C115 92 112 86 105 85" stroke={SAGE_LIGHT} strokeWidth="1.2" fill="none" opacity="0.13" strokeLinecap="round" />
    <path d="M95 100 C102 102 108 103 110 100" stroke={SAGE_LIGHT} strokeWidth="0.9" fill="none" opacity="0.1" strokeLinecap="round" />
  </svg>
);

const OrangeDotSVG = ({ style, size = 6 }) => (
  <svg viewBox="0 0 20 20" fill="none" style={{ position: "absolute", ...style }}>
    <circle cx="10" cy="10" r={size} fill="#E8A87C" opacity="0.35" />
  </svg>
);

const BrainWaveIcon = () => (
  <svg viewBox="0 0 40 28" fill="none" style={{ width: 32, height: 22 }}>
    <path d="M2 18 C4 18 5 14 6 10 C7 6 8 4 10 14 C11 20 12 22 13 14 C14 6 15 2 16 14 C17 24 18 26 19 14 C20 4 21 2 22 14 C23 22 24 24 25 14 C26 6 27 4 28 14 C29 20 30 22 31 14 C32 8 33 10 34 14 C35 16 36 18 38 18" stroke={SAGE_DEEP} strokeWidth="2.2" strokeLinecap="round" fill="none" />
  </svg>
);

// ─── CTA SECTION DECORATIONS ───
const SparklesSVG = ({ style }) => (
  <svg viewBox="0 0 120 120" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M60 10 L65 50 L100 55 L65 60 L60 100 L55 60 L20 55 L55 50 Z" fill={WARM} opacity="0.7" />
    <path d="M95 15 L97 25 L107 27 L97 29 L95 39 L93 29 L83 27 L93 25 Z" fill={WARM} opacity="0.5" />
    <path d="M30 20 L31.5 26 L37 27 L31.5 28 L30 34 L28.5 28 L23 27 L28.5 26 Z" fill={WARM} opacity="0.4" />
  </svg>
);

const WavesSVG = ({ style }) => (
  <svg viewBox="0 0 160 80" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M10 40 Q30 20 50 40 Q70 60 90 40 Q110 20 130 40 Q150 60 170 40" stroke={WARM} strokeWidth="3.5" fill="none" opacity="0.55" strokeLinecap="round" />
    <path d="M10 55 Q30 35 50 55 Q70 75 90 55 Q110 35 130 55 Q150 75 170 55" stroke={WARM} strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />
    <path d="M10 70 Q30 50 50 70 Q70 90 90 70 Q110 50 130 70" stroke={WARM} strokeWidth="2.5" fill="none" opacity="0.3" strokeLinecap="round" />
  </svg>
);

const SmallSparkle = ({ style }) => (
  <svg viewBox="0 0 40 40" fill="none" style={{ position: "absolute", ...style }}>
    <path d="M20 4 L22 16 L34 18 L22 20 L20 32 L18 20 L6 18 L18 16 Z" fill={WARM} opacity="0.6" />
  </svg>
);

// ─── UI COMPONENTS ───
const CTA_URL = "https://www.adhdselfhypnosis.com/hypnosis-generator";

const CTAButton = ({ children, variant = "primary", large, href = CTA_URL }) => {
  const [h, setH] = useState(false);
  const p = variant === "primary";
  return (
    <a href={href} style={{ textDecoration: "none" }}><button
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: large ? "20px 48px" : p ? "18px 44px" : "14px 36px",
        fontSize: large ? 18 : p ? 16 : 14,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        border: p ? "none" : `2px solid ${SAGE}`,
        borderRadius: 60,
        cursor: "pointer",
        background: p ? (h ? SAGE_DEEP : SAGE) : h ? SAGE_PALE : "transparent",
        color: p ? WHITE : SAGE_DEEP,
        transition: "all 0.3s ease",
        letterSpacing: "0.01em",
        transform: h ? "translateY(-2px)" : "translateY(0)",
        boxShadow: h && p ? `0 10px 35px ${SAGE}40` : "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >{children}</button></a>
  );
};

const SectionLabel = ({ children }) => (
  <div style={{
    display: "inline-block", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.14em", textTransform: "uppercase", color: SAGE,
    background: SAGE_PALE, padding: "7px 18px", borderRadius: 30,
    marginBottom: 20, fontFamily: "'Poppins', sans-serif",
  }}>{children}</div>
);

const BenefitCard = ({ icon, title, desc, iconAnim }) => {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        flex: "1 1 280px", background: WHITE, borderRadius: 20, padding: "36px 28px",
        border: `1px solid ${h ? SAGE_LIGHT : "#E8ECEA"}`, transition: "all 0.3s ease",
        transform: h ? "translateY(-4px)" : "none",
        boxShadow: h ? `0 12px 40px ${SAGE}15` : "0 2px 12px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 16, background: SAGE_PALE,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, marginBottom: 18,
        animation: h ? `${iconAnim || "iconPulse"} 0.6s ease` : "none",
      }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: TEXT_DARK, margin: "0 0 10px", fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
      <p style={{ fontSize: 15, color: TEXT_MID, lineHeight: 1.65, margin: 0 }}>{desc}</p>
    </div>
  );
};

const StepCard = ({ num, title, desc }) => (
  <div style={{ flex: "1 1 240px", textAlign: "center", padding: "0 16px" }}>
    <div style={{
      width: 56, height: 56, borderRadius: "50%",
      background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
      color: WHITE, fontSize: 22, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      margin: "0 auto 18px", fontFamily: "'Poppins', sans-serif",
    }}>{num}</div>
    <h3 style={{ fontSize: 17, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>{title}</h3>
    <p style={{ fontSize: 14.5, color: TEXT_MID, lineHeight: 1.65, margin: 0 }}>{desc}</p>
  </div>
);

const TestimonialCard = ({ quote, name, detail }) => (
  <div style={{
    background: WHITE, borderRadius: 20, padding: "32px 28px",
    border: "1px solid #E8ECEA", flex: "1 1 300px",
  }}>
    <div style={{ fontSize: 36, color: SAGE_LIGHT, lineHeight: 1, marginBottom: 8 }}>"</div>
    <p style={{ fontSize: 15, color: TEXT_MID, lineHeight: 1.7, margin: "0 0 18px", fontStyle: "italic" }}>{quote}</p>
    <div style={{ fontSize: 14, fontWeight: 600, color: TEXT_DARK }}>{name}</div>
    <div style={{ fontSize: 13, color: TEXT_LIGHT }}>{detail}</div>
  </div>
);

// ─── MAIN COMPONENT ───
export default function SymptomLandingPage({ data }) {
  useEffect(() => {
    document.title = data.seo.title;

    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0%, 100% { opacity: 0.4; transform: scale(0.95); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }
      @keyframes iconPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.12); }
      }
      @keyframes iconFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }
      @keyframes iconRock {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(6deg); }
        75% { transform: rotate(-6deg); }
      }
      @keyframes underlineFlow {
        0% { stroke-dashoffset: 0; }
        50% { stroke-dashoffset: -14; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes slowSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes drift {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        33% { transform: translateY(-8px) translateX(4px); }
        66% { transform: translateY(4px) translateX(-6px); }
      }
      @keyframes breathe {
        0%, 100% { transform: scale(1); opacity: 0.25; }
        50% { transform: scale(1.08); opacity: 0.4; }
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [data.seo.title]);

  const section = (content, bg = BG, py = 100) => (
    <div style={{ background: bg, padding: `${py}px 24px`, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>{content}</div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", color: TEXT_DARK, background: BG }}>

      {/* ══════ NAV ══════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100, background: `${BG}EE`,
        backdropFilter: "blur(16px)", borderBottom: "1px solid #E8ECEA", padding: "14px 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: WHITE, fontSize: 15, fontWeight: 700,
            }}>M</div>
            <span style={{ fontSize: 17, fontWeight: 600, color: TEXT_DARK, letterSpacing: "-0.01em" }}>Mind Refuge</span>
          </div>
          <CTAButton variant="secondary" href={CTA_URL}>Open the App →</CTAButton>
        </div>
      </nav>

      {/* ══════ HERO ══════ */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: `linear-gradient(180deg, ${WHITE} 0%, ${SAGE_PALE}33 60%, ${WARM_BG}44 100%)`,
        padding: "70px 24px 90px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>

          {/* LEFT — Copy */}
          <div style={{ flex: "1 1 460px", minWidth: 300 }}>
            <div style={{
              display: "inline-block", fontSize: 14, fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase", color: SAGE_DEEP,
              background: SAGE_PALE, padding: "10px 22px", borderRadius: 30,
              marginBottom: 28, border: `2px solid ${SAGE_LIGHT}`,
              animation: "fadeUp 0.7s ease both",
            }}>✦ Self-Hypnosis for ADHD</div>

            <h1 style={{
              fontSize: "clamp(34px, 4.5vw, 52px)", fontWeight: 700,
              lineHeight: 1.18, color: TEXT_DARK, marginBottom: 22,
              animation: "fadeUp 0.7s ease 0.1s both", letterSpacing: "-0.02em",
            }}>
              {data.hero.headline}
            </h1>

            <p style={{
              fontSize: 17, color: TEXT_MID, lineHeight: 1.72, maxWidth: 480,
              marginBottom: 36, animation: "fadeUp 0.7s ease 0.2s both",
            }}>
              {data.hero.subtext}
            </p>

            <div style={{ animation: "fadeUp 0.7s ease 0.3s both", marginBottom: 18 }}>
              <CTAButton large>Build your self-hypnosis for free</CTAButton>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: WARM_LIGHT, padding: "10px 20px", borderRadius: 12,
              animation: "fadeUp 0.7s ease 0.4s both",
            }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: TEXT_DARK }}>
                No sign-up required · 25 minutes · Designed for ADHD brains
              </span>
            </div>
          </div>

          {/* RIGHT — Image + decorations */}
          <div style={{
            flex: "1 1 380px", minWidth: 300, maxWidth: 460,
            position: "relative", display: "flex", justifyContent: "center",
            animation: "fadeUp 0.8s ease 0.25s both",
          }}>
            <svg viewBox="0 0 380 420" style={{
              position: "relative", zIndex: 1, width: 380, height: 420,
              overflow: "visible",
            }}>
              <defs>
                <clipPath id="heroClip">
                  <path d="M190 35 C270 30 330 70 345 130 C358 185 355 245 335 300 C315 350 278 380 235 400 C205 412 170 412 145 400 C100 380 65 350 45 300 C25 245 22 185 35 130 C50 70 110 30 190 35Z" />
                </clipPath>
              </defs>
              <path d="M190 35 C270 30 330 70 345 130 C358 185 355 245 335 300 C315 350 278 380 235 400 C205 412 170 412 145 400 C100 380 65 350 45 300 C25 245 22 185 35 130 C50 70 110 30 190 35Z" fill="#C8CCE5" opacity="0.5" />
              <image
                href="/images/hero-adhd.png"
                x="15" y="10"
                width="350" height="400"
                clipPath="url(#heroClip)"
                preserveAspectRatio="xMidYMin slice"
              />
            </svg>

            <LeafSVG style={{ width: 55, height: 85, top: -15, right: 20, zIndex: 2, transform: "rotate(15deg)", animation: "drift 6s ease-in-out infinite" }} />
            <CircleRingSVG style={{ width: 90, height: 90, top: 5, left: 0, zIndex: 2, animation: "slowSpin 25s linear infinite" }} />
            <DotGridSVG style={{ width: 70, height: 70, top: "50%", right: -15, zIndex: 2, animation: "breathe 4s ease-in-out infinite" }} />
            <SpiralSVG style={{ width: 110, height: 110, bottom: 5, left: -25, zIndex: 2, animation: "slowSpin 20s linear infinite" }} />
            <FloatingDotSVG style={{ width: 18, height: 18, top: 60, left: 35, zIndex: 2, animation: "drift 5s ease-in-out 0.5s infinite" }} />
            <FloatingDotSVG style={{ width: 14, height: 14, bottom: 70, right: 25, zIndex: 2, animation: "drift 6s ease-in-out 2s infinite" }} />
            <FloatingDotSVG style={{ width: 10, height: 10, top: "40%", right: 5, zIndex: 2, animation: "drift 4s ease-in-out 1.5s infinite" }} />
            <LotusSVG style={{ width: 65, height: 52, bottom: 35, right: 5, zIndex: 2, animation: "breathe 5s ease-in-out 1s infinite" }} />
          </div>
        </div>
      </div>

      {/* ══════ WHY SELF-HYPNOSIS ══════ */}
      {section(
        <>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>Why self-hypnosis</SectionLabel>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
              Built for brains that can't<span style={{ color: SAGE, position: "relative", display: "inline-block" }}> "just meditate"
                <svg viewBox="0 0 200 12" fill="none" style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 12, overflow: "visible" }}>
                  <path d="M5 8 Q30 2 55 7 Q80 12 110 5 Q140 -1 170 6 Q185 8 195 4" stroke={WARM} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" strokeDasharray="8 5" style={{ animation: "underlineFlow 3s ease-in-out infinite" }} />
                </svg>
              </span>
            </h2>
            <p style={{ fontSize: 16, color: TEXT_MID, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.72 }}>
              {data.whySelfHypnosis.intro}
            </p>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <BenefitCard icon="🧠" title={data.benefits[0].title} iconAnim="iconPulse"
              desc={data.benefits[0].desc} />
            <BenefitCard icon="⏱️" title={data.benefits[1].title} iconAnim="iconFloat"
              desc={data.benefits[1].desc} />
            <BenefitCard icon="🎧" title={data.benefits[2].title} iconAnim="iconRock"
              desc={data.benefits[2].desc} />
          </div>
        </>, BG, 100
      )}

      {/* ══════ HOW IT WORKS ══════ */}
      <div style={{ background: WHITE, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>How it works</SectionLabel>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
              Three steps. <span style={{ color: SAGE }}>No overwhelm.</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
            <StepCard num="1" title={data.steps[0].title} desc={data.steps[0].desc} />
            <StepCard num="2" title={data.steps[1].title} desc={data.steps[1].desc} />
            <StepCard num="3" title={data.steps[2].title} desc={data.steps[2].desc} />
          </div>
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <CTAButton large>Build your self-hypnosis for free</CTAButton>
          </div>
        </div>
      </div>

      {/* ══════ WHY HYPNOSIS WORKS FOR ADHD ══════ */}
      <div style={{ background: BG, padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <BrainSVG style={{ width: 100, height: 92, top: 20, right: "4%", zIndex: 1, animation: "breathe 6s ease-in-out infinite" }} />
        <OrangeDotSVG size={6} style={{ width: 18, height: 18, top: 60, left: "12%", zIndex: 1, animation: "drift 6s ease-in-out infinite" }} />
        <OrangeDotSVG size={4} style={{ width: 14, height: 14, top: "35%", right: "15%", zIndex: 1, animation: "drift 7s ease-in-out 1s infinite" }} />
        <OrangeDotSVG size={7} style={{ width: 20, height: 20, bottom: 50, left: "8%", zIndex: 1, animation: "drift 9s ease-in-out 2s infinite" }} />
        <OrangeDotSVG size={3} style={{ width: 12, height: 12, top: "50%", right: "7%", zIndex: 1, animation: "drift 5.5s ease-in-out 0.5s infinite" }} />
        <OrangeDotSVG size={5} style={{ width: 16, height: 16, bottom: 80, right: "30%", zIndex: 1, animation: "drift 8s ease-in-out 3s infinite" }} />
        <OrangeDotSVG size={3.5} style={{ width: 13, height: 13, bottom: 65, left: "25%", zIndex: 1, animation: "drift 6.5s ease-in-out 1.5s infinite" }} />
        <OrangeDotSVG size={5.5} style={{ width: 17, height: 17, top: "40%", left: "5%", zIndex: 1, animation: "drift 7s ease-in-out 4s infinite" }} />
        <DNAHelixSVG style={{ width: 35, height: 88, top: 25, left: "18%", zIndex: 1, animation: "drift 10s ease-in-out infinite" }} />

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionLabel>The science</SectionLabel>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
              Why hypnosis actually <span style={{ color: SAGE }}>works for ADHD</span>
            </h2>
            <p style={{ fontSize: 16, color: TEXT_MID, maxWidth: 580, margin: "16px auto 0", lineHeight: 1.72 }}>
              This isn't placebo. Three decades of neuroscience research explain why ADHD brains are uniquely wired to benefit from hypnosis.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 760, margin: "0 auto" }}>
            {data.science.map((card, i) => (
              <div key={i} style={{
                background: WHITE, borderRadius: 20, padding: "32px 28px",
                border: "1px solid #E8ECEA", display: "flex", gap: 24, alignItems: "flex-start",
                flexWrap: "wrap",
              }}>
                <div style={{
                  minWidth: 56, height: 56, borderRadius: 16, background: SAGE_PALE,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28,
                }}>{card.icon === "brainwave" ? <BrainWaveIcon /> : card.icon}</div>
                <div style={{ flex: "1 1 300px" }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 15, color: TEXT_MID, lineHeight: 1.7, margin: 0 }}
                     dangerouslySetInnerHTML={{ __html: card.text }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════ TESTIMONIALS ══════ */}
      {section(
        <>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SectionLabel>Real experiences</SectionLabel>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
              They felt it too. <span style={{ color: SAGE }}>Then something shifted.</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {data.testimonials.map((t, i) => (
              <TestimonialCard key={i} quote={t.quote} name={t.name} detail={t.detail} />
            ))}
          </div>
          <div style={{
            textAlign: "center", marginTop: 40, display: "flex",
            justifyContent: "center", gap: 32, flexWrap: "wrap", opacity: 0.55,
          }}>
            {["10,000+ sessions completed", "4.8 ★ average rating", "ADHD-specific design"].map((t, i) => (
              <span key={i} style={{ fontSize: 13, fontWeight: 600, color: TEXT_MID, letterSpacing: "0.04em" }}>{t}</span>
            ))}
          </div>
        </>, WHITE, 100
      )}

      {/* ══════ FINAL CTA ══════ */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, ${SAGE_PALE}88 0%, ${WHITE} 50%, ${WARM_LIGHT}66 100%)`,
        padding: "100px 24px", textAlign: "center",
      }}>
        <SparklesSVG style={{ width: 80, height: 80, top: 30, left: "8%", opacity: 0.5, animation: "shimmer 4s ease-in-out infinite" }} />
        <SmallSparkle style={{ width: 30, height: 30, top: 60, right: "12%", animation: "shimmer 3s ease-in-out 1s infinite" }} />
        <WavesSVG style={{ width: 120, height: 60, bottom: 40, left: "5%", opacity: 0.4 }} />
        <SmallSparkle style={{ width: 22, height: 22, bottom: 80, right: "8%", animation: "shimmer 5s ease-in-out 0.5s infinite" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 700,
            lineHeight: 1.2, marginBottom: 20, letterSpacing: "-0.02em",
          }}>
            {data.finalCta.headline}
          </h2>
          <p style={{ fontSize: 17, color: TEXT_MID, lineHeight: 1.72, marginBottom: 36 }}>
            {data.finalCta.subtext}
          </p>
          <CTAButton large>Build your self-hypnosis for free</CTAButton>
          <p style={{ fontSize: 13, color: TEXT_LIGHT, marginTop: 14 }}>
            No account needed · Works on any device · Cancel anytime
          </p>
        </div>
      </div>

      {/* ══════ FOOTER ══════ */}
      <footer style={{ background: WHITE, borderTop: "1px solid #E8ECEA", padding: "40px 24px" }}>
        <div style={{
          maxWidth: 960, margin: "0 auto", display: "flex",
          justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: WHITE, fontSize: 13, fontWeight: 700,
              }}>M</div>
              <span style={{ fontSize: 15, fontWeight: 600, color: TEXT_DARK }}>Mind Refuge</span>
            </div>
            <p style={{ fontSize: 12.5, color: TEXT_LIGHT, maxWidth: 420, lineHeight: 1.6 }}>
              Mind Refuge is a wellness tool designed to complement professional care. It is not a
              substitute for medical advice, diagnosis, or treatment. If you're in crisis, please
              contact a mental health professional.
            </p>
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Privacy", "Terms", "Contact", "FAQ"].map((link) => (
              <a key={link} href="#" style={{ fontSize: 13, color: TEXT_LIGHT, textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = SAGE)}
                onMouseLeave={(e) => (e.target.style.color = TEXT_LIGHT)}
              >{link}</a>
            ))}
          </div>
        </div>
        <div style={{
          maxWidth: 960, margin: "24px auto 0", paddingTop: 20,
          borderTop: "1px solid #F0F2F1", textAlign: "center",
        }}>
          <p style={{ fontSize: 12, color: TEXT_LIGHT }}>© 2026 Mind Refuge · adhdselfhypnosis.com · All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
