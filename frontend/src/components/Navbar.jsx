import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onOpenSearch }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-nav)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '14px 0',
      transition: 'all 0.25s ease'
    }}>
      <div className="editorial-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left Side Minimal Links */}
        <div className="nav-links-container" style={{ paddingRight: '8px' }}>
          {!isAdminPath ? (
            <>
              <a href="#" style={navLinkStyle}>Home</a>
              <a href="#skills" style={navLinkStyle}>Skills</a>
              <a href="#experience" style={navLinkStyle}>Experience</a>
              <a href="#education" style={navLinkStyle}>Education</a>
              <a href="#certificates" style={navLinkStyle}>Certificates</a>
              <a href="#writing" style={navLinkStyle}>Blog</a>
              <a href="#contact" style={navLinkStyle}>Contact</a>
            </>
          ) : (
            <Link to="/" style={navLinkStyle}>← Public Site</Link>
          )}
        </div>

        {/* Right Side Theme Toggle, Search & Admin Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Proper Search Bar */}
          <button
            id="search-modal-trigger"
            onClick={onOpenSearch}
            className="search-btn-responsive"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--text-muted)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}
            title="Search website"
          >
            <Search size={14} color="var(--text-secondary)" />
            <span className="search-btn-text" style={{ color: 'var(--text-muted)', flex: 1, fontSize: '0.78rem' }}>
              Search...
            </span>
          </button>

          <Link
            to={isAdminPath ? '/admin/dashboard' : '/admin/login'}
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              transition: 'color 0.15s ease'
            }}
            title="Admin Portal"
          >
            <ShieldCheck size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontSize: '0.8rem',
  fontWeight: 400,
  transition: 'color 0.15s ease'
};

export default Navbar;
