import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { Menu, Bell, User } from 'lucide-react-native';
import Logo from '@/components/Logo';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const lastInTime = "10:12 Am";
  const lastOutTime = "6:40 Pm";

  const togglePunchStatus = () => {
    setIsPunchedIn(!isPunchedIn);
  };

  const ProgressCard = ({ title, value, unit = '' }) => (
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>{title}</Text>
      <Text style={styles.progressValue}>{value}{unit}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Menu size={24} color="#000" />
        </TouchableOpacity>
        <Logo size="small" showText={false} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <User size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.punchButton, isPunchedIn ? styles.punchOutButton : styles.punchInButton]}
        onPress={togglePunchStatus}
      >
        <Text style={styles.punchButtonText}>
          {isPunchedIn ? 'Punch Out' : 'Punch In'}
        </Text>
      </TouchableOpacity>

      <View style={styles.timeInfo}>
        <Text style={styles.timeText}>Last In Time: {lastInTime}</Text>
        <Text style={styles.timeText}>Last Out Time: {lastOutTime}</Text>
      </View>

      <Text style={styles.sectionTitle}>My Progress:</Text>

      <View style={styles.progressGrid}>
        <ProgressCard title="No. of Dealers Visited" value="5" />
        <ProgressCard title="Sales Target Progress (monthly)" value="63" unit="%" />
        <ProgressCard title="Orders Placed Today" value="3" />
        <ProgressCard title="Order Value Today" value="₹ 7000" />
        <ProgressCard title="Field Activities this Week" value="2" />
        <ProgressCard title="Hours Worked Today" value="5" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  punchButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  punchInButton: {
    backgroundColor: '#8CC63F',
  },
  punchOutButton: {
    backgroundColor: '#FF3B30',
  },
  punchButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  timeText: {
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 15,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  progressCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});