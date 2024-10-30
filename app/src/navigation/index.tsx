/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import LocationScreen from '../screens/LocationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressScreen from "../screens/ProgressScreen.js";
import OpeningScreen from "../screens/OpeningScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../components/types";
import LinkingConfiguration from "./LinkingConfiguration";
import Questionnaire from "../screens/QuestionnaireScreen";
//import TermsAndConditions from "../screens/TermsAndConditionsScreen";
import Demographics from "../screens/DemographicsScreen";
import EditPhoneNumberScreen from "../screens/EditPhoneNumber";
import EditAddressScreen from "../screens/EditAddressScreen";
import EditGenderScreen from "../screens/EditGenderScreen";
import EditEthnicityScreen from "../screens/EditEthnicityScreen";
import EditSleepSchedule from "../screens/EditSleepSchedule";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeNavigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return <RootNavigator />;
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#068D9D",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <HomeStack.Screen
        name="Questionnaire"
        component={Questionnaire}
        options={{ headerShown: true, gestureEnabled: false }}
      />
    </HomeStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#068D9D",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <ProfileStack.Screen
        name="Demographics"
        component={Demographics}
        options={{ headerShown: true }}
      />
      <ProfileStack.Screen
        name="Edit Phone Number"
        component={EditPhoneNumberScreen}
        options={{ headerShown: true }}
      />
      <ProfileStack.Screen
        name="Edit Address"
        component={EditAddressScreen}
        options={{ headerShown: true }}
      />
      <ProfileStack.Screen
        name="Gender"
        component={EditGenderScreen}
        options={{ headerShown: true }}
      />
      <ProfileStack.Screen
        name="Ethnicity"
        component={EditEthnicityScreen}
        options={{ headerShown: true }}
      />
      <ProfileStack.Screen
        name="Sleep Schedule"
        component={EditSleepSchedule}
        options={{ headerShown: true }}
      />
    </ProfileStack.Navigator>
  );
};

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1F569E",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <BottomTab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          title: "Home",
          headerShown: false,
        }}
      />
      {/* <BottomTab.Screen
        name="Location"
        component={LocationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              color={color}
              size={size}
            />
            
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: "#068D9D"
          }

        }}
      />
      <BottomTab.Screen
        name="User Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

