import React, { createContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/auth.types';
import * as authService from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setState({ ...initialState, loading: false });
          return;
        }

        const user = await authService.getCurrentUser();
        setState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('token');
        setState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: 'Authentication failed',
        });
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, loading: true });
      const data = await authService.login(email, password);
      setState({
        user: data.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: 'Invalid credentials',
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setState({ ...state, loading: true });
      const data = await authService.register(name, email, password);
      setState({
        user: data.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: 'Registration failed',
      });
    }
  };

  const logout = () => {
    authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
