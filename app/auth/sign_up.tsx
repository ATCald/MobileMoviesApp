import Inputbox from "@/components/Inputbox";
import { icons } from "@/constants/icons";
import { signUp } from "@/services/appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const sign_up = () => {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifypassword] = useState("")
  const [viewPassword, setViewPassword] = useState(true);

  const handleSignUp = async () => {
    if (username.trim() != "" && password.trim() != "") {
      if (password == verifyPassword){
        console.log("passwords are the same!")
        try {
          await signUp({password, username})
          Alert.alert("Success", "Account created!")
          router.push("/auth/login")
        } catch (err) {
          Alert.alert("Signup failed")
        }

      } else {
        Alert.alert("Passwords do not match, try again!")
      }
 
    } else {
      Alert.alert("Fields cannot be empty, try again!")
    }
  };

  return (
    <View className="bg-light flex-1 items-center py-60">
      <Text className="text-xl text-accent font-bold">Sign Up</Text>
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

      <View className="w-full flex items-center justify-center">
        <Inputbox
          placeholder={"Verify Password"}
          value={verifyPassword}
          onChangeText={(text: string) => setVerifypassword(text)}
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
          onPress={() => handleSignUp()}
        >
          <Text className="text-white font-bold">Sign Up</Text>
        </TouchableOpacity>
        <Text className="text-xs font-semibold"> Have an account already? </Text>
        <TouchableOpacity onPress={() => router.push("auth/login")}>
          <Text className="text-xs font-semibold text-accent italic">
            Login
          </Text>
        </TouchableOpacity>
          
      </View>
    </View>
  );
};

export default sign_up;