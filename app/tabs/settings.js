import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components';
import { useAuthStore } from '../../store/auth';

export default function SettingsScreen() {
  const router = useRouter();
  const { clearToken } = useAuthStore();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    clearToken();
    router.replace('/index');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Button title="Log Out" onPress={handleLogout} />
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
    fontSize: 24,            // text-2xl
    fontWeight: 'bold',      // font-bold
    textAlign: 'center',     // text-center
    color: '#1f2937',        // text-gray-800
    marginBottom: 20,        // mb-5
  },
});