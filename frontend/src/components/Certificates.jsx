import React from 'react';
import { ExternalLink, Award, FileText } from 'lucide-react';

const defaultCertificates = [
  {
    name: "Principles of Generative AI Certification",
    organization: "Infosys Springboard",
    issueDate: "Jan 2026",
    description: "Covered Large Language Models (LLMs), Prompt Engineering, and RAG AI Application Architectures.",
    link: "#",
    file: ""
  },
  {
    name: "Artificial Intelligence Primer Certification",
    organization: "Infosys Springboard",
    issueDate: "Jan 2026",
    description: "Foundational certification covering Machine Learning algorithms, neural networks, and data pipelines.",
    link: "#",
    file: ""
  },
  {
    name: "React.js Developer Certification",
    organization: "GeeksforGeeks",
    issueDate: "May 2025",
    description: "Comprehensive hands-on certification in React.js, Custom Hooks, Redux/Context state management, and modern UI design.",
    link: "#",
    file: ""
  }
];

const Certificates = ({ certificates = [] }) => {
  const displayCertificates = certificates && certificates.length > 0 ? certificates : defaultCertificates;

  return (
    <section id="certificates" className="editorial-section">
      <div className="editorial-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <Award size={22} style={{ color: 'var(--text-primary)' }} />
          <h2 className="section-title" style={{ margin: 0 }}>Certificates</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {displayCertificates.map((cert, idx) => {
            const hasValidLink = cert.link && cert.link !== '#' && cert.link.trim() !== '';
            const hasValidFile = cert.file && cert.file.trim() !== '';

            return (
              <div key={cert._id || idx} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '18px 20px',
                transition: 'border-color 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                    {cert.name}
                  </h3>
                  {cert.issueDate && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {cert.issueDate}
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
                  {cert.organization}
                </h4>

                {cert.description && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: '1.5', marginBottom: (hasValidLink || hasValidFile) ? '12px' : '0' }}>
                    {cert.description}
                  </p>
                )}

                {/* Optional Certificate Link / Uploaded File Action Buttons */}
                {(hasValidLink || hasValidFile) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
                    {hasValidLink && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.75rem',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <ExternalLink size={12} />
                        View Credential Link
                      </a>
                    )}

                    {hasValidFile && (
                      <a
                        href={cert.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.75rem',
                          color: 'var(--text-primary)',
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontWeight: 500,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <FileText size={12} />
                        View Certificate File
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
