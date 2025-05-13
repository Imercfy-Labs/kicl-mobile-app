import React, { useState, useRef } from 'react';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { LayoutDashboard, Users, Package, ClipboardList, Chrome as Home, IndianRupee } from 'lucide-react-native';
import { useAuth } from '../auth/AuthContext';
import SideMenu from '@/components/SideMenu';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.75;

export default function TabLayout() {
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnimation = useRef(new Animated.Value(0)).current;

  if (!user) {
    return null;
  }

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? 0 : 1;
    Animated.timing(drawerAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const translateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-DRAWER_WIDTH, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX }],
          },
        ]}>
        <SideMenu
          activePath=""
          userInfo={{
            name: user.name || 'Username',
            employeeId: user.employeeId || 'EmpID',
          }}
          onClose={() => setIsDrawerOpen(false)}
        />
      </Animated.View>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}>
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
        <Tabs.Screen
          name="settlement"
          options={{
            title: 'Settlement',
            tabBarIcon: ({ color, size }) => (
              <IndianRupee color={color} size={size} />
            ),
          }}
        />
      </Tabs>

      {isDrawerOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleDrawer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    paddingBottom: 8,
  },
});