import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { loginUser } from '../services/Api';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.navigate("main", { screen: "scan" });
    }
  }, [token]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    try {
      const user = await loginUser(email, password);
      if (user) {
        setToken(user);
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Título "Certificados QR" añadido aquí */}
        <Text style={styles.appTitle}>Certificados QR</Text>
        
        <View style={styles.header}>
          <Ionicons 
            name="qr-code" 
            size={width * 0.15} 
            color="#5E35B1" 
            style={styles.icon}
          />
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            icon={<Ionicons name="mail" size={20} color="#757575" />}
          />

          <InputField
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            icon={<Ionicons name="lock-closed" size={20} color="#757575" />}
          />

          <PrimaryButton 
            title="Ingresar" 
            onPress={handleLogin} 
            loading={loading}
            style={styles.loginButton}
            icon={<Ionicons name="log-in" size={20} color="white" />}
          />

          {/* <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity> */}
        </View>

{/*         <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.footerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#5E35B1',
    textAlign: 'center',
    marginTop: width * 0.05,
    marginBottom: width * 0.02,
  },
  header: {
    alignItems: 'center',
    paddingBottom: width * 0.05,
    paddingHorizontal: width * 0.1,
  },
  icon: {
    marginBottom: width * 0.03,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: width * 0.01,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#757575',
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: width * 0.1,
    marginTop: width * 0.05,
  },
  loginButton: {
    marginTop: width * 0.06,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: width * 0.03,
  },
  forgotPasswordText: {
    color: '#5E35B1',
    fontSize: width * 0.035,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: width * 0.08,
    paddingBottom: width * 0.05,
  },
  footerText: {
    color: '#757575',
    fontSize: width * 0.035,
  },
  footerLink: {
    color: '#5E35B1',
    fontWeight: '500',
    marginLeft: 5,
    fontSize: width * 0.035,
  },
});

export default LoginScreen;