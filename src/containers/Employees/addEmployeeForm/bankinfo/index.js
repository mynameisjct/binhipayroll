import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import EmployeeBankAccount from './bankaccount';

const BankInfo = TabNavigator({
  EmployeeBankAccount: {
    screen: EmployeeBankAccount,
    navigationOptions: {
      tabBarLabel: 'BANK ACCOUNT INFORMATION'
    }
  }
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

export default BankInfo;