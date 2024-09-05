import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import { View, Text, Image } from "react-native";

export default function rideCard({
  ride: {
    destination_latitude,
    destination_longitude,
    origin_address,
    destination_address,
    payment_status,
    ride_time,
    created_at,
    driver,
  },
}: {
  ride: Ride;
}) {
  const imageUri = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`;
  return (
    <View className="flex flex-row items-center justify-center bg-white  rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col  items-center  justify-center p-3">
        <View className="flex flex-row items-center  justify-between ">
          <Image
            source={{
              uri: imageUri,
            }}
            className="w-20 h-20 rounded-lg"
          />
          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {origin_address}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Date & Time :
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {formatDate(created_at)} , {formatTime(ride_time)}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver:
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {driver?.first_name} {driver?.last_name}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car Seats:
            </Text>
            <Text className="text-md font-JakartaMedium text-gray-500">
              {driver.car_seats}
            </Text>
          </View>
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment Status:
            </Text>
            <Text
              className={
                "text-md capitalize font-JakartaMedium text-gray-500 " +
                `${payment_status === "paid" ? "text-green-500" : "text-red-500"}`
              }
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
