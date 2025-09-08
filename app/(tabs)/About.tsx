import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { scale, normalizeFont } from "@/utils/responsive";

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Fun Logo */}
      <Image
        source={{ uri: "https://img.icons8.com/color/200/000000/happy.png" }}
        style={styles.logo}
      />
      

      {/* Title */}
      <Text style={styles.title}>👋 Hello !</Text>
      <Text style={styles.subtitle}>Welcome to our Fun App 🎉</Text>

      {/* Description */}
      <Text style={styles.description}>
        This app is made to make learning and playing easy 🧩✨. You can tap,
        explore, and have fun while discovering new things! 🚀🌈
      </Text>

      {/* Fun Features */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>✨ What You Can Do</Text>
        <Text style={styles.listItem}>🎨 Draw and color</Text>
        <Text style={styles.listItem}>📚 Examine Paper</Text>
        
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Made for you!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    alignItems: "center",
    backgroundColor: "#FFF8E7",
  },
  logo: {
    width: scale(150),
    height: scale(150),
    marginBottom: scale(20),
  },
  title: {
    fontSize: normalizeFont(28),
    fontWeight: "800",
    color: "#FF6F61",
    marginBottom: scale(5),
    textAlign: "center",
  },
  subtitle: {
    fontSize: normalizeFont(20),
    color: "#FF9F1C",
    marginBottom: scale(20),
    textAlign: "center",
  },
  description: {
    fontSize: normalizeFont(18),
    color: "#444",
    textAlign: "center",
    marginBottom: scale(25),
    lineHeight: scale(26),
  },
  card: {
    backgroundColor: "#E0F7FA",
    padding: scale(15),
    borderRadius: scale(20),
    width: "100%",
    marginBottom: scale(20),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: scale(6),
    elevation: 3,
  },
  sectionTitle: {
    fontSize: normalizeFont(22),
    fontWeight: "700",
    color: "#00796B",
    marginBottom: scale(10),
  },
  listItem: {
    fontSize: normalizeFont(18),
    marginBottom: scale(6),
  },
  footer: {
    fontSize: normalizeFont(16),
    color: "#888",
    marginTop: scale(20),
    textAlign: "center",
  },
});
