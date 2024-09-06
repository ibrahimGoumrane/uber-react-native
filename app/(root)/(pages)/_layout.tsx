import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="findRide" options={{ headerShown: false }} />
      <Stack.Screen name="confirmRide" options={{ headerShown: false }} />
      <Stack.Screen name="bookRide" options={{ headerShown: false }} />
    </Stack>
  );
}
