import LoginBtn from "@/components/LoginBtn";
import { icons } from "@/constants/icons";
import { currentUser, signOut } from "@/services/appwrite";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";

const profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const get_user = async () => {
      try {
        const user = await currentUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    get_user();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut()
      Alert.alert("Succesfully signed out!")
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return user ? (
      <View className=" bg-primary justify-center items-center flex-1 py-20 ">
          <Text className="text-white font-bold text-lg">Welcome back {user?.name}!</Text>
          <LoginBtn input="Sign out" onPress={() => handleSignOut()}/>
      </View>
  ) : (
    <View className="flex flex-1 items-center bg-primary">
      <View className="w-full h-full rounded-lg justify-center items-center">
        <View className="flex-row justify-center items-center">
          <Image source={icons.person} tintColor={"white"} />
          <Text className="ml-2 text-[25px] font-bold justify-start text-white">
            Login
          </Text>
        </View>

        <LoginBtn input="Login" onPress={() => router.push("/auth/login")} />
        <LoginBtn
          input="Sign Up"
          onPress={() => router.push("/auth/sign_up")}
        />

        <View className=" flex-row">
          <Text className="text-white font-semibold text-sm mr-1 ">
            Login to have your favorites saved!
          </Text>
          <Image source={icons.full_heart} />
        </View>
      </View>
    </View>
  );
};

export default profile;
