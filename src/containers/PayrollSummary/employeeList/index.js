import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

//Styles
import styles from '../styles';

//Children components
import PayrollEmployeeListHeader from './header';
import PayrollEmployeeListFooter from './footer';
import PayrollEmployeeListBody from './body';

export default class PayrollSummaryEmployeeList extends Component {
    render(){
        const summaryStyles = styles.summaryStyles;
        return(
            <View style={summaryStyles.container}>
                <PayrollEmployeeListHeader data={this.props.data}/>
                <PayrollEmployeeListBody data={this.props.data}/>
                <PayrollEmployeeListFooter data={this.props.data}/>
            </View>
        );
    }
}