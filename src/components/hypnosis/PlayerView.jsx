import { useState, useRef, useEffect } from 'react';

const SAGE = '#7C9A82';
const SAGE_LIGHT = '#A8C5AE';
const SAGE_PALE = '#E8F0EA';
const SAGE_DEEP = '#4A6B50';
const WARM = '#C4A882';
const TEXT_DARK = '#2D3436';
const TEXT_MID = '#555E60';
const TEXT_LIGHT = '#7B8789';
const WHITE = '#FFFFFF';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PlayerView({ audioUrl, onStartOver }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease both' }}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px', color: WHITE, fontSize: 28,
      }}>&#10003;</div>

      <h2 style={{
        fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, marginBottom: 8,
        fontFamily: "'Poppins', sans-serif", color: TEXT_DARK,
      }}>Your Session is Ready</h2>
      <p style={{
        fontSize: 15, color: TEXT_MID, marginBottom: 32, lineHeight: 1.6,
        fontFamily: "'Poppins', sans-serif",
      }}>
        Your personalized self-hypnosis session has been generated. Listen now or download for later.
      </p>

      {/* Player card */}
      <div style={{
        background: WHITE, borderRadius: 20, padding: 32,
        border: '1px solid #E8ECEA', maxWidth: 480, margin: '0 auto 32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
      }}>
        {/* Play button */}
        <button
          type="button"
          onClick={togglePlay}
          style={{
            width: 64, height: 64, borderRadius: '50%', border: 'none',
            background: `linear-gradient(135deg, ${SAGE}, ${SAGE_LIGHT})`,
            color: WHITE, fontSize: 24, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Seek bar */}
        <div
          onClick={seek}
          style={{
            background: '#E8ECEA', borderRadius: 4, height: 6,
            cursor: 'pointer', position: 'relative', marginBottom: 12,
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            borderRadius: 4,
            background: `linear-gradient(90deg, ${SAGE}, ${SAGE_LIGHT})`,
            width: `${progress}%`,
            transition: 'width 0.1s linear',
          }} />
          <div style={{
            position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
            left: `${progress}%`,
            width: 14, height: 14, borderRadius: '50%',
            background: SAGE, border: `2px solid ${WHITE}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }} />
        </div>

        {/* Time */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 13, color: TEXT_LIGHT, fontFamily: "'Poppins', sans-serif",
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        <a
          href={audioUrl}
          download="mind-refuge-session.wav"
          style={{
            padding: '14px 32px', borderRadius: 60, border: 'none',
            background: SAGE, color: WHITE, fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
            textDecoration: 'none', display: 'inline-block',
          }}
        >Download Session</a>
        <button
          type="button"
          onClick={onStartOver}
          style={{
            padding: '14px 32px', borderRadius: 60,
            border: `2px solid ${SAGE}`, background: 'transparent',
            color: SAGE_DEEP, fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
          }}
        >Generate Another</button>
      </div>
    </div>
  );
}
