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
        maxWidth: 250,
        backgroundColor: '#505251',
        flexDirection: 'column',
        elevation: 20
    },

    contTitle: {
        minHeight: 60,
        justifyContent: 'center',
      },

    txtTitle: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center',
        margin: 10,
        fontWeight: '500',
        color: '#fff',
        backgroundColor: 'transparent',
        textShadowColor: '#EEB843'
    },

    profileCont: {
        minHeight: 70,
        backgroundColor: '#2C5C36',
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
        height: 90,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderBottomWidth: 1.5,
        borderColor: '#6C7A89'
    },

    labelCont: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20
    },

    txtLabel:{
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#fff'
    },

    txtLabelTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 16,
        color: '#fff',
        fontWeight: '500'
    },

}
   