// AnimatedBackground.jsx
// Ekizr-style background: dark navy-black + drifting purple/violet/teal glow blobs,
// a slow color-shifting layer, and a twinkling starfield.
// Usage: put <AnimatedBackground /> once at the top of your App, then give your
// page content `position: relative; z-index: 1;` so it sits above it.

export default function AnimatedBackground() {
  return (
    <>
      <style>{`
        .animated-bg {
          position: fixed;
          inset: 0;
          z-index: -1;              /* stays behind everything */
          background: #030014;      /* the near-black navy base */
          overflow: hidden;
          animation: hueShift 40s linear infinite;
        }

        /* every blob = a big circle + heavy blur + low opacity */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);      /* THE key line — turns circles into glow */
          opacity: 0.35;
          mix-blend-mode: screen;   /* makes overlapping glows brighter, not muddy */
        }

        .blob-violet {
          width: 550px;
          height: 550px;
          top: -120px;
          left: -100px;
          background: #6366f1;
          animation: drift1 18s ease-in-out infinite alternate;
        }

        .blob-purple {
          width: 500px;
          height: 500px;
          top: 30%;
          right: -150px;
          background: #a855f7;
          animation: drift2 22s ease-in-out infinite alternate;
        }

        .blob-teal {
          width: 400px;
          height: 400px;
          bottom: -100px;
          right: 15%;
          background: #0e7490;
          opacity: 0.25;
          animation: drift3 26s ease-in-out infinite alternate;
        }

        .blob-pink {
          width: 380px;
          height: 380px;
          bottom: 10%;
          left: 5%;
          background: #ec4899;
          opacity: 0.2;
          animation: drift4 24s ease-in-out infinite alternate;
        }

        /* slow drifting — small movements, big blur = feels alive but calm */
        @keyframes drift1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(80px, 60px) scale(1.15); }
        }
        @keyframes drift2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-70px, -50px) scale(1.1); }
        }
        @keyframes drift3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(50px, -40px) scale(1.2); }
        }
        @keyframes drift4 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-60px, 70px) scale(1.12); }
        }

        /* slow hue cycling across the whole background so it never feels static */
        @keyframes hueShift {
          0%   { filter: hue-rotate(0deg); }
          50%  { filter: hue-rotate(25deg); }
          100% { filter: hue-rotate(0deg); }
        }

        /* a soft rotating conic glow, like a faint aurora sweeping behind everything */
        .aurora {
          position: absolute;
          inset: -50%;
          background: conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.10) 90deg, transparent 180deg, rgba(168,85,247,0.10) 270deg, transparent 360deg);
          animation: rotate 60s linear infinite;
        }
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }

        /* twinkling starfield made from repeated radial-gradient dots — cheap, no canvas/JS needed */
        .stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.7), transparent),
            radial-gradient(2px 2px at 65% 15%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 80% 60%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1.5px 1.5px at 35% 70%, rgba(255,255,255,0.4), transparent),
            radial-gradient(2px 2px at 50% 85%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 90% 40%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 10% 90%, rgba(255,255,255,0.4), transparent);
          background-repeat: no-repeat;
          animation: twinkle 6s ease-in-out infinite alternate;
        }
        @keyframes twinkle {
          from { opacity: 0.3; }
          to   { opacity: 0.9; }
        }

        /* optional: faint noise/vignette so the black doesn't look flat */
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-bg,
          .blob,
          .aurora,
          .stars {
            animation: none !important;
          }
        }
      `}</style>

      <div className="animated-bg">
        <div className="aurora" />
        <div className="blob blob-violet" />
        <div className="blob blob-purple" />
        <div className="blob blob-teal" />
        <div className="blob blob-pink" />
        <div className="stars" />
        <div className="vignette" />
      </div>
    </>
  );
}
