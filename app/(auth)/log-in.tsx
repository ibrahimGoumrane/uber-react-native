import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import CustomLink from "@/components/link";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useState } from "react";
import { ScrollView, Text, Image, View } from "react-native";

export default function LogIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleLogIn = () => {
    if (!form.password || !form.email) {
      alert("Please fill all the fields");
      return;
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Hello Again 😁
          </Text>
        </View>
        <View className="p-3">
          <InputField
            label={"Email"}
            placeholder={"Enter Your email"}
            icon={icons.person}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label={"Password"}
            placeholder={"Enter Your password"}
            icon={icons.person}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>
        <View className="flex items-center justify-center w-3/4 mx-auto ">
          <CustomButton
            title={"Log In"}
            onPress={handleLogIn}
            textVariant="default"
          />
        </View>
        <OAuth />
        <CustomLink
          PrimaryText={"Don't have an account? "}
          SecondayText={"Sign Up"}
          href="/(auth)/sign-up"
        />
      </View>
    </ScrollView>
  );
}
