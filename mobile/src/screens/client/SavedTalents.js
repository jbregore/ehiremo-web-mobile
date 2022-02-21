import React, { useState, useEffect, useCallback } from "react";
import { Avatar, } from "react-native-paper";
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
  ScrollView,
  Picker,
  Pressable,
  AsyncStorage,
  RefreshControl,
  Modal
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import StarRating from 'react-native-star-rating';

import MyImage from "../../assets/images/Talent";

const SavedTalents = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(1);

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  const [myId, setMyId] = useState("");
  const [freelancersId, setFreelancersId] = useState([]);
  const [freelancersData, setFreelancersData] = useState([]);
  const [servicesOffer, setServicesOffer] = useState([]);

  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingInfo2, setLoadingInfo2] = useState(true);

  const [removedLoading, setRemovedLoading] = useState(true);
  const [freelancerCount, setFreelancerCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [search, setSearch] = useState("");

  const [state, setState] = React.useState({
    searches: "name",
    choosenIndex: 0
  });

  const loadData = () => {
    fetch("http://192.168.42.241/ehiremo/backend/api/users/user_fetch_self.php", {
      method: "GET",
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        const result = JSON.parse(responseJson);
        setMyId(result.user_id);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });

    let user_page = {
      pagee: currentPage,
    }
    fetch('http://192.168.42.241/ehiremo/backend/api/users/my_saved_freelancers.php', {
      method: 'POST',
      body: JSON.stringify(user_page),
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
        // console.log(result)
        setFreelancersId(result)
        setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });

    //FREELANCER COUNT
    fetch('http://192.168.42.241/ehiremo/backend/api/users/freelancer_count_saved.php', {
      method: 'GET',
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
        setFreelancerCount(result.total_freelancer_count.total_freelancer_count);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });
  }

  useEffect(() => {
    loadData();
  }, [isFocused]);

  useEffect(() => {
    let datas = [];
    for (let row of freelancersId) {

      fetch('http://192.168.42.241/ehiremo/backend/api/users/view_profile_id.php', {
        method: 'POST',
        body: JSON.stringify({ id: row.freelancer_id }),
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
          // console.log(result)
          // setFreelancersData(result)
          datas.push(result);
        })
        .catch((error) => {
          console.log(error)
        });

      // let services = row.services_offer.split(',');
      // datas.push({ service: services, id: row.user_id });
    }

    setTimeout(() => {
      setFreelancersData(datas);
      setLoadingInfo2(false);
    }, 200)

  }, [freelancersId])

  useEffect(() => {
    let datas = [];

    const fetchData = () => {
      for (let row of freelancersData) {
        let services = row.services_offer.split(',');
        datas.push({ service: services, id: row.user_id });
      }
    }


    setTimeout(() => {
      for (let index = 0; index < 3; index++) {
        if (datas.length === 0) {
          fetchData();
        } else {
          setServicesOffer(datas);
          break;
        }
      }
      // console.log(datas)
      // setTimeout(() => {
      //   // console.log(servicesOffer)
      // }, 400)
    }, 400)

  }, [freelancersData])

  const removeFreelancer = (id) => {
    fetch('http://192.168.42.241/ehiremo/backend/api/users/remove_saved_freelancer.php', {
      method: 'DELETE',
      body: JSON.stringify({ freelancer_id: id }),
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
        console.log(result)
        setTimeout(() => {
          loadData();
          setModalAlert(true);
          setAlertText("Freelancer removed successfully.");
        }, 200)
        // setRemovedLoading(false);

        // setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });
  }

  const inviteFreelancer = (id) => {
    fetch('http://192.168.42.241/ehiremo/backend/api/messages/send_message.php', {
      method: 'POST',
      body: JSON.stringify({
        incoming_msg_id: id,
        msg: "Hi i would like to talk and make an appointment with you."
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
        const result = JSON.parse(responseJson);
        console.log(result)
        if (result.message === "1 message sent") {
          setModalAlert(true);
          setAlertText("Invitation sent successfully.");
          //SEND NOTIF
          fetch('http://192.168.42.241/ehiremo/backend/api/notification/create_notification.php', {
            method: 'POST',
            body: JSON.stringify({
              notif_text: "Invite you for a job.",
              notif_from: myId,
              notif_to: id
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
              const result = JSON.parse(responseJson);

            })
            .catch((error) => {
              //Hide Loader
              console.log(error)
            });


        }
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false)
    }, 1000)
  }, []);

  const FreelancerList = freelancersData.map((row) => (
    <View
      style={{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#c3c3c3",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
      }}
      key={row.user_id}
    >
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        <Avatar.Image
          // style={{ width: 55, height: 55, marginTop: 10, borderRadius: '50%', }}
          // source={MyImage.img_1}
          style={{ marginTop: 5 }}
          size={55}
          source={{
            uri: row.profile_photo || sampleProfile
          }}
        // resizeMode="contain"
        />
        <View style={{ marginLeft: 15, flexDirection: "column", maxWidth: 190  }}>
          <TouchableOpacity onPress={() => viewProfile(row.user_id)}>
            <Text style={{ ...styles.title2, color: "#14a800", textDecorationLine: 'underline' }}>
              {row.name}
            </Text>
          </TouchableOpacity>
          <Text style={styles.caption2}>{row.address}</Text>
          <View style={{ flexDirection: "row" }}>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={Number(row.rating)}
              // style={{color: 'red'}}
              starSize={16}
              fullStarColor="#14a800"
              emptyStarColor="#14a800"
            // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
        </View>

        <View
          style={{
            // marginLeft: 15,
            // position: 'relative',
            // right: 30,
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            // width: "35%",
            // backgroundColor: 'green'
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: "#14a800",
              width: 40,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginBottom: 7,
              marginRight: 8,
            }}
            onPress={() => removeFreelancer(row.user_id)}
          >
            <FontAwesome name="trash-o" size={16} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: "#14a800",
              width: 60,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginBottom: 7,
              marginRight: 7,
            }}
            onPress={() => inviteFreelancer(row.user_id)}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              Invite
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "column" }}>
        <Text style={styles.caption2}>
          {row.self_intro}
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Age - {row.age} years old
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          {row.rate}
        </Text>

        <View style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }}>
          {servicesOffer.map((item, index) => {
            if (item.id === row.user_id) {
              return (
                <Text key={index}>
                  {item.service.map((itemm, index) => (
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
                        marginBottom: 5
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#555",
                        }}
                      >
                        {itemm}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </Text>
              )


            }
          })}
          {/* {row.user_id === ? } */}



        </View>

      </View>

    </View>
  ));

  const viewProfile = async (profile_userid) => {
    try {
      await AsyncStorage.removeItem('id');
      await AsyncStorage.setItem('id', profile_userid);
      navigation.navigate('ClientViewProfile');
    }
    catch (error) {
      console.log(error)
    }
    // console.log(freelancersData)
  }

  const sigeSearch = () => {
    // alert("tae")
    // alert(state.searches)
    let search_data = {
      search: search,
      filter: state.searches,
      pagee: 1
    }

    fetch("http://192.168.42.241/ehiremo/backend/api/users/search_freelancer_saved.php", {
      method: "POST",
      body: JSON.stringify(search_data),
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        const result = JSON.parse(responseJson);
        // setMyId(result.user_id);
        console.log(result);
        let gago = [];
        for (let row of result) {
          gago.push({ freelancer_id: row.freelancer_id })
        }
        setTimeout(() => {
          setFreelancersId(gago)
        }, 300)
        // setFreelancersData(result);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });

    fetch("http://192.168.42.241/ehiremo/backend/api/users/freelancer_count_search_saved.php", {
      method: "POST",
      body: JSON.stringify(search_data),
      headers: {
        //Header Defination
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((responseJson) => {
        //Hide Loader
        const result = JSON.parse(responseJson);
        // setMyId(result.user_id);
        console.log(result);
        // setFreelancersData(result);
        setFreelancerCount(result.total_freelancer_count);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });

  }

  return (
    <SafeAreaView style={styles.container}>
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
          />
        </TouchableOpacity>
        <View style={{ alignItems: "flex-start", marginLeft: 50, marginTop: 5 }}>
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>My Saved Freelancers</Text>
        </View>
      </View>
      <View style={styles.screen}>

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>

          <View style={{
            paddingHorizontal: 10,
            marginBottom: 20,
            marginTop: 20,
          }}>
            <TextInput style={styles.input} placeholder="Search"
              value={search} onChangeText={(search) => setSearch(search)}
            />

            <Pressable
              activeOpacity={0.5}
              style={{
                textAlign: "center",
                backgroundColor: "#14a800",
                width: 45,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginBottom: 7,
                marginLeft: 'auto',
                marginTop: -45,
                marginRight: 5
              }}
              onPress={sigeSearch}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Go
              </Text>
            </Pressable>

            <Text style={{ ...styles.caption, justifyContent: "flex-end" }}>{freelancerCount} Saved Freelancers</Text>
          </View>

          <View style={{
            paddingHorizontal: 10,
            marginBottom: 5,
            flex: 1,
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'space-between'
          }}>

            <View style={{
              justifyContent: "center",
              width: '50%', textAlign: 'right'
            }}>
              <Text style={{
                ...styles.caption, marginBottom: 3, textAlign: 'right',
              }}>Filter by :
              </Text>
            </View>

            <View
              style={{
                width: 160,
                borderColor: "#c3c3c3",
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: 'flex-start'
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
                <Picker.Item label="Name" value="name" />
                <Picker.Item label="Location" value="location" />
                <Picker.Item label="Age" value="age" />
                <Picker.Item label="Rating" value="rating" />
                <Picker.Item label="Services" value="services_offer" />
              </Picker>
            </View>

          </View>


          {loadingInfo2 ? (<View></View>) : (<>{FreelancerList}</>)}


        </ScrollView>

      </View>

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
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },

  input: {
    width: "100%",
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
  },
  caption: {
    fontSize: 16,
    lineHeight: 18,
  },
  title2: {
    fontSize: 18,
    marginTop: 3,
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

export default SavedTalents;