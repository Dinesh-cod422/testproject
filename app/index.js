import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { useLogin } from '../api/hooks';
import { Button, Input } from '../components';
import { useAuthStore } from '../store/auth';

// Define validation schema with Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
});

export default function LoginScreen() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const { mutate: login, isPending: isLoading } = useLogin();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'dinesh@gmail.com',
      password: 'password123',
    },
  });

  const onSubmit = (data) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: async (response) => {
          await AsyncStorage.setItem('token', response.token);
          setToken(response.token);
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
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View>
            <Input
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          </View>
        )}
      />
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleSubmit(onSubmit)}
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
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 8,
  },
});
