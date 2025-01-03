import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/context";
import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      console.log("refetch");
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.onboarding}
          style={{
            height: 552,
            width: "100%",
          }}
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Zinza
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer To {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-2 mt-8"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                style={{
                  height: 24,
                  width: 24,
                }}
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik text-black-300 ml-4">
                Sign Up with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
