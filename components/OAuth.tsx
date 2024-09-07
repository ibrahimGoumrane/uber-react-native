import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./customButton";
export default function OAuth() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleLogIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);
      if (result.code === "session_exists" || result.code === "success") {
        router.push("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View className="">
      <View className="flex flex-row justify-between items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-black" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-black" />
      </View>
      <View className="flex items-center justify-center w-3/4 mx-auto  ">
        <CustomButton
          title={"LogIn with google"}
          onPress={handleGoogleLogIn}
          className="mt-5 w-full shadow-none"
          IconLeft={() => (
            <Image source={icons.google} className="w-5 h-5 mx-2" />
          )}
          bgVariant="outline"
          textVariant="primary"
        />
      </View>
    </View>
  );
}
