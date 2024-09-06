import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default function GoogleTextInput({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) {
  const Google_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <View
      className={
        "flex flex-row  items-center justify-center relative z-50 rounded-xl mb-5 min-h-[48px] " +
        `${containerStyle}`
      }
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where you want to go?"
        debounce={200}
        minLength={2}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "between",
            gap: 5,
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: Google_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation || "Where you want to go?",
        }}
      />
    </View>
  );
}
