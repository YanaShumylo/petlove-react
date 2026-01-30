import { createContext } from 'react';
import type { FullUser } from '../types/user'; 
import type { AuthResponse } from '../types/auth';


export interface AuthContextValue {
  user: FullUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthResponse, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);