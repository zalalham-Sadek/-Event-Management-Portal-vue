import api from './api';

const AuthService = {

  login(credentials) {
    return api.post('/api/login', credentials);
  },


  register(userData) {
    return api.post('/api/register', userData);
  },


  getCurrentUser() {
    return api.get('/api/me');
  },


  logout() {
    return api.post('/api/logout');
  },


  checkSetup() {
    return api.get('/api/setup-admin');
  },


  setupAdmin(adminData) {
    return api.post('/api/setup-admin', adminData);
  }
};

export default AuthService;