import { useEffect } from 'react';
import { AuthProvider } from './src/store/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

import { openDatabaseConnection } from './src/services/Database';
import { Platform } from 'react-native';

export default function App() {

console.log("Plataforma:", Platform.OS);

useEffect(() => {
  openDatabaseConnection().catch(err => console.log("DB init error:", err));
}, []);
 return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}