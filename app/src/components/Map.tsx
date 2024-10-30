import * as React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text as DefaultText, View as DefaultView, Dimensions } from 'react-native';

export default function Map() {
    return(
        <DefaultView style={styles.container}>
        <MapView style={styles.map} />
      </DefaultView>
    ) 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });