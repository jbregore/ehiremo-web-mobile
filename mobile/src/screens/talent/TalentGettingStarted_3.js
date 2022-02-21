import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
  TouchableOpacity,
} from "react-native";

import MyImage from "../../assets/images/TalentGettingStarted";
import navigation from "./navigator/navigation";

const Tab = createMaterialTopTabNavigator();


function Started_1(){
    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.container}>
          <ScrollView style={styles.screen}>
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: "center",
                fontSize: 22,
                color: "#555",
                fontFamily: "sans-serif-light",
                marginTop: 120,
              }}
            >
              Getting Started
            </Text>
    
            <Image
              style={{ width: "100%", height: 150, marginTop: 20 }}
              source={MyImage.img_1}
              resizeMode="contain"
            />
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
                  width: 100,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                  }}
                >
                  Upload photo
                </Text>
              </TouchableOpacity>
            </View>
    
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <TextInput style={styles.input} placeholder="Address" />
    
              <TextInput style={styles.input} placeholder="Contact no." />
            </View>
    
            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: "center",
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}
            >
              This details will help you get your first job.
            </Text>
          </ScrollView>


          <View
            style={{
              position: "absolute",
              bottom: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
                    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                marginRight: 5,
                backgroundColor: "#555",
              }}
            ></View>
    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                marginRight: 5,
                backgroundColor: "#c3c3c3",
              }}
            ></View>
    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                backgroundColor: "#c3c3c3",
              }}
            ></View>
          </View>

        </KeyboardAvoidingView>
      );
}

function Started_2() {
    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.container}>
          <ScrollView style={styles.screen}>
            
            <Image
              style={{ width: "100%", height: 150, marginTop: 80 }}
              source={MyImage.img_2}
              resizeMode="contain"
            />
            
    
            <View style={{marginTop: 20,paddingHorizontal: 35, marginBottom: 10}}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}>Rate :</Text>
              <TextInput style={styles.input} placeholder="Ex. Php100.00 /hr" />
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}>Please list down the services you can offer :</Text>
              <TextInput style={styles.input} placeholder="Ex. Web Developing" />
    
    
            </View>
            
            <View style={{flexDirection: "row", paddingLeft: 25, marginBottom: 5}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
            </View> 
            
            <View style={{flexDirection: "row", paddingLeft: 25, marginBottom: 5}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
            </View> 
            
    
            <View style={{flexDirection: "row", paddingLeft: 25, marginBottom: 5}}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                    textAlign: "center",
                    backgroundColor: "#fff",
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#555",
                    marginRight: 10,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                    }}
                    >
                    Services offer
                    </Text>
                </TouchableOpacity>
            </View> 
            
            
    
            
    
            
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
                    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                marginRight: 5,
                backgroundColor: "#c3c3c3",
              }}
            ></View>
    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                marginRight: 5,
                backgroundColor: "#555",
              }}
            ></View>
    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                backgroundColor: "#c3c3c3",
              }}
            ></View>
          
    
    
            
    
          </View>
        </KeyboardAvoidingView>
      );
}

function Started_3({ navigation }) {
    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.container}>
          <ScrollView style={styles.screen}>
            
    
            <Image
              style={{ width: "100%", height: 150, marginTop: 130 }}
              source={MyImage.img_3}
              resizeMode="contain"
            />
    
            <View style={{ marginTop: 20, paddingHorizontal: 35 }}>
            <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}>Description of your profile :</Text>
              <TextInput
                multiline={true}
                numberOfLines={15}
                style={{ ...styles.input, height: 150, textAlignVertical: "top" }}
                placeholder="Ex. Hi Im Ranielle Marie and i love working with my clients,
                i can do Web Developing, Mobile app Developing and Graphic Design."
              />
    
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                And after completing this form you can now start
                and find your first freelance job here at eHireMo.
              </Text>
              
              <View style={{alignItems: "flex-end", marginTop: 25}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#14a800",
                    width: 100,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                  }}
                  onPress={()=>navigation.navigate("Verification")}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
                    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                marginRight: 5,
                backgroundColor: "#c3c3c3",
              }}
            ></View>
    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                marginRight: 5,
                backgroundColor: "#c3c3c3",
              }}
            ></View>
    
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 500,
                backgroundColor: "#555",
              }}
            ></View>
          
    
            
          </View>
        </KeyboardAvoidingView>
      );
}



const TalentGettingStarted_3 = () => {
  return (
      <Tab.Navigator 
        tabBarOptions={{
            showLabel: false,
        }}
        options={{
            headerShown: false
        }}n
      >
        <Tab.Screen name="Start_1" component={Started_1}/>
        <Tab.Screen name="Start_2" component={Started_2} />
        <Tab.Screen name="Start_3" component={Started_3}/>
      </Tab.Navigator>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 16,
  },

  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default TalentGettingStarted_3;
