import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function Logo({ showText = true, size = 'medium' }: LogoProps) {
  const logoSize = size === 'small' ? 40 : size === 'medium' ? 60 : 100;
  
  return (
    <View style={styles.container}>
      <View style={[styles.logoCircle, { width: logoSize, height: logoSize }]}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg' }}
          style={[styles.horseImage, { width: logoSize * 0.7, height: logoSize * 0.7 }]}
          resizeMode="contain"
        />
        <Text style={[styles.registered, { fontSize: logoSize * 0.2 }]}>®</Text>
      </View>
      
      {showText && (
        <View style={styles.textContainer}>
          <View style={styles.tkContainer}>
            <Text style={styles.tkText}>TK</Text>
          </View>
          <Text style={styles.techText}>TECH KOTHARI</Text>
          <Text style={styles.subText}>A UNIT OF KOTHARI INDUSTRIAL CORPORATION LIMITED</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    backgroundColor: '#2E3192',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  horseImage: {
    tintColor: '#FFFFFF',
  },
  registered: {
    position: 'absolute',
    top: 2,
    right: 2,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  textContainer: {
    alignItems: 'center',
  },
  tkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  tkText: {
    color: '#2E3192',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  techText: {
    color: '#2E3192',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  subText: {
    color: '#2E3192',
    fontSize: 8,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 2,
  },
});