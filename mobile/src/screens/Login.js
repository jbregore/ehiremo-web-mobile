import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Pressable
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

//icons
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import MyImage from "../assets/images/Login";
import LoadingSpinner from "./LoadingSpinner";

const Login = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [modalForgot, setModalForgot] = useState(false);

  const [emailForgot, setEmailForgot] = useState("");

  const [showSpinner, setshowSpinner] = useState(false);

  const handleSubmitPress = () => {
    setErrortext('');
    if (!username) {
      setModalAlert(true);
      setAlertText("Please fill Email.");
      return;
    }
    if (!password) {
      setModalAlert(true);
      setAlertText("Please fill Password.");
      return;
    }
    setLoading(true);
    fetch('http://192.168.42.241/ehiremo/backend/api/users/login.php', {
      method: 'POST',
      body: JSON.stringify({
        'login_email': username,
        'login_password': password
      }),
      headers: {
        //Header Defination
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        const result = JSON.parse(responseJson);
        if (result.message === "no account found") {
          setModalAlert(true);
          setAlertText("No account found.");
        }
        // localStorage.setItem("user_id", JSON.stringify(result.session_id));
        // console.log(localStorage.getItem("user_id"))
        if (result.role === "client") {
          // alert("talamismis")
          // navigation.navigate('ClientAllJobPost');
          navigation.navigate("ClientNavigation");
        } else if (result.role === "freelancer") {
          navigation.navigate("navigation");
          // alert("kupal")
        }
        // if(resp.isUserExists){
        //   // if(resp.isAccountVerified){
        //   //   navigation.navigate('Home');
        //   // } else {
        //   //   navigation.navigate('Verification');
        //   // }
        // } else {
        //   alert("User not found");
        // }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.log(error)
      });
  };


  const forgotPassword = () => {

    if (!emailForgot) {
      setModalAlert(true);
      setAlertText("Please fill the input field.");
      return;
    }

    setModalForgot(false);
    setshowSpinner(true);

    fetch(
      "http://192.168.42.241/ehiremo/backend/api/users/validate_email.php",
      {
        method: "POST",
        body: JSON.stringify({ user_email: emailForgot }),
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        const result = JSON.parse(responseJson);
        if (result.message === "Email address is valid") {
          // setshowSpinner(false);

          fetch('http://192.168.42.241/ehiremo/backend/api/users/get_email_forgot.php', {
            method: 'POST',
            body: JSON.stringify({ user_email: emailForgot }),
            headers: {
              //Header Defination
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((response2) => response2.text())
            .then((responseJson2) => {
              const result2 = JSON.parse(responseJson2);

              fetch('http://192.168.42.241/ehiremo/backend/api/users/send_email_forgot.php', {
                method: 'POST',
                body: JSON.stringify({ user_email: emailForgot }),
                headers: {
                  //Header Defination
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
              })
                .then((response3) => response3.text())
                .then((responseJson3) => {
                  const result3 = JSON.parse(responseJson3);
                  console.log(result3)
                  // if (result3 === "email sent") {
                    setModalAlert(true);
                    setAlertText("Email sent successfully.");
                  // }
                  setshowSpinner(false);
                })
                .catch((error) => {
                  //Hide Loader
                  setshowSpinner(false);
                  console.log(error)
                });

            })
            .catch((error) => {
              //Hide Loader
              setshowSpinner(false);
              console.log(error)
            });

        } else if (result.message === "Email address is invalid format") {
          setshowSpinner(false);
          setModalAlert(true);
          setAlertText("Invalid : Email address is invalid format.");
        }
        else if (result.message === "Email Undeliverable") {
          setshowSpinner(false);
          setModalAlert(true);
          setAlertText("Invalid : Email Undeliverable.");
        }
        else if (result.message === "Email is Disposable") {
          setshowSpinner(false);
          setModalAlert(true);
          setAlertText("Invalid : Email is Disposable.");
        }
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
        setshowSpinner(false);
      });
  }


  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      {showSpinner && <LoadingSpinner />}
      <ScrollView style={styles.screen}>
        <Image
          style={{ width: "100%", height: 230, marginTop: 100 }}
          source={MyImage.img_1}
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
          Login to your account.
        </Text>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <FontAwesome
              name="user-o"
              size={24}
              color="#c3c3c3"
              style={{
                position: "absolute",
                left: 10,
                top: 10,
              }}
            />
            <TextInput style={styles.input} placeholder="Email"
              onChangeText={(username) => setUsername(username)} />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <AntDesign
              name="lock"
              size={30}
              color="#c3c3c3"
              style={{
                position: "absolute",
                left: 5,
                top: 8,
              }}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity onPress={() => setModalForgot(true)}>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: "center",
                fontSize: 16,
                color: "blue",
                fontFamily: "sans-serif-light",
                textDecorationLine: "underline"
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>


        <View
          style={{
            marginTop: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleSubmitPress}
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
        </View>


      </ScrollView>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlert}
        onRequestClose={() => {
          setModalAlert(!modalAlert);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, height: 120 }}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>{alertText}</Text>

            </View>

            <View style={{
              flexDirection: "row", position: "absolute", bottom: 10,
              width: '100%', justifyContent: 'center', right: 0
            }}>
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
                onPress={() => {
                  setModalAlert(!modalAlert)
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Okay
                </Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalForgot}
        onRequestClose={() => {
          setModalForgot(!modalForgot);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, height: 200 }}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>Enter your email</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                position: "relative",
                marginTop: 10
              }}
            >
              <FontAwesome
                name="user-o"
                size={24}
                color="#c3c3c3"
                style={{
                  position: "absolute",
                  left: 10,
                  top: 10,
                }}
              />
              <TextInput style={{ ...styles.input, width: '90%', }} placeholder="Email"
                onChangeText={(emailForgot) => setEmailForgot(emailForgot)} />
            </View>


            <View style={{
              flexDirection: "row", position: "absolute", bottom: 10,
              width: '100%', justifyContent: 'center', right: 0
            }}>
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
                onPress={forgotPassword}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Send
                </Text>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>
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
    height: 50,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingLeft: 38,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    minHeight: 140,
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Login;
