import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

//Styles
import styles from './styles';

//Children Components
import LeaveApplication from './leaveApplication';
import DTRModification from './dtrModification';
import PayrollTransaction from './payroll';
import MonetaryAdjustment from './monetaryAdjustment';

export class TransactionsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            _showLeaveForm: false,
            _showPayrollForm: false,
            _showMonetaryAdjustmentForm: false,
            _activeID: '',
            _oList: [
                [
                    {
                        id: '001',
                        name: 'Resolve Pending\nTransactions',
                        icon: 'timetable',
                        iconSize: '40',
                        navigateTo: 'EmployeeDTR'
                    },
                    {
                        id: '002',
                        name: 'Daily Time Record\nModification',
                        icon: 'timetable',
                        iconSize: '40',
                        navigateTo: 'DTRModification'
                    },
                    {
                        id: '003',
                        name: 'Leave\nApplication',
                        icon: 'timer-off',
                        navigateTo: 'EmployeeDTR'
                    }
                ],
                [
                    {
                        id: '004',
                        name: 'Special Deductions\n& Allowances',
                        icon: 'format-list-numbers',
                        navigateTo: 'MonetaryAdjustment'
                    },
                    {
                        id: '005',
                        name: 'Generate\nPayroll',
                        icon: 'calculator',
                        navigateTo: 'PayrollTransaction'
                    },
                    {
                        //Future Transactions
                    }
                ]
            ]
        }
    }

    _onTriggerAction = (oCol) => {
        switch (String(oCol.id)){
            case '001':
                break;
            case '002':
                this.props.navigation.navigate(oCol.navigateTo);
                break;
            case '003':
                this.setState({ _showLeaveForm: true })
                break;
            case '004':
                this.setState({ _showMonetaryAdjustmentForm: true })
                break;
            case '005':
                this.setState({ _showPayrollForm: true })
                break;
            default:
                break;
        }
        
    }

    _onSubmit = (value) => {
        this._hideAllForms();
    }

    _onCancel = (value) => {
        this._hideAllForms();
    }

    _hideAllForms = (value) => {
        this.setState({
            _showLeaveForm: false,
            _showPayrollForm: false,
            _showMonetaryAdjustmentForm: false,
        })
    }

    render(){
        let aList = this.state._oList;
        let btnStyle = styles.btn
        return(
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    {
                        aList.map((oRow, rowIndex) => 
                            <View key={rowIndex} style={styles.contRow}>
                                    {
                                        oRow.map((oCol, colIndex) =>
                                            !oCol.id ?
                                                <View key={colIndex} style={[styles.contCol, styles.contEmpty]}>
                                                </View>
                                            :
                                                <TouchableOpacity
                                                    activeOpacity={0.6}
                                                    key={colIndex} 
                                                    style={styles.contCol}
                                                    onPress={() => this._onTriggerAction(oCol)}>
                                                    <View style={btnStyle.container}>
                                                        <View style={btnStyle.icon}>
                                                            <Icon name={oCol.icon} size={35} color='#505251'/>
                                                        </View>
                                                        <View style={btnStyle.label}>
                                                            <Text style={btnStyle.txt}>{oCol.name}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                        )
                                    }
                            </View>
                        )
                    }
                </View>

                {
                    this.state._showLeaveForm ? 
                        <LeaveApplication
                            visible={this.state._showLeaveForm}
                            onCancel={this._onCancel}
                            onSubmit={this._onSubmit}
                            hideForm={this._hideAllForms}/> 
                    : 
                        null
                }

                {
                    this.state._showPayrollForm ? 
                        <PayrollTransaction
                            visible={this.state._showPayrollForm}
                            onCancel={this._onCancel}
                            onSubmit={this._onSubmit}
                            hideForm={this._hideAllForms}/> 
                    : 
                        null
                }

{
                    this.state._showMonetaryAdjustmentForm ? 
                        <MonetaryAdjustment
                            visible={this.state._showMonetaryAdjustmentForm}
                            onCancel={this._onCancel}
                            onSubmit={this._onSubmit}
                            hideForm={this._hideAllForms}/>  
                    : 
                        null
                }
                
            </View>
        );
    }
}

export default withNavigation(TransactionsList)