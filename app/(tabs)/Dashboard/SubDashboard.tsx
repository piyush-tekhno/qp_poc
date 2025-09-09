import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Button,
} from "react-native";
import React, { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
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

// Difficulty color mapping
const difficultyColors = {
  Easy: "#4CAF50",
  Medium: "#FF9800",
  Hard: "#F44336",
  "Very Hard": "#9C27B0",
};

// Subject color mapping for header
const subjectColors = {
  physics: "#FF6B6B",
  math: "#4ECDC4",
  chemistry: "#FFE66D",
  biology: "#6A0572",
};

export default function SubDashboard() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { subject } = params;

  // Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState("back");

  const subjectData = questionPapers[subject] || [];
  const subjectName = subject
    ? subject.charAt(0).toUpperCase() + subject.slice(1)
    : "Subject";
  const headerColor = subjectColors[subject] || "#6A0572";

  const openCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo);
        // You can save the photo or do something with it here
        alert("Picture taken successfully!");
        closeCamera();
      } catch (error) {
        console.error("Error taking picture:", error);
        alert("Failed to take picture");
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const renderPaperItem = ({ item }) => (
    <View style={styles.paperCard}>
      <View style={styles.paperHeader}>
        <Text style={styles.paperTitle}>{item.title}</Text>

        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: difficultyColors[item.difficulty] },
          ]}
        >
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>

      <View style={styles.paperDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Questions:</Text>
          <Text style={styles.detailValue}>{item.questions}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Duration:</Text>
          <Text style={styles.detailValue}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            router.push({
              pathname: "/Dashboard/QuestionPaper",
              params: { subject: subjectName, paperTitle: item.title },
            })
          }
        >
          <Text style={styles.viewButtonText}>View Paper</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Text style={styles.headerTitle}>{subjectName} Question Papers</Text>

        <Text style={styles.headerSubtitle}>
          All available test papers for {subjectName}
        </Text>
      </View>

      <View style= {{alignItems : 'center'}}>
        <TouchableOpacity  onPress={() => router.push('/Dashboard/EduApp')}> 
        <Text>eduapp</Text>

        </TouchableOpacity>
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
            No question papers available for {subjectName}
          </Text>
        </View>
      )}

      {/* Camera Modal */}
      <Modal
        visible={isCameraOpen}
        animationType="slide"
        onRequestClose={closeCamera}
      >
        <View style={styles.cameraContainer}>
          {permission?.granted ? (
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              <View style={styles.cameraControls}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <Text style={styles.flipButtonText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeCamera}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          ) : (
            <View style={styles.permissionContainer}>
              <Text style={styles.permissionText}>
                Camera permission is required to use this feature.
              </Text>
              <Button title="Grant Permission" onPress={requestPermission} />
              <Button title="Close" onPress={closeCamera} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    padding: scale(20),
    paddingTop: scale(50),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  headerTitle: {
    fontSize: normalizeFont(24),
    fontWeight: "bold",
    color: "white",
    marginBottom: scale(5),
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: normalizeFont(16),
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
    marginBottom: scale(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.1,
    shadowRadius: scale(3.84),
    elevation: 5,
  },
  paperHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(12),
  },
  paperTitle: {
    fontSize: normalizeFont(18),
    fontWeight: "bold",
    color: "#2D3436",
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: scale(12),
  },
  difficultyText: {
    color: "white",
    fontSize: normalizeFont(12),
    fontWeight: "600",
  },
  paperDetails: {
    marginBottom: scale(16),
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(6),
  },
  detailLabel: {
    fontSize: normalizeFont(14),
    color: "#636E72",
  },
  detailValue: {
    fontSize: normalizeFont(14),
    fontWeight: "500",
    color: "#2D3436",
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(8),
    flex: 1,
    marginRight: scale(8),
    alignItems: "center",
  },
  viewButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: normalizeFont(12),
  },
  cameraButton: {
    backgroundColor: "#FF9500",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(8),
    marginHorizontal: scale(8),
    alignItems: "center",
  },
  cameraButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: normalizeFont(12),
  },
  downloadButton: {
    backgroundColor: "#6A0572",
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(8),
    flex: 1,
    marginLeft: scale(8),
    alignItems: "center",
  },
  downloadButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: normalizeFont(12),
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  emptyStateText: {
    fontSize: normalizeFont(18),
    color: "#636E72",
    textAlign: "center",
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: scale(40),
  },
  captureButton: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: scale(40),
    height: scale(80),
    width: scale(80),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(20),
  },
  captureButtonInner: {
    backgroundColor: "white",
    borderRadius: scale(30),
    height: scale(60),
    width: scale(60),
  },
  flipButton: {
    position: "absolute",
    top: scale(40),
    left: scale(20),
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: scale(10),
    borderRadius: scale(20),
  },
  flipButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: scale(40),
    right: scale(20),
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: scale(10),
    borderRadius: scale(20),
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
    backgroundColor: "white",
  },
  permissionText: {
    fontSize: normalizeFont(18),
    textAlign: "center",
    marginBottom: scale(20),
  },
});
