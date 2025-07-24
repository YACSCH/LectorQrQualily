import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { ScanDatabase } from '../services/Database';
import { useIsFocused } from '@react-navigation/native';

export default function HistoryScreen({ navigation }) {
  const [scans, setScans] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadScans = async () => {
    try {
      setRefreshing(true);
      const results = await ScanDatabase.getAllResults();
      console.log(results)
      setScans(results);
    } catch (error) {
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

  return (
    <FlatList
      data={scans}
      keyExtractor={item => item.lote}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadScans}
        />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Result', { 
            scanData: JSON.parse(item.raw_data || '{}'),
            isNewScan: false
          })}
        >
          <Text style={styles.loteText}>{item.lote}</Text>
          <Text style={styles.dateText}>
            {new Date(item.scan_date).toLocaleString()}
          </Text>
          {item.informe_url && (
            <Text style={styles.urlText}>Ver informe disponible</Text>
          )}
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = {
  listContainer: {
    padding: 16
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2
  },
  loteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4
  },
  urlText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8
  }
};