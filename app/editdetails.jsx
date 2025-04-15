import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

const Editdetails = () => {
  const navigation = useNavigation();
  const [regNumber, setRegNumber] = useState("");
  const [loading, setloading] = useState("");
  const [studentData, setStudentData] = useState({
    roomid: "",
    name: "",
    reg: "",
    year: "",
    dept: "",
    phone: "",
    parentno: "",
    section: "",
    block: "",
    block_no: "",
  });

  const fetchStudentData = async () => {
    setloading(true);
    try {
      const fetch = query(
        collection(db, "users"),
        where("reg", "==", regNumber)
      );
      const docdata = await getDocs(fetch);
      if (docdata.empty) {
        alert("No Such Students Found!");
        setRegNumber("");
      } else {
        const document = docdata.docs[0];

        setStudentData(document.data());
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setloading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      !studentData.roomid ||
      !studentData.name ||
      !studentData.year ||
      !studentData.dept ||
      !studentData.phone ||
      !studentData.parentno ||
      !studentData.section ||
      !studentData.block ||
      !studentData.block_no
    ) {
      alert("No data to update");

      return;
    }
    setloading(true);
    try {
      const fetch = query(
        collection(db, "users"),
        where("reg", "==", regNumber)
      );
      const queryshot = await getDocs(fetch);
      const studoc = queryshot.docs[0];
      const refid = doc(db, "users", studoc.id);
      await updateDoc(refid, studentData);
      alert("Student details updated successfully!");
      setStudentData({
        roomid: "",
        name: "",
        reg: "",
        year: "",
        dept: "",
        phone: "",
        parentno: "",
        section: "",
        block: "",
        block_no: "",
      });
      setRegNumber("");
    } catch (error) {
      console.error("Error updating student data:", error);
    }
    setloading(false);
  };
  const deletedata = async () => {
    setloading(true);
    try {
      const fetch = query(
        collection(db, "users"),
        where("reg", "==", regNumber)
      );
      const queryshot = await getDocs(fetch);
      if (queryshot.empty) {
        alert("No Valid Register Number Found");
        setRegNumber("");
      } else {
        const document = queryshot.docs[0];
        const refid = doc(db, "users", document.id);
        await deleteDoc(refid);
        alert(`Registration number ${regNumber} will be deleted successfully!`);
        setRegNumber("");
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <View style={tw`h-16 bg-purple-500 flex flex-row`}>
              <Ionicons
                style={tw`mt-5`}
                name="arrow-back"
                color={"white"}
                size={35}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <Text style={tw`text-white font-black text-xl ml-8 mt-6`}>
                Edit Details Of Students
              </Text>
            </View>
            <View style={tw`p-4`}>
              <Text style={tw`text-purple-400 text-2xl italic font-bold ml-16`}>
                Enter Student I'D
              </Text>
              <TextInput
                placeholder="Enter I'D"
                value={regNumber}
                onChangeText={setRegNumber}
                style={tw`border border-purple-400 p-3 w-72 rounded-lg mt-4 ml-4`}
              />
              <View style={tw`flex flex-row`}>
                <TouchableOpacity
                  onPress={fetchStudentData}
                  style={tw`bg-purple-400 w-28 p-2 flex flex-row rounded-xl mt-6 ml-8`}
                >
                  <Text
                    style={tw`text-white font-black text-center text-xl ml-6`}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deletedata}
                  style={tw`bg-purple-400 w-28 p-2 flex  flex-row rounded-xl mt-6 ml-8`}
                >
                  <Text
                    style={tw`text-white font-black text-center text-xl ml-4`}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`flex justify-center flex-col p-6`}>
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Room ID
              </Text>
              <TextInput
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter Student Room ID"
                value={studentData.roomid}
                onChangeText={(text) =>
                  setStudentData({ ...studentData, roomid: text })
                }
              />
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Name
              </Text>
              <TextInput
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter Student Name"
                value={studentData.name}
                onChangeText={(text) =>
                  setStudentData({ ...studentData, name: text })
                }
              />
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Reg No
              </Text>
              <TextInput
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter Student Reg No"
                value={studentData.reg}
                editable={false} // Make this field non-editable
              />
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                YEAR
              </Text>
              <View
                style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
              >
                <Picker
                  selectedValue={studentData.year}
                  onValueChange={(value) =>
                    setStudentData({ ...studentData, year: value })
                  }
                >
                  <Picker.Item label="Select Year" value="" />
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
                  selectedValue={studentData.block}
                  onValueChange={(value) => {
                    setStudentData({ ...studentData, block: value });
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
                value={studentData.block_no}
                onChangeText={(text) =>
                  setStudentData({ ...studentData, block_no: text })
                }
              />

              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Section
              </Text>
              <View
                style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
              >
                <Picker
                  selectedValue={studentData.section}
                  onValueChange={(data) => {
                    setStudentData({ ...studentData, section: data });
                  }}
                >
                  <Picker.Item label="Select Section" />
                  <Picker.Item label="A" value="A" />
                  <Picker.Item label="B" value="B" />
                  <Picker.Item label="C" value="C" />
                </Picker>
              </View>
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Department
              </Text>
              <View
                style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
              >
                <Picker
                  selectedValue={studentData.dept}
                  onValueChange={(value) =>
                    setStudentData({ ...studentData, dept: value })
                  }
                >
                  <Picker.Item label="Select Dept" value="" />
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
                value={studentData.phone}
                onChangeText={(text) =>
                  setStudentData({ ...studentData, phone: text })
                }
              />
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Parent No
              </Text>
              <TextInput
                keyboardType="phone-pad"
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter Parent Number"
                value={studentData.parentno}
                onChangeText={(text) =>
                  setStudentData({ ...studentData, parentno: text })
                }
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={tw`mt-4 bg-purple-500 w-64 h-12 rounded-2xl items-center justify-center ml-6`}
              >
                <Text style={tw`text-white text-lg font-black`}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {loading && (
          <View
            style={[
              tw`absolute inset-0 justify-center items-center`,
              { backgroundColor: "rgba(0, 0, 0, 0.3)" },
            ]}
          >
            <ActivityIndicator color="white" size="large" />
          </View>
        )}
      </View>
    </>
  );
};
export default Editdetails;
