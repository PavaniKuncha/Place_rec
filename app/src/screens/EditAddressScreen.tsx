import React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

import {backendUrl} from "../config/config.json";

import axios from 'axios';
import { getItemAsync } from 'expo-secure-store';



export default function EditAddressScreen({navigation}) {
    const [address, setAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [zip, setZip] = React.useState("");
    const[message, setMessage] = React.useState("");
    const[showMessage, setShowMessage] = React.useState(false);


    const editAddress = async (address, city, state, zip) => {
      
      const token: string = (await getItemAsync("user_token"))!;
      axios
        .put(`${backendUrl}/api/auth/update`, 
        {
          address,
          city,
          state,
          zip
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
            address == "" ||
            city == "" ||
            state == "" ||
            zip == "" 
        ) {
            setShowMessage(true);
            setMessage("*Please fill in all fields");
        } else {
          editAddress(address, city, state, zip)
        }
    }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.title}>Address</Text>

         

          <Text style={styles.label}>Please enter your new address</Text>
          {showMessage ? <Text style={styles.message}>{message}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={40}
            onChangeText={(inp) => setAddress(inp)}
            value={address}
   
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            onChangeText={(inp) => setCity(inp)}
            value={city}
        
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setState(inp)}
            value={state}
      
          />
          <TextInput
            style={styles.input}
            placeholder="Zip code"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={5}
            keyboardType="numeric"
            onChangeText={(inp) => setZip(inp)}
            value={zip}
   
          />

          <ButtonDesign
            name="Save"
            onPress={() => {
              checkEmptyFields()
             
            }
            }
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
      margin: 10,
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
