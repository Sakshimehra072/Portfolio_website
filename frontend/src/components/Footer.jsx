import React from 'react';
import { Github, Twitter, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer = ({ name = "Sakshi" }) => {
  return (
    <footer style={{
      padding: '40px 0 28px 0',
      borderTop: '1px solid var(--border-color)',
      marginTop: '20px'
    }}>
      <div className="editorial-container">
        {/* Navigation & Contact Two-Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          marginBottom: '36px'
        }}>
          {/* Left Column: Navigate */}
          <div>
            <h4 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
              Navigate
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '0.8rem'
            }}>
              <a href="#" style={footerLinkStyle}>Home</a>
              <a href="#experience" style={footerLinkStyle}>Experience</a>
              <a href="#projects" style={footerLinkStyle}>Projects</a>
              <a href="#" style={footerLinkStyle}>Resume</a>
              <a href="#writing" style={footerLinkStyle}>Writing</a>
              <a href="#gallery" style={footerLinkStyle}>Gallery</a>
              <a href="#" style={footerLinkStyle}>100-List</a>
              <a href="#" style={footerLinkStyle}>Movies</a>
            </div>
          </div>

          {/* Right Column: Contact */}
          <div>
            <h4 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={socialIconStyle} title="GitHub">
                <Github size={15} color="var(--text-secondary)" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={socialIconStyle} title="X">
                <Twitter size={15} color="var(--text-secondary)" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={socialIconStyle} title="LinkedIn">
                <Linkedin size={15} color="var(--text-secondary)" />
              </a>
              <a href="mailto:sakshi.dev@example.com" style={socialIconStyle} title="Email">
                <Mail size={15} color="var(--text-secondary)" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={socialIconStyle} title="Instagram">
                <Instagram size={15} color="var(--text-secondary)" />
              </a>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Open for full-stack opportunities and technical advisory.
            </p>
          </div>
        </div>

        {/* Bottom Utility Links & Copyright */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Sitemap</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>RSS</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>AI Summary</a>
            <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Humans</a>
          </div>

          <span>© 2026 {name}</span>
        </div>
      </div>
    </footer>
  );
};

const footerLinkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  transition: 'color 0.15s ease'
};

const socialIconStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '6px',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none'
};

export default Footer;
