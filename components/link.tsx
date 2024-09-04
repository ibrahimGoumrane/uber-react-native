import { LinkFieldProps } from "@/types/type";
import { Link } from "expo-router";
import { Text } from "react-native";
export default function CustomLink({
  PrimaryText,
  SecondayText,
  href,
}: LinkFieldProps) {
  return (
    <Link
      href={href}
      className="w-full flex items-center justify-center text-center my-3 "
    >
      <Text className="text-sm font-JakartaLight text-black">
        {PrimaryText + " "}
      </Text>
      <Text className="text-sm font-JakartaLight text-blue-500">
        {SecondayText}
      </Text>
    </Link>
  );
}
