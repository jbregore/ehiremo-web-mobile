import "react-native-gesture-handler";
import 'localstorage-polyfill';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";

import {LoadingScreen, Login, SignUp, SignUpNext,
  Verification, ClientVerification, VerificationRequest} from './src/screens';

import {TalentGettingStarted_3, TalentMyProfile,
  TalentSettings, TalentMessage, BrowseTalent,
  CurrentJobs, TalentViewProfile, TalentHelp, TalentChats} from './src/screens/talent';
import Navigation from './src/screens/talent/navigator/navigation';
import ClientNavigation from './src/screens/client/navigator/ClientNavigation';

import {ClientGettingStarted_5, ClientMyProfile,
  ClientMessage, ClientChats, ClientSettings,
  ClientMyJobPost, ClientAllJobPost, PostAJob, ClientNavJob,
   ClientBrowseTalent, ClientNotification, ClientViewProfile,
  ClientHelp}
   from './src/screens/client';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //header
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"LoadingScreen"}
      >
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ClientVerification" component={ClientVerification} />
        <Stack.Screen name="SignUpNext" component={SignUpNext} />
        <Stack.Screen name="VerificationRequest" component={VerificationRequest} />
        
        {/* jobs */}
        <Stack.Screen name="navigation" component={Navigation} />

        {/* talent */}
        <Stack.Screen name="TalentGettingStarted_3" component={TalentGettingStarted_3} />
        <Stack.Screen name="TalentMyProfile" component={TalentMyProfile} />
        <Stack.Screen name="TalentSettings" component={TalentSettings} />
        <Stack.Screen name="TalentMessage" component={TalentMessage} /> 
        <Stack.Screen name="BrowseTalent" component={BrowseTalent} />
        <Stack.Screen name="CurrentJobs" component={CurrentJobs} />
        <Stack.Screen name="TalentViewProfile" component={TalentViewProfile} />
        <Stack.Screen name="TalentHelp" component={TalentHelp} />
        <Stack.Screen name="TalentChats" component={TalentChats} />
        
        {/* client */}
        <Stack.Screen name="ClientBrowseTalent" component={ClientBrowseTalent} />
        <Stack.Screen name="ClientNavigation" component={ClientNavigation} />
        <Stack.Screen name="ClientMyProfile" component={ClientMyProfile} />
        <Stack.Screen name="ClientViewProfile" component={ClientViewProfile} />
        <Stack.Screen name="ClientMessage" component={ClientMessage} /> 
        <Stack.Screen name="ClientChats" component={ClientChats} />
        <Stack.Screen name="ClientSettings" component={ClientSettings} />
        <Stack.Screen name="ClientGettingStarted_5" component={ClientGettingStarted_5} />
        <Stack.Screen name="ClientMyJobPost" component={ClientMyJobPost} />
        <Stack.Screen name="ClientAllJobPost" component={ClientAllJobPost} />
        <Stack.Screen name="PostAJob" component={PostAJob} />
        <Stack.Screen name="ClientNavJob" component={ClientNavJob} />
        <Stack.Screen name="ClientNotification" component={ClientNotification} /> 
        <Stack.Screen name="ClientHelp" component={ClientHelp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
