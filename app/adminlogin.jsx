import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { auth, firebase } from "./firebase";

const Adminlogin = () => {
  const [id, setid] = useState("");
  const [pass, setpass] = useState("");
  const navigation = useNavigation();
  const validatelogin = () => {
    if (id == "admin" && pass == "123") {
      Alert.alert("Sucess!!", "Sucessfully Logged In");
      navigation.navigate("adminpage");
      setid("");
      setpass("");
    } else {
      Alert.alert("Error", "Enter Valid Credentials");
      setid("");
      setpass("");
    }
  };
  return (
    <>
      <View style={tw`h-full w-full bg-white flex  justify-center`}>
        <View style={tw`flex flex-col items-center`}>
          <Image
            source={require("../assets/images/adminlogin.png")}
            style={tw`w-24 h-24`}
          />
          <Text
            style={tw`text-4xl font-bold italic text-purple-400 mt-10  w-full text-center font-black`}
          >
            Admin
          </Text>
          <View style={tw`w-full flex flex-col items-center  `}>
            <TextInput
              placeholder="Email"
              style={tw`border-purple-400 border-b w-64 mt-5 px-2`}
              value={id}
              onChangeText={(value) => {
                setid(value);
              }}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={tw`border-b border-purple-400 mt-10  w-64 px-2`}
              value={pass}
              onChangeText={(value) => {
                setpass(value);
              }}
            />

            <TouchableOpacity
              style={tw`mt-12 bg-purple-400 w-64 h-12 rounded-2xl items-center justify-center`}
              onPress={validatelogin}
            >
              <Text style={tw`text-white font-black`}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default Adminlogin;
