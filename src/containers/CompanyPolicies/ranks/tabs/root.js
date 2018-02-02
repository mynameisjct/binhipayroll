import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TardinessScreen from './tardiness';
import OvertimeScreen from './overtime';
import UndertimeScreen from './undertime';
import LeavesScreen from './leaves';

const TabsRoot = TabNavigator({
    Tardiness: {
      screen: TardinessScreen,
      navigationOptions: {
        tabBarLabel: 'TARDINESS',
      },
    },
    Undertime: {
      screen: UndertimeScreen,
      navigationOptions: {
        tabBarLabel: 'Undertime',
      },
    },
    Overtime: {
      screen: OvertimeScreen,
      navigationOptions: {
        tabBarLabel: 'Overtime',
      },
    },
    Leaves: {
      screen: LeavesScreen,
      navigationOptions: {
        tabBarLabel: 'Leaves',
      },
    }
},
    {
        swipeEnabled: true,
        tabBarOptions: {
          showIcon: false,
          showLabel: true,
          scrollEnabled: false,
          activeTintColor: '#d69200',
          inactiveTintColor: '#434646',
          tabStyle: { height: 30},
          labelStyle: {
            fontSize: 12,
            fontWeight: '500'
          },
          style: {
            backgroundColor: '#D1D4D6',
          },
          indicatorStyle: {
            backgroundColor: '#ecf0f1',
            height: 0
          }
        }
        
    }
);

export default TabsRoot;