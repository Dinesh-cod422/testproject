import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useDashboard } from '../../api/hooks';
import { Button, Card } from '../../components';
import { useAuthStore } from '../../store/auth';

export default function DashboardScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { data: userData, isPending: isLoading, error } = useDashboard(token);

  if (isLoading) return <ActivityIndicator size="large" color="#2563eb" />;
  if (error) {
    return (
      <Text style={styles.errorText}>
        {error.message || 'Failed to load dashboard'}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, {userData.fullName}</Text>
      <Card>
        <Text style={styles.itemText}>Patient ID: {userData.patientId}</Text>
        <Text style={styles.itemText}>Current Plan: {userData.currentPlan}</Text>
        <Text style={styles.itemText}>
          Next Delivery: {new Date(userData.nextDeliveryDate).toLocaleDateString()}
        </Text>
        <Text style={styles.itemText}>Remaining Medication: {userData.remainingMedication}</Text>
        <Text style={styles.itemText}>Status: {userData.status}</Text>
        <Text style={styles.itemText}>Billing Status: {userData.billingStatus}</Text>
      </Card>
      <Button
        title="View Shipment History"
        onPress={() => router.push('/tabs/shipment-history')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // p-5
    backgroundColor: '#ffffff', // bg-white
  },
  heading: {
    fontSize: 24, // text-2xl
    fontWeight: 'bold', // font-bold
    color: '#1f2937', // text-gray-800
    marginBottom: 20, // mb-5
  },
  itemText: {
    fontSize: 18, // text-lg
    color: '#374151', // text-gray-700
    marginBottom: 8, // mb-2
  },
  errorText: {
    color: '#ef4444', // text-red-500
    textAlign: 'center', // text-center
    marginTop: 20, // mt-5
  },
});