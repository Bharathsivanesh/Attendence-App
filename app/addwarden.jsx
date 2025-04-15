import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigation } from "expo-router";

const Addwarden = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [fromdata, setfromdata] = useState({
    name: "",
    year: "",
    select_block: "",
    block_no: "",
    set_id: "",
    set_pass: "",
  });

  const reset = () => {
    setfromdata({
      name: "",
      year: "",
      select_block: "",
      block_no: "",
      set_id: "",
      set_pass: "",
    });
    console.log("rest");
  };
  const validateform = async () => {
    try {
      setloading(true);
      if (
        !fromdata.name ||
        !fromdata.select_block ||
        !fromdata.set_id ||
        !fromdata.set_pass
      ) {
        alert("Please fill all the fields");
        console.log(fromdata);
        return;
      }
      if (fromdata.select_block == "BB" && !fromdata.block_no) {
        alert("Please select a Year for GB block");
        return;
      }
      if (fromdata.select_block == "GB" && !fromdata.year) {
        alert("Please select a block_no for BB block");
        return;
      }

      const checkquery = query(
        collection(db, "Warden_details"),
        where("userid", "==", fromdata.set_id)
      );

      const getdoc = await getDocs(checkquery);
      if (!getdoc.empty) {
        Alert.alert(
          "Warning",
          "This registration number is already assigned a room."
        );
        setloading(false);
        reset();
        return;
      } else {
        await addDoc(collection(db, "Warden_details"), {
          fromdata,
        });
        reset();
        Alert.alert("Sucessfully!!!", "Sucessfully data inserted");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const handlechange = (field, value) => {
    setfromdata((prev) => ({
      ...prev, //storing the from data into formstate
      [field]: value,
    }));
  };
  return (
    <ScrollView style={tw`bg-white`}>
      <View>
        <View
          style={[
            tw`bg-purple-500 h-16 flex flex-row justify-around`,
            {
              borderBottomLeftRadius: 30,
              borderBottomEndRadius: 30,
            },
          ]}
        >
          <Ionicons
            name="arrow-back"
            color={"white"}
            size={35}
            onPress={() => {
              navigation.goBack();
            }}
            style={tw`mt-5`}
          />
          <Text style={tw`text-white font-black w-2/3 mt-5 text-2xl`}>
            REGISTRATION
          </Text>
        </View>

        <View style={tw`flex justify-center flex-col p-6`}>
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Enter Name
          </Text>
          <TextInput
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter Name"
            value={fromdata.name}
            required
            onChangeText={(value) => {
              handlechange("name", value);
            }}
          />
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Select Block
          </Text>
          <View
            style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
          >
            <Picker
              onValueChange={(value) => {
                handlechange("select_block", value);
              }}
              selectedValue={fromdata.select_block}
            >
              <Picker.Item label="Select Block" />
              <Picker.Item label="GB" value="GB" />
              <Picker.Item label="BB" value="BB" />
            </Picker>
          </View>
          {fromdata.select_block === "BB" ? (
            <View>
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Block No
              </Text>
              <TextInput
                onChangeText={(value) => {
                  handlechange("block_no", value);
                }}
                keyboardType="number-pad"
                value={fromdata.block_no}
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter Block No"
              />
            </View>
          ) : (
            <View>
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                YEAR
              </Text>
              <View
                style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
              >
                <Picker
                  onValueChange={(value) => {
                    handlechange("year", value);
                  }}
                  selectedValue={fromdata.year}
                >
                  <Picker.Item label="Select Year" />
                  <Picker.Item label="1st Year" value="1" />
                  <Picker.Item label="2nd Year" value="2" />
                  <Picker.Item label="3rd Year" value="3" />
                  <Picker.Item label="4th Year" value="4" />
                </Picker>
              </View>
            </View>
          )}

          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Set I'D
          </Text>
          <TextInput
            onChangeText={(value) => {
              handlechange("set_id", value);
            }}
            value={fromdata.set_id}
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter I'd"
          />
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Set Pass
          </Text>
          <TextInput
            onChangeText={(value) => {
              handlechange("set_pass", value);
            }}
            value={fromdata.set_pass}
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter Pass"
          />
          <TouchableOpacity
            onPress={validateform}
            style={tw`mt-4 bg-purple-500 w-64 h-12 rounded-2xl items-center justify-center ml-6`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={tw`text-white text-lg font-black`}>SUBMIT</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Addwarden;
