import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

const oTempData = {
    period: '20170902',

    info: [
        [
            ['ID Number', '2017-1804E'],
            ['Employee Name', 'Auxilio, Jovanni G.'],
            ['Position', 'Internal Janitor'],
            ['systemnewcolumn'],
            ['Payroll Period', '09/11/2017 - 09/25/2017'],
            ['Pay Date', '09/11/30'],
            ['Basic Salary', '13,000.00 (Monthly)']
        ]
    ],

    data: [
        {
            title: 'TAXABLE INCOME',
            list: [
                ['Description', 'Hours', 'Amount'],
                ['systembreak'],
                ['Reg Wrk', '97', '6700'],
                ['Reg OT', '5', '6700'],
                ['Rest Wrk/OT', '5', '6700'],
                ['RegHol Wrk/OT', '', ''],
                ['SplHol Wrk/OT', '', ''],
                ['Tardiness', '', ''],
                ['Absences', '24', '-1,700.00']
            ]
        },
        {
            title: 'NON TAXABLE INCOME',
            list: [
                ['Description', 'Amount'],
                ['systembreak'],
                ['Management Allowance', '500'],
                ['Attendance Incentives', '500'],
                ['Fare Allowance', '500'],
                ['Meal Allowance', '500'],
                ['Medecine Allowance', '500']
            ]
        },
        {
            title: 'DEDUCTION',
            list: [
                ['Description', 'Amount'],
                ['systembreak'],
                ['SSS', '500'],
                ['HDMF', '500'],
                ['PhilHealth', '500'],
                ['WTax', '500'],
                ['Medecine Allowance', '500'],
                ['systemdiv'],
                ['Loans', 'Amount'],
                ['systemdiv'],
                ['In-House', '500'],
                ['SSS', '500'],
                ['MPL (Pag-ibig)', '500'],
                ['Cal. (Pagibig)', '500'],
            ]
        },
        {
            title: 'SUMMARY',
            list: [
                ['Description', 'Amount'],
                ['systembreak'],
                ['Total Taxable Income', '6700'],
                ['Total Deductions', '-6700'],
                ['Total Non Taxable Income', '6700'],
                ['systemfooter', 'NET PAY', '17,000.00']
            ]
        }
    ]
}

export default class EmployeePayslipForm extends Component {
    render(){
        const headerStyles = styles.header;
        const contentStyles = styles.content;
        const titleStyles = styles.title;
        const bodyStyles = styles.body;
        return(
            <View style={styles.container}>
                <View style={headerStyles.container}>
                    <View style={headerStyles.left}>
                    </View>

                    <View style={headerStyles.right}>
                    </View>
                </View>

                <View style={contentStyles.container}>
                    {
                        oTempData.data.map((oData, indexData) => 
                            <View key={indexData} style={contentStyles.placeholder}>
                                <View style={titleStyles.container}>
                                    <Text>{oData.title}</Text>
                                </View>
                                <View style={bodyStyles.container}>
                                    {
                                        oData.list.map((aList, indexList) => {
                                            switch(aList[0].toLowerCase()){
                                                case 'systembreak':
                                                    return null;
                                                    break;
                                                default:
                                                    return(
                                                        <View key={indexList} style={bodyStyles.params}>
                                                            {
                                                                aList.map((strParam, indexParams) =>
                                                                    <View key={indexParams} style={bodyStyles.paramsVal}>
                                                                        <Text>{strParam}</Text>
                                                                    </View>
                                                                )
                                                            }
                                                        </View>
                                                    );
                                            }
                                        })
                                    }
                                </View>
                            </View>
                        )
                    }
                </View>

            </View>
        );
    }
}