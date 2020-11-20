/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Image } from "react-native";
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
} from "react-native-gifted-chat";

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: "#9D0208",
      paddingVertical: 10,
    }}
    primaryStyle={{ alignItems: "center" }}
  />
);

export const renderActions = (props) => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <Image
        style={{ width: 32, height: 32 }}
        source={require("../assets/icon_select_picture.png")}
      />
    )}
    options={{
      "Choose From Library": () => {
        console.log("Choose From Library");
      },
      Cancel: () => {
        console.log("Cancel");
      },
    }}
    optionTintColor="#222B45"
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: "black",
      backgroundColor: "#F4F1DE",
      //   borderWidth: 1,
      borderRadius: 15,
      //   borderColor: "#F4F1DE",
      paddingTop: 2,
      paddingHorizontal: 12,
      marginLeft: 0,
      fontSize: 17,
      fontFamily: "Quicksand-Medium",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    }}
    placeholderTextColor="gray"
    // composerHeight={100}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    }}
  >
    <Image
      style={{ width: 32, height: 32 }}
      source={require("../assets/icon_send.png")}
    />
  </Send>
);
