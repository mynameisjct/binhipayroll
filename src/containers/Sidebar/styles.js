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
  },

  scrollableCont:{
    flex: 1,
    backgroundColor: 'transparent'
  },

  footerCont:{
    flex: 0.3,
    backgroundColor: 'transparent',
    maxHeight: 100,
    minHeight: 100
  },

  //Company Styles
  companyCont:{
    flexDirection: 'row',
    backgroundColor: '#EEB843',
    height: 130,
    borderBottomWidth: 1,
  },
  
  companyPicker:{
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginBottom: 80
  },

  //General Content Elements Divisions
  mainContentDiv:{
    flex: 0.8,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  miscContentDiv:{
    flex: 0.2,
    backgroundColor: 'transparent',
    borderWidth: 0,
    justifyContent: 'center'
  },

  iconCont:{
    flex: 0.4,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  labelCont: {
    flex: 0.6,
    borderWidth: 0,
    justifyContent: 'center'
  },

  specialProfileLabelCont: {
    flex: 0.6,
    flexDirection: 'column',
    borderWidth: 0,
    justifyContent: 'center'
  },

  txtTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    fontWeight: '900',
    color: '#212223'
  },

  txtContent: {
    fontFamily: 'Helvetica-Light',
    fontSize: 15,
    fontWeight: '300',
    color: '#212223'
  },

  /********Company Related Contents Style*******/
  contentStyle:{
    height: 50,
    borderBottomWidth: 0,
    borderColor: '#000'
  },

  //Dashboard related styles
  dashboardCont:{
    flexDirection: 'row',
  },

  notificationCont:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  txtNotification: {
    fontFamily: 'Helvetica-Light',
    fontSize: 12,
    fontWeight: '500',
    color: '#EA0202',
    marginRight: 5,
  },

  policiesCont:{
    flexDirection: 'row',
  },

  employeesCont:{
    flexDirection: 'row',
  },
  
  transactionsCont:{
    flexDirection: 'row',
  },

  reportsCont:{
    flexDirection: 'row',
  },

  profileCont:{
    flexDirection: 'row',
    borderWidth: 1,
    minHeight: 70,
  },

  bottomCont:{
    flexDirection: 'row',
    minHeight: 40,
  },

  bottomContentStyle:{
    borderRightWidth: 1,
  },

  settingCont:{
    flex: 0.3333,
  },

  syncCont:{
    flex: 0.3333,
  },

  logoutCont:{
    flex: 0.3333,
  }
};