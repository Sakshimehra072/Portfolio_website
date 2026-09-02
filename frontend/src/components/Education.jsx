import React from 'react';

const defaultEducation = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Lovely Professional University, Punjab",
    location: "Punjab, India",
    duration: "Aug 2023 – May 2025",
    details: "CGPA 7.2 | Specialization in Full Stack Engineering, Web Architectures, and Database Systems."
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Shanti Devi Arya Mahila College, Dinanagar",
    location: "Punjab, India",
    duration: "Aug 2019 – May 2022",
    details: "81% | Foundation in Computer Applications, Data Structures, and Software Development."
  }
];

const Education = ({ education = [] }) => {
  const displayEducation = education && education.length > 0 ? education : defaultEducation;

  return (
    <section id="education" className="editorial-section">
      <div className="editorial-container">
        <h2 className="section-title">Education</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {displayEducation.map((edu, idx) => (
            <div key={edu._id || idx} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '18px 20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{edu.degree}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {edu.duration}
                </span>
              </div>
              <h4 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                {edu.institution} {edu.location && `• ${edu.location}`}
              </h4>
              {edu.details && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  {edu.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
