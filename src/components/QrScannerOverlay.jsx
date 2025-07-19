import React from 'react';
import { View, StyleSheet } from 'react-native';

const QRScannerOverlay = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    width: 250,
    height: 250,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
});

export default QRScannerOverlay;
