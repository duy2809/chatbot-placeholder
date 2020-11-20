import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screen/WelcomeScreen";
import IntroScreen from "../screen/IntroScreen";
import SignupScreen from "../screen/SignupScreen";
import SuccessScreen from "../screen/SuccessScreen";
import CustomerFormScreen from "../screen/CustomerFormScreen";
import FormCompleteScreen from "../screen/FormCompleteScreen";
import TestChatScreen from "../custom/Chats";
import ChatScreen from "../screen/ChatScreen";
import { NavigationHelpersContext } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function ChatStackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomerForm"
        component={CustomerFormScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormComplete"
        component={FormCompleteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TestChat"
        component={TestChatScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#9D0208",
          },
          headerTitle: (props) => (
            <View style={styles.container}>
              <Image
                source={require("../assets/pho_talk.png")}
                style={styles.logo}
              />
            </View>
          ),
          headerLeft: null,
          // headerRight: (props) => (
          //   <TouchableOpacity
          //     style={{
          //       // borderColor: "black",
          //       // borderWidth: 5,
          //       marginRight: 15,
          //     }}
          //     // onPress={}
          //   >
          //     <Image
          //       source={require("../assets/icon_user.png")}
          //       style={styles.iconUser}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#9D0208",
          },
          headerTitle: (props) => (
            <View style={styles.container}>
              <Image
                source={require("../assets/pho_talk.png")}
                style={styles.logo}
              />
            </View>
          ),
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 5,
    // borderColor: "black",
    alignItems: "center",
    marginLeft: 50,
  },

  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    marginTop: 30,
  },

  iconUser: {
    width: 32,
    height: 32,
  },
});
