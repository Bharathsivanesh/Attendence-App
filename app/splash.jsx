import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const Splash = () => {
  const navigation = useNavigation();
  const [role, setrole] = useState("");
  useEffect(() => {
    if (role == "warden") {
      navigation.navigate("Login");
      setrole("");
    } else {
      if (role == "admin") {
        navigation.navigate("adminlogin");
      }
    }
  }, [role]);
  return (
    <>
      <View style={tw`bg-white`}>
        <View
          style={[
            tw`w-full bg-purple-500 items-center justify-center h-52 `,
            {
              borderBottomRightRadius: 96,
              borderBottomLeftRadius: 96,
            },
          ]}
        >
          <Image
            source={require("../assets/images/splash1.png")}
            style={[
              tw`w-36 h-36`,
              {
                tintColor: "white",
              },
            ]}
          />
        </View>
      </View>

      <View
        style={tw`h-full w-full bg-white flex items-center justify-start flex-col`}
      >
        <View
          style={[
            tw`h-1/2 w-full  mt-10  items-center justify-center`,
            {
              borderRadius: 20,
            },
          ]}
        >
          <Image
            source={require("../assets/images/calender.png")}
            style={tw`w-full h-72 ml-10`}
            resizeMode="cover"
          />
        </View>
        <View style={tw` w-44 rounded-xl  h-14 mb-4 bg-purple-400`}>
          <Picker
            style={tw` text-white `}
            selectedValue={role}
            onValueChange={(value) => {
              setrole(value);
            }}
          >
            <Picker.Item
              label="SELECT ROLE"
              style={{
                fontWeight: "bold",
              }}
            />
            <Picker.Item label="Warden" value="warden" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>
      </View>
    </>
  );
};

export default Splash;
