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
        minHeight: 20,
        maxHeight: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    formCont: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        minHeight: 100,
        alignItems: 'center'
    }, 

    btnCont: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 80
    },

    textinputField: {
        borderColor: '#838383',
        borderWidth: 1,
        marginRight: 70,
        marginLeft: 70,
        borderRadius: 10,
        maxWidth: 400,
        minWidth: 400

    },

    txtLabel:{
        marginRight: 70,
        marginLeft: 70,
        marginBottom: 5,
        fontSize: 15

    },

    newCont:{
        marginTop: 30,
    },

    confirmCont:{
        marginTop: 30,
        marginBottom: 50,
    },
};