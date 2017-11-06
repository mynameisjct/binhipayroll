/* @flow */

import React from "react";
import { StackNavigator } from "react-navigation";

import Login from './containers/Login';
import Drawer from './containers/Sidebar';
import EmpeDTR from './containers/DTR';
import EmprDashBoard from './containers/DashBoard';

const AppNavigator = StackNavigator(
    {
        Login: {screen: Login},
        Drawer: { screen: Drawer },
        EmpeDTR: {screen: EmpeDTR},
        EmprDashBoard: {screen: EmprDashBoard}
    },

    {
        initialRouteName: "Login",
        headerMode: "none",
    }
);

export default AppNavigator;