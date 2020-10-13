import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ChatStackNavigator from "./ChatStackNavigator";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <ChatStackNavigator />
    </NavigationContainer>
  );
}
