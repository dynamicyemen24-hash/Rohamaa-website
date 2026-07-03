export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
}

export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER' | 'MANAGER';

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve' | 'publish')[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}