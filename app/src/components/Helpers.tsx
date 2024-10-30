import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform, Alert, Linking } from "react-native";
import AndroidOpenSettings from "react-native-android-open-settings";
import { DaySchedule, TimeBlock } from "./types";

/**
 * Return the date in the format "YYYY-MM-DD".
 * @param date a date object
 * @returns a string of format date
 */
export function formatDate(date: Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

/**
 * Convert a date object into format string. Includes hours, minutes, and seconds
 * @param t a date object
 * @returns a string
 */
export function convertTime(t: Date) {
  let format =
    t.toString().split(" ")[0] +
    ", " +
    ("0" + (t.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + t.getDate()).slice(-2) +
    "/" +
    t.getFullYear() +
    ", " +
    ("0" + t.getHours()).slice(-2) +
    ":" +
    ("0" + t.getMinutes()).slice(-2) +
    ":" +
    ("0" + t.getSeconds()).slice(-2) +
    " ";
  return format;
}

/**
 * return "YY-MM-DD+1"
 * @param date string in "YY-MM-DD"
 * @returns string
 */
export function nextDate(date: string) {
  let nextDate = new Date(date + "T00:00");
  nextDate.setDate(nextDate.getDate() + 1);
  return formatDate(nextDate);
}

/**
 *
 * @param date1 the latest date in number
 * @param date2 the previous date in number
 */
export function timeDifference(date1: number, date2: number) {
  var difference = date1 - date2;

  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  //   console.log(
  //     "difference = " +
  //       daysDifference +
  //       " day/s " +
  //       hoursDifference +
  //       " hour/s " +
  //       minutesDifference +
  //       " minute/s "
  //   );
  return { daysDifference, hoursDifference, minutesDifference };
}

/**
 * Store string data into local async storage
 * @param key
 * @param value
 */
export async function storeDataString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    // console.log("save " + key + " : " + value + " successfully!");
  } catch (e) {
    console.log(e);
  }
}

/**
 * retrive string data from local storage
 * @param key
 * @returns string
 */
export async function retrieveDataString(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("fail to fetech");
    // Error retrieving data
  }
}

// /**
//  * Code from https://docs.expo.dev/push-notifications/overview/
//  *
//  * @returns getExpoPushTokenAsync, token
//  */
// export async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       // alert("Failed to get push token for push notification!");
//       goToSettings(
//         "Require notification permission",
//         "The app needs to notify you when the questionnaire is ready. Please enable notification in your phone settings."
//       );
//       return;
//     }
//     try {
//       token = (await Notifications.getExpoPushTokenAsync()).data;
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }
//   // 4:36 if token
//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// }

/**
 * Push notification;
 * https://docs.expo.dev/push-notifications/overview/
 * @param expoPushToken expoToken; return from registerForPushNotificationsAsync() / Notifications.getExpoPushTokenAsync()
 */
// export async function sendPushNotification(expoPushToken: any) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

//   try {
//     await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Accept-encoding": "gzip, deflate",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(message),
//     });
//   } catch (e) {
//     console.log(e);
//   }
  
// }

/**
 * Go to the system settings
 * @param title title of the alert
 * @param content message of the alert
 */
export function goToSettings(title: string, content: string) {
  Alert.alert(title, content, [
    { text: "Cancel" },
    {
      text: "Ok",
      onPress: () => {
        Platform.OS === "ios"
          ? Linking.openURL("app-settings:")
          : AndroidOpenSettings.applicationSettings();
      },
    },
  ]);
}

/**
 * generate a day schedule based on sleep schedule
 * @param wakeUp wake up time
 * @param sleep sleep time
 * @returns a day schedule
 */
export function generateDaySchedule(
  wakeUp: number,
  sleep: number,
  date: string
): DaySchedule {
  let interval = Math.floor((sleep - wakeUp) / 3);
  let times = Array<TimeBlock>(3);
  for (var i = 0; i < times.length; ++i) {
    times[i] = {
      begin: wakeUp + i * interval,
      end: wakeUp + (i + 1) * interval,
      completed: false,
      identifier: "",
    };
  }
  let daySchedule = {
    timeBlocks: times,
    completed: Array(3).fill(false),
    notificationTime: generateNotificationTime(times),
    date: date,
  };
  return daySchedule;
}

export function generateNotificationTime(
  timeBlocks: Array<TimeBlock>
): Array<number> {
  let times = new Array<number>(timeBlocks.length);
  timeBlocks.forEach(function (item, index) {
    let time = getRandomInt(item.begin, item.end);
    times[index] = time;
  });
  return times;
}

/**
 * Generate random int between [min, max)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param min number
 * @param max number
 * @returns a random int in [min, max)
 */
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/**
 * Return the index (base 0) of interval that current tims is in. If the questionnaire is not open in during the time, it will return -1
 * @param current current date or hour
 * @param notificationTimes an array of notification time. Questionnaire is open within an hour after the notification time.
 * @returns index or -1
 */
export function inQuestionnaireOpenInterval(
  current: Date | number,
  notificationTimes: Array<number>
): number {
  let hour = typeof current == "number" ? current : current.getHours();
  for (var i = 0; i < notificationTimes.length; ++i) {
    if (hour == notificationTimes[i]) {
      return i;
    }
  }
  return -1;
}