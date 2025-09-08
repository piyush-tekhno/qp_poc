import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

const QUESTIONS = [
  { id: "1", text: "What is 2 + 3?" },
  { id: "2", text: "What is 4 × 5?" },
  { id: "3", text: "What is 12 ÷ 3?" },
  { id: "4", text: "What is 7 − 4?" },
  { id: "5", text: "What is 9 + 8?" },
];

export default function QuestionPaper() {
  const [answers, setAnswers] = useState<{ [key: string]: string | null }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const {subject , paperTitle } = useLocalSearchParams();

  console.log(subject , 'sub at que p screens')

  const captureImage = async (id: string) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera permission is needed!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.6,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setAnswers((prev) => ({
        ...prev,
        [id]: `data:image/jpg;base64,${asset.base64}`,
      }));
    }
  };

const generatePDF = async () => {
  setIsGenerating(true);

  const loadingAnimation = Animated.loop(
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  );
  loadingAnimation.start();

  try {
    
    const buildHTML = () => {
      let html = `
        <html>
          <head>
            <style>
              @page {
                size: A4;
                margin: 0;
              }
              body { 
                font-family: Arial, sans-serif; 
                padding: 0;
                margin: 0;
                background: white;
                color: #333;
              }
              .page {
                width: 100%;
                height: 100vh;
                box-sizing: border-box;
                padding: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                page-break-after: always;
              }
              .header {
                text-align: center;
                padding: 16px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 10px;
                margin-bottom: 20px;
              }
              h1 { 
                margin: 0;
                font-size: 24px;
              }
              .question { 
                background: white;
                padding: 16px;
                border-radius: 10px;
                flex: 1;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
              }
              h2 { 
                color: #3F51B5; 
                font-size: 18px;
                border-bottom: 2px solid #f0f0f0;
                margin-top: 0;
                padding-bottom: 8px;
              }
              .image-container {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 12px;
              }
              img { 
                max-width: 90%; 
                max-height: 60vh;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .no-answer {
                color: #888;
                font-style: italic;
                padding: 12px;
                background: #f9f9f9;
                border-radius: 5px;
                border-left: 4px solid #ff6b6b;
                text-align: center;
              }
              .page-number {
                text-align: center;
                margin-top: 16px;
                font-size: 12px;
                color: #888;
              }
            </style>
          </head>
          <body>
      `;

      QUESTIONS.forEach((q, index) => {
        html += `
          <div class="page">
            <div class="header">
              <h1>Mathematics Question Paper</h1>
              <p>Question ${index + 1} of ${QUESTIONS.length}</p>
            </div>

            <div class="question">
           
              <h2> ${q.id}) ${q.text}</h2>
              <div class="image-container">
                ${
                  answers[q.id]
                    ? `<img src="${answers[q.id]}" />`
                    : '<div class="no-answer">No Answer Provided</div>'
                }
              </div>
            </div>

            <div class="page-number">Page ${index + 1} of ${QUESTIONS.length}</div>
          </div>
        `;
      });

      html += `</body></html>`;
      return html;
    };

    // 📄 Convert HTML → PDF
    const { uri } = await Print.printToFileAsync({ 
      html: buildHTML(),
    });

    // 📤 Check sharing availability
    const sharingAvailable = await Sharing.isAvailableAsync();
    if (!sharingAvailable) {
      Alert.alert("Error", "Sharing not available on this device");
      return;
    }

    // 📤 Share the generated PDF
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Share Question Paper PDF",
    });

  } catch (error) {
    console.error("PDF Generation Error:", error);
    Alert.alert("Error", "Failed to generate PDF");
  } finally {
    setIsGenerating(false);
    rotateAnim.setValue(0);
    loadingAnimation.stop();
  }
};

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderItem = ({ item, index }) => {
    const scaleValue = new Animated.Value(1);
    
    const onPressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };
    
    const onPressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={[
          styles.questionBox,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <View style={styles.questionHeader}>
          <View style={styles.questionNumber}>
            <Text style={styles.questionNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.questionText}>{item.text}</Text>
        </View>
        
        <TouchableOpacity
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => captureImage(item.id)}
          style={styles.cameraButton}
          activeOpacity={0.7}
        >
          <Ionicons name="camera-outline" size={24} color="white" />
          <Text style={styles.cameraButtonText}>Capture Answer</Text>
        </TouchableOpacity>
        
        {answers[item.id] && (
          <Image 
            source={{ uri: answers[item.id] }} 
            style={styles.image}
          />
        )}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{subject} Questions</Text>
        <Text style={styles.headerSubtitle}>Capture your answers with the camera</Text>
      </View>
      
      <FlatList
        data={QUESTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      
      <TouchableOpacity 
        style={[styles.pdfButton, isGenerating && styles.pdfButtonDisabled]} 
        onPress={generatePDF}
        disabled={isGenerating}
        activeOpacity={0.8}
      >
        <View style={styles.pdfButtonContent}>
          {isGenerating ? (
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Ionicons name="refresh" size={24} color="white" />
            </Animated.View>
          ) : (
            <MaterialIcons name="picture-as-pdf" size={24} color="white" />
          )}
          <Text style={styles.pdfButtonText}>
            {isGenerating ? "Generating PDF..." : "Generate PDF"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f7ff",
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  questionBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  questionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4299E1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  questionNumberText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  questionText: { 
    fontSize: 18, 
    fontWeight: "600",
    flex: 1,
    color: "#2D3748",
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4299E1",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  cameraButtonText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "600",
    marginLeft: 8,
  },
  image: { 
    width: "100%", 
    height: 200, 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  pdfButton: {
    backgroundColor: "#48BB78",
    padding: 18,
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  pdfButtonDisabled: {
    backgroundColor: "#A0AEC0",
  },
  pdfButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pdfButtonText: { 
    color: "white", 
    fontSize: 18, 
    fontWeight: "700",
    marginLeft: 10,
  },
});