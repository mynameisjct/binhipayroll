import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

//Children
import Details from './details';
import WorkShift from './workshift';
import Payroll from './payroll';
import Tardiness from './tardiness';
import Undertime from './undertime';
import Overtime from './overtime';
import Leaves from './leaves';
import Benefits from './benefits';
import Tax from './tax';


const EmploymentInfo = TabNavigator({
    Details: {
            screen: Details,
            navigationOptions: {
            tabBarLabel: 'EMPLOYMENT DETAILS'
        }
    },
    WorkShift: {
            screen: WorkShift,
            navigationOptions: {
            tabBarLabel: 'WORK SHIFT'
        }
    },
    Payroll: {
            screen: Payroll,
            navigationOptions: {
            tabBarLabel: 'PAYROLL SCHEDULE'
        }
    },
    Tardiness: {
            screen: Tardiness,
            navigationOptions: {
            tabBarLabel: 'TARDINESS POLICY'
        }
    },
    Undertime: {
            screen: Undertime,
            navigationOptions: {
            tabBarLabel: 'UNDERTIME POLICY'
        }
    },
    Overtime: {
            screen: Overtime,
            navigationOptions: {
            tabBarLabel: 'OVERTIME POLICY'
        }
    },
    Leaves: {
            screen: Leaves,
            navigationOptions: {
            tabBarLabel: 'LEAVES POLICY'
        }
    },
    Benefits: {
            screen: Benefits,
            navigationOptions: {
            tabBarLabel: 'BENEFITS'
        }
    },
    Tax: {
            screen: Tax,
            navigationOptions: {
            tabBarLabel: 'TAX POLICY'
        }
    },
},
    {
        animationEnabled: false,
        tabBarPosition: 'top',
        swipeEnabled: true,
        tabBarOptions: {
            showIcon: false,
            showLabel: true,
            scrollEnabled: true,
            activeTintColor: '#d69200',
            inactiveTintColor: '#434646',
            tabStyle:  { width: 180, height: 40},
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

export default EmploymentInfo;