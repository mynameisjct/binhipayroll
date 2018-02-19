import React from 'react';
import { StyleSheet } from 'react-native';

export default {
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8);',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flex:1
    },

    modalRules: {
        container: {
            flex: 1
        },
        innerCont: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#f9f9f9',
            margin: 30,
            borderRadius: 15,
            elevation: 20,
        },

        titleCont: {
            width: '100%',
            backgroundColor: '#EEB843',
            borderWidth: 1,
            borderColor: '#D1D4D6',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        },

        footerCont: {
            backgroundColor: '#F2F1EF',
            flexDirection: 'row',
            height: 40,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },

        txtHeader: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 16,
            color: '#434646',
            fontWeight: '600',
            paddingLeft: 25,
            paddingRight: 25
        },

        contentCont: {
            flex: 1,
            width: '100%',
            backgroundColor: '#FFF'
        },

        btnContLeft: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 0.7,
            borderColor: '#D1D4D6',
            borderBottomLeftRadius: 15
        },

        btnContRight: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 0.7,
            borderColor: '#D1D4D6',
            borderBottomRightRadius: 15,
        },

        txtBtn: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 15,
            textAlignVertical: 'center'
        },

        contTextWrapper: {
            flex: 1,
            height: '100%',
            width: '100%'
        }
    },
}