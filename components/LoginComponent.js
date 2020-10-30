import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MeterialIcons from "react-native-vector-icons/MaterialIcons";

export default function LoginComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Login with Email and Password</Text>
      <View style={styles.section}>
        <MeterialIcons name="email" size={20} />
        <TextInput placeholder="Email" style={styles.textInput} />
      </View>

      <View style={styles.section}>
        <MeterialIcons name="lock-outline" size={20} />
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.login}>
        <Text style={styles.textLogin}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signup}>
        <Text
          style={[
            styles.textSignup,
            {
              color: "gray",
            },
          ]}
        >
          Don't have account
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={[
            styles.textSignup,
            {
              color: "#3465d9",
              marginLeft: 3,
            },
          ]}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
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

  text: {
    color: "gray",
  },

  section: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
  },

  forgot: {
    textAlign: "right",
    marginTop: 15,
    color: "#3465d9",
  },

  textLogin: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  login: {
    width: "100%",
    height: 40,
    backgroundColor: "#3465d9",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 50,
  },

  signup: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
  },

  textSignup: {
    textAlign: "center",
  },
});
