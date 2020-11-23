import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  LogBox,
  StyleSheet,
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
  renderQuickReplies,
} from "../custom/MessageContainer";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const messagesRef = firebase.database().ref(`/${uuid()}`);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 15,
          }}
          onPress={() => navigation.navigate("Profile", { bmi, bmr, tdee })}
        >
          <Image source={require("../assets/icon_user.png")} />
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

  const showResponseImageUser = (image) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "React Native",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      image,
    };
    messagesRef.push(JSON.stringify(msg));
  };

  const postImageAPI = (image) => {
    showResponseImageUser(image);
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    axios({
      url: "https://detectfood.duyanh4.repl.co/predict",
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        const { data } = response;
        const nameFood = data["name"];
        const caloFood = data["calories"];
        if (nameFood != "Error")
          showResponseText(
            `Trong ảnh là món ${nameFood} bạn nha! Trong 100g ${nameFood} có chứa ${caloFood} calories!`
          );
        else
          showResponseText(
            `Sorry bạn :( Mình không đoán được món trong ảnh rùi!`
          );
      })
      .catch(function (error) {
        showResponseText("Sorry bạn :( Ảnh của bạn chưa được gửi đi");
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      postImageAPI(result.uri);
    }
  };

  const showResponseQuickReply = (listBtn) => {
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: "2",
        name: "Placeholder",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      quickReplies: {
        type: "radio",
        keepIt: true,
        values: listBtn,
      },
    };
    messagesRef.push(JSON.stringify(msg));
  };

  const handleResponse = (result) => {
    let fulfillMessages = result.queryResult.fulfillmentMessages;
    let image, listBtn;
    fulfillMessages.forEach((obj) => {
      if (!obj["platform"]) {
        if (obj["payload"]) {
          if (obj["payload"]["image"]) {
            image = obj["payload"]["image"];
            showResponseImage(image);
          } else if (obj["payload"]["quickReplies"]) {
            listBtn = obj["payload"]["quickReplies"];
            showResponseQuickReply(listBtn);
          }
        }
        if (obj["text"]) {
          let text_bot = obj["text"]["text"][0];
          showResponseText(text_bot);
        }
      }
    });
  };

  const onSend = useCallback((messages = []) => {
    let message_user = messages[0];
    messagesRef.push(JSON.stringify(message_user));
    let text_user = message_user["text"];
    Dialogflow_V2.requestQuery(
      text_user,
      (result) => handleResponse(result),
      (error) => console.log(error)
    );
  }, []);

  const onQuickReply = (replies = []) => {
    let reply = replies[0];
    let title = reply["title"];
    let value = reply["value"];
    let msg = {
      _id: uuid(),
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "React Native",
        avatar: "https://i.imgur.com/Nyp4fGI.png",
      },
      text: title,
    };
    messagesRef.push(JSON.stringify(msg));
    Dialogflow_V2.requestQuery(
      value,
      (result) => handleResponse(result),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Xin lỗi, mình cần quyền truy cập thư mục ảnh của bạn để có thể hoạt động đầy đủ tính năng!"
          );
        }
      }
    })();

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
            onQuickReply={(replies) => onQuickReply(replies)}
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
            renderQuickReplies={renderQuickReplies}
            onPressActionButton={pickImage}
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
