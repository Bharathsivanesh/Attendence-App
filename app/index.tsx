import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./splash";
// import Login from "./login";
import Home from "./home";
import Settime from "./settime";
import card2 from "./card2";
import adddetails from "./adddetails";
import Showrooms from "./showrooms";
import Attendence from "./attendence";
import Editdetails from "./editdetails";
import card3 from "./card3";
import LoginScreen from "./login";
import AdminLogin from "./adminlogin";
import Adminpage from "./adminpage";
import Addwarden from "./addwarden";
import Editwarden from "./editwarden";
import 'react-native-url-polyfill/auto';
import 'abortcontroller-polyfill';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="settime"
          component={Settime}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="card2"
          component={card2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="adddetails"
          component={adddetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Showrooms"
          component={Showrooms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Attendence"
          component={Attendence}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editdetails"
          component={Editdetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="card3"
          component={card3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="adminlogin"
          component={AdminLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="adminpage"
          component={Adminpage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addwarden"
          component={Addwarden}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="editwarden"
          component={Editwarden}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
