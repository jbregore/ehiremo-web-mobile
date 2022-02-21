import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  CheckBox,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  ActivityIndicator,
  Picker
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';

import MyImage from "../assets/images/SignUp";

const SignUp = ({ navigation }) => {
  const [isSelected, setSelection] = React.useState(false);
  const [modalTerms, setModalTerms] = useState(false);

  const [alertText, setAlertText] = useState("");
  const [modalAlert, setModalAlert] = useState(false);
  const options = {
    year: "4-digit",
    month: "2-digit",
    day: "2-digit"
  }

  const [state, setState] = React.useState({
    searches: "Male",
    choosenIndex: 0
  });

  // new Date().toLocaleDateString("en-US",options);

  // const [date, setDate] = React.useState(new Date().toLocaleDateString("en-US", options));
  // const [mode, setMode] = React.useState('date');
  const [show, setShow] = useState(false);
  const [bday, setBday] = useState("");
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const onChangeDate = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" + tempDate.getFullYear();
    // console.log(fDate);

    setShow(false);
    setBday(fDate);
    console.log(fDate)
  };

  const showMode = () => {
    setShow(true);
  };

  // const signNext = async (data) => {
  //   // setModalAlert(false);
  //   // console.log(data);

  //   try {
  //     await AsyncStorage.removeItem("signup_session");
  //     await AsyncStorage.setItem("signup_session", data);
  //     navigation.navigate("SignUpNext");
  //   } catch (err) {
  //     console.log(err);
  //   }

  // }

  const continueSignUp = () => {
    // console.log(email);
    // console.log(fname);
    // console.log(lname);
    // console.log(mname);
    // console.log(address);
    // console.log(bday);
    // console.log(password);
    // console.log(cpassword);
    // console.log(isSelected)

    // navigation.navigate("SignUpNext");

    let today = new Date();
    let newBday = bday.split("/");
    let date = newBday[2];
    let newdate = today.getFullYear() - 18;
    let mindate = newdate - 60;

    if (Number(date) <= newdate && Number(date) >= mindate) {
    } else {
      alert("Invalid Age. must be 18 years old or above.");
      return;
    }

    if (!email || !fname || !lname || !mname || !address || !address || !bday || !password ||
      !cpassword || isSelected === false) {
      alert("Please fill all the fields");
    } else if (password.length < 8) {
      alert("Password must be atleast 8 characters long.");
    } else if (password !== cpassword) {
      alert("Password doesnt match");
    } else {
      // alert("Yehey")

      fetch("http://192.168.42.241/ehiremo/backend/api/users/validate_email.php", {
        method: "POST",
        body: JSON.stringify({ user_email: email }),
        headers: {
          //Header Defination
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((responseJson) => {
          //Hide Loader
          if (responseJson === "Email address is invalid format") {
            alert("Invalid : email is invalid format");
          } else if (responseJson === "Email Undeliverable") {
            alert("Invalid : email is undeliverable");
          } else if (responseJson === "Email is Disposable") {
            alert("Invalid : email is disposable");
          } else {

            let Newfname = fname.replace(/\b[a-z]/g, function (txtjq) {
              return txtjq.toUpperCase();
            });

            let Newfname2 = lname.replace(/\b[a-z]/g, function (txtjq) {
              return txtjq.toUpperCase();
            });

            let NewAddress = address.replace(/\b[a-z]/g, function (txtjq3) {
              return txtjq3.toUpperCase();
            });


            let user_data = {
              user_id: Date.now().toString(36) + Math.random().toString(36).substr(2),
              role: "",
              name: Newfname + " " + mname + ". " + Newfname2,
              fname: Newfname,
              gender: state.searches,
              address: NewAddress,
              birthday: bday,
              age: today.getFullYear() - date,
              email: email,
              password: password,
            };

            fetch(
              "http://192.168.42.241/ehiremo/backend/api/users/create_signup_session.php",
              {
                method: "POST",
                body: JSON.stringify(user_data),
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
                navigation.navigate("SignUpNext");
              })
              .catch((error) => {
                console.log(error);
              });

            // setModalAlert(true);
            // signNext(user_data);

          }
          // console.log(responseJson)
          // const result = JSON.parse(responseJson);
          // // setInfo(result);
          // console.log(result);
        })
        .catch((error) => {
          //Hide Loader
          console.log(error);
        });
    }
  }

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={styles.container}>
      <ScrollView style={styles.screen}>

        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              paddingHorizontal: 20,
              textAlign: "center",
              fontSize: 24,
              color: "#555",
              fontFamily: "sans-serif-light",
            }}
          >
            Complete your account set up.
          </Text>

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TextInput style={styles.input} placeholder="Work Email"
              value={email} onChangeText={(email) => setEmail(email)}
            />

            <TextInput style={styles.input} placeholder="First Name"
              value={fname} onChangeText={(fname) => setFname(fname)}
            />

            <TextInput style={styles.input} placeholder="Last Name"
              value={lname} onChangeText={(lname) => setLname(lname)}
            />

            <View style={{flexDirection: 'row', width: "100%", paddingHorizontal: 30}}>

              <TextInput style={{...styles.input, width: "50%", marginRight: 5}} placeholder="M.I"
                value={mname} onChangeText={(mname) => setMname(mname)}
              />
              <View
                style={{
                  width: "48%",
                  borderColor: "#c3c3c3",
                  borderWidth: 1,
                  borderRadius: 10,
                  height: 51,
                  justifyContent: 'center'
                }}>
                <Picker
                  selectedValue={state.searches}
                  onValueChange={(
                    itemValue, itemPosition
                  ) => setState({
                    searches: itemValue,
                    choosenIndex: itemPosition
                  })}
                  style={{ height: 40 }}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
            </View>


            <TextInput style={styles.input} placeholder="Address"
              value={address} onChangeText={(address) => setAddress(address)}
            />

            <View style={{ marginTop: 5, marginBottom: 5 }}>

              <Pressable onPress={() => showMode()}>
                <TextInput
                  // value={date.toString()}
                  style={styles.input}
                  placeholder="Birthday"
                  value={bday}
                  editable={false}
                />
              </Pressable>
              {show ? (
                <View>
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    // mode={mode}
                    is24Hour={true}
                    display="default"
                    type="default"
                    onChange={onChangeDate}
                  // onConfirm={() => alert("puta")}
                  />
                </View>
              ) : (<></>)}

              {/* <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          {show && (
            <DateTimePicker
              value={date}
              mode={'default'}
              display="default"
              onChange={onChange}
            />
          )} */}

              {/* <DatePicker
            style={styles.datePickerStyle}
            value={date} 
            mode="date" 
            placeholder="Birthday"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={{ marginTop: 5, marginBottom: 5, width: 300, height: 40 }}
            customStyles={{
              dateIcon: {
                display: "none",
              },
              dateInput: {
                alignItems: "flex-start",
                ...styles.input,
              },
              placeholderText: {
                color: "#b7b7b7",
              },
            }}
            onDateChange={setDate}
          /> */}

            </View>

            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              value={password} onChangeText={(password) => setPassword(password)}
            />

            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Confirm Password"
              value={cpassword} onChangeText={(cpassword) => setCPassword(cpassword)}
            />

            <View style={{ flexDirection: "row", paddingHorizontal: 45 }}>
              <CheckBox
                style={{ borderColor: "#555" }}
                value={isSelected}
                onValueChange={setSelection}
              />
              <Pressable onPress={() => setModalTerms(true)}>
                <Text style={{ fontSize: 15 }}>
                  Yes, I understand and agree to the
                  <Text style={{ color: "#14a800" }}>Terms of Service</Text>,
                  including the{" "}
                  <Text style={{ color: "#14a800" }}>User Agreement </Text>
                  and <Text style={{ color: "#14a800" }}>Privacy Policy.</Text>
                </Text>
              </Pressable>
            </View>

            <View
              style={{
                marginTop: 20,
                width: "100%",
                alignItems: "center",
                marginBottom: 20
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
                // onPress={() => navigation.navigate("SignUpNext")}
                onPress={continueSignUp}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View style={{ marginTop: 10, alignItems: "center" }}>
              <Text>or continue with</Text>
              <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderColor: "#1d4354",
                    borderWidth: 1,
                    marginRight: 10
                  }}
                >
                  <Image
                    style={{ height: 35, width: 35, borderRadius: 500 }}
                    source={MyImage.google}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderColor: "#1d4354",
                    borderWidth: 1
                  }}
                >
                  <Image
                    style={{ height: 38, width: 38, borderRadius: 500 }}
                    source={MyImage.facebook}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

            </View> */}

          </View>


        </View>
      </ScrollView >

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTerms}
        onRequestClose={() => {
          setModalTerms(!modalTerms);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView }}>

            <ScrollView style={{ flexDirection: "column", }} showsVerticalScrollIndicator={false}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25,
                fontWeight: 'bold'
              }}>
                Generic Terms of Service
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                Please read these terms of service ("terms of service", "terms")
                carefully before using eHireMo website (“website”, "service")
                operated by eHireMo Team ("us", 'we", "our").
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Conditions of use
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                By using this website, you certify that you have read and
                reviewed this Agreement and that you agree to comply
                with its terms. If you do not want to be bound by the
                terms of this Agreement, you are advised to leave
                the website accordingly. eHireMo only grants use
                and access of this website, its products, and its
                services to those who have accepted its terms.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Privacy policy
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                Before you continue using our website, we advise you
                to read our privacy policy regarding our user data
                collection. It will help you better understand our practices.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Age restriction
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                You must be at least 18 (eighteen) years of age before you
                can use this website. By using this website,
                you warrant that you are at least 18 years of
                age and you may legally adhere to this Agreement.
                eHireMo assumes no responsibility for liabilities
                related to age misrepresentation.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Intellectual property
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                You agree that all materials, products, and services
                provided on this website are the property of eHireMo,
                its affiliates, directors, officers, employees, agents,
                suppliers, or licensors including all copyrights, trade
                secrets, trademarks, patents, and other intellectual property.
                You also agree that you will not reproduce or redistribute
                the eHireMo’s intellectual property in any way, including
                electronic, digital, or new trademark registrations.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                User accounts
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                As a user of this website, you may be asked to register
                with us and provide private information. You are
                responsible for ensuring the accuracy of this information,
                and you are responsible for maintaining the safety and
                security of your identifying information. You are also
                responsible for all activities that occur under your
                account or password.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Applicable law
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                By visiting this website, you agree that the laws of the Philippines,
                without regard to principles of conflict laws, will
                govern these terms and conditions, or any dispute
                of any sort that might come between eHireMo and you,
                or its business partners and associates.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Disputes
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                Any dispute related in any way to your visit to this website
                or to products you purchase from us shall be arbitrated
                by law and you consent to exclusive jurisdiction and venue of such courts.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Indemnification
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                You agree to indemnify eHireMo and its affiliates
                and hold eHireMo harmless against legal claims and
                demands that may arise from your use or misuse of
                our services. We reserve the right to select our own legal counsel.
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
                fontWeight: 'bold'
              }}>
                Limitation on liability
              </Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'left',
              }}>
                eHireMo is not liable for any damages that may occur to you as a result
                of your misuse of our website.
                eHireMo reserves the right to edit, modify, and change this Agreement any time.
                We shall let our users know of these changes through electronic mail.
                This Agreement is an understanding between [name] and the user,
                and this supersedes and replaces all prior agreements regarding the use of this website.
              </Text>


            </ScrollView>

            {/* <View style={{
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

            </View> */}


          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlert}
        onRequestClose={() => {
          setModalAlert(!modalAlert);
        }}
      >
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#0000ff" />
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
    fontSize: 16
  },

  datePickerStyle: {
    width: 200,
    marginTop: 30,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView: {
    height: 400,
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

export default SignUp;
