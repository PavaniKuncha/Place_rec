import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

import { Text } from '../components/Themed';
import ButtonDesign from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OpeningScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1, justifyContent:'center'}}>
            <KeyboardAvoidingView style={styles.container} behavior = "padding">
                <Text style = {styles.title} >This is the screen that will open by default when the app is launched. </Text>
                <Text>Add buttons to login and register.</Text>
                <ButtonDesign name='Register' onPress={() => navigation.navigate('Registration')}/>
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
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  