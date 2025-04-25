import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') as 'student' | 'admin' | null);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const login = (newToken: string, newRole: 'student' | 'admin', newUserId: string) => {
    console.log('Logging in with token:', newToken, 'and role:', newRole, newUserId);
    setToken(newToken);
    setRole(newRole);
    setUserId(newUserId);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('userId', newUserId);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);