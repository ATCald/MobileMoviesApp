import Inputbox from "@/components/Inputbox";
import { icons } from "@/constants/icons";
import { signIn } from "@/services/appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);

  const handleSignIn = async () => {
    console.log("Attempting to sign in");
    console.log(username);
    console.log(password);
    if (username.trim() != "" && password.trim() != "") {
      console.log("not empty");
      try {
        await signIn({ username, password });
        Alert.alert("Success");
        router.push('/(tabs)/profile')
      } catch (error) {
        Alert.alert("Error signing in");
      }
    } else {
      Alert.alert("Fields cannot be empty, try again!");
    }
  };

  return (
    <View className="bg-light flex-1 items-center py-60">
      <Text className="text-xl text-accent font-bold">Sign In</Text>
      <Inputbox
        placeholder={"Username"}
        value={username}
        onChangeText={(text: string) => setUsername(text)}
      />
      <View className="w-full flex items-center justify-center">
        <Inputbox
          placeholder={"Password"}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          filter={viewPassword}
        />
        <TouchableOpacity
          className="absolute ml-60"
          onPress={() => setViewPassword(!viewPassword)}
        >
          <Image
            source={viewPassword ? icons.view : icons.hide}
            className="size-5"
            tintColor="#E81E63"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row w-full justify-center items-center">
        <TouchableOpacity
          className="bg-accent rounded-lg p-2"
          onPress={() => handleSignIn()}
        >
          <Text className="text-white font-bold">Login</Text>
        </TouchableOpacity>
        <Text className="text-xs font-semibold"> Dont have an account? </Text>
        <TouchableOpacity onPress={() => router.push("auth/sign_up")}>
          <Text className="text-xs font-semibold text-accent italic">
            Sign up!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;
