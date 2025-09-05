import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Stack, useRouter, useSegments } from 'expo-router';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inHomeGroup = segments[0] === '(home)';

    if (isSignedIn && !inHomeGroup) {
      // User is signed in but not in home group, redirect to home
      router.replace('/(home)');
    } else if (!isSignedIn && inHomeGroup) {
      // User is not signed in but in home group, redirect to welcome
      // Note: Allow access to auth group for sign-in/sign-up
      router.replace('/');
    }
  }, [isSignedIn, isLoaded, segments]);

  // Show loading while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#25D366" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack 
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
        fullScreenGestureEnabled: true,
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
    );
  }

  return (
    <ErrorBoundary>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <InitialLayout />
      </ClerkProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});