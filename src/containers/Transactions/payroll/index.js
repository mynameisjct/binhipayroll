import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Children Components
import PayrollTransactionForm from './form';

//Constants
const TITLE = 'GENERATE PAYROLL';

export default class PayrollTransaction extends Component {

    render(){
        console.log('ENTERED LEAVE APPLICATION COMPONENT!')
        return(
            <PayrollTransactionForm 
                title={TITLE}
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                onSubmit={() => this.props.onSubmit()}/>
        );
    }
}