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
import { DrawerNavigator, DrawerItems } from 'react-navigation';

import EmpeDTR from './containers/DTR';
import EmprDashBoard from './containers/DashBoard';
import Sidebar from './containers/Sidebar';
import EmployeeInfo from './containers/EmployeeInfo/';

const RootDrawer = DrawerNavigator(
  {
    EmprDashBoard: {screen: EmprDashBoard},
    EmpeDTR: {screen: EmpeDTR},
    EmployeeInfo: {screen: EmployeeInfo},
  },
  {
    drawerWidth: 300,
    drawerPosition: 'left',
    contentComponent: props =><Sidebar {...props} />,
    drawerBackgroundColor: 'transparent'  
  }
);
  
  export default RootDrawer;