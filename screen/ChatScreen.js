import React, { useState, useCallback, useEffect } from "react";
import { Alert, LogBox, StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAHbhO19nd_wSN93fzYyJYwAnmlxhG1-dQ",
  authDomain: "chatbot-placeholder.firebaseapp.com",
  databaseURL: "https://chatbot-placeholder.firebaseio.com",
  projectId: "chatbot-placeholder",
  storageBucket: "chatbot-placeholder.appspot.com",
  messagingSenderId: "281623463894",
  appId: "1:281623463894:web:f4296fe7ce4d649873c677",
};

if (firebase.apps.length === 0) {
  var firebase_init = firebase.initializeApp(firebaseConfig);
  var messagesRef = firebase_init.database().ref("/messages");
  var recordsRef = firebase_init.database().ref("/records");
}

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const { username } = route.params;

  const onSend = useCallback((messages = []) => {
    let message_user = messages[0];
    messagesRef.push(JSON.stringify(message_user));
    let text_user = message_user["text"];
    console.log("User: " + text_user);
    fetch("http://df9b91727c4f.ngrok.io/predict", {
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
        //console.log("Doc du lieu cac child");
        //var childKey = childSnapshot.key;
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
    paddingHorizontal: 5,
  },
});
