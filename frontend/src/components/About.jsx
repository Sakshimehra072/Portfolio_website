import React from 'react';
import { MapPin, Mail } from 'lucide-react';

const About = ({ personalInfo }) => {
  const {
    bio = "Passionate full-stack developer dedicated to crafting clean, high-performance web applications, intuitive interfaces, and robust backend architectures.",
    email = "sakshi.dev@example.com",
    location = "Greater Noida, India"
  } = personalInfo || {};

  return (
    <section id="about" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">About</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '24px' }}>
          {bio}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={infoPillStyle}>
            <MapPin size={15} color="var(--text-secondary)" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
              <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>{location}</strong>
            </div>
          </div>
          <div style={infoPillStyle}>
            <Mail size={15} color="var(--text-secondary)" />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Email</span>
              <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>{email}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const infoPillStyle = {
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  padding: '12px 14px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

export default About;
