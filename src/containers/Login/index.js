import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList
} from 'react-native';

const objRoutes = [
    {
      key: "test1",
      route: "EmprDashBoard",
      text: "DashBoard"
    },
    {
        key: "test2",
        route: "EmpeDTR",
        text: "Employee DTR"
    },
    {
        key: "test3",
        route: "Login",
        text: "Login"
    },
    {
        key: "test4",
        route: "Drawer",
        text: "Sidebar"
    }
  ];

export default class Login extends Component {
    render(){
        return(
            <View>
                <Text>This will display Login</Text>
            </View>
        );
    }
}