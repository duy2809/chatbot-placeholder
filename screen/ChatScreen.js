import React, { useState, useCallback, useEffect } from "react";
import { Alert, LogBox, StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "../firebase";

const messagesRef = firebase.database().ref("/messages");
const recordsRef = firebase.database().ref("/records");

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const { username } = route.params;

  const onSend = useCallback((messages = []) => {
    let message_user = messages[0];
    messagesRef.push(JSON.stringify(message_user));
    let text_user = message_user["text"];
    console.log("User: " + text_user);
    fetch("https://test-heroku-chatbot.herokuapp.com/predict", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages[0]),
    })
      .then((response) => response.json())
      .then((data) => {
        let text_bot = data["text"];
        console.log("Bot: " + text_bot);
        messagesRef.push(JSON.stringify(data));
        recordsRef.push({
          _user: text_user,
          bot: text_bot,
          time: `${new Date()}`,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    messagesRef.on("value", (snapshot) => {
      var arrMessages = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        arrMessages.unshift(JSON.parse(childData));
      });
      arrMessages.push({
        text: `Chào bạn ${username}, tôi là chatbot tư vấn trong lĩnh vực sức khỏe và dinh dưỡng và tôi được tạo ra bởi nhóm Placeholder. Bạn có thể hỏi bất cứ điều gì bạn đang quan tâm nhé! :>`,
        user: {
          _id: "2",
          name: "Placeholder",
          avatar: "https://image.flaticon.com/icons/png/512/2040/2040946.png",
        },
        _id: 1,
      });
      setMessages(arrMessages);
    });
    return () => {
      messagesRef.off("value");
    };
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
