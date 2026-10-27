import React from 'react';
import FlutedBackground from '../components/FlutedBackground.jsx';

/* 404, on the dark fluted glass. */
export default function NotFound() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate', background: 'var(--dark)', color: '#fff', minHeight: '100svh', display: 'grid', placeItems: 'center', padding: '140px 0 100px', textAlign: 'center' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: -1, opacity: 0.4 }}><FlutedBackground dark hue={-20} /></div>
      <div className="wrap" style={{ maxWidth: 640 }}>
        <div style={{ fontSize: 'clamp(80px, 12vw, 150px)', fontWeight: 600, letterSpacing: '-.05em', lineHeight: 1 }}>404</div>
        <h1 style={{ fontFamily: "'Lora',Georgia,serif", fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.1, fontSize: 'clamp(28px,3.6vw,44px)', margin: '18px 0 0' }}>We could not find that page.</h1>
        <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'rgba(255,255,255,.62)', margin: '16px auto 30px', maxWidth: 440 }}>The page you are looking for may have moved or no longer exists.</p>
        <a href="/" className="btn" style={{ background: '#fff', color: 'var(--ink)' }}>Back to home</a>
      </div>
    </main>
  );
}
