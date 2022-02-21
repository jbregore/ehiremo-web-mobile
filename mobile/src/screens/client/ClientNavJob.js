import React from 'react';
import {Platform, StatusBar,StyleSheet} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

import ClientMyJobPost from './ClientMyJobPost';
import PostAJob from './PostAJob';
import ClientAllJobPost from './ClientAllJobPost';


const Tab = createBottomTabNavigator();

const ClientNavJob = () => {
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
        name="My Postings" 
        component={ClientMyJobPost} 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="All Post" 
        component={ClientAllJobPost} 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="newspaper-variant-multiple-outline" size={size} color={color} />
          ),
        }}
      /> 
      <Tab.Screen 
        name="Post job" 
        component={PostAJob} 
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="post-add" size={size} color={color} />
          ),
        }}
      />
     
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default ClientNavJob;
