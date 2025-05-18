import '../styles/globals.css';
import React from 'react';

export default function HeroSection() {
  const sectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const articleStyle: React.CSSProperties = {
    animation: 'fadein-firstSection 1s',
  };

  const textBlockStyle: React.CSSProperties = {
    color: 'var(--textgrey)',
    position: 'relative',
    overflow: 'hidden',
    top: '50%',
    transform: 'translate(0, calc(-50% + 30px))',
  };

  const h1Style: React.CSSProperties = {
    // Optional: eigene H1-Stile
  };

  const rainbowStyle: React.CSSProperties = {
    // Optional: Rainbow-Stil
  };

  const paragraphStyle: React.CSSProperties = {
    // Optional: eigene P-Stile
  };

  const ctaStyle: React.CSSProperties = {
    // Optional: Call-to-action-Stil
  };

  return (
    <section style={sectionStyle}>
      <article style={articleStyle}>
        <div style={textBlockStyle}>
          <h1 style={h1Style}>
            Willkommen bei <span style={rainbowStyle}>NETRO</span>
          </h1>
          <p style={paragraphStyle}>Hier ist dein erster Eindruck. Mach ihn unvergesslich.</p>
          <a style={ctaStyle}>Mehr erfahren</a>
        </div>
      </article>
    </section>
  );
}
