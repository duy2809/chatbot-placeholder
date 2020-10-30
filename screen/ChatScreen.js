import React, { useState, useCallback, useEffect } from "react";
import { Alert, LogBox, StyleSheet, Text, View } from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import { dialogflowConfig } from "../env";
import { Dialogflow_V2 } from "react-native-dialogflow";
import firebase from "../firebase";
import uuid from "uuid";

const messagesRef = firebase.database().ref("/test");
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const { username } = route.params;

  const showResponse = (text, payload) => {
    let msg = {
      _id: uuid(),
      text,
      createdAt: new Date(),
      user: {
        _id: "2",
        name: "Placeholder",
        avatar: "https://image.flaticon.com/icons/png/512/2040/2040946.png",
      },
    };
    // if (payload && payload.is_url) {
    //   msg.text = "image";
    //   msg.image = text;
    // }
    //console.log(msg);
    messagesRef.push(JSON.stringify(msg));
  };

  const handleResponse = (result) => {
    let text = result.queryResult.fulfillmentText;
    // console.log(text);
    let payload = result.queryResult.fulfillmentMessages;
    let confidence = Math.round(
      result.queryResult.intentDetectionConfidence * 100
    );
    let intent_name = result.queryResult.intent["displayName"];
    Alert.alert(`Intent: ${intent_name} Độ tự tin ${confidence}%`);
    showResponse(text, payload);
  };

  const onSend = useCallback((messages = []) => {
    let message_user = messages[0];
    messagesRef.push(JSON.stringify(message_user));
    let text_user = message_user["text"];
    // console.log(text_user);
    Dialogflow_V2.requestQuery(
      text_user,
      (result) => handleResponse(result),
      (error) => console.log(error)
    );
  }, []);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );

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
        _id: 0,
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: false,
          values: [
            {
              _id: 1,
              title: "Thông tin người dùng",
              value: "thong_tin_nguoi_dung",
            },
            {
              _id: 2,
              title: "Các chỉ số cơ thể",
              value: "cac_chi_so_co_the",
            },
            {
              _id: 3,
              title: "Hôm nay ăn gì?",
              value: "hom_nay_an_gi",
            },
            {
              _id: 4,
              title: "Q&A bình thường",
              value: "Q&A",
            },
          ],
        },
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
        onQuickReply={(reply) => {
          console.log(reply[0]);
          let { title, value } = reply[0];
          let msg_rep = {
            _id: uuid(),
            createdAt: new Date(),
            text: title,
            user: {
              _id: 1,
            },
          };
          messagesRef.push(JSON.stringify(msg_rep));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 40,
  },
});
