import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Showrooms = () => {
  const [name, setname] = useState("");
  const [year, setyear] = useState("");
  const [data, setdata] = useState([]);
  const [nameofblock, setblockname] = useState("");
  const [roomid, setroomid] = useState("");
  const [loading, setloading] = useState(true);
  const navigation = useNavigation();

  const fetchdata = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      const years = await AsyncStorage.getItem("year");
      const block = await AsyncStorage.getItem("block");
      const block_no = await AsyncStorage.getItem("block-no");
      // setname(name);
      if (block == "GB") {
        setblockname("GIRLS BLOCK");
        setroomid(`ROOM ID'S OF ${years} YEAR STUDENTS`);
        setyear(String(years));
        const fetcharray = [];
        const uniqueroomid = new Set(); //used for only unique roomid

        const nameQuery = query(
          collection(db, "users"),
          where("year", "==", String(years)), //this is iam used for filter out only warden year students details
          where("block", "==", String(block))
        );
        const doc = await getDocs(nameQuery);
        doc.forEach((document) => {
          const roomdata = document.data();
          if (!uniqueroomid.has(roomdata.roomid)) {
            //check the roomid already exists or not
            uniqueroomid.add(roomdata.roomid);
            fetcharray.push(roomdata);
          }
        });
        setdata(fetcharray);
      } else {
        //for boys block
        setblockname("BOYS BLOCK");
        // const blockno = block.split("-")[1];
        setroomid(`ROOM ID'S OF BLOCK-${block_no} STUDENTS`);
        const fetcharray = [];
        const uniqueroomid = new Set();
        const nameQuery = query(
          collection(db, "users"),
          where("block", "==", String(block)),
          where("block_no", "==", String(block_no)) //boys block fetch based on block-no wise
        );
        const doc = await getDocs(nameQuery);
        doc.forEach((document) => {
          const roomdata = document.data();
          if (!uniqueroomid.has(roomdata.roomid)) {
            uniqueroomid.add(roomdata.roomid);
            fetcharray.push(roomdata);
          }
        });
        setdata(fetcharray);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <View style={tw`bg-white h-full`}>
        <View style={tw`bg-purple-500 h-16 flex flex-row `}>
          <TouchableOpacity style={tw`mt-6 ml-2`}>
            <Ionicons
              name="arrow-back"
              size={32}
              onPress={() => {
                navigation.goBack();
              }}
              color={"white"}
            />
          </TouchableOpacity>
          <Text
            style={tw`text-white text-xl  w-72 text-center  mt-6 font-black`}
          >
            {nameofblock}
          </Text>
        </View>
        <View style={tw`mt-4  text-center`}>
          <Text style={tw` text-center font-black  text-purple-400`}>
            {roomid}
          </Text>
        </View>

        {loading ? (
          <View style={tw`flex-1 justify-center items-center bg-white`}>
            <ActivityIndicator color="purple" size="large" />
            <Text style={tw`text-purple-500 mt-4 font-bold`}>Loading...</Text>
          </View>
        ) : (
          <ScrollView style={tw`p-12`}>
            {data.length > 0 ? (
              <View>
                {data.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`bg-purple-400 mt-2 h-12 rounded-xl `}
                    onPress={() => {
                      navigation.navigate("Attendence", {
                        roomid: item.roomid,
                      });
                    }}
                  >
                    <Text
                      style={tw`text-white text-center font-black text-2xl mt-2`}
                    >
                      {item.roomid}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={tw`text-xl text-purple-400 font-black  ml-5`}>
                No Room Are Available{" "}
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
};
export default Showrooms;
