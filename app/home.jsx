import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { db } from "./firebase";
import {
  collection,
  DocumentSnapshot,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();

  const loginpage = () => {
    navigation.navigate("Login");
  };
  const setdata = async (navigate) => {
    const block = await AsyncStorage.getItem("block");
    const year = await AsyncStorage.getItem("year");
    if (navigate == "Showrooms") { //while enter into take attendence check whether  exported yesterday attendece data
      const now = new Date();
      const yesterdate = new Date();
      yesterdate.setDate(now.getDate());
      const formateyesterdate = `${yesterdate.getFullYear()}-${String(
        yesterdate.getMonth() + 1
      ).padStart(2, "0")}-${String(yesterdate.getDate()).padStart(2, "0")}`; //must use leading zeros for comparison

      try {
        if (block == "GB") {
          //for girls block (extrs year is added in where cond)
          const q = query(
            collection(db, "Attendence"),
            where("block", "==", block),
            where("year", "==", year),
            where("date", "<", formateyesterdate)
          );
          const res = await getDocs(q);
          if (res.size >= 1) {
            alert("Export The Yester Details First");
          } else {
            navigation.navigate(navigate);
          }
        } else {
          const q = query(
            //for boys block
            collection(db, "Attendence"),
            where("block", "==", block),
            where("date", "<", formateyesterdate)
          );
          const res = await getDocs(q);
          if (res.size >= 1) { 
            alert("Export The Yesterday Details First");
          } else {
            navigation.navigate(navigate);
          }
        }
      } catch (error) {
        console.log(error);
        alert("Erro from checking date details");
      }
    } else {
      navigation.navigate(navigate);
    }
  };

  const cards = [
    {
      icon: "calendar-number-outline",
      title: "Take Attendance",
      navigate: "Showrooms",
      image:
        "https://img.freepik.com/free-vector/appointment-booking-with-calendar_23-2148545993.jpg?uid=R116978355&ga=GA1.1.1166653593.1726808279&semt=ais_hybrid",
    },
    {
      icon: "create-outline",
      title: "Add/Edit Details",
      navigate: "card2",
      image:
        "https://img.freepik.com/free-vector/storyboard-illustration-concept_52683-48783.jpg?uid=R116978355&ga=GA1.1.1166653593.1726808279&semt=ais_hybrid",
    },
    {
      icon: "download-outline",
      title: "Export Details",
      navigate: "card3",
      image:
        "https://img.freepik.com/free-vector/transfer-files-concept-landing-page_23-2148322666.jpg?uid=R116978355&ga=GA1.1.1166653593.1726808279&semt=ais_hybrid",
    },
  ];

  return (
    <>
      <View style={tw`h-full bg-purple-400`}>
        <View
          style={[
            tw` w-full bg-purple-400   flex flex-row justify-start items-center px-4 py-2`,
            {
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
            },
          ]}
        >
          <TouchableOpacity onPress={loginpage} style={tw`mt-10`}>
            <Ionicons name="arrow-back" size={32} color={"white"} />
          </TouchableOpacity>

          <Text
            style={tw`text-3xl font-bold  mt-10 font-black text-white flex items-center justify-center text-center  w-72 italic`}
          >
            Welcome
          </Text>
        </View>

        <ScrollView style={tw`bg-purple-400`}>
          <View style={tw`flex flex-col items-center   `}>
            {cards.map((card, index) => (
              <TouchableOpacity
                style={tw``}
                key={index}
                onPress={() => setdata(card.navigate)}
              >
                <View
                  style={tw`h-40 w-72 mt-10 rounded-2xl overflow-hidden shadow-md `}
                >
                  <ImageBackground
                    style={tw`w-full h-full`}
                    source={{
                      uri: card.image,
                    }}
                  >
                    <View
                      style={tw`h-full w-full   bg-purple-500 bg-opacity-50  flex flex-row justify-start items-center p-10`}
                    >
                      <Ionicons
                        name={card.icon}
                        size={50}
                        color={"white"}
                      ></Ionicons>
                      <Text style={tw`ml-2  text-xl font-black text-white`}>
                        {card.title}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
