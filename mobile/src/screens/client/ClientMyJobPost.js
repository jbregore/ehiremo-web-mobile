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
  Modal,
  Pressable,
  RefreshControl,
  AsyncStorage
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Avatar, } from "react-native-paper";
import RadioButton from "react-native-radio-button";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import MyImage from "../../assets/images/Talent";
import StarRating from 'react-native-star-rating';


const ClientMyJobPost = ({ navigation }) => {

  const [state, setState] = React.useState({
    searches: "job_headline",
    choosenIndex: 0
  });

  const isFocused = useIsFocused();

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";
  
  const [currentPage, setCurrentPage] = useState(1);
  const [myJobs, setMyJobs] = useState([]);
  const [myJobsCount, setMyJobsCount] = useState(0);
  const [jobCreatedAt, setJobCreatedAt] = useState([]);
  const [proposalProfile, setProposalProfile] = useState([]);

  const [loadingProposal, setLoadingProposal] = useState(true);
  const [loadingInfo2, setLoadingInfo2] = useState(true);

  const [servicesOffer, setServicesOffer] = useState([]);
  const [proposalCount, setProposalCount] = useState([]);
  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [modalProposal, setModalProposal] = useState(false);
  const [declineProposalModal, setDeclineProposalModal] = useState(false);
  const [modalProposalCount, setModalProposalCount] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false)
    }, 1000)
  }, []);

  const loadData = () => {
    // setLoadingInfo(false);
    // setLoadingInfo2(false);
    let user_page = {
      pagee: currentPage,
    }
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/fetch_my_job_post.php', {
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
        setTimeout(() => {
          setMyJobs(result);
          // setLoadingInfo2(false);
        }, 200)
        // setFreelancersId(result)
        // setLoadingInfo(false);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });

    //JOBS COUNT
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/my_job_post_count.php', {
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
        // console.log(result.total_job_count.total_job_count)
        setMyJobsCount(result.total_job_count.total_job_count);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });
  }

  useEffect(() => {
    loadData();
    setLoadingInfo2(false);
    setDeclineProposalModal(false);
    setRefreshing(false);
  }, [isFocused]);

  useEffect(() => {
    let datas = [];
    let datas1 = [];
    let datas2 = [];
    for (let row of myJobs) {
      let services = row.job_services.split(',');
      datas.push({ service: services, id: row.id });
    }

    for (let row of myJobs) {
      //PROPOSAL COUNT
      fetch('http://192.168.42.241/ehiremo/backend/api/jobs/proposal_count.php', {
        method: 'POST',
        body: JSON.stringify({ id: row.id }),
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
          // console.log(result.total_proposal_count.total_proposal_count)
          datas1.push({ proposal_count: result.total_proposal_count.total_proposal_count, id: row.id });
        })
        .catch((error) => {
          //Hide Loader
          console.log(error)
        });

      // CREATED AT 
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
          console.log(result)
          datas2.push({ created_at: result, id: row.id });
        })
        .catch((error) => {
          //Hide Loader
          console.log(error)
        });

    }


    setTimeout(() => {
      // console.log(datas)
      setServicesOffer(datas);
      setProposalCount(datas1);
      setJobCreatedAt(datas2);
      setTimeout(() => {
        // console.log(servicesOffer)
      }, 200)
    }, 200)
  }, [myJobs])

  const removeJobPost = (id) => {
    //REMOVE JOB
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/delete_job.php', {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
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
        setAlertText("Job post removed successfully.");
        setModalAlert(true);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error)
      });


  }

  const MyJobPostControls = (props) => {
    const [viewControls, setViewControls] = useState(false);
    const [modalVisibleDelete, setmodalVisibleDelete] = useState(false);
    const [modalVisibleEdit, setmodalVisibleEdit] = useState(false);

    //EDIT JOB POST
    const [rate, setRate] = useState("");
    const [myService, setMyService] = useState([]);
    const [stateEdit, setStateEdit] = useState({
      searches: "",
      choosenIndex: 0
    });

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

    const [jobEditData, setJobEditData] = useState([]);
    const [saveChangesModal, setSaveChangesModal] = useState(false);


    //JOB POST EDIT
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

    const EditJob = (job_id) => {
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
          job_id_edit: job_id,
          job_headline: headline.charAt(0).toUpperCase() + headline.slice(1),
          job_location: NewLocation,
          job_services: myService,
          job_age: age,
          job_scope: stateEdit.searches,
          job_rate_desc: rate,
          job_rate: hourly.charAt(0).toUpperCase() + hourly.slice(1) || fixed.charAt(0).toUpperCase() + fixed.slice(1),
          job_desc: description.charAt(0).toUpperCase() + description.slice(1)
        }


        //EDIT JOB
        fetch('http://192.168.42.241/ehiremo/backend/api/jobs/save_changes_edit_job.php', {
          method: 'PUT',
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
            setModalAlert(true);
            setAlertText("Job post updated successfully.");
            // setSaveChangesModal(false);
            // loadData();

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

    const openJobEdit = (id) => {
      fetch('http://192.168.42.241/ehiremo/backend/api/jobs/fetch_edit_job.php?id=' + id, {
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
          console.log(result);
          setJobEditData(result);
          setHeadline(result.job_headline);
          setLocation(result.job_location);
          let dataService = result.job_services.split(",");
          setMyService(dataService);
          setStateEdit({
            searches: result.job_scope,
          })
          setAge(result.job_age);
          setDescription(result.job_desc);
          if (result.job_rate_desc === "Fixed Rate") {
            setRate("Fixed Rate");
            setHourly("");
            setFixed(result.job_rate);
          } else {
            setRate("Hourly Rate");
            setFixed("");
            setHourly(result.job_rate);
          }
          setmodalVisibleEdit(true);
          // console.log(result);
        })
        .catch((error) => {
          //Hide Loader
          console.log(error)
        });

    }

    const EditConfirmationControls = (props) => {

      // useEffect(()=> {
      //   setSaveChangesModal(props.open)
      // }, [props.open])

      return (

        < Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setSaveChangesModal(!saveChangesModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View style={{ flexDirection: "column", }}>
                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 18,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                  textAlign: 'center',
                  lineHeight: 25
                }}>Are you sure you want {'\n'} to update this job post ? </Text>

              </View>

              <View style={{
                flexDirection: "row", position: "absolute", bottom: 10,
                width: '100%', justifyContent: 'center', right: 0
              }}>
                <Pressable
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#ccc",
                    width: 70,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    marginBottom: 7,
                    marginRight: 8,
                  }}
                  onPress={() => setSaveChangesModal(false)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#555",
                    }}
                  >
                    Cancel
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
                    marginRight: 8,
                  }}
                  onPress={() => EditJob(props.job_id)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Save
                  </Text>
                </Pressable>



              </View>
            </View>
          </View>
        </Modal >



      )
    }

    useEffect(() => {
      setSaveChangesModal(saveChangesModal)
    }, [saveChangesModal])

    return (
      <View >
        <Entypo name="dots-three-horizontal" size={24} color="#555"
          style={{ marginLeft: 20 }} onPress={() => {
            setViewControls(!viewControls)
          }} />

        {viewControls ? (
          <>
            <View style={{
              width: 90, height: 80, backgroundColor: '#f1f1f1', position: 'absolute',
              marginLeft: -40, marginRight: 10, marginTop: 25, paddingRight: 15, borderRadius: 10,
              paddingTop: 15, zIndex: 1
            }}>
              <TouchableOpacity onPress={() => openJobEdit(props.id)}>
                <Text style={{ lineHeight: 32, textAlign: 'right' }}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setmodalVisibleDelete(true)}>
                <Text style={{ lineHeight: 30, textAlign: 'right' }}>Remove</Text>
              </TouchableOpacity>
            </View>

            {/* MODAL DELETE*/}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleDelete}
              onRequestClose={() => {
                // 
                setmodalVisibleDelete(!modalVisibleDelete);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>

                  <View style={{ flexDirection: "column", }}>
                    <Text style={{
                      paddingLeft: 5,
                      marginBottom: 5,
                      fontSize: 18,
                      color: "#555",
                      fontFamily: "sans-serif-light",
                      textAlign: 'center',
                      lineHeight: 25
                    }}>Are you sure you want {'\n'} to delete this post ? </Text>

                  </View>

                  <View style={{
                    flexDirection: "row", position: "absolute", bottom: 10,
                    width: '100%', justifyContent: 'center', right: 0
                  }}>
                    <Pressable
                      activeOpacity={0.5}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#ccc",
                        width: 70,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                        marginBottom: 7,
                        marginRight: 8,
                      }}
                      onPress={() => setmodalVisibleDelete(!modalVisibleDelete)}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#555",
                        }}
                      >
                        Cancel
                      </Text>
                    </Pressable>

                    <Pressable
                      activeOpacity={0.5}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#f44336",
                        width: 70,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 30,
                        marginBottom: 7,
                        marginRight: 8,
                      }}
                      onPress={() => removeJobPost(props.id)}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#fff",
                        }}
                      >
                        Delete
                      </Text>
                    </Pressable>



                  </View>
                </View>
              </View>
            </Modal>

            {/* MODAL EDIT*/}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleEdit}
            // onRequestClose={() => {
            //   // 
            //   setmodalVisibleEdit(!modalVisibleEdit);
            // }}
            >
              <View style={{ ...styles.centeredView, paddingBottom: 90 }}>
                <View style={{
                  width: 320, backgroundColor: "#fff",
                  marginTop: 120, borderRadius: 20, height: '100%',
                }} >

                  <ScrollView showsVerticalScrollIndicator={false} >

                    <View style={{
                      marginBottom: 15, alignItems: "center",
                      borderRadius: 20,
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
                        <TextInput style={styles.input} placeholder=""
                          value={headline} onChangeText={(headline) => setHeadline(headline)}
                        />

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
                        <TextInput style={styles.input} placeholder=""
                          value={location} onChangeText={(location) => setLocation(location)}
                        />

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
                          <TextInput style={styles.input} placeholder=""
                            value={service} onChangeText={(service) => setService(service)}
                          />
                          <View style={{
                            marginTop: -30, zIndex: 1,
                            marginRight: 12, marginBottom: 15, width: 40,
                            height: 13, alignSelf: 'flex-end',
                          }}>
                            <Pressable style={{
                              backgroundColor: '#14a800',
                              position: 'relative', justifyContent: 'center', width: 40,
                              height: 25, marginTop: -12,
                            }}
                              onPress={addService}
                            >
                              <Text style={{ textAlign: 'center', color: "#fff" }}>Add</Text>
                            </Pressable>

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
                                <Pressable
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
                                </Pressable>
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
                        <TextInput style={styles.input} placeholder=""
                          value={age} onChangeText={(age) => setAge(age)}
                        />

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
                            selectedValue={stateEdit.searches}
                            onValueChange={(
                              itemValue, itemPosition
                            ) => setStateEdit({
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
                            marginRight: 10,
                            backgroundColor: rate === "Fixed Rate" ? '#efefef' : '#fff'
                          }} placeholder=""
                            value={hourly} onChangeText={(hourly) => setHourly(hourly)}
                            editable={rate === "Fixed Rate" ? false : true}
                          />
                          <TextInput style={{
                            ...styles.input, width: 150,
                            backgroundColor: rate === "Hourly Rate" ? '#efefef' : '#fff'
                          }} placeholder=""
                            value={fixed} onChangeText={(fixed) => setFixed(fixed)}
                            editable={rate === "Hourly Rate" ? false : true}
                          />
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
                          }} placeholder=""
                          value={description} onChangeText={(description) => setDescription(description)}
                        />

                        <View style={{
                          justifyContent: "flex-end", width: 300,
                          flexDirection: 'row'
                        }}>
                          <Pressable
                            activeOpacity={0.5}
                            style={{
                              textAlign: "center",
                              backgroundColor: "#ccc",
                              width: 100,
                              height: 30,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30,
                              marginBottom: 7,
                              marginRight: 8
                            }}
                            onPress={() => setmodalVisibleEdit(false)}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#555",
                              }}
                            >
                              Cancel
                            </Text>
                          </Pressable>

                          <Pressable
                            activeOpacity={0.5}
                            style={{
                              textAlign: "center",
                              backgroundColor: "#14a800",
                              width: 130,
                              height: 30,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30,
                              marginBottom: 7
                            }}
                            // onPress={() => EditJob(props.id)}
                            onPress={() => setSaveChangesModal(true)}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: "#fff",
                              }}
                            >
                              Save changes
                            </Text>
                          </Pressable>
                        </View>



                      </View>


                    </View>


                  </ScrollView>

                  {saveChangesModal ? (<><EditConfirmationControls job_id={props.id} /></>) : (<></>)}




                </View>
              </View>
            </Modal>


          </>


        ) : (<></>)}
      </View>

    )

  }

  const showProposals = (id) => {
    {
      proposalCount.map((item) => {
        if (item.id === id) {
          setModalProposalCount(item.proposal_count);
        }
      })
    }

    let proposal_data = {
      id: id
    }
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/fetch_proposals.php', {
      method: 'POST',
      body: JSON.stringify(proposal_data),
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
        if (result.length === 0) {
          return;
        }
        console.log(result);
        setTimeout(() => {
          setProposalProfile(result);
          setModalProposal(true);
          // setLoadingInfo2(false);
        }, 200)
      })
      .catch((error) => {
        console.log(error)
      });

  }

  const DeclineProposalControls = (props) => {

    return (

      < Modal
        animationType="slide"
        transparent={true}
        visible={props.open}
        onRequestClose={() => {
          setDeclineProposalModal(!declineProposalModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>Are you sure you want {'\n'} to decline this proposal ? </Text>

            </View>

            <View style={{
              flexDirection: "row", position: "absolute", bottom: 10,
              width: '100%', justifyContent: 'center', right: 0
            }}>
              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#ccc",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                }}
                onPress={() => setDeclineProposalModal(false)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#555",
                  }}
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                activeOpacity={0.5}
                style={{
                  textAlign: "center",
                  backgroundColor: "#f44336",
                  width: 70,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  marginBottom: 7,
                  marginRight: 8,
                }}
                onPress={() => declineProposal(props.job_id, props.id)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Delete
                </Text>
              </Pressable>



            </View>
          </View>
        </View>
      </Modal >



    )
  }

  const declineProposal = (job_id, id) => {
    let remove_apply_data = {
      job_idd: job_id,
      user_idd: id
    }
    fetch('http://192.168.42.241/ehiremo/backend/api/jobs/decline_proposal.php', {
      method: 'DELETE',
      body: JSON.stringify(remove_apply_data),
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
        setModalAlert(true);
        setAlertText("Deleted");
        setModalProposal(false);
        // loadData();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const MyJobsComponent = myJobs.map((row) => (
    <View style={{
      borderRadius: 5, borderWidth: 1, borderColor: "#c3c3c3",
      paddingHorizontal: 10, paddingVertical: 10, marginTop: 10, marginBottom: 10
    }} key={row.id}>

      <View style={{ flexDirection: "column" }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between", marginBottom: 15
        }}>
          <View style={{ width: 150 }}>
            <Text style={{ ...styles.title2, color: "#14a800" }}>
              {row.job_headline}</Text>
            <Text style={{ ...styles.title2, color: "#555" }}>
              {row.job_location}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View>
              <TouchableOpacity onPress={() => showProposals(row.id)}>
                <Text
                  style={{ ...styles.caption2, color: "#555", textDecorationLine: 'underline' }}>
                  {proposalCount.map((item) => {
                    if (item.id === row.id) {
                      return (
                        item.proposal_count
                      );
                    }
                  })} proposals</Text>
              </TouchableOpacity>
            </View>


            <MyJobPostControls id={row.id} />


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
          Age Range - {row.job_age_range}
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

      </View>

    </View>
  ));
  // profile_userid
  const viewProfile = async (profile_userid) => {
    try {
      await AsyncStorage.removeItem('id');
      await AsyncStorage.setItem('id', profile_userid);
      navigation.navigate('ClientViewProfile');
    }
    catch (error) {
      console.log(error)
    }
  }

  const sigeSearch = () => {
    // alert("tae")
    // alert(state.searches)
    let search_data = {
      search: search,
      filter: state.searches,
      pagee: 1
    }

    fetch("http://192.168.42.241/ehiremo/backend/api/jobs/search_job_post.php", {
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
        setMyJobs(result);
        // setFreelancersData(result);
      })
      .catch((error) => {
        //Hide Loader
        console.log(error);
      });

    fetch("http://192.168.42.241/ehiremo/backend/api/jobs/my_job_post_count_search.php", {
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
        setMyJobsCount(result.total_job_count.total_job_count);
        // console.log(result.total_freelancer_count.total_freelancer_count);
        // setFreelancersData(result);
        // setFreelancerCount(result.total_freelancer_count.total_freelancer_count);
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
        <View style={{ alignItems: "flex-start", marginLeft: 58, marginTop: 5 }}>
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>
            My Job Postings </Text>
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

            <Text style={{ ...styles.caption, justifyContent: "flex-end" }}>{myJobsCount} Jobs found</Text>

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


          {/* DINE  */}
          {loadingInfo2 ? (<View></View>) : (<>{MyJobsComponent}</>)}


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
                      loadData();
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

          {/* MODAL PROPOSAL*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalProposal}
            onRequestClose={() => {
              setModalProposal(!modalProposal);
            }}
          >
            <View style={{ ...styles.centeredView, paddingHorizontal: 10, }}>
              <View style={{ ...styles.modalView, width: 340, paddingVertical: 50, }}>
                <View style={{ width: '100%', marginTop: -30 }}>
                  <AntDesign name="close" size={20} color="#555"
                    style={{ textAlign: 'right' }} onPress={() => setModalProposal(!modalProposal)} />
                </View>

                <View style={{ flexDirection: "column", }}>
                  <Text style={{
                    paddingLeft: 5,
                    marginBottom: 15,
                    marginTop: -10,
                    fontSize: 16,
                    color: "#555",
                    fontFamily: "sans-serif-light",
                    textAlign: 'left',
                    lineHeight: 25, width: 300,
                    fontWeight: 'bold'
                  }}>You have {modalProposalCount} proposals from</Text>
                </View>


                {proposalProfile.map((item, index) => (
                  <View style={{
                    width: '100%', height: 80, borderBottomColor: "#ccc", borderBottomWidth: 1, marginTop: 10,
                    paddingHorizontal: 6, flexDirection: 'row', justifyContent: 'space-between'
                  }} key={index}>
                    <Avatar.Image
                      style={{ marginTop: 11 }}
                      size={45}
                      source={{
                        uri: item.profile_photo || sampleProfile
                      }}
                    />

                    <View style={{ marginTop: 8, maxWidth: 150 }}>
                      <Text style={{ color: "#555", fontSize: 14 }}>Freelancer: <Text style={{ color: "#1d4354" }}>{item.name}</Text></Text>
                      <Text style={{ color: "#555", fontSize: 14 }}>Address: <Text style={{ color: "#1d4354" }}>{item.address}</Text></Text>
                      <View style={{ flexDirection: 'row', width: '100%' }}>
                        <Text style={{marginRight: 4}}>
                          Rating: {item.rating.substring(0, 4)}
                        </Text>
                        <View style={{
                          flexDirection: "row", justifyContent: 'flex-start',
                          marginBottom: -5,
                          marginLeft: 4
                        }}>
                          <StarRating
                            maxStars={5}
                            rating={Number(item.rating)}
                            starSize={16}
                            fullStarColor="#14a800"
                            emptyStarColor="#14a800"
                          />
                        </View>
                      </View>


                    </View>

                    <View style={{ marginTop: 8 }}>
                      <Pressable style={{
                        backgroundColor: '#14a800',
                        position: 'relative', justifyContent: 'center',
                        height: 25, paddingHorizontal: 6, borderRadius: 3, width: 85,
                        alignItems: 'center'
                      }} onPress={() => viewProfile(item.user_id)}>
                         {/* onPress={() => viewProfile(item.profile_userid)} */}
                        <Text style={{ color: '#fff', fontSize: 14 }}>View profile</Text>
                      </Pressable>

                      <Pressable style={{
                        backgroundColor: '#ccc',
                        position: 'relative', justifyContent: 'center',
                        height: 25, paddingHorizontal: 6, borderRadius: 3,
                        marginTop: 6, borderRadius: 3, width: 85, alignItems: 'center'
                      }} onPress={() => setDeclineProposalModal(true)}>
                        <Text style={{ color: '#555', fontSize: 14 }}>Decline</Text>
                      </Pressable>
                    </View>

                    <DeclineProposalControls open={declineProposalModal} job_id={item.job_post_id} id={item.user_id} />
                  </View>
                ))}






              </View>
            </View>
          </Modal>

        </ScrollView>
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

export default ClientMyJobPost;
