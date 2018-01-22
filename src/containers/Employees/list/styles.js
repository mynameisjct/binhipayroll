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

    rightCont: {
        flex: 1,
        backgroundColor: '#fff',
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
        flex: 1,
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
        color: '#fff',
        fontWeight: '400'
    },

    txtLabelTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        color: '#fff',
        fontWeight: '500'
    },



    iconFilter: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center'
    },





    iconPlaceholder: {
        width: 40,
        height: 40,
        backgroundColor: '#EEB843',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconCont: {
        width: 55,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
}
   