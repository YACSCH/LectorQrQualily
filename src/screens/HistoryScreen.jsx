import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  Alert,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScanDatabase } from "../services/Database";
import { useIsFocused } from "@react-navigation/native";
import { formatDate } from "../utils/formateDate";

export default function HistoryScreen() {
  const [scans, setScans] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const loadScans = useCallback(async () => {
    try {
      setRefreshing(true);
      const results = await ScanDatabase.getAllResults();
      setScans(results);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el historial");
      console.error("Error loading scans:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadScans();
    }
  }, [isFocused]);

  const handleOpenLink = async (url) => {
    if (!url) {
      Alert.alert("Información", "No hay enlace disponible");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "No se puede abrir este enlace");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al abrir el enlace");
      console.error("Error opening URL:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardRow}>
      <View style={styles.rowLeft}>
        <Ionicons name="qr-code" size={20} color="#5E35B1" />
        <Text style={styles.loteText}>{item.lote}</Text>
      </View>
      <View style={styles.rowRight}>
        <TouchableOpacity
          onPress={() => item.informe_url && handleOpenLink(item.informe_url)}
          disabled={!item.informe_url}
          style={styles.iconButton}
        >
          <Ionicons
            name="document-text-outline"
            size={22}
            color={item.informe_url ? "#1E88E5" : "#B0BEC5"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            item.certificado_url && handleOpenLink(item.certificado_url)
          }
          disabled={!item.certificado_url}
          style={styles.iconButton}
        >
          <Ionicons
            name="ribbon-outline"
            size={22}
            color={item.certificado_url ? "#43A047" : "#B0BEC5"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Cargando historial...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={scans}
        keyExtractor={(item) => item.lote}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadScans} />
        }
        ListHeaderComponent={
          <Text style={styles.headerTitle}>Historial de Escaneos</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={48} color="#9E9E9E" />
            <Text style={styles.emptyText}>No hay escaneos registrados</Text>
          </View>
        }
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 30,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    marginTop: 8,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#9E9E9E",
    marginTop: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  loteText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5E35B1",
    marginLeft: 8,
    flexShrink: 1,
  },

  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconButton: {
    marginLeft: 12,
  },
});
