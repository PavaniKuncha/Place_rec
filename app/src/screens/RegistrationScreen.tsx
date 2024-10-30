import React from 'react';
import {Button, Platform, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import {backendUrl} from "../config/config.json";
import TermsAndConditions from "../screens/TermsAndConditionsScreen";

import { AuthContext } from "../navigation/context";

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import {CheckBox} from "react-native-elements"

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [race, setRace] = React.useState("");
  const [gender, setGender] = React.useState("");

  const [Asian, setAsian] = React.useState(false);
  const [Black, setBlack] = React.useState(false);
  const [Native, setNative] = React.useState(false);
  const [White, setWhite] = React.useState(false);
  const [Two, setTwo] = React.useState(false);
  const [Other, setOther] = React.useState(false);
  const [Prefer, setPrefer] = React.useState(false);

  const [showWakeTime, setShowWakeTime] = React.useState(false);
  const [showSleepTime, setShowSleepTime] = React.useState(false);
  const [showBirthday, setShowBirthday] = React.useState(false);

  const addRace = (arrayName, condition, raceName) => {
    if (condition) {
      arrayName.push(raceName);
    }
  };

  const check = () => {

    addRace(race, Asian, "Asian or Pacific Islander");
    addRace(race, Black, "Black or African American");
    addRace(race, Native, "Native American or Alaskan Native");
    addRace(race, White, "White or Caucasian");
    addRace(race, Two, "Two or more races");
    addRace(race, Other, "Other");
    addRace(race, Prefer, "Prefer not to say");
  };




  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] =
    React.useState(false);
  const [error, setError] = React.useState("");

  const { authFunctions } = React.useContext(AuthContext);
  const { signIn } = authFunctions;
  const [birthday, setBirthday] = React.useState(new Date());
  const [sleepTime, setSleepTime] = React.useState(new Date(1598051730000));
  const [wakeTime, setWakeTime] = React.useState(new Date(23456700000));

  const changeBirthday = (event, newDate) => {
    setBirthday(newDate);
  };

  const changeTime = (event, newTime) => {
    setSleepTime(newTime);
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

  const showBirthDate = () => {
    setShowBirthday(true);
  }

  const changeBirthdayAndroid = (event, newDate) => {
    let newBirthday = newDate || birthday
    setBirthday(newBirthday);
    setShowBirthday(false)
  };

  const passwordMatchCheck = () => {
    if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" 
    ) {
      setShowErrorMessage(true);
      setError("*Please fill in all required fields");
    } else if (password == confirmPassword) {
      const emailValidation =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailValidation.test(email)) {
        if (password.length >= 6) {
          handleRegistration({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            address,
            city,
            state,
            zip,
            gender,
            race,
            birthday,
            wakeTime,
            sleepTime,
          });
        } else {
          setShowEmailErrorMessage(true);
          setError("*Password has to contain at least 6 characters");
        }
      } else {
        setShowEmailErrorMessage(true);
        setError("*Please enter valid email");
      }
    } else {
      setShowEmailErrorMessage(true);
      setError("*Passwords don't match");
    }
  };

  const handleRegistration = (signUpInput) => {
    axios
      .post(`${backendUrl}/api/auth/signup`, signUpInput)
      .then((response) => {
        console.log(response.data);
        const { message } = response.data;
        const { status, data } = response;
        console.log(status);
        if (status == 200) {
          signIn(data.token);
          Alert.alert("Welcome! Please navigate to user profile and complete the additional demographics form.")
        }
      })
      .catch((error) => {
        if (error.message == "Network Error") {
          Alert.alert(error.message);
        } else {
          Alert.alert(error.response.data.message);
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <Text style={styles.title}>Register</Text>
          {showErrorMessage ? (
            <Text style={styles.errorMessage}>{error}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="First Name"
            maxLength={15}
            onChangeText={(inp) => setFirstName(inp)}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            maxLength={20}
            onChangeText={(inp) => setLastName(inp)}
            value={lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            onChangeText={(inp) => setEmail(inp)}
            value={email}
            textContentType={"username"}
          />
          <Text style={styles.password}>
            *Password must be more than 6 characters long and contain at least
            one number
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setPassword(inp)}
            value={password}
            secureTextEntry={true}
            textContentType={"password"}
          />

          <TextInput
            style={[
              styles.input,
              password == confirmPassword
                ? styles.input
                : { borderColor: "red" },
            ]}
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setConfirmPassword(inp)}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number(Optional)"
            maxLength={10}
            keyboardType="numeric"
            onChangeText={(inp) => setPhoneNumber(inp)}
            value={phoneNumber}
          />

          <Text style={styles.label2}>Address(Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Address Line 1"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            onChangeText={(inp) => setAddress(inp)}
            value={address}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
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

          <Text style={styles.label2}>Date of Birth(Optional)</Text>

          {Platform.OS == "ios" ? (
              <DateTimePicker
              style={{
                width: 130,
                backgroundColor: "transparent",
                marginBottom: 22,
                alignContent: "center",
                alignSelf: "center",
              }}
              value={birthday}
              mode={"date"}
              is24Hour={false}
              display="default"
              onChange={changeBirthday}
            />
              
            ) : (
              <ButtonDesign name = "Select Date" onPress = {() => showBirthDate()}></ButtonDesign>
            )}

          {showBirthday && (
           <DateTimePicker
           style={{
             width: 130,
             backgroundColor: "transparent",
             marginBottom: 22,
             alignContent: "center",
             alignSelf: "center",
           }}
           value={birthday}
           mode={"date"}
           is24Hour={false}
           display="default"
           onChange={changeBirthdayAndroid}
         />
          )}
          <Text style={styles.label2}>Gender(Optional)</Text>

          <Picker
            style={{
              width: 372,
              height: 200,
              marginTop: -31,
              alignContent: "center",
              alignSelf: "center",
            }}
            selectedValue={gender}
            onValueChange={(gen, itemIndex) => setGender(gen)}
          >
            <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <Text style={styles.label2}>Race/Ethnicity(Optional)</Text>

          <Picker
            style={{
              width: 372,
              height: 200,
              marginTop: -31,
              alignContent: "center",
              alignSelf: "center",
            }}
            selectedValue={race}
            onValueChange={(race, itemIndex) => setRace(race)}
          >
            <Picker.Item label="Prefer not to say" value="Prefer not to say" />
            <Picker.Item
              label="Asian or Pacific Islander"
              value="Asian or Pacific Islander"
            />
            <Picker.Item
              label="Black or African American"
              value="Black or African American"
            />
            <Picker.Item
              label="Native American or Alaskan Native"
              value="Native American or Alaskan Native"
            />
            <Picker.Item
              label="White or Caucasian"
              value="White or Caucasian"
            />
            <Picker.Item label="Two or more races" value="Two or more races" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <Text style={styles.header}> Sleep Schedule</Text>
          <Text style={styles.label}> Wake-up time:</Text>
          
            {Platform.OS == "ios" ? (
              <DateTimePicker
                style={{ width: 100, backgroundColor: "transparent" ,  alignContent: "center", alignSelf: "center"}}
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
                style={{ width: 100, backgroundColor: "transparent",  alignContent: "center", alignSelf: "center" }}
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
            name="Register"
            onPress={() => {
              passwordMatchCheck();
              check();
              console.log(race);
            }}
          />

          <Text style={styles.label}>
            By registering, you automatically accept the Terms and Conditions of
            Place&Recovery.
          </Text>

          <TouchableOpacity
            style={styles.buttonSmall}
            onPress={() => {
              navigation.navigate("TermsAndConditions");
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonTextSmall}>
              View Terms and Conditions
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    
    justifyContent: 'center',
  },
  password: {
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F',
  
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#072B4F',
    textAlign: 'center'
  },
  input: { 
      height: 45,
      margin: 15,
      paddingLeft: 10,
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 18,
      borderColor: '#072B4F',
      justifyContent: 'center'
  },
  label: {
    textAlign: 'center',
    margin: 20,
    marginLeft: 40,
    marginRight: 40,
    color: '#072B4F', 
  },
  label2: {
    textAlign: 'center',
     margin: 20,
     marginLeft: 40,
     marginRight: 40,
   
     color: '#072B4F', 
     fontSize: 22, 
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
  button: {
    width: 250,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 5,
    
  },
  buttonSmall: {
    width: 250,
    height: 45,
    backgroundColor: "#C4C4C4",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 80
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextSmall: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 14,
    fontWeight: "bold",
  }
});
