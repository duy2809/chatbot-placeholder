import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Alert,
  LogBox,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import firebase from "../firebase";
import uuid from "uuid";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "../custom/InputToolbar";
import {
  renderBubble,
  renderDay,
  renderMessageText,
} from "../custom/MessageContainer";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

const messagesRef = firebase.database().ref("/test");
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default function ChatScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const {
    name,
    age,
    gender,
    height,
    weight,
    activity,
    bmi,
    bmr,
    classification,
    tdee,
  } = route.params;
  console.log(
    name,
    age,
    gender,
    height,
    weight,
    activity,
    bmi,
    bmr,
    classification,
    tdee
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            // borderColor: "black",
            // borderWidth: 5,
            marginRight: 15,
          }}
          onPress={() => navigation.navigate("CustomerForm")}
        >
          <Image
            source={require("../assets/icon_user.png")}
            style={styles.iconUser}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const showResponseText = (text) => {
    let msg = {
      _id: uuid(),
      text,
      createdAt: new Date(),
      user: {
        _id: "2",
        name: "Placeholder",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
    };
    messagesRef.push(JSON.stringify(msg));
  };

  const showResponseImage = (image) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: "2",
        name: "Placeholder",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      image,
    };
    messagesRef.push(JSON.stringify(msg));
  };

  const handleResponse = (result) => {
    console.log(result);
    let fulfillMessages = result.queryResult.fulfillmentMessages;
    let image;
    fulfillMessages.forEach((obj) => {
      if (!obj["platform"]) {
        if (obj["payload"]) {
          image = obj["payload"]["image"];
          showResponseImage(image);
        } else image = null;
        if (obj["text"]) {
          let text_bot = obj["text"]["text"][0];
          // console.log(text_bot);
          showResponseText(text_bot);
        }
      }
    });
    let confidence = Math.round(
      result.queryResult.intentDetectionConfidence * 100
    );
    let intent_name = result.queryResult.intent["displayName"];
    // Alert.alert(`Intent: ${intent_name} \n Độ tự tin ${confidence}%`);
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
    console.log(name, age, gender, weight, height, activity);
    console.log("useEffect()");
    Dialogflow_V2.requestEvent(
      "WELCOME",
      {
        ten: name,
        gioi_tinh: gender,
        tuoi: age,
        can_nang: weight,
        chieu_cao: height,
        muc_hoat_dong: activity,
        bmi: bmi,
        bmr: bmr,
        phan_loai: classification,
        tdee: tdee,
      },
      (result) => handleResponse(result),
      (error) => console.log(error)
    );

    const permanentContexts = [
      {
        name: "info",
        parameters: {
          ten: name,
          gioi_tinh: gender,
          tuoi: age,
          can_nang: weight,
          chieu_cao: height,
          muc_hoat_dong: activity,
          bmi: bmi,
          bmr: bmr,
          phan_loai: classification,
          tdee: tdee,
        },
      },
    ];
    Dialogflow_V2.setPermanentContexts(permanentContexts);

    messagesRef.on("value", (snapshot) => {
      var arrMessages = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        arrMessages.unshift(JSON.parse(childData));
      });
      setMessages(arrMessages);
    });
    return () => {
      messagesRef.off("value");
    };
  }, []);

  let [fontsLoaded] = useFonts({
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background_chat_2.jpg")}
          style={styles.image}
        >
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
            placeholder="Nhấn để trò chuyện ..."
            alwaysShowSend
            scrollToBottom
            renderAvatarOnTop
            minInputToolbarHeight={65}
            renderAvatar={null}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderActions}
            renderComposer={renderComposer}
            renderSend={renderSend}
            renderBubble={renderBubble}
            renderMessageText={renderMessageText}
            renderDay={renderDay}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
