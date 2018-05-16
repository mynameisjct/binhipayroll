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
    },

    optionsCont: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    
    btnCont: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderTopWidth: 0.5,
        borderColor: '#1d1e1e'
    },

    btnContActive: {
        backgroundColor: 'rgba(255, 153, 36, 0.1);'
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
        color: '#eaeced',
        fontWeight: '300'
    },

    iconPlaceholder: {
        elevation: 15,
        width: 32,
        height: 32,
        backgroundColor: '#EEB843',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    iconCont: {
        flex: 0.25,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    titleCont:{
        flex: 1,
        height: 20,
        flexDirection: 'row',
        backgroundColor: '#cccccc',
        borderTopWidth: 0.5,
        borderColor: '#1d1e1e',
        elevation: 30,
        zIndex: 999
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

    txtTitle: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center',
        margin: 10,
        fontWeight: '500',
        color: '#fff',
        backgroundColor: 'transparent',
        textShadowColor: '#EEB843'
    },

    rightCont: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    txtLabelTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        color: '#000000',
        fontWeight: '500',
        /* fontStyle: 'italic' */
    },

    reportContentStyle: {
        container: {
            flex: 1,
            flexDirection: 'row'
        },

        contContent: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#e2e2e2',
            elevation: 3,
            
        },

        contHeader: {
            flex: 1,
            minHeight: 59,
            maxHeight: 59,
            elevation: 3,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#D1D4D6'
        },

        contBody: {

        },


        contFilter: {
            flex: 1,
            maxWidth: 180,
            minWidth: 180,
            backgroundColor: '#D1D4D6',
            flexDirection: 'column'
        },

        contFilterTitle: {
            flex: 1,
            maxHeight: 50,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center'
        },

        txtFilterTitle: {
            fontFamily: 'Helvetica-Bold',
            fontWeight: '500',
            fontSize: 14,
            color: '#434646'
        },

        txtHeaderTitle: {
            fontFamily: 'Helvetica-Bold',
            fontWeight: '500',
            fontSize: 14,
            color: '#434646'
        }
    },

    reportsFlatlist: {
        paddingBottom: 100,
        paddingTop: 15
    }
}