import React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';

import {backendUrl} from "../config/config.json";

import axios from 'axios';
import { getItemAsync } from 'expo-secure-store';



export default function EditEthnicityScreen({navigation}) {
    const [race, setRace] = React.useState();

    const editRace = async (race) => {
      const token: string = (await getItemAsync("user_token"))!;
      axios
        .put(`${backendUrl}/api/auth/update`, 
        {
          race
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
      
    
    
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.title}>Ethnicity</Text>

          <Picker style ={{width: 400, height: 200, marginTop: -41}}
        selectedValue={race}

    onValueChange={(race, itemIndex) =>
      setRace(race)
  }>
  <Picker.Item label="Asian or Pacific Islander" value="Asian or Pacific Islander" />
  <Picker.Item label="Black or African American" value="Black or African American" />
  <Picker.Item label="Native American or Alaskan Native" value="Native American or Alaskan Native" />
  <Picker.Item label="White or Caucasian" value= "White or Caucasian" />
  <Picker.Item label="Other" value= "Other" />
  <Picker.Item label="Prefer not to say" value= "Prefer not to say" />
 

</Picker>

          <ButtonDesign
            name="Edit"
            onPress={() => { 
              {
                editRace(race)
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
