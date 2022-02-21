import React from 'react';
import {Platform, StatusBar,StyleSheet} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {DrawerContent} from "./DrawerContent";

import {
  View,
  Text,
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

//jobs
import Home from "../Home";

//talent
import TalentMyProfile from "../TalentMyProfile";
import TalentSettings from "../TalentSettings";
import TalentMessage from "../TalentMessage";
import BrowseTalent from "../BrowseTalent";
import SavedJobs from "../SavedJobs";
import AppliedJobs from "../AppliedJobs";
import CurrentJobs from "../CurrentJobs";
import TalentNotification from '../TalentNotification';
import TalentViewProfile from "../TalentViewProfile";
import TalentHelp from "../TalentHelp";
import TalentChats from "../TalentChats";


import { Feather } from "@expo/vector-icons";

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
        name="Browse Jobs" 
        component={Home} 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="briefcase-search-outline" size={size} color={color}/>
          ),
        }}
      />
      <Tab.Screen 
        name="Saved Jobs" 
        component={SavedJobs} 
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="save" size={size} color={color} />
          ),
        }}
      /> 
      <Tab.Screen 
        name="Applied Jobs" 
        component={AppliedJobs} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo name="network" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="My Jobs" 
        component={CurrentJobs} 
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const navigation = () =>{
    return (
        <Drawer.Navigator
          drawerContent={
            props => <DrawerContent {...props} />
          }
          drawerStyle={styles.container}
        >
            <Drawer.Screen name="Home" component={Tabs}/>
            <Drawer.Screen name="TalentMyProfile" component={TalentMyProfile}/>
            <Drawer.Screen name="TalentSettings" component={TalentSettings}/>
            <Drawer.Screen name="TalentNotification" component={TalentNotification}/>
            <Drawer.Screen name="TalentMessage" component={TalentMessage}/>
            <Drawer.Screen name="BrowseTalent" component={BrowseTalent}/>
            <Drawer.Screen name="TalentViewProfile" component={TalentViewProfile}/>
            <Drawer.Screen name="TalentHelp" component={TalentHelp}/>
            <Drawer.Screen name="TalentChats" component={TalentChats}/>
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default navigation;
