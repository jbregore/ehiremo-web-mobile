import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Picker,
  CheckBox,
  Modal,
  Pressable,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import MyImage from "../../assets/images/Talent";
import RadioButton from "react-native-radio-button";

const PostAJob = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [state, setState] = React.useState({
    searches: "",
    choosenIndex: 0
  });

  const [rate, setRate] = useState("");
  const [myService, setMyService] = useState([]);

  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [age, setAge] = useState("");
  const [hourly, setHourly] = useState("");
  const [jobRate, setJobRate] = useState("");
  const [fixed, setFixed] = useState("");
  const [description, setDescription] = useState("");

  const [vHeadline, setVHeadline] = useState(false);
  const [vLocation, setVLocation] = useState(false);
  const [vServices, setVServices] = useState(false);
  const [vAge, setVAge] = useState(false);
  const [vDesc, setVDesc] = useState(false);
  const [vRate, setVRate] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);


  const addService = () => {
    if (!service) {
      setVServices(true);
    } else {
      setVServices(false);
      setMyService([...myService, service]);
      setService("");
    }

  }

  const deleteService = (index) => {
    let itemsCopy = [...myService];
    itemsCopy.splice(index, 1);
    setMyService(itemsCopy)
  }

  useEffect(() => {
    // console.log(myService);
  }, [myService])


  const PostJob = () => {
    let valid = 0;

    //HEADLINE
    if (!headline) {
      setVHeadline(true);
    } else {
      setVHeadline(false);
      valid++;
    }

    //LOCATION
    if (!location) {
      setVLocation(true);
    } else {
      setVLocation(false);
      valid++;
    }

    if (myService.length === 0) {
      setVServices(true);
    } else {
      setVServices(false);
      valid++;
    }

    //AGE
    if (!age) {
      setVAge(true);
    } else {
      setVAge(false);
      valid++;
    }
    //RATE
    if (!rate) {
      setVRate(true);
    } else {
      if (!hourly) {
        if (!fixed) {

        } else {
          setVRate(false);
          valid++;
        }
      } else {
        setVRate(false);
        valid++;
      }
    }

    //DESCRIPTION
    if (!description) {
      setVDesc(true);
    } else {
      setVDesc(false);
      valid++;
    }

    if (valid != 6) {
      alert("Please fill all the fields.");
      valid = 0;
      return;
    } else {

      let NewLocation = location.replace(/\b[a-z]/g, function (txtjq) {
        return txtjq.toUpperCase();
      });

      let job_data = {
        job_headline: headline.charAt(0).toUpperCase() + headline.slice(1),
        job_location: NewLocation,
        job_services: myService,
        job_age: age,
        job_scope: state.searches || "Small",
        job_rate_desc: rate,
        job_rate: hourly.charAt(0).toUpperCase() + hourly.slice(1) || fixed.charAt(0).toUpperCase() + fixed.slice(1),
        job_desc: description.charAt(0).toUpperCase() + description.slice(1)
      }


      //POST JOB
      fetch('http://192.168.42.241/ehiremo/backend/api/jobs/create_job.php', {
        method: 'POST',
        body: JSON.stringify(job_data),
        headers: {
          //Header Defination
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.text())
        .then((responseJson) => {
          //Hide Loader
          const result = JSON.parse(responseJson);
          setHeadline("");
          setLocation("");
          setService("");
          setAge("");
          setState({
            searches: "Small",
            choosenIndex: 0
          })
          setDescription("");
          setHourly("");
          setJobRate("");
          setFixed("");
          setMyService([]);
          setRate("");
          setModalAlert(true);
        })
        .catch((error) => {
          //Hide Loader
          console.log(error)
        });


    }

  }

  const selectHourly = () => {
    setRate("Hourly Rate");
    setFixed("");
  }

  const selectFixed = () => {
    setRate("Fixed Rate");
    setHourly("");
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1d4354",
          paddingHorizontal: 15,
          paddingVertical: 5
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather
            name="menu"
            size={30}
            color="#fff"
            style={{
              marginTop: 5,
              marginRight: 5,
            }}
          /></TouchableOpacity>
        <View style={{ alignItems: "flex-start", marginLeft: 78, marginTop: 5 }}>
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>Post a Job </Text>
        </View>
      </View>
      <View style={styles.screen} >

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{
            marginTop: 30, marginBottom: 15, alignItems: "center",
            borderRadius: 20, borderWidth: 1, borderColor: "#c3c3c3",
            paddingVertical: 20,
          }}>

            <View style={{ flexDirection: "column", width: 300, }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                width: 300,
              }}>Headline :</Text>
              {vHeadline === false ? (<></>) : (<Text style={{
                paddingLeft: 5,
                marginTop: -22,
                marginBottom: 5,
                fontSize: 14,
                color: "rgb(216, 0, 12)",
                fontFamily: "sans-serif-light",
                alignSelf: 'flex-end'
              }}>Please fill this field</Text>)}
              <TextInput style={styles.input} placeholder="" value={headline} onChangeText={(headline) => setHeadline(headline)} />

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                width: 300,
              }}>Location :</Text>
              {vLocation === false ? (<></>) : (<Text style={{
                paddingLeft: 5,
                marginTop: -22,
                marginBottom: 5,
                fontSize: 14,
                color: "rgb(216, 0, 12)",
                fontFamily: "sans-serif-light",
                alignSelf: 'flex-end'
              }}>Please fill this field</Text>)}
              <TextInput style={styles.input} placeholder="" value={location} onChangeText={(location) => setLocation(location)} />

              <View style={{ width: 300 }}>
                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Services :</Text>
                {vServices === false ? (<></>) : (<Text style={{
                  paddingLeft: 5,
                  marginTop: -22,
                  marginBottom: 5,
                  fontSize: 14,
                  color: "rgb(216, 0, 12)",
                  fontFamily: "sans-serif-light",
                  alignSelf: 'flex-end'
                }}>Please fill this field</Text>)}
                <TextInput style={styles.input} placeholder="" value={service} onChangeText={(service) => setService(service)} />
                <View style={{
                  marginTop: -30, zIndex: 1,
                  marginRight: 12, marginBottom: 15, width: 40,
                  height: 13, alignSelf: 'flex-end',
                }}>
                  <TouchableOpacity style={{
                    backgroundColor: '#14a800',
                    position: 'relative', justifyContent: 'center', width: 40,
                    height: 25, marginTop: -12,
                  }} onPress={addService}>
                    <Text style={{ textAlign: 'center', color: "#fff" }}>Add</Text>
                  </TouchableOpacity>

                </View>
              </View>

              {/* dine  */}
              <View style={{ flexDirection: 'column' }}>
                <View style={{
                  flexDirection: "row", marginBottom: 5,
                  marginTop: 5,
                }} >
                  {myService.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                          textAlign: "center",
                          backgroundColor: "#fff",
                          minWidth: 100,
                          height: 30,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 30,
                          borderWidth: 1,
                          borderColor: "#555",
                          marginRight: 10,
                          paddingHorizontal: 10,
                          marginBottom: 5,
                        }}
                        key={index}
                        onPress={() => deleteService(index)}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#555",
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}

                </View>


              </View>



              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                width: 300,
              }}>Age range :</Text>
              {vAge === false ? (<></>) : (<Text style={{
                paddingLeft: 5,
                marginTop: -22,
                marginBottom: 5,
                fontSize: 14,
                color: "rgb(216, 0, 12)",
                fontFamily: "sans-serif-light",
                alignSelf: 'flex-end'
              }}>Please fill this field</Text>)}
              <TextInput style={styles.input} placeholder="" value={age} onChangeText={(age) => setAge(age)} />

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                width: 300,
              }}>Project Scope :</Text>
              <View
                style={{
                  borderColor: "#c3c3c3",
                  borderWidth: 1,
                  borderRadius: 10,
                  width: 300,
                }}>
                <Picker
                  selectedValue={state.searches}
                  onValueChange={(
                    itemValue, itemPosition
                  ) => setState({
                    searches: itemValue,
                    choosenIndex: itemPosition
                  })}
                  style={{
                    height: 40,
                    color: "#555"
                  }}
                >
                  <Picker.Item label="Small" value="Small" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="Large" value="Large" />
                </Picker>
              </View>

              <View style={{
                marginTop: 15, flexDirection: "row", width: 300,
              }}>
                <View style={{ flexDirection: "row" }}>

                  <RadioButton
                    outerColor={"#14a800"}
                    innerColor={"#c3c3c3"}
                    size={12}
                    // animation={"bounceIn"}
                    isSelected={rate == "Hourly Rate" ? true : false}
                    onPress={selectHourly}
                  />
                  <Text style={{
                    paddingLeft: 5,
                    marginTop: 3,
                    fontSize: 16,
                    color: "#555",
                    fontFamily: "sans-serif-light",
                  }}>Hourly Rate
                  </Text>

                </View>

                <View style={{
                  flexDirection: "row",
                  alignItems: "flex-start", marginLeft: 55
                }}>
                  <RadioButton
                    outerColor={"#14a800"}
                    innerColor={"#c3c3c3"}
                    size={12}
                    // animation={"bounceIn"}
                    isSelected={rate == "Fixed Rate" ? true : false}
                    onPress={selectFixed}
                  />
                  <Text style={{
                    paddingLeft: 5,
                    marginTop: 3,
                    fontSize: 16,
                    paddingBottom: 5,
                    color: "#555",
                    fontFamily: "sans-serif-light",
                  }}>Fixed Rate
                  </Text>
                  {vRate === false ? (<></>) : (<Text style={{
                    paddingLeft: 5,
                    marginTop: -22,
                    marginBottom: 5,
                    fontSize: 14,
                    color: "rgb(216, 0, 12)",
                    fontFamily: "sans-serif-light",
                    alignSelf: 'flex-end',
                    marginLeft: 10
                  }}>Invalid</Text>)}
                </View>
              </View>

              <View style={{ flexDirection: "row", width: 300, }}>
                <TextInput style={{
                  ...styles.input, width: 140,
                  marginRight: 10, backgroundColor: rate === "Fixed Rate" ? '#efefef' : '#fff'
                }} placeholder="" value={hourly} onChangeText={(hourly) => setHourly(hourly)}
                  editable={rate === "Fixed Rate" ? false : true} />
                <TextInput style={{ ...styles.input, width: 150, backgroundColor: rate === "Hourly Rate" ? '#efefef' : '#fff' }} placeholder=""
                  value={fixed} onChangeText={(fixed) => setFixed(fixed)} editable={rate === "Hourly Rate" ? false : true} />
              </View>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                width: 300,
              }}>Describe your job :</Text>
              {vDesc === false ? (<></>) : (<Text style={{
                paddingLeft: 5,
                marginTop: -22,
                marginBottom: 5,
                fontSize: 14,
                color: "rgb(216, 0, 12)",
                fontFamily: "sans-serif-light",
                alignSelf: 'flex-end'
              }}>Please fill this field</Text>)}
              <TextInput multiline={true}
                numberOfLines={15}
                style={{
                  ...styles.input, height: 150,
                  textAlignVertical: "top",
                }} placeholder="" value={description} onChangeText={(description) => setDescription(description)} />

              <View style={{ alignItems: "flex-end", width: 300, }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#14a800",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginBottom: 7
                  }}
                  onPress={PostJob}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Post job
                  </Text>
                </TouchableOpacity>
              </View>


            </View>


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
              <View style={{...styles.modalView, height: 120}}>

                <View style={{ flexDirection: "column", }}>
                  <Text style={{
                    paddingLeft: 5,
                    marginBottom: 5,
                    fontSize: 18,
                    color: "#555",
                    fontFamily: "sans-serif-light",
                    textAlign: 'center',
                    lineHeight: 25
                  }}>Job posted successfully.</Text>

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
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: '100%'
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

  title: {
    fontSize: 22,
    marginTop: 3,
    fontWeight: "bold",
    color: "#555"
  },
  caption: {
    fontSize: 16,
    lineHeight: 18,
  },
  title2: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption2: {
    fontSize: 16,
    lineHeight: 22,
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

export default PostAJob;
