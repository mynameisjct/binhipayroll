import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

//Children
import EmployeeDetails from './details';
import EmployeeBasedRules from './employeeBasedRules';
/* import EmployeeWorkShift from './workshift';
import EmployeeBenefits from './benefits'; */
import RankBasedRules from './rankBasedRules';
/* import EmployeeTardiness from './tardiness';
import EmployeeUndertime from './undertime';
import EmployeeOvertime from './overtime';
import EmployeeLeaves from './leaves'; */
import CompanyBasedRules from './companyBasedRules';
/* import EmployeePayroll from './payroll';
import EmployeeTax from './tax';
 */

const EmploymentInfo = TabNavigator({
    EmplomentDetails: {
        screen: EmployeeDetails,
        navigationOptions: {
            tabBarLabel: 'EMPLOYMENT DETAILS'
        }
    },
/*     EmployeeWorkShift: {
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
 */
    EmployeeBasedRules: {
        screen: EmployeeBasedRules,
        navigationOptions: {
            tabBarLabel: 'EMPLOYEE BASED RULES'
        }
    },

    /* EmployeeTardiness: {
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
    }, */

    RankBasedRules: {
        screen: RankBasedRules,
        navigationOptions: {
            tabBarLabel: 'RANK BASED RULES'
        }
    },

    CompanyBasedRules: {
        screen: CompanyBasedRules,
        navigationOptions: {
            tabBarLabel: 'COMPANY BASED RULES'
        }
    },

    /* EmployeePayroll: {
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

export default EmploymentInfo;