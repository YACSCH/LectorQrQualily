// src/navigation/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import ScanQrScreen from '../screens/ScanQrScreen';
import ManualEntryScreen from '../screens/ManualEntryScreen';
import ResultScreen from '../screens/ResultScreen';
import HistoryScreen from '../screens/HistoryScreen';

import { useAuth } from '../store/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="scan"
        component={ScanQrScreen}
        options={{ title: 'Leer QR' }}
      />
      <Tab.Screen
        name="history"
        component={HistoryScreen}
        options={{ title: 'Historial' }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          // Sin login: mostrar solo LoginScreen
          <Stack.Screen name="login" component={LoginScreen} />
        ) : (
          
          <>
            <Stack.Screen name="main" component={TabsNavigator} />
            <Stack.Screen name="result" component={ResultScreen} />
            <Stack.Screen name="manualEntry" component={ManualEntryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
