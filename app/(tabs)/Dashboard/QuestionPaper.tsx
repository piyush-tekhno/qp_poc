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

import React, { useState, useRef } from "react";
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
  ActivityIndicator, Platform 
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const { width, height } = Dimensions.get("window");

export default function MultiPhotoPDFGenerator() {
  const [photos, setPhotos] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
      };
      setPhotos((prev) => [...prev, newPhoto]);
    }
    
    setIsCapturing(false);
  };

  const captureMultiple = async () => {
    setCameraModalVisible(true);
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter(photo => photo.id !== id));
  };

  const clearAllPhotos = () => {
    Alert.alert(
      "Clear All Photos",
      "Are you sure you want to remove all photos?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", onPress: () => setPhotos([]), style: "destructive" },
      ]
    );
  };

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
              }
              img {
                width: 100%;
                height: auto;
                display: block;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
      `;

      photos.forEach((photo) => {
        html += `
          <div class="page">
            <img src="${photo.uri}" />
          </div>
        `;
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Multi-Photo PDF Generator</Text>
        <Text style={styles.headerSubtitle}>
          Capture multiple photos and generate a PDF document
        </Text>
      </View>

      {photos.length > 0 ? (
        <View style={styles.content}>
          <View style={styles.photosHeader}>
            <Text style={styles.photosCount}>{photos.length} photo{photos.length !== 1 ? 's' : ''} captured</Text>
            <TouchableOpacity onPress={clearAllPhotos} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.photosContainer}>
            <View style={styles.photosGrid}>
              {photos.map((photo, index) => (
                <View key={photo.id} style={styles.photoItem}>
                  <Image source={{ uri: photo.uri }} style={styles.thumbnail} />
                  <View style={styles.photoInfo}>
                    <Text style={styles.photoNumber}>Image {index + 1}</Text>
                    <Text style={styles.photoTime}>{photo.timestamp}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => removePhoto(photo.id)}
                  >
                    <Ionicons name="close-circle" size={24} color="#F44336" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="images-outline" size={64} color="#CCCCCC" />
          <Text style={styles.emptyStateText}>No photos captured yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Tap the camera button to start capturing images
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
              <Text style={styles.modalTitle}>Capture Photos</Text>
              <TouchableOpacity onPress={() => setCameraModalVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>
                You can capture multiple photos in sequence. 
                The camera will open each time you press "Capture Photo".
              </Text>
              
              <View style={styles.modalActions}>
                <TouchableOpacity 
                  style={styles.modalCaptureButton}
                  onPress={captureImage}
                >
                  <FontAwesome name="camera" size={20} color="white" />
                  <Text style={styles.modalCaptureButtonText}>Capture Photo</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: { 
    flex: 1, 
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === "ios" ? 50 : 20, // iOS safer area
  },

  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },

  headerTitle: {
    fontSize: Platform.OS === "ios" ? 26 : 24,
    fontWeight: "700",
    color: "#2D3748",
    textAlign: "center",
    marginBottom: 5,
  },

  headerSubtitle: {
    fontSize: Platform.OS === "ios" ? 18 : 16,
    color: "#718096",
    textAlign: "center",
  },

  content: { flex: 1 },

  photosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },

  photosCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a5568",
  },

  clearButton: { padding: 8 },

  clearButtonText: {
    color: "#e53e3e",
    fontWeight: "500",
  },

  photosContainer: { flex: 1, padding: 16 },

  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  photoItem: {
    width: (width - 48) / 2,
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: Platform.OS === "ios" ? { width: 0, height: 2 } : { width: 0, height: 1 },
    shadowOpacity: Platform.OS === "ios" ? 0.1 : 0.3,
    shadowRadius: Platform.OS === "ios" ? 4 : 1,
    elevation: Platform.OS === "android" ? 2 : 0,
    overflow: "hidden",
    position: "relative",
  },

  thumbnail: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },

  photoInfo: {
    padding: 8,
  },

  photoNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d3748",
  },

  photoTime: {
    fontSize: 12,
    color: "#718096",
  },

  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 16,
    marginBottom: 8,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },

  actionsContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },

  captureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4299E1",
    padding: Platform.OS === "ios" ? 18 : 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  captureButtonText: { 
    color: "white", 
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  pdfButton: {
    backgroundColor: "#48BB78",
    padding: Platform.OS === "ios" ? 18 : 16,
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
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
    borderRadius: 12,
    overflow: "hidden",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
  },

  modalBody: {
    padding: 16,
  },

  modalText: {
    fontSize: 16,
    color: "#4a5568",
    marginBottom: 20,
    textAlign: "center",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalCaptureButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4299E1",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  modalCaptureButtonText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 8,
  },

  modalDoneButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#e9ecef",
  },

  modalDoneButtonText: {
    color: "#4a5568",
    fontWeight: "500",
  },
});