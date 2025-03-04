import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import icons from "@/constants/icons";
import { useLocalSearchParams, usePathname, router } from "expo-router";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const paras = useLocalSearchParams<{ query?: string }>();
  const [searchQuery, setSearchQuery] = useState(paras.query);

  const debounceSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      debounceSearch(text);
    },
    [debounceSearch]
  );

  return (
    <View className="flex flex-row justify-between items-center px-4 w-full rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start py-1">
        <Image source={icons.search} className="size-5 mr-2" />
        <TextInput
          value={searchQuery}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 mr-10"
          onChangeText={handleSearch}
        />
      </View>
      <TouchableOpacity onPress={() => setSearchQuery("")}>
        <Image source={icons.close} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
