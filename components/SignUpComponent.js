import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SignupComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 100,
  },

  title: {
    color: "#3465d9",
    fontWeight: "bold",
    fontSize: 30,
  },
});
