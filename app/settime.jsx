import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

const Settime = () => {
  const navigation = useNavigation();
  const back = () => {
    navigation.navigate("home");
  };
  const [time, settime] = useState("");
  const [date, setdate] = useState("");
  const [calender, setcalender] = useState(false);
  const validatetime = () => {
    const currenttime = new Date();
    const formatetime = currenttime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    settime(formatetime);
  };
  const validdate = () => {
    setcalender(true);
  };
  const handledate = (event, date) => {
    //event is for two parameter passed by Datatimepicker
    setcalender(false);
    if (date) {
      setdate(date.toLocaleDateString());
    }
  };
  return (
    <ScrollView style={tw`bg-white h-full`}>
      <View>
        <View
          style={[
            tw`bg-purple-400 flex flex-row h-20`,
            {
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              // borderBottomLeftRadius: 20,
            },
          ]}
        >
          <TouchableOpacity style={tw`mt-8 ml-4`}>
            <Ionicons
              name="arrow-back"
              size={35}
              color={"white"}
              onPress={back}
            />
          </TouchableOpacity>
          <Text
            style={tw`w-72 text-center mt-8  text-2xl text-white font-black`}
          >
            Check-in Details
          </Text>
        </View>

        <View style={tw`flex flex-row  justify-evenly mt-20`}>
          <View>
            <TouchableOpacity onPress={validdate}>
              <Image
                source={require("../assets/images/date.png")}
                style={tw`h-32 w-32`}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={validatetime}>
              <Image
                source={require("../assets/images/time.png")}
                style={tw`h-32 w-32`}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex flex-row justify-evenly mt-5`}>
          <TextInput
            placeholder="Date"
            style={tw`border-purple-400 border-b-2 text-center font-bold py-0  w-24`}
            value={date}
          />
          <TextInput
            placeholder="Time"
            style={tw`border-purple-400 text-center font-bold border-b-2 py-0 w-24`}
            value={time}
          />
        </View>
        <View style={tw`h-full flex flex-col items-center mt-20`}>
          <View>
            <Text style={tw`text-purple-400 text-2xl font-bold`}>
              Enter Room I'D
            </Text>
          </View>
          <View>
            <TextInput style={tw`border-purple-400 border-2 w-56 px-2 mt-5`} />
          </View>
          <View style={tw`mt-10 bg-purple-400 px-10 py-2 rounded-md`}>
            <TouchableOpacity>
              <Text style={tw`text-white font-black`}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {calender && (
        <DateTimePicker value={new Date()} mode="date" onChange={handledate} />
      )}
    </ScrollView>
  );
};

export default Settime;
