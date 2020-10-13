import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Text>Next page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
