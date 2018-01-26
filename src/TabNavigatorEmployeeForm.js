
import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Ionicons';

//Custom Components
import Header4 from './containers/Headers/header4';

//Add-Modify Employee Components
import PersonalInfo from './containers/Employees/addEmployeeForm/personalinfo';
import BankInfo from './containers/Employees/addEmployeeForm/bankinfo';
import EmploymentInfo from './containers/Employees/addEmployeeForm/employmentinfo';
import Basic from './containers/Employees/addEmployeeForm/personalinfo/basic';
import Address from './containers/Employees/addEmployeeForm/personalinfo/address';
import Dependents from './containers/Employees/addEmployeeForm/personalinfo/dependents';
import Background from './containers/Employees/addEmployeeForm/personalinfo/background';

//Employee



export const AddEmployeeForm = TabNavigator({
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
        navigationOptions: ({navigation}) => ({
            header: <Header4 title='EMPLOYEE PROFILE FORM'/>
        }),
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
            backgroundColor: '#fff',
          },
          indicatorStyle: {
            backgroundColor: '#ecf0f1',
            height: 0
          }
        }
        
    }
);

