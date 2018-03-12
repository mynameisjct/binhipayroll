import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Children Components
import CustomPicker from '../../../components/CustomPicker';

//Styles
import styles from './styles';

const oTempData = {
    period: '20170902',
    payrollperiods: [
        {
            id: '090909',
            label: '20180301: Feb 26 2018 - Mar 10 2018'
        },
        {
            id: '080808',
            label: '20180202: Feb 11 2018 - Feb 25 2018'
        },
        {
            id: '070707',
            label: '20180201: Jan 26 2018 - Feb 10 2018'
        },
        {
            id: '060606',
            label: '20180102: Jan 11 2018 - Jan 25 2018'
        },
        {
            id: '050505',
            label: '20180101: Dec 26 2017 - Jan 10 2018'
        },
        {
            id: '040404',
            label: '20171202: Dec 11 2017 - Dec 25 2017 '
        },
        {
            id: '030303',
            label: '20171201: Nov 26 2017 - Dec 10 2017'
        }
    ],

    info: [
        [
            ['ID Number:', '2017-1804E'],
            ['Name:', 'Auxilio, Jovanni G.'],
            ['Position:', 'Internal Janitor']
        ],
        [
            ['Payroll Period:', '09/11/2017 - 09/25/2017'],
            ['Pay Date:', '09/11/30'],
            ['Basic Salary:', '13,000.00 (Monthly)']
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
                ['systembreak'],
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
    ],

    datedisplayformat: 'MM/DD/YYYY'
}

export default class EmployeePayslipForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bShowPicker: false,
            _bHasError: false
        }
    }

    _onPeriodChange = () => {
        this.setState({
            _bShowPicker: true
        })
    }

    _onSelect = () => {
        this._hidePicker();
    }
    
    _hidePicker = () => {
        this.setState({
            _bShowPicker: false
        })
    }

    render(){
        const headerStyles = styles.header;
        const navigatorStyles = styles.navigator;
        const contentStyles = styles.content;
        const titleStyles = styles.title;
        const bodyStyles = styles.body;
        const systemStyles = styles.system;
        const textStyles = styles.textStyles;
        return(
            <View style={styles.container}>

                <View style={navigatorStyles.container}>
                    <View style={navigatorStyles.left}>
                        <Text style={textStyles.cardTitle}>Employee Detailed Payslip</Text>
                    </View>
                    <View style={navigatorStyles.right}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={this._onPeriodChange}>
                            <Icon2 name='calendar-clock' size={35} color='#434646'/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={headerStyles.container}>
                    <View style={headerStyles.left}>
                        <View style={headerStyles.generalInfoCont}>
                            <View style={headerStyles.iconCont}>
                                <Icon 
                                    size={40} 
                                    name='md-home' 
                                    color='#434646'/>
                            </View>
                            <View style={headerStyles.titleCont}>
                                <Text style={textStyles.companyName}>JCA Realty Corporation</Text>
                                <Text style={textStyles.address}>#80 Yacapin Sts., Cagayan de Oro City, Misamis Oriental 9000</Text>
                            </View>
                        </View>
                    </View>

                    <View style={headerStyles.right}>
                        {
                            oTempData.info.map((aParamsList, indexParamsList) => 
                                <View key={indexParamsList} style={headerStyles.paramsList}>
                                    {
                                        aParamsList.map((aParamsArgs, indexParamsArgs) => 
                                            <View key={indexParamsArgs} style={headerStyles.param}>
                                                <View style={headerStyles.label}>
                                                    <Text style={textStyles.label}>{aParamsArgs[0]}</Text>
                                                </View>
                                                <View style={headerStyles.value}>
                                                    <Text style={textStyles.value}>{aParamsArgs[1]}</Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>

                <View style={contentStyles.container}>
                    {
                        oTempData.data.map((oData, indexData) => 
                            <View key={indexData} style={contentStyles.placeholder}>
                                <View style={titleStyles.container}>
                                    <Text style={textStyles.detailsHeader}>{oData.title}</Text>
                                </View>
                                <View style={bodyStyles.container}>
                                    <ScrollView>
                                        <View style={bodyStyles.paramsList}>
                                            {
                                                oData.list.map((aList, indexList) => {
                                                    switch(aList[0].toLowerCase()){
                                                        case 'systembreak':
                                                            return <View key={indexList} style={systemStyles.break}/>;
                                                            break;
                                                        case 'systemdiv':
                                                            return <View key={indexList} style={systemStyles.div}/>;
                                                            break;
                                                        case 'systemfooter':
                                                            return null;
                                                            break;
                                                        default:
                                                            return(
                                                                    <View key={indexData} style={bodyStyles.params}>
                                                                        {
                                                                            aList.map((strParam, indexParams) =>
                                                                                <View 
                                                                                    key={indexParams} 
                                                                                    style={[bodyStyles.paramsArg, 
                                                                                        indexParams==0 ? bodyStyles.paramsLeftMost :
                                                                                        indexParams==(aList.length-1) ? bodyStyles.paramsRightMost :
                                                                                        bodyStyles.paramsCenter]
                                                                                    }
                                                                                >

                                                                                    <Text style={textStyles.details}>{strParam}</Text>
                                                                                </View>
                                                                            )
                                                                        }
                                                                    </View>
                                                            );
                                                    }
                                                })
                                            }
                                            {}
                                        </View>
                                    </ScrollView>
                                    {
                                        oData.list.map((aList, indexList) => {
                                            if(aList[0].toLowerCase() === 'systemfooter'){
                                                return(
                                                    <View key={indexList} 
                                                        style={systemStyles.footer.container}>

                                                        <View style={systemStyles.footer.title}>
                                                            <Text style={textStyles.footerTitle}>
                                                                { aList[1] }
                                                            </Text>
                                                        </View>

                                                        <View style={systemStyles.footer.value}>
                                                            <Text style={textStyles.footerValue}>
                                                                { aList[2] }
                                                            </Text>
                                                        </View>
                                                        
                                                    </View>
                                                )
                                            }
                                            else{
                                                return null;
                                            }
                                        })
                                    }
                                </View>
                            </View>
                        )
                    }
                </View>
                {
                    this.state._bShowPicker ? 
                        <CustomPicker 
                            list={oTempData.payrollperiods}
                            dateformat={oTempData.datedisplayformat}
                            emptyprompt = 'Error: No data found'
                            title='SELECT PAYROLL PERIOD'
                            onSelect={this._onSelect}
                            visible={this.state._bShowPicker}
                            onClose={this._hidePicker}/>
                    :
                        null
                }
            </View>
        );
    }
}