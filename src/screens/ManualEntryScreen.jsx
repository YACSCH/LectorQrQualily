import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView, Image } from "react-native";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { AuthContext } from "../store/AuthContext";
import { fetchDataByCodigo } from "../services/Api";
import { useNavigation } from "@react-navigation/native";

const ManualEntryScreen = () => {
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!codigo) {
      Alert.alert("Error", "Ingresa un código");
      return;
    }

    setLoading(true);
    try {
      const result = await fetchDataByCodigo(codigo, token);
      navigation.navigate("result", { resultado: result });
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
              source={require('../../assets/qr-codigo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
      <Text style={styles.title}>Ingreso Manual</Text>
      <InputField
        placeholder="Nro Lote"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType='numeric'
        autoCapitalize="none"
      />
     <PrimaryButton title="Buscar" onPress={handleSearch} loading={loading} />
     <PrimaryButton title="Escanear otro codigo" onPress={() => navigation.navigate("main", { screen: "scan" })} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#007AFF",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default ManualEntryScreen;
