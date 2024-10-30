import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NavigationContainer } from "@react-navigation/native";

import axios from "axios";
import { ScrollView } from "react-native";
import { AuthContext } from "../navigation/context";

import {backendUrl} from "../config/config.json";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authFunctions } = React.useContext(AuthContext);
  const { signIn } = authFunctions;
  const handleLogin = () => {
    axios
      .post(`${backendUrl}/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const { message } = response.data;
        const { status, data } = response;
        if (status == 200) {
          console.log("logged in");
          signIn(data.token);
        } else {
          // todo
          console.log(message);
        }
        // console.log(response);
      })
      .catch((error) => {
        if (error.message == "Network Error") {
          Alert.alert(error.message);
        } else {
          Alert.alert("Email or password is incorrect");
        }
      });
  };
  const handleForget = () => {};
  const handleSignUp = () => {
    navigation.navigate("Registration");
  };

  return (
    <ImageBackground
      source={require("../assets/images/bgnew.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={[styles.frameContainer, styles.shadowProp]}>
            <Text style={styles.TitleText}>Welcome</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#BEBEBE"
                textContentType={"username"}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#BEBEBE"
                secureTextEntry={true}
                textContentType={"password"}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonTextWhite}>Login</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{ marginTop: 20 }}
              //onPress={() => navigation.navigate("WelcomeScreen")}
              onPress={() => navigation.navigate("EmailVerificationScreen")}
            >
              Forgot Password ?
            </Text>

            <View style={{ flexDirection: "row", marginTop: 40 }}>
              <Text style={styles.contentText}>Don't have an account? </Text>
              <Text style={styles.contentTextTouch} onPress={handleSignUp}>
                Sign Up
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  frameContainer: {
    width: "80%",
    flex: 0.1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 16,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  TitleText: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 30,
    paddingTop: 30,
  },
  inputContainer: {
    width: "80%",
    borderBottomColor: "#BEBEBE",
    borderBottomWidth: 1.5,
  },
  textInput: {
    width: "95%",
    color: "#072B4F",
    fontSize: 17,
    marginTop: 5,
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomColor: "white",
  },
  button: {
    width: 250,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 5,
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextDark: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentText: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 15,
    fontWeight: "normal",
  },
  contentTextTouch: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 15,
    fontWeight: "bold",
  },
});
