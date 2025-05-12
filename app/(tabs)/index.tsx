import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import GradientBackground from '@/components/GradientBackground';
import MetricCard from '@/components/MetricCard';
import { useAuth } from '../auth/AuthContext';

export default function DashboardScreen() {
  const { user } = useAuth();
  
  return (
    <GradientBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Performance</Text>
          <View style={styles.cardsRow}>
            <MetricCard 
              title="Target (monthly)" 
              value="89%" 
              style={{ flex: 1 }}
            />
            <MetricCard 
              title="Orders Value" 
              value="₹150,000" 
              subtitle="this month" 
              style={{ flex: 1 }}
            />
          </View>
          
          <View style={styles.cardsRow}>
            <MetricCard 
              title="Active Dealers" 
              value="27" 
              subtitle="out of 35" 
              style={{ flex: 1 }}
            />
            <MetricCard 
              title="Hours Worked" 
              value="125" 
              subtitle="this month" 
              style={{ flex: 1 }}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <View style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>+</Text>
              </View>
              <Text style={styles.quickActionText}>New Order</Text>
            </View>
            
            <View style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>↑</Text>
              </View>
              <Text style={styles.quickActionText}>Upload Report</Text>
            </View>
            
            <View style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>👥</Text>
              </View>
              <Text style={styles.quickActionText}>Add Dealer</Text>
            </View>
            
            <View style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>📊</Text>
              </View>
              <Text style={styles.quickActionText}>View Analytics</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Order #TK3842 Delivered</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>New dealer registered - Krishi Kendra</Text>
                <Text style={styles.activityTime}>Yesterday, 2:30 PM</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Monthly target updated</Text>
                <Text style={styles.activityTime}>2 days ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Field visit scheduled - Ambala region</Text>
                <Text style={styles.activityTime}>3 days ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#333',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(61, 211, 158, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickActionIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3DD39E',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3DD39E',
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
  },
});