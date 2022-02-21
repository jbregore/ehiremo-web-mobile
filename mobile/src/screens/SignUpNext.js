import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import RadioButton from "react-native-radio-button";
import { useIsFocused } from "@react-navigation/native";

import MyImage from "../assets/images/SignUp";

const SignUpNext = ({ navigation }) => {
  const [selected, setSelected] = React.useState(false);
  const [state, setState] = React.useState("");
  const isFocused = useIsFocused();

  const loadData = () => {
    // fetch(
    //   "http://192.168.42.241/ehiremo/backend/api/users/sign_up_session.php",
    //   {
    //     method: "GET",
    //     headers: {
    //       //Header Defination
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.text())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     const result = JSON.parse(responseJson);
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  useEffect(() => {
    loadData();
  }, [isFocused]);

  const createAcc = async () => {
    if(!state){
      alert("Please select one.");
      return;
    }
    try {
      await AsyncStorage.removeItem("role");
      await AsyncStorage.setItem("role", state);
      navigation.navigate("Verification");
    } catch (err) {
      console.log(err);
    }
    // if (state === "client") {
    //   navigation.navigate("TalentGettingStarted_3");
    // } else if (state === "freelancer") {
    //   navigation.navigate("ClientGettingStarted_5");
    // } else {
    //   console.log("Please select one");
    // }
  }


  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        <Image
          style={{ width: "100%", height: 180, marginTop: 150 }}
          source={MyImage.img_2}
          resizeMode="contain"
        />
        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 30,
          }}
        >
          Im looking for.
        </Text>

        <View
          style={{
            width: "100%",
            marginBottom: 20,
            marginTop: 20,
            alignItems: "center"
          }}
        >
          <View style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#c3c3c3",
            width: 300,
            height: 50,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 10,
            borderRadius: 10,
            marginBottom: 10
          }}>
            <RadioButton
              outerColor={"#14a800"}
              innerColor={"#c3c3c3"}
              size={12}
              animation={"bounceIn"}
              isSelected={state == "client" ? true : false}
              onPress={() => setState("client")}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                color: "#555",
              }}
            >
              a client.
            </Text>
          </View>

          <View style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#c3c3c3",
            width: 300,
            height: 50,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 10,
            borderRadius: 10
          }}>
            <RadioButton
              outerColor={"#14a800"}
              innerColor={"#c3c3c3"}
              size={12}
              animation={"bounceIn"}
              isSelected={state === "freelancer" ? true : false}
              onPress={() => setState("freelancer")}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                color: "#555",
              }}
            >
              a freelance service provider.
            </Text>
          </View>

        </View>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            alignItems: "center",
          }}
        >
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
            onPress={createAcc}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
              }}
            >
              Create my account
            </Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16
  },

  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default SignUpNext;
