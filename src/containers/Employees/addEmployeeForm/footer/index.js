import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

//Children Components
import PersonalInfo from '../personalinfo';
import BankInfo from '../bankinfo';
import EmploymentInfo from '../employmentinfo';


const TabsFooter = TabNavigator({
    PersonalInfo: {
      screen: PersonalInfo,
      navigationOptions: {
        tabBarLabel: 'Personal Information',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    BankInfo: {
      screen: BankInfo,
      navigationOptions: {
        tabBarLabel: 'Bank Information',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-card' : 'ios-card-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    EmploymentInfo: {
      screen: EmploymentInfo,
      navigationOptions: {
        tabBarLabel: 'Employment Information',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={focused ? 'ios-paper' : 'ios-paper-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    }
},
    {
        swipeEnabled: false,
        animationEnabled: false,
        tabBarPosition: 'bottom',
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
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
          },
          indicatorStyle: {
            backgroundColor: '#ecf0f1',
            height: 0
          }
        }
        
    }
);

export default TabsFooter;