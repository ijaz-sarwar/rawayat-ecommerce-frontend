import { apiClient } from './client';

const STORAGE_KEY = 'rawayat_auth_user';

export const authApi = {
  /**
   * Log in an existing user
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ success: boolean, message: string, user: { id: number, name: string, email: string, role: string } }>}
   */
  async login({ email, password }) {
    const data = await apiClient('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    if (data.user) {
      this.setStoredUser(data.user);
    }
    return data;
  },

  /**
   * Register a new user
   * @param {{ name: string, email: string, password: string, role?: string, phone?: string }} userData
   * @returns {Promise<{ success: boolean, message: string, user: { id: number, name: string, email: string, role: string, createdAt: string } }>}
   */
  async register({ name, email, password, role = 'CUSTOMER' }) {
    const data = await apiClient('/api/auth/register', {
      method: 'POST',
      body: {
        name,
        email,
        password,
        role: role.toUpperCase(), // CUSTOMER, SELLER, ADMIN
      },
    });

    return data;
  },

  /**
   * Log out user
   */
  logout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove user from localStorage', e);
    }
  },

  /**
   * Retrieve cached authenticated user from localStorage
   */
  getStoredUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn('Could not read user from localStorage', e);
      return null;
    }
  },

  /**
   * Save authenticated user to localStorage
   */
  setStoredUser(user) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user to localStorage', e);
    }
  },
};

