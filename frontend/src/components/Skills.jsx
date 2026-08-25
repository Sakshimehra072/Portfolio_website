import React, { useState } from 'react';

const Skills = ({ skills = [] }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  if (!skills || skills.length === 0) return null;

  const categories = ['All', ...new Set(skills.map(s => s.category).filter(Boolean))];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Tech Stack & Skills</h2>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '5px 14px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: activeCategory === cat ? 600 : 400,
                cursor: 'pointer',
                border: '1px solid ' + (activeCategory === cat ? 'var(--text-primary)' : 'var(--border-color)'),
                background: activeCategory === cat ? 'var(--border-color)' : 'var(--bg-secondary)',
                color: activeCategory === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Badges Wrapping Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {filteredSkills.map(skill => {
            const hasIcon = skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('data:'));
            const hasProficiency = skill.proficiency !== undefined && skill.proficiency !== null && skill.proficiency !== '';

            return (
              <div key={skill._id || skill.name} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}>
                {hasIcon && (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <span style={{ fontWeight: 500 }}>{skill.name}</span>
                {hasProficiency && (
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-tertiary)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>{skill.proficiency}%</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
