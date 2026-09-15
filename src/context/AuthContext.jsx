import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('tts_token');
    const savedUser = localStorage.getItem('tts_user');
    if (token && savedUser) {
      setAccessToken(token);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email, password) => {
    const res = await fetch(`${API}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    return data;
  };

  const signIn = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);

    setAccessToken(data.accessToken);
    setUser(data.user);
    localStorage.setItem('tts_token', data.accessToken);
    localStorage.setItem('tts_user', JSON.stringify(data.user));
    return data;
  };

  const signOut = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('tts_token');
    localStorage.removeItem('tts_user');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}