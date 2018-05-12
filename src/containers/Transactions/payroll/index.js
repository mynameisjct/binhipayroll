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
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import MessageBox from '../../../components/MessageBox';

//Constants
const TITLE = 'GENERATE PAYROLL';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as payrollListActions from '../../Reports/data/payrollSchedule/actions';
import * as payrollGenerationApi from '../../PayrollGeneration/data/api';
import * as payrollGenerationActions from '../../PayrollGeneration/data/actions';

//helper
import * as oHelper from '../../../helper';

export class PayrollTransaction extends Component {
    constructor(props){
        super(props);
        this.state = {
            calculating: false,
            calculatingMsg: '',
            refreshing: false
        }
    }

    _onFormSubmit = (oData) => {
        /* this.props.onSubmit(); */
        /* this.props.navigation.navigate('PayrollGeneration'); */
        this._setCalculationStatus(true, oData);
        this._generatePayroll(oData);
    }

    _generatePayroll = async (oData) => {
        await payrollGenerationApi.generate(oData.id)
            .then((response) => response.json())
            .then((res) => {
                this._setCalculationStatus(false, oData);
                console.log('RES_GEN_PAYROLL: ' + JSON.stringify(res));

                if(res.flagno == 1){
                    this._hideForm();
                    this.props.actions.payrollGeneration.update(res.data);
                    this.props.navigation.navigate('PayrollGeneration');
                }else{
                    //Promp Error
                }
            })
            .catch((exception) => {
                this._setCalculationStatus(false, oData);
                console.log('RES_GEN_PAYROLL: ' + exception.message);
            });
    }

    _setCalculationStatus = (value, oData) => {
        this.setState({
            calculating: value,
            calculatingMsg: 'Calculating Payroll. Please wait...' + 
                '\nPayroll Date: ' + oHelper.convertDateToString(oData.payrollDate, 'MMMM DD, YYYY')+
                '\nPayroll Period: ' + oHelper.convertDateToString(oData.periodFrom, 'MMM DD, YYYY')+
                ' - ' + oHelper.convertDateToString(oData.periodTo, 'MMM DD, YYYY')
        });
    }

    componentDidMount(){
        this._getDataFromDB();
    }

    _getDataFromDB = () => {
        this.props.actions.payrollList.get(); 
    }

    _hideForm = () => {
        this.props.hideForm(true);
    }

    render(){
        const payrollListData = this.props.payrollList.data;
        const payrollListStatus = this.props.payrollList.status;

        if(this.state.calculating){
            return(
                <PromptScreen.PromptGeneric 
                    show= {true} 
                    title={this.state.calculatingMsg}
                />
            );
        }else if(payrollListStatus[0] != 1){
            
            return(
                <View style={{flex: 1, position: 'absolute'}}>
                    {
                        payrollListStatus[0] == 0 ?
                            <MessageBox
                                promptType={'error-ok'}
                                show={true}
                                onClose={this._hideForm}
                                message={'Unable to fetch Payroll List. Check your internet connection or Please try again.'}
                            />
                        : 
                            payrollListStatus[0] == 2 ?
                                <PromptScreen.PromptGeneric 
                                    show= {true} 
                                    title={'Fetching Payroll List... Please wait...'}
                                />
                            : null

                    }
                </View>
            );
        }else{
            const curPayroll = payrollListData.current;
            const prevPayroll = payrollListData.previous;
            const aPayrollList = [...curPayroll, ...prevPayroll];

            if(curPayroll.length == 0){
                return(
                    <MessageBox
                        promptType={'error-ok'}
                        show={true}
                        onClose={this._hideForm}
                        message={'Cannot process request. No Existing Payroll Schedule found. Set Payroll Policy first.'}
                    />
                );
            }
            
            else{
                return(
                    <PayrollTransactionForm
                        data={aPayrollList}
                        title={TITLE}
                        visible={this.props.visible}
                        onCancel={() => this.props.onCancel()}
                        onSubmit={this._onFormSubmit}/>
                );
            }
        }
        
    }
}

function mapStateToProps (state) {
    return {
        payrollList: state.reports.payrollSchedule
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            payrollList: bindActionCreators(payrollListActions, dispatch),
            payrollGeneration: bindActionCreators(payrollGenerationActions, dispatch)
        }
    }
}
  
export default  withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(PayrollTransaction))