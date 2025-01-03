import HeaderBack from "@/components/HeaderBack";
import { updateProfile } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/context";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  const { user, refetch } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const handleSave = async () => {
    setLoading(true);
    const result = await updateProfile({ name });
    if (result) {
      refetch();
      Alert.alert("Success", "Profile Updated Successfully");
      router.push("/profile");
    }
    setLoading(false);
  };

  const isDisabled = name.trim() === user?.name.trim() || loading;

  return (
    <SafeAreaView className="h-full bg-white px-5 relative">
      <HeaderBack title="Edit Profile" />
      <View className="flex flex-col justify-start gap-10">
        <View>
          <Text className="text-xs mb-2 text-black-100">USER NAME</Text>
          <TextInput
            placeholder="Enter your new name"
            value={name}
            onChangeText={setName}
            className="border-b py-2 border-primary-100"
          />
        </View>
        <View>
          <Text className="text-xs mb-2 text-black-100">EMAIL</Text>
          <TextInput
            placeholder="Email"
            value={user?.email}
            editable={false}
            className="border-b py-2 border-primary-100 opacity-50"
          />
        </View>
      </View>
      <View className="absolute bottom-12 left-5 right-5">
        <TouchableOpacity
          onPress={handleSave}
          disabled={isDisabled}
          className={`bg-black-100 rounded-md p-4 ${
            isDisabled ? "bg-gray-300" : "bg-primary-300"
          }`}
        >
          <View className="flex flex-row items-center justify-center">
            <Text className="text-md font-rubik text-black-300">Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
