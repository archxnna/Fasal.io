import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string } | null;
  login: () => void;
  logout: () => void;
  setLoginModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = () => {
    setIsLoginModalOpen(true);
    // Simulate login
    setTimeout(() => {
      setIsLoggedIn(true);
      setUser({ name: 'Farmer User' });
      setIsLoginModalOpen(false);
    }, 500);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        setLoginModalOpen: setIsLoginModalOpen,
        isLoginModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
