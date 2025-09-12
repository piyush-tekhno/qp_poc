// D:\Qp-piyush\QP\app\(tabs)\Dashboard\Dashboard.tsx
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale, normalizeFont, responsivePadding, responsiveMargin, width } from '../../../utils/responsive';

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
  ongoing: 1
};

const subjects = {
  physics: {
    name: 'Physics',
    color: '#FF6B6B',
    icon: '⚡',
    progress: 75,
  },
  math: {
    name: 'Math',
    color: '#4ECDC4',
    icon: '➗',
    progress: 100,
  },
  chemistry: {
    name: 'Chemistry',
    color: '#FFE66D',
    icon: '🧪',
    progress: 30,
  },
  biology: {
    name: 'Biology',
    color: '#6A0572',
    icon: '🌿',
    progress: 50,
  }
};

// Animated Progress Component
const AnimatedProgress = ({ value, duration = 1500, style, textStyle }: {
  value: number;
  duration?: number;
  style?: any;
  textStyle?: any;
}) => {
  const [progress] = useState(new Animated.Value(0));
  const progressRef = useRef(0);
  
  useEffect(() => {
    // Reset progress to 0 when value changes
    progress.setValue(0);
    
    Animated.timing(progress, {
      toValue: value,
      duration: duration,
      useNativeDriver: false,
    }).start();
    
    progress.addListener(({ value }) => {
      progressRef.current = value;
    });
    
    return () => {
      progress.removeAllListeners();
    };
  }, [value]);
  
  return (
    <View style={style}>
      <Animated.Text style={textStyle}>
        {progress.interpolate({
          inputRange: [0, value],
          outputRange: ['0%', `${Math.round(value)}%`],
        })}
      </Animated.Text>
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
    router.push(`/Dashboard/SubDashboard?subject=${subjectKey}`);
  };

  // Calculate overall progress percentage
  const overallProgress = Math.round(
    Object.values(subjects).reduce((sum, subject) => sum + subject.progress, 0) / 
    Object.values(subjects).length
  );

  // Function to render status items with playful design
  const renderStatusItem = (count: number, label: string, color: string, icon: string) => {
    return (
      <View style={[styles.statusItem, { backgroundColor: color }]}>
        <Text style={styles.statusIcon}>{icon}</Text>
        <Text style={styles.statusNumber}>{count}</Text>
        <Text style={styles.statusLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.header}>Question Papers 🚀</Text>
            <Text style={styles.subheader}>Choose a subject to examine:</Text>
          </View>
          <View style={styles.progressBadge}>
            {mounted && (
              <AnimatedProgress
                value={overallProgress}
                style={styles.progressContainer}
                textStyle={styles.progressText}
              />
            )}
            <Text style={styles.progressLabel}>Overall</Text>
          </View>
        </View>
      </View>
      
      {/* Status Overview Section with playful design */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.statusScroll}
        contentContainerStyle={styles.statusScrollContent}
      >
        {renderStatusItem(subjectStatus.assigned, 'Assigned', '#FF9E80', '📋')}
        {renderStatusItem(subjectStatus.completed, 'Completed', '#80FFA5', '✅')}
        {renderStatusItem(subjectStatus.pending, 'Pending', '#80D0FF', '⏳')}
        {renderStatusItem(subjectStatus.ongoing, 'Ongoing', '#FF80EB', '🔍')}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.grid}>
        {Object.entries(subjects).map(([key, subject]) => (
          <TouchableOpacity 
            key={key}
            style={[styles.subjectCard, { backgroundColor: subject.color }]}
            onPress={() => handleSubjectSelect(key)}
          >
            {/* Progress Badge at top right */}
            <View style={[
              styles.progressBadgeCard, 
              { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
            ]}>
              {mounted && (
                <AnimatedProgress
                  value={subject.progress}
                  duration={2000}
                  textStyle={[
                    styles.progressTextCard, 
                    { color: getTextColor(subject.color) }
                  ]}
                />
              )}
            </View>
            
            <View style={styles.cardHeader}>
              <Text style={styles.subjectIcon}>{subject.icon}</Text>
            </View>
            <Text style={[styles.subjectName, { color: getTextColor(subject.color) }]}>
              {subject.name}
            </Text>
            
            {/* Progress Bar at bottom */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${subject.progress}%`,
                      backgroundColor: getTextColor(subject.color) === "#000" ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'
                    }
                  ]} 
                />
              </View>
            </View>
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
    paddingTop: verticalScale(15),
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    padding: responsivePadding.medium,
    borderRadius: scale(20),
    marginHorizontal: responsiveMargin.medium,
    marginBottom: verticalScale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.1,
    shadowRadius: scale(5),
    elevation: 5,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    marginRight: scale(16),
  },
  header: {
    fontSize: normalizeFont(28),
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: verticalScale(5),
  },
  subheader: {
    fontSize: normalizeFont(16),
    color: "#636E72",
  },
  progressBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(80),
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: normalizeFont(18),
    fontWeight: '800',
    color: '#0F172A',
  },
  progressLabel: {
    fontSize: normalizeFont(12),
    color: '#64748B',
    fontWeight: '600',
  },
  statusScroll: {
    marginBottom: verticalScale(15),
    maxHeight: verticalScale(100),
  },
  statusScrollContent: {
    paddingHorizontal: responsivePadding.small,
  },
  statusItem: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(8),
    padding: scale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: 4,
    transform: [{ rotate: '-5deg' }],
  },
  statusIcon: {
    fontSize: normalizeFont(24),
    marginBottom: verticalScale(4),
  },
  statusNumber: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
    color: '#2D3436',
  },
  statusLabel: {
    fontSize: normalizeFont(12),
    color: '#2D3436',
    textAlign: 'center',
    marginTop: verticalScale(2),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: responsivePadding.medium,
    paddingBottom: verticalScale(30),
  },
  subjectCard: {
    width: (width - scale(60)) / 2, // Calculate width for 2 cards per row with padding
    height: scale(160),
    marginBottom: scale(15),
    borderRadius: scale(25),
    padding: responsivePadding.medium,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(6) },
    shadowOpacity: 0.2,
    shadowRadius: scale(7),
    elevation: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  progressBadgeCard: {
    position: 'absolute',
    top: scale(12),
    right: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(1) },
    shadowOpacity: 0.1,
    shadowRadius: scale(2),
    elevation: 2,
    zIndex: 10,
  },
  progressTextCard: {
    fontSize: normalizeFont(14),
    fontWeight: '800',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: verticalScale(10),
  },
  subjectIcon: {
    fontSize: normalizeFont(40),
  },
  subjectName: {
    fontSize: normalizeFont(22),
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15),
  },
  progressBar: {
    width: '100%',
    height: scale(8),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: scale(4),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: scale(4),
  },
});