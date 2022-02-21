import React from 'react';
import {Platform, StatusBar,StyleSheet} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {ClientDrawerContent} from "./ClientDrawerContent";

import {
  View,
  Text,
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 

//jobs
// import Home from "../Home";

//client
import ClientMyProfile from "../ClientMyProfile";
import ClientSettings from "../ClientSettings";
import ClientMessage from "../ClientMessage";
import ClientBrowseTalent from "../ClientBrowseTalent";
import SavedTalents from "../SavedTalents";
import MyHires from "../MyHires";
import ClientChats from "../ClientChats";
import ClientMyJobPost from "../ClientMyJobPost";
import ClientNavJobs from "../ClientNavJob";
import PostAJob from "../PostAJob";
import ClientNotification from '../ClientNotification';
import ClientViewProfile from '../ClientViewProfile';
import ClientHelp from '../ClientHelp';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
     
      tabBarOptions={{
        style: {
          height: 65,
          backgroundColor: "#fff", //1d4354
          borderTopWidth: 0,
          paddingBottom: 5
        },
        activeTintColor: "#1d4354",
        labelStyle: {
          fontSize: 14,
          marginTop: -10
        }
      }}
    >
      <Tab.Screen 
        name="Browse Freelancers" 
        component={ClientBrowseTalent} 
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="people-carry" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Saved Freelancers" 
        component={SavedTalents} 
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="save" size={size} color={color} />
          ),
        }}
      /> 
      <Tab.Screen 
        name="My Hires" 
        component={MyHires} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-people" size={size} color={color} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
}

const ClientNavigation = () =>{
    return (
        <Drawer.Navigator
          drawerContent={
            props => <ClientDrawerContent {...props} />
          }
          drawerStyle={styles.container}
        >
            <Drawer.Screen name="Home" component={Tabs}/>
            <Drawer.Screen name="ClientMyProfile" component={ClientMyProfile} initialParams={{id: ""}}/>
            <Drawer.Screen name="ClientViewProfile" component={ClientViewProfile}/>
            <Drawer.Screen name="ClientBrowseTalent" component={ClientBrowseTalent}/>
            <Drawer.Screen name="ClientNavigation" component={ClientNavigation}/>
            <Drawer.Screen name="ClientMyJobPost" component={ClientNavJobs}/>
            <Drawer.Screen name="PostAJob" component={PostAJob}/>
            <Drawer.Screen name="ClientChats" component={ClientChats}/>
            <Drawer.Screen name="ClientSettings" component={ClientSettings}/>
            <Drawer.Screen name="ClientMessage" component={ClientMessage}/>
            <Drawer.Screen name="ClientNotification" component={ClientNotification}/>
            <Drawer.Screen name="ClientHelp" component={ClientHelp}/>
            {/* <Drawer.Screen name="ClientMyJobPost" component={ClientMyJobPost}/> */}
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ClientNavigation;
