import CustomButton from "@/components/customButton";
import DriverCard from "@/components/driverCard";
import RideLayout from "@/components/rideLayout";
import { useDriverStore } from "@/store";
import { router } from "expo-router";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function FindRide() {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  console.log(drivers);
  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            setSelected={() => setSelectedDriver(+item?.id!)}
            selected={selectedDriver!}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/(pages)/bookRide")}
              textVariant="primary"
            />
          </View>
        )}
      />
    </RideLayout>
  );
}
