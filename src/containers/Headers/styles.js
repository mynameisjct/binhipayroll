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
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    color: '#434646'
  },

  headerLeft:{
    height: '100%',
    width: 70,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerRight:{
    height: '100%',
    width: 70,
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