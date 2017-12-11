  /**************************************************************
 *  FileName:           styles.js
 *  Description:        Custom Cards Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-12-01

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    container:{
        flex:1,
        flexDirection: 'column',
        paddingBottom: 5
    },

    titleCont: {
        backgroundColor: '#D1D4D6',
        height: 60,
        justifyContent: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#D1D4D6'
    },

    txtTitle: {
        fontFamily: 'Helvitica-Light',
        fontSize: 18,
        color: '#434646'
    },

    txtDescription: {
        fontFamily: 'Helvitica-Light',
        fontSize: 12,
        color: '#505251'
    },

    textCont: {
        paddingLeft: 25,
        flexDirection: 'row'
    },

    contentCont: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
    },

    detailsCont: {
        backgroundColor: 'transparent',
        margin: 25,
    }
};