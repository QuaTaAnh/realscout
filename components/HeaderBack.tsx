import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import icons from "@/constants/icons";

const HeaderBack = ({ title }: { title: string }) => {
  return (
    <View>
      <View className="flex flex-row items-center mt-5 mb-16">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center mr-4"
        >
          <Image source={icons.backArrow} className="size-5" />
        </TouchableOpacity>

        <Text className="text-xl font-rubik-bold">{title}</Text>
      </View>
    </View>
  );
};

export default HeaderBack;
