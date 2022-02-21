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
  CheckBox
} from "react-native";

import MyImage from "../../assets/images/ClientGettingStarted";
import RadioButton from "react-native-radio-button";
// import navigation from "./navigator/navigation";

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
                marginTop: 50,
              }}
            >
              Getting Started 
            </Text>

            <Image
              style={{ width: "100%", height: 150, marginTop: 60 }}
              source={MyImage.img_4}
              resizeMode="contain"
            />

            <Text
              style={{
                paddingHorizontal: 20,
                textAlign: "center",
                fontSize: 22,
                color: "#555",
                fontFamily: "sans-serif-light",
                marginTop: 20,
              }}
            >
              Lets start with a strong headline
            </Text>
    
    
            <View style={{ marginTop: 10,paddingHorizontal: 35, }}>
              <View style={{flexDirection: "column",
               justifyContent: "flex-start", alignItems: "flex-start"}}>
                <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>Write a headline for your job post :</Text>
              </View>
              <TextInput style={styles.input} placeholder="" />
                
              <Text
                style={{
                  fontSize: 18,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}
              >
                Example Titles : 
              </Text>
              <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>- Graphic designer needed to design ads creative for
                multiple campaigns.
              </Text>
              <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>- Plumber install and repair pipes that supply water
                and gas to, as well as carry waste away from our home.
            
              </Text>
              <Text style={{
                  paddingLeft: 5,
                  marginBottom: 5,
                  fontSize: 16,
                  color: "#555",
                  fontFamily: "sans-serif-light",
                }}>- Makeup artist who engages in beautifying
                individuals
                like presenters, actors, performers, and other professionals.
            
              </Text>
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
          style={{ width: "100%", height: 150, marginTop: 60,
        borderRadius: 500 }}
          source={MyImage.img_5}
          resizeMode="contain"
        />

        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 50,
          }}
        >
          Great ! What services does your work require ?
        </Text>


        <View style={{ marginTop: 10,paddingHorizontal: 35, marginBottom: 10 }}>
          <View style={{flexDirection: "column",
           justifyContent: "flex-start", alignItems: "flex-start"}}>
            <Text style={{
              paddingLeft: 5,
              marginBottom: 5,
              fontSize: 16,
              color: "#555",
              fontFamily: "sans-serif-light",
            }}>Specify services :</Text>
          </View>
          <TextInput style={styles.input} placeholder="" />
            
          <Text
            style={{
              fontSize: 18,
              color: "#555",
              fontFamily: "sans-serif-light",
            }}
          >
            Popular Services : 
          </Text>
          
        </View>

        <View style={{flexDirection: "row", paddingLeft: 25, marginBottom: 7}}>
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
                    Video Editor
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
                    Sales Agent
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
                    Make up Artist
                    </Text>
                </TouchableOpacity>
            </View> 
            
        <View style={{flexDirection: "row", paddingLeft: 25, marginBottom: 7}}>
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
                    Delivery Rider
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
                    Cleaners
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
                    Repairs
                    </Text>
                </TouchableOpacity>
            </View> 

        <View style={{flexDirection: "row", paddingLeft: 25, marginBottom: 7}}>
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
                    Plumbing
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
                    Web Developer
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
                    Home Service
                    </Text>
                </TouchableOpacity>
            </View> 
            
        <View style={{flexDirection: "row", paddingLeft: 25, marginBottom: 7}}>
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
                    Online Tutor
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
                    Photographer
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
                  Caterer
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
            backgroundColor: "#c3c3c3",
          }}
        ></View>
      </View>

    </KeyboardAvoidingView>
  );
}

function Started_3() {
  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        

        <Image
          style={{ width: "100%", height: 150, marginTop: 60,
        borderRadius: 500 }}
          source={MyImage.img_6}
          resizeMode="contain"
        />

        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 50,
          }}
        >
         Next Estimate the scope of your work
        </Text>


         <View style={{paddingLeft: 35, paddingRight: 25, marginTop: 25}}>
          <View style={{flexDirection: "row"}}>
          <RadioButton
                outerColor={"#14a800"}
                innerColor={"#c3c3c3"}
                size={12}
                animation={"bounceIn"}
                // isSelected={state === "freelancer" ? true : false}
                // onPress={() => setState("freelancer")}
          />
          <Text style={{
            fontSize: 18,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginLeft: 7
          }}>Large</Text>
          </View>

          <Text style={{
            fontSize: 16,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginLeft: 27
          }}
          >Longer term or complex initiatives (ex. develop and execute a brand
            strategy (i.e., graphics, positioning)).</Text>
          
          <View style={{marginBottom: 10}}></View>
          <View style={{flexDirection: "row"}}>
          <RadioButton
                outerColor={"#14a800"}
                innerColor={"#c3c3c3"}
                size={12}
                animation={"bounceIn"}
                // isSelected={state === "freelancer" ? true : false}
                // onPress={() => setState("freelancer")}
          />
          <Text style={{
            fontSize: 18,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginLeft: 7
          }}>Medium</Text>
          </View>

          <Text style={{
            fontSize: 16,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginLeft: 27
          }}
          >Well defined project (ex. design, business, web developing).</Text>

          <View style={{marginBottom: 10}}></View>
          <View style={{flexDirection: "row"}}>
          <RadioButton
                outerColor={"#14a800"}
                innerColor={"#c3c3c3"}
                size={12}
                animation={"bounceIn"}
                // isSelected={state === "freelancer" ? true : false}
                // onPress={() => setState("freelancer")}
          />
          <Text style={{
            fontSize: 18,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginLeft: 7
          }}>Small</Text>
          </View>

          <Text style={{
            fontSize: 16,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginLeft: 27
          }}
          >Quick and straightforward task (ex. cleaning, plumbing, creating logo).</Text>

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

function Started_4() {
  const [isSelected, setSelection] = React.useState(false);
  const [isSelected2, setSelection2] = React.useState(false);
  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        

        <Image
          style={{ width: "100%", height: 180, marginTop: 60,
        borderRadius: 500 }}
          source={MyImage.img_7}
          resizeMode="contain"
        />

        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 50,
          }}
        >
          Almost done! Tell us about your budget
        </Text>


        <View style={{ marginTop: 10,paddingHorizontal: 35, marginBottom: 10 }}>
          

          <View style={{flexDirection: "row"}}>
            <CheckBox
              style={{ borderColor: "#555" }}
              value={isSelected}
              onValueChange={setSelection}
            />
            <View style={{flexDirection: "column",
            justifyContent: "flex-start", alignItems: "flex-start", marginTop: 5, marginLeft: -6}}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}>Hourly Rate
              </Text>
            </View>

          </View>

          <TextInput style={styles.input} placeholder="" />
            
          <Text
            style={{
              fontSize: 18,
              color: "#555",
              fontFamily: "sans-serif-light",
              marginLeft: 16, 
              marginBottom: 10
            }}
          >
            or
          </Text>
          

          <View style={{flexDirection: "row"}}>
            <CheckBox
              style={{ borderColor: "#555" }}
              value={isSelected2}
              onValueChange={setSelection2}
            />
            <View style={{flexDirection: "column",
            justifyContent: "flex-start", alignItems: "flex-start", marginTop: 5, marginLeft: -6}}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}>Fixed Rate
              </Text>
            </View>

          </View>

          <TextInput style={styles.input} placeholder="" />
           
          <View style={{flexDirection: "column",
           justifyContent: "flex-start", alignItems: "flex-start"}}>
            <Text style={{
              paddingLeft: 5,
              marginBottom: 5,
              fontSize: 16,
              color: "#555",
              fontFamily: "sans-serif-light",
              textAlign: "center"
            }}>This will help us to match you to freelancer within your range.
            </Text>
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

function Started_5({ navigation }) {
  return (
    <KeyboardAvoidingView behavior={"height"} style={styles.container}>
      <ScrollView style={styles.screen}>
        

        <Image
          style={{ width: "100%", height: 140, marginTop: 30}}
          source={MyImage.img_8}
          resizeMode="contain"
        />

        <Text
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            fontSize: 22,
            color: "#555",
            fontFamily: "sans-serif-light",
            marginTop: 20,
          }}
        >
         Description
        </Text>
        
        <View style={{ marginTop: 10,paddingHorizontal: 35, marginBottom: 10 }}>
          

          <View style={{flexDirection: "row"}}>
            
            <View style={{flexDirection: "column",
            justifyContent: "flex-start", alignItems: "flex-start", marginTop: 5,
             marginLeft: 0}}>
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}>Age range:
              </Text>
              <TextInput 
                style={{...styles.input}} placeholder="" />
              
              
              <Text style={{
                paddingLeft: 5,
                marginBottom: 5,
                fontSize: 16,
                color: "#555",
                fontFamily: "sans-serif-light",
              }}>Describe your job :
              </Text>
              

            </View>

          </View>

          <TextInput multiline={true}
                numberOfLines={15}
                style={{...styles.input, height: 150,
                 textAlignVertical: "top"}} placeholder="" />
           
          <View style={{flexDirection: "column",
           alignItems: "center"}}>
            <Text style={{
              paddingLeft: 5,
              marginBottom: 5,
              fontSize: 16,
              color: "#555",
              fontFamily: "sans-serif-light",
              textAlign: "center"
            }}>This is how freelancer
            figures out what you need and why you're great to
            work with.
            </Text>
          </View>

          <View style={{alignItems: "flex-end", marginTop: 25}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#14a800",
                    width: 145,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                  }}
                  onPress={()=>navigation.navigate("ClientVerification")}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Post your first job
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



const ClientGettingStarted_5 = () => {
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
        <Tab.Screen name="Start_4" component={Started_4} />
        <Tab.Screen name="Start_5" component={Started_5}/>
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

export default ClientGettingStarted_5;
