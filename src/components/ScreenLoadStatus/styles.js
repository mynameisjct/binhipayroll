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
        color: '#8E929A',
        fontFamily: 'Helvetica-Bold',
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: '300'
    },

    errorCont: {
        flex: 1,
    },
    
    placeHolderErrorMessage: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: 'transparent', 
    },

    contTap: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center'
    },

    placeholderIcon: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
        marginRight: 120
    },

    placeholderMsg: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: -100
    },

    contCloud: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
    },

    iconCloud: {
        marginBottom: -15
    },

};