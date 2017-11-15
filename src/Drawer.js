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

//This is intended so that the sidebar will be full height on screen.
//this is as of "react-navigation": "^1.0.0-beta.19"
const EmprDashBoardNav = StackNavigator({
  EmprDashBoard: {screen: EmprDashBoard},
});

const EmpeDTRNav = StackNavigator({
  EmpeDTR: {screen: EmpeDTR},
});

const EmployeeInfoNav = StackNavigator({
  EmployeeInfo: {screen: EmployeeInfo},
});

const RootDrawer = DrawerNavigator(
  {
    EmprDashBoardStack: {
      screen: EmprDashBoardNav},
  },
  {
    drawerWidth: 300,
    drawerPosition: 'right',
    contentComponent: props =><Sidebar {...props} />,
    drawerBackgroundColor: 'transparent' ,
  }
);
  
  export default RootDrawer;