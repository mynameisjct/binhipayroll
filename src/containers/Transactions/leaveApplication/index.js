import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Children Components
import LeaveApplicationForm from './form';

//Constants
const TITLE = 'EMPLOYEE LEAVE APPLICATION';

export default class LeaveApplication extends Component {

    render(){
        console.log('ENTERED LEAVE APPLICATION COMPONENT!')
        return(
            <LeaveApplicationForm 
                title={TITLE}
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                onSubmit={() => this.props.onSubmit()}/>
        );
    }
}