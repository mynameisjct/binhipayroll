import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Children Components
import MonetaryAdjustmentForm from './form';

//Constants
const TITLE = 'SPECIAL DEDUCTIONS & ALLOWANCES';

export default class MonetaryAdjustment extends Component {

    render(){
        return(
            <MonetaryAdjustmentForm 
                title={TITLE}
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                onSubmit={() => this.props.onSubmit()}/>
        );
    }
}