import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Linking
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import MyImage from "../assets/images/loadingScreen";

const LoadingScreen = ({ navigation }) => {
  const [state, setState] = React.useState({
    isLoading: true,
  });

  React.useEffect(() => {
    setTimeout(() => {
      setState({ isLoading: false });
    }, 3500);
  }, []);

  if (state.isLoading) {
    console.log(state.isLoading);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screen}>
          <View
            style={{ alignItems: "center", position: "absolute", bottom: 180 }}
          >
            <Image
              source={MyImage.work_load}
              style={{ width: 400, height: 400}}
            />
            
          </View>
          <Image
              source={MyImage.three_dots}
              style={{
                width: 100,
                height: 70,
                position: "absolute",
                bottom: 0
              }}
            />
        </View>
      </SafeAreaView>
    );
  }

  // const testing = () => {
  //   Linking.openURL("http://192.168.42.241/ehiremo/frontend/sign-up-details.php").catch((err) => {
  //     console.log(err)
  //   });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Image
          style={{ width: "100%", height: 330 }}
          source={MyImage.main}
          resizeMode="contain"
        />
        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
          }}
        >
          Good Day and welcome to eHireMo. An online service marketplace
          platform for service seekers and its providers.
        </Text>

        <View
          style={{
            marginTop: 100,
            width: "100%",
            height: 120,
            alignItems: "center",
          }}
        >
          {/* login btn */}
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              textAlign: "center",
              backgroundColor: "#14a800",
              width: 300,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          {/* signup btn */}
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              textAlign: "center",
              backgroundColor: "#1d4354",
              width: 300,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate("SignUp")}
            // onPress={testing}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default LoadingScreen;
