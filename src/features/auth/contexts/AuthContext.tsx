import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

import { authService } from '../services/auth.service';

import type { User, AuthState, LoginCredentials } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (resource: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    const initAuth = async () => {
      const user = await authService.checkAuth();
      const token = localStorage.getItem('auth_token');
      setState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        token: token,
      });
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { user, token } = await authService.login(credentials);
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      token,
    });
  };

  const logout = async () => {
    await authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!state.user) return false;
    if (state.user.role === 'ADMIN') return true;
    return state.user.permissions.some(
      (p: any) => p.resource === resource && p.actions.includes(action as any)
    );
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}