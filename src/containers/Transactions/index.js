import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';

export default class Transactions extends Component {
    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'TRANSACTIONS'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>This will display TRANSACTIONS</Text>
            </View>
        );
    }
}