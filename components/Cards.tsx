import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";

interface Props {
  item: Models.Document;
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start relative w-60 h-80"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      <View className="flex flex-row items-center bg-white px-2 py-1 rounded-3xl absolute top-4 right-4">
        <Image source={icons.star} className="size-4" />
        <Text className="text-primary-300 text-xs font-rubik-bold ml-1">
          4.4
        </Text>
      </View>
      <View className="flex flex-col items-start absolute bottom-4 left-4 gap-1">
        <Text className="text-white text-base font-rubik-bold">
          Merialla Villa
        </Text>
        <Text className="text-white text-base">New York, US</Text>
        <Text className="text-white text-base font-rubik-bold">$12219</Text>
      </View>
      <TouchableOpacity className="flex flex-col items-start absolute bottom-5 right-4">
        <Image source={icons.heart} className="size-7" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-3 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
      onPress={onPress}
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          4.4
        </Text>
      </View>

      <Image source={images.newYork} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-black-300">
          La Grand Maison
        </Text>
        <Text className="text-xs font-rubik text-black-100">Tokyo, Japan</Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            $1424
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
