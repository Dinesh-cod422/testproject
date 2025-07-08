import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchDashboard } from '../api';

export default function DashboardScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const data = await fetchDashboard(token);
        setUserData(data);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userData.fullName}</Text>
      <Text>Patient ID: {userData.patientId}</Text>
      <Text>Current Plan: {userData.currentPlan}</Text>
      <Text>Next Delivery: {new Date(userData.nextDeliveryDate).toLocaleDateString()}</Text>
      <Text>Remaining Medication: {userData.remainingMedication}</Text>
      <Text>Status: {userData.status}</Text>
      <Text>Billing Status: {userData.billingStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
