import { getBgVariant, getTextVariantStyle } from "@/constants";
import { ButtonProps } from "@/types/type";
import { TouchableOpacity, Text } from "react-native";

const customButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`w-full flex-row rounded-full p-3 flex justify-center items-center shadow-md shadow-neutral-300/70 ${getBgVariant(bgVariant)} ${className}`}
      activeOpacity={0.8}
      onPress={onPress}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`${getTextVariantStyle(textVariant)}  text-lg font-bold text-center `}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};
export default customButton;
