import { StyleSheet, Button, TouchableHighlightBase } from "react-native";

import {
  ScrollView,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  AppState,
} from "react-native";

import { BarChart, LineChart } from "react-native-chart-kit";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { backendUrl } from "../config/config.json";
import { NavigationEvents } from "react-navigation";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Questionnaire from "./QuestionnaireScreen";

// let stress = [0, 0, 0, 0, 0, 0, 0];
// let calmness = [0, 0, 0, 0, 0, 0, 0];
// let sadness = [0, 0, 0, 0, 0, 0, 0];
// let anxiety = [0, 0, 0, 0, 0, 0, 0];
export default function ProgressScreen() {
  const [sadness, setsadness] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [anxiety, setanxiety] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [stress, setstress] = useState([0, 0, 0, 0, 0, 0, 0]);
  const appState = useRef(AppState.currentState);
  const [counter, setCounter] = React.useState(0);
  const isFocused = useIsFocused();

  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // const handleAppStateChange = (state) => {
  //   setAppStateVisible(state);
  // };
  // // https://reactnative.dev/docs/appstate
  // // https://rossbulat.medium.com/working-with-app-state-and-event-listeners-in-react-native-ffa9bba8f6b7
  // useEffect(() => {
  //   AppState.addEventListener("change", handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener("change", handleAppStateChange);
  //   };
  // }, []);

  const updateSadness = (day, value) => {
    setsadness((existingItems) => {
      return existingItems.map((item, j) => {
        return j === day ? item + value : item;
      });
    });
  };

  const updateStress = (day, value) => {
    setstress((existingItems) => {
      return existingItems.map((item, j) => {
        return j === day ? item + value : item;
      });
    });
  };

  const updateAnxiety = (day, value) => {
    setanxiety((existingItems) => {
      return existingItems.map((item, j) => {
        return j === day ? item + value : item;
      });
    });
  };

  // const checkState = () => {
  //   console.log(sadness);
  //   console.log(stress);
  //   console.log(anxiety);
  // };

  const getResult = async () => {
    setsadness([0, 0, 0, 0, 0, 0, 0]);
    setanxiety([0, 0, 0, 0, 0, 0, 0]);
    setstress([0, 0, 0, 0, 0, 0, 0]);
    const token = await getItemAsync("user_token");
    // console.log(token);
    axios
      .get(`${backendUrl}/api/question/answer/frommonday`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        let count = [0, 0, 0, 0, 0, 0, 0];
        console.log(response);
        // per questionnaire
        for (let i = 0; i < response.data.answers.length; i++) {
          // This is the questionnaire
          // console.log("?????");
          const questionnaire = response.data.answers[i];
          // console.log("======================");
          // console.log(questionnaire.answers[0].answer);
          const questions = questionnaire.answers;
          // date of the questionnaire
          // console.log(questions);
          const date = questionnaire.datetime.substring(0, 10);
          const d = new Date(date);
          // day of the questionnaire
          let day = d.getDay();
          count[day] = count[day] + 1;

          updateSadness(day, questions[0].choiceIndex + 1);
          updateAnxiety(day, questions[1].choiceIndex + 1);
          updateStress(day, questions[2].choiceIndex + 1);
          // // monday
          // if (day == 0) {
          //   // add results to the array
          //   updateSadness(0, questions[0].choiceIndex + 1);
          //   updateAnxiety(0, questions[1].choiceIndex + 1);
          //   updateStress(0, questions[2].choiceIndex + 1);
          //   // tuesday
          // } else if (day == 1) {
          //   updateSadness(1, questions[0].choiceIndex + 1);
          //   updateAnxiety(1, questions[1].choiceIndex + 1);
          //   updateStress(1, questions[2].choiceIndex + 1);
          // } else if (day == 2) {
          //   updateSadness(2, questions[0].choiceIndex + 1);
          //   updateAnxiety(2, questions[1].choiceIndex + 1);
          //   updateStress(2, questions[2].choiceIndex + 1);
          // } else if (day == 3) {
          //   updateSadness(3, questions[0].choiceIndex + 1);
          //   updateAnxiety(3, questions[1].choiceIndex + 1);
          //   updateStress(3, questions[2].choiceIndex + 1);
          // } else if (day == 4) {
          //   updateSadness(4, questions[0].choiceIndex + 1);
          //   updateAnxiety(4, questions[1].choiceIndex + 1);
          //   updateStress(4, questions[2].choiceIndex + 1);
          // } else if (day == 5) {
          //   updateSadness(5, questions[0].choiceIndex + 1);
          //   updateAnxiety(5, questions[1].choiceIndex + 1);
          //   updateStress(5, questions[2].choiceIndex + 1);
          // } else if (day == 6) {
          //   updateSadness(6, questions[0].choiceIndex + 1);
          //   updateAnxiety(6, questions[1].choiceIndex + 1);
          //   updateStress(6, questions[2].choiceIndex + 1);
          // }
        }
        for (let i = 0; i < 7; i++) {
          if (count[i] != 0) {
            setsadness((existingItems) => {
              return existingItems.map((item, j) => {
                return j === i ? item / count[i] : item;
              });
            });
            setanxiety((existingItems) => {
              return existingItems.map((item, j) => {
                return j === i ? item / count[i] : item;
              });
            });
            setstress((existingItems) => {
              return existingItems.map((item, j) => {
                return j === i ? item / count[i] : item;
              });
            });
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.data);
      });
  };

  useEffect(() => {
    (async () => {
      await getResult();
    })();

    // console.log(stress);
    // console.log(sadness);
  }, [isFocused]);

  function* hapYLabel() {
    yield* [0, 1, 2, 3, 4, 5];
  }

  const hapyLabelIterator = hapYLabel();

  function* calmYLabel() {
    yield* [0, 1, 2, 3, 4, 5];
  }

  const calmLabelIterator = calmYLabel();

  function* sadYLabel() {
    yield* [0, 1, 2, 3, 4, 5];
  }

  const sadLabelIterator = sadYLabel();
  return (
    <ImageBackground
      source={require("../assets/images/home4.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.TitleText}>Stress</Text>
          <LineChart
            data={{
              labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
              datasets: [
                {
                  data: stress,
                  // data: [0, 0, 0, 0, 0, 4, 0],
                },
                {
                  data: [5],
                  withDots: false, //a flage to make it hidden
                },
              ],
            }}
            bezier
            showValuesOnTopOfBars={true}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220} //adjust the height of the graph
            segments={5}
            chartConfig={{
              fillShadowGradient: "#34A0A4",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              // backgroundGradientFrom: "#82A3FF",
              // backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              // formatYLabel: () => hapyLabelIterator.next().value,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.TitleText}>Anxiety</Text>
          <LineChart
            data={{
              labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
              datasets: [
                {
                  data: anxiety,
                  // data: [0, 0, 0, 0, 0, 4, 0],
                },
                {
                  data: [5],
                  withDots: false, //a flage to make it hidden
                },
              ],
            }}
            bezier
            showValuesOnTopOfBars={true}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220} //adjust the height of the graph
            segments={5}
            chartConfig={{
              fillShadowGradient: "#34A0A4",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              //backgroundColor: "#eee",
              // backgroundGradientFrom: "#82A3FF",
              // backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              // formatYLabel: () => calmLabelIterator.next().value,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text style={styles.TitleText}>Sadness</Text>
          <LineChart
            data={{
              labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
              datasets: [
                {
                  data: sadness,
                  // data: [0, 0, 0, 3, 0, 4, 0],
                },
                {
                  data: [5],
                  withDots: false,
                  // data: [0, 0, 0, 3, 0, 4, 0],
                },
                // {
                //   data: [0, 0, 0, 0, 0, 0, 5],
                //   withDots: false,
                // },
              ],
            }}
            bezier
            showValuesOnTopOfBars={true}
            width={Dimensions.get("window").width - 20} // from react-native
            height={220} //adjust the height of the graph
            segments={5}
            chartConfig={{
              fillShadowGradient: "#34A0A4",
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              //backgroundColor: "#eee",
              // backgroundGradientFrom: "#82A3FF",
              // backgroundGradientTo: "#FFFFFF",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              // formatYLabel: () => sadLabelIterator.next().value,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  TitleText: {
    textAlign: "center",
    color: "#072B4F",
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 30,
    paddingTop: 30,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  shadowPropButton: {
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  // scrollView: {
  //   marginHorizontal: 20,
  // },
});
