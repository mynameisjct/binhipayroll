import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';

//Children Components
import TransactionsList from './list';

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
            <TransactionsList/>
        );
    }
}