import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "expo-router";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { db } from "./firebase";

const Adddetails = () => {
  const navigation = useNavigation();

  const back = () => {
    navigation.goBack();
  };
  const [roomid, setroomid] = useState("");
  const [name, setname] = useState("");
  const [reg, setreg] = useState("");
  const [year, setyear] = useState("");
  const [dept, setdept] = useState("");
  const [st_phone, st_setphone] = useState("");
  const [section, setsection] = useState("");
  const [parentno, setparentno] = useState("");
  const [block, setblock] = useState("");
  const [block_no, setblock_no] = useState("");
  const [loading, setloading] = useState(false);
  const [checknumber, setchecknumber] = useState(false);
  const reset = () => {
    setroomid("");
    setname("");
    setreg("");
    setyear("");
    setdept("");
    st_setphone("");
    setparentno("");
    setsection("");
    setblock("");
    setblock_no("");
  };
  const handlePhoneChange = (role) => (text) => {
    const validatedText = text.replace(/[^0-9]/g, "").slice(0, 10);
    if (role == "student") {
      st_setphone(validatedText);
    } else {
      setparentno(validatedText);
    }
  };

  const Formvalid = async () => {
    if (
      !roomid ||
      !name ||
      !reg ||
      !year ||
      !dept ||
      !st_phone ||
      !parentno ||
      !section ||
      !block ||
      !block_no ||
      st_phone.length !== 10 ||
      parentno.length !== 10
    ) {
      Alert.alert("Warning", "Please fill all required fields");
      return;
    }
    try {
      setloading(true);
      const checkreg = query(collection(db, "users"), where("reg", "==", reg));
      const getdoc = await getDocs(checkreg);
      if (!getdoc.empty) {
        Alert.alert(
          "Warning",
          "This registration number is already assigned a room."
        );
        setloading(false);
        reset();
        return;
      }

      await addDoc(collection(db, "users"), {
        roomid: roomid,
        name: name,
        reg: reg, //user data adding into db
        year: year,
        dept: dept,
        student_mobile: st_phone,
        block_no: block_no,
        parentno: parentno,
        section: section,
        block: block,
      });
      reset();
      Alert.alert("Sucessfully!!!", "Sucessfully data inserted");
    } catch (error) {
      Alert.alert("Warning", "Invalid to Store the Data", error);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <ScrollView style={tw`bg-white`}>
      <View>
        <View
          style={[
            tw`bg-purple-500 h-20 flex flex-row justify-around`,
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
            onPress={back}
            style={tw`mt-8`}
          />
          <Text style={tw`text-white font-black w-2/3 mt-8 text-2xl`}>
            REGISTRATION
          </Text>
        </View>

        <View style={tw`flex justify-center flex-col p-6`}>
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Room ID
          </Text>
          <TextInput
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter Student Room ID"
            value={roomid}
            onChangeText={setroomid}
            required
          />
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Name
          </Text>
          <TextInput
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter Student Name"
            onChangeText={setname}
            value={name}
          />
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Reg No
          </Text>
          <TextInput
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter Student Reg No"
            onChangeText={setreg}
            value={reg}
            keyboardType="number-pad"
          />
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            YEAR
          </Text>
          <View
            style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
          >
            <Picker
              selectedValue={year}
              onValueChange={(data) => {
                setyear(data);
              }}
            >
              <Picker.Item label="Select Year" />
              <Picker.Item label="1st Year" value="1" />
              <Picker.Item label="2nd Year" value="2" />
              <Picker.Item label="3rd Year" value="3" />
              <Picker.Item label="4th Year" value="4" />
            </Picker>
          </View>
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Block
          </Text>
          <View
            style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
          >
            <Picker
              selectedValue={block}
              onValueChange={(data) => {
                setblock(data);
              }}
            >
              <Picker.Item label="Select Block" />
              <Picker.Item label="GB" value="GB" />
              <Picker.Item label="BB" value="BB" />
            </Picker>
          </View>
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Block No
          </Text>
          <TextInput
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter Block No"
            onChangeText={setblock_no}
            value={block_no}
            keyboardType="number-pad"
          />

          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Section
          </Text>
          <View
            style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
          >
            <Picker
              selectedValue={section}
              onValueChange={(data) => {
                setsection(data);
              }}
            >
              <Picker.Item label="Select Section" />
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="C" value="C" />
              <Picker.Item label="D" value="D" />
            </Picker>
          </View>
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Department
          </Text>
          <View
            style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
          >
            <Picker
              selectedValue={dept}
              onValueChange={(data) => {
                setdept(data);
              }}
            >
              <Picker.Item label="Select Dept" />
              <Picker.Item label="CSE" value="CSE" />
              <Picker.Item label="ECE" value="ECE" />
              <Picker.Item label="EEE" value="EEE" />
              <Picker.Item label="IT" value="IT" />
            </Picker>
          </View>
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Student No
          </Text>
          <TextInput
            keyboardType="phone-pad"
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter Student Number"
            value={st_phone}
            onChangeText={handlePhoneChange("student")}
          />
          {st_phone.length < 10 && (
            <Text style={tw`text-red-500 text-sm`}>
              Please enter exactly 10 digits.
            </Text>
          )}
          <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
            Parent No
          </Text>
          <TextInput
            keyboardType="phone-pad"
            style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
            placeholder="Enter parent Number"
            value={parentno}
            onChangeText={handlePhoneChange("parent")}
          />
          {parentno.length < 10 && (
            <Text style={tw`text-red-500 text-sm`}>
              Please enter exactly 10 digits.
            </Text>
          )}
          <TouchableOpacity
            style={tw`mt-4 bg-purple-500 w-64 h-12 rounded-2xl items-center justify-center ml-6`}
            onPress={Formvalid}
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

export default Adddetails;
