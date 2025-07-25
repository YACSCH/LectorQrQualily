import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView, Image, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { AuthContext } from "../store/AuthContext";
import { fetchDataByCodigo } from "../services/Api";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { ScanDatabase } from "../services/Database";

const { width } = Dimensions.get('window');

const ManualEntryScreen = () => {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!codigo) {
      Alert.alert("Error", "Por favor ingresa un código de lote");
      return;
    }

    if (codigo.length < 10) {
      Alert.alert("Error", "El código debe tener al menos 10 caracteres");
      return;
    }

    setLoading(true);
    try {
      const result = await fetchDataByCodigo(codigo, token);

      await ScanDatabase.insertResult(result)
      
      navigation.navigate("result", { resultado: result });
    } catch (err) {
      Alert.alert("Error", err.message || "No se pudo encontrar el lote");
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
        <View style={styles.header}>
          <Ionicons 
            name="keypad" 
            size={width * 0.15} 
            color="#5E35B1" 
            style={styles.icon}
          />
          <Text style={styles.title}>Ingreso Manual</Text>
          <Text style={styles.subtitle}>Ingresa el número de lote para buscar</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            placeholder="Número de Lote (10 dígitos)"
            value={codigo}
            onChangeText={setCodigo}
            keyboardType='numeric'
            autoCapitalize="none"
            maxLength={10}
            icon={<Ionicons name="barcode" size={24} color="#757575" />}
          />
          
          <PrimaryButton 
            title="Buscar Lote" 
            onPress={handleSearch} 
            loading={loading}
            style={styles.button}
            icon={<Ionicons name="search" size={20} color="white" />}
          />

          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>o</Text>
            <View style={styles.line} />
          </View>

          <PrimaryButton 
            title="Escanear Código QR" 
            onPress={() => navigation.navigate("main", { screen: "scan"})}
            style={styles.secondaryButton}
            icon={<Ionicons name="qr-code" size={20} color="#5E35B1" />}
            textColor="#5E35B1"
            backgroundColor="#EDE7F6"
          />
        </View>
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
  button: {
    marginTop: width * 0.06,
  },
  secondaryButton: {
    marginTop: width * 0.03,
    borderWidth: 1,
    borderColor: '#5E35B1',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: width * 0.06,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    width: width * 0.1,
    textAlign: 'center',
    color: '#9E9E9E',
  },
});

export default ManualEntryScreen;