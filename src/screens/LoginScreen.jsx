import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { loginUser } from '../services/Api';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../store/AuthContext';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }
    console.log('Intentando iniciar sesión con:', email, password);
     try {
      
      const user = await loginUser( email, password );
     

      if (user) {
        setToken(user);
        navigation.navigate('Scan');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } 

  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/qr-codigo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Iniciar Sesión</Text>
      <InputField
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputField
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        autoCapitalize="none"
        secureTextEntry
        
      />
      <PrimaryButton title="Ingresar" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
