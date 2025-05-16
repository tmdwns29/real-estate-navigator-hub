
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  profileImage?: string;
  birthDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // This is a mock implementation - in a real app, you'd call an API
      
      // Mock validation
      if (username === "demo" && password === "password") {
        const mockUser: User = {
          id: "1",
          name: "데모 사용자",
          email: "demo@example.com",
          username: "demo",
          birthDate: "1990-01-01",
          profileImage: "https://i.pravatar.cc/150?img=3"
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    try {
      // This is a mock implementation - in a real app, you'd call an API
      const { password, ...userWithoutPassword } = userData;
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...userWithoutPassword,
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return true;
    } catch (error) {
      console.error("Update user error:", error);
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      
      return true;
    } catch (error) {
      console.error("Delete account error:", error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
    deleteAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
