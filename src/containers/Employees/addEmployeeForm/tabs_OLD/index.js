import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import FullName from './fullName';
import NickName from './nickName';
import BirthDate from './birthDate';
import Gender from './gender';
import CivilStatus from './civilStatus';

const TabsRoot = TabNavigator({
    Tardiness: {
      screen: FullName,
      navigationOptions: {
        tabBarLabel: 'Full Name',
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
      screen: NickName,
      navigationOptions: {
        tabBarLabel: 'Nick Name',
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
      screen: BirthDate,
      navigationOptions: {
        tabBarLabel: 'Birth Date',
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
      screen: Gender,
      navigationOptions: {
        tabBarLabel: 'Gender',
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
      screen: CivilStatus,
      navigationOptions: {
        tabBarLabel: 'Civil Status',
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
          tabStyle: { height: 40, width: 120 },
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