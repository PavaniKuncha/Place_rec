/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from "../components/types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          HomeScreen: {
            screens: {
              HomeScreen: 'home',
            },
          },
          LocationScreen: {
            screens: {
              LocationScreen: 'location',
            },
          },
          SettingsScreen: {
            screens: {
              SettingsScreen: 'settings',
            },
          },
          ProfileScreen: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
/*           RegistrationScreen : {
            screens: {
              RegistrationScreen: 'registration',
            },
          } */
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
