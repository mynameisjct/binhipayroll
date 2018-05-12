import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

//Children Components
import MonetaryAdjustmentForm from './form';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import MessageBox from '../../../components/MessageBox';


//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as payrollListActions from '../../Reports/data/payrollSchedule/actions';
import * as employeeListActions from '../../Employees/data/list/actions';

//helper
import * as oHelper from '../../../helper';

//Constants
const TITLE = 'SPECIAL DEDUCTIONS & ALLOWANCES';

export class MonetaryAdjustment extends Component {
    constructor(props){
        super(props);
        this.state = {
            calculating: false,
            calculatingMsg: '',
            refreshing: false
        }
    }
    componentDidMount(){
        this._getUpdatedRequiredDataFromDB();
    }

    _getUpdatedRequiredDataFromDB = () => {
        this.props.actions.employeelist.get();
        this.props.actions.payrollList.get();
    }

    _hideForm = () => {
        this.props.hideForm(true);
    }

    render(){
        const payrollListData = this.props.payrollList.data;
        const payrollListStatus = this.props.payrollList.status;

        if(payrollListStatus[0] != 1){
            
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
                                    title={'Preparing Employee and Payroll Information... Please wait...'}
                                />
                            : null

                    }
                </View>
            );
        }else{
            const aEmpList = this.props.employeelist.data;
            const aEmpListEnums = oHelper.generateEnums(aEmpList, 'key', 'name');
            console.log('aEmpListEnums: ' + JSON.stringify(aEmpListEnums));
            return(
                <MonetaryAdjustmentForm 
                    title={TITLE}
                    visible={this.props.visible}
                    onCancel={() => this.props.onCancel()}
                    onSubmit={() => this.props.onSubmit()}/>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        employeelist: state.employees.list,
        payrollList: state.reports.payrollSchedule
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employeelist: bindActionCreators(employeeListActions, dispatch),
            payrollList: bindActionCreators(payrollListActions, dispatch),
        }
    }
}
  
export default  withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(MonetaryAdjustment))