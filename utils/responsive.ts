import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const baseWidth = 375;

export const scale = (size: number): number => {
  if (width <= 0) return size;
  return (width / baseWidth) * size;
};

export const normalizeFont = (size: number): number => {
  const newSize = scale(size);
  
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};