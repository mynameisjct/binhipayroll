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

  formCont: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },

  nameCont: {
    backgroundColor: 'transparent',
  },

  addressCont: {
    backgroundColor: 'transparent',
  },

  contactCont: {
    backgroundColor: 'transparent',
  },

  emailAddressCont: {
    backgroundColor: 'transparent',
  },

  txtLabel:{
    fontFamily: 'Helvetica-Light',
    fontSize: 15,
    color: '#838383',
    marginLeft: 5
  },

  txtBtnLabel:{
    fontFamily: 'Helvetica-Light',
    fontSize: 13,
    color: '#434646',
    marginLeft: 5,
    marginBottom: 20,
    textDecorationLine: 'underline'
  },


  defaultProp: {
    minHeight: 75,

  }


}