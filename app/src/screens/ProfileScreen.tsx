import {
  StyleSheet,
  Button,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../components/types";
import { AuthContext } from "../navigation/context";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config/config.json";
import { getItemAsync } from "expo-secure-store";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const { authFunctions, userInfo } = React.useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [race, setRace] = React.useState("");
  const [counter, setCounter] = React.useState(0);

  const { signOut } = authFunctions;
  const handleSignOut = () => {
    // if (testmode) {
    //   signOut();
    //   return;
    // }
    console.log("logging out");
    signOut();
  };

  const getUserInformation = async () => {
    const token: string = (await getItemAsync("user_token"))!;
    const userInfo = axios
      .get(`${backendUrl}/api/auth/user`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => {
        setPhoneNumber(response.data.phoneNumber);

        setAddress(response.data.address);
        setCity(response.data.city);
        setZip(response.data.zip);
        setState(response.data.state);
        setRace(response.data.race);
        setGender(response.data.gender);

        const { message } = response.data;
        const { status, data } = response;
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.data);
      });
  };

  useEffect(() => {
    if (counter == 0) {
      console.log(counter);
      getUserInformation();
      setCounter(1);
    }

    const interval = setInterval(() => {
      getUserInformation();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // console.log(firstName);
  return (
    <ImageBackground
      source={require("../assets/images/home4.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
          <Text style={styles.account}>Account Information</Text>

          <TouchableOpacity
            style={styles.buttonStyle}
            //onPress={() => null}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>
              {" "}
              <Text style={styles.subtitle}> 
                Name{" "}
              </Text>
              <Text style={styles.info}>
                : {userInfo.firstName} {userInfo.lastName}
              </Text>{" "}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            //onPress={}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>
              {" "}
              <Text style={styles.subtitle}> 
                Email
              </Text>
              <Text style={styles.info}>: {userInfo.email} </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            //onPress={() => navigation.navigate("Gender")}
            activeOpacity={0.85}
          >
            <Text style={styles.label}> 
              <Text style={styles.subtitle}> 
                Gender
              </Text>
            : {gender}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            //onPress={() => navigation.navigate("Ethnicity")}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>
              <Text style={styles.subtitle}> 
                Race/Ethnicity
              </Text>
            : {race}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("Edit Phone Number")}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>
              {" "}
              <Text style={styles.subtitle}> 
                Phone Number
              </Text>
              : {phoneNumber}{" "}
              <Text style={styles.editText}>[Edit]</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("Edit Address")}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>
              <Text style={styles.subtitle}> 
                Address
              </Text>
              : {address}, {city}, {state} {zip}{" "}
              <Text style={styles.editText}>[Edit]</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("Sleep Schedule")}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>
              {" "}
              <Text style={styles.subtitle}> 
                Sleep Schedule
              </Text>
              <Text style={styles.editText}> [Edit]</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              {
                navigation.navigate("Demographics");
              }
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.label}>
              <Text style={styles.subtitle}> 
                Additional Demographics
              </Text>
              <Text style={styles.editText}> [Edit]</Text>
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonTextWhite}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF00",
    //justifyContent: "center",
  },
  buttonTextWhite: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: "#072B4F",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonStyle: {
    width: 320,
    height: 58,
    paddingVertical: 8,
    backgroundColor: "#DBECEE",
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: "center",
    borderColor: "#184E77",
    borderWidth: 1,
    marginTop: 10,
  },
  buttonComponent: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  label: {
    textAlign: "left",
    marginLeft: -3,
    flexWrap: "wrap",
    fontSize: 15,
    color: "#072B4F",
  },
  subtitle: {
    margin: 20,
    fontWeight: "bold",
    fontSize: 15,
    color: "#072B4F",
  },
  info: {
    textAlign: "right",
    flexWrap: "wrap",
    flex: 1,
  },
  account: {
    margin: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
  editText: {
    fontSize: 13,
    color: "gray",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
