import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const Card2 = () => {
  const navigation = useNavigation();
  const back = () => {
    navigation.navigate("home");
  };
  const cards = [
    {
      image: require("../assets/images/adddetails.png"),
      title: "Add Detail's",
      navigatepage: "adddetails",
    },
    {
      image: require("../assets/images/edit.png"),
      title: "Edit Detail's",
      navigatepage: "Editdetails",
    },
  ];
  const nextpage = (page) => {
    navigation.navigate(page);
  };
  return (
    <>
      <View>
        <View style={tw`w-full bg-purple-500 h-16 flex items-center flex-row `}>
          <Ionicons
            name="arrow-back"
            color={"white"}
            size={35}
            style={tw`w-32 ml-4 font-black`}
            onPress={back}
          />
          <Text style={tw`font-black text-white text-2xl`}>Detail's</Text>
        </View>

        <View style={tw`flex flex-col items-center mt-14 `}>
          {cards.map((data, index) => (
            <TouchableOpacity
              style={tw`w-72 `}
              key={index}
              onPress={() => {
                nextpage(data.navigatepage);
              }}
            >
              <View style={tw`rounded-lg   bg-purple-400 mb-14`}>
                <Image source={data.image} style={tw`w-full h-40`} />
                <Text
                  style={tw` font-black text-white text-xl mt-3  text-center`}
                >
                  {data.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </>
  );
};
export default Card2;
