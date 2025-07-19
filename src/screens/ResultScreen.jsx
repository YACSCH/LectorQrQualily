import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const ResultScreen = ({ route, navigation }) => {
  const { resultado } = route.params;

  const openUrl = (url) => {
    if (url) Linking.openURL(url.trim());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultado</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Lote:</Text>
        <Text style={styles.value}>{resultado.lote}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Informe:</Text>
        <TouchableOpacity onPress={() => openUrl(resultado.informe)}>
          <Text style={[styles.value, styles.link]}>Ver Informe</Text>
        </TouchableOpacity>
        <Text style={styles.date}>
          Fecha: {new Date(resultado.fecha_informe).toLocaleString()}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Certificado:</Text>
        <TouchableOpacity onPress={() => openUrl(resultado.certificado)}>
          <Text style={[styles.value, styles.link]}>Ver Certificado</Text>
        </TouchableOpacity>
        <Text style={styles.date}>
          Fecha: {new Date(resultado.fecha_certificado).toLocaleString()}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Creado el:</Text>
        <Text style={styles.value}>
          {new Date(resultado.created_at).toLocaleString()}
        </Text>
      </View>

      <PrimaryButton title="Escanear otro código" onPress={() => navigation.navigate('Scan')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 25,
    color: '#007AFF',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});

export default ResultScreen;
