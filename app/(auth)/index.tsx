import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { useAuth } from '../auth/AuthContext';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const router = useRouter();
  const { login, isLoading } = useAuth();
  
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleLogin = async () => {
    if (validate()) {
      try {
        await login(email, password);
        router.replace('/(tabs)/');
      } catch (error) {
        // Error is handled in the AuthContext
      }
    }
  };
  
  return (
    <GradientBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Logo showText={true} size="large" />
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            
            <FormInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              containerStyle={styles.inputContainer}
            />
            
            <FormInput
              label="Password"
              placeholder="Enter your Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              secureTextEntry
              error={errors.password}
              containerStyle={styles.inputContainer}
            />
            
            <TouchableWithoutFeedback onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableWithoutFeedback>
            
            <Button 
              title="Login" 
              onPress={handleLogin} 
              style={styles.loginButton}
              loading={isLoading}
              disabled={isLoading}
            />
            
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableWithoutFeedback onPress={() => router.push('/signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: -10,
    marginBottom: 20,
    color: '#2E3192',
    fontWeight: '500',
  },
  loginButton: {
    marginTop: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E3192',
  },
});