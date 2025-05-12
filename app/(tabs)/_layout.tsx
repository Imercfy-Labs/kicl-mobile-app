import React, { useState, useRef, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, Users, Package, ClipboardList, Chrome as Home } from 'lucide-react-native';
import { Animated, Dimensions, View, StyleSheet, TouchableOpacity } from 'react-native';
import SideMenu from '@/components/SideMenu';
import { useAuth } from '../auth/AuthContext';
import { usePathname, useRouter } from 'expo-router';
import AppHeader from '@/components/AppHeader';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.75;

export default function TabLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    if (!user && !pathname?.startsWith('/(auth)')) {
      router.replace('/(auth)/');
    }
  }, [user, pathname]);
  
  if (!user) {
    return null;
  }
  
  useEffect(() => {
    Animated.timing(drawerAnimation, {
      toValue: isDrawerOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isDrawerOpen, drawerAnimation]);
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });
  
  const screenOpacity = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.screenContainer,
          {
            opacity: screenOpacity,
            transform: [{ scale: drawerAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.95],
            })}],
          }
        ]}
      >
        <AppHeader onMenuPress={toggleDrawer} />
        
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <LayoutDashboard color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="dealers"
            options={{
              title: 'Dealers',
              tabBarIcon: ({ color, size }) => (
                <Users color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="orders"
            options={{
              title: 'Orders',
              tabBarIcon: ({ color, size }) => (
                <ClipboardList color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="inventory"
            options={{
              title: 'Inventory',
              tabBarIcon: ({ color, size }) => (
                <Package color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="field-development"
            options={{
              title: 'Field Dev',
              tabBarIcon: ({ color, size }) => (
                <Home color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </Animated.View>
      
      {/* Drawer overlay */}
      {isDrawerOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleDrawer}
        />
      )}
      
      {/* Side drawer */}
      <Animated.View 
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerTranslateX }],
          }
        ]}
      >
        <SideMenu 
          activePath={pathname} 
          userInfo={{ 
            name: user.name || 'Username', 
            employeeId: user.employeeId || 'EmpID' 
          }}
          onClose={() => setIsDrawerOpen(false)}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    zIndex: 100,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 8,
  },
});