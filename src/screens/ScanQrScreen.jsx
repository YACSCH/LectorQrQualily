import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/AuthContext';
import { fetchDataByCodigo } from '../services/Api';
import QRScannerOverlay from '../components/QrScannerOverlay';
import PrimaryButton from '../components/PrimaryButton';

const ScanQrScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);

/*   useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.rerequestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestCameraPermission();
  }, []); */

 /*  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const result = await fetchDataByCodigo(data, token);
      navigation.navigate('Result', { resultado: result });
    } catch (err) {
      Alert.alert('Error', 'Código no encontrado');
      setScanned(false);
    }
  };
 */
  if (hasPermission === null) return null;
  if (hasPermission === false) return <View><Text>Permiso de cámara denegado</Text></View>;

  return (

    <View style={styles.container}>
    <Text>Escanea el código QR</Text>
{/*       <CameraView
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{
                                  barcodeTypes: ["qr"],
                                }}
      >
        <QRScannerOverlay />
      </CameraView> */}

      <View style={styles.buttonContainer}>
        <PrimaryButton title="Ingreso manual" onPress={() => navigation.navigate('ManualEntry')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default ScanQrScreen;
