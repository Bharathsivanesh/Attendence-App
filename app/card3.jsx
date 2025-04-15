import React from "react";
import {
  TouchableOpacity,
  Button,
  Alert,
  View,
  Text,
  Image,
} from "react-native";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as MailComposer from "expo-mail-composer";

import * as Sharing from "expo-sharing";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { db } from "./firebase";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Card3 = () => {
  const fetchattendence = async () => {
    try {
      const attendencecollection = collection(db, "Attendence");
      const getdocument = await getDocs(attendencecollection);
      const resultattendence = [];
      getdocument.forEach((document) => {
        const result = document.data();
        resultattendence.push(result);
      });
      exportToExcel(resultattendence, "Attendencedata");
      console.log(resultattendence);
    } catch (error) {
      console.log(error + "from fetching attenedetails");
    }
  };

  const sendadminmail = async () => {
    const year = await AsyncStorage.getItem("year");
    const block = await AsyncStorage.getItem("block");
    if (block == "GB") {
      const q = query(
        collection(db, "Attendence"),
        where("year", "==", year),
        where("block", "==", block)
      );
      const res = await getDocs(q);
      const documents = res.docs.map((docs) => docs.data());

      sendmail(documents, res); //passing xcell data and deleted data(res)
    } else {
      try {
        const q = query(
          collection(db, "Attendence"),
          where("block", "==", block)
        );
        const res = await getDocs(q);
        const documents = res.docs.map((docs) => docs.data());
        sendmail(documents, res);
        console.log(res.size);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const sendmail = async (documents, res) => {
    const ws = XLSX.utils.json_to_sheet(documents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    const wbout = XLSX.write(wb, {
      type: "base64",
      bookType: "xlsx",
    });

    const fileUri = FileSystem.cacheDirectory + "Attendance.xlsx";
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      console.error("MailComposer is not available on this device.");
      return;
    }

    console.log(`Excel file generated at: ${fileUri}`);
    await MailComposer.composeAsync({
      recipients: ["bharathsivanesh@gmail.com"],
      subject: "Attendance Report",
      body: "Dear Admin,\n\nHere is the attendance report for today\n\nRegards,\nHostel warden",
      attachments: [fileUri],
    });
    const del = res.docs.map(
      (
        docs //delet that documents after sended mail
      ) => deleteDoc(doc(db, "Attendence", docs.id))
    );
    console.log("Email sent successfully.");
  };

  const fetchstudentsdata = async () => {
    try {
      const studentcollection = collection(db, "users");
      const getdocument = await getDocs(studentcollection);
      const studentresult = [];
      getdocument.forEach((document) => {
        const result = document.data();
        studentresult.push(result);
      });
      exportToExcel(studentresult, "Students_Data");
    } catch (error) {
      console.log(error + "from fecting student data");
    }
  };

  const exportToExcel = async (data, name) => {
    try {
      const ws = XLSX.utils.json_to_sheet(data);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, name);

      const wbout = XLSX.write(wb, {
        type: "base64",
        bookType: "xlsx",
      });

      const fileUri = FileSystem.cacheDirectory + `${name}.xlsx`;
      console.log(`File will be saved at: ${fileUri}`);

      await FileSystem.writeAsStringAsync(fileUri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert("Success", "File has been created successfully!");

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", //if conditions for sharing purpose
          dialogTitle: "Share Excel File",
          UTI: "com.microsoft.excel.xlsx",
        });
      } else {
        Alert.alert("Info", "Sharing is not available on this device.");
      }
    } catch (error) {
      console.error("Error exporting Excel file:", error);
      Alert.alert("Error", "Failed to create or share the Excel file.");
    }
  };
  const navigation = useNavigation();
  return (
    <>
      <View style={tw`bg-purple-400 h-14 flex flex-row  `}>
        <Ionicons
          name="arrow-back"
          color="white"
          size={35}
          style={tw`mt-3 ml-3 `}
          onPress={() => {
            navigation.navigate("home");
          }}
        />
        <Text style={tw`text-center ml-20 text-white font-black mt-3 text-lg`}>
          Export Data
        </Text>
      </View>

      <View style={tw`flex flex-col mt-8 w-full justify-center  p-3`}>
        <TouchableOpacity
          style={tw`bg-white rounded-lg p-5 shadow-lg mb-5`}
          onPress={() => {
            fetchstudentsdata();
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
              style={tw`w-16 h-16 rounded-full`}
            />

            <View style={tw`flex flex-col ml-4 flex-1`}>
              <Text style={tw`text-lg font-bold italic text-gray-800`}>
                Export Student Details
              </Text>
              <Text style={tw`text-sm text-gray-600 mt-1`}>
                Download detailed student records as an Excel file.
              </Text>
            </View>

            <Ionicons
              name="arrow-forward-circle"
              size={35}
              color="green"
              style={tw`ml-2`}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-white rounded-lg p-5 shadow-lg mb-5`}
          onPress={() => {
            fetchattendence();
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/1432/1432527.png",
              }}
              style={tw`w-16 h-16 rounded-full`}
            />

            <View style={tw`flex flex-col ml-4 flex-1`}>
              <Text style={tw`text-lg font-bold italic text-gray-800`}>
                Export Attendence Details
              </Text>
              <Text style={tw`text-sm text-gray-600 mt-1`}>
                Download Attendence student records as an Excel file.
              </Text>
            </View>

            <Ionicons
              name="arrow-forward-circle"
              size={35}
              color="green"
              style={tw`ml-2`}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-white rounded-lg p-5 shadow-lg mb-5`}
          onPress={() => {
            sendadminmail();
          }}
        >
          <View style={tw`flex flex-row items-center`}>
            <Image
              source={require("../assets/images/outgoing-mail.png")}
              style={tw`w-16 h-16 rounded-lg`}
            />

            <View style={tw`flex flex-col ml-6 flex-1`}>
              <Text style={tw`text-lg font-bold italic text-gray-800`}>
                Export Today's Attendance Details
              </Text>
              <Text style={tw`text-sm text-gray-600 mt-1`}>
                Automatically email the attendance report to the Admin
              </Text>
            </View>

            <Ionicons
              name="arrow-forward-circle"
              size={35}
              color="green"
              style={tw`ml-2`}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Card3;
