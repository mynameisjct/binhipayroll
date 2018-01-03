/**************************************************************
 *  FileName:           styles.js
 *  Description:        Digital Clock Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    loadingCont:{
        flex:1,
        backgroundColor: 'rgba(255, 255, 255,1);',
        justifyContent: 'center',
        alignItems: 'center',
    },

    txtMsg: {
        color: '#434646',
        fontFamily: 'Helvetica-Light',
        fontSize: 18,
        marginBottom: 10,
    },

    txtMsgError: {
        color: '#D75450',
        fontFamily: 'Helvetica-Light',
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic'
    },

    errorCont: {
        flex: 1,
        backgroundColor: 'blue',
    },
    
    placeHolderErrorMessage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }

};