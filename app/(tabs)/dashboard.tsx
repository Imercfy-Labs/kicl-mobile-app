import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { Menu, Bell, User, Clock } from 'lucide-react-native';
import Logo from '@/components/Logo';
import { DrawerContext } from './_layout';

interface TimeRecord {
  date: string;
  punchIn: string;
  punchOut: string;
  totalHours: string;
}

export default function DashboardScreen() {
  const { user } = useAuth();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [punchInTime, setPunchInTime] = useState('');
  const [punchOutTime, setPunchOutTime] = useState('');
  const [totalHours, setTotalHours] = useState('0:00');
  const { toggleDrawer } = React.useContext(DrawerContext);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const calculateTotalHours = (inTime: string, outTime: string) => {
    if (!inTime || !outTime) return '0:00';

    const convertTimeToMinutes = (time: string) => {
      const [timeStr, period] = time.split(' ');
      let [hours, minutes] = timeStr.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };

    const inMinutes = convertTimeToMinutes(inTime);
    const outMinutes = convertTimeToMinutes(outTime);
    const diffMinutes = outMinutes - inMinutes;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const togglePunchStatus = () => {
    const currentTime = getCurrentTime();
    
    if (isPunchedIn) {
      setPunchOutTime(currentTime);
      setTotalHours(calculateTotalHours(punchInTime, currentTime));
    } else {
      setPunchInTime(currentTime);
      setPunchOutTime('');
      setTotalHours('0:00');
    }
    
    setIsPunchedIn(!isPunchedIn);
  };

  const ProgressCard = ({ title, value }) => (
    <View style={styles.progressCard}>
      <Text style={styles.progressTitle}>{title}</Text>
      <Text style={styles.progressValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
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

      <View style={styles.content}>
        <View style={styles.timeTrackingCard}>
          <Text style={styles.dateText}>{currentDate}</Text>
          
          <View style={styles.timeStatusContainer}>
            <Clock size={24} color="#666" style={styles.clockIcon} />
            <Text style={styles.timeStatusText}>
              {!punchInTime ? 'No Time Record' : isPunchedIn ? 'Currently Working' : 'Shift Complete'}
            </Text>
          </View>

          <View style={styles.timeDetails}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Punch In</Text>
              <Text style={styles.timeValue}>{punchInTime || '--:--'}</Text>
            </View>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Punch Out</Text>
              <Text style={styles.timeValue}>{punchOutTime || '--:--'}</Text>
            </View>
            <View style={styles.timeColumn}>
              <Text style={styles.timeLabel}>Total Hours</Text>
              <Text style={styles.timeValue}>{totalHours}</Text>
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
        </View>

        <Text style={styles.sectionTitle}>My Progress:</Text>

        <View style={styles.progressGrid}>
          <ProgressCard 
            title="No. of Dealers Visited" 
            value="5"
          />
          <ProgressCard 
            title="Sales Target Progress (monthly)" 
            value="63%"
          />
          <ProgressCard 
            title="Orders Placed Today" 
            value="3"
          />
          <ProgressCard 
            title="Order Value Today" 
            value="₹ 7000"
          />
          <ProgressCard 
            title="Field Activities this Week" 
            value="2"
          />
          <ProgressCard 
            title="Hours Worked Today" 
            value={totalHours}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    backgroundColor: '#E8F5E9',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  timeTrackingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
  },
  timeStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  clockIcon: {
    marginRight: 10,
  },
  timeStatusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  timeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  timeColumn: {
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  punchButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  punchInButton: {
    backgroundColor: '#8CC63F',
  },
  punchOutButton: {
    backgroundColor: '#FF3B30',
  },
  punchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  progressGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  progressCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
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