import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import EmployeeBasicInfo from './basic';
import EmployeeAddress from './address';
import EmployeeDependents from './dependents';
import EmployeeBackground from './background';

const PersonalInfo = TabNavigator({
  EmployeeBasicInfo: {
    screen: EmployeeBasicInfo,
    navigationOptions: {
      tabBarLabel: 'Basic & Contact Info',
      tabBarOnPress: (scene, jumpToIndex) => { 
        /* jumpToIndex(scene.index);  */
      },
    }
  },

  EmployeeAddress: {
    screen: EmployeeAddress,
    navigationOptions: {
      tabBarLabel: 'Address Info',
      tabBarOnPress: (scene, jumpToIndex) => { 
        /* jumpToIndex(scene.index);  */
      },
    }
  },
  
  EmployeeDependents: {
    screen: EmployeeDependents,
    navigationOptions: {
      tabBarLabel: 'Family & Dependents',
      tabBarOnPress: (scene, jumpToIndex) => { 
        /* jumpToIndex(scene.index);  */
      },
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
    swipeEnabled: false,
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
    },
    
    lazy: true
  }
);

export default PersonalInfo;