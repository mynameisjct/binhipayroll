import React from 'react';
import { StyleSheet } from 'react-native';

export default {
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8);',
        alignItems: 'center',
        justifyContent: 'center'
    },

    modalRules: {
        container: {     
            backgroundColor: '#FFFFFF',
            minHeight: '10%',
            borderRadius: 5,
            maxHeight: '60%',
            maxWidth: '80%'
        },

        titleCont: {
            backgroundColor: '#EEB843',
            borderWidth: 1,
            borderColor: '#D1D4D6',
            justifyContent:'center',
            alignItems:'center',
            minHeight: 50,
            minWidth: 250,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            elevation: 3
        },
        

        txtHeader: {
            fontFamily: 'Helvetica-Bold',
            fontSize: 15,
            color: '#434646',
            fontWeight: '600',
            paddingLeft: 25,
            paddingRight: 25
        },

        contentCont: {
            /* flex: 1, */
            backgroundColor: 'transparent',
            /* padding: 10, */
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
        },

        contOption: {
            padding: 20,
            backgroundColor: 'transparent',
        },

        emptyList: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
        },

        divider: {
            height: 1,
            marginLeft: 18,
            marginRight: 18,
            backgroundColor: '#D1D4D6'
        }
    },
}