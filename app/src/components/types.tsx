/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Questionnaire: {} | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeStack: undefined;
  Location: undefined;
  Progress: undefined;
  ProfileStack: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type CountOfTakenQofDay = {
  date: string;
  count: number;
};

/**
 * begin and end are hours (24-hour). end - begin must >= 1.
 */
export type TimeBlock = {
  begin: number;
  end: number;
  completed: boolean;
  identifier: any;
};

export type DaySchedule = {
  timeBlocks: Array<TimeBlock>;
  completed: Array<boolean>;
  notificationTime: Array<number>; // time in hours (24)
  date: string; // 'yyyy-mm-dd'
};

export type DayStatus = {
  q1: number;
  q2: number;
  q3: number;
};