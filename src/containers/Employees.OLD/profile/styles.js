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
        backgroundColor: '#202626',
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
        backgroundColor: 'transparent',
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

    txtFirstLetter:{
        fontFamily: 'Helvetica-Light',
        fontSize: 17,
        color: '#fff'
    },

    txtLabelTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        color: '#000000',
        fontWeight: '500',
        /* fontStyle: 'italic' */
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
        elevation: 15,
        width: 35,
        height: 35,
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

    contIconProfile: {
        width: 70,
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
        fontSize: 12,
        color: '#fff',
    },

    txtProfileTitle:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 15,
        color: '#fff',
        fontWeight: '500'
    },
    
    child: {
        container: {
            flex:1,
            flexDirection: 'column'
        },
        
        contCard: {
            flex:1
        },

        contContent: {
            paddingBottom: 30
        },
    
        floatingCard: {
            backgroundColor: '#fff',
            borderRadius: 2,
            margin: 50,
            
            elevation: 3,
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
        
        contBtn: {
            width: 100,
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
        },
    },

    formModal: {
        container: {
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%'
    },
    }
}
   