import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
  ScrollView
} from 'react-native';

const { width } = Dimensions.get('window');

const ClassListScreen = () => {
  const classes = Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Class ${i + 1}`,
    students: Math.floor(Math.random() * 10) + 20,
    subjects: ['Math', 'Science', 'English', 'Social Studies'],
    color: ['#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0', '#E91E63', '#00BCD4', '#FFEB3B', '#8BC34A', '#FF5722'][i]
  }));

  const [selectedClass, setSelectedClass] = useState(null);
  const scaleAnim = new Animated.Value(0.9);
  const opacityAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  const handlePress = (classItem) => {
    setSelectedClass(classItem);
   router.push('/(tabs)/Dashboard/Student')
    // You can navigate or do any action here
  };

  const renderClassItem = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.classCard, 
        { 
          backgroundColor: item.color,
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.classButton} 
        onPress={() => handlePress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.classContent}>
          {/* <Text style={styles.classNumber}>{item.id}</Text> */}
          <Text style={styles.classNumber}>{item.name}</Text>
          <View style={styles.classStats}>
            <Text style={styles.statText}>{item.students} Students</Text>
            <Text style={styles.statText}>{item.subjects.length} Subjects</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }}
        style={styles.backgroundImage}
        blurRadius={2}
      >
        <View style={styles.overlay} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Select Your Class</Text>
          <Text style={styles.subtitle}>Choose your grade to explore learning materials</Text>
        </View>

        <FlatList
          data={classes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={renderClassItem}
          showsVerticalScrollIndicator={false}
        />

        {selectedClass && (
          <Animated.View 
            style={[
              styles.selectedClassContainer,
              { opacity: opacityAnim }
            ]}
          >
            <Text style={styles.selectedText}>
              Selected: {selectedClass.name}
            </Text>
            <TouchableOpacity 
              style={styles.continueButton}
              onPress={() => console.log('Continue to', selectedClass.name)}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  listContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  classCard: {
    width: (width - 48) / 2,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  classButton: {
    flex: 1,
  },
  classContent: {
    padding: 20,
    alignItems: 'center',
  },
  classNumber: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  classText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 12,
  },
  classStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  selectedClassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClassListScreen;