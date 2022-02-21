import React, { useState, useEffect, useCallback } from "react";

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
  RefreshControl,
  Modal,
  Pressable,
  AsyncStorage
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import MyImage from "../../assets/images/Talent";
import { Avatar, } from "react-native-paper";

const AppliedJobs = ({ navigation }) => {
  const isFocused = useIsFocused();

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsId, setJobsId] = useState([]);
  const [jobsData, setJobsData] = useState([]);
  const [servicesOffer, setServicesOffer] = useState([]);
  const [userPhoto, setUserPhoto] = useState([]);
  const [name, setName] = useState([]);
  const [jobCreatedAt, setJobCreatedAt] = useState([]);
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingInfo2, setLoadingInfo2] = useState(true);
  const [myId, setMyId] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [search, setSearch] = useState("");

  const [state, setState] = React.useState({
    searches: "job_headline",
    choosenIndex: 0
  });

  const loadData = () => {
    setLoadingInfo2(true);
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
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/my_applied_jobs.php', {
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
        console.log(result)
        setJobsId(result);
        setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });

    //JOBS COUNT
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/applied_job_post_count.php', {
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
        // console.log(result.total_job_count.total_job_count);
        setAppliedJobsCount(result.total_job_count.total_job_count);
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
      setLoadingInfo2(false);
      setRefreshing(false)
    }, 1000)
  }, []);

  useEffect(() => {
    loadData();
  }, [isFocused]);

  useEffect(() => {
    let datas = [];
    for (let row of jobsId) {
      fetch('http://192.168.42.241/ehiremo/backend/api/jobs/fetch_edit_job.php?id=' + row.job_post_id, {
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
          datas.push(result);
        })
        .catch((error) => {
          console.log(error)
        });

    }

    setTimeout(() => {
      setJobsData(datas);
    }, 200)
  }, [jobsId])

  useEffect(() => {
    let datas = [];
    let datas1 = [];
    let datas2 = [];
    let datas3 = [];


    const fetchData = () => {
      for (let row of jobsData) {
        // console.log(row)
        fetch('http://192.168.42.241/ehiremo/backend/api/users/view_profile_id.php', {
          method: 'POST',
          body: JSON.stringify({ id: row.user_id }),
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
            // console.log(result.total_proposal_count.total_proposal_count)
            datas1.push({ profile_pic: result.profile_photo, id: row.id });
            datas2.push({ name: result.name, id: row.id });
            // console.log(datas2);
          })
          .catch((error) => {
            //Hide Loader
            console.log(error)
          });

        fetch('http://192.168.42.241/ehiremo/backend/api/jobs/get_time_created.php', {
          method: 'POST',
          body: JSON.stringify({ createdAt: row.job_createdAt }),
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
            datas3.push({ created_at: result, id: row.id });
          })
          .catch((error) => {
            //Hide Loader
            console.log(error)
          });
      }

      for (let row of jobsData) {
        let services = row.job_services.split(',');
        datas.push({ service: services, id: row.id });
      }

    }

    fetchData();


    setTimeout(() => {
      for (let index = 0; index < 5; index++) {
        if (datas.length === 0) {
          fetchData();
        } else {
          setServicesOffer(datas);
          setUserPhoto(datas1);
          setName(datas2);
          setJobCreatedAt(datas3);
          setLoadingInfo2(false);
          break;
        }
      }
    }, 400)
  }, [jobsData])

  const cancelApply = (id) => {
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/decline_proposal.php', {
      method: 'DELETE',
      body: JSON.stringify({
        job_idd: id,
        user_idd: myId
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
        console.log(result);
        setModalAlert(true);
        setAlertText("Application has been cancelled.");
        loadData();
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });
  }

  const viewProfile = async (profile_userid) => {
    try {
      await AsyncStorage.removeItem('id');
      await AsyncStorage.setItem('id', profile_userid);
      navigation.navigate('TalentViewProfile');
    }
    catch (error) {
      console.log(error)
    }
  }

  const AppliedJobsComponent = jobsData.map((row) => (
    <View style={{
      borderRadius: 5, borderWidth: 1, borderColor: "#c3c3c3",
      paddingHorizontal: 10, paddingVertical: 10, marginTop: 10
    }} key={row.id}>

      <View style={{ flexDirection: "column" }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <View style={{ width: 220, marginBottom: 7 }}>
            <Text style={{ ...styles.title2, color: "#14a800" }}>
              {row.job_headline}</Text>
            <Text style={{ ...styles.title2, color: "#555" }}>{row.job_location}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                textAlign: "center",
                backgroundColor: "#14a800",
                width: 80,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginBottom: 7,
                marginRight: 7
              }}
              onPress={() => cancelApply(row.id)}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ ...styles.caption2, color: "#000" }}>
          {row.job_desc}
        </Text>


        <View style={{ flexDirection: "row", marginBottom: 5, marginTop: 5 }}>
          {servicesOffer.map((item) => {
            if (item.id === row.id) {
              return (
                <Text key={Math.random()}>
                  {item.service.map((itemm) => (
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
                        marginBottom: 10,
                        marginBottom: 5
                      }}
                      key={Math.random()}
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
              );
            }
          })}
        </View>

        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Project Scope - {row.job_scope}
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Age Range - {row.job_age}
        </Text>

        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          {row.job_rate_desc} - posted {jobCreatedAt.map((item) => {
            if (item.id === row.id) {
              return (
                item.created_at
              );
            }
          })}
        </Text>
        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Budget - {row.job_rate}
        </Text>

        <Text style={{ ...styles.caption2, color: "#555", marginTop: 5 }}>
          Location - {row.job_location}
        </Text>

        <View style={{
          alignItems: "flex-end", marginTop: -30,
          paddingBottom: 20
        }}>
          {
            userPhoto.map((item) => {
              if (item.id === row.id) {
                return (
                  <Avatar.Image
                    style={{ marginTop: 10, marginRight: 30 }}
                    size={55}
                    source={{
                      uri: item.profile_pic || sampleProfile
                    }}
                    key={Math.random()}
                  />
                );
              }
            })
          }
          <TouchableOpacity onPress={() => viewProfile(row.user_id)}>
            <Text style={{
              ...styles.caption2, color: "#555",
              marginRight: 20,
              marginTop: 5,
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
              textDecorationColor: "#c3c3c3"
            }}>
              by: {name.map((item) => {
                if (item.id === row.id) {
                  return (
                    item.name
                  );
                }
              })}
            </Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  ))

  const sigeSearch = () => {
    // alert("tae")
    // alert(state.searches)
    let search_data = {
      search: search,
      filter: state.searches,
      pagee: 1
    }

    fetch("http://192.168.42.241/ehiremo/backend/api/jobs/search_my_applied_jobs.php", {
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
        setJobsId(result)
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });

    fetch("http://192.168.42.241/ehiremo/backend/api/jobs/search_applied_job_post_count.php", {
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
        // console.log(result);
        setAppliedJobsCount(result.total_job_count)
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
        <View style={{ alignItems: "flex-start", marginLeft: 63, marginTop: 5 }}>
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>
            My Applied Jobs</Text>
        </View>
      </View>
      <View style={styles.screen}>

        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

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


            <Text style={{ ...styles.caption, justifyContent: "flex-end" }}>{appliedJobsCount} Applied Jobs.</Text>
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
                <Picker.Item label="Headline" value="job_headline" />
                <Picker.Item label="Services" value="job_services" />
                <Picker.Item label="Age" value="job_age_range" />
                <Picker.Item label="Project Scope" value="job_scope" />
                <Picker.Item label="Budget" value="job_rate" />
                <Picker.Item label="Location" value="job_location" />
              </Picker>
            </View>

          </View>


          {/* DINE */}
          {loadingInfo2 ? (<View></View>) : (<>{AppliedJobsComponent}</>)}


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

export default AppliedJobs;
