import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { View, Image, ImageSourcePropType } from "react-native";
function CustomIcon({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-neutral-300" : ""}`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center translate-y-0 ${focused ? "bg-general-400 " : ""}`}
      >
        <Image
          source={source}
          tintColor={"white"}
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );
}

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          position: "absolute",
          marginBottom: 20,
          marginHorizontal: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 60,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}
