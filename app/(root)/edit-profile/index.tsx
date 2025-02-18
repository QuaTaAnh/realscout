import HeaderBack from "@/components/HeaderBack";
import { updateProfile } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/context";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const { user, refetch } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.avatar || null);

  const handleSave = async () => {
    if (name.trim() === "") {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setLoading(true);
    const result = await updateProfile({ name, avatar: image || "" });
    if (result) {
      refetch();
      Alert.alert("Success", "Profile Updated Successfully");
      router.push("/profile");
    }
    setLoading(false);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Allow access to photos to update your profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const isDisabled =
    (name.trim() === user?.name.trim() && image === user?.avatar) ||
    name.trim() === "" ||
    loading;

  return (
    <SafeAreaView className="h-full bg-white px-5 relative">
      <HeaderBack title="Edit Profile" />
      <View className="flex flex-col justify-start gap-10">
        <TouchableOpacity
          onPress={pickImage}
          className="flex flex-col items-center"
        >
          <Image
            source={
              image ? { uri: image } : require("@/assets/images/avatar.png")
            }
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-center text-primary-300 mt-2">
            Change Photo
          </Text>
        </TouchableOpacity>
        <View>
          <Text className="text-xs mb-2 text-black-100">USER NAME</Text>
          <TextInput
            placeholder="Enter your new name"
            value={name}
            onChangeText={setName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`border-b py-2 ${
              isFocused ? "border-primary-300" : "border-primary-100"
            }`}
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
