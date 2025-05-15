import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// For web platform, use localStorage with encryption
const webStore = {
  async setItem(key: string, value: string) {
    try {
      // In a real app, encrypt the value before storing
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  },
  async getItem(key: string) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },
  async removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  },
};

// Use SecureStore for native platforms, localStorage for web
export const secureStore = Platform.OS === 'web' ? webStore : SecureStore;