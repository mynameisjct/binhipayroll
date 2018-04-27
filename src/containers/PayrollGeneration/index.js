import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import PayrollGenerationInfo from './summary';
import PayrollGenerationEmployeeList from './employeeList';

//Styles
import styles from './styles';

export default class PayrollGeneration extends Component {
    constructor(props){
        super(props);
        this.state = {
            _oData: {
                id: '0001',
                code: '20180302',

                payrollsummary: {
                    title: 'PAYROLL SUMMARY',
                    payrollinfo: {
                        title: 'General Information',
                        data: [
                            ["Payroll Generated", "Mar 30, 2018"],
                            ["Pay Period", "Mar 11, 2018 - Mar 25, 2018"],
                            ["Pay Date", "Mar 31, 2018"],
                            ["Status", "Open"]
                        ]
                    },
                    amountsummary: {
                        title: 'Details',
                        data: [
                            ["Gross Income", "12,000.00"],
                            ["Gross SSS Contribution", "12,000.00"],
                            ["Gross HDMF Contribution", "12,000.00"]
                        ]
                    }
                },
                employeelist: {
                    title: 'EMPLOYEE LIST',
                    markallasclosed: false,
                    status: '0/2 closed',
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
                            status: 'close',
                            payslip:{}
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
                            status: 'open',
                            payslip:{}
                        },
                        {
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
                            status: 'recalculate',
                            payslip:{}
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
                            status: 'close',
                            payslip:{}
                        }
                    ]
                }
            }
        }
    }
    
    render(){
        return(
            <LinearGradient 
                colors={['#304352', '#d7d2cc']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}>
                <PayrollGenerationInfo data={this.state._oData}/>
                <PayrollGenerationEmployeeList data={this.state._oData}/>
            </LinearGradient>
        );
    }
}