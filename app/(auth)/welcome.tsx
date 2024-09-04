import { router } from "expo-router";
import { Text, Touchable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoarding() {
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/log-in");
        }}
      >
        <Text>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
