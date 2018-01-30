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
    EmplomentDetails: {
            screen: Details,
            navigationOptions: {
            tabBarLabel: 'EMPLOYMENT DETAILS'
        }
    },
    EmployeeWorkShift: {
            screen: WorkShift,
            navigationOptions: {
            tabBarLabel: 'WORK SHIFT'
        }
    },
    EmployeePayroll: {
            screen: Payroll,
            navigationOptions: {
            tabBarLabel: 'PAYROLL SCHEDULE'
        }
    },
    EmployeeTardiness: {
            screen: Tardiness,
            navigationOptions: {
            tabBarLabel: 'TARDINESS POLICY'
        }
    },
    EmployeeUndertime: {
            screen: Undertime,
            navigationOptions: {
            tabBarLabel: 'UNDERTIME POLICY'
        }
    },
    EmployeeOvertime: {
            screen: Overtime,
            navigationOptions: {
            tabBarLabel: 'OVERTIME POLICY'
        }
    },
    EmployeeLeaves: {
            screen: Leaves,
            navigationOptions: {
            tabBarLabel: 'LEAVES POLICY'
        }
    },
    EmployeeBenefits: {
            screen: Benefits,
            navigationOptions: {
            tabBarLabel: 'BENEFITS'
        }
    },
    EmployeeTax: {
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