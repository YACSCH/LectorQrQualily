import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Linking, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScanDatabase } from '../services/Database';
import { useIsFocused } from '@react-navigation/native';
import { formatDate } from '../utils/formateDate';

export default function HistoryScreen() {
  const [scans, setScans] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadScans = async () => {
    try {
      setRefreshing(true);
      const results = await ScanDatabase.getAllResults();
      setScans(results);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el historial');
      console.error('Error loading scans:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadScans();
    }
  }, [isFocused]);

  const handleOpenLink = async (url) => {
    if (!url) {
      Alert.alert('Información', 'No hay enlace disponible');
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No se puede abrir este enlace');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al abrir el enlace');
      console.error('Error opening URL:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={scans}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={loadScans}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>Historial de Escaneos</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={48} color="#9E9E9E" />
            <Text style={styles.emptyText}>No hay escaneos registrados</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="qr-code" size={24} color="#5E35B1" />
              <Text style={styles.loteText}>{item.lote}</Text>
            </View>

            <View style={styles.linksContainer}>
              {item.informe_url && (
                <TouchableOpacity 
                  style={styles.linkItem}
                  onPress={() => handleOpenLink(item.informe_url)}
                >
                  <View style={styles.linkContent}>
                    <Ionicons name="document-text-outline" size={20} color="#1E88E5" />
                    <Text style={styles.linkText}>Ver Informe</Text>
                  </View>
                  <Text style={styles.linkDate}>{formatDate(item.fecha_informe)}</Text>
                </TouchableOpacity>
              )}

              {item.certificado_url && (
                <TouchableOpacity 
                  style={styles.linkItem}
                  onPress={() => handleOpenLink(item.certificado_url)}
                >
                  <View style={styles.linkContent}>
                    <Ionicons name="ribbon-outline" size={20} color="#43A047" />
                    <Text style={styles.linkText}>Ver Certificado</Text>
                  </View>
                  <Text style={styles.linkDate}>{formatDate(item.fecha_certificado)}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop:30,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 8,
    textAlign:"center"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 12,
  },
  loteText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5E35B1',
    marginLeft: 8,
    flex: 1,
  },
  scanDate: {
    fontSize: 12,
    color: '#757575',
  },
  linksContainer: {
    marginTop: 4,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#424242',
    marginLeft: 12,
  },
  linkDate: {
    fontSize: 12,
    color: '#9E9E9E',
  },
});