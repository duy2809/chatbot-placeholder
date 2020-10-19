import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Header } from "react-native-elements";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chatbot Placeholder</Text>
      <Image
        style={styles.logo}
        source={{
          uri: "https://image.flaticon.com/icons/png/512/2040/2040946.png",
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat", { username: username })}
        style={[styles.btn, styles.shadowStyle]}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 35,
    marginBottom: 20,
    color: "#66C3FF",
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 125,
    backgroundColor: "#66C3FF",
    borderRadius: 10,
    marginTop: 10,
  },

  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  input: {
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  logo: {
    width: 300,
    height: 250,
    marginBottom: 30,
  },
});
