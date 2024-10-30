import React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

import {backendUrl} from "../config/config.json";

import axios from 'axios';
import { getItemAsync } from 'expo-secure-store';



export default function EditPhoneNumberScreen({navigation}) {
    const[phoneNumber, setPhoneNumber] = React.useState("");
    const[message, setMessage] = React.useState("");
    const[showMessage, setShowMessage] = React.useState(false);

  const editPhone = async (phoneNumber) => {
    const token: string = (await getItemAsync("user_token"))!;
    axios
      .put(`${backendUrl}/api/auth/update`, 
      {
        phoneNumber
      },
      {
        headers: {
          Authorization: token,
        }
      })
      .then((response) => {
        console.log(response.data);
        const { message } = response.data;
        const { status, data } = response;
        console.log(status);
        Alert.alert("Your personal information was updated")
       
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.log(error.message)
        console.log(error.data)
      });
  };


  const  checkEmptyFields = () => {
    if (
        
        phoneNumber == "" 
    ) {
      console.log(phoneNumber)
        setShowMessage(true);
        setMessage("*Please enter your new phone number");
    } else {
      console.log(phoneNumber)
      editPhone(phoneNumber)
    }
}


  return (
  
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.title}> Phone Number</Text>

          <Text style={styles.label}>Please enter your new phone number</Text>
          {showMessage ? <Text style={styles.message}>{message}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            maxLength={10}
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={(inp) => setPhoneNumber(inp)}
          />
          <ButtonDesign
            name="Save"
            onPress={() => { 
              {
                checkEmptyFields()
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
