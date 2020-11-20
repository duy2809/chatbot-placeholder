/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  Day,
  MessageImage,
} from "react-native-gifted-chat";

export const renderBubble = (props) => {
  // const { currentMessage } = props;
  // const { image } = currentMessage;
  // console.log(image);
  // if (!image)
  return (
    <Bubble
      {...props}
      containerStyle={{
        left: { marginLeft: 5 },
        right: { marginRight: 5 },
      }}
      renderTime={() => <View></View>}
      wrapperStyle={{
        left: {
          // borderColor: "#F4F1DE",
          // borderWidth: 4.5,
          // borderRadius: 15,
          borderBottomLeftRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          backgroundColor: "#F4F1DE",
        },
        right: {
          backgroundColor: "#1B4332",
          // borderColor: "#1B4332",
          // borderWidth: 4.6,
          borderBottomRightRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      }}
    />
  );
  // else
  //   return (
  //     <ScrollView
  //       style={{
  //         backgroundColor: "white",
  //         height: 200,
  //       }}
  //       horizontal={true}
  //     >
  //       <Text>
  //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  //         minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  //         aliquip ex ea commodo consequat. Duis aute irure dolor in
  //         reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  //         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  //         culpa qui officia deserunt mollit anim id est laborum.
  //       </Text>
  //     </ScrollView>
  //   );
};

export const renderMessageText = (props) => (
  <MessageText
    {...props}
    textStyle={{
      left: { color: "#1B4332", padding: 4 },
      right: { color: "#F4F1DE", padding: 4 },
    }}
    customTextStyle={{
      fontSize: 17,
      // lineHeight: 20,
      fontFamily: "Quicksand-Medium",
    }}
  />
);

export const renderDay = (props) => (
  <Day
    {...props}
    // containerStyle={{
    //   borderBottomWidth: 2,
    //   borderColor: "#9D0208",
    //   borderStyle: "dashed",
    //   // width: "70%",
    //   alignItems: "center",
    //   borderRadius: 1,
    // }}
    // wrapperStyle={{
    //   borderBottomWidth: 1,
    //   // borderTopColor: "black",
    //   borderColor: "#9D0208",
    //   borderStyle: "dashed",
    //   width: "60%",
    //   alignItems: "center",
    //   borderRadius: 1,
    //   paddingBottom: 5,
    // }}
    textStyle={{
      fontSize: 14,
      fontFamily: "Quicksand-Light",
      color: "black",
    }}
  />
);
