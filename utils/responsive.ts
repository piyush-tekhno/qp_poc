import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const baseWidth = 375; // iPhone 6/7/8 width

// Scale based on width
export const scale = (size: number): number => {
  if (width <= 0) return size;
  return (width / baseWidth) * size;
};

// Scale based on height (for vertical spacing)
export const verticalScale = (size: number): number => {
  const baseHeight = 812; // iPhone X height
  return (height / baseHeight) * size;
};

// Moderate scale with factor
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Normalize font sizes
export const normalizeFont = (size: number): number => {
  const newSize = scale(size);
  
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// Responsive padding/margin
export const responsivePadding = {
  small: scale(8),
  medium: scale(16),
  large: scale(24),
  xlarge: scale(32),
};

export const responsiveMargin = {
  small: scale(8),
  medium: scale(16),
  large: scale(24),
  xlarge: scale(32),
};

export { width, height };