import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import EmpeDTR from './containers/DTR';
import EmprDashBoard from './containers/DashBoard';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RootDrawer = DrawerNavigator({
    EmpeDTR: {
      screen: EmpeDTR,
      navigationOptions: {
        drawerLabel: 'DTR',
        drawerIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={20}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    EmprDashBoard: {
      screen: EmprDashBoard,
      navigationOptions: {
        drawerLabel: 'DashBoard',
        drawerIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={20}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  });
  
  export default RootDrawer;