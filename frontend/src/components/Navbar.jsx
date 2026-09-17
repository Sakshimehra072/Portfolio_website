import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onOpenSearch }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopPrimaryNav = [
    { label: 'Home', href: '#' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const remainingNav = [
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Blog', href: '#writing' },
    { label: 'Gallery', href: '#gallery' },
  ];

  const allNav = [
    ...desktopPrimaryNav,
    ...remainingNav
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-nav)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '12px 0',
      transition: 'all 0.25s ease'
    }}>
      <div className="editorial-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Left Side Header Links */}
        {!isAdminPath ? (
          <div className="header-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            {desktopPrimaryNav.map((item) => (
              <a key={item.label} href={item.href} style={navLinkStyle}>
                {item.label}
              </a>
            ))}
          </div>
        ) : (
          <Link to="/" style={navLinkStyle}>← Public Site</Link>
        )}

        {/* Right Side Controls: Theme Toggle, Search & Hamburger Icon Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              width: '32px',
              height: '32px',
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

          {/* Search Bar */}
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

          {/* Hamburger Icon Button (Icon ONLY, placed on the Right Side) */}
          {!isAdminPath && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Hamburger Dropdown Menu Drawer */}
      {mobileMenuOpen && !isAdminPath && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
          padding: '16px 20px',
          animation: 'slideDownNav 0.2s ease',
          zIndex: 99
        }}>
          <div className="editorial-container">
            {/* Mobile View: Show all links */}
            <div className="header-mobile-menu-links">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                Navigation Menu
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
                {allNav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    style={{
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.15s ease',
                      display: 'block'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop View: Show remaining links */}
            <div className="header-desktop-menu-links">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                More Sections
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
                {remainingNav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleNavClick}
                    style={{
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.15s ease',
                      display: 'block'
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const navLinkStyle = {
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  fontSize: '0.82rem',
  fontWeight: 400,
  transition: 'color 0.15s ease'
};

export default Navbar;
