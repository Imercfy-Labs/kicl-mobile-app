import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '@/components/GradientBackground';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    
    if (!email.trim()) {
      setError('Email is required');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address');
      isValid = false;
    } else {
      setError(null);
    }
    
    return isValid;
  };
  
  const handleResetPassword = async () => {
    if (validate()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Reset Email Sent',
          `We've sent password reset instructions to ${email}`,
          [{ text: 'OK', onPress: () => router.back() }]
        );
      }, 1500);
    }
  };
  
  return (
    <GradientBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
          
          <FormInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(null);
            }}
            error={error || undefined}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputContainer}
          />
          
          <Button 
            title="Reset Password" 
            onPress={handleResetPassword} 
            style={styles.resetButton}
            loading={isLoading}
            disabled={isLoading}
          />
          
          <TouchableWithoutFeedback onPress={() => router.back()}>
            <Text style={styles.backToLogin}>Back to Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  resetButton: {
    marginTop: 16,
  },
  backToLogin: {
    marginTop: 24,
    textAlign: 'center',
    color: '#2E3192',
    fontWeight: '500',
    fontSize: 16,
  },
});