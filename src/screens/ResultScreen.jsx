import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";
import { formatDate } from "../utils/formateDate";
import DocumentCard from "../components/DocumentCard";

const { width } = Dimensions.get("window");

const ResultScreen = ({ route, navigation }) => {
  const { resultado } = route.params;

  const openUrl = async (url) => {
    if (!url) {
      Alert.alert("Información", "No hay enlace disponible");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url.trim());
      } else {
        Alert.alert("Error", "No se puede abrir este enlace");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al abrir el enlace");
      console.error("Error opening URL:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Ionicons
              name="checkmark-circle"
              size={width * 0.1}
              color="#4CAF50"
            />
            <Text style={styles.title}>Resultado del Escaneo</Text>
          </View>

          <View style={styles.content}>
            {/* Card Lote */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="qr-code" size={width * 0.07} color="#5E35B1" />
                <Text style={styles.cardTitle}>Información del Lote</Text>
              </View>
              <Text style={styles.loteText}>{resultado.lote}</Text>
            </View>
            <DocumentCard
              titulo="Informe"
              icono="document-text"
              color="#2196F3"
              url={resultado.informe}
              fecha={resultado.fecha_informe}
              openUrl={openUrl}
              formatDate={formatDate}
              styles={styles}
            />

            <DocumentCard
              titulo="Certificado"
              icono="ribbon"
              color="#FF9800"
              url={resultado.certificado}
              fecha={resultado.fecha_certificado}
              openUrl={openUrl}
              formatDate={formatDate}
              styles={styles}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <PrimaryButton
            title="Escanear otro código"
            onPress={() => navigation.navigate("main", { screen: "scan" })}
            icon={
              <Ionicons
                name="qr-code-outline"
                size={width * 0.05}
                color="white"
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5ff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginTop:20
  },
  scrollContent: {
    paddingBottom: Dimensions.get("window").height * 0.03,
  },
  header: {
    alignItems: "center",
    paddingVertical: Dimensions.get("window").height * 0.02,
    backgroundColor: "#FFFFFF",
    marginBottom: Dimensions.get("window").height * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#333",
    marginTop: Dimensions.get("window").height * 0.01,
  },
  content: {
    paddingHorizontal: width * 0.05,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: width * 0.04,
    marginBottom: Dimensions.get("window").height * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Dimensions.get("window").height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingBottom: Dimensions.get("window").height * 0.01,
  },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#333",
    marginLeft: width * 0.03,
  },
  loteText: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#5E35B1",
    textAlign: "center",
    marginVertical: Dimensions.get("window").height * 0.01,
  },
  linkButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: width * 0.04,
    marginTop: Dimensions.get("window").height * 0.01,
  },
  linkText: {
    fontSize: width * 0.04,
    fontWeight: "600",
    color: "#333",
  },
  dateText: {
    fontSize: width * 0.035,
    color: "#757575",
    marginTop: Dimensions.get("window").height * 0.015,
    fontStyle: "italic",
  },
  emptyText: {
    fontSize: width * 0.04,
    color: "#9E9E9E",
    textAlign: "center",
    marginVertical: Dimensions.get("window").height * 0.01,
    fontStyle: "italic",
  },
  footer: {
    paddingHorizontal: width * 0.05,
    paddingBottom: Dimensions.get("window").height * 0.03,
    backgroundColor: "#f5f5f5ff",
  },
});

export default ResultScreen;
