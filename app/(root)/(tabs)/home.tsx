import GoogleTextInput from "@/components/googleTextInput";
import Map from "@/components/map";
import RideCard from "@/components/rideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

export default function Page() {
  const { setDestinationLocation, setUserLocation } = useLocationStore();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/api/ride/${user?.id}`
  );
  const [, setHasPermission] = useState(false);
  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
        let location = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude!,
          longitude: location.coords.longitude!,
        });
        setUserLocation({
          latitude: location.coords.latitude!,
          longitude: location.coords.longitude!,
          address: `${address[0].city!} , ${address[0].country!}`,
        });
      }
    };
    requestLocationPermission();
  }, []);

  function handleSignOut(): void {
    signOut();
    router.replace("/(auth)/log-in");
  }
  function handleDestinationSearch(location: {
    latitude: number;
    longitude: number;
    address: string;
  }): void {
    setDestinationLocation(location);
    router.replace("/(root)/(pages)/findRide");
  }

  return (
    <SafeAreaView>
      <FlatList
        data={recentRides}
        className="px-5 "
        renderItem={({ item }) => <RideCard ride={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center ">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-lg text-gray-400">
                  No recent rides found
                </Text>
              </>
            ) : (
              <ActivityIndicator size={40} color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5 ">
              <Text
                className="text-xl font-JakartaExtraBold flex-1 capitalize"
                numberOfLines={3}
              >
                Welcome {"\n"}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
              </Text>
              <TouchableOpacity
                className="rounded-full bg-red-500 p-3 flex items-center justify-center"
                activeOpacity={0.5}
                onPress={handleSignOut}
              >
                <Image
                  source={icons.out}
                  className="w-5 h-5 flex items-center justify-center bg-bl -translate-x-0.5"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle={"bg-white shadow-md shadow-neutral-300"}
              handlePress={handleDestinationSearch}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Recent Rides
              </Text>
            </>
          </>
        )}
      />
    </SafeAreaView>
  );
}
