import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
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
      navigation.navigate("Result", { resultado: result });
    } catch (err) {
      Alert.alert("Error", "Código no encontrado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ingreso Manual</Text>
      <InputField
        placeholder="Nro Lote"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="default"
        autoCapitalize="none"
      />
      <PrimaryButton title="Buscar" onPress={handleSearch} loading={loading} />
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
});

export default ManualEntryScreen;
