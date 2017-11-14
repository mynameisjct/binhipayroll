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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center'
  },

  headerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500'
  },

  headerLeft:{
    width: 60,
    backgroundColor: 'transparent',
    padding: 20,
  },

  headerRight:{
    width: 60,
    backgroundColor: 'transparent',
    padding: 20,
  }
};