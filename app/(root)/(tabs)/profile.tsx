import SettingsItem from "@/components/SettingsItem";
import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/context";
import { router } from "expo-router";
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

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleEditProfile = () => {
    router.push(`/edit-profile`);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex flex-col items-center mt-10">
          <View className="relative mb-5">
            <Image
              source={{ uri: user?.avatar, cache: "force-cache" }}
              className="size-44 rounded-full relative"
            />
            <TouchableOpacity
              onPress={handleEditProfile}
              className="absolute bottom-0 right-4"
            >
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-rubik-bold">{user?.name}</Text>
        </View>

        <View className="flex flex-col mt-10 border-t pt-5 border-primary-200">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            textStyle="text-danger"
            icon={icons.logout}
            title="Logout"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
