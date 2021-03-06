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
  RefreshControl,
  Dimensions,
  Pressable,
  Modal,
  AsyncStorage,
  Linking
} from "react-native";

import { Avatar } from "react-native-paper";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import MyImage from "../../assets/images/Client";
import StarRating from "react-native-star-rating";
import { Ionicons } from "@expo/vector-icons";
// import PDFReader from 'rn-pdf-reader-js';
// import * as OpenAnything from "react-native-openanything";
// import * as FileSystem from 'expo-file-system';
// import * as IntentLauncher from 'expo-intent-launcher';
// import PDFView from 'react-native-view-pdf';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const TalentViewProfile = ({ navigation, route }) => {
  // alert(route.params.id);

  const sampleProfile = "https://th.bing.com/th/id/R.782adc2b6062ab00461359da5b02b753?rik=Y%2fJZM98TPsfXxA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fProfile-PNG-File.png&ehk=nJ0Yls4aiMdSvREO5hB2GU7Hc3cL04UQeojwLhvL8Gk%3d&risl=&pid=ImgRaw&r=0";

  // const view_profile_id = route.params.id;
  const [viewProfileId, setViewProfileId] = useState("");
  const [info, setInfo] = useState({});
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [myService, setMyService] = useState([]);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [profileRole, setProfileRole] = useState("");
  const [start, setStart] = useState(1);
  const [limit, setLimit] = useState(10);
  const [services, setServices] = useState([]);

  const [appointmentList, setAppointmentList] = useState([]);
  const [freelancerProfile, setFreelancerProfile] = useState([]);
  const [loadingFProfile, setLoadingFProfile] = useState(false);
  const [jobHeadline, setJobHeadline] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  
  const [sampleImage, setSampleImage] = useState([]);
  const [expandSource, setExpandSource] = useState(
    "https://media.istockphoto.com/vectors/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-vector-id1128826884?k=6&m=1128826884&s=170667a&w=0&h=F6kUwTcsLXUojmGFxN2wApEKgjx63zcIshCSOmnfEFs="
  );
  const [expandView, setExpandView] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  // const sampleImage2 = [
  //   "http://localhost/ehiremo/backend/uploads/feedback_photos/61d953e428ce13.98408624.jpg",
  //   "http://localhost/ehiremo/backend/uploads/feedback_photos/61d953e4294fe9.44851010.jpg",
  //   "http://localhost/ehiremo/backend/uploads/feedback_photos/61d953e42cdb58.26595499.jpg",
  // ]

  const [imageTest, setImageTest] = useState(0);

  const imageChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );

      if (slide != imageTest) {
        setImageTest(slide);
      }
    }
  };

  const loadData = () => {
    async function fetchViewId() {
      try {
        // await console.log(AsyncStorage.getItem('key'));
        let resp = await AsyncStorage.getItem("id");
        // setViewProfileId(resp);
        fetch(
          "http://192.168.42.241/ehiremo/backend/api/users/view_profile_id.php",
          {
            method: "POST",
            body: JSON.stringify({ id: resp }),
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
            setInfo(result);
            setLoadingInfo(false);
            setUserProfile(result.user_id);
            setProfileRole(result.role);
            if (result.role === "freelancer") {
              let services = result.services_offer.split(",");
              setServices(services);
            }
            // if (!result.service_offer) {
            //   setMyService([]);
            // } else {
            //   let dataService = result.service_offer.split(",");
            //   setMyService(dataService);
            // }

            let profile_data = {
              id: result.user_id,
              role: result.role,
              start: start,
              limit: limit,
            };

            fetch(
              "http://192.168.42.241/ehiremo/backend/api/appointments/client_fetch_profile_appointments.php",
              {
                method: "POST",
                body: JSON.stringify(profile_data),
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

                let data = [];
                for (let row of result) {
                  let headline = "";
                  let profile_pic = "";
                  let profile_id = "";
                  let profile_name = "";
                  let profile_fname = "";
                  let profile_address = "";
                  let profile_rating = "";
                  let profile_userid = "";
                  let client_name = "";
                  let client_fname = "";
                  let client_userid = "";

                  //JOB POST INFO
                  fetch(
                    "http://192.168.42.241/ehiremo/backend/api/jobs/fetch_edit_job.php?id=" +
                    row.jobpost_id,
                    {
                      method: "GET",
                      headers: {
                        //Header Defination
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((response2) => response2.text())
                    .then((responseJson2) => {
                      //Hide Loader
                      const result2 = JSON.parse(responseJson2);
                      headline = result2.job_headline;
                      // console.log(result2);
                      // data.push({ ...row, headline: result2.job_headline });
                      // console.log(data);
                    })
                    .catch((error) => {
                      //Hide Loader
                      console.log(error);
                    });

                  //FREELANCER PROFILE
                  fetch(
                    "http://192.168.42.241/ehiremo/backend/api/users/view_profile_id.php",
                    {
                      method: "POST",
                      body: JSON.stringify({ id: row.freelancer_id }),
                      headers: {
                        //Header Defination
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((response2) => response2.text())
                    .then((responseJson2) => {
                      //Hide Loader
                      const result2 = JSON.parse(responseJson2);
                      console.log(result2);
                      profile_pic = result2.profile_photo;
                      profile_id = result2.jobpost_id;
                      profile_name = result2.name;
                      profile_address = result2.address;
                      profile_rating = result2.rating;
                      profile_userid = result2.user_id;
                      profile_fname = result2.fname;
                      // datas.push({
                      //   profile_pic: result.profile_photo, id: row.jobpost_id, name: result.name,
                      //   address: result.address, rating: result.rating
                      // });
                    })
                    .catch((error) => {
                      //Hide Loader
                      console.log(error);
                    });

                  //CLIENT PROFILE
                  fetch(
                    "http://192.168.42.241/ehiremo/backend/api/users/view_profile_id.php",
                    {
                      method: "POST",
                      body: JSON.stringify({ id: row.client_id }),
                      headers: {
                        //Header Defination
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((response2) => response2.text())
                    .then((responseJson2) => {
                      //Hide Loader
                      const result2 = JSON.parse(responseJson2);
                      console.log(result2);
                      client_name = result2.name;
                      client_fname = result2.fname;
                      client_userid = result2.user_id;
                      // datas.push({
                      //   profile_pic: result.profile_photo, id: row.jobpost_id, name: result.name,
                      //   address: result.address, rating: result.rating
                      // });
                    })
                    .catch((error) => {
                      //Hide Loader
                      console.log(error);
                    });

                  setTimeout(() => {
                    data.push({
                      ...row,
                      headline: headline,
                      profile_pic: profile_pic,
                      profile_id: profile_id,
                      profile_name: profile_name,
                      profile_address: profile_address,
                      profile_rating: profile_rating,
                      profile_userid: profile_userid,
                      profile_fname: profile_fname,
                      client_name: client_name,
                      client_fname: client_fname,
                      client_userid: client_userid,
                    });
                  }, 300);

                  // setAppointmentList(data);
                }

                setTimeout(() => {
                  setAppointmentList(data);
                  // console.log(data);
                  setLoadingFProfile(false);
                }, 500);
              })
              .catch((error) => {
                //Hide Loader
                console.log(error);
              });
          })
          .catch((error) => {
            //Hide Loader
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchViewId();
  };

  // useEffect(() => {
  // }, [appointmentList]);

  useEffect(() => {
    let datas = [];
    let datas2 = [];

    for (let row of appointmentList) {
      //FEEDBACKS INFO
      fetch(
        "http://192.168.42.241/ehiremo/backend/api/appointments/fetch_feedbacks.php?id=" +
        row.id,
        {
          method: "GET",
          headers: {
            //Header Defination
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response2) => response2.text())
        .then((responseJson2) => {
          //Hide Loader
          const result2 = JSON.parse(responseJson2);
          // headline = result2.job_headline;
          for (let rowew of result2) {
            datas.push(rowew);
          }
          // console.log(result2);
          // data.push({ ...row, headline: result2.job_headline });
          // console.log(data);
        })
        .catch((error) => {
          //Hide Loader
          console.log(error);
        });
    }

    for (let row of appointmentList) {
      console.log(row.id);
      //FEEDBACKS PHOTOS
      fetch(
        "http://192.168.42.241/ehiremo/backend/api/appointments/fetch_photos.php",
        {
          method: "POST",
          body: JSON.stringify({ id: row.id }),
          headers: {
            //Header Defination
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((response2) => response2.text())
        .then((responseJson2) => {
          //Hide Loader
          const result2 = JSON.parse(responseJson2);
          // headline = result2.job_headline;
          // console.log("tanga")
          // console.log(result2);
          for (let row of result2) {
            datas2.push(row);
          }
          // for (let rowew of result2) {
          //   datas.push(rowew);
          // }
          // console.log(result2);
          // data.push({ ...row, headline: result2.job_headline });
          // console.log(data);
        })
        .catch((error) => {
          //Hide Loader
          console.log(error);
        });
    }

    setTimeout(() => {
      setAppointmentData(datas);
      setSampleImage(datas2);
      console.log(datas2);
      // setJobHeadline(datas1);
    }, 200);
  }, [appointmentList]);

  // useEffect(() => {
  //   console.log(freelancerProfile);
  // }, [freelancerProfile])

  useEffect(() => {
    setInfo({});
    setLoadingInfo(true);
    setMyService([]);
    setUserProfile("");
    setProfileRole("");
    setStart(1);
    setLimit(10);
    setLoadingFProfile(false);
    setAppointmentList([]);
    setFreelancerProfile([]);
    setJobHeadline([]);
    setAppointmentData([]);
    // console.log(AsyncStorage.getItem('id'));

    // fetchViewId();
    loadData();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
    }, 1000);
  }, []);

  const showImageFull = (source) => {
    setExpandSource(source);
    setExpandView(true);
  };

  const FreelancerList = appointmentList.map((item, index) => {
    if (item.c_status === "done" && item.f_status === "done") {
      return (
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#c3c3c3",
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginBottom: 30,
          }}
          key={index}
        >
          <View style={{ flexDirection: "row", marginBottom: 15 }} key={index}>
            <Avatar.Image
              style={{ marginTop: 10 }}
              size={55}
              source={{
                uri: item.profile_pic || sampleProfile,
              }}
            />
            <View
              style={{ marginLeft: 15, flexDirection: "column", marginTop: 10 }}
            >
              <TouchableOpacity
                onPress={() => viewProfile(item.profile_userid)}
              >
                <Text
                  style={{
                    ...styles.caption2,
                    textDecorationLine: "underline",
                    color: "#14a800",
                  }}
                >
                  {item.profile_name}
                </Text>
              </TouchableOpacity>
              {/* <Text style={styles.caption2}><Text style={{ fontWeight: "bold" }}>Service: </Text>Deliveries</Text> */}
              <Text style={styles.caption2}>{item.profile_address}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    ...styles.caption,
                    marginTop: 3,
                    marginRight: 3,
                    color: "#14a800",
                    fontSize: 18,
                  }}
                >
                  {item.profile_rating.substring(0, 4)}
                </Text>

                <StarRating
                  maxStars={5}
                  rating={Number(item.profile_rating)}
                  starSize={16}
                  fullStarColor="#14a800"
                  emptyStarColor="#14a800"
                />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "column", marginBottom: 15 }}>
            <Text style={styles.caption2}>
              <Text style={{ fontWeight: "bold", color: "#1d4354" }}>
                Project budget:{" "}
              </Text>
              {item.proj_cost}
            </Text>
            <Text style={styles.caption2}>
              <Text style={{ fontWeight: "bold", color: "#1d4354" }}>
                Project address:{" "}
              </Text>
              {item.proj_addr}
            </Text>
            <Text style={styles.caption2}>
              <Text style={{ fontWeight: "bold", color: "#1d4354" }}>
                Start date:{" "}
              </Text>
              {item.start_date}
            </Text>
            <Text style={styles.caption2}>
              <Text style={{ fontWeight: "bold", color: "#1d4354" }}>
                End date:{" "}
              </Text>
              {item.end_date}
            </Text>
          </View>

          <View style={{ flexDirection: "column" }}>
            <Text style={styles.caption2}>
              <Text style={{ color: "#1d4354", fontWeight: "bold" }}>
                Client:{" "}
              </Text>
              <TouchableOpacity
                onPress={() => viewProfile(item.client_userid)}
                style={{
                  marginBottom: -4,
                }}
              >
                <Text
                  style={{
                    color: "#14a800",
                    textDecorationLine: "underline",
                    fontSize: 16,
                  }}
                >
                  {item.client_name}
                </Text>
              </TouchableOpacity>
            </Text>
            <Text style={styles.caption2}>
              <Text style={{ color: "#1d4354", fontWeight: "bold" }}>
                Job Headline:{" "}
              </Text>

              <Text style={{ color: "#14a800" }}>
                {/* {
                  jobHeadline.map((item2, index2) => {
                    if (item.jobpost_id === item2.id) {
                      return item2.headline;
                    }
                  })
                } */}
                {item.headline}
              </Text>
            </Text>
            <Text style={styles.caption2}>
              <Text style={{ color: "#1d4354", fontWeight: "bold" }}>
                Service:{" "}
              </Text>
              <Text style={{ color: "#14a800" }}>{item.service}</Text>
            </Text>
            <Text style={styles.caption2}>
              <Text style={{ color: "#1d4354", fontWeight: "bold" }}>
                Job Description:{" "}
              </Text>
              {item.proj_desc}
            </Text>
          </View>

          <ScrollView
            onScroll={({ nativeEvent }) => imageChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={{ marginTop: 15 }}
          >
            {sampleImage.map((row, key) => {
              if (row.appointment_id === item.id) {
                return (
                  <View key={key}>
                    {/* {sampleImage.map((e, index2) => ( ))} */}
                    <Pressable onPress={() => showImageFull(row.fb_photos)}>
                      <Image
                        key={key}
                        style={styles.wrap}
                        resizeMode="cover"
                        source={{ uri: row.fb_photos || "aaa" }}
                      />
                    </Pressable>
                  </View>
                );
              } else {
              }
            })}
          </ScrollView>

          {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ width: "50%", height: 200 }}>
              <Image
                style={{
                  width: "100%", height: "100%",
                }}
                source={MyImage.img_4}
                resizeMode="cover"
              />
            </View>
            <View style={{ width: "50%", height: 200 }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={MyImage.img_4}
                resizeMode="cover"
              />
            </View>
          </View> */}

          <Text
            style={{
              paddingLeft: 5,
              marginBottom: 5,
              marginTop: 20,
              fontSize: 16,
              color: "#555",
              fontFamily: "sans-serif",
            }}
          >
            Feedbacks :
          </Text>

          <View style={{ borderWidth: 1, borderColor: "#c3c3c3", padding: 10 }}>
            {appointmentData.map((row, index) => {
              if (row.appointment_id === item.id) {
                return (
                  <View key={index}>
                    <Text
                      style={{
                        textDecorationStyle: "solid",
                        textDecorationLine: "underline",
                        textDecorationColor: "#c3c3c3",
                        fontSize: 16,
                      }}
                    >
                      Feedback from{" "}
                      {row.fb_from === item.profile_userid
                        ? item.profile_fname
                        : item.client_fname}{" "}
                      :
                    </Text>
                    <Text
                      style={{
                        ...styles.caption2,
                        color: "#555",
                        lineHeight: 18,
                        marginTop: 3,
                      }}
                    >
                      {row.fb_comment}
                    </Text>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                      <Text
                        style={{
                          ...styles.caption,
                          marginTop: 3,
                          marginRight: 3,
                          color: "#14a800",
                          fontSize: 18,
                        }}
                      >
                        {row.fb_star.substring(0, 4)}
                      </Text>

                      <StarRating
                        maxStars={5}
                        rating={Number(row.fb_star)}
                        starSize={16}
                        fullStarColor="#14a800"
                        emptyStarColor="#14a800"
                      />
                    </View>
                  </View>
                );
              }
            })}

            {/* <Text style={{
              textDecorationStyle: "solid",
              textDecorationLine: "underline",
              textDecorationColor: "#c3c3c3"
            }}>
              Feedback from John Doe:</Text>
            <Text style={{ ...styles.caption2, color: "#555", lineHeight: 18, marginTop: 3 }}>
              {" "} Mr. Joshua is a nice person and good
              to work with. He always take care of his freelancers.</Text>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome name="star" size={14} color="#14a800" style={{ marginRight: 5 }} />
              <FontAwesome name="star" size={14} color="#14a800" style={{ marginRight: 5 }} />
              <FontAwesome name="star" size={14} color="#14a800" style={{ marginRight: 5 }} />
              <FontAwesome name="star" size={14} color="#14a800" style={{ marginRight: 5 }} />
              <FontAwesome5 name="star-half-alt" size={12} color="#14a800" />
            </View> */}
          </View>
        </View>
      );
    }
  });

  const NoAppointment = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 170,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#c3c3c3",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(247,247,247)",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={MyImage.noAppoint}
          resizeMode="cover"
        />
        <Text style={{ ...styles.caption2, marginTop: 5 }}>
          No appointments yet.
        </Text>
      </View>
    );
  };

  const viewProfile = async (profile_userid) => {
    try {
      fetch(
        "http://192.168.42.241/ehiremo/backend/api/users/user_fetch_self.php",
        {
          method: "GET",
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
          if (result.user_id === profile_userid) {
            navigation.navigate("TalentMyProfile");
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });

      await AsyncStorage.removeItem("id");
      await AsyncStorage.setItem("id", profile_userid);
      //   navigation.navigate("ClientViewProfile");
      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!messageText) {
      return;
    }
    let resp = await AsyncStorage.getItem("id");

    let message_data = {
      incoming_msg_id: resp,
      msg: messageText
    };

    fetch(
      "http://192.168.42.241/ehiremo/backend/api/messages/send_message.php",
      {
        method: "POST",
        body: JSON.stringify(message_data),
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
        // alert("Message sent");
        setModalAlert(true);
        setAlertText("Message sent.");
        setMessageText("");
        setModalMessage(false);
      })
      .catch((error) => {
        console.log(error);
      });


  }

  const viewPortfolio = async () => {

    Linking.openURL(info.portfolio).catch((err) => {
      console.log(err)
    });

    // try {

    //   const cUri = await FileSystem.getContentUriAsync(info.portfolio);

    //   await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
    //     data: cUri,
    //     flags: 1,
    //     type: "application/pdf",
    //   });
    // } catch (e) {
    //   console.log(e.message);
    // }


    // console.log(info.portfolio);
    // FileSystem.getContentUriAsync(info.portfolio).then(cUri => {
    //   IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
    //     data: cUri.info.portfolio,
    //     flags: 1,
    //     type: 'application/pdf'
    //   });
    // });
  }

  // const resourceType = 'http://192.168.42.213/ehiremo/backend/uploads/portfolios/61da7a4043cc83.14007386.pdf';

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#1d4354",
          paddingHorizontal: 15,
          paddingVertical: 5,
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
        <View
          style={{ alignItems: "flex-start", marginLeft: 90, marginTop: 5 }}
        >
          <Text style={{ ...styles.title, color: "#fff", fontWeight: "400" }}>
            View Profile
          </Text>
        </View>
      </View>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loadingInfo === false ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 25,
                  marginBottom: 25,
                }}
              >
                <Avatar.Image
                  size={80}
                  source={{
                    uri: info.profile_photo || sampleProfile,
                  }}
                />

                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        ...styles.caption,
                        marginTop: 3,
                        marginRight: 3,
                        color: "#14a800",
                        fontSize: 18,
                      }}
                    >
                      {info.rating.substring(0, 4)}
                    </Text>

                    <StarRating
                      maxStars={5}
                      rating={Number(info.rating)}
                      starSize={18}
                      fullStarColor="#14a800"
                      emptyStarColor="#14a800"
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.caption,
                      marginTop: 8,
                      fontSize: 20,
                      lineHeight: 20,
                    }}
                  >
                    {info.name}
                  </Text>
                  <Text style={{ ...styles.caption, marginTop: 3 }}>
                    {info.address}
                  </Text>
                  <Text style={{ ...styles.caption, marginTop: 3 }}>
                    {info.role}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: 400,
                      marginTop: 10,
                      marginLeft: -85,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <FontAwesome
                        name="envelope"
                        size={14}
                        color="#1d4354"
                        style={{ marginTop: 6, marginRight: 3 }}
                      />
                      <TouchableOpacity onPress={() => setModalMessage(true)}>
                        <Text
                          style={{
                            marginTop: 3,
                            fontSize: 16,
                            textDecorationColor: "#1d4354",
                            color: "#1d4354",
                            textDecorationLine: "underline",
                          }}
                        >
                          Send message
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {profileRole === "freelancer" && info.portfolio !== "" ? (
                      <View style={{ flexDirection: "row", marginLeft: 10 }}>
                        <Ionicons
                          name="document-text"
                          size={16}
                          color="#1d4354"
                          style={{ marginTop: 4, marginRight: 3 }}
                        />
                        <TouchableOpacity onPress={viewPortfolio}>
                          <Text
                            style={{
                              marginTop: 3,
                              fontSize: 16,
                              textDecorationColor: "#1d4354",
                              color: "#1d4354",
                              textDecorationLine: "underline",
                            }}
                          >
                            View portfolio
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                  {profileRole === "freelancer" ? (
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 5,
                        marginTop: 15,
                        maxWidth: 400,
                        marginLeft: -90,
                        justifyContent: "flex-start",
                      }}
                    >
                      {services.map((item, index) => (
                        <TouchableOpacity
                          activeOpacity={0.5}
                          style={{
                            textAlign: "center",
                            backgroundColor: "#fff",
                            minWidth: 40,
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: "#555",
                            marginRight: 10,
                            paddingHorizontal: 10,
                            marginBottom: 10,
                            marginBottom: 5,
                          }}
                          key={index}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#555",
                            }}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <></>
                  )}

                  {/* <View style={{
                  flexDirection: "row", marginBottom: 5,
                  marginTop: 5, width: 400,
                  marginLeft: -90, marginTop: 10
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

                </View> */}
                </View>
              </View>


              {loadingFProfile ? (
                <View></View>
              ) : (
                <>
                  {appointmentList && appointmentList.length === 0 ? (
                    <NoAppointment />
                  ) : (
                    <>{FreelancerList}</>
                  )}
                </>
              )}
              {/* <FreelancerList /> */}
            </>
          ) : (
            <></>
          )}
        </ScrollView>
      </View>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={expandView}
        onRequestClose={() => {
          setExpandView(!expandView);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ ...styles.modalView, marginTop: 30 }}>
            <Text>x</Text>
            <Image
              style={{ width: 320, height: "90%", resizeMode: "contain" }}
              source={{ uri: expandSource || MyImage.img_1 }}
            />
          </View>
        </View>
      </Modal>

      {/* MODAL MESSAGE  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMessage}
        onRequestClose={() => {
          setModalMessage(!modalMessage);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={{ ...styles.modalView2, height: 120 }}>

            <View style={{ flexDirection: "column", }}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 18,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25,
                fontWeight: 'bold'
              }}>( {info.role} )</Text>

              <Text style={{
                paddingLeft: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>{info.fname}</Text>

              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 14,
                color: "#555",
                fontFamily: "sans-serif-light",
                textAlign: 'center',
                lineHeight: 25
              }}>{info.address}</Text>


            </View>

            <View style={{ marginTop: 15, width: '100%' }}>
              <TextInput style={styles.input} placeholder=""
                value={messageText} onChangeText={(messageText) => setMessageText(messageText)}
              />
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
                onPress={sendMessage}
              //   setModalAlert(!modalAlert)
              //   loadData();
              // }}
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

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAlert}
        onRequestClose={() => {
          setModalAlert(!modalAlert);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={{ ...styles.modalView2, minHeight: 120 }}>

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

      {/* <PDFReader
        source={{
          uri: 'http://192.168.42.213/ehiremo/backend/uploads/portfolios/61da7a4043cc83.14007386.pdf',
        }}
      /> */}

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
  },

  wrapDot: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },

  dotActive: {
    margin: 3,
    color: "#1d4354",
    fontSize: 22,
  },

  dot: {
    margin: 3,
    color: "white",
    fontSize: 22,
  },

  wrap: {
    width: WIDTH - 40,
    height: HEIGHT * 0.25,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    minHeight: 140,
    width: 300,
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
  },

  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalView2: {
    minHeight: 220,
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

export default TalentViewProfile;
