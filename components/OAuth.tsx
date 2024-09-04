import { View, Text, Image } from "react-native";
import CustomButton from "./customButton";
import { icons } from "@/constants";

export default function OAuth() {
  async function handleGoogleLogIn() {}
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
