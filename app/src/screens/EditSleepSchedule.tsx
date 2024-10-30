import React from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";

import { Text, View } from "../components/Themed";
import ButtonDesign from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import { backendUrl } from "../config/config.json";

import axios from "axios";
import { getItemAsync } from "expo-secure-store";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditSleepSchedule({ navigation }) {
  const [sleepTime, setSleepTime] = React.useState(new Date(1598051730000));
  const [wakeTime, setWakeTime] = React.useState(new Date(23456700000));
  const [showWakeTime, setShowWakeTime] = React.useState(false);
  const [showSleepTime, setShowSleepTime] = React.useState(false);
  

  const changeTime = (event, newTime) => {
    setSleepTime(newTime)
  };
  const changeWakeupTime = (event, newTime) => {
    setWakeTime(newTime);
  };


  const changeTimeAndroid = (event, newTime) => {
    let newSleep = newTime || sleepTime
    setSleepTime(newSleep)
    setShowSleepTime(false)
  }

  const changeWakeUpTimeAndroid = (event, newTime) => {
    let newWake = newTime || wakeTime
    setWakeTime(newWake);
    setShowWakeTime(false)
  } 

  const showSleep = () => {
    setShowSleepTime(true);
  }

  const showWake = () => {
    setShowWakeTime(true);
  }

  const editSchedule = async (wakeTime, sleepTime) => {
    const token: string = (await getItemAsync("user_token"))!;
    axios
      .put(
        `${backendUrl}/api/auth/update`,
        {
          wakeTime,
          sleepTime,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const { message } = response.data;
        const { status, data } = response;
        Alert.alert("Your sleep schedule information was updated");

        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.data);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <Text style={styles.title}> Sleep Schedule</Text>
            <Text style={styles.label}> Wake-up time:</Text>
          
            {Platform.OS == "ios" ? (
              <DateTimePicker
                style={{ width: 100, backgroundColor: "transparent" }}
                value={wakeTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={changeWakeupTime}
              />
              
            ) : (
              <ButtonDesign name = "Wake-up time" onPress = {() => showWake()}></ButtonDesign>
            )}
            <Text style={styles.label}> Bedtime:</Text>
            {Platform.OS == "ios" ? (
              <DateTimePicker
                style={{ width: 100, backgroundColor: "transparent" }}
                value={sleepTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={changeTime}
              />
            ) : (
              <ButtonDesign name = "Bedtime" onPress = {() => showSleep()}></ButtonDesign>
            )}
         
          {showWakeTime && (
            <DateTimePicker
            style={{ width: 100, backgroundColor: "transparent" }}
            value={wakeTime}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={changeWakeUpTimeAndroid}
          />
          )}
          {showSleepTime && (
            <DateTimePicker
            style={{ width: 100, backgroundColor: "transparent" }}
            value={wakeTime}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={changeTimeAndroid}
          />
          )}
          <ButtonDesign
            name="Save"
            onPress={() => {
              {
                
                editSchedule(wakeTime, sleepTime);
              }
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#072B4F'
  },
  input: { 
      height: 45,
      width: 290,
      margin: 15,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 18,
      borderColor: '#072B4F'
  },
  label: {
    textAlign: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
  },
  message: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: 'red', 
  }
 
  
});
