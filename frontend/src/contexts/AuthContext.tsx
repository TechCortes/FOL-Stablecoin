import * as React from 'react';
import { apiClient } from '../lib/api.js';
import type { User, LoginRequest, RegisterRequest } from '../../../shared/src/types/index.js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          try {
            const userData = await apiClient.verifyToken(token);
            if (userData && typeof userData === 'object' && 'id' in userData) {
              setUser(userData as User);
            } else {
              localStorage.removeItem('auth_token');
            }
          } catch (error) {
            console.warn('Token verification failed:', error);
            localStorage.removeItem('auth_token');
          }
        }
      } catch (error) {
        console.warn('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const credentials: LoginRequest = { email, password };
    const authResponse = await apiClient.login(credentials);
    setUser(authResponse.user);
  };

  const register = async (data: RegisterRequest) => {
    const authResponse = await apiClient.register(data);
    setUser(authResponse.user);
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}