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
        flexDirection: 'row',
    },

    leftCont: {
        flex: 1,
        maxWidth: 200,
        backgroundColor: '#fff',
        borderRightWidth: 2,
        borderColor: '#D1D4D6'
    },

    scrollableCont: {
        backgroundColor: 'transparent',
    },

    optionsCont: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },

    rightCont: {
        flex: 1,
        backgroundColor: '#fff',
    },

    btnCont: {
        height: 60,
        flexDirection: 'row',
    },

    iconCont: {
        flex: 0.3,
        marginRight: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    labelCont: {
        flex: 0.7,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    iconPlaceholder: {
        width: 35,
        height: 35,
        backgroundColor: '#EEB843',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtLabel:{
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#434646'
      },

}
