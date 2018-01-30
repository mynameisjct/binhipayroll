import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import Basic from './basic';
import Address from './address';
import Dependents from './dependents';
import Background from './background';

const PersonalInfo = TabNavigator({
  BasicInfo: {
    screen: Basic,
    navigationOptions: {
      tabBarLabel: 'Basic & Contact Info'
    }
  },
  Address: {
    screen: Address,
    navigationOptions: {
      tabBarLabel: 'Address Info'
    }
  },
  Dependents: {
    screen: Dependents,
    navigationOptions: {
      tabBarLabel: 'Family & Dependents'
    }
  },
/*   Background: {
    screen: Background,
    navigationOptions: {
      tabBarLabel: 'Work & Education'
    }
  } */
},
  {
    animationEnabled: false,
    tabBarPosition: 'top',
    swipeEnabled: true,
    tabBarOptions: {
      showIcon: false,
      showLabel: true,
      scrollEnabled: false,
      activeTintColor: '#d69200',
      inactiveTintColor: '#434646',
      tabStyle: { height: 40},
      labelStyle: {
        fontSize: 12,
        fontWeight: '500'
      },
      style: {
        backgroundColor: '#fff',
        zIndex: 999
      },
      indicatorStyle: {
        backgroundColor: '#EEB843',
        height: 5
      }
    }
  }
);

export default PersonalInfo;