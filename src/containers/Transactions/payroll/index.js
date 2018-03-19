import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

//Children Components
import PayrollTransactionForm from './form';

//Constants
const TITLE = 'GENERATE PAYROLL';

class PayrollTransaction extends Component {

    _onFormSubmit = () => {
        this.props.onSubmit();
        this.props.navigation.navigate('PayrollSummary');
    }

    render(){
        console.log('ENTERED LEAVE APPLICATION COMPONENT!')
        return(
            <PayrollTransactionForm
                title={TITLE}
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                onSubmit={this._onFormSubmit}/>
        );
    }
}

export default withNavigation(PayrollTransaction);