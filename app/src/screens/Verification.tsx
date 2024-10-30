import React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';

import { Text } from '../components/Themed';
import ButtonDesign from '../components/Button';

import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

import {backendUrl} from "../config/config.json";

export default function Verification({ route, navigation }) {
  const [verification, setVerificationCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { email } = route.params;
  const [error, setError] = React.useState("");
  const [showErrorMessage,setShowErrorMessage] = React.useState(false);

  const passwordMatchCheck = () => {
    if (verification == "" ||password == "" || confirmPassword == "") {
      setShowErrorMessage(true);
      setError("*Please fill in all the fields");
    } else if (password == confirmPassword) {
        if (password.length >= 6) {
          handleChangePassword(email, verification, password)
        } else {
          setShowErrorMessage(true);
          setError("*Password has to contain at least 6 characters and at least one number");
        }
      } 
    else {
      setShowErrorMessage(true);
      setError("*Passwords don't match");
    }
  };

  const handleChangePassword = (email, resetCode: string, newPassword) => {
    console.log(resetCode);
    console.log(email);
    console.log(newPassword);
    axios
      .post(`${backendUrl}/api/auth/resetpassword`, {
        email,
        resetCode,
        newPassword,
      })
      .then((response) => {
        // console.log(response.data);
        
        const { message } = response.data;
        const { status, data } = response;
        // console.log(status);
        if (status == 200) {
          navigation.navigate("Login");
          Alert.alert("Your password is reset!");
        }
      })
      .catch((error) => {
        console.log("error");
        const { message } = error.response.data;
        
        setShowErrorMessage(true);
        setError(message);
        
        console.log(error);
        console.log(error.response.data);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.label}>Please enter the verification code</Text>
          <TextInput
            style={styles.input}
            placeholder="Verification Code"
            maxLength={15}
            value={verification}
            onChangeText={(inp) => setVerificationCode(inp)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            maxLength={20}
            onChangeText={(inp) => setPassword(inp)}
            value={password}
            secureTextEntry={true}
            textContentType={"newPassword"}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            maxLength={20}
            onChangeText={(inp) => setConfirmPassword(inp)}
            value={confirmPassword}
            secureTextEntry={true}
          />

          <ButtonDesign name="Confirm" onPress={() => passwordMatchCheck()} />
          {showErrorMessage ? (
            <Text style={styles.errorMessage}>{error}</Text>
          ) : null}
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
  errorMessage: {
    marginTop: 10,
    textAlign: 'center',
    marginLeft: 40,
    marginRight: 40,
    color: 'red', 
  },
 
  
});