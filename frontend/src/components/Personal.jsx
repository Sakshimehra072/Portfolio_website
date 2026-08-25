import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const personalItems = [
  {
    title: "Gallery",
    description: "A small collection of photos, people, and everyday moments.",
    link: "#gallery"
  },
  {
    title: "The 100 List",
    description: "A living ledger of ambition. Things to build, experience, and achieve.",
    link: "#"
  },
  {
    title: "Favorite Movies",
    description: "Catalysts for perspective. Films that shape how I see the world.",
    link: "#"
  }
];

const Personal = () => {
  return (
    <section id="personal" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Personal</h2>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {personalItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              style={{
                padding: '14px 0',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                textDecoration: 'none',
                transition: 'opacity 0.15s ease'
              }}
            >
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ color: 'var(--text-muted)' }}>
                <ArrowUpRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Personal;
