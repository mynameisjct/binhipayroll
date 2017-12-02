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
        flexDirection: 'column'
    },

    titleCont: {
        backgroundColor: 'rgba(0, 0, 0, 0.2);',
        height: 50,
        justifyContent: 'center',
        borderTopWidth: 0.7,
        borderBottomWidth: 0.7,
        borderColor: '#D1D4D6'
    },

    txtTitle: {
        fontFamily: 'Helvitica-Light',
        fontSize: 16,
        paddingLeft: 25,
        color: '#434646'
    },

    contentCont: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
    },

    detailsCont: {
        backgroundColor: 'transparent',
        margin: 25,
    }
};