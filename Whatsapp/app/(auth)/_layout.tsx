import { Stack } from 'expo-router';

export default function AuthRoutesLayout() {
  return (
    <Stack 
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation: 'slide_from_right',
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name="sign-up" 
        options={{
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          }} 
      />
      <Stack.Screen 
        name="sign-in" 
        options={{
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
          }} 
      />
    </Stack>
  );
}