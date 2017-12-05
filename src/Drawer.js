/**************************************************************
 *  FileName:           Drawer.js
 *  Description:        App Drawer Configuration
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';

import EmpeDTR from './containers/DTR';
import EmprDashBoard from './containers/DashBoard';
import Sidebar from './containers/Sidebar';
import EmployeeInfo from './containers/EmployeeInfo/';
import CompanyPolicies from './containers/CompanyPolicies/';
import Transactions from './containers/Transactions';
import Reports from './containers/Reports';
import CompanyProfile from './containers/CompanyProfile';
import Header2 from './containers/Headers/header2';
//This is intended so that the sidebar will be full height on screen.
//this is as of "react-navigation": "^1.0.0-beta.19"
const EmprDashBoardNav = StackNavigator({
  EmprDashBoard: {screen: EmprDashBoard},
});

const CompanyPoliciesNav = StackNavigator({
  CompanyPolicies: {screen: CompanyPolicies},
});

const EmployeeInfoNav = StackNavigator({
  EmployeeInfo: {screen: EmployeeInfo},
});

const TransactionsNav = StackNavigator({
  Transactions: {screen: Transactions},
});

const ReportsNav = StackNavigator({
  Reports: {screen: Reports},
});

const CompanyProfileNav = StackNavigator({
  CompanyProfile: {screen: CompanyProfile}
});

const RootDrawer = DrawerNavigator(
  {
    EmprDashBoard: {
      screen: EmprDashBoardNav},

    CompanyPolicies: {
      screen: CompanyPoliciesNav},
      
    EmployeeInfo: {
      screen: EmployeeInfoNav},
  
    Transactions: {
      screen: TransactionsNav},
    
      Reports: {
      screen: ReportsNav},
    
    CompanyProfile: {
      screen: CompanyProfileNav},

  },
  
  {
    drawerWidth: 300,
    drawerPosition: 'right',
    contentComponent: props =><Sidebar {...props} />,
    drawerBackgroundColor: 'transparent' ,
    headerMode: 'none',
  }
);
  
  export default RootDrawer;