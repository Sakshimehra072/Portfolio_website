import React from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowRight, FileText, ExternalLink } from 'lucide-react';

const Hero = ({ personalInfo }) => {
  const {
    name = "Sakshi",
    subtitle = "Engineer · Developer · 988id of Code",
    bio1 = "I think in systems, not just syntax. I build with React, Next.js, Node, and MongoDB, choosing tools that let me ship fast and scale harder.",
    bio2 = "Dedicated to building resilient full-stack architectures, ultra-fast interfaces, and developer-focused products that perform effortlessly.",
    avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    banner = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    resumeLink = "#",
    email = "sakshi.dev@example.com",
    socials = {}
  } = personalInfo || {};

  return (
    <section className="editorial-section" style={{ paddingTop: '28px' }}>
      <div className="editorial-container">
        {/* Cover / Banner Image with Small Overlapping Circular Avatar */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <div style={{
            width: '100%',
            height: '160px',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid var(--border-color)'
          }}>
            <img
              src={banner}
              alt="Developer Banner"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.8) contrast(1.05)'
              }}
            />
          </div>

          {/* Small Circular Profile Avatar Overlapping Bottom Left */}
          <div style={{
            position: 'absolute',
            bottom: '-18px',
            left: '10px',
            width: '102px',
            height: '102px',
            borderRadius: '50%',
            border: '2px solid var(--bg-primary)',
            overflow: 'hidden',
            background: 'var(--bg-secondary)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <img
              src={avatar}
              alt={name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* Developer Identity */}
        <div style={{ marginTop: '28px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '4px' }}>
            {name}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
            {subtitle}
          </p>
        </div>

        {/* Short Personal Introduction */}
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p>
            {bio1}
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            {bio2}
          </p>
        </div>

        {/* Social / Contact Row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Monochrome Small Outlined Social Icons */}
            <a href={socials.github || "https://github.com"} target="_blank" rel="noreferrer" style={socialBtnStyle} title="GitHub">
              <Github size={15} color="var(--text-secondary)" />
            </a>
            <a href={socials.twitter || "https://x.com"} target="_blank" rel="noreferrer" style={socialBtnStyle} title="X / Twitter">
              <Twitter size={15} color="var(--text-secondary)" />
            </a>
            <a href={socials.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" style={socialBtnStyle} title="LinkedIn">
              <Linkedin size={15} color="var(--text-secondary)" />
            </a>
            <a href={socials.email || `mailto:${email}`} style={socialBtnStyle} title="Email">
              <Mail size={15} color="var(--text-secondary)" />
            </a>
          </div>

          {/* CTA & Contact Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Reach out to build what matters
            </span>
            <a
              href={`mailto:${email}`}
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-primary)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                padding: '4px 10px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{email}</span>
              <ArrowRight size={12} color="var(--text-secondary)" />
            </a>
          </div>
        </div>

        {/* Resume Link Button */}
        <a
          href={resumeLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            transition: 'all 0.15s ease',
            width: 'fit-content',
            cursor: 'pointer'
          }}
          title="Open Resume"
        >
          <FileText size={15} color="var(--text-secondary)" />
          <span>Resume</span>
          <ExternalLink size={13} color="var(--text-muted)" />
        </a>
      </div>
    </section>
  );
};

const socialBtnStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'all 0.15s ease'
};

export default Hero;
