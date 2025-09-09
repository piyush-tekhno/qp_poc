import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  ScrollView,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const students = [
  { 
    id: 'S001', 
    name: 'Alice Johnson', 
    class: 'Class 1',
    avatar: 'https://i.pravatar.cc/100?img=1',
    attendance: '95%',
    performance: 'Excellent',
    parent: 'Mr. Johnson',
    contact: '+1 234-567-8901'
  },
  { 
    id: 'S002', 
    name: 'Bob Smith', 
    class: 'Class 2',
    avatar: 'https://i.pravatar.cc/100?img=2',
    attendance: '88%',
    performance: 'Good',
    parent: 'Mrs. Smith',
    contact: '+1 234-567-8902'
  },
  { 
    id: 'S003', 
    name: 'Charlie Brown', 
    class: 'Class 3',
    avatar: 'https://i.pravatar.cc/100?img=3',
    attendance: '92%',
    performance: 'Very Good',
    parent: 'Mr. Brown',
    contact: '+1 234-567-8903'
  },
  { 
    id: 'S004', 
    name: 'Daisy Ridley', 
    class: 'Class 4',
    avatar: 'https://i.pravatar.cc/100?img=4',
    attendance: '98%',
    performance: 'Excellent',
    parent: 'Ms. Ridley',
    contact: '+1 234-567-8904'
  },
  { 
    id: 'S005', 
    name: 'Ethan Hunt', 
    class: 'Class 5',
    avatar: 'https://i.pravatar.cc/100?img=5',
    attendance: '85%',
    performance: 'Good',
    parent: 'Mr. Hunt',
    contact: '+1 234-567-8905'
  },
  { 
    id: 'S006', 
    name: 'Fiona Gallagher', 
    class: 'Class 6',
    avatar: 'https://i.pravatar.cc/100?img=6',
    attendance: '90%',
    performance: 'Very Good',
    parent: 'Mr. Gallagher',
    contact: '+1 234-567-8906'
  },
  { 
    id: 'S007', 
    name: 'George Clooney', 
    class: 'Class 7',
    avatar: 'https://i.pravatar.cc/100?img=7',
    attendance: '93%',
    performance: 'Excellent',
    parent: 'Mr. Clooney Sr.',
    contact: '+1 234-567-8907'
  },
  { 
    id: 'S008', 
    name: 'Hannah Montana', 
    class: 'Class 8',
    avatar: 'https://i.pravatar.cc/100?img=8',
    attendance: '97%',
    performance: 'Outstanding',
    parent: 'Mr. Montana',
    contact: '+1 234-567-8908'
  },
  { 
    id: 'S009', 
    name: 'Ian Somerhalder', 
    class: 'Class 9',
    avatar: 'https://i.pravatar.cc/100?img=9',
    attendance: '89%',
    performance: 'Good',
    parent: 'Mrs. Somerhalder',
    contact: '+1 234-567-8909'
  },
  { 
    id: 'S010', 
    name: 'Julia Roberts', 
    class: 'Class 10',
    avatar: 'https://i.pravatar.cc/100?img=10',
    attendance: '94%',
    performance: 'Very Good',
    parent: 'Ms. Roberts',
    contact: '+1 234-567-8910'
  },
];

const classes = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);

export default function StudentScreen() {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  const router = useRouter();


  React.useEffect(() => {
    // Animate on component mount
    Animated.parallel([
        
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })

    ]).start();
  }, []);

  const handleStudentPress = (student) => {
    setSelectedStudent(student);
    setIsDetailVisible(true);
  };

  const closeDetail = () => {
    setIsDetailVisible(false);
    setTimeout(() => setSelectedStudent(null), 300);
  };

  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const renderClassItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.classButton,
        selectedClass === item && styles.classButtonActive,
      ]}
      onPress={() => setSelectedClass(item)}
    >
      <Text
        style={[
          styles.classButtonText,
          selectedClass === item && styles.classButtonTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderStudentItem = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.card,
        { 
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }] 
        }
      ]}
    >
      <TouchableOpacity
        style={styles.studentCard}
        onPress={() => handleStudentPress(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentClass}>{item.class}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Attendance</Text>
              <Text style={[
                styles.statValue,
                { color: item.attendance >= '90%' ? '#4CAF50' : 
                         item.attendance >= '80%' ? '#FF9800' : '#F44336' }
              ]}>
                {item.attendance}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Performance</Text>
              <Text style={styles.statValue}>{item.performance}</Text>
            </View>
          </View>
        </View>
        <View style={styles.moreIcon}>
          <Text>▶</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
          </Animated.View>

      {/* Search Bar */}
      <Animated.View 
        style={[
          styles.searchContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search students by name or class..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonIcon}>🔍</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View 
        style={[
          styles.classFilterContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <Text style={styles.filterTitle}>Filter by Class:</Text>
        <FlatList
          data={['All Classes', ...classes]}
          renderItem={renderClassItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.classFilterList}
        />
      </Animated.View>

      {/* Student List */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={renderStudentItem}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No students found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        }
      />

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Animated.View 
          style={[
            styles.detailOverlay,
            { opacity: isDetailVisible ? fadeAnim : new Animated.Value(0) }
          ]}
        >
          <View style={styles.detailContainer}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={closeDetail}
            >
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
            
            <View style={styles.detailHeader}>
              <Image
                source={{ uri: selectedStudent.avatar }}
                style={styles.detailAvatar}
              />
              <Text style={styles.detailName}>{selectedStudent.name}</Text>
              <Text style={styles.detailClass}>{selectedStudent.class}</Text>
            </View>

            <View style={styles.detailContent}>
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Academic Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Student ID:</Text>
                  <Text style={styles.infoValue}>{selectedStudent.id}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Attendance:</Text>
                  <Text style={[
                    styles.infoValue,
                    { color: selectedStudent.attendance >= '90%' ? '#4CAF50' : 
                             selectedStudent.attendance >= '80%' ? '#FF9800' : '#F44336' }
                  ]}>
                    {selectedStudent.attendance}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Performance:</Text>
                  <Text style={styles.infoValue}>{selectedStudent.performance}</Text>
                </View>
              </View>

              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Contact Information</Text>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Parent/Guardian:</Text>
                  <Text style={styles.infoValue}>{selectedStudent.parent}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Contact:</Text>
                  <Text style={styles.infoValue}>{selectedStudent.contact}</Text>
                </View>
              </View>
            </View>

            <View style={styles.detailActions}>
              
              <TouchableOpacity 
              style={[styles.actionButton, styles.primaryAction]}
            onPress={() => router.push('/Dashboard/QuestionPaper')}
              >
                <Text style={[styles.actionButtonText, styles.primaryActionText]}>Scan PDF</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 12,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonIcon: {
    fontSize: 20,
  },
  classFilterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  classFilterList: {
    paddingBottom: 4,
  },
  classButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  classButtonActive: {
    backgroundColor: '#3B82F6',
  },
  classButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  classButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  stat: {
    marginRight: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  moreIcon: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  detailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  detailContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  detailHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  detailAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  detailName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  detailClass: {
    fontSize: 16,
    color: '#6B7280',
  },
  detailContent: {
    marginBottom: 24,
  },
  detailSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  detailActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  primaryAction: {
    backgroundColor: '#3B82F6',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  primaryActionText: {
    color: '#fff',
  },
});