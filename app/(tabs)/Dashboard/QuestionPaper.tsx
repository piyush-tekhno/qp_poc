//question wise working code

// import React, { useState, useRef } from "react";

// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Alert,
//   Animated,
//   Easing,
//   Dimensions,
// } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";
// import { useLocalSearchParams } from "expo-router";

// const { width } = Dimensions.get("window");

// const QUESTIONS = [
//   { id: "1", text: "What is 2 + 3?" },
//   { id: "2", text: "What is 4 × 5?" },
//   { id: "3", text: "What is 12 ÷ 3?" },
//   { id: "4", text: "What is 7 − 4?" },
//   { id: "5", text: "What is 9 + 8?" },
// ];

// export default function QuestionPaper() {
//   const [answers, setAnswers] = useState<{ [key: string]: string | null }>({});
//   const [isGenerating, setIsGenerating] = useState(false);
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   const {subject , paperTitle } = useLocalSearchParams();

//   console.log(subject , 'sub at que p screens')

//   const captureImage = async (id: string) => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission required", "Camera permission is needed!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.6,
//       base64: true,
//     });

//     if (!result.canceled) {
//       const asset = result.assets[0];
//       setAnswers((prev) => ({
//         ...prev,
//         [id]: `data:image/jpg;base64,${asset.base64}`,
//       }));
//     }
//   };

// const generatePDF = async () => {
//   setIsGenerating(true);

//   const loadingAnimation = Animated.loop(
//     Animated.timing(rotateAnim, {
//       toValue: 1,
//       duration: 1000,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     })
//   );
//   loadingAnimation.start();

//   try {

//     const buildHTML = () => {
//       let html = `
//         <html>
//           <head>
//             <style>
//               @page {
//                 size: A4;
//                 margin: 0;
//               }
//               body {
//                 font-family: Arial, sans-serif;
//                 padding: 0;
//                 margin: 0;
//                 background: white;
//                 color: #333;
//               }
//               .page {
//                 width: 100%;
//                 height: 100vh;
//                 box-sizing: border-box;
//                 padding: 30px;
//                 display: flex;
//                 flex-direction: column;
//                 justify-content: space-between;
//                 page-break-after: always;
//               }
//               .header {
//                 text-align: center;
//                 padding: 16px;
//                 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//                 color: white;
//                 border-radius: 10px;
//                 margin-bottom: 20px;
//               }
//               h1 {
//                 margin: 0;
//                 font-size: 24px;
//               }
//               .question {
//                 background: white;
//                 padding: 16px;
//                 border-radius: 10px;
//                 flex: 1;
//                 box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//                 display: flex;
//                 flex-direction: column;
//               }
//               h2 {
//                 color: #3F51B5;
//                 font-size: 18px;
//                 border-bottom: 2px solid #f0f0f0;
//                 margin-top: 0;
//                 padding-bottom: 8px;
//               }
//               .image-container {
//                 flex: 1;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 margin-top: 12px;
//               }
//               img {
//                 max-width: 90%;
//                 max-height: 60vh;
//                 border: 1px solid #ddd;
//                 border-radius: 8px;
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//               }
//               .no-answer {
//                 color: #888;
//                 font-style: italic;
//                 padding: 12px;
//                 background: #f9f9f9;
//                 border-radius: 5px;
//                 border-left: 4px solid #ff6b6b;
//                 text-align: center;
//               }
//               .page-number {
//                 text-align: center;
//                 margin-top: 16px;
//                 font-size: 12px;
//                 color: #888;
//               }
//             </style>
//           </head>
//           <body>
//       `;

//       QUESTIONS.forEach((q, index) => {
//         html += `
//           <div class="page">
//             <div class="header">
//               <h1>Mathematics Question Paper</h1>
//               <p>Question ${index + 1} of ${QUESTIONS.length}</p>
//             </div>

//             <div class="question">

//               <h2> ${q.id}) ${q.text}</h2>
//               <div class="image-container">
//                 ${
//                   answers[q.id]
//                     ? `<img src="${answers[q.id]}" />`
//                     : '<div class="no-answer">No Answer Provided</div>'
//                 }
//               </div>
//             </div>

//             <div class="page-number">Page ${index + 1} of ${QUESTIONS.length}</div>
//           </div>
//         `;
//       });

//       html += `</body></html>`;
//       return html;
//     };

//     // 📄 Convert HTML → PDF
//     const { uri } = await Print.printToFileAsync({
//       html: buildHTML(),
//     });

//     // 📤 Check sharing availability
//     const sharingAvailable = await Sharing.isAvailableAsync();
//     if (!sharingAvailable) {
//       Alert.alert("Error", "Sharing not available on this device");
//       return;
//     }

//     // 📤 Share the generated PDF
//     await Sharing.shareAsync(uri, {
//       mimeType: "application/pdf",
//       dialogTitle: "Share Question Paper PDF",
//     });

//   } catch (error) {
//     console.error("PDF Generation Error:", error);
//     Alert.alert("Error", "Failed to generate PDF");
//   } finally {
//     setIsGenerating(false);
//     rotateAnim.setValue(0);
//     loadingAnimation.stop();
//   }
// };

//   const rotate = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   const renderItem = ({ item, index }) => {
//     const scaleValue = new Animated.Value(1);

//     const onPressIn = () => {
//       Animated.spring(scaleValue, {
//         toValue: 0.95,
//         friction: 3,
//         useNativeDriver: true,
//       }).start();
//     };

//     const onPressOut = () => {
//       Animated.spring(scaleValue, {
//         toValue: 1,
//         friction: 3,
//         useNativeDriver: true,
//       }).start();
//     };

//     return (
//       <Animated.View
//         style={[
//           styles.questionBox,
//           {
//             transform: [{ scale: scaleValue }],
//           },
//         ]}
//       >
//         <View style={styles.questionHeader}>
//           <View style={styles.questionNumber}>
//             <Text style={styles.questionNumberText}>{index + 1}</Text>
//           </View>
//           <Text style={styles.questionText}>{item.text}</Text>
//         </View>

//         <TouchableOpacity
//           onPressIn={onPressIn}
//           onPressOut={onPressOut}
//           onPress={() => captureImage(item.id)}
//           style={styles.cameraButton}
//           activeOpacity={0.7}
//         >
//           <Ionicons name="camera-outline" size={24} color="white" />
//           <Text style={styles.cameraButtonText}>Capture Answer</Text>
//         </TouchableOpacity>

//         {answers[item.id] && (
//           <Image
//             source={{ uri: answers[item.id] }}
//             style={styles.image}
//           />
//         )}
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>{subject} Questions</Text>
//         <Text style={styles.headerSubtitle}>Capture your answers with the camera</Text>
//       </View>

//       <FlatList
//         data={QUESTIONS}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />

//       <TouchableOpacity
//         style={[styles.pdfButton, isGenerating && styles.pdfButtonDisabled]}
//         onPress={generatePDF}
//         disabled={isGenerating}
//         activeOpacity={0.8}
//       >
//         <View style={styles.pdfButtonContent}>
//           {isGenerating ? (
//             <Animated.View style={{ transform: [{ rotate }] }}>
//               <Ionicons name="refresh" size={24} color="white" />
//             </Animated.View>
//           ) : (
//             <MaterialIcons name="picture-as-pdf" size={24} color="white" />
//           )}
//           <Text style={styles.pdfButtonText}>
//             {isGenerating ? "Generating PDF..." : "Generate PDF"}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "#f5f7ff",
//     paddingHorizontal: 16,
//   },
//   header: {
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#2D3748",
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: "#718096",
//     textAlign: "center",
//   },
//   listContent: {
//     paddingBottom: 20,
//   },
//   questionBox: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   questionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   questionNumber: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#4299E1",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   questionNumberText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   questionText: {
//     fontSize: 18,
//     fontWeight: "600",
//     flex: 1,
//     color: "#2D3748",
//   },
//   cameraButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#4299E1",
//     padding: 14,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   cameraButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   pdfButton: {
//     backgroundColor: "#48BB78",
//     padding: 18,
//     borderRadius: 12,
//     marginVertical: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 4,
//   },
//   pdfButtonDisabled: {
//     backgroundColor: "#A0AEC0",
//   },
//   pdfButtonContent: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pdfButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "700",
//     marginLeft: 10,
//   },
// });

//chatgpt

// import React, { useState, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
//   Animated,
//   Easing,
// } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// export default function PhotoToPDF() {
//   const [images, setImages] = useState<string[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   const captureImage = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission required", "Camera permission is needed!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.6,
//       base64: true,
//     });

//     if (!result.canceled) {
//       const asset = result.assets[0];
//       setImages((prev) => [
//         ...prev,
//         `data:image/jpg;base64,${asset.base64}`,
//       ]);
//     }
//   };

//   const generatePDF = async () => {
//     if (images.length === 0) {
//       Alert.alert("No images", "Please capture at least one image first.");
//       return;
//     }

//     setIsGenerating(true);

//     const loadingAnimation = Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     );
//     loadingAnimation.start();

//     try {
//       let html = `
//         <html>
//           <head>
//             <style>
//               body {
//                 font-family: Arial, sans-serif;
//                 padding: 20px;
//                 background: #fff;
//               }
//               .image-container {
//                 text-align: center;
//                 margin-bottom: 20px;
//               }
//               img {
//                 max-width: 100%;
//                 max-height: 800px;
//                 border: 1px solid #ddd;
//                 border-radius: 8px;
//                 box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//               }
//               .page-break {
//                 page-break-after: always;
//               }
//             </style>
//           </head>
//           <body>
//       `;

//       images.forEach((img) => {
//         html += `
//           <div class="image-container page-break">
//             <img src="${img}" />
//           </div>
//         `;
//       });

//       html += `</body></html>`;

//       const { uri } = await Print.printToFileAsync({ html });

//       const sharingAvailable = await Sharing.isAvailableAsync();
//       if (!sharingAvailable) {
//         Alert.alert("Error", "Sharing not available on this device");
//         return;
//       }

//       await Sharing.shareAsync(uri, {
//         mimeType: "application/pdf",
//         dialogTitle: "Share Captured Images as PDF",
//       });
//     } catch (error) {
//       console.error("PDF Generation Error:", error);
//       Alert.alert("Error", "Failed to generate PDF");
//     } finally {
//       setIsGenerating(false);
//       rotateAnim.setValue(0);
//       loadingAnimation.stop();
//     }
//   };

//   const rotate = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Capture Photos</Text>

//       <TouchableOpacity
//         style={styles.captureButton}
//         onPress={captureImage}
//         activeOpacity={0.8}
//       >
//         <Ionicons name="camera-outline" size={24} color="white" />
//         <Text style={styles.captureButtonText}>Capture Photo</Text>
//       </TouchableOpacity>

//       <ScrollView contentContainerStyle={styles.imageContainer}>
//         {images.map((imgUri, index) => (
//           <Image key={index} source={{ uri: imgUri }} style={styles.image} />
//         ))}
//       </ScrollView>

//       <TouchableOpacity
//         style={[styles.pdfButton, isGenerating && styles.pdfButtonDisabled]}
//         onPress={generatePDF}
//         disabled={isGenerating}
//         activeOpacity={0.8}
//       >
//         <View style={styles.pdfButtonContent}>
//           {isGenerating ? (
//             <Animated.View style={{ transform: [{ rotate }] }}>
//               <Ionicons name="refresh" size={24} color="white" />
//             </Animated.View>
//           ) : (
//             <MaterialIcons name="picture-as-pdf" size={24} color="white" />
//           )}
//           <Text style={styles.pdfButtonText}>
//             {isGenerating ? "Generating PDF..." : "Generate PDF"}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f7ff",
//     paddingHorizontal: 16,
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#333",
//   },
//   captureButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#4299E1",
//     padding: 14,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   captureButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   imageContainer: {
//     alignItems: "center",
//     paddingBottom: 20,
//   },
//   image: {
//     width: 300,
//     height: 400,
//     borderRadius: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   pdfButton: {
//     backgroundColor: "#48BB78",
//     padding: 18,
//     borderRadius: 12,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.23,
//     shadowRadius: 2.62,
//     elevation: 4,
//   },
//   pdfButtonDisabled: {
//     backgroundColor: "#A0AEC0",
//   },
//   pdfButtonContent: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pdfButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "700",
//     marginLeft: 10,
//   },
// });

//deepseek

// import React, { useState, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
//   Animated,
//   Easing,
//   Dimensions,
//   SafeAreaView,
// } from "react-native";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";

// const { width } = Dimensions.get("window");

// export default function PhotoPDFGenerator() {
//   const [photos, setPhotos] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   const captureImage = async () => {
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission required", "Camera permission is needed!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.7,
//       base64: true,
//       allowsEditing: false,
//     });

//     if (!result.canceled) {
//       const asset = result.assets[0];
//       const newPhoto = {
//         id: Date.now().toString(),
//         uri: `data:image/jpg;base64,${asset.base64}`,
//       };
//       setPhotos((prev) => [...prev, newPhoto]);
//     }
//   };

//   const removePhoto = (id) => {
//     setPhotos((prev) => prev.filter(photo => photo.id !== id));
//   };

//   const generatePDF = async () => {
//     if (photos.length === 0) {
//       Alert.alert("No Photos", "Please capture at least one photo before generating PDF");
//       return;
//     }

//     setIsGenerating(true);

//     const loadingAnimation = Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     );
//     loadingAnimation.start();

//     try {
//       const buildHTML = () => {
//         let html = `
//           <html>
//             <head>
//               <style>
//                 @page {
//                   size: A4;
//                   margin: 0;
//                 }
//                 body {
//                   font-family: Arial, sans-serif;
//                   padding: 0;
//                   margin: 0;
//                   background: white;
//                   color: #333;
//                 }
//                 .page {
//                   width: 100%;
//                   height: 100vh;
//                   box-sizing: border-box;
//                   padding: 20px;
//                   display: flex;
//                   flex-direction: column;
//                   justify-content: center;
//                   align-items: center;
//                   page-break-after: always;
//                 }
//                 .header {
//                   text-align: center;
//                   margin-bottom: 20px;
//                 }
//                 h1 {
//                   margin: 0 0 10px 0;
//                   font-size: 24px;
//                   color: #3F51B5;
//                 }
//                 .image-container {
//                   width: 100%;
//                   display: flex;
//                   justify-content: center;
//                   align-items: center;
//                   flex: 1;
//                 }
//                 img {
//                   max-width: 100%;
//                   max-height: 70vh;
//                   border: 1px solid #ddd;
//                   border-radius: 8px;
//                   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//                 }
//                 .page-number {
//                   text-align: center;
//                   margin-top: 16px;
//                   font-size: 12px;
//                   color: #888;
//                 }
//                 .footer {
//                   text-align: center;
//                   margin-top: 10px;
//                   font-size: 12px;
//                   color: #666;
//                 }
//               </style>
//             </head>
//             <body>
//         `;

//         photos.forEach((photo, index) => {
//           html += `
//             <div class="page">
//               <div class="header">
//                 <h1>Captured Image ${index + 1}</h1>
//               </div>

//               <div class="image-container">
//                 <img src="${photo.uri}" />
//               </div>

//               <div class="footer">
//                 <p>Page ${index + 1} of ${photos.length}</p>
//               </div>
//             </div>
//           `;
//         });

//         html += `</body></html>`;
//         return html;
//       };

//       // Convert HTML → PDF
//       const { uri } = await Print.printToFileAsync({
//         html: buildHTML(),
//       });

//       // Check sharing availability
//       const sharingAvailable = await Sharing.isAvailableAsync();
//       if (!sharingAvailable) {
//         Alert.alert("Error", "Sharing not available on this device");
//         return;
//       }

//       // Share the generated PDF
//       await Sharing.shareAsync(uri, {
//         mimeType: "application/pdf",
//         dialogTitle: "Share Your PDF",
//         UTI: "com.adobe.pdf",
//       });

//     } catch (error) {
//       console.error("PDF Generation Error:", error);
//       Alert.alert("Error", "Failed to generate PDF");
//     } finally {
//       setIsGenerating(false);
//       rotateAnim.setValue(0);
//       loadingAnimation.stop();
//     }
//   };

//   const rotate = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Photo to PDF Generator</Text>
//         <Text style={styles.headerSubtitle}>
//           Capture photos and generate a PDF document
//         </Text>
//       </View>

//       {photos.length > 0 ? (
//         <ScrollView style={styles.photosContainer}>
//           <View style={styles.photosGrid}>
//             {photos.map((photo, index) => (
//               <View key={photo.id} style={styles.photoItem}>
//                 <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
//                 <Text style={styles.photoNumber}>Image {index + 1}</Text>
//                 <TouchableOpacity
//                   style={styles.deleteButton}
//                   onPress={() => removePhoto(photo.id)}
//                 >
//                   <Ionicons name="close-circle" size={24} color="#F44336" />
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </View>
//         </ScrollView>
//       ) : (
//         <View style={styles.emptyState}>
//           <Ionicons name="images-outline" size={64} color="#CCCCCC" />
//           <Text style={styles.emptyStateText}>No photos captured yet</Text>
//           <Text style={styles.emptyStateSubtext}>
//             Tap the camera button to capture your first image
//           </Text>
//         </View>
//       )}

//       <View style={styles.actionsContainer}>
//         <TouchableOpacity
//           style={styles.captureButton}
//           onPress={captureImage}
//           activeOpacity={0.8}
//         >
//           <Ionicons name="camera-outline" size={28} color="white" />
//           <Text style={styles.captureButtonText}>
//             {photos.length > 0 ? "Capture Another" : "Capture Photo"}
//           </Text>
//         </TouchableOpacity>

//         {photos.length > 0 && (
//           <TouchableOpacity
//             style={[styles.pdfButton, isGenerating && styles.pdfButtonDisabled]}
//             onPress={generatePDF}
//             disabled={isGenerating}
//             activeOpacity={0.8}
//           >
//             <View style={styles.pdfButtonContent}>
//               {isGenerating ? (
//                 <Animated.View style={{ transform: [{ rotate }] }}>
//                   <Ionicons name="refresh" size={24} color="white" />
//                 </Animated.View>
//               ) : (
//                 <MaterialIcons name="picture-as-pdf" size={24} color="white" />
//               )}
//               <Text style={styles.pdfButtonText}>
//                 {isGenerating ? "Generating PDF..." : `Generate PDF (${photos.length})`}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//   },
//   header: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e9ecef",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#2D3748",
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: "#718096",
//     textAlign: "center",
//   },
//   photosContainer: {
//     flex: 1,
//     padding: 16,
//   },
//   photosGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   photoItem: {
//     width: (width - 48) / 2,
//     height: 180,
//     marginBottom: 16,
//     borderRadius: 12,
//     backgroundColor: "white",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     overflow: "hidden",
//     position: "relative",
//   },
//   thumbnail: {
//     width: "100%",
//     height: 140,
//     resizeMode: "cover",
//   },
//   photoNumber: {
//     padding: 8,
//     textAlign: "center",
//     fontSize: 14,
//     color: "#4a5568",
//   },
//   deleteButton: {
//     position: "absolute",
//     top: 5,
//     right: 5,
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 2,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 40,
//   },
//   emptyStateText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#6B7280",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyStateSubtext: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     textAlign: "center",
//   },
//   actionsContainer: {
//     padding: 20,
//     backgroundColor: "white",
//     borderTopWidth: 1,
//     borderTopColor: "#e9ecef",
//   },
//   captureButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#4299E1",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   captureButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   pdfButton: {
//     backgroundColor: "#48BB78",
//     padding: 16,
//     borderRadius: 12,
//   },
//   pdfButtonDisabled: {
//     backgroundColor: "#A0AEC0",
//   },
//   pdfButtonContent: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pdfButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     marginLeft: 10,
//   },
// });

//deepseek - 02

//grok 01

// import React, { useState, useRef, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
//   Animated,
//   Easing,
//   Dimensions,
//   SafeAreaView,
//   Modal,
//   ActivityIndicator,
//   Platform,
//   PanResponder
// } from "react-native";
// import Slider from '@react-native-community/slider';
// import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import * as ImagePicker from "expo-image-picker";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";
// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// const { width, height } = Dimensions.get("window");

// // Use your local image path
// const DEFAULT_OVERLAY_IMAGE = require('../../../assets/images/OIP.jpeg');

// export default function MultiPhotoPDFGenerator() {
//   const [photos, setPhotos] = useState([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [cameraModalVisible, setCameraModalVisible] = useState(false);
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [hideConfirmVisible, setHideConfirmVisible] = useState(false);
//   const [photoToHide, setPhotoToHide] = useState(null);
//   const [overlayScale, setOverlayScale] = useState(1.0);
//   const [overlayPosition, setOverlayPosition] = useState({ x: 0.5, y: 0.5 });
//   const [defaultOverlayBase64, setDefaultOverlayBase64] = useState(null);
//   const [adjustingPhotoId, setAdjustingPhotoId] = useState(null);

//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   // Load the default overlay image and convert to base64
//   useEffect(() => {
//     const loadDefaultOverlay = async () => {
//       try {
//         await Asset.fromModule(DEFAULT_OVERLAY_IMAGE).downloadAsync();
//         const localUri = Asset.fromModule(DEFAULT_OVERLAY_IMAGE).localUri;

//         const base64 = await FileSystem.readAsStringAsync(localUri, {
//           encoding: FileSystem.EncodingType.Base64,
//         });

//         setDefaultOverlayBase64(`data:image/jpeg;base64,${base64}`);
//       } catch (error) {
//         console.error("Error loading default overlay:", error);
//         Alert.alert("Error", "Failed to load default overlay image");
//       }
//     };

//     loadDefaultOverlay();
//   }, []);

//   const captureImage = async () => {
//     setIsCapturing(true);
//     const permission = await ImagePicker.requestCameraPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission required", "Camera permission is needed!");
//       setIsCapturing(false);
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.8,
//       base64: true,
//       allowsEditing: false,
//     });

//     if (!result.canceled) {
//       const asset = result.assets[0];
//       const newPhoto = {
//         id: Date.now().toString(),
//         uri: `data:image/jpg;base64,${asset.base64}`,
//         timestamp: new Date().toLocaleTimeString(),
//         isFirstPage: photos.length === 0,
//         hidden: false,
//         overlayUri: null,
//         overlayScale: 1.0,
//         overlayPosition: { x: 0.5, y: 0.5 }
//       };
//       setPhotos((prev) => [...prev, newPhoto]);
//     }

//     setIsCapturing(false);
//   };

//   const captureMultiple = async () => {
//     setCameraModalVisible(true);
//   };

//   const removePhoto = (id) => {
//     setPhotos((prev) => prev.filter(photo => photo.id !== id));
//   };

//   const clearAllPhotos = () => {
//     Alert.alert(
//       "Clear All Photos",
//       "Are you sure you want to remove all photos?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Clear All", onPress: () => setPhotos([]), style: "destructive" },
//       ]
//     );
//   };

//   const confirmHideInfo = (photoId) => {
//     setPhotoToHide(photoId);
//     setAdjustingPhotoId(photoId);
//     setHideConfirmVisible(true);
//   };

//   const hideInfoWithDefaultOverlay = () => {
//     if (defaultOverlayBase64) {
//       setPhotos(prev => prev.map(photo =>
//         photo.id === photoToHide
//           ? {
//               ...photo,
//               hidden: true,
//               overlayUri: defaultOverlayBase64,
//               overlayScale: overlayScale,
//               overlayPosition: overlayPosition
//             }
//           : photo
//       ));
//     }
//     setHideConfirmVisible(false);
//     setPhotoToHide(null);
//     setAdjustingPhotoId(null);
//   };

//   const removeOverlay = (photoId) => {
//     setPhotos(prev => prev.map(photo =>
//       photo.id === photoId
//         ? { ...photo, hidden: false, overlayUri: null }
//         : photo
//     ));
//   };

//   const updateOverlaySettings = (scale, position) => {
//     if (adjustingPhotoId) {
//       setPhotos(prev => prev.map(photo =>
//         photo.id === adjustingPhotoId
//           ? { ...photo, overlayScale: scale, overlayPosition: position }
//           : photo
//       ));
//     }

//     setOverlayScale(scale);
//     setOverlayPosition(position);
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (evt, gestureState) => {
//         const { dx, dy } = gestureState;
//         const newX = Math.max(0, Math.min(1, overlayPosition.x + dx / 200));
//         const newY = Math.max(0, Math.min(1, overlayPosition.y + dy / 200));
//         updateOverlaySettings(overlayScale, { x: newX, y: newY });
//       },
//     })
//   ).current;

//   const generatePDF = async () => {
//     if (photos.length === 0) {
//       Alert.alert(
//         "No Photos",
//         "Please capture at least one photo before generating PDF"
//       );
//       return;
//     }
//     setIsGenerating(true);
//     const loadingAnimation = Animated.loop(
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       })
//     );
//     loadingAnimation.start();

//     try {
//       const buildHTML = () => {
//         let html = `
//           <html>
//             <head>
//               <meta charset="UTF-8">
//               <title>Captured Images PDF</title>
//               <style>
//                 @page { size: A4; margin: 0; }
//                 body { margin: 0; padding: 0; background: white; }
//                 .page {
//                   width: 100%;
//                   min-height: 100vh;
//                   page-break-after: always;
//                   display: flex;
//                   justify-content: center;
//                   align-items: center;
//                   position: relative;
//                   overflow: hidden;
//                 }
//                 .page-image {
//                   width: 100%;
//                   height: auto;
//                   display: block;
//                   object-fit: contain;
//                 }
//                 .overlay-container {
//                   position: absolute;
//                   top: 0;
//                   left: 0;
//                   width: 100%;
//                   height: 100%;
//                   display: flex;
//                   justify-content: center;
//                   align-items: center;
//                   pointer-events: none;
//                 }
//                 .overlay {
//                   max-width: 100%;
//                   max-height: 100%;
//                   object-fit: contain;
//                 }
//               </style>
//             </head>
//             <body>
//         `;

//         photos.forEach((photo) => {
//           if (photo.hidden && photo.overlayUri) {
//             const scale = photo.overlayScale || 1.0;
//             const posX = (photo.overlayPosition?.x || 0.5) * 100;
//             const posY = (photo.overlayPosition?.y || 0.5) * 100;

//             html += `
//               <div class="page">
//                 <img class="page-image" src="${photo.uri}" />
//                 <div class="overlay-container" style="justify-content: flex-start; align-items: flex-start;">
//                   <img class="overlay" src="${photo.overlayUri}"
//                     style="transform: scale(${scale});
//                            margin-left: ${posX}%;
//                            margin-top: ${posY}%;" />
//                 </div>
//               </div>
//             `;
//           } else {
//             html += `
//               <div class="page">
//                 <img class="page-image" src="${photo.uri}" />
//               </div>
//             `;
//           }
//         });

//         html += `</body></html>`;
//         return html;
//       };

//       const { uri } = await Print.printToFileAsync({
//         html: buildHTML(),
//       });

//       const sharingAvailable = await Sharing.isAvailableAsync();
//       if (!sharingAvailable) {
//         Alert.alert("Error", "Sharing not available on this device");
//         return;
//       }

//       await Sharing.shareAsync(uri, {
//         mimeType: "application/pdf",
//         dialogTitle: "Share Your PDF",
//         UTI: "com.adobe.pdf",
//       });
//     } catch (error) {
//       console.error("PDF Generation Error:", error);
//       Alert.alert("Error", "Failed to generate PDF");
//     } finally {
//       setIsGenerating(false);
//       rotateAnim.setValue(0);
//       loadingAnimation.stop();
//     }
//   };

//   const rotate = rotateAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   const handlePhotoPress = (photoId) => {
//     const photo = photos.find(p => p.id === photoId);
//     if (photo && photo.hidden) {
//       setPhotoToHide(photoId);
//       setAdjustingPhotoId(photoId);
//       setOverlayScale(photo.overlayScale || 1.0);
//       setOverlayPosition(photo.overlayPosition || { x: 0.5, y: 0.5 });
//       setHideConfirmVisible(true);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Answer Sheet Scanner</Text>
//         <Text style={styles.headerSubtitle}>
//           Capture answer sheets and hide student information
//         </Text>
//       </View>

//       {photos.length > 0 ? (
//         <View style={styles.content}>
//           <View style={styles.photosHeader}>
//             <Text style={styles.photosCount}>{photos.length} page{photos.length !== 1 ? 's' : ''} captured</Text>
//             <TouchableOpacity onPress={clearAllPhotos} style={styles.clearButton}>
//               <Text style={styles.clearButtonText}>Clear All</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={styles.photosContainer}>
//             <View style={styles.photosGrid}>
//               {photos.map((photo, index) => (
//                 <View key={photo.id} style={styles.photoItem}>
//                   {photo.hidden && (
//                     <View style={styles.hiddenBadge}>
//                       <Ionicons name="eye-off" size={16} color="white" />
//                       <Text style={styles.hiddenBadgeText}>Hidden</Text>
//                     </View>
//                   )}

//                   <Image
//                     source={{ UribackgroundPreviewImage: photo.uri }}
//                     style={[
//                       styles.thumbnail,
//                       photo.hidden && styles.hiddenThumbnail
//                     ]}
//                   />

//                   {photo.hidden && photo.overlayUri && (
//                     <Image
//                       source={{ uri: photo.overlayUri }}
//                       style={[
//                         styles.overlayThumbnail,
//                         {
//                           transform: [{ scale: photo.overlayScale || 1.0 }],
//                           left: `${(photo.overlayPosition?.x || 0.5) * 100}%`,
//                           top: `${(photo.overlayPosition?.y || 0.5) * 100}%`,
//                         }
//                       ]}
//                     />
//                   )}

//                   <View style={styles.photoInfo}>
//                     <Text style={styles.photoNumber}>
//                       {index === 0 ? "First Page" : `Page ${index + 1}`}
//                     </Text>
//                     <Text style={styles.photoTime}>{photo.timestamp}</Text>
//                   </View>

//                   <View style={styles.photoActions}>
//                     {index === 0 && (
//                       <TouchableOpacity
//                         style={styles.hideButton}
//                         onPress={() => photo.hidden ? removeOverlay(photo.id) : confirmHideInfo(photo.id)}
//                       >
//                         <Ionicons
//                           name={photo.hidden ? "eye" : "eye-off"}
//                           size={20}
//                           color={photo.hidden ? "#48BB78" : "#718096"}
//                         />
//                         <Text style={[
//                           styles.hideButtonText,
//                           { color: photo.hidden ? "#48BB78" : "#718096" }
//                         ]}>
//                           {photo.hidden ? "Unhide" : "Hide Info"}
//                         </Text>
//                       </TouchableOpacity>
//                     )}

//                     <TouchableOpacity
//                       style={styles.deleteButton}
//                       onPress={() => removePhoto(photo.id)}
//                     >
//                       <Ionicons name="close-circle" size={24} color="#F44336" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           </ScrollView>
//         </View>
//       ) : (
//         <View style={styles.emptyState}>
//           <Ionicons name="images-outline" size={64} color="#CCCCCC" />
//           <Text style={styles.emptyStateText}>No answer sheets captured yet</Text>
//           <Text style={styles.emptyStateSubtext}>
//             Tap the camera button to start capturing answer sheets
//           </Text>
//         </View>
//       )}

//       <View style={styles.actionsContainer}>
//         <TouchableOpacity
//           style={styles.captureButton}
//           onPress={captureMultiple}
//           disabled={isCapturing}
//         >
//           {isCapturing ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <>
//               <FontAwesome name="camera" size={24} color="white" />
//               <Text style={styles.captureButtonText}>
//                 {photos.length > 0 ? "Capture More" : "Start Capturing"}
//               </Text>
//             </>
//           )}
//         </TouchableOpacity>

//         {photos.length > 0 && (
//           <TouchableOpacity
//             style={[styles.pdfButton, isGenerating && styles.pdfButtonDisabled]}
//             onPress={generatePDF}
//             disabled={isGenerating}
//           >
//             <View style={styles.pdfButtonContent}>
//               {isGenerating ? (
//                 <Animated.View style={{ transform: [{ rotate }] }}>
//                   <Ionicons name="refresh" size={24} color="white" />
//                 </Animated.View>
//               ) : (
//                 <MaterialIcons name="picture-as-pdf" size={24} color="white" />
//               )}
//               <Text style={styles.pdfButtonText}>
//                 {isGenerating ? "Generating..." : `Create PDF`}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       </View>

//       <Modal
//         visible={cameraModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setCameraModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Capture Answer Sheets</Text>
//               <TouchableOpacity onPress={() => setCameraModalVisible(false)}>
//                 <Ionicons name="close" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.modalBody}>
//               <Text style={styles.modalText}>
//                 Capture multiple answer sheets in sequence. Make sure the first page
//                 contains student information that can be hidden.
//               </Text>

//               <View style={styles.modalActions}>
//                 <TouchableOpacity
//                   style={styles.modalCaptureButton}
//                   onPress={captureImage}
//                 >
//                   <FontAwesome name="camera" size={20} color="white" />
//                   <Text style={styles.modalCaptureButtonText}>Capture Page</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.modalDoneButton}
//                   onPress={() => setCameraModalVisible(false)}
//                 >
//                   <Text style={styles.modalDoneButtonText}>Done</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         visible={hideConfirmVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={() => setHideConfirmVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={[styles.modalContent, { width: width * 0.9, maxHeight: height * 0.8 }]}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Hide Student Information</Text>
//               <TouchableOpacity onPress={() => setHideConfirmVisible(false)}>
//                 <Ionicons name="close" size={28} color="#333" />
//               </TouchableOpacity>
//             </View>

//             <ScrollView style={styles.modalBody}>
//               <View style={styles.overlayPreview}>
//                 <View style={styles.previewContainer}>
//                   {photos.length > 0 && defaultOverlayBase64 ? (
//                     <>
//                       <Image
//                         source={{ uri: photos[0].uri }}
//                         style={styles.backgroundPreviewImage}
//                       />
//                       <Image
//                         source={{ uri: defaultOverlayBase64 }}
//                         style={[
//                           styles.overlayPreviewImage,
//                           {
//                             transform: [
//                               { scale: overlayScale },
//                               { translateX: overlayPosition.x * 100 - 50 },
//                               { translateY: overlayPosition.y * 100 - 50 },
//                             ],
//                           },
//                         ]}
//                         {...panResponder.panHandlers}
//                       />
//                     </>
//                   ) : (
//                     <ActivityIndicator size="small" color="#4299E1" />
//                   )}
//                 </View>

//                 <Text style={styles.overlayPreviewText}>Move overlay using buttons or drag</Text>

//                 <View style={styles.controlsContainer}>
//                   <Text style={styles.controlLabel}>Resize Overlay: {Math.round(overlayScale * 100)}%</Text>
//                   <Slider
//                     value={overlayScale}
//                     onValueChange={(value) => updateOverlaySettings(value, overlayPosition)}
//                     minimumValue={0.5}
//                     maximumValue={2}
//                     step={0.1}
//                     style={styles.slider}
//                     minimumTrackTintColor="#4299E1"
//                     maximumTrackTintColor="#d3d3d3"
//                     thumbTintColor="#4299E1"
//                   />

//                   <View style={styles.moveButtonsRow}>
//                     <TouchableOpacity
//                       style={styles.moveButton}
//                       onPress={() => updateOverlaySettings(overlayScale, { ...overlayPosition, x: Math.max(0, overlayPosition.x - 0.05) })}
//                     >
//                       <Ionicons name="arrow-back" size={24} color="white" />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.moveButton}
//                       onPress={() => updateOverlaySettings(overlayScale, { ...overlayPosition, x: Math.min(1, overlayPosition.x + 0.05) })}
//                     >
//                       <Ionicons name="arrow-forward" size={24} color="white" />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.moveButton}
//                       onPress={() => updateOverlaySettings(overlayScale, { ...overlayPosition, y: Math.max(0, overlayPosition.y - 0.05) })}
//                     >
//                       <Ionicons name="arrow-up" size={24} color="white" />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.moveButton}
//                       onPress={() => updateOverlaySettings(overlayScale, { ...overlayPosition, y: Math.min(1, overlayPosition.y + 0.05) })}
//                     >
//                       <Ionicons name="arrow-down" size={24} color="white" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.modalActions}>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.modalConfirmButton]}
//                   onPress={hideInfoWithDefaultOverlay}
//                 >
//                   <Text style={styles.modalButtonText}>Apply Overlay</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.modalCancelButton]}
//                   onPress={() => setHideConfirmVisible(false)}
//                 >
//                   <Text style={[styles.modalButtonText, {color: "#4a5568"}]}>Cancel</Text>
//                 </TouchableOpacity>
//               </View>
//             </ScrollView>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     paddingTop: Platform.OS === "ios" ? 50 : 20,
//   },
//   header: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e9ecef",
//   },
//   headerTitle: {
//     fontSize: Platform.OS === "ios" ? 26 : 24,
//     fontWeight: "700",
//     color: "#2D3748",
//     textAlign: "center",
//     marginBottom: 5,
//   },
//   headerSubtitle: {
//     fontSize: Platform.OS === "ios" ? 18 : 16,
//     color: "#718096",
//     textAlign: "center",
//   },
//   content: { flex: 1 },
//   photosHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e9ecef",
//   },
//   photosCount: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#4a5568",
//   },
//   clearButton: { padding: 8 },
//   clearButtonText: {
//     color: "#e53e3e",
//     fontWeight: "500",
//   },
//   photosContainer: { flex: 1, padding: 16 },
//   photosGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   photoItem: {
//     width: (width - 48) / 2,
//     height: 240,
//     marginBottom: 16,
//     borderRadius: 12,
//     backgroundColor: "white",
//     shadowColor: "#000",
//     shadowOffset: Platform.OS === "ios" ? { width: 0, height: 2 } : { width: 0, height: 1 },
//     shadowOpacity: Platform.OS === "ios" ? 0.1 : 0.3,
//     shadowRadius: Platform.OS === "ios" ? 4 : 1,
//     elevation: Platform.OS === "android" ? 2 : 0,
//     overflow: "hidden",
//     position: "relative",
//   },
//   thumbnail: {
//     width: "100%",
//     height: 140,
//     resizeMode: "cover",
//   },
//   hiddenThumbnail: {
//     opacity: 0.7,
//   },
//   overlayThumbnail: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "60%",
//     height: "60%",
//     resizeMode: "contain",
//     opacity: 0.8,
//   },
//   photoInfo: {
//     padding: 8,
//   },
//   photoNumber: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#2d3748",
//   },
//   photoTime: {
//     fontSize: 12,
//     color: "#718096",
//   },
//   photoActions: {
//     position: "absolute",
//     bottom: 8,
//     right: 8,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   hideButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 8,
//     padding: 4,
//   },
//   hideButtonText: {
//     fontSize: 12,
//     marginLeft: 4,
//   },
//   deleteButton: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 2,
//   },
//   hiddenBadge: {
//     position: "absolute",
//     top: 5,
//     left: 5,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.7)",
//     paddingHorizontal: 6,
//     paddingVertical: 3,
//     borderRadius: 10,
//     zIndex: 10,
//   },
//   hiddenBadgeText: {
//     color: "white",
//     fontSize: 10,
//     marginLeft: 4,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 40,
//   },
//   emptyStateText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#6B7280",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   emptyStateSubtext: {
//     fontSize: 14,
//     color: "#9CA3AF",
//     textAlign: "center",
//   },
//   actionsContainer: {
//     padding: 20,
//     backgroundColor: "white",
//     borderTopWidth: 1,
//     borderTopColor: "#e9ecef",
//   },
//   captureButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#4299E1",
//     padding: Platform.OS === "ios" ? 18 : 16,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   captureButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   pdfButton: {
//     backgroundColor: "#48BB78",
//     padding: Platform.OS === "ios" ? 18 : 16,
//     borderRadius: 12,
//   },
//   pdfButtonDisabled: {
//     backgroundColor: "#A0AEC0",
//   },
//   pdfButtonContent: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   pdfButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "700",
//     marginLeft: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: width * 0.8,
//     backgroundColor: "white",
//     borderRadius: 12,
//     overflow: "hidden",
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#e9ecef",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#2d3748",
//   },
//   modalBody: {
//     padding: 16,
//   },
//   modalText: {
//     fontSize: 16,
//     color: "#4a5568",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   modalActions: {
//     flexDirection: "column",
//   },
//   modalButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   modalConfirmButton: {
//     backgroundColor: "#4299E1",
//   },
//   modalCancelButton: {
//     backgroundColor: "#e9ecef",
//   },
//   modalButtonText: {
//     color: "white",
//     fontWeight: "500",
//   },
//   modalCaptureButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#4299E1",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   modalCaptureButtonText: {
//     color: "white",
//     fontWeight: "500",
//     marginLeft: 8,
//   },
//   modalDoneButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     backgroundColor: "#e9ecef",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   modalDoneButtonText: {
//     color: "#4a5568",
//     fontWeight: "500",
//   },
//   overlayPreview: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   previewContainer: {
//     width: "100%",
//     aspectRatio: 3 / 4, // Maintain aspect ratio similar to A4 for consistency
//     backgroundColor: "#f0f0f0",
//     borderRadius: 8,
//     marginBottom: 8,
//     overflow: "hidden",
//     position: "relative",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   overlayPreviewImage: {
//     width: "50%", // Reduced size to ensure overlay fits within container
//     height: "50%",
//     resizeMode: "contain",
//     position: "absolute",
//   },
//   overlayPreviewText: {
//     fontSize: 14,
//     color: "#718096",
//     marginBottom: 16,
//   },
//   controlsContainer: {
//     width: "100%",
//     marginBottom: 20,
//   },
//   controlLabel: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#4a5568",
//     marginBottom: 8,
//   },
//   slider: {
//     width: "100%",
//     height: 40,
//   },
//   moveButtonsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//     flexWrap: "wrap",
//   },
//   moveButton: {
//     backgroundColor: "#4299E1",
//     padding: 12,
//     borderRadius: 8,
//     margin: 4,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   backgroundPreviewImage: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "contain",
//     position: "absolute",
//   },
// });

import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Animated,
  Easing,
  Dimensions,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  Platform,
  PanResponder,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import {
  scale,
  normalizeFont,
  verticalScale,
  moderateScale,
  responsivePadding,
  responsiveMargin,
} from "../../../utils/responsive";
import * as ImageManipulator from 'expo-image-manipulator';
import { DEFAULT_OVERLAY_BASE64} from '../../../constants/defaultOverlayBase64'

const { width, height } = Dimensions.get("window");



export default function MultiPhotoPDFGenerator() {
  const [photos, setPhotos] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hideConfirmVisible, setHideConfirmVisible] = useState(false);
  const [photoToHide, setPhotoToHide] = useState(null);
  const [overlayScale, setOverlayScale] = useState(1.0);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0.5, y: 0.5 });
  const [defaultOverlayBase64, setDefaultOverlayBase64] = useState<string | null>(null);
  const [adjustingPhotoId, setAdjustingPhotoId] = useState(null);
const [isOverlayReady, setIsOverlayReady] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Load the default overlay image and convert to base64

// useEffect(() => {
//   const loadDefaultOverlay = async () => {
//     try {
//       const image = Image.resolveAssetSource(DEFAULT_OVERLAY_IMAGE);

//       if (Platform.OS === 'android' && !image.uri.startsWith('file://')) {
//         const base64 = await FileSystem.readAsStringAsync(image.uri, {
//           encoding: FileSystem.EncodingType.Base64,
//         });
//         setDefaultOverlayBase64(`data:image/jpeg;base64,${base64}`);
//       } else {
//         const response = await fetch(image.uri);
//         const blob = await response.blob();
//         const reader = new FileReader();
//         reader.onload = () => {
//           if (typeof reader.result === "string") {
//             setDefaultOverlayBase64(reader.result);
//             setIsOverlayReady(true); // ← Set ready flag
//           } else {
//             console.error("Failed to read image as base64");
//           }
//         };
//         reader.readAsDataURL(blob);
//       }
//     } catch (error) {
//       console.error("Error loading default overlay:", error);

//       const fallbackImage = Image.resolveAssetSource(DEFAULT_OVERLAY_IMAGE).uri;

//       const base64 = await FileSystem.readAsStringAsync(fallbackImage, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       setDefaultOverlayBase64(`data:image/jpeg;base64,${base64}`);
//       setIsOverlayReady(true); // ← Set ready flag
//     }
//   };
//   loadDefaultOverlay();
// }, []);


useEffect(() => {
  setDefaultOverlayBase64(DEFAULT_OVERLAY_BASE64);
  setIsOverlayReady(true);
}, []);


  const captureImage = async () => {
    setIsCapturing(true);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera permission is needed!");
      setIsCapturing(false);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      base64: true,
      allowsEditing: false,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const newPhoto = {
        id: Date.now().toString(),
        uri: `data:image/jpg;base64,${asset.base64}`,
        timestamp: new Date().toLocaleTimeString(),
        isFirstPage: photos.length === 0,
        hidden: false,
        overlayUri: null,
        overlayScale: 1.0,
        overlayPosition: { x: 0.5, y: 0.5 },
      };
      setPhotos((prev) => [...prev, newPhoto]);
    }
    setIsCapturing(false);
  };

  const captureMultiple = async () => {
    setCameraModalVisible(true);
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const clearAllPhotos = () => {
    Alert.alert(
      "Clear All Photos",
      "Are you sure you want to remove all photos?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          onPress: () => setPhotos([]),
          style: "destructive",
        },
      ]
    );
  };

  const confirmHideInfo = (photoId) => {
    setPhotoToHide(photoId);
    setAdjustingPhotoId(photoId);
    setHideConfirmVisible(true);
  };

  const hideInfoWithDefaultOverlay = () => {
    if (defaultOverlayBase64) {
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === photoToHide
            ? {
                ...photo,
                hidden: true,
                overlayUri: defaultOverlayBase64,
                overlayScale: overlayScale,
                overlayPosition: overlayPosition,
              }
            : photo
        )
      );
    }
    setHideConfirmVisible(false);
    setPhotoToHide(null);
    setAdjustingPhotoId(null);
  };

  const removeOverlay = (photoId) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId
          ? { ...photo, hidden: false, overlayUri: null }
          : photo
      )
    );
  };

  const updateOverlaySettings = (scale, position) => {
    if (adjustingPhotoId) {
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === adjustingPhotoId
            ? { ...photo, overlayScale: scale, overlayPosition: position }
            : photo
        )
      );
    }

    // Also update the local state for the modal
    setOverlayScale(scale);
    setOverlayPosition(position);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { moveX, moveY } = gestureState;
        const containerX = evt.nativeEvent.pageX;
        const containerY = evt.nativeEvent.pageY;
        const containerWidth = width * 0.8 - scale(40);
        const containerHeight = verticalScale(200);

        const relativeX = Math.max(
          0,
          Math.min(1, (moveX - containerX) / containerWidth)
        );
        const relativeY = Math.max(
          0,
          Math.min(1, (moveY - containerY) / containerHeight)
        );

        updateOverlaySettings(overlayScale, { x: relativeX, y: relativeY });
      },
    })
  ).current;

  const generatePDF = async () => {
    if (photos.length === 0) {
      Alert.alert(
        "No Photos",
        "Please capture at least one photo before generating PDF"
      );
      return;
    }
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
        <meta charset="UTF-8">
        <title>Captured Images PDF</title>
        <style>
          @page { size: A4; margin: 0; }
          body { margin: 0; padding: 0; background: white; }
          .page {
            width: 100%;
            min-height: 100vh;
            page-break-after: always;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
          }
          .page-image {
            width: 100%;
            height: auto;
            display: block;
            object-fit: contain;
          }
          .overlay-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
          .overlay {
            position: absolute;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transform-origin: center;
          }
        </style>
      </head>
      <body>
  `;

        photos.forEach((photo) => {
          if (photo.hidden && photo.overlayUri) {
            // Convert scale to percentage (scale of 1.0 = 100%)
            const percentageSize = Math.round(
              (photo.overlayScale || 1.0) * 100
            );
            const posX = (photo.overlayPosition?.x || 0.5) * 100;
            const posY = (photo.overlayPosition?.y || 0.5) * 100;

            html += `
        <div class="page">
          <img class="page-image" src="${photo.uri}" />
          <div class="overlay-container">
            <img class="overlay" src="${photo.overlayUri}" 
              style="width: ${percentageSize}%; 
                     height: auto;
                     transform: translate(-50%, -50%);
                     left: ${posX}%;
                     top: ${posY}%;" />
          </div>
        </div>
      `;
          } else {
            html += `
        <div class="page">
          <img class="page-image" src="${photo.uri}" />
        </div>
      `;
          }
        });

        html += `</body></html>`;
        return html;
      };

      // Convert HTML → PDF
      const { uri } = await Print.printToFileAsync({
        html: buildHTML(),
      });

      // Check sharing availability
      const sharingAvailable = await Sharing.isAvailableAsync();
      if (!sharingAvailable) {
        Alert.alert("Error", "Sharing not available on this device");
        return;
      }

      // Share the generated PDF
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share Your PDF",
        UTI: "com.adobe.pdf",
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

  const handlePhotoPress = (photoId) => {
    const photo = photos.find((p) => p.id === photoId);
    if (photo && photo.hidden) {
      setPhotoToHide(photoId);
      setAdjustingPhotoId(photoId);
      setOverlayScale(photo.overlayScale || 1.0);
      setOverlayPosition(photo.overlayPosition || { x: 0.5, y: 0.5 });
      setHideConfirmVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Answer Sheet Scanner</Text>
      
      </View>

      {photos.length > 0 ? (
        <View style={styles.content}>
          <View style={styles.photosHeader}>
            <Text style={styles.photosCount}>
              {photos.length} page{photos.length !== 1 ? "s" : ""} captured
            </Text>
            <TouchableOpacity
              onPress={clearAllPhotos}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.photosContainer}>
            <View style={styles.photosGrid}>
              {photos.map((photo, index) => (
                <View key={photo.id} style={styles.photoItem}>
                  {photo.hidden && (
                    <View style={styles.hiddenBadge}>
                      <Ionicons name="eye-off" size={16} color="white" />
                      <Text style={styles.hiddenBadgeText}>Hidden</Text>
                    </View>
                  )}

                  <TouchableOpacity onPress={() => handlePhotoPress(photo.id)}>
                    <Image
                      source={{ uri: photo.uri }}
                      style={[
                        styles.thumbnail,
                        photo.hidden && styles.hiddenThumbnail,
                      ]}
                    />

                    {photo.hidden && photo.overlayUri && (
                      <View
                        style={[
                          styles.overlayContainer,
                          {
                            left:
                              ((photo.overlayPosition?.x || 0.5) *
                                (width - scale(48))) /
                              2,
                            top:
                              (photo.overlayPosition?.y || 0.5) *
                              verticalScale(140),
                          },
                        ]}
                      >
                        <Image
                          source={{ uri: photo.overlayUri }}
                          style={[
                            styles.overlayThumbnail,
                            {
                              transform: [{ scale: photo.overlayScale || 1.0 }],
                            },
                          ]}
                        />
                      </View>
                    )}
                  </TouchableOpacity>

                  <View style={styles.photoInfo}>
                    <Text style={styles.photoNumber}>
                      {index === 0 ? "First Page" : `Page ${index + 1}`}
                    </Text>
                    <Text style={styles.photoTime}>{photo.timestamp}</Text>
                  </View>

                  <View style={styles.photoActions}>
                    {index === 0 && (
                      <TouchableOpacity
                        style={styles.hideButton}
                        onPress={() =>
                          photo.hidden
                            ? removeOverlay(photo.id)
                            : confirmHideInfo(photo.id)
                        }
                      >
                        <Ionicons
                          name={photo.hidden ? "eye" : "eye-off"}
                          size={20}
                          color={photo.hidden ? "#48BB78" : "#718096"}
                        />
                        <Text
                          style={[
                            styles.hideButtonText,
                            { color: photo.hidden ? "#48BB78" : "#718096" },
                          ]}
                        >
                          {photo.hidden ? "Unhide" : "Hide Info"}
                        </Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => removePhoto(photo.id)}
                    >
                      <Ionicons name="close-circle" size={24} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="images-outline" size={64} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>
            No answer sheets captured yet
          </Text>
          <Text style={styles.emptyStateSubtext}>
            Tap the camera button to start capturing answer sheets
          </Text>
        </View>
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={captureMultiple}
          disabled={isCapturing}
        >
          {isCapturing ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <FontAwesome name="camera" size={24} color="white" />
              <Text style={styles.captureButtonText}>
                {photos.length > 0 ? "Capture More" : "Start Capturing"}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {photos.length > 0 && (
          <TouchableOpacity
            style={[styles.pdfButton, isGenerating && styles.pdfButtonDisabled]}
            onPress={generatePDF}
            disabled={isGenerating}
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
                {isGenerating ? "Generating..." : `Create PDF`}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        visible={cameraModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCameraModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Capture Answer Sheets</Text>
              <TouchableOpacity onPress={() => setCameraModalVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.modalText}>
                Capture multiple answer sheets in sequence. Make sure the first
                page contains student information that can be hidden.
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalCaptureButton}
                  onPress={captureImage}
                >
                  <FontAwesome name="camera" size={20} color="white" />
                  <Text style={styles.modalCaptureButtonText}>
                    Capture Page
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalDoneButton}
                  onPress={() => setCameraModalVisible(false)}
                >
                  <Text style={styles.modalDoneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={hideConfirmVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setHideConfirmVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { width: width * 0.9, maxHeight: height * 0.8 },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Hide Student Information</Text>
              <TouchableOpacity onPress={() => setHideConfirmVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.overlayPreview}>
                <View
                  style={styles.previewContainer}
                  {...panResponder.panHandlers}
                >
                  {photos.length > 0 && defaultOverlayBase64 && isOverlayReady ? (
  <>
    <Image
      source={{ uri: photos[0].uri }}
      style={styles.backgroundPreviewImage}
    />

    <View
      style={[
        styles.overlayPreviewContainer,
        {
          left: overlayPosition.x * (width * 0.8 - scale(40)),
          top: overlayPosition.y * verticalScale(200),
        },
      ]}
    >
      <Image
        source={{ uri: defaultOverlayBase64 }}
        style={[
          styles.overlayPreviewImage,
          { transform: [{ scale: overlayScale }] },
        ]}
      />
    </View>
  </>
) : (
  <ActivityIndicator size="small" color="#4299E1" />
)}

                </View>

                <Text style={styles.overlayPreviewText}>
                  Adjust overlay position and size
                </Text>

                {/* Controls */}
                <View style={styles.controlsContainer}>
                  <Text style={styles.controlLabel}>
                    Resize Overlay: {Math.round(overlayScale * 100)}%
                  </Text>
                  <Slider
                    value={overlayScale}
                    onValueChange={(value) =>
                      updateOverlaySettings(value, overlayPosition)
                    }
                    minimumValue={0.5}
                    maximumValue={2}
                    step={0.1}
                    style={styles.slider}
                    minimumTrackTintColor="#4299E1"
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor="#4299E1"
                  />

                  {/* Horizontal & Vertical Buttons */}
                  <View style={styles.moveButtonsContainer}>
                    <Text style={styles.controlLabel}>Move Overlay:</Text>
                    <View style={styles.moveButtonsRow}>
                      <TouchableOpacity
                        style={styles.moveButton}
                        onPress={() =>
                          updateOverlaySettings(overlayScale, {
                            ...overlayPosition,
                            x: Math.max(0, overlayPosition.x - 0.05),
                          })
                        }
                      >
                        <Ionicons name="arrow-back" size={24} color="white" />
                        <Text style={styles.moveButtonText}>Left</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.moveButton}
                        onPress={() =>
                          updateOverlaySettings(overlayScale, {
                            ...overlayPosition,
                            x: Math.min(1, overlayPosition.x + 0.05),
                          })
                        }
                      >
                        <Ionicons
                          name="arrow-forward"
                          size={24}
                          color="white"
                        />
                        <Text style={styles.moveButtonText}>Right</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.moveButtonsRow}>
                      <TouchableOpacity
                        style={styles.moveButton}
                        onPress={() =>
                          updateOverlaySettings(overlayScale, {
                            ...overlayPosition,
                            y: Math.max(0, overlayPosition.y - 0.05),
                          })
                        }
                      >
                        <Ionicons name="arrow-up" size={24} color="white" />
                        <Text style={styles.moveButtonText}>Up</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.moveButton}
                        onPress={() =>
                          updateOverlaySettings(overlayScale, {
                            ...overlayPosition,
                            y: Math.min(1, overlayPosition.y + 0.05),
                          })
                        }
                      >
                        <Ionicons name="arrow-down" size={24} color="white" />
                        <Text style={styles.moveButtonText}>Down</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalConfirmButton]}
                  onPress={hideInfoWithDefaultOverlay}
                >
                  <Text style={styles.modalButtonText}>Apply Overlay</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={() => setHideConfirmVisible(false)}
                >
                  <Text style={[styles.modalButtonText, { color: "#4a5568" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === "ios" ? verticalScale(50) : verticalScale(20),
  },
  header: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: responsivePadding.medium,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: normalizeFont(Platform.OS === "ios" ? 26 : 24),
    fontWeight: "700",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: moderateScale(5),
  },
  headerSubtitle: {
    fontSize: normalizeFont(Platform.OS === "ios" ? 18 : 16),
    color: "#718096",
    textAlign: "center",
  },
  content: { flex: 1 },
  photosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsivePadding.medium,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  photosCount: {
    fontSize: normalizeFont(16),
    fontWeight: "600",
    color: "#4a5568",
  },
  clearButton: { padding: scale(8) },
  clearButtonText: {
    color: "#e53e3e",
    fontWeight: "500",
    fontSize: normalizeFont(14),
  },
  photosContainer: {
    flex: 1,
    padding: responsivePadding.medium,
  },
  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photoItem: {
    width: (width - scale(48)) / 2,
    height: verticalScale(240),
    marginBottom: verticalScale(16),
    borderRadius: scale(12),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset:
      Platform.OS === "ios"
        ? { width: 0, height: scale(2) }
        : { width: 0, height: scale(1) },
    shadowOpacity: Platform.OS === "ios" ? 0.1 : 0.3,
    shadowRadius: Platform.OS === "ios" ? scale(4) : scale(1),
    elevation: Platform.OS === "android" ? 2 : 0,
    overflow: "hidden",
    position: "relative",
  },
  thumbnail: {
    width: "100%",
    height: verticalScale(140),
    resizeMode: "cover",
  },
  hiddenThumbnail: {
    opacity: 0.7,
  },
  // overlayThumbnail: {
  //   position: "absolute",
  //   width: scale(100),
  //   height: scale(100),
  //   resizeMode: "contain",
  //   opacity: 0.8,
  // },
  photoInfo: {
    padding: scale(8),
  },
  photoNumber: {
    fontSize: normalizeFont(14),
    fontWeight: "500",
    color: "#2d3748",
  },
  photoTime: {
    fontSize: normalizeFont(12),
    color: "#718096",
  },
  photoActions: {
    position: "absolute",
    bottom: scale(8),
    right: scale(8),
    flexDirection: "row",
    alignItems: "center",
  },
  hideButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(8),
    padding: scale(4),
  },
  hideButtonText: {
    fontSize: normalizeFont(12),
    marginLeft: scale(4),
  },
  deleteButton: {
    backgroundColor: "white",
    borderRadius: scale(12),
    padding: scale(2),
  },
  hiddenBadge: {
    position: "absolute",
    top: scale(5),
    left: scale(5),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: scale(6),
    paddingVertical: scale(3),
    borderRadius: scale(10),
    zIndex: 10,
  },
  hiddenBadgeText: {
    color: "white",
    fontSize: normalizeFont(10),
    marginLeft: scale(4),
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(40),
  },
  emptyStateText: {
    fontSize: normalizeFont(18),
    fontWeight: "600",
    color: "#6B7280",
    marginTop: verticalScale(16),
    marginBottom: verticalScale(8),
  },
  emptyStateSubtext: {
    fontSize: normalizeFont(14),
    color: "#9CA3AF",
    textAlign: "center",
  },
  actionsContainer: {
    padding: responsivePadding.large,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  captureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4299E1",
    padding: Platform.OS === "ios" ? verticalScale(18) : verticalScale(16),
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
  },
  captureButtonText: {
    color: "white",
    fontSize: normalizeFont(16),
    fontWeight: "600",
    marginLeft: scale(8),
  },
  pdfButton: {
    backgroundColor: "#48BB78",
    padding: Platform.OS === "ios" ? verticalScale(18) : verticalScale(16),
    borderRadius: scale(12),
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
    fontSize: normalizeFont(16),
    fontWeight: "700",
    marginLeft: scale(10),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: scale(12),
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsivePadding.medium,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalTitle: {
    fontSize: normalizeFont(18),
    fontWeight: "600",
    color: "#2d3748",
  },
  modalBody: {
    padding: responsivePadding.medium,
  },
  modalText: {
    fontSize: normalizeFont(16),
    color: "#4a5568",
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "column",
    marginBottom: 40,
  },
  modalButton: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  modalConfirmButton: {
    backgroundColor: "#4299E1",
  },
  modalCancelButton: {
    backgroundColor: "#e9ecef",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: normalizeFont(14),
  },
  modalCaptureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4299E1",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
  },
  modalCaptureButtonText: {
    color: "white",
    fontWeight: "500",
    fontSize: normalizeFont(14),
    marginLeft: scale(8),
  },
  modalDoneButton: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    backgroundColor: "#e9ecef",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  modalDoneButtonText: {
    color: "#4a5568",
    fontWeight: "500",
    fontSize: normalizeFont(14),
  },
  overlayPreview: {
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  // previewContainer: {
  //   width: "100%",
  //   height: verticalScale(200),
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: scale(8),
  //   marginBottom: verticalScale(8),
  //   overflow: "hidden",
  //   position: "relative",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  backgroundPreviewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  // overlayPreviewImage: {
  //   width: scale(100),
  //   height: scale(100),
  //   resizeMode: "contain",
  // },
  overlayPreviewText: {
    fontSize: normalizeFont(14),
    color: "#718096",
    marginBottom: verticalScale(16),
    textAlign: "center",
  },
  controlsContainer: {
    width: "100%",
    marginBottom: verticalScale(20),
  },
  controlLabel: {
    fontSize: normalizeFont(16),
    fontWeight: "500",
    color: "#4a5568",
    marginBottom: verticalScale(8),
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: verticalScale(40),
    marginBottom: verticalScale(16),
  },
  moveButtonsContainer: {
    marginTop: verticalScale(10),
  },
  moveButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: verticalScale(10),
  },
  moveButton: {
    backgroundColor: "#4299E1",
    padding: verticalScale(12),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    minWidth: scale(80),
  },
  moveButtonText: {
    color: "white",
    fontSize: normalizeFont(12),
    marginTop: verticalScale(4),
  },
  // Add these new styles
  overlayContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: scale(100),
    height: scale(100),
    transform: [{ translateX: -scale(50) }, { translateY: -scale(50) }],
  },

  // overlayThumbnail: {
  //   width: scale(100),
  //   height: scale(100),
  //   resizeMode: "contain",
  // },

  overlayPreviewContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: scale(100),
    height: scale(100),
    transform: [{ translateX: -scale(50) }, { translateY: -scale(50) }],
  },

  // Update the previewContainer to be relative positioning
  previewContainer: {
    width: "100%",
    height: verticalScale(200),
    backgroundColor: "#f0f0f0",
    borderRadius: scale(8),
    marginBottom: verticalScale(8),
    overflow: "hidden",
    position: "relative",
  },

  // Remove the transform from overlayPreviewImage
  overlayPreviewImage: {
    width: scale(100),
    height: scale(100),
    resizeMode: "contain",
  },
});
