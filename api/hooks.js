import { useMutation, useQuery } from '@tanstack/react-query';

const API_URL = 'http://192.168.29.197:3000/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      return data;
    },
  });
};

export const useDashboard = (token) => {
  return useQuery({
    queryKey: ['dashboard', token],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch dashboard');
      return data;
    },
    enabled: !!token,
  });
};

export const useShipments = (token) => {
  return useQuery({
    queryKey: ['shipments', token],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/shipments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch shipments');
      return data;
    },
    enabled: !!token,
  });
};
