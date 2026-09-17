import React, { useState, useEffect } from 'react';
import { Search, X, FolderGit2, Briefcase, FileText, ArrowRight, Award } from 'lucide-react';

const SearchModal = ({ isOpen, onClose, data }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open search modal signal
          const searchBtn = document.getElementById('search-modal-trigger');
          if (searchBtn) searchBtn.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const projects = data?.projects || [];
  const experiences = data?.experiences || [];
  const certificates = data?.certificates || [];
  const writing = data?.writing || [];

  const filteredProjects = projects.filter(p =>
    p.title?.toLowerCase().includes(query.toLowerCase()) ||
    p.description?.toLowerCase().includes(query.toLowerCase()) ||
    p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredExperiences = experiences.filter(e =>
    e.company?.toLowerCase().includes(query.toLowerCase()) ||
    e.role?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCertificates = certificates.filter(c =>
    c.name?.toLowerCase().includes(query.toLowerCase()) ||
    c.organization?.toLowerCase().includes(query.toLowerCase()) ||
    c.description?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredWriting = writing.filter(w =>
    w.title?.toLowerCase().includes(query.toLowerCase()) ||
    w.excerpt?.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = filteredProjects.length + filteredExperiences.length + filteredCertificates.length + filteredWriting.length;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 'min(100px, 8vh)',
      paddingBottom: '20px',
      paddingLeft: '14px',
      paddingRight: '14px'
    }} onClick={onClose}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }} onClick={(e) => e.stopPropagation()}>
        {/* Search Input Field */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <Search size={18} color="var(--text-secondary)" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search projects, experience, writing... (Press Esc)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Search Results */}
        <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '12px 16px' }}>
          {query.trim() !== '' && totalResults === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No matching records found for "{query}"
            </div>
          )}

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Projects ({filteredProjects.length})
              </span>
              {filteredProjects.map(p => (
                <a
                  key={p._id || p.title}
                  href="#projects"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FolderGit2 size={15} color="var(--text-secondary)" />
                    <span>{p.title}</span>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </a>
              ))}
            </div>
          )}

          {/* Experience Results */}
          {filteredExperiences.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Experience ({filteredExperiences.length})
              </span>
              {filteredExperiences.map(e => (
                <a
                  key={e._id || e.company}
                  href="#experience"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Briefcase size={15} color="var(--text-secondary)" />
                    <span>{e.company} — <span style={{ color: 'var(--text-secondary)' }}>{e.role}</span></span>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </a>
              ))}
            </div>
          )}

          {/* Certificates Results */}
          {filteredCertificates.length > 0 && (
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Certificates ({filteredCertificates.length})
              </span>
              {filteredCertificates.map(c => (
                <a
                  key={c._id || c.name}
                  href="#certificates"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award size={15} color="var(--text-secondary)" />
                    <span>{c.name} — <span style={{ color: 'var(--text-secondary)' }}>{c.organization}</span></span>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </a>
              ))}
            </div>
          )}

          {/* Writing Results */}
          {filteredWriting.length > 0 && (
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Writing ({filteredWriting.length})
              </span>
              {filteredWriting.map(w => (
                <a
                  key={w._id || w.title}
                  href="#writing"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={15} color="var(--text-secondary)" />
                    <span>{w.title}</span>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>Quick search engine</span>
          <span>Press <strong>Esc</strong> to exit</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
