/**************************************************************
 *  FileName:           styles.js
 *  Description:        Login Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {

  //Parent Styles
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },

  logoCont: {
        flex:1,
        minHeight: 100,
        maxHeight: 100,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    formCont: {
        alignContent: 'center', 
        flex: 3, 
        backgroundColor: 'transparent', 
        height: 200
    },

    fieldsCont: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        minHeight: 100,
        alignItems: 'center'
    }, 

    btnCont: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 80,
        marginTop: 10
    },

    textinputField: {
        borderColor: '#838383',
        borderWidth: 0,
        marginRight: 70,
        marginLeft: 70,
        borderRadius: 10,
        maxWidth: 350,
        minWidth: 350
    },

    txtLabel:{
        marginRight: 70,
        marginLeft: 70,
        marginBottom: 5,
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        color: '#838383'
    },

    newCont:{
        backgroundColor: 'transparent'
    },

    confirmCont:{
        marginTop: 30,
    },

    txtTitleDesc: {
        fontFamily: 'Helvetica-Light',
        fontSize: 16,
        color: '#838383'
    },

    btnSave:{ 
        borderRadius: 100, 
        width: 350, 
        height: 50,
        backgroundColor: '#EEB843', 
        justifyContent:'center', 
        alignItems: 'center'
    },

    btnCancel:{ 
        borderRadius: 100, 
        width: 350, 
        height: 50, 
        marginTop: 15,
        backgroundColor: '#fff', 
        justifyContent:'center', 
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#EEB843'
    },

    txtBtnSave:{
        fontFamily: 'Helvetica-Light',
        fontSize: 18,
        color: '#fff'
    },

    txtBtnCancel:{
        fontFamily: 'Helvetica-Light',
        fontSize: 18,
        color: '#EEB843'
    }
};