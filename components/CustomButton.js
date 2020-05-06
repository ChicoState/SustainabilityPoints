import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export const CustomButton = (props) => {
    const { title = 'Enter', style = {}, textStyle = {}, onPress } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#2AC062',
        borderRadius: 5,
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        shadowColor: '#2AC062',
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
    },

    text: {
        color: '#FFFFFF',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});
