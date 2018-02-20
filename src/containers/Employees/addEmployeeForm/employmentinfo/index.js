import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

//Children
import EmployeeDetails from './details';
import EmployeeWorkShift from './workshift';
import EmployeePayroll from './payroll';
import EmployeeTardiness from './tardiness';
import EmployeeUndertime from './undertime';
import EmployeeOvertime from './overtime';
import EmployeeLeaves from './leaves';
import EmployeeBenefits from './benefits';
import EmployeeTax from './tax';


const EmploymentInfo = TabNavigator({
    EmplomentDetails: {
        screen: EmployeeDetails,
        navigationOptions: {
            tabBarLabel: 'EMPLOYMENT DETAILS'
        }
    },
    EmployeeWorkShift: {
        screen: EmployeeWorkShift,
        navigationOptions: {
            tabBarLabel: 'WORK SHIFT'
        }
    },
    EmployeeBenefits: {
        screen: EmployeeBenefits,
        navigationOptions: {
            tabBarLabel: 'BENEFITS'
        }
    },

    EmployeeTardiness: {
        screen: EmployeeTardiness,
        navigationOptions: {
            tabBarLabel: 'TARDINESS POLICY'
        }
    },
    EmployeeUndertime: {
        screen: EmployeeUndertime,
        navigationOptions: {
            tabBarLabel: 'UNDERTIME POLICY'
        }
    },
    EmployeeOvertime: {
        screen: EmployeeOvertime,
        navigationOptions: {
            tabBarLabel: 'OVERTIME POLICY'
        }
    },
    EmployeeLeaves: {
        screen: EmployeeLeaves,
        navigationOptions: {
            tabBarLabel: 'LEAVES POLICY'
        }
    },

    EmployeePayroll: {
        screen: EmployeePayroll,
        navigationOptions: {
            tabBarLabel: 'PAYROLL SCHEDULE'
        }
    },

    EmployeeTax: {
        screen: EmployeeTax,
        navigationOptions: {
            tabBarLabel: 'TAX POLICY'
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