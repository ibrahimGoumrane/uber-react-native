import RideCard from "@/components/rideCard";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Rides() {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/api/ride/${user?.id}`,
  );
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
            <Text className="font-JakartaExtraBold text-2xl">All rides</Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}
