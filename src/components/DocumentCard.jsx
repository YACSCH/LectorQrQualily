import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DocumentCard({ 
  titulo, 
  icono, 
  color, 
  url, 
  fecha, 
  openUrl, 
  formatDate, 
  styles 
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name={icono} size={width * 0.07} color={color} />
        <Text style={styles.cardTitle}>{titulo}</Text>
      </View>

      {url ? (
        <>
          <TouchableOpacity style={styles.linkButton} onPress={() => openUrl(url)}>
            <Text style={styles.linkText}>Abrir {titulo}</Text>
            <Ionicons name="open-outline" size={width * 0.06} color={color} />
          </TouchableOpacity>
          <Text style={styles.dateText}>
            <Ionicons name="calendar" size={width * 0.04} color="#757575" /> {formatDate(fecha)}
          </Text>
        </>
      ) : (
        <Text style={styles.emptyText}>No hay {titulo.toLowerCase()} disponible</Text>
      )}
    </View>
  );
}