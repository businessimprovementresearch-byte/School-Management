import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authControllerLogin, authControllerGetMe } from '@/src/api/generated/api';
import { getErrorMessage } from '@/src/api/customFetch';
import type { UserInfoDto } from '@/src/api/generated/schemas';

interface AuthContextType {
  user: UserInfoDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfoDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      const data = await authControllerGetMe();
      setUser(data?.user ?? null);
    } catch {
      await AsyncStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const data = await authControllerLogin({ email, password });
    await AsyncStorage.setItem('auth_token', data?.token ?? '');
    setUser(data?.user ?? null);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('auth_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
