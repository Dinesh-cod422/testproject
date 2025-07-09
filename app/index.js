import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useLogin } from '../api/hooks';
import { Button, Input } from '../components';
import { useAuthStore } from '../store/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('password123');
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const { mutate: login, isPending: isLoading } = useLogin();

  const handleLogin = () => {
    login(
      { email, password },
      {
        onSuccess: async (data) => {
          await AsyncStorage.setItem('token', data.token);
          setToken(data.token);
          router.replace('/dashboard');
        },
        onError: (error) => {
          Alert.alert('Login Failed', error.message || 'Invalid email or password');
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharmacy App Login</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2a44',
    marginBottom: 20,
  },
});