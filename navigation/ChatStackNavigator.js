import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/HomeScreen";
import ChatScreen from "../screen/ChatScreen";
import LoginComponent from "../components/LoginComponent";
import SignUpComponent from "../components/SignUpComponent";
import SwiperComponent from "../components/SwiperComponent";

const Stack = createStackNavigator();

export default function ChatStackNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Swiper" component={SwiperComponent} />
      <Stack.Screen name="Login" component={LoginComponent} />
      <Stack.Screen name="SignUp" component={SignUpComponent} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
