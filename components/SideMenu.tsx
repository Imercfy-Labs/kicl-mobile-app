import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from './Logo';
import { User, LayoutDashboard, Users, ClipboardList, Package, LogOut, Chrome as Home } from 'lucide-react-native';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  isActive?: boolean;
}

function MenuItem({ icon, title, onPress, isActive = false }: MenuItemProps) {
  return (
    <TouchableOpacity 
      style={[styles.menuItem, isActive && styles.activeMenuItem]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
}

interface SideMenuProps {
  activePath: string;
  userInfo: {
    name: string;
    employeeId: string;
  };
  onClose: () => void;
}

export default function SideMenu({ activePath, userInfo, onClose }: SideMenuProps) {
  const router = useRouter();
  
  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };
  
  const handleLogout = () => {
    router.replace('/');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo showText={true} size="small" />
      </View>
      
      <View style={styles.userInfo}>
        <View style={styles.userIcon}>
          <User color="#555" size={24} />
        </View>
        <View>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userDetail}>Employee ID: {userInfo.employeeId}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.menuContainer}>
        <MenuItem 
          icon={<LayoutDashboard color="#555" size={20} />} 
          title="Dashboard" 
          onPress={() => navigateTo('/dashboard')}
          isActive={activePath === '/dashboard'}
        />
        <MenuItem 
          icon={<Users color="#555" size={20} />} 
          title="Dealers" 
          onPress={() => navigateTo('/dealers')}
          isActive={activePath === '/dealers'}
        />
        <MenuItem 
          icon={<ClipboardList color="#555" size={20} />} 
          title="Orders" 
          onPress={() => navigateTo('/orders')}
          isActive={activePath.includes('/orders')}
        />
        <View style={styles.subMenu}>
          <MenuItem 
            icon={<ClipboardList color="#555" size={18} />} 
            title="Place Order" 
            onPress={() => navigateTo('/orders/place')}
            isActive={activePath === '/orders/place'}
          />
          <MenuItem 
            icon={<ClipboardList color="#555" size={18} />} 
            title="My Orders" 
            onPress={() => navigateTo('/orders/my-orders')}
            isActive={activePath === '/orders/my-orders'}
          />
          <MenuItem 
            icon={<ClipboardList color="#555" size={18} />} 
            title="Track Order" 
            onPress={() => navigateTo('/orders/track')}
            isActive={activePath === '/orders/track'}
          />
        </View>
        <MenuItem 
          icon={<Package color="#555" size={20} />} 
          title="Inventory" 
          onPress={() => navigateTo('/inventory')}
          isActive={activePath === '/inventory'}
        />
        <MenuItem 
          icon={<Home color="#555" size={20} />} 
          title="Field Development" 
          onPress={() => navigateTo('/field-development')}
          isActive={activePath === '/field-development'}
        />
      </ScrollView>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut color="#555" size={20} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userDetail: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(61, 211, 158, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#3DD39E',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
  subMenu: {
    paddingLeft: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#333',
  },
});