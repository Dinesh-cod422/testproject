import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useShipments } from '../../api/hooks';
import { Card } from '../../components';
import { useAuthStore } from '../../store/auth';

export default function ShipmentHistoryScreen() {
  const token = useAuthStore((state) => state.token);
  const { data: shipments, isPending: isLoading, error } = useShipments(token);

  if (isLoading) return <ActivityIndicator size="large" color="#2563eb" />;
  if (error) {
    return (
      <Text style={styles.errorText}>
        {error.message || 'Failed to load shipments'}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shipment History</Text>
      <FlashList
        data={shipments}
        renderItem={({ item }) => (
          <Card>
            <Text style={styles.itemText}>Date: {item.date}</Text>
            <Text style={styles.itemText}>Status: {item.status}</Text>
            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
          </Card>
        )}
        keyExtractor={(item) => item._id}
        estimatedItemSize={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937', // gray-800
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    color: '#374151', // gray-700
    marginBottom: 8,
  },
  errorText: {
    color: '#ef4444', // red-500
    textAlign: 'center',
    marginTop: 20,
  },
});