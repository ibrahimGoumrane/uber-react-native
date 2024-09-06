import CustomButton from "@/components/customButton";
import GoogleTextInput from "@/components/googleTextInput";
import RideLayout from "@/components/rideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { View, Text } from "react-native";

export default function FindRide() {
  const {
    setDestinationLocation,
    setUserLocation,
    userAddress,
    destinationAddress,
  } = useLocationStore();
  return (
    <RideLayout title="Ride" snapPoints={["80%"]}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          initialLocation={userAddress!}
          icon={icons.target}
          containerStyle="bg-neutral-100 "
          textInputBackgroundColor="#f5f5f5"
          handlePress={setUserLocation}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          initialLocation={destinationAddress!}
          icon={icons.map}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={setDestinationLocation}
        />
      </View>
      <CustomButton
        title="find Now "
        onPress={() => router.push("/(root)/(pages)/confirmRide")}
        className="mt-5"
      />
    </RideLayout>
  );
}
