import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Github,
  Globe,
  X,
  Menu,
  Upload,
  Image as ImageIcon,
  Sun,
  Moon,
  FileText,
  Quote as QuoteIcon,
  Award
} from 'lucide-react';
import portfolioAPI from '../services/api';
import { useTheme } from '../context/ThemeContext';

const SKILL_ICON_PRESETS = [
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

const TAB_LABELS = {
  overview: 'Overview',
  info: 'Personal Info',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  certificates: 'Certificates',
  writing: 'Writing / Blogs',
  gallery: 'Photo Gallery',
  quote: 'Quote',
  messages: 'Messages'
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: {},
    skills: [],
    projects: [],
    experiences: [],
    education: [],
    certificates: []
  });
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ type: null, msg: '' });

  // Modal States
  const [modalState, setModalState] = useState({ open: false, type: null, data: null });

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [portRes, msgRes] = await Promise.all([
        portfolioAPI.getPortfolio(),
        portfolioAPI.getMessages()
      ]);
      setPortfolioData(portRes.data);
      setMessages(msgRes.data || []);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast({ type: null, msg: '' }), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    navigate('/admin/login');
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      showNotification('error', 'File size exceeds 8MB. Please select a smaller image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPortfolioData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: reader.result
        }
      }));
      showNotification('success', `${field === 'avatar' ? 'Avatar' : 'Banner'} image uploaded! Click 'Save Personal Information' to persist.`);
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showNotification('error', 'File size exceeds 10MB. Please select a smaller file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPortfolioData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          resumeLink: reader.result
        }
      }));
      showNotification('success', 'Resume file uploaded! Click "Save Personal Information" to persist.');
    };
    reader.readAsDataURL(file);
  };

  // --- Handlers for Personal Info Update ---
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    try {
      await portfolioAPI.updatePersonalInfo(portfolioData.personalInfo);
      showNotification('success', 'Personal information & bio updated successfully!');
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Failed to update personal information');
    }
  };

  // --- CRUD Handlers for Skills ---
  const handleSaveSkill = async (skillData) => {
    try {
      if (skillData._id) {
        await portfolioAPI.updateSkill(skillData._id, skillData);
        showNotification('success', 'Skill updated successfully!');
      } else {
        await portfolioAPI.createSkill(skillData);
        showNotification('success', 'New skill created!');
      }
      setModalState({ open: false, type: null, data: null });
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await portfolioAPI.deleteSkill(id);
      showNotification('success', 'Skill deleted successfully');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete skill');
    }
  };

  // --- CRUD Handlers for Projects ---
  const handleSaveProject = async (projectData) => {
    try {
      const payload = {
        ...projectData,
        tags: typeof projectData.tags === 'string'
          ? projectData.tags.split(',').map(t => t.trim()).filter(Boolean)
          : projectData.tags,
        keyFeatures: typeof projectData.keyFeatures === 'string'
          ? projectData.keyFeatures.split('\n').map(f => f.trim()).filter(Boolean)
          : projectData.keyFeatures
      };

      if (projectData._id) {
        await portfolioAPI.updateProject(projectData._id, payload);
        showNotification('success', 'Project updated successfully!');
      } else {
        await portfolioAPI.createProject(payload);
        showNotification('success', 'New project created!');
      }
      setModalState({ open: false, type: null, data: null });
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await portfolioAPI.deleteProject(id);
      showNotification('success', 'Project deleted successfully');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete project');
    }
  };

  // --- CRUD Handlers for Experience ---
  const handleSaveExperience = async (expData) => {
    try {
      const payload = {
        ...expData,
        highlights: typeof expData.highlights === 'string'
          ? expData.highlights.split('\n').map(h => h.trim()).filter(Boolean)
          : expData.highlights
      };

      if (expData._id) {
        await portfolioAPI.updateExperience(expData._id, payload);
        showNotification('success', 'Experience entry updated!');
      } else {
        await portfolioAPI.createExperience(payload);
        showNotification('success', 'New experience entry created!');
      }
      setModalState({ open: false, type: null, data: null });
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await portfolioAPI.deleteExperience(id);
      showNotification('success', 'Experience entry deleted successfully');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete experience entry');
    }
  };

  // --- CRUD Handlers for Education ---
  const handleSaveEducation = async (eduData) => {
    try {
      if (eduData._id) {
        await portfolioAPI.updateEducation(eduData._id, eduData);
        showNotification('success', 'Education entry updated!');
      } else {
        await portfolioAPI.createEducation(eduData);
        showNotification('success', 'New education entry created!');
      }
      setModalState({ open: false, type: null, data: null });
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await portfolioAPI.deleteEducation(id);
      showNotification('success', 'Education entry deleted successfully');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete education entry');
    }
  };

  // --- CRUD Handlers for Certificates ---
  const handleSaveCertificate = async (certData) => {
    try {
      if (certData._id) {
        await portfolioAPI.updateCertificate(certData._id, certData);
        showNotification('success', 'Certificate entry updated successfully!');
      } else {
        await portfolioAPI.createCertificate(certData);
        showNotification('success', 'New certificate entry created!');
      }
      setModalState({ open: false, type: null, data: null });
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await portfolioAPI.deleteCertificate(id);
      showNotification('success', 'Certificate entry deleted successfully');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete certificate entry');
    }
  };

  // --- CRUD Handlers for Writing / Blogs ---
  const handleSaveWriting = async (writingData) => {
    try {
      if (writingData._id) {
        await portfolioAPI.updateWriting(writingData._id, writingData);
        showNotification('success', 'Writing article updated successfully!');
      } else {
        await portfolioAPI.createWriting(writingData);
        showNotification('success', 'New article published!');
      }
      setModalState({ open: false, type: null, data: null });
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDeleteWriting = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await portfolioAPI.deleteWriting(id);
      showNotification('success', 'Writing article deleted successfully');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete article');
    }
  };

  // --- Message Delete Handler ---
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await portfolioAPI.deleteMessage(id);
      showNotification('success', 'Message deleted');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete message');
    }
  };

  // --- CRUD Handlers for Gallery Photos ---
  const handleSaveGalleryItem = async (galleryData) => {
    try {
      if (galleryData._id) {
        await portfolioAPI.updateGalleryItem(galleryData._id, galleryData);
        showNotification('success', 'Gallery photo updated successfully!');
      } else {
        await portfolioAPI.createGalleryItem(galleryData);
        showNotification('success', 'New photo added to gallery!');
      }
      setModalState({ open: false, type: null, data: null });
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Failed to save photo');
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo from the gallery?')) return;
    try {
      await portfolioAPI.deleteGalleryItem(id);
      showNotification('success', 'Gallery photo deleted successfully');
      fetchData();
    } catch (err) {
      showNotification('error', 'Failed to delete gallery photo');
    }
  };

  // --- Handler for Favorite Quote Update ---
  const handleSaveQuote = async (e) => {
    e.preventDefault();
    try {
      await portfolioAPI.updateQuote(portfolioData.quote || {});
      showNotification('success', 'Favorite quote updated successfully!');
      fetchData();
    } catch (err) {
      showNotification('error', err.response?.data?.message || 'Failed to update quote');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        Loading Admin Hub...
      </div>
    );
  }

  const { personalInfo = {}, quote = {}, skills = [], projects = [], experiences = [], education = [], certificates = [], writing = [], gallery = [] } = portfolioData;

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Mobile Top Header Bar with Hamburger Menu Button */}
      <header className="admin-mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Admin Hub</h2>
          <span style={{ fontSize: '0.7rem', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 500 }}>
            {TAB_LABELS[activeTab] || activeTab}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              padding: '6px 10px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div className="admin-mobile-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Slide-down Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="admin-mobile-drawer">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <SidebarTab icon={<LayoutDashboard size={16} />} label="Overview" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<User size={16} />} label="Personal Info" active={activeTab === 'info'} onClick={() => { setActiveTab('info'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<Cpu size={16} />} label="Skills" count={skills.length} active={activeTab === 'skills'} onClick={() => { setActiveTab('skills'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<Briefcase size={16} />} label="Experience" count={experiences.length} active={activeTab === 'experience'} onClick={() => { setActiveTab('experience'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<FolderGit2 size={16} />} label="Projects" count={projects.length} active={activeTab === 'projects'} onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<GraduationCap size={16} />} label="Education" count={education.length} active={activeTab === 'education'} onClick={() => { setActiveTab('education'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<Award size={16} />} label="Certificates" count={certificates.length} active={activeTab === 'certificates'} onClick={() => { setActiveTab('certificates'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<FileText size={16} />} label="Writing / Blogs" count={writing.length} active={activeTab === 'writing'} onClick={() => { setActiveTab('writing'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<ImageIcon size={16} />} label="Photo Gallery" count={gallery.length} active={activeTab === 'gallery'} onClick={() => { setActiveTab('gallery'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<QuoteIcon size={16} />} label="Quote" active={activeTab === 'quote'} onClick={() => { setActiveTab('quote'); setIsMobileMenuOpen(false); }} />
            <SidebarTab icon={<Mail size={16} />} label="Messages" count={messages.length} active={activeTab === 'messages'} onClick={() => { setActiveTab('messages'); setIsMobileMenuOpen(false); }} />
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '6px' }}>
              <Globe size={14} /> Public Website
            </Link>
            <button
              onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: '#f87171',
                padding: '8px 12px',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="admin-sidebar" style={{
        background: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        {/* Brand */}
        <div style={{ marginBottom: '20px', paddingLeft: '8px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Admin Hub</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Management Portal</span>
        </div>

        {/* Tab Items */}
        <nav className="admin-nav-tabs" style={{ flexGrow: 1 }}>
          <SidebarTab icon={<LayoutDashboard size={16} />} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarTab icon={<User size={16} />} label="Personal Info" active={activeTab === 'info'} onClick={() => setActiveTab('info')} />
          <SidebarTab icon={<Cpu size={16} />} label="Skills" count={skills.length} active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
          <SidebarTab icon={<Briefcase size={16} />} label="Experience" count={experiences.length} active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
          <SidebarTab icon={<FolderGit2 size={16} />} label="Projects" count={projects.length} active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <SidebarTab icon={<GraduationCap size={16} />} label="Education" count={education.length} active={activeTab === 'education'} onClick={() => setActiveTab('education')} />
          <SidebarTab icon={<Award size={16} />} label="Certificates" count={certificates.length} active={activeTab === 'certificates'} onClick={() => setActiveTab('certificates')} />
          <SidebarTab icon={<FileText size={16} />} label="Writing / Blogs" count={writing.length} active={activeTab === 'writing'} onClick={() => setActiveTab('writing')} />
          <SidebarTab icon={<ImageIcon size={16} />} label="Photo Gallery" count={gallery.length} active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
          <SidebarTab icon={<QuoteIcon size={16} />} label="Quote" active={activeTab === 'quote'} onClick={() => setActiveTab('quote')} />
          <SidebarTab icon={<Mail size={16} />} label="Messages" count={messages.length} active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
        </nav>

        {/* Quick Links, Theme Toggle & Logout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              padding: '6px 12px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
            </div>
          </button>

          <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '6px', transition: 'color 0.15s ease' }}>
            <Globe size={14} /> Public Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              padding: '6px 12px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
              e.currentTarget.style.color = '#f87171';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#8A8A8A';
            }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main" style={{ flexGrow: 1 }}>
        {/* Toast Alert */}
        {toast.msg && (
          <div className={`toast-msg ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`} style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 2000 }}>
            {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Dashboard Overview
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Quick statistics and content summary of your portfolio.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <StatCard title="Total Projects" value={projects.length} icon={<FolderGit2 size={20} color="var(--text-secondary)" />} />
              <StatCard title="Blog Posts" value={writing.length} icon={<FileText size={20} color="var(--text-secondary)" />} />
              <StatCard title="Tech Skills" value={skills.length} icon={<Cpu size={20} color="var(--text-secondary)" />} />
              <StatCard title="Work Experience" value={experiences.length} icon={<Briefcase size={20} color="var(--text-secondary)" />} />
              <StatCard title="Academic Entries" value={education.length} icon={<GraduationCap size={20} color="var(--text-secondary)" />} />
              <StatCard title="Certificates" value={certificates.length} icon={<Award size={20} color="var(--text-secondary)" />} />
              <StatCard title="Messages Inbox" value={messages.length} icon={<Mail size={20} color="var(--text-secondary)" />} />
            </div>

            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
                Quick Actions
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <button onClick={() => setModalState({ open: true, type: 'project', data: null })} style={primaryBtnStyle}>
                  <Plus size={14} /> Add New Project
                </button>
                <button onClick={() => setModalState({ open: true, type: 'writing', data: null })} style={secondaryBtnStyle}>
                  <Plus size={14} /> Add Blog Post
                </button>
                <button onClick={() => setModalState({ open: true, type: 'skill', data: null })} style={secondaryBtnStyle}>
                  <Plus size={14} /> Add New Skill
                </button>
                <button onClick={() => setModalState({ open: true, type: 'experience', data: null })} style={secondaryBtnStyle}>
                  <Plus size={14} /> Add Experience
                </button>
                <button onClick={() => setModalState({ open: true, type: 'education', data: null })} style={secondaryBtnStyle}>
                  <Plus size={14} /> Add Education
                </button>
                <button onClick={() => setModalState({ open: true, type: 'certificate', data: null })} style={secondaryBtnStyle}>
                  <Plus size={14} /> Add Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PERSONAL INFO & INTRO */}
        {activeTab === 'info' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Personal Information & Bio
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Update your public developer identity, cover banner, circular avatar, bio paragraphs, and social profiles.
              </p>
            </div>

            <div className="admin-info-grid">
              {/* Left Column: Form Controls */}
              <form onSubmit={handleSaveInfo} style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                  Identity & Bio
                </h3>

                <div className="admin-form-row-2col">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Full Name *</label>
                    <input
                      type="text"
                      value={personalInfo.name || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, name: e.target.value } })}
                      className="editorial-input"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Subtitle Badge</label>
                    <input
                      type="text"
                      value={personalInfo.subtitle || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, subtitle: e.target.value } })}
                      className="editorial-input"
                      placeholder="Enter subtitle or title"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Primary Bio / Tagline</label>
                  <textarea
                    value={personalInfo.bio1 || personalInfo.bio || ''}
                    onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, bio1: e.target.value, bio: e.target.value } })}
                    className="editorial-input"
                    rows={5}
                    placeholder="Enter primary bio or tagline..."
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Secondary Bio Paragraph</label>
                  <textarea
                    value={personalInfo.bio2 || ''}
                    onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, bio2: e.target.value } })}
                    className="editorial-input"
                    rows={4}
                    placeholder="Enter secondary bio paragraph..."
                  />
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E5E5E5', paddingTop: '12px', paddingBottom: '8px', borderBottom: '1px solid #1A1A1A' }}>
                  Media & Assets (Image Upload)
                </h3>

                <div className="admin-form-row-2col">
                  {/* Avatar Upload Control */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ImageIcon size={14} /> Avatar Profile Image
                    </label>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: '#121212',
                      border: '1px solid #1A1A1A',
                      borderRadius: '8px',
                      padding: '10px 14px'
                    }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        background: '#1A1A1A',
                        flexShrink: 0,
                        border: '1px solid #242424'
                      }}>
                        <img
                          src={personalInfo.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                          alt="Avatar"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="avatar-file-input"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, 'avatar')}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('avatar-file-input').click()}
                          style={{
                            background: '#1A1A1A',
                            border: '1px solid #242424',
                            borderRadius: '6px',
                            color: '#E5E5E5',
                            padding: '6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            width: 'fit-content',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#333333'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#242424'}
                        >
                          <Upload size={13} /> Upload Avatar Image
                        </button>
                        <span style={{ fontSize: '0.7rem', color: '#555555' }}>Supports PNG, JPG, WebP</span>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={personalInfo.avatar || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, avatar: e.target.value } })}
                      className="editorial-input"
                      placeholder="Or paste image URL (https://...)"
                      style={{ fontSize: '0.78rem' }}
                    />
                  </div>

                  {/* Banner Upload Control */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ImageIcon size={14} /> Cover Banner Image
                    </label>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: '#121212',
                      border: '1px solid #1A1A1A',
                      borderRadius: '8px',
                      padding: '10px 14px'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '42px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        background: '#1A1A1A',
                        flexShrink: 0,
                        border: '1px solid #242424'
                      }}>
                        <img
                          src={personalInfo.banner || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'}
                          alt="Banner"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                        <input
                          type="file"
                          accept="image/*"
                          id="banner-file-input"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(e, 'banner')}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('banner-file-input').click()}
                          style={{
                            background: '#1A1A1A',
                            border: '1px solid #242424',
                            borderRadius: '6px',
                            color: '#E5E5E5',
                            padding: '6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 500,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            width: 'fit-content',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#333333'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#242424'}
                        >
                          <Upload size={13} /> Upload Banner Image
                        </button>
                        <span style={{ fontSize: '0.7rem', color: '#555555' }}>Supports PNG, JPG, WebP</span>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={personalInfo.banner || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, banner: e.target.value } })}
                      className="editorial-input"
                      placeholder="Or paste image URL (https://...)"
                      style={{ fontSize: '0.78rem' }}
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E5E5E5', paddingTop: '12px', paddingBottom: '8px', borderBottom: '1px solid #1A1A1A' }}>
                  Contact Information & Location
                </h3>

                <div className="admin-form-row-2col">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Email Address *</label>
                    <input
                      type="email"
                      value={personalInfo.email || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, email: e.target.value } })}
                      className="editorial-input"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Mobile / Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={personalInfo.phone || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, phone: e.target.value } })}
                      className="editorial-input"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Location</label>
                    <input
                      type="text"
                      value={personalInfo.location || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, location: e.target.value } })}
                      className="editorial-input"
                      placeholder="Enter location"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>Handle / Username</label>
                    <input
                      type="text"
                      value={personalInfo.handle || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, handle: e.target.value } })}
                      className="editorial-input"
                      placeholder="Enter handle or username"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={14} /> Resume (File Upload & Link)
                  </label>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#121212',
                    border: '1px solid #1A1A1A',
                    borderRadius: '8px',
                    padding: '10px 14px'
                  }}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf"
                      id="resume-file-input"
                      style={{ display: 'none' }}
                      onChange={(e) => handleResumeUpload(e)}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('resume-file-input').click()}
                      style={{
                        background: '#1A1A1A',
                        border: '1px solid #242424',
                        borderRadius: '6px',
                        color: '#E5E5E5',
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#333333'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#242424'}
                    >
                      <Upload size={13} /> Upload Resume File
                    </button>
                    <span style={{ fontSize: '0.7rem', color: '#555555' }}>Supports PDF, DOC, DOCX (Max 10MB)</span>
                  </div>

                  <input
                    type="text"
                    value={personalInfo.resumeLink || ''}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      personalInfo: { ...personalInfo, resumeLink: e.target.value }
                    })}
                    className="editorial-input"
                    placeholder="Or paste Resume URL (https://...)"
                    style={{ fontSize: '0.78rem' }}
                  />
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E5E5E5', paddingTop: '12px', paddingBottom: '8px', borderBottom: '1px solid #1A1A1A' }}>
                  Social Links
                </h3>

                <div className="admin-form-row-3col">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>GitHub</label>
                    <input
                      type="text"
                      value={personalInfo.socials?.github || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, socials: { ...personalInfo.socials, github: e.target.value } } })}
                      className="editorial-input"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>LeetCode</label>
                    <input
                      type="text"
                      value={personalInfo.socials?.leetcode || personalInfo.socials?.twitter || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, socials: { ...personalInfo.socials, leetcode: e.target.value, twitter: e.target.value } } })}
                      className="editorial-input"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#8A8A8A', fontWeight: 500 }}>LinkedIn</label>
                    <input
                      type="text"
                      value={personalInfo.socials?.linkedin || ''}
                      onChange={(e) => setPortfolioData({ ...portfolioData, personalInfo: { ...personalInfo, socials: { ...personalInfo.socials, linkedin: e.target.value } } })}
                      className="editorial-input"
                    />
                  </div>
                </div>                <button
                  type="submit"
                  style={{
                    marginTop: '12px',
                    background: '#E5E5E5',
                    color: '#080808',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 24px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'opacity 0.15s ease'
                  }}
                >
                  <Save size={16} /> Save Personal Information
                </button>
              </form>

              {/* Right Column: Live Portfolio Card Preview (Top Right Side) */}
              <div className="admin-preview-card">
                <span style={{ fontSize: '0.72rem', color: '#555555', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                  Live Portfolio Preview
                </span>

                {/* Banner & Avatar Preview */}
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <div style={{ width: '100%', height: '80px', borderRadius: '6px', overflow: 'hidden', background: '#141414', border: '1px solid #1A1A1A' }}>
                    <img
                      src={personalInfo.banner || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"}
                      alt="Banner Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                    />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-14px',
                    left: '14px',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    border: '2px solid #0D0D0D',
                    overflow: 'hidden',
                    background: '#141414'
                  }}>
                    <img
                      src={personalInfo.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"}
                      alt="Avatar Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* Developer Identity */}
                <div style={{ marginTop: '20px', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#E5E5E5' }}>
                    {personalInfo.name || 'Sakshi'}
                  </h4>
                  <span style={{ fontSize: '0.78rem', color: '#8A8A8A', display: 'block' }}>
                    {personalInfo.subtitle || 'Engineer · Developer · 988id of Code'}
                  </span>
                </div>

                {/* Bio snippet */}
                <p style={{ fontSize: '0.8rem', color: '#8A8A8A', lineHeight: '1.5', marginBottom: '14px' }}>
                  {personalInfo.bio1 || personalInfo.bio || 'I think in systems, not just syntax...'}
                </p>

                {/* Resume Link Preview Button */}
                <a
                  href={personalInfo.resumeLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: '#121212',
                    border: '1px solid #1A1A1A',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    color: '#E5E5E5',
                    textDecoration: 'none',
                    width: 'fit-content'
                  }}
                >
                  <FileText size={14} color="#8A8A8A" />
                  <span>Resume</span>
                  <ExternalLink size={12} color="#8A8A8A" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === 'skills' && (
          <div>
            <div className="admin-header-flex">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#E5E5E5', marginBottom: '4px' }}>Manage Technical Skills</h1>
                <p style={{ color: '#8A8A8A', fontSize: '0.85rem' }}>Add, edit, or delete technology skill badges.</p>
              </div>
              <button onClick={() => setModalState({ open: true, type: 'skill', data: null })} style={primaryBtnStyle}>
                <Plus size={14} /> Add Skill
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
              {skills.map(skill => (
                <div key={skill._id} style={{
                  background: '#0D0D0D',
                  border: '1px solid #1A1A1A',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {skill.icon && (skill.icon.startsWith('http') || skill.icon.startsWith('data:')) ? (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          style={{ width: '28px', height: '28px', objectFit: 'contain', borderRadius: '4px' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          background: '#1A1A1A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#8A8A8A'
                        }}>
                          <Cpu size={16} />
                        </div>
                      )}
                      <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E5E5E5' }}>{skill.name}</h3>
                        <span style={{ fontSize: '0.72rem', color: '#8A8A8A', background: '#121212', padding: '2px 8px', borderRadius: '4px', border: '1px solid #1A1A1A', display: 'inline-block', marginTop: '4px' }}>
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => setModalState({ open: true, type: 'skill', data: skill })} style={iconBtnStyle} title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteSkill(skill._id)} style={{ ...iconBtnStyle, color: '#f87171' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {skill.proficiency !== undefined && skill.proficiency !== null && skill.proficiency !== '' && (
                    <div style={{ fontSize: '0.78rem', color: '#8A8A8A' }}>Proficiency: {skill.proficiency}%</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            <div className="admin-header-flex">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#E5E5E5', marginBottom: '4px' }}>Manage Projects</h1>
                <p style={{ color: '#8A8A8A', fontSize: '0.85rem' }}>Showcase and update your portfolio project items.</p>
              </div>
              <button onClick={() => setModalState({ open: true, type: 'project', data: null })} style={primaryBtnStyle}>
                <Plus size={14} /> Add Project
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {projects.map(proj => (
                <div key={proj._id} style={{
                  background: '#0D0D0D',
                  border: '1px solid #1A1A1A',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ height: '110px', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px', border: '1px solid #1A1A1A', background: '#141414' }}>
                    <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E5E5E5' }}>{proj.title}</h3>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => setModalState({ open: true, type: 'project', data: proj })} style={iconBtnStyle} title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteProject(proj._id)} style={{ ...iconBtnStyle, color: '#f87171' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#8A8A8A', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {proj.tags && proj.tags.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.7rem', background: '#121212', padding: '2px 6px', borderRadius: '4px', color: '#555555', border: '1px solid #1A1A1A' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div>
            <div className="admin-header-flex">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#E5E5E5', marginBottom: '4px' }}>Manage Work Experience</h1>
                <p style={{ color: '#8A8A8A', fontSize: '0.85rem' }}>Update your career history and job roles.</p>
              </div>
              <button onClick={() => setModalState({ open: true, type: 'experience', data: null })} style={primaryBtnStyle}>
                <Plus size={14} /> Add Experience
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experiences.map(exp => (
                <div key={exp._id} style={{
                  background: '#0D0D0D',
                  border: '1px solid #1A1A1A',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#E5E5E5' }}>{exp.role}</h3>
                      <h4 style={{ fontSize: '0.85rem', color: '#8A8A8A', marginTop: '2px' }}>{exp.company} • {exp.duration}</h4>
                      {exp.location && <span style={{ fontSize: '0.75rem', color: '#555555', display: 'block', marginTop: '2px' }}>{exp.location}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => setModalState({ open: true, type: 'experience', data: exp })} style={iconBtnStyle} title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteExperience(exp._id)} style={{ ...iconBtnStyle, color: '#f87171' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: EDUCATION */}
        {activeTab === 'education' && (
          <div>
            <div className="admin-header-flex">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#E5E5E5', marginBottom: '4px' }}>Manage Education</h1>
                <p style={{ color: '#8A8A8A', fontSize: '0.85rem' }}>Academic degrees, institutions, and certifications.</p>
              </div>
              <button onClick={() => setModalState({ open: true, type: 'education', data: null })} style={primaryBtnStyle}>
                <Plus size={14} /> Add Education
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {education.map(edu => (
                <div key={edu._id} style={{
                  background: '#0D0D0D',
                  border: '1px solid #1A1A1A',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#E5E5E5' }}>{edu.degree}</h3>
                      <h4 style={{ fontSize: '0.85rem', color: '#8A8A8A', marginTop: '2px' }}>{edu.institution} ({edu.duration})</h4>
                      <p style={{ color: '#555555', fontSize: '0.8rem', marginTop: '6px' }}>{edu.details}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => setModalState({ open: true, type: 'education', data: edu })} style={iconBtnStyle} title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteEducation(edu._id)} style={{ ...iconBtnStyle, color: '#f87171' }} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div>
            <div className="admin-header-flex">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Manage Certificates</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Add, edit, or remove certificates, awards, and credentials.</p>
              </div>
              <button onClick={() => setModalState({ open: true, type: 'certificate', data: null })} style={primaryBtnStyle}>
                <Plus size={14} /> Add Certificate
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {certificates.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  No certificates found. Click "+ Add Certificate" to add your first entry.
                </div>
              ) : (
                certificates.map(cert => (
                  <div key={cert._id} style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{cert.name}</h3>
                          {cert.issueDate && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                              {cert.issueDate}
                            </span>
                          )}
                        </div>
                        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          {cert.organization}
                        </h4>
                        {cert.description && (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px', lineHeight: '1.5' }}>
                            {cert.description}
                          </p>
                        )}
                        {(cert.link || cert.file) && (
                          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                            {cert.link && cert.link !== '#' && (
                              <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <ExternalLink size={12} /> View Link
                              </a>
                            )}
                            {cert.file && (
                              <a href={cert.file} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <FileText size={12} /> View File
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button onClick={() => setModalState({ open: true, type: 'certificate', data: cert })} style={iconBtnStyle} title="Edit Certificate">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleDeleteCertificate(cert._id)} style={{ ...iconBtnStyle, color: '#f87171' }} title="Delete Certificate">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 7: MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#E5E5E5', marginBottom: '4px' }}>Contact Form Inbox</h1>
              <p style={{ color: '#8A8A8A', fontSize: '0.85rem' }}>View messages submitted by visitors on the public portfolio website.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.length === 0 ? (
                <div style={{
                  background: '#0D0D0D',
                  border: '1px solid #1A1A1A',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  color: '#555555',
                  fontSize: '0.85rem'
                }}>
                  No messages received yet.
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg._id} style={{
                    background: '#0D0D0D',
                    border: '1px solid #1A1A1A',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#E5E5E5' }}>{msg.name}</h3>
                        <span style={{ fontSize: '0.8rem', color: '#8A8A8A' }}>{msg.email}</span>
                      </div>
                      <button onClick={() => handleDeleteMessage(msg._id)} style={{ ...iconBtnStyle, color: '#f87171' }} title="Delete Message">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E5E5E5', marginBottom: '6px' }}>
                      Subject: {msg.subject || 'No Subject'}
                    </h4>
                    <p style={{ color: '#8A8A8A', fontSize: '0.85rem', background: '#121212', border: '1px solid #1A1A1A', padding: '10px 12px', borderRadius: '6px', lineHeight: '1.5' }}>
                      "{msg.message}"
                    </p>
                    <span style={{ fontSize: '0.72rem', color: '#555555', marginTop: '8px', display: 'block' }}>
                      Received: {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 8: WRITING / BLOGS */}
        {activeTab === 'writing' && (
          <div>
            <div className="admin-header-flex">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Blogs & Writing Articles
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Manage your technical articles, blog posts, and published essays.
                </p>
              </div>
              <button onClick={() => setModalState({ open: true, type: 'writing', data: null })} style={primaryBtnStyle}>
                <Plus size={14} /> Write New Article
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {writing.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  No writing articles found. Click "+ Write New Article" to add one.
                </div>
              ) : (
                writing.map((article) => (
                  <div
                    key={article._id || article.title}
                    className="admin-writing-card"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '16px 20px'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '4px' }}>
                        {article.date} · {article.readTime}
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {article.title}
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {article.excerpt}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => setModalState({ open: true, type: 'writing', data: article })}
                        style={iconBtnStyle}
                        title="Edit Article"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteWriting(article._id)}
                        style={{ ...iconBtnStyle, color: '#f87171' }}
                        title="Delete Article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 9: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div>
            <div className="admin-header-flex">
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Manage Photo Gallery
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Upload photos, setup shots, and moments to display on your website gallery.
                </p>
              </div>
              <button onClick={() => setModalState({ open: true, type: 'gallery', data: null })} style={primaryBtnStyle}>
                <Plus size={14} /> Upload / Add Photo
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {gallery.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', padding: '32px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                  No photo gallery items found. Click "+ Upload / Add Photo" to add your first photo.
                </div>
              ) : (
                gallery.map((item, idx) => (
                  <div
                    key={item._id || item.id || idx}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '140px', overflow: 'hidden', position: 'relative', background: 'var(--bg-tertiary)' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.title}
                      </h3>
                      {item.caption && (
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                          {item.caption}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
                        <button
                          onClick={() => setModalState({ open: true, type: 'gallery', data: item })}
                          style={{ ...iconBtnStyle, flex: 1, height: '26px', fontSize: '0.72rem' }}
                        >
                          <Edit size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryItem(item._id || item.id)}
                          style={{ ...iconBtnStyle, flex: 1, height: '26px', fontSize: '0.72rem', color: '#f87171' }}
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 10: QUOTE */}
        {activeTab === 'quote' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Manage Website Quote
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Update the featured quote and philosophy displayed on your website.
              </p>
            </div>

            <div className="admin-quote-grid">
              {/* Left Column: Edit Form */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <QuoteIcon size={18} color="var(--text-secondary)" /> Edit Quote Details
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Quote Text *</label>
                  <textarea
                    value={portfolioData.quote?.text || ''}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      quote: { ...portfolioData.quote, text: e.target.value }
                    })}
                    className="editorial-input"
                    rows={6}
                    placeholder="Enter quote text..."
                    required
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Quote Author / Source *</label>
                  <input
                    type="text"
                    value={portfolioData.quote?.author || ''}
                    onChange={(e) => setPortfolioData({
                      ...portfolioData,
                      quote: { ...portfolioData.quote, author: e.target.value }
                    })}
                    className="editorial-input"
                    placeholder="Enter quote author or speaker name"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveQuote}
                  style={{ ...primaryBtnStyle, width: 'fit-content', marginTop: '8px', padding: '10px 20px' }}
                >
                  <Save size={15} /> Save Quote
                </button>
              </div>

              {/* Right Column: Live Website Preview */}
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, display: 'block', marginBottom: '16px' }}>
                  Live Website Preview
                </span>

                <div style={{
                  position: 'relative',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '28px 24px',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '15px',
                    opacity: 0.08,
                    pointerEvents: 'none',
                    color: 'var(--text-primary)'
                  }}>
                    <QuoteIcon size={90} />
                  </div>

                  <p style={{
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.6',
                    marginBottom: '10px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    “{portfolioData.quote?.text || 'What we do in life echoes in eternity.'}”
                  </p>

                  <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    — {portfolioData.quote?.author || 'Maximus, Gladiator'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* EDIT / CREATE MODAL DIALOG */}
      {modalState.open && (
        <ModalForm
          type={modalState.type}
          initialData={modalState.data}
          onClose={() => setModalState({ open: false, type: null, data: null })}
          onSaveSkill={handleSaveSkill}
          onSaveProject={handleSaveProject}
          onSaveExperience={handleSaveExperience}
          onSaveEducation={handleSaveEducation}
          onSaveCertificate={handleSaveCertificate}
          onSaveWriting={handleSaveWriting}
          onSaveGallery={handleSaveGalleryItem}
        />
      )}
    </div>
  );
};

// Sidebar Tab Helper Component
const SidebarTab = ({ icon, label, count, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px',
      borderRadius: '6px',
      background: active ? 'var(--border-color)' : 'transparent',
      color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.82rem',
      fontWeight: active ? 600 : 400,
      transition: 'all 0.15s ease',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      gap: '8px'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon}
      <span>{label}</span>
    </div>
    {count !== undefined && (
      <span style={{
        fontSize: '0.7rem',
        padding: '1px 6px',
        borderRadius: '4px',
        background: active ? 'var(--border-subtle)' : 'var(--bg-tertiary)',
        color: active ? 'var(--text-primary)' : 'var(--text-muted)'
      }}>
        {count}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, icon }) => (
  <div style={{
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  }}>
    <div style={{
      width: '38px',
      height: '38px',
      borderRadius: '8px',
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </div>
    <div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{title}</span>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</h3>
    </div>
  </div>
);

// Generic Modal Form Component
const ModalForm = ({ type, initialData, onClose, onSaveSkill, onSaveProject, onSaveExperience, onSaveEducation, onSaveCertificate, onSaveWriting, onSaveGallery }) => {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags || '',
        keyFeatures: Array.isArray(initialData.keyFeatures) ? initialData.keyFeatures.join('\n') : initialData.keyFeatures || ''
      };
    }
    if (type === 'skill') {
      return { name: '', category: 'Frontend', proficiency: '', icon: '' };
    }
    return {};
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'skill') {
      const skillPayload = {
        ...formData,
        name: formData.name || '',
        category: formData.category || 'Frontend',
        proficiency: (formData.proficiency !== undefined && formData.proficiency !== null && formData.proficiency !== '')
          ? Number(formData.proficiency)
          : null,
        icon: formData.icon || ''
      };
      if (!skillPayload.category) skillPayload.category = 'Frontend';
      onSaveSkill(skillPayload);
    }
    if (type === 'project') onSaveProject(formData);
    if (type === 'experience') onSaveExperience(formData);
    if (type === 'education') onSaveEducation(formData);
    if (type === 'certificate') onSaveCertificate(formData);
    if (type === 'writing') onSaveWriting(formData);
    if (type === 'gallery') onSaveGallery(formData);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }} onClick={onClose}>
      <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {initialData ? 'Edit' : 'Add New'} {type.toUpperCase()}
          </h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {type === 'skill' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Skill Name *</label>
                <input
                  type="text"
                  placeholder="Enter skill name (React, Node.js, Python...)"
                  value={formData.name || ''}
                  onChange={(e) => {
                    const nameVal = e.target.value;
                    const matchedPreset = SKILL_ICON_PRESETS.find(p => p.name.toLowerCase() === nameVal.trim().toLowerCase());
                    setFormData(prev => ({
                      ...prev,
                      name: nameVal,
                      icon: prev.icon || (matchedPreset ? matchedPreset.url : prev.icon)
                    }));
                  }}
                  className="editorial-input"
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category *</label>
                <select
                  value={formData.category || 'Frontend'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="editorial-input"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Language">Language</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Proficiency (%) (Optional)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="Enter proficiency score (1-100)"
                  value={formData.proficiency !== undefined && formData.proficiency !== null ? formData.proficiency : ''}
                  onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })}
                  className="editorial-input"
                />
              </div>

              {/* Skill Logo / Icon Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={14} /> Skill Logo / Icon (Optional)
                </label>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 14px'
                }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {formData.icon && (formData.icon.startsWith('http') || formData.icon.startsWith('data:')) ? (
                      <img
                        src={formData.icon}
                        alt="Logo Preview"
                        style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <Cpu size={20} color="var(--text-secondary)" />
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="file"
                        accept="image/*"
                        id="modal-skill-icon-file-input"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, icon: reader.result });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('modal-skill-icon-file-input')?.click()}
                        style={{
                          padding: '4px 10px',
                          fontSize: '0.75rem',
                          borderRadius: '5px',
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Upload size={12} /> Upload Logo File
                      </button>
                      {formData.icon && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, icon: '' })}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            borderRadius: '5px',
                            background: 'transparent',
                            border: 'none',
                            color: '#f87171',
                            cursor: 'pointer'
                          }}
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <input
                      type="url"
                      placeholder="Paste logo image URL"
                      value={formData.icon || ''}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="editorial-input"
                      style={{ fontSize: '0.78rem', padding: '6px 10px' }}
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div style={{ marginTop: '2px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Quick Select Tech Logo Presets:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '90px', overflowY: 'auto' }}>
                    {SKILL_ICON_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: preset.url })}
                        style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          border: '1px solid ' + (formData.icon === preset.url ? 'var(--text-primary)' : 'var(--border-subtle)'),
                          background: formData.icon === preset.url ? 'var(--border-color)' : 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <img src={preset.url} alt={preset.name} style={{ width: '12px', height: '12px', objectFit: 'contain' }} />
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {type === 'project' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Project Title *</label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="editorial-input"
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Short Description * (Displayed on Website Card)</label>
                <textarea
                  value={formData.shortDescription || ''}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="editorial-input"
                  rows={4}
                  placeholder="Enter short project overview shown on project card..."
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Detailed Description * (Displayed on Project Details Modal)</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="editorial-input"
                  rows={6}
                  placeholder="Enter full detailed project description describing problem solved, architecture, technologies, etc."
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Key Features (Displayed on Project Details Modal)</label>
                <textarea
                  value={formData.keyFeatures || ''}
                  onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                  className="editorial-input"
                  rows={5}
                  placeholder="Enter each feature on a new line:&#10;End-to-end WebRTC encryption&#10;Zero server file storage&#10;Live transfer progress bars"
                />
              </div>
              {/* Project Image Selection: Upload File & URL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={14} /> Project Cover Image
                </label>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 14px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '40px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: 'var(--bg-secondary)',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <img
                      src={formData.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80'}
                      alt="Project Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="modal-project-file-input"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('modal-project-file-input').click()}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        width: 'fit-content'
                      }}
                    >
                      <Upload size={13} /> Upload Image File
                    </button>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Supports PNG, JPG, WebP</span>
                  </div>
                </div>

                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="editorial-input"
                  placeholder="Or paste image URL (https://...)"
                  style={{ fontSize: '0.78rem' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tags (Comma separated)</label>
                <input type="text" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '')} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="editorial-input" placeholder="React, Node.js, MongoDB" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>GitHub Repo URL</label>
                <input type="text" value={formData.github || ''} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="editorial-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live Demo URL</label>
                <input type="text" value={formData.demo || ''} onChange={(e) => setFormData({ ...formData, demo: e.target.value })} className="editorial-input" />
              </div>
            </>
          )}

          {type === 'experience' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Job Role / Title *</label>
                <input type="text" value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="editorial-input" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Company Name *</label>
                <input type="text" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="editorial-input" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Duration *</label>
                <input type="text" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="editorial-input" placeholder="Enter duration (2023 - Present)" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Location</label>
                <input type="text" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="editorial-input" placeholder="Enter location" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Key Highlights (One per line)</label>
                <textarea value={Array.isArray(formData.highlights) ? formData.highlights.join('\n') : (formData.highlights || '')} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} className="editorial-input" rows={5} placeholder="Enter key job highlights (one per line)..." />
              </div>
            </>
          )}

          {type === 'education' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Degree / Qualification *</label>
                <input type="text" value={formData.degree || ''} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} className="editorial-input" placeholder="Enter degree or qualification" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Institution / University *</label>
                <input type="text" value={formData.institution || ''} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} className="editorial-input" placeholder="Enter institution or university name" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Duration *</label>
                <input type="text" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="editorial-input" placeholder="Enter duration (2017 - 2021)" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Details / Honors</label>
                <textarea value={formData.details || ''} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="editorial-input" rows={4} placeholder="Enter education details or honors..." />
              </div>
            </>
          )}

          {type === 'certificate' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Certificate Name *</label>
                <input type="text" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="editorial-input" placeholder="Enter certificate name" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Organization / Issuer *</label>
                <input type="text" value={formData.organization || ''} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="editorial-input" placeholder="Enter issuing organization" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Month and Year *</label>
                <input type="text" value={formData.issueDate || ''} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} className="editorial-input" placeholder="Enter issue date (May 2025)" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Description (Optional)</label>
                <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="editorial-input" rows={5} placeholder="Summary of skills or topics covered..." />
              </div>

              {/* Optional Certificate Link */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Credential URL / Link (Optional)</label>
                <input type="text" value={formData.link || ''} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="editorial-input" placeholder="Enter credential URL (https://...)" />
              </div>

              {/* Optional Upload Certificate File */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} /> Upload Certificate File (Optional)
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 14px'
                }}>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    id="modal-cert-file-input"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 10 * 1024 * 1024) {
                        alert('File size exceeds 10MB.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, file: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('modal-cert-file-input')?.click()}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      padding: '6px 12px',
                      fontSize: '0.78rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Upload size={13} /> {formData.file ? 'Change Uploaded File' : 'Upload File'}
                  </button>
                  {formData.file && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, file: '' })}
                      style={{ background: 'transparent', border: 'none', color: '#f87171', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Clear File
                    </button>
                  )}
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PDF or Images (Max 10MB)</span>
                </div>
              </div>
            </>
          )}

          {type === 'writing' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Article Title *</label>
                <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="editorial-input" placeholder="Enter article title" required />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Short Excerpt *</label>
                <textarea value={formData.excerpt || ''} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="editorial-input" rows={5} placeholder="Enter short article excerpt..." required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Publish Date</label>
                  <input type="text" value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="editorial-input" placeholder="Enter publish date (AUG 14, 2026)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Estimated Read Time</label>
                  <input type="text" value={formData.readTime || ''} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} className="editorial-input" placeholder="Enter estimated read time (5 MIN READ)" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>External Article Link / URL</label>
                <input type="text" value={formData.link || ''} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="editorial-input" placeholder="Enter article link URL" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Full Article Body (Optional)</label>
                <textarea value={formData.content || ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="editorial-input" rows={8} placeholder="Enter detailed text or markdown body content..." />
              </div>
            </>
          )}

          {type === 'gallery' && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Photo Title / Caption *</label>
                <input
                  type="text"
                  placeholder="Enter photo title or caption"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="editorial-input"
                  required
                />
              </div>

              {/* Gallery Image Selection: Upload File & URL */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ImageIcon size={14} /> Photo File / Image *
                </label>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 14px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '42px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: 'var(--bg-secondary)',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Photo Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <ImageIcon size={18} />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexGrow: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      id="modal-gallery-file-input"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, image: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('modal-gallery-file-input')?.click()}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        width: 'fit-content'
                      }}
                    >
                      <Upload size={13} /> Upload Image File
                    </button>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Supports JPG, PNG, WebP</span>
                  </div>
                </div>

                <input
                  type="url"
                  placeholder="Or paste Image URL (https://...)"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="editorial-input"
                  style={{ fontSize: '0.78rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Additional Description / Subtitle (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter photo description or caption"
                  value={formData.caption || ''}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className="editorial-input"
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button type="submit" style={{ ...primaryBtnStyle, flex: 1, justifyContent: 'center' }}>
              Save Changes
            </button>
            <button type="button" onClick={onClose} style={secondaryBtnStyle}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const primaryBtnStyle = {
  background: 'var(--btn-primary-bg)',
  color: 'var(--btn-primary-text)',
  border: 'none',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'opacity 0.15s ease'
};

const secondaryBtnStyle = {
  background: 'var(--bg-secondary)',
  color: 'var(--text-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '0.8rem',
  fontWeight: 500,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  transition: 'all 0.15s ease'
};

const iconBtnStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '6px',
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.15s ease'
};

export default AdminDashboard;
