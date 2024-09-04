import CustomButton from "@/components/customButton";
import InputField from "@/components/inputField";
import CustomLink from "@/components/link";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verification, setVerification] = useState({
    code: "",
    state: "default",
    error: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].message);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //TODO: now we can create the user account
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
          error: "",
        });
      } else {
        setVerification({
          ...verification,
          state: "pending",
          error: "Verification code is invalid. Please try again.",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "pending",
        error: err.errors[0].longMessage,
      });
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-3">
          <InputField
            label={"Name"}
            placeholder={"Enter Your Name"}
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
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
            title={"Sign Up"}
            onPress={onSignUpPress}
            textVariant="default"
          />
        </View>
        <OAuth />
        <CustomLink
          PrimaryText={"Already have an account? "}
          SecondayText={"Login"}
          href="/(auth)/log-in"
        />
        {/* Verification Modal */}
        <ReactNativeModal isVisible={verification.state === "pending"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] ">
            <View className="flex flex-row w-full justify-between">
              <Text className="text-3xl font-JakartaBold text-left">
                Verification
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setVerification({ ...verification, state: "default" })
                }
                className="w-8 h-8"
              >
                <Text className="text-2xl text-red-500 font-JakartaBold">
                  X
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-base text-gray-400 font-Jakartartext-left mt-2">
              We have sent a verification code to your email address. Please
              enter the code below
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm">{verification.error}</Text>
            )}
            <CustomButton
              title={"Verify"}
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] ">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />

            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center nt-2">
              You have successfully verified your account
            </Text>
            <CustomButton
              title={"Browse Home"}
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
