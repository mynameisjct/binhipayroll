/**************************************************************
 *  FileName:           AppNavigator.js
 *  Description:        App Custom Wrapper/Navigation Configuration
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React from "react";
import { StackNavigator } from "react-navigation";

import Login from './containers/Login';
import EmpeDTR from './containers/DTR';
import EmprDashBoard from './containers/DashBoard';
import RootDrawer from './Drawer';
import ChangePassword from './containers/ChangePassword';
import EmployeeInfo from './containers/EmployeeInfo/';

const EmprDashBoardNav = StackNavigator({
    EmprDashBoard: {screen: EmprDashBoard},
});

const EmpeDTRNav = StackNavigator({
    EmpeDTR: {screen: EmpeDTR},
});

const EmployeeInfoNav = StackNavigator({
    EmployeeInfo: {screen: EmployeeInfo},
});

const ChangePasswordNav = StackNavigator({
    ChangePassword: {screen: ChangePassword},
});

const AppNavigator = StackNavigator(
    {
        RootDrawer: { screen: RootDrawer },
        Login: {screen: Login},
        ChangePassword: {screen: ChangePasswordNav},
    },

    {
        initialRouteName: 'Login',
        headerMode: 'none',
    }
);

export default AppNavigator;