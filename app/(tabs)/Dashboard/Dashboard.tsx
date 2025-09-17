// D:\Qp-piyush\QP\app\(tabs)\Dashboard\Dashboard.tsx
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont,
  responsivePadding,
  responsiveMargin,
  width,
  height,
} from "../../../utils/responsive";

const getTextColor = (bgColor: string) => {
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#fff";
};

// Mock data for subject status
const subjectStatus = {
  assigned: 12,
  completed: 8,
  pending: 3,
  ongoing: 1,
};

const subjects = {
  physics: {
    name: "Physics",
    color: "#8d8ff3",
    icon: "⚡",
    progress: 75,
  },
  math: {
    name: "Math",
    color: "#10B981",
    icon: "➗",
    progress: 100,
  },
  chemistry: {
    name: "Chemistry",
    color: "#F59E0B",
    icon: "🧪",
    progress: 30,
  },
  biology: {
    name: "Biology",
    color: "#8B5CF6",
    icon: "🌿",
    progress: 50,
  },
};

// Animated Progress Component
const AnimatedProgress = ({
  value,
  duration = 1500,
  style,
  textStyle,
}: {
  value: number;
  duration?: number;
  style?: any;
  textStyle?: any;
}) => {
  const [progress] = useState(new Animated.Value(0));
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
    }).start();

    const listenerId = progress.addListener(({ value }) => {
      setDisplayedProgress(Math.round(value));
    });

    return () => {
      progress.removeListener(listenerId);
    };
  }, [value]);

  return (
    <View style={style}>
      <Text style={[textStyle, { color: "#000000" }]}>
        {`${displayedProgress}%`}
      </Text>
    </View>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSubjectSelect = (subjectKey: string) => {
    // router.push(`/Dashboard/SubDashboard?subject=${subjectKey}`);
    router.push('/Dashboard/EduApp')
  };

  // Calculate overall progress percentage
  const overallProgress = Math.round(
    Object.values(subjects).reduce(
      (sum, subject) => sum + subject.progress,
      0
    ) / Object.values(subjects).length
  );

  // Function to render status items with professional design
  const renderStatusItem = (
    count: number,
    label: string,
    color: string,
    icon: string
  ) => {
    return (
      <View style={[styles.statusItem, { borderLeftColor: color }]}>
        <View style={styles.statusContent}>
          <View style = {{flexDirection : 'row', justifyContent : 'space-between'}}> 
               <Text style={styles.statusNumber}>{count}</Text>
          <Text style={[styles.statusIcon, { color }]}> {icon}</Text>
          </View>
          
         
          <Text style={styles.statusLabel}>{label}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.header}>Question Papers</Text>
            <Text style={styles.subheader}>Choose a subject to examine</Text>
          </View>
          <View style={styles.progressBadge}>
            {mounted && (
              <AnimatedProgress
                value={overallProgress}
                style={styles.progressContainer}
                textStyle={styles.progressText}
              />
            )}
            <Text style={styles.progressLabel}>Overall Progress</Text>
          </View>
        </View>
      </View>

      {/* Status Overview Section */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statusScroll}
          contentContainerStyle={styles.statusScrollContent}
        >
          {renderStatusItem(subjectStatus.assigned, "Assigned", "#6366F1", "📋")}
          {renderStatusItem(
            subjectStatus.completed,
            "Completed",
            "#10B981",
            "✅"
          )}
          {renderStatusItem(subjectStatus.pending, "Pending", "#F59E0B", "⏳")}
          {renderStatusItem(subjectStatus.ongoing, "Ongoing", "#3bec61", "🔍")}
        </ScrollView>
      </View>

      {/* Subjects Grid */}
      <View style={styles.subjectsSection}>
        <Text style={styles.sectionTitle}>Subjects</Text>
        <View style={styles.grid}>
          {Object.entries(subjects).map(([key, subject]) => (
            <TouchableOpacity
              key={key}
              style={[styles.subjectCard, { backgroundColor: subject.color }]}
              onPress={() => handleSubjectSelect(key)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.progressBadgeCard,
                  { backgroundColor: "rgba(255, 255, 255, 0.9)" },
                ]}
              >
                {mounted && (
                  <AnimatedProgress
                    value={subject.progress}
                    duration={2000}
                    textStyle={styles.progressTextCard}
                  />
                )}
              </View>

              <View style={styles.cardHeader}>
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
              </View>

              <Text style={[styles.subjectName, { color: "#FFFFFF" }]}>
                {subject.name}
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${subject.progress}%`,
                        backgroundColor:
                          getTextColor(subject.color) === "#000"
                            ? "rgba(0,0,0,0.3)"
                            : "rgba(255,255,255,0.3)",
                      },
                    ]}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerContainer: {
    backgroundColor: "#FFFFFF",
    padding: responsivePadding.medium,
    borderRadius: scale(16),
    marginHorizontal: responsiveMargin.small,
    marginTop: verticalScale(15),
    marginBottom: verticalScale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.05,
    shadowRadius: scale(6),
    elevation: 3,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
    marginRight: scale(16),
  },
  header: {
    fontSize: normalizeFont(24),
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: verticalScale(4),
  },
  subheader: {
    fontSize: normalizeFont(14),
    color: "#64748B",
    fontWeight: "400",
  },
  progressBadge: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
    minWidth: scale(70),
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: normalizeFont(16),
    fontWeight: "700",
    color: "#0F172A",
  },
  progressLabel: {
    fontSize: normalizeFont(10),
    color: "#64748B",
    fontWeight: "500",
    marginTop: verticalScale(2),
  },
  statusSection: {
    marginBottom: verticalScale(15),
  },
  sectionTitle: {
    fontSize: normalizeFont(16),
    fontWeight: "600",
    color: "#1E293B",
    marginLeft: responsiveMargin.small,
    marginBottom: verticalScale(10),
  },
  statusScroll: {
    maxHeight: verticalScale(90),
  },
  statusScrollContent: {
    paddingHorizontal: responsivePadding.small,
  },
  statusItem: {
    width: scale(95),
    height: scale(70),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    marginHorizontal: scale(6),
    padding: scale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.1,
    shadowRadius: scale(3),
    elevation: 2,
    borderLeftWidth: scale(3),
  },
  statusContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  statusIcon: {
    fontSize: normalizeFont(18),
    marginBottom: verticalScale(4),
  },
  statusNumber: {
    fontSize: normalizeFont(18),
    fontWeight: "700",
    color: "#1E293B",
  },
  statusLabel: {
    fontSize: normalizeFont(12),
    color: "#546885",
    fontWeight: "500",
  },
  subjectsSection: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: responsivePadding.small,
    paddingBottom: verticalScale(15),
  },
  subjectCard: {
    width: (width - scale(40)) / 2,
    height: scale(150),
    marginBottom: scale(12),
    borderRadius: scale(16),
    padding: scale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.15,
    shadowRadius: scale(6),
    elevation: 4,
    position: "relative",
    overflow: "hidden",
  },
  progressBadgeCard: {
    position: "absolute",
    top: scale(10),
    right: scale(10),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    borderRadius: scale(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.1,
    shadowRadius: scale(2),
    elevation: 2,
    zIndex: 10,
  },
  progressTextCard: {
    fontSize: normalizeFont(12),
    fontWeight: "700",
    color: 'black'
  },
  cardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: verticalScale(8),
  },
  subjectIcon: {
    fontSize: normalizeFont(32),
  },
  subjectName: {
    fontSize: normalizeFont(18),
    fontWeight: "600",
    textAlign: "center",
    marginTop: verticalScale(12),
    marginBottom: verticalScale(12),
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressBar: {
    width: "100%",
    height: scale(5),
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: scale(3),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: scale(3),
  },
});