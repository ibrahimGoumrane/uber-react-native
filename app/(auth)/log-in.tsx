import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import CustomLink from "@/components/link";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useCallback, useState } from "react";
import { ScrollView, Text, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { ClerkAPIError } from "@clerk/types";
import { useSignIn } from "@clerk/clerk-expo";

export default function LogIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const onLogInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.log(err.errors);
      setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);
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
        {errors.length !== 0 && (
          <View className="mb-2 mx-2">
            {errors.map((el, index) => (
              <Text
                key={index}
                className="text-red-400 text-sm font-JakartaBold"
              >
                {el.longMessage}
              </Text>
            ))}
          </View>
        )}
        <View className="flex items-center justify-center w-3/4 mx-auto ">
          <CustomButton
            title={"Log In"}
            onPress={onLogInPress}
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
