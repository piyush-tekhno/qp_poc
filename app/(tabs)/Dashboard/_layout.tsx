// D:\Qp-piyush\QP\app\(tabs)\Dashboard\_layout.tsx
import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Dashboard"
        options={{
          headerShown: false,
          presentation : "card",
          animation : "slide_from_right"
        }}
      />
      <Stack.Screen
        name="SubDashboard"
        options={{
          headerShown: false,
          presentation: "card",
          animation: "slide_from_right",
        }}
      />
       <Stack.Screen
        name="QuestionPaper"
        options={{
          headerShown: false,
          presentation: "card",
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}


