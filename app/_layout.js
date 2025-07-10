import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth';

const queryClient = new QueryClient();

export default function RootLayout() {
  const { token } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (token && segments[0] !== 'tabs') {
      router.replace('/tabs/dashboard');
    } else if (!token && segments[0] === 'tabs') {
      router.replace('/index');
    }
  }, [token, segments]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}