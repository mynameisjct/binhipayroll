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
import { StackNavigator, TabNavigator } from "react-navigation";
import { Easing, Animated } from 'react-native';

import Login from './containers/Login';
import EmpeDTR from './containers/DTR';
import EmprDashBoard from './containers/DashBoard';
import RootDrawer from './Drawer';
import ChangePassword from './containers/ChangePassword';
import BranchForm from './containers/CompanyProfile/forms/branch';
import CompanyIdForm from './containers/CompanyProfile/forms/companyid';

//TabNavigators
import {AddEmployeeForm} from './TabNavigatorEmployeeForm';

/******CHILD NAVIGATORS******/
const BranchFormNav = StackNavigator({
    BranchForm: {screen: BranchForm},
    },
    {
        headerMode: 'screen',
    }
);

const CompanyIdFormNav = StackNavigator({
    CompanyIdForm: {
        screen: CompanyIdForm
    }}
);

const AddEmployeeFormNav = StackNavigator({
    AddEmployeeForm: {screen: AddEmployeeForm},
    },
    {
        headerMode: 'screen'
    }
);

/******APP NAVIGATOR******/
const AppNavigator = StackNavigator(
    {
        RootDrawer: { screen: RootDrawer },
        Login: {screen: Login},
        ChangePassword: {screen: ChangePassword},
        BranchFormNav: {screen: BranchFormNav},
        CompanyIdFormNav: {screen: CompanyIdFormNav},

        //Employee
        AddEmployeeForm: {screen: AddEmployeeFormNav}
    },

    {
        initialRouteName: 'Login',
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
          gesturesEnabled: false,
        },
        transitionConfig: () => ({
          transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
          },
          screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;
     
            const height = layout.initHeight;
            const translateY = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [height, 0, 0],
            });
     
            const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.1, index],
              outputRange: [0, 1, 1],
            });
     
            return { opacity/* , transform: [{ translateY }]  */};
          },
        }),
    }
);

export default AppNavigator;