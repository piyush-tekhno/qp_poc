// D:\Qp-piyush\QP\app\(tabs)\Dashboard\Dashboard.tsx
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import {scale, normalizeFont} from '../../../utils/responsive'


const getTextColor = (bgColor: string) => {
  // Convert hex to RGB
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  // Perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#fff"; 
};

const subjects = {
  physics: {
    name: 'Physics',
    color: '#FF6B6B',
    icon: '⚡',
  },
  math: {
    name: 'Math',
    color: '#4ECDC4',
    icon: '➗',
  },
  chemistry: {
    name: 'Chemistry',
    color: '#FFE66D',
    icon: '🧪',
  },
  biology: {
    name: 'Biology',
    color: '#6A0572',
    icon: '🌿',
  }
};

export default function Dashboard() {
  const router = useRouter();

  const handleSubjectSelect = (subjectKey: string) => {
    router.push(`/Dashboard/SubDashboard?subject=${subjectKey}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Question Papers 🚀</Text>
      <Text style={styles.subheader}>Choose a subject to examine:</Text>
      
      <ScrollView contentContainerStyle={styles.grid}>
        {Object.entries(subjects).map(([key, subject]) => (
          <TouchableOpacity 
            key={key}
            style={[styles.subjectCard, { backgroundColor: subject.color }]}
            onPress={() => handleSubjectSelect(key)}
          >
            <Text style={styles.subjectIcon}>{subject.icon}</Text>
            <Text style={styles.subjectName}>{subject.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    paddingTop: scale(15),
    marginTop : scale(20) 
  },
  header: {
    marginTop : scale(15),
    fontSize: normalizeFont(28),
    fontWeight: "bold",
    textAlign: "center",
    color: "#2D3436",
    marginBottom: scale(10),
    paddingHorizontal: scale(20),
  },
  subheader: {
    fontSize: normalizeFont(15),
    textAlign: "center",
    color: "#636E72",
    marginBottom: scale(20),
    paddingHorizontal: scale(20),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: scale(10),
  },
  subjectCard: {
    width: scale(150),
    height: scale(150),
    margin: scale(10),
    borderRadius: scale(20),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.25,
    shadowRadius: scale(3.84),
    elevation: 5,
  },
  subjectIcon: {
    fontSize: normalizeFont(50),
    marginBottom: scale(10),
  },
  subjectName: {
    fontSize: normalizeFont(20),
    fontWeight: "bold",
    color: "white",
  },
});