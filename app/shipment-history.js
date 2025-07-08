import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useShipments } from '../api/hooks';
import { useAuthStore } from '../store/auth';

export default function ShipmentHistoryScreen() {
  const token = useAuthStore((state) => state.token);
  const { data: shipments, isPending: isLoading, error } = useShipments(token);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error.message || 'Failed to load shipments'}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipment History</Text>
      <FlashList
        data={shipments}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        estimatedItemSize={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
