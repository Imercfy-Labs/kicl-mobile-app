import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';

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

  const MenuItem = ({ title, isActive = false, isSubItem = false, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.menuItem,
        isActive && styles.activeMenuItem,
        isSubItem && styles.subMenuItem
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.menuText,
        isActive && styles.activeMenuText,
        isSubItem && styles.subMenuText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg' }}
          style={styles.logo}
        />
        <Text style={styles.logoText}>TK TECH KOTHARI</Text>
        <Text style={styles.subText}>A UNIT OF KOTHARI INDUSTRIAL CORPORATION LIMITED</Text>
      </View>

      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg' }}
          style={styles.userAvatar}
        />
        <Text style={styles.userName}>{userInfo.name}</Text>
        <Text style={styles.employeeId}>Employee ID: {userInfo.employeeId}</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem 
          title="Dashboard" 
          isActive={activePath === '/dashboard'}
          onPress={() => router.push('/dashboard')}
        />
        <MenuItem 
          title="Dealers" 
          isActive={activePath === '/dealers'}
          onPress={() => router.push('/dealers')}
        />
        {activePath === '/dealers' && (
          <>
            <MenuItem 
              title="Dealer Info" 
              isSubItem 
              isActive={activePath === '/dealers/info'}
              onPress={() => router.push('/dealers/info')}
            />
            <MenuItem 
              title="Payment" 
              isSubItem
              onPress={() => router.push('/dealers/payment')}
            />
            <MenuItem 
              title="Dealer Outstanding" 
              isSubItem
              onPress={() => router.push('/dealers/outstanding')}
            />
            <MenuItem 
              title="Dealer History" 
              isSubItem
              onPress={() => router.push('/dealers/history')}
            />
            <MenuItem 
              title="Credit Note" 
              isSubItem
              onPress={() => router.push('/dealers/credit-note')}
            />
          </>
        )}
        <MenuItem 
          title="Orders" 
          isActive={activePath.includes('/orders')}
          onPress={() => router.push('/orders')}
        />
        {activePath.includes('/orders') && (
          <>
            <MenuItem 
              title="Place Order" 
              isSubItem 
              isActive={activePath === '/orders/place'}
              onPress={() => router.push('/orders/place')}
            />
            <MenuItem 
              title="My Orders" 
              isSubItem
              onPress={() => router.push('/orders/my-orders')}
            />
            <MenuItem 
              title="Track Order" 
              isSubItem
              onPress={() => router.push('/orders/track')}
            />
          </>
        )}
        <MenuItem 
          title="Inventory" 
          isActive={activePath === '/inventory'}
          onPress={() => router.push('/inventory')}
        />
        <MenuItem 
          title="Field Development" 
          isActive={activePath === '/field-development'}
          onPress={() => router.push('/field-development')}
        />
        <MenuItem 
          title="Settlement" 
          isActive={activePath === '/settlement'}
          onPress={() => router.push('/settlement')}
        />
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => {
          router.replace('/');
          onClose();
        }}
      >
        <LogOut size={20} color="#000" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3192',
    marginBottom: 4,
  },
  subText: {
    fontSize: 8,
    color: '#2E3192',
    textAlign: 'center',
  },
  userInfo: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D1E7DD',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  employeeId: {
    fontSize: 12,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  activeMenuItem: {
    backgroundColor: '#3DD39E',
  },
  subMenuItem: {
    paddingLeft: 40,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  activeMenuText: {
    color: '#fff',
    fontWeight: '500',
  },
  subMenuText: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#D1E7DD',
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});