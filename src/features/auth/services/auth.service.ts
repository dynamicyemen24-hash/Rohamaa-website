import { authApi } from '../api/auth.api';

import type { User, LoginCredentials, TokenPayload } from '../types/auth';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const DEMO_AUTH_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_AUTH === 'true';

// Storage helper for secured session management
const session = {
  token: () => localStorage.getItem('auth_token') ?? sessionStorage.getItem('auth_token'),
  user: () => {
    const raw = localStorage.getItem('auth_user') ?? sessionStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      authService.logout();
      return null;
    }
  },
  remember: (value: boolean) => {
    if (value) {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_user');
      sessionStorage.removeItem('auth_user_role');
      sessionStorage.removeItem('auth_user_name');
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_user_role');
      localStorage.removeItem('auth_user_name');
    }
  },
};

const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@rohamaa.org',
    name: 'مدير النظام',
    role: 'ADMIN',
    permissions: [
      { resource: 'news', actions: ['create', 'read', 'update', 'delete', 'approve', 'publish'] },
      { resource: 'projects', actions: ['create', 'read', 'update', 'delete', 'approve'] },
      { resource: 'donations', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'media', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'partners', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'stories', actions: ['create', 'read', 'update', 'delete', 'approve'] },
      { resource: 'volunteers', actions: ['create', 'read', 'update', 'delete'] },
      { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    ],
  },
  {
    id: '2',
    email: 'editor@rohamaa.org',
    name: 'أحمد المحرر',
    role: 'EDITOR',
    permissions: [
      { resource: 'news', actions: ['create', 'read', 'update', 'publish'] },
      { resource: 'stories', actions: ['create', 'read', 'update'] },
      { resource: 'media', actions: ['create', 'read'] },
    ],
  },
  {
    id: '3',
    email: 'manager@rohamaa.org',
    name: 'فاطمة المديرة',
    role: 'MANAGER',
    permissions: [
      { resource: 'news', actions: ['create', 'read', 'update', 'approve'] },
      { resource: 'projects', actions: ['create', 'read', 'update'] },
      { resource: 'reports', actions: ['create', 'read', 'update', 'publish'] },
      { resource: 'stories', actions: ['read', 'approve'] },
    ],
  },
  {
    id: '4',
    email: 'viewer@rohamaa.org',
    name: 'خالد المشاهد',
    role: 'VIEWER',
    permissions: [
      { resource: 'news', actions: ['read'] },
      { resource: 'projects', actions: ['read'] },
      { resource: 'reports', actions: ['read'] },
    ],
  },
];

function decodeToken(token: string): TokenPayload | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    return decoded as TokenPayload;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return true;
  const now = Date.now();
  const expiresAt = payload.exp * 1000;
  return now >= expiresAt - 5 * 60 * 1000;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const result = await authApi.login(credentials);
      session.remember(credentials.rememberMe || false);
      if (credentials.rememberMe) {
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('auth_user', JSON.stringify(result.user));
      } else {
        sessionStorage.setItem('auth_token', result.token);
        sessionStorage.setItem('auth_user', JSON.stringify(result.user));
      }
      localStorage.setItem('auth_user_role', result.user.role);
      localStorage.setItem('auth_user_name', result.user.name);
      return result;
    } catch (error) {
      console.error('Login error:', error);
    }

    if (!DEMO_AUTH_ENABLED) {
      throw new Error('تعذر تسجيل الدخول. تحقق من إعدادات خادم المصادقة أو بيانات الحساب.');
    }

    await delay(300);

    const user = MOCK_USERS.find(u => u.email === credentials.email);
    const password = credentials.password === 'rohamaa123';
    const isLocalAdmin = credentials.email === 'admin@rohamaa.org' && credentials.password === 'admin123';
    if ((user && password) || isLocalAdmin) {
      const resolvedUser = (user && password) ? user : MOCK_USERS[0];
      const token = 'mock_jwt_token_' + Date.now();
      if (credentials.rememberMe) {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(resolvedUser));
      } else {
        sessionStorage.setItem('auth_token', token);
        sessionStorage.setItem('auth_user', JSON.stringify(resolvedUser));
      }
      localStorage.setItem('auth_user_role', resolvedUser.role);
      localStorage.setItem('auth_user_name', resolvedUser.name);
      return { user: resolvedUser, token };
    }

    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
  },

  async logout(): Promise<void> {
    await delay(300);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_user_role');
    localStorage.removeItem('auth_user_name');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_user_role');
    sessionStorage.removeItem('auth_user_name');
  },

  async checkAuth(): Promise<User | null> {
    await delay(200);
    const token = session.token();
    const user = session.user();
    if (!token || !user) return null;
    if (isTokenExpired(token)) {
      await this.logout();
      return null;
    }
    return user;
  },

  async refreshToken(): Promise<string | null> {
    const token = session.token();
    if (!token) return null;
    try {
      const newToken = await authApi.refreshToken();
      const remember = !!localStorage.getItem('auth_token');
      const store = remember ? localStorage : sessionStorage;
      store.setItem('auth_token', newToken);
      return newToken;
    } catch {
      return token;
    }
  },

  async getAllUsers(): Promise<User[]> {
    await delay(200);
    return MOCK_USERS;
  },

  async getUserById(id: string): Promise<User | undefined> {
    await delay(100);
    return MOCK_USERS.find(u => u.id === id);
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    await delay(200);
    const idx = MOCK_USERS.findIndex(u => u.id === id);
    if (idx === -1) return null;
    MOCK_USERS[idx] = { ...MOCK_USERS[idx], ...updates };
    return MOCK_USERS[idx];
  },

  async createUser(user: Omit<User, 'id'> & { id?: string }): Promise<User> {
    await delay(300);
    const newUser = { ...user, id: user.id || String(Date.now()) } as User;
    MOCK_USERS.push(newUser);
    return newUser;
  },

  async deleteUser(id: string): Promise<boolean> {
    await delay(200);
    const idx = MOCK_USERS.findIndex(u => u.id === id);
    if (idx === -1) return false;
    MOCK_USERS.splice(idx, 1);
    return true;
  },
};