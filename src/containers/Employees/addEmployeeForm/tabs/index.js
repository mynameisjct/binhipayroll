import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Basic from './basic';
import Address from './address';
import Dependents from './dependents';
import Background from './background';

const TabsRoot = TabNavigator({
    Tardiness: {
      screen: Basic,
      navigationOptions: {
        tabBarLabel: 'Basic & Contact Info',
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
      screen: Address,
      navigationOptions: {
        tabBarLabel: 'Address Info',
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
      screen: Dependents,
      navigationOptions: {
        tabBarLabel: 'Family & Dependents',
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
      screen: Background,
      navigationOptions: {
        tabBarLabel: 'Work & Education',
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
          activeTintColor: '#EEB843',
          tabStyle: { height: 40},
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: '#2C5C36',
          },
        }
        
    }
);

export default TabsRoot;