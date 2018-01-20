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
        elevation: 20
    },

    contTitle:{
        minHeight: 60,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    contTitleName:{
        flex:1,
        backgroundColor: 'transparent'
    },

    contTitleHide:{
        width: 30,
        minHeight: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
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


    btnCont: {
        flex: 1,
        height: 90,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderTopWidth: 0.5,
        borderColor: '#1d1e1e'
    },

    labelCont: {
        flex: 0.7,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 15  
    },

    txtLabel:{
        fontFamily: 'Helvetica-Light',
        fontSize: 14,
        color: '#fff'
    },

    txtFirstLetter:{
        fontFamily: 'Helvetica-Light',
        fontSize: 17,
        color: '#fff'
    },

    txtLabelTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        color: '#fff',
        fontWeight: '500'
    },

    contSearchBox: {
        flex: 0.8,
        borderRadius: 20,
        height: 37,
        width: 50,
        backgroundColor: '#fff',
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
        width: 50,
        height: 50,
        backgroundColor: '#EEB843',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconCont: {
        flex: 0.3,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
}
   