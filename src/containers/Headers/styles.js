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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
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
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerRight:{
    width: 80,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  txtBtn: {
    fontFamily: 'Helvetica-Light',
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
  }
  
};