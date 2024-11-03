import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Explore from '@/app/(tabs)/explore';
import Login from '@/app/(tabs)/login';
import Signup from '@/app/(tabs)/signup';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen name="Explore" component={Explore} options={{ title: 'Home' }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
      <Stack.Screen name="Signup" component={Signup} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  );
}
