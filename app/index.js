import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components';

const { width } = Dimensions.get('window');

export default function IndexScreen() {
  const router = useRouter();

  const onSubmit = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          BestPharma{'\n'}Your Trusted Online Pharmacy
        </Text>
        <Text style={styles.para}>
          BestPharma delivers trusted, affordable,{'\n'}and convenient online pharmacy services.
        </Text>
      </View>

      {/* Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../assets/images/FoodCourier.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Sign In"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2a44',
    marginBottom: 12,
  },
  para: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    lineHeight: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: width * 0.8,
    height: width * 0.8,
  },
  footer: {
    marginBottom: 20,
  },
});