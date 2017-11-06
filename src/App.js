/* @flow */

import React from "react";
import { StackNavigator } from "react-navigation";

import Login from './containers/Login';
import Drawer from './containers/Sidebar';
import EmpeDTR from './containers/DTR';
import EmprDashBoard from './containers/DashBoard';
import RootDrawer from './Drawer';

const AppNavigator = StackNavigator(
    {
        Login: {screen: Login},
        RootDrawer: { screen: RootDrawer },
        EmpeDTR: {screen: EmpeDTR},
        EmprDashBoard: {screen: EmprDashBoard}
    },

    {
        initialRouteName: "EmpeDTR",
        headerMode: "none",
    }
);

export default AppNavigator;