import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";

export default function SwiperComponent({ navigation }) {
  //   const [animation_signup, setAniSignup] = useState(null);
  //   const [animation_login, setAnilogin] = useState(null);

  //   function onIndexChanged(index) {
  //     if (index == 2) {
  //       setAniSignup("bounceInLeft");
  //       setAnilogin("bounceInRight");
  //     } else {
  //       setAniSignup("bounceInLeft");
  //       setAnilogin("bounceInRight");
  //     }
  //   }

  return (
    <Swiper
      loop={false}
      dot={<View style={styles.dot}></View>}
      activeDot={<View style={styles.activeDot}></View>}
      //   onIndexChanged={(index) => onIndexChanged(index)}
    >
      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require("../assets/asset1.png")}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>Cloud Storage</Text>
          <Text style={styles.text}>
            Thank you for watching my video and hope to get more tips for the
            next videos better.
          </Text>
        </View>
      </View>

      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require("../assets/asset2.png")}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>Share Storage</Text>
          <Text style={styles.text}>
            Thank you for watching my video and hope to get more tips for the
            next videos better.
          </Text>
        </View>
      </View>

      <View style={styles.slide}>
        <View style={styles.header}>
          <Image
            source={require("../assets/asset3.png")}
            style={styles.image}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>Save Storage</Text>
          <Text style={styles.text}>
            Thank you for watching my video and hope to get more tips for the
            next videos better.
          </Text>
          <View style={{ flexDirection: "row" }}>
            {/* <Animatable.View
              animation={animation_signup}
              delay={0}
              duration={1500}
              useNativeDriver
            > */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: "#3465d9",
                  borderWidth: 1,
                  borderRadius: 50,
                  marginTop: 15,
                },
              ]}
              onPress={() => navigation.navigate("Chat", { username: "Duy" })}
            >
              <Text style={{ color: "#3465d9" }}>Chat</Text>
            </TouchableOpacity>
            {/* </Animatable.View> */}

            {/* <Animatable.View
              animation={animation_login}
              delay={0}
              duration={1500}
              useNativeDriver
            > */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#3465d9",
                  borderRadius: 50,
                  marginTop: 15,
                  marginLeft: 20,
                },
              ]}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ color: "white" }}>Log in</Text>
            </TouchableOpacity>
            {/* </Animatable.View> */}
          </View>
        </View>
      </View>
    </Swiper>
  );
}

const { width, height } = Dimensions.get("screen");
const height_image = height * 0.5 * 0.8;
const width_image = height_image * 1.1;
const width_button = width * 0.3;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 100,
  },

  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  image: {
    height: height_image,
    width: width_image,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3465d9",
    textAlign: "center",
  },
  text: {
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },

  dot: {
    backgroundColor: "rgba(52,101,217,0.4)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },

  activeDot: {
    backgroundColor: "#3465d9",
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },

  button: {
    width: width_button,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
