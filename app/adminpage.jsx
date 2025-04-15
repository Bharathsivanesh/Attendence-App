import { useNavigation } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
const Adminpage = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={tw`bg-white h-full w-full`}>
        <View style={tw`flex flex-row p-1 bg-purple-400 justify-around `}>
          <Text style={tw`font-black text-xl mt-4 text-white`}>
            Welcome - Admin !!!
          </Text>
          <Image
            source={require("../assets/images/adminlogin.png")}
            style={tw`w-12 h-12 justify-around`}
          />
        </View>
        <View style={tw`flex flex-col justify-center items-center  mt-14`}>
          <View style={tw` w-72  h-52  rounded-2xl  overflow-hidden`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("addwarden");
              }}
              style={tw`rounded-2xl`}
            >
              <ImageBackground
                source={require("../assets/images/adminadd.png")}
                style={tw`w-full  h-full `}
              >
                <View
                  style={tw`bg-purple-500 flex  items-center justify-center bg-opacity-50 h-full`}
                >
                  <Text style={tw`text-white font-black text-xl`}>
                    Add Credentials
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={tw` w-72  h-52 mt-8 rounded-2xl overflow-hidden`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("editwarden");
              }}
            >
              <ImageBackground
                source={require("../assets/images/image.png")}
                style={tw`w-full h-full`}
              >
                <View
                  style={tw`bg-purple-500 flex items-center justify-center bg-opacity-50 h-full`}
                >
                  <Text style={tw`text-white font-black text-xl`}>
                    Edit Credentials
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default Adminpage;
