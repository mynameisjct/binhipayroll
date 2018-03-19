import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PayrollSummaryInfo from './summary';
import PayrollSummaryEmployeeList from './employeeList';

//Styles
import styles from './styles';

export default class PayrollSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
            _oData: {
                id: '0001',
                code: '20180302',

                payrollsummary: {
                    title: 'PAYROLL SUMMARY',
                    data: [
                        ["Payroll Generated", "Mar 30, 2018"],
                        ["Pay Period", "Mar 11, 2018 - Mar 25, 2018"],
                        ["Pay Date", "Mar 31, 2018"],
                        ["Gross Income", "100,871.50 "],
                        ["Status", "Open"]
                    ]
                },
                employeelist: {
                    title: 'EMPLOYEE LIST',
                    data: [
                        {
                            id: '0001',
                            name: 'Jovanni G. Auxilio',
                            position: 'Internal Janitor',
                            branch: 'TEMP Branch',
                            summary: [
                                ['Total Income', '12,500.00'],
                                ['Total Allowances', '500'],
                                ['Total Deductions', '751.00'],
                                ['Net Pay', '12,249.00']
                            ],
                            details:{}
                        },
                        {
                            id: '0002',
                            name: 'Jovanni G. Auxilio',
                            position: 'Internal Dishwasher',
                            branch: 'TEMP Branch',
                            summary: [
                                ['Total Income', '12,500.00'],
                                ['Total Allowances', '500'],
                                ['Total Deductions', '751.00'],
                                ['Net Pay', '12,249.00']
                            ],
                            details:{}
                        },{
                            id: '0003',
                            name: 'Jovanni G. Auxilio',
                            position: 'Internal Cook',
                            branch: 'TEMP Branch',
                            summary: [
                                ['Total Income', '12,500.00'],
                                ['Total Allowances', '500'],
                                ['Total Deductions', '751.00'],
                                ['Net Pay', '12,249.00']
                            ],
                            details:{}
                        },
                        {
                            id: '0004',
                            name: 'Jovanni G. Auxilio',
                            position: 'Internal Gardener',
                            branch: 'TEMP Branch',
                            summary: [
                                ['Total Income', '12,500.00'],
                                ['Total Allowances', '500'],
                                ['Total Deductions', '751.00'],
                                ['Net Pay', '12,249.00']
                            ],
                            details:{}
                        }
                    ]
                }
            }
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <PayrollSummaryInfo data={this.state._oData}/>
                <PayrollSummaryEmployeeList data={this.state._oData}/>
            </View>
        );
    }
}