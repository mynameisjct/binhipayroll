import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

//Custom Components
import FormModal from '../../../components/FormModal';

//Styles
import styles from '../styles';

//Children components
import PayrollEmployeeListHeader from './header';
import PayrollEmployeeListFooter from './footer';
import PayrollEmployeeListBody from './body';
import EmployeePayslipForm from '../../Reports/payslip/payslipform';
import EmployeeDTRCalendar from '../../DTR/main';
import MonetaryAdjustmentForm from '../../Transactions/monetaryAdjustment';

export default class PayrollGenerationEmployeeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bShowPayslip: false,
            _bShowDTR: false,
            _bShowMonetaryAdjustmentForm: false,
        }
    }
    
    _showPaySlip = () => {
        this.setState({ _bShowPayslip: true })
    }

    _showDTR = () => {
        this.setState({ _bShowDTR: true })
    }

    _showMonetaryAdjustmentForm = () => {
        this.setState({ _bShowMonetaryAdjustmentForm: true })
    }

    _onCancel = () => {
        this.setState({
            _bShowPayslip: false,
            _bShowDTR: false,
            _bShowMonetaryAdjustmentForm: false
        })
    }

    render(){
        console.log('this.state._bShowDTR: ' + this.state._bShowDTR);
        const fromStyles = styles.form;
        const summaryStyles = styles.summaryStyles;
        const oPaySlip = (
            <FormModal 
                cancelLabel='Close'
                viewOnly={true}
                containerStyle={fromStyles.container}
                visible={this.state._bShowPayslip}
                onCancel={this._onCancel}
                onOK={this._onSubmit}
                title='EMPLOYEE PAYSLIP'>
                
                <View style={fromStyles.content}>
                    <EmployeePayslipForm hideHeader={true}/>
                </View>
            </FormModal>
        );
        const oDTR = (
            <FormModal 
                cancelLabel='Close'
                viewOnly={true}
                containerStyle={fromStyles.container}
                visible={this.state._bShowDTR}
                onCancel={this._onCancel}
                onOK={this._onSubmit}
                title='DTR - <EMPLOYEE NAME HERE>'>

                <View style={fromStyles.contentFullscreen}>
                    <EmployeeDTRCalendar hideHeader={true}/>
                </View>
                
            </FormModal>
        );

        const oMonetaryAd = (
            <MonetaryAdjustmentForm
                onCancel={this._onCancel}
                onSubmit={this._onCancel}
                visible={this.state._bShowMonetaryAdjustmentForm}/>
        )
        

        return(
            <View style={summaryStyles.container}>

                <PayrollEmployeeListHeader data={this.props.data}/>

                <PayrollEmployeeListBody 
                    data={this.props.data}
                    showPayslip={this._showPaySlip}
                    showDTR={this._showDTR}
                    showMonetaryAdjustmentForm={this._showMonetaryAdjustmentForm}/>

                <PayrollEmployeeListFooter data={this.props.data}/>

                { this.state._bShowPayslip ? oPaySlip : null }

                { this.state._bShowDTR ? oDTR : null }

                { this.state._bShowMonetaryAdjustmentForm ? oMonetaryAd : null }
                
            </View>
        );
    }
}