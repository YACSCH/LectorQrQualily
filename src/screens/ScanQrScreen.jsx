import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Camera, CameraView } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/AuthContext';
import { fetchDataByCodigo } from '../services/Api';
import QRScannerOverlay from '../components/QrScannerOverlay';
import PrimaryButton from '../components/PrimaryButton';

export default function ScanQrScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();

  const { token } = useContext(AuthContext);

useEffect(() => {
  const getCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
    
      setHasPermission(status === 'granted');
    } catch (error) {
      console.error("Error al pedir permiso de cámara:", error);
      setHasPermission(false);
    }
  };

  getCameraPermission();
}, []);

  const handleBarCodeScanned = async ( data ) => {
   

   if (!scanned) {
      setScanned(true);
       
          console.log(`Tipo: ${type}, Datos: ${data}`);
          
         
          
      
      try {
        const result = await fetchDataByCodigo(data, token);
        navigation.navigate('Result', { resultado: result });
      } catch (err) {
        Alert.alert('Error', 'Código no encontrado');
        setScanned(false);
      } 
   }
    setTimeout(() => setScanned(false), 4000);

  }; 

  if (hasPermission === null) return <View><Text>Solicitando permisos de cámara..</Text></View>;
  if (hasPermission === false) return <View><Text>Permiso de cámara denegado</Text></View>;
    return (
    <View  style={styles.container}>
      
      <CameraView
      
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ['qr'], }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio='4:3'
        
      >
        <QRScannerOverlay />
      </CameraView>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Ingreso manual" onPress={() => navigation.navigate('ManualEntry')} />
      </View> 
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
    gap: 10,
  },
}); 