import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { scale, normalizeFont } from "../../../utils/responsive";

// Mock data for question papers
const questionPapers = {
  physics: [
    {
      id: "1",
      title: "Unit Test 1",
      date: "2023-09-15",
      questions: 25,
      duration: "60 min",
      difficulty: "Medium",
    },
    {
      id: "2",
      title: "Unit Test 2",
      date: "2023-10-20",
      questions: 30,
      duration: "75 min",
      difficulty: "Hard",
    },
    {
      id: "3",
      title: "Mid Term Exam",
      date: "2023-11-05",
      questions: 50,
      duration: "120 min",
      difficulty: "Hard",
    },
    {
      id: "4",
      title: "Unit Test 3",
      date: "2023-12-01",
      questions: 28,
      duration: "65 min",
      difficulty: "Medium",
    },
    {
      id: "5",
      title: "Final Exam",
      date: "2024-01-10",
      questions: 60,
      duration: "150 min",
      difficulty: "Very Hard",
    },
  ],
  math: [
    {
      id: "1",
      title: "Unit Test 1",
      date: "2023-09-10",
      questions: 20,
      duration: "50 min",
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "Unit Test 2",
      date: "2023-10-15",
      questions: 25,
      duration: "60 min",
      difficulty: "Medium",
    },
    {
      id: "3",
      title: "Mid Term Exam",
      date: "2023-11-02",
      questions: 40,
      duration: "90 min",
      difficulty: "Medium",
    },
    {
      id: "4",
      title: "Unit Test 3",
      date: "2023-12-05",
      questions: 30,
      duration: "70 min",
      difficulty: "Hard",
    },
  ],
  chemistry: [
    {
      id: "1",
      title: "Unit Test 1",
      date: "2023-09-12",
      questions: 22,
      duration: "55 min",
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "Unit Test 2",
      date: "2023-10-18",
      questions: 28,
      duration: "65 min",
      difficulty: "Medium",
    },
    {
      id: "3",
      title: "Practical Exam",
      date: "2023-11-08",
      questions: 15,
      duration: "120 min",
      difficulty: "Medium",
    },
  ],
  biology: [
    {
      id: "1",
      title: "Unit Test 1",
      date: "2023-09-08",
      questions: 18,
      duration: "45 min",
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "Unit Test 2",
      date: "2023-10-22",
      questions: 24,
      duration: "60 min",
      difficulty: "Medium",
    },
    {
      id: "3",
      title: "Lab Test",
      date: "2023-11-12",
      questions: 12,
      duration: "90 min",
      difficulty: "Medium",
    },
  ],
};

// Subject color mapping for header
const subjectColors = {
  physics: "#6366F1",
  math: "#10B981",
  chemistry: "#F59E0B",
  biology: "#8B5CF6",
};

export default function SubDashboard() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { subject } = params;

  const subjectData = questionPapers[subject] || [];
  const subjectName = subject
    ? subject.charAt(0).toUpperCase() + subject.slice(1)
    : "Subject";
  const headerColor = subjectColors[subject] || "#6A0572";

  const renderPaperItem = ({ item }) => (
    <TouchableOpacity
      style={styles.paperCard}
      onPress={() =>
        router.push({
          pathname: "/Dashboard/EduApp",
          params: { subject: subjectName, paperTitle: item.title },
        })
      }
    >
      <View style={styles.paperHeader}>
        <Text style={styles.paperTitle}>{item.title}</Text>
        <Text style={styles.paperDate}>{item.date}</Text>
      </View>
      
      <View style={styles.paperDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>{item.questions} questions</Text>
          <Text style={styles.detailText}>•</Text>
          <Text style={styles.detailText}>{item.duration}</Text>
        </View>
      </View>
      
      <View style={styles.actionBar}>
        <Text style={styles.viewText}>View Paper →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Text style={styles.headerTitle}>{subjectName} Tests</Text>
        <Text style={styles.headerSubtitle}>
          {subjectData.length} test papers available
        </Text>
      </View>

      {subjectData.length > 0 ? (
        <FlatList
          data={subjectData}
          renderItem={renderPaperItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No test papers available for {subjectName}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: scale(20),
    paddingTop: scale(50),
    borderBottomLeftRadius: scale(16),
    borderBottomRightRadius: scale(16),
  },
  headerTitle: {
    fontSize: normalizeFont(24),
    fontWeight: "700",
    color: "white",
    marginBottom: scale(4),
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: normalizeFont(14),
    color: "white",
    textAlign: "center",
    opacity: 0.9,
  },
  listContent: {
    padding: scale(16),
  },
  paperCard: {
    backgroundColor: "white",
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: scale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.1,
    shadowRadius: scale(2),
    elevation: 2,
  },
  paperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(8),
  },
  paperTitle: {
    fontSize: normalizeFont(16),
    fontWeight: "600",
    color: "#1E293B",
  },
  paperDate: {
    fontSize: normalizeFont(12),
    color: "#64748B",
  },
  paperDetails: {
    marginBottom: scale(12),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },
  detailText: {
    fontSize: normalizeFont(12),
    color: "#64748B",
  },
  actionBar: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: scale(8),
  },
  viewText: {
    fontSize: normalizeFont(12),
    color: "#6366F1",
    fontWeight: "500",
    textAlign: "right",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  emptyStateText: {
    fontSize: normalizeFont(16),
    color: "#64748B",
    textAlign: "center",
  },
});