import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ActivityIndicator, Image, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
const LoginScreen = () => {
  const [username, setusername] = useState("");
  const [userpass, setuserpass] = useState("");
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();
  const reset = () => {
    setusername("");
    setuserpass("");
    setname("");
  };

  const valid = async () => {
    try {
      setloading(true);
      if (!userpass || !username) {
        Alert.alert("Warning", "Please fill all required fields");
        return;
      }
      const querydoc = query(
        collection(db, "Warden_details"),
        where("userid", "==", username),
        where("password", "==", userpass)
      );
      const getdocuments = await getDocs(querydoc);
      if (getdocuments.size >= 1) {
        Alert.alert("Sucess!!", "Sucessfully Logged In");

        getdocuments.forEach(async (value) => {
          const result = value.data();
          await AsyncStorage.setItem("name", result.name);
          await AsyncStorage.setItem("block", result.block_cat);
          await AsyncStorage.setItem("block-no", result.block_no);
          await AsyncStorage.setItem("year", result.year);
          console.log(result.name);
          navigation.navigate("home");
        });

        reset();
      } else {
        Alert.alert("Error", "Enter Valid Credentials");
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <View style={tw`h-full w-full bg-white`}>
        <View style={tw`flex flex-col items-center `}>
          <View style={tw`h-full w-full  `}>
            <Image
              source={require("../assets/images/login.png")}
              style={tw`h-2/5 w-full`}
            />
            <View>
              <Text
                style={tw`text-4xl font-bold italic text-purple-500 mt-10 text-center font-black`}
              >
                LOGIN
              </Text>
              <View style={tw`w-full flex flex-col items-center  `}>
                <TextInput
                  placeholder="User i'd"
                  style={tw`border-purple-500 border-b w-64 mt-5 px-2`}
                  onChangeText={(Text) => {
                    setusername(Text);
                  }}
                  value={username}
                />
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  style={tw`border-b border-purple-500 mt-10  w-64 px-2`}
                  onChangeText={(Text) => {
                    setuserpass(Text);
                  }}
                  value={userpass}
                />

                <TouchableOpacity
                  style={tw`mt-12 bg-purple-500 w-64 h-12 rounded-2xl items-center justify-center`}
                  onPress={valid}
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={tw`text-white font-black`}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
