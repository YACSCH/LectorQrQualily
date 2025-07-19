import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ScanQRScreen from '../screens/ScanQrScreen';
import ManualEntryScreen from '../screens/ManualEntryScreen';
import ResultScreen from '../screens/ResultScreen';
import { AuthContext } from '../store/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  
const { token } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Scan" component={ScanQRScreen} />
            <Stack.Screen name="ManualEntry" component={ManualEntryScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
