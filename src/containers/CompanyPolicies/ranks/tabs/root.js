import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import TardinessScreen from './tardiness';
import OvertimeScreen from './overtime';
import UndertimeScreen from './undertime';
import LeavesScreen from './leaves';

const TabsRoot = TabNavigator({
    Tardiness: {
      screen: TardinessScreen,
      navigationOptions: {
        tabBarLabel: 'TARDINESS',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Undertime: {
      screen: UndertimeScreen,
      navigationOptions: {
        tabBarLabel: 'Undertime',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Overtime: {
      screen: OvertimeScreen,
      navigationOptions: {
        tabBarLabel: 'Overtime',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Leaves: {
      screen: LeavesScreen,
      navigationOptions: {
        tabBarLabel: 'Leaves',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    }
},
    {
        swipeEnabled: true,
        tabBarOptions: {
          scrollEnabled: false,
          tabStyle: { height: 30 }
        }
    }
);

export default TabsRoot;