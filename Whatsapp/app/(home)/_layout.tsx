import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack 
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
        headerShown: false,
      }}
    />
  );
}