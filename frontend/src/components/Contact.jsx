import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import portfolioAPI from '../services/api';

const Contact = ({ personalInfo }) => {
  const {
    email = "sakshimehra072@gmail.com",
    phone = "+91 7717333507",
    location = "Punjab, India"
  } = personalInfo || {};

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: null, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: null, error: null });
    try {
      await portfolioAPI.sendMessage(formData);
      setStatus({ loading: false, success: 'Thank you! Your message has been sent successfully.', error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.response?.data?.message || 'Failed to send message. Please try again.' });
    }
  };

  return (
    <section id="contact" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Get in touch</h2>

        <div className="contact-grid">
          {/* Left Column: Direct Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={infoCardStyle}>
              <Mail size={16} color="var(--text-secondary)" />
              <div style={{ minWidth: 0, wordBreak: 'break-word' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</span>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{email}</h4>
              </div>
            </div>

            {phone && (
              <div style={infoCardStyle}>
                <Phone size={16} color="var(--text-secondary)" />
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</span>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{phone}</h4>
                </div>
              </div>
            )}

            <div style={infoCardStyle}>
              <MapPin size={16} color="var(--text-secondary)" />
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</span>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{location}</h4>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <form onSubmit={handleSubmit} style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {status.success && (
              <div className="toast-msg toast-success">
                <CheckCircle2 size={16} /> {status.success}
              </div>
            )}
            {status.error && (
              <div className="toast-msg toast-error">
                <AlertCircle size={16} /> {status.error}
              </div>
            )}

            <div className="contact-inputs-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="editorial-input"
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Your Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Sakshi@example.com"
                  className="editorial-input"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry..."
                className="editorial-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello, I'd like to discuss..."
                rows={4}
                className="editorial-input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status.loading}
              style={{
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-text)',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 20px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '4px',
                transition: 'opacity 0.15s ease'
              }}
            >
              <Send size={14} /> {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const infoCardStyle = {
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: '8px',
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

export default Contact;
