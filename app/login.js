import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { z } from 'zod';
import { useLogin } from '../api/hooks';
import { Button, Input } from '../components';
import { useAuthStore } from '../store/auth';

const { width } = Dimensions.get('window');

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
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/images/iconmain.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>BestPharma</Text>
        <Text style={styles.subtitle}>Your Trusted Online Pharmacy</Text>

        <View style={styles.card}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
                {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
              </View>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  style={styles.input}
                />
                {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
              </View>
            )}
          />

          <Button
            title={isLoading ? 'Logging in...' : 'Login'}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            style={styles.button}
            textStyle={styles.buttonText}
          />


        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#F5F8FF', // Soft blue background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E3A8A', // Pharmacy blue
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    fontWeight: '400',
  },
  card: {
    width: width - 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 24,
    borderWidth: 1,
    borderColor: "#dedede"
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#3B82F6', // Vibrant blue
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  signupText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  signupLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});