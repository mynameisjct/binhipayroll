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
        maxWidth: 240,
        backgroundColor: '#ECECEC',
        flexDirection: 'column',
        elevation: 20,
        borderRightWidth: 2,
        borderColor: '#1d1e1e'
    },

    contTitle: {
        minHeight: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    contSearch: {
        minHeight: 60,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3f4144'
    },

    txtTitle: {
        fontSize: 15,
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

    titleCont:{
        flex: 1,
        height: 35,
        flexDirection: 'row',
        backgroundColor: '#818489',
        borderTopWidth: 0.5,
        borderColor: '#1d1e1e'
    },

    btnCont: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderTopWidth: 0.5,
        borderColor: '#1d1e1e'
    },

    labelCont: {
        flex: 0.75,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15  
    },

    contContentTitle: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtLabel:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        color: '#fff',
        fontWeight: '300'
    },

    txtFirstLetter:{
        fontFamily: 'Helvetica-Light',
        fontSize: 17,
        color: '#fff'
    },

    txtLabelTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 13,
        color: '#fff',
        fontWeight: '500'
    },

    contSearchBox: {
        flex: 1,
        borderRadius: 20,
        height: 37,
        width: 50,
        backgroundColor: '#fff',
        marginLeft: 15,
        marginRight: 15
        
    },

    iconFilter: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconSearch: {
        position: 'absolute',
        top: 5,
        bottom: 0,
        left: 7,
        right: 0
    },

      //Text field Style
    textinputField:{
        height: '100%',
        paddingLeft: 35,
        fontSize: 14
    },

    iconPlaceholder: {
        width: 35,
        height: 35,
        backgroundColor: '#EEB843',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconCont: {
        flex: 0.25,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    contIconProfile: {
        width: 80,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    contInfoProfile: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingLeft: 10,
        flexDirection: 'column'
    },

    txtProfileLabel:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 11,
        color: '#fff',
    },

    txtProfileTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 14,
        color: '#fff',
        fontWeight: '500'
    },
}
   