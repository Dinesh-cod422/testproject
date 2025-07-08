import { useRouter } from 'expo-router';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { useDashboard } from '../api/hooks';
import { useAuthStore } from '../store/auth';

export default function DashboardScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { data: userData, isPending: isLoading, error } = useDashboard(token);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error.message || 'Failed to load dashboard'}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {userData.fullName}</Text>
      <Text>Patient ID: {userData.patientId}</Text>
      <Text>Current Plan: {userData.currentPlan}</Text>
      <Text>Next Delivery: {new Date(userData.nextDeliveryDate).toLocaleDateString()}</Text>
      <Text>Remaining Medication: {userData.remainingMedication}</Text>
      <Text>Status: {userData.status}</Text>
      <Text>Billing Status: {userData.billingStatus}</Text>
      <Button
        title="View Shipment History"
        onPress={() => router.push('/shipment-history')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
