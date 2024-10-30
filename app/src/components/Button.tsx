import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Touchable } from 'react-native';

export default function ButtonDesign({name, onPress}) {
    return (
        <TouchableOpacity onPress = {onPress}>
            <View style = {styles.button}>
                <Text style = {styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#072B4F',
        width: 290,
        height: 45,
        borderRadius: 10,
        marginTop: 35,
        alignSelf:'center'
        

    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,


    }
  });