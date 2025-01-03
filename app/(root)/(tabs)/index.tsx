import { getGreetingMessage } from "@/common/greetings";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/context";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="h-full bg-white pb-32 px-7">
      <View className="flex flex-row justify-between items-center mt-5">
        <View className="flex flex-row">
          <Image
            source={{ uri: user?.avatar }}
            className="size-12 rounded-full"
          />
          <View className="flex flex-col justify-center items-start ml-2">
            <Text className="text-xs font-rubik text-black-100">
              {getGreetingMessage()}
            </Text>
            <Text className="text-base font-rubik-medium text-black-300">
              {user?.name}
            </Text>
          </View>
        </View>
        <Image source={icons.bell} className="size-5" />
      </View>
    </SafeAreaView>
  );
}
