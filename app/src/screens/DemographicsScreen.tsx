import React from 'react';
import {Button, Platform, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import {backendUrl} from "../config/config.json";

import { AuthContext } from "../navigation/context";

import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { useRef } from 'react';
import MultipleChoice from 'react-native-multiple-choice';

import DropDownPicker from 'react-native-dropdown-picker';
import {CheckBox} from "react-native-elements"
import { getItemAsync } from 'expo-secure-store';


export default function Demographics({ navigation }) {

    const [education, setEducation] = React.useState('');
    const [numberOfMoves, setMoved] = React.useState('');
    const [occupation, setOccupation] = React.useState();
    const [longAddress, setAddress] = React.useState();
    const [longCity, setCity] = React.useState();
    const [longState, setState] = React.useState();
    const [longZip, setZip] = React.useState();

    const [Depression, setDepression] = React.useState(false)
    const [Schizophrenia, setSchizophrenia] = React.useState(false)
    const [BipolarDisorder, setBipolarDisorder] = React.useState(false)
    const [SchizoaffectiveDisorder, setSchizoaffectiveDisorder] = React.useState(false)
    const [Anxiety, setAnxiety] = React.useState(false)
    const [OCD, setOCD] = React.useState(false)
    const [PTSD, setPTSD] = React.useState(false)
    const [Other, setOther] = React.useState(false)
    const [otherText, setOtherText] = React.useState("")
    const [otherTextP, setOtherTextP] = React.useState("")
    
    const familyHistoryIllness: string[] = []

    const addIllness = (arrayName, condition, illName) => {
      if (condition) {
        arrayName.push(illName);
      }
    }

    const addOtherIllness = () => {
      if (otherText != "") {
        familyHistoryIllness.push(otherText)
      }
    
    }

    const addOtherIllnessP = () => {
      if (otherTextP != "") {
        personalHistoryIllness.push(otherTextP)
      }
    }
   

    const check = () => {
      addIllness(familyHistoryIllness, Depression, 'Depression')
      addIllness(familyHistoryIllness, Schizophrenia, 'Schizophrenia')
      addIllness(familyHistoryIllness, BipolarDisorder, 'Bipolar Disorder')
      addIllness(familyHistoryIllness, SchizoaffectiveDisorder, 'Schizoaffective Disorder')
      addIllness(familyHistoryIllness, Anxiety, 'Anxiety')
      addIllness(familyHistoryIllness, OCD, 'OCD')
      addIllness(familyHistoryIllness, PTSD, 'PTSD')
      addIllness(familyHistoryIllness, Other, 'Other')
      addOtherIllness()
    }

    
  
    const [DepressionP, setDepressionP] = React.useState(false)
    const [SchizophreniaP, setSchizophreniaP] = React.useState(false)
    const [BipolarDisorderP, setBipolarDisorderP] = React.useState(false)
    const [SchizoaffectiveDisorderP, setSchizoaffectiveDisorderP] = React.useState(false)
    const [AnxietyP, setAnxietyP] = React.useState(false)
    const [OCDP, setOCDP] = React.useState(false)
    const [PTSDP, setPTSDP] = React.useState(false)
    const [OtherP, setOtherP] = React.useState(false)

    const personalHistoryIllness: string[] = [];

    const checkP = () => {
      addIllness(personalHistoryIllness, DepressionP, 'Depression')
      addIllness(personalHistoryIllness, SchizophreniaP, 'Schizophrenia')
      addIllness(personalHistoryIllness, BipolarDisorderP, 'Bipolar Disorder')
      addIllness(personalHistoryIllness, SchizoaffectiveDisorderP, 'Schizoaffective Disorder')
      addIllness(personalHistoryIllness, AnxietyP, 'Anxiety')
      addIllness(personalHistoryIllness, OCDP, 'OCD')
      addIllness(personalHistoryIllness, PTSDP, 'PTSD')
      addIllness(personalHistoryIllness, OtherP, 'Other')
      addOtherIllnessP()
      
      
    }

    

    const submitDemographics = async (occupation, education, numberOfMoves, personalHistoryIllness, longAddress, longCity, longState, longZip, familyHistoryIllness) => {
      const token: string = (await getItemAsync("user_token"))!;
      axios
        .put(`${backendUrl}/api/auth/update`, 
        {
          occupation,
          education,
          numberOfMoves, 
          personalHistoryIllness,
          longAddress,
          longCity,
          longState,
          longZip,
          familyHistoryIllness
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
          Alert.alert("The form was successfully submitted")
         
          navigation.navigate("Profile");
        })
        .catch((error) => {
          console.log(error.message)
          console.log(error.data)
        });
    };
   
  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: "#FFFFFF99" }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        
          <Text style = {styles.title}> Demographics </Text>

        <Text style = {styles.label}>
          <Text style = {styles.subtitle}>
          Education:
          </Text>
        </Text>

        <Picker style ={{width: 375, height: 200, marginTop: -51, alignContent:'center', alignSelf:'center'}}
        selectedValue={education}
        
    onValueChange={(ed, itemIndex) =>
      setEducation(ed)
  }>
    <Picker.Item label="Not Selected" value="Not Selected" />
    <Picker.Item label="Less than High School" value="Less than High School" />
    <Picker.Item label="High School Graduate" value="High School Graduate'" />
    <Picker.Item label="Vocational/Trade/Technical School" value="Vocational/Trade/Technical School" />
    <Picker.Item label="Some College" value="Some College'" />
    <Picker.Item label="Bachelor's Degree" value="Bachelor's Degree" />
    <Picker.Item label="Advanced Degree" value="Advanced Degree" />
    </Picker>
        
        <Text style = {styles.label}>
          <Text style = {styles.subtitle}>
            Occupation:
          </Text>
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Occupation"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setOccupation(inp)}
            value={occupation}
            
          />
        <Text style = {styles.label}>
          <Text style = {styles.subtitle}>
          Address of place in which you spent longest during childhood :
          </Text>
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setAddress(inp)}
            value={longAddress}
            
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setCity(inp)}
            value={longCity}
           
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setState(inp)}
            value={longState}
          
          />
          <TextInput
            style={styles.input}
            placeholder="Zip code"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={5}
            keyboardType="numeric"
            onChangeText={(inp) => setZip(inp)}
            value={longZip}
            
          />
          <Text style = {styles.label}>
            <Text style = {styles.subtitle}>
            Number of times you moved from ages 12-18 
            </Text>
          </Text>
          <Picker style ={{width: 375, height: 200, marginTop: -51, alignContent:'center', alignSelf:'center'}}
        selectedValue={numberOfMoves}
        
    onValueChange={(num, itemIndex) =>
      setMoved(num)
    }>
    <Picker.Item label="Not Selected" value="Not Selected" />
    <Picker.Item label="0" value="0" />
    <Picker.Item label="1" value="1" />
    <Picker.Item label="2" value="2" />
    <Picker.Item label="3" value="3" />
    <Picker.Item label="4" value="4" />
    <Picker.Item label="5" value="5" />
    <Picker.Item label="6" value="6" />
    <Picker.Item label="7" value="7" />
    <Picker.Item label="8" value="8" />
    <Picker.Item label="9+" value="9+" />
    </Picker>
      <Text style = {styles.label}>
        <Text style = {styles.subtitle}>
          Family history of mental illness 
        </Text>
      </Text>

     <CheckBox 
     title = "Depression"
     checked = {Depression}
     onPress = {() => setDepression(!Depression)}/>

    <CheckBox
     title = "Schizophrenia"
     checked = {Schizophrenia}
     onPress = {() => setSchizophrenia(!Schizophrenia)}/>

    <CheckBox  
     title = "Bipolar Disorder"
     checked = {BipolarDisorder}
     onPress = {() => setBipolarDisorder(!BipolarDisorder)}/>

    <CheckBox 
     title = "Schizoaffective Disorder"
     checked = {SchizoaffectiveDisorder}
     onPress = {() => setSchizoaffectiveDisorder(!SchizoaffectiveDisorder)}/>

    <CheckBox 
     title = "Anxiety"
     checked = {Anxiety}
     onPress = {() => setAnxiety(!Anxiety)}/>

    <CheckBox 
     title = "OCD"
     checked = {OCD}
     onPress = {() => setOCD(!OCD)}/>

    <CheckBox 
     title = "PTSD"
     checked = {PTSD}
     onPress = {() => setPTSD(!PTSD)}/>

    <CheckBox 
     title = "Other"
     checked = {Other}
     onPress = {() => setOther(!Other)}/>

     <Text style = {styles.label}>
      <Text style = {styles.subtitle}>
        If other:
      </Text>
    </Text>
    <TextInput
            style={styles.input}
            placeholder="Other"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setOtherText(inp)}
            value={otherText}
            
          />





    <Text style = {styles.label}>
      <Text style = {styles.subtitle}>
        Personal history of mental illness 
      </Text>
    </Text>

    <CheckBox 
    title = "Depression"
    checked = {DepressionP}
    onPress = {() => setDepressionP(!DepressionP)}/>

    <CheckBox
    title = "Schizophrenia"
    checked = {SchizophreniaP}
    onPress = {() => setSchizophreniaP(!SchizophreniaP)}/>


    <CheckBox  
    title = "Bipolar Disorder"
    checked = {BipolarDisorderP}
    onPress = {() => setBipolarDisorderP(!BipolarDisorderP)}/>

    <CheckBox 
    title = "Schizoaffective Disorder"
    checked = {SchizoaffectiveDisorderP}
    onPress = {() => setSchizoaffectiveDisorderP(!SchizoaffectiveDisorderP)}/>

    <CheckBox 
    title = "Anxiety"
    checked = {AnxietyP}
    onPress = {() => setAnxietyP(!AnxietyP)}/>

    <CheckBox 
    title = "OCD"
    checked = {OCDP}
    onPress = {() => setOCDP(!OCDP)}/>

    <CheckBox 
    title = "PTSD"
    checked = {PTSDP}
    onPress = {() => setPTSDP(!PTSDP)}/>

    <CheckBox 
    title = "Other"
    checked = {OtherP}
    onPress = {() => setOtherP(!OtherP)}/>

    <Text style = {styles.label}>
      <Text style = {styles.subtitle}>
        If other:
      </Text>
    </Text>
    <TextInput
          style={styles.input}
          placeholder="Other"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={20}
          onChangeText={(inp) => setOtherTextP(inp)}
          value={otherTextP}
         
        />


     <ButtonDesign name="Submit" 
     onPress={() => {
        check()
        checkP()
        console.log(familyHistoryIllness)
        console.log(personalHistoryIllness)
        submitDemographics(occupation, education,numberOfMoves,personalHistoryIllness, longAddress, longCity, longState, longZip, familyHistoryIllness)
       
  
     }
       } 
     />
       
       </ScrollView>
        </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  password: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F',
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#072B4F',
    textAlign: 'center'
  },
  input: { 
    height: 45,
    width: Dimensions.get('window').width - 40,
    marginBottom: 5,
    marginLeft: 15,
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
    fontSize: 22, 
  },
  subtitle: {
    textAlign: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    fontWeight: 'bold',
    color: '#072B4F', 
    fontSize: 20,
  },
  textName: {
    textAlign: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
    fontSize: 18,
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
    fontWeight: 'bold',
    fontSize: 23,
  },
  errorMessage: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: 'red', 
    fontSize: 18,
  },
  
});
