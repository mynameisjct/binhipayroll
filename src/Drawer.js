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

import {EmprDashBoardNav} from './AppNavigator';
import EmpeDTRNav from './AppNavigator';
import EmployeeInfoNav from './AppNavigator';

const RootDrawer = DrawerNavigator(
  {
    EmprDashBoardStack: {
      screen: StackNavigator({
        EmprDashBoard: {screen: EmprDashBoard},
      })},
  },
  {
    drawerWidth: 300,
    drawerPosition: 'right',
    contentComponent: props =><Sidebar {...props} />,
    drawerBackgroundColor: 'transparent' ,
  }
);
  
  export default RootDrawer;