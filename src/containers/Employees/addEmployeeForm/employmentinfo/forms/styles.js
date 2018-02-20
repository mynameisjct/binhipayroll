import React from 'react';
import { StyleSheet } from 'react-native';

export default {
    container: {
        paddingTop: 30,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        minWidth: 300
    },

    contForm: {
        flex: 1
    },

    formContent: {
        flex: 1,
        paddingTop: 25,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 25
    },

    btnDelete: {
        container: {
            height: 40,
            borderRadius: 15,
            backgroundColor: '#C70000',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            marginTop: 30,
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 15
        },

        txtBtn: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 16,
            color: '#fff',
            fontWeight: '500'
        }
    }
}