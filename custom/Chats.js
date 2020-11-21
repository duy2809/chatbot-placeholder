import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import initialMessages from "./messages";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "./InputToolbar";
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
  renderDay,
  renderQuickReplies,
} from "./MessageContainer";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import uuid from "uuid";

export default function ChatScreen({ route, navigation }) {
  const { name, age, gender, height, weight, activity } = route.params;
  //   console.log(name, age, gender, weight, height, activity);

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

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(initialMessages.reverse());
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  const onQuickReply = (newMessages = []) => {
    console.log(newMessages);
    let reply = newMessages[0];
    let title = reply["title"];
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
    let newMsg = [msg];
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMsg));
  };

  let [fontsLoaded] = useFonts({
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/background_chat_2.jpg")}
          style={styles.image}
        >
          <GiftedChat
            messages={messages}
            text={text}
            onInputTextChanged={setText}
            onSend={onSend}
            user={{
              _id: 1,
              name: "Aaron",
              avatar: "https://placeimg.com/150/150/any",
            }}
            placeholder="Nhấn để nói chuyện ..."
            //   alignTop
            alwaysShowSend
            scrollToBottom
            // maxInputLength={50}
            //   showUserAvatar
            //   renderAvatarOnTop
            //   renderUsernameOnMessage
            renderAvatar={null}
            minInputToolbarHeight={65}
            // bottomOffset={-300} // Tính năng QUAN TRỌNG
            //   onPressAvatar={console.log}
            renderInputToolbar={renderInputToolbar} // Tính năng QUAN TRỌNG
            renderActions={renderActions} // Tính năng QUAN TRỌNG
            renderComposer={renderComposer} // Tính năng QUAN TRỌNG
            renderSend={renderSend} // Tính năng QUAN TRỌNG
            //   renderAvatar={renderAvatar}
            renderBubble={renderBubble} // Tính năng QUAN TRỌNG
            //   renderMessage={renderMessage} // Tính năng QUAN TRỌNG chỉnh hiển thị ngày
            renderMessageText={renderMessageText} // Tính năng QUAN TRỌNG
            // renderCustomView={renderCustomView}
            renderQuickReplies={renderQuickReplies} // Tính năng QUAN TRỌNG
            // isCustomViewBottom
            //   messagesContainerStyle={{ backgroundColor: "indigo" }} // Tính năng QUAN TRỌNG
            //   parsePatterns={(linkStyle) => [
            //     {
            //       pattern: /#(\w+)/,
            //       style: linkStyle,
            //       onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
            //     },
            //   ]}
            renderLoading={() => (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            onQuickReply={onQuickReply}
            renderDay={renderDay}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconUser: {
    width: 32,
    height: 32,
  },
  image: {
    flex: 1,
  },
});
