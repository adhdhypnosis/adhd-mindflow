const SAGE = '#7C9A82';
const SAGE_LIGHT = '#A8C5AE';
const SAGE_PALE = '#E8F0EA';
const WARM = '#C4A882';
const TEXT_DARK = '#2D3436';
const TEXT_MID = '#555E60';
const TEXT_LIGHT = '#7B8789';
const WHITE = '#FFFFFF';

export default function GeneratingView({ currentClip, totalClips, currentSection, error, onRetry }) {
  const progress = totalClips > 0 ? (currentClip / totalClips) * 100 : 0;
  const estimatedSecondsPerClip = 3;
  const remaining = (totalClips - currentClip) * estimatedSecondsPerClip;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  if (error) {
    return (
      <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease both' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', fontSize: 28,
        }}>!</div>
        <h2 style={{
          fontSize: 24, fontWeight: 700, marginBottom: 12,
          fontFamily: "'Poppins', sans-serif", color: TEXT_DARK,
        }}>Generation Failed</h2>
        <p style={{
          fontSize: 15, color: TEXT_MID, marginBottom: 24, lineHeight: 1.6,
          fontFamily: "'Poppins', sans-serif",
        }}>{error}</p>
        <button
          type="button"
          onClick={onRetry}
          style={{
            padding: '14px 40px', borderRadius: 60, border: 'none',
            background: SAGE, color: WHITE, fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
          }}
        >Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease both' }}>
      {/* Pulsing circle animation */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
        animation: 'pulse 2s ease-in-out infinite',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: `${WHITE}30`,
          animation: 'pulse 2s ease-in-out infinite 0.3s',
        }} />
      </div>

      <h2 style={{
        fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, marginBottom: 8,
        fontFamily: "'Poppins', sans-serif", color: TEXT_DARK,
      }}>Generating Your Session</h2>
      <p style={{
        fontSize: 14, color: TEXT_MID, marginBottom: 32,
        fontFamily: "'Poppins', sans-serif",
      }}>
        Creating personalized audio clips with natural voice synthesis
      </p>

      {/* Progress bar */}
      <div style={{
        background: '#E8ECEA', borderRadius: 8, height: 8,
        overflow: 'hidden', marginBottom: 16, maxWidth: 400, margin: '0 auto 16px',
      }}>
        <div style={{
          height: '100%', borderRadius: 8,
          background: `linear-gradient(90deg, ${SAGE}, ${SAGE_LIGHT})`,
          width: `${progress}%`,
          transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 16,
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: SAGE }}>{currentClip}</div>
          <div style={{ fontSize: 12, color: TEXT_LIGHT }}>of {totalClips} clips</div>
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: WARM }}>
            {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
          </div>
          <div style={{ fontSize: 12, color: TEXT_LIGHT }}>est. remaining</div>
        </div>
      </div>

      {/* Current section */}
      <div style={{
        display: 'inline-block', fontSize: 12, fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: SAGE,
        background: SAGE_PALE, padding: '6px 16px', borderRadius: 20,
        fontFamily: "'Poppins', sans-serif",
      }}>
        {currentSection}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
