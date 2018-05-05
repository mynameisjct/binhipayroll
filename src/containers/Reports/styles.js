/**************************************************************
 *  FileName:           styles.js
 *  Description:        Reports
 *  Copyright:          Binhi-MeDFI © 2018
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2018-05-05

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex:1,
        flexDirection: 'row',
    },

    leftCont: {
        flex: 1,
        maxWidth: 240,
        backgroundColor: '#ECECEC',
        flexDirection: 'column',
        elevation: 20,
        borderRightWidth: 2,
        borderColor: '#1d1e1e'
    }
}