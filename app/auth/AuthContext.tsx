import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

interface User {
  id: string;
  name: string;
  employeeId: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  user: null,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export function useAuth() {
  return useContext(AuthContext);
}

// Mock API call for login
const mockLoginApi = async (username: string, password: string) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate successful login with any non-empty credentials
        if (username && password) {
          resolve({
            id: '1',
            name: 'Username',
            employeeId: 'Emp2054',
            email: 'user@example.com',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      } catch (error) {
        reject(error);
      }
    }, 1000); // Simulate network delay
  });
};

// Mock API call for signup
const mockSignupApi = async (data: { name: string; email: string; password: string }) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      try {
        if (data.name && data.email && data.password) {
          resolve({
            id: '2',
            name: data.name,
            employeeId: 'Emp' + Math.floor(1000 + Math.random() * 9000), 
            email: data.email,
          });
        } else {
          reject(new Error('Please fill all required fields'));
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check for stored session on app load
  useEffect(() => {
    // This would normally check AsyncStorage for a stored token/session
    // Simulating empty initial state for this example
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockLoginApi(username, password);
      setUser(userData);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
      const userData = await mockSignupApi(data);
      setUser(userData);
    } catch (error) {
      Alert.alert('Signup Failed', 'Please check your information and try again');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}