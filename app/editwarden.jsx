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
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
const Editwarden = () => {
  const navigation = useNavigation();
  const [id, setid] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingedit, setloadingedit] = useState(false);
  const [submitloading, setsubmitloading] = useState(false);
  const [wardendata, setwardendata] = useState({
    name: "",
    year: "",
    block_cat: "",
    block_no: "",
    userid: "",
    password: "",
  });
  const fetchwarden = async () => {
    setloadingedit(true);
    try {
      const fetch = query(
        collection(db, "Warden_details"),
        where("fromdata.set_id", "==", id)
      );
      const docdata = await getDocs(fetch);
      if (docdata.empty) {
        alert("No such a I'D");
        setid("");
      } else {
        const document = docdata.docs[0];
        setwardendata(document.data());
      }
    } catch (error) {
      console.log("Error from fetch warden id", error);
    } finally {
      setloadingedit(false);
    }
  };

  const deletedata = async () => {
    try {
      setloading(true);
      const fetch = query(
        collection(db, "Warden_details"),
        where("userid", "==", id)
      );
      const result = await getDocs(fetch);
      if (result.empty) {
        alert("No valid I'D is Registered!!!");
        reset();
        setid("");
      } else {
        const document = result.docs[0];
        await deleteDoc(doc(db, "Warden_details", document.id));
        alert(`ID ${id} Will be removed Sucessfully!!!`);
        reset();
        setid("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  const handlechange = async () => {
    try {
      if (
        !wardendata.name ||
        !wardendata.year ||
        !wardendata.block_cat ||
        !wardendata.block_no ||
        !wardendata.userid ||
        !wardendata.password
      ) {
        alert("Fill all The fields");

        return;
      }
      setsubmitloading(true);
      const fetch = query(
        collection(db, "Warden_details"),
        where("userid", "==", id)
      );
      const queryshot = await getDocs(fetch);
      const resdoc = queryshot.docs[0];
      const wardendetail = doc(db, "Warden_details", resdoc.id);
      await updateDoc(wardendetail, wardendata);
      alert("Warden details updated successfully!");
      setid("");
      reset();
    } catch (error) {
      console.log("Error from update warden", error);
    } finally {
      setsubmitloading(false);
    }
  };
  const reset = () => {
    setwardendata({
      name: "",
      year: "",
      block_cat: "",
      block_no: "",
      userid: "",
      password: "",
    });
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <View
              style={[
                tw`h-16 bg-purple-500 flex flex-row`,
                {
                  borderBottomLeftRadius: 30,
                  borderBottomEndRadius: 30,
                },
              ]}
            >
              <Ionicons
                style={tw`mt-5 ml-5 `}
                name="arrow-back"
                color={"white"}
                size={35}
                onPress={() => navigation.goBack()}
              />
              <Text style={tw`text-white font-black text-xl ml-8 mt-6`}>
                Edit Details Of Warden
              </Text>
            </View>
            <View style={tw`p-4`}>
              <Text style={tw`text-purple-400 text-2xl italic font-bold ml-16`}>
                Enter Warden I'D
              </Text>
              <TextInput
                placeholder="Enter I'D"
                value={id}
                onChangeText={setid}
                style={tw`border border-purple-400 p-3 w-72 rounded-lg mt-4 ml-4`}
              />
              <View style={tw`flex flex-row`}>
                <TouchableOpacity
                  onPress={fetchwarden}
                  style={tw`bg-purple-400 w-28 p-2 flex flex-row  items-center justify-center rounded-xl mt-6 ml-8`}
                >
                  {loadingedit ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text
                      style={tw`text-white font-black text-center text-xl ml-2`}
                    >
                      Edit
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deletedata}
                  style={tw`bg-purple-400 w-28 p-2 flex  flex-row items-center justify-center rounded-xl mt-6 ml-8`}
                >
                  {loading ? (
                    <ActivityIndicator
                      color={"white"}
                      style={tw`text-center `}
                    />
                  ) : (
                    <Text style={tw`text-white font-black text-center text-xl`}>
                      Delete
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`flex justify-center flex-col p-6`}>
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Enter Name
              </Text>
              <TextInput
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter Name"
                value={wardendata.name}
                onChangeText={(text) => {
                  setwardendata({ ...wardendata, name: text });
                }}
              />

              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Select Block
              </Text>
              <View
                style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
              >
                <Picker
                  selectedValue={wardendata.block_cat}
                  onValueChange={(value) => {
                    setwardendata({ ...wardendata, block_cat: value });
                  }}
                >
                  <Picker.Item label="Select Block" />
                  <Picker.Item label="GB" value="GB" />
                  <Picker.Item label="BB" value="BB" />
                </Picker>
              </View>
              {wardendata.block_cat == "BB" ? (
                <View>
                  <Text
                    style={tw`text-lg font-bold italic mb-2 text-purple-600`}
                  >
                    Block No
                  </Text>
                  <TextInput
                    style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                    placeholder="Enter Block No"
                    keyboardType="phone-pad"
                    value={wardendata.block_no}
                    onChangeText={(text) => {
                      setwardendata({ ...wardendata, block_no: text });
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Text
                    style={tw`text-lg font-bold italic mb-2 text-purple-600`}
                  >
                    YEAR
                  </Text>
                  <View
                    style={tw`border border-purple-400 rounded-xl w-full h-14 mb-4`}
                  >
                    <Picker
                      selectedValue={wardendata.year}
                      onValueChange={(value) => {
                        setwardendata({ ...wardendata, year: value });
                      }}
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
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter I'd"
                value={wardendata.userid}
                editable={false}
                onChangeText={(text) => {
                  setwardendata({ ...wardendata, userid: text });
                }}
              />
              <Text style={tw`text-lg font-bold italic mb-2 text-purple-600`}>
                Set Pass
              </Text>
              <TextInput
                style={tw`border border-purple-400 rounded-xl w-full p-3 mb-4 text-lg`}
                placeholder="Enter Pass"
                value={wardendata.password}
                onChangeText={(text) => {
                  setwardendata({ ...wardendata, password: text });
                }}
              />
              <TouchableOpacity
                onPress={handlechange}
                style={tw`mt-4 bg-purple-500 w-64 h-12 rounded-2xl items-center justify-center ml-6`}
              >
                {submitloading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={tw`text-white text-lg font-black`}>SUBMIT</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default Editwarden;
