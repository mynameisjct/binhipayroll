import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import BankAccount from './bankaccount';

const BankInfo = TabNavigator({
    BankAccount: {
      screen: BankAccount,
      navigationOptions: {
        tabBarLabel: 'BANK ACCOUNT INFORMATION'
      }
    }
  },
    {
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
          backgroundColor: '#ecf0f1',
          zIndex: 999
        },
        indicatorStyle: {
          backgroundColor: '#EEB843',
          height: 3
        }
      }
    }
);

export default BankInfo;