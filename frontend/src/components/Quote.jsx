import React from 'react';
import { Quote as QuoteIcon } from 'lucide-react';

const Quote = ({ quote }) => {
  const text = quote?.text || "What we do in life echoes in eternity.";
  const author = quote?.author || "Maximus, Gladiator";

  return (
    <section className="editorial-section">
      <div className="editorial-container">
        <div style={{
          position: 'relative',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '24px 20px',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* Subtle background quotation mark */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '15px',
            opacity: 0.05,
            pointerEvents: 'none',
            color: 'var(--text-primary)'
          }}>
            <QuoteIcon size={90} />
          </div>

          <p style={{
            fontStyle: 'italic',
            fontSize: '0.92rem',
            color: 'var(--text-primary)',
            lineHeight: '1.6',
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1
          }}>
            “{text}”
          </p>

          <span style={{
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            fontWeight: 500,
            position: 'relative',
            zIndex: 1
          }}>
            — {author}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Quote;
