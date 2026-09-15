import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

// Interceptor to attach JWT auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

API.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('portfolio_admin_token');
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.assign('/admin/login');
    }
  }
  return Promise.reject(error);
});

export const portfolioAPI = {
  // Auth
  login: (credentials) => API.post('/auth/login', credentials),
  verifyAuth: () => API.get('/auth/me'),

  // Public Data
  getPortfolio: () => API.get('/portfolio'),
  updatePersonalInfo: (infoData) => API.put('/portfolio/info', infoData),
  updateQuote: (quoteData) => API.put('/portfolio/quote', quoteData),

  // Skills CRUD
  getSkills: () => API.get('/skills'),
  createSkill: (data) => API.post('/skills', data),
  updateSkill: (id, data) => API.put(`/skills/${id}`, data),
  deleteSkill: (id) => API.delete(`/skills/${id}`),

  // Projects CRUD
  getProjects: () => API.get('/projects'),
  createProject: (data) => API.post('/projects', data),
  updateProject: (id, data) => API.put(`/projects/${id}`, data),
  deleteProject: (id) => API.delete(`/projects/${id}`),

  // Experience CRUD
  getExperiences: () => API.get('/experience'),
  createExperience: (data) => API.post('/experience', data),
  updateExperience: (id, data) => API.put(`/experience/${id}`, data),
  deleteExperience: (id) => API.delete(`/experience/${id}`),

  // Education CRUD
  getEducation: () => API.get('/education'),
  createEducation: (data) => API.post('/education', data),
  updateEducation: (id, data) => API.put(`/education/${id}`, data),
  deleteEducation: (id) => API.delete(`/education/${id}`),

  // Certificates CRUD
  getCertificates: () => API.get('/certificates'),
  createCertificate: (data) => API.post('/certificates', data),
  updateCertificate: (id, data) => API.put(`/certificates/${id}`, data),
  deleteCertificate: (id) => API.delete(`/certificates/${id}`),

  // Writing CRUD
  getWriting: () => API.get('/writing'),
  createWriting: (data) => API.post('/writing', data),
  updateWriting: (id, data) => API.put(`/writing/${id}`, data),
  deleteWriting: (id) => API.delete(`/writing/${id}`),

  // Messages
  sendMessage: (msgData) => API.post('/messages', msgData),
  getMessages: () => API.get('/messages'),
  deleteMessage: (id) => API.delete(`/messages/${id}`),

  // Gallery CRUD
  getGallery: () => API.get('/gallery'),
  createGalleryItem: (data) => API.post('/gallery', data),
  updateGalleryItem: (id, data) => API.put(`/gallery/${id}`, data),
  deleteGalleryItem: (id) => API.delete(`/gallery/${id}`)
};

export default portfolioAPI;
