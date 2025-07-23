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
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors'


import { useAuth } from '../store/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator   screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary, // Color para el tab activo
        tabBarInactiveTintColor: colors.gray, // Color para tabs inactivos
        
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="scan"
        component={ScanQrScreen}
        options={{ title: 'Leer QR',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'qr-code' : 'qr-code-outline'}
              size={25}
              color={color}
            />
          ),
         } }
      />
      <Tab.Screen
        name="history"
        component={HistoryScreen}
        options={{ title: 'Historial',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'time' : 'time-outline'}
              size={26}
              color={color}
            />
          ),

         }}
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
