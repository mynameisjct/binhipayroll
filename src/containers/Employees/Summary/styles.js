/**************************************************************
 *  FileName:           styles.js
 *  Description:        Company Policy Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {
    container: {
        flex:1,
        flexDirection: 'column',
    },
    
    contCard: {
        flex:1
    },

    contFooter: {
        height: 40,
        width: '100%',
        backgroundColor: '#2b5876',
        elevation: 20,
        shadowOffset: {width: -2, height: -2},
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtLabel: {
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Helvetica-Light',
        fontWeight: '400',
        fontStyle: 'italic'
    },

    txtDefault: {
        fontSize: 14,
        color: '#212223',
        fontFamily: 'Helvetica-Light',
    },

    rightCont: {
        flex: 1,
        backgroundColor: '#fff',
    },

}
   