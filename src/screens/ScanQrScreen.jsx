import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/AuthContext";
import { fetchDataByCodigo } from "../services/Api";
import QRScannerOverlay from "../components/QrScannerOverlay";
import PrimaryButton from "../components/PrimaryButton";

export default function ScanQrScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();

    return () => setIsActive(false);
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (!scanned && isActive) {
      setScanned(true);

      try {
        const lote = data.trim().substring(0, 10);

        const result = await fetchDataByCodigo(lote, token);
        
        navigation.navigate("Result", { resultado: result });
      
      } catch (err) {
      
         Alert.alert(
    "Error", 
    err.response?.status === 404 
      ? "El código no existe en nuestros registros" 
      : "Error al consultar el servidor"
  );
      
      } finally {
      
        setTimeout(() => setScanned(false), 3000);
      
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centerContainer}>
        <Text>Solicitando permiso para usar la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centerContainer}>
        <Text>No se otorgaron permisos para usar la cámara</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417", "upc_a", "ean13"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <QRScannerOverlay />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Ingreso manual"
          onPress={() => navigation.navigate("ManualEntry")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20,
    gap: 10,
  },
});
