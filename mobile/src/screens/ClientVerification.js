import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import RadioButton from "react-native-radio-button";

import MyImage from "../assets/images/SignUp";

const ClientVerification = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        <Image
          style={{ width: "100%", height: 200, marginTop: 50 }}
          source={MyImage.smartphone}
          resizeMode="contain"
        />
        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 60,
          }}
        >
          Verify your account
        </Text>

        <View
          style={{
            paddingHorizontal: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              height: 180,
              width: 300,
              marginTop: 10,
              borderRadius: 10,
              borderColor: "#c3c3c3",
              borderWidth: 1,
            }}
          ></Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 35,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              textAlign: "center",
              backgroundColor: "#14a800",
              width: 150,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              Attach an id here
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              textAlign: "center",
              backgroundColor: "#14a800",
              width: 70,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              

              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                Enter Code:
              </Text>
              <TextInput keyboardType={"number-pad"}
              style={{ ...styles.input, width: 170, height: 60,
            fontSize: 26, textAlign: "center", }} />

              <Text
                style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                  textAlign: "center"
                }}
              >
                Kindly check the verification code weve sent in your email.
              </Text>  

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  position: "absolute",
                  right: 20,
                  bottom: 20,
                }}
              >
                <Pressable
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#14a800",
                    width: 70,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginBottom: 7,
                    marginRight: 8,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Close
                  </Text>
                </Pressable>

                <Pressable
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#14a800",
                    width: 70,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginBottom: 7,
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate("ClientNavigation");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Next
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
    fontSize: 16,
  },

  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    height: 250,
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ClientVerification;
