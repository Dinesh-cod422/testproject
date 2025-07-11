import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDashboard } from '../../api/hooks';
import { Button } from '../../components';
import { useAuthStore } from '../../store/auth';

export default function DashboardScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const { data: userData, isPending: isLoading, error } = useDashboard(token);

  if (isLoading)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error.message || 'Failed to load dashboard'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Hi, {userData.fullName}</Text>
      <Text style={styles.subHeading}>Here's your medication summary</Text>

      <View style={styles.card}>
        <InfoRow label="Patient ID" value={userData.patientId} />
        <InfoRow label="Current Plan" value={userData.currentPlan} />
        <InfoRow
          label="Next Delivery"
          value={new Date(userData.nextDeliveryDate).toLocaleDateString()}
        />
        <InfoRow label="Remaining Medication" value={userData.remainingMedication} />
        <InfoRow label="Status" value={userData.status} />
        <InfoRow label="Billing Status" value={userData.billingStatus} />
      </View>

      <Button
        title="📦  View Shipment History"
        onPress={() => router.push('/tabs/shipment-history')}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff1f2',
  },
  errorText: {
    color: '#b91c1c',
    textAlign: 'center',
    fontSize: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});