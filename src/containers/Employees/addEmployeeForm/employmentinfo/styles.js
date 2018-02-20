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
    genericContainer: {
        flex:1
    },

    container: {
        flex:1,
        height: '100%',
        backgroundColor: '#f9f9f9',
        margin: 10,
        marginBottom: 0,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        elevation: 20,
        flexDirection: 'column'
    },

    contDivider: {
        flex: 1,
        flexDirection: 'row'
    },

    contFormLeft: {
        flex: 1, 
        paddingLeft: 40,
        paddingRight: 20,
        paddingBottom: 30,
        marginTop: -10
    },

    contFormRight: {
        flex: 1, 
        paddingLeft: 20,
        paddingRight: 40,
        paddingBottom: 30,
        marginTop: -10
    },
    
    contTitle: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: 50, 
        paddingBottom: 30
    },

    contButton: {
        flex:1, 
        paddingBottom: 15, 
        paddingTop: 30
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    contFormBankInfo: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 50,
        width: 400
    },

    txtGroupLabel: {
        fontSize: 14,
        color: '#EEB843',
        fontStyle: 'italic',
        fontWeight: '500'
    },

    txtNoteLabel: {
        fontSize: 14,
        color: '#EEB843',
        fontStyle: 'italic',
    },

    contLabel: {
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-end'
    },

    contNote: {
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-start'
    },

    contIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: 100,
        marginTop: 10,
        alignSelf: 'flex-end',
    },

    contAddLabel: {
        width: 60,
        height: '100%',
        justifyContent: 'center',
    },

    
    txtAddLabel: {
        fontSize: 14,
        color: '#EEB843',
        fontWeight: '500'
    },

    contGroupWrapper: {
        flex: 1,
        marginBottom: 5
        
    },

    contEmpty: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    txtFormTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#434646'
    },

    workshiftStyles:{
        contHeader: {},
        contEffectivedate: {},
        contAddBtn: {}
    }
    



}
   