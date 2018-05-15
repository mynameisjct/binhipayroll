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

//API
import * as monetaryAdjustmentApi from '../data/monetaryAdjustment/api';

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
            refreshing: false,
            loadingScreen: {
                show: false,
                msg: 'test'
            },

            msgBox: {
                show: false,
                type: '',
                msg: '',
                param: ''
            },
        }
    }

    //Loading Screen and MsgBox Functions
    _setMessageBox = (show, type, msg, param) => {
        this.setState({
            msgBox: oHelper.setMsgBox(
                this.state.msgBox,
                show, 
                type,
                msg,
                param
            )
        })
    }

    _setLoadingScreen = (show, msg) => {
        this.setState({ 
            loadingScreen: oHelper.setLoadingScreen(show, msg)
        });
    }

    _msgBoxOnClose = (params) => {
        this.setState({
            msgBox: oHelper.clearMsgBox(this.state.msgBox)
        })
    }

    //Class based functions
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

    _onFormSubmit = (oData) => {
        let oCurData = {...oData};
        aEmpIdSplit = (oCurData.employeeid).split(oHelper.separatorString);
        aPayrollId = (oCurData.payrollid).split(oHelper.separatorString);
        oCurData.id = '';
        oCurData.payrollid = aPayrollId[1];
        oCurData.employeeid = aEmpIdSplit[1];
        oCurData.enablecancel = 1;
        oCurData.status_id = 5;
        this._createDataToDB(oCurData);
    }

    _createDataToDB = async(oCurData) => {
        this._setLoadingScreen(true, 'Saving Transaction. Please wait...');
        await monetaryAdjustmentApi.create(oCurData)
        .then((response) => response.json())
        .then((res) => {
            if(res.flagno==1){
                this._hideForm();
            }
            this._setMessageBox(
                true, 
                res.flagno == 1 ? 'success' : 'error-ok',
                res.message
            );
        }).catch((exception) => {
            this._setMessageBox(
                true, 
                'error-ok',
                exception.message
            );
        });
        this._setLoadingScreen(false);
    }

    render(){
        const payrollListData = this.props.payrollList.data;
        const payrollListStatus = this.props.payrollList.status;
        const aEmpList = this.props.employeelist.data;
        const aEmpStatus = this.props.employeelist.status;
        if(payrollListStatus[0] != 1 || aEmpStatus[0] !=1){
            
            return(
                <View style={{flex: 1, position: 'absolute'}}>
                    {
                        payrollListStatus[0] == 0 || aEmpStatus[0] == 0 ?
                            <MessageBox
                                promptType={'error-ok'}
                                show={true}
                                onClose={this._hideForm}
                                message={'Unable to fetch Payroll List. Check your internet connection or Please try again.'}
                            />
                        : 
                            payrollListStatus[0] == 2 || aEmpStatus[0] == 0 ?
                                <PromptScreen.PromptGeneric 
                                    show= {true} 
                                    title={'Preparing Employee and Payroll Information... Please wait...'}
                                />
                            : null
                    }
                </View>
            );
        }else{
            const aEmpListEnums = oHelper.generateEnumsConcatPropAndVal(aEmpList, 'key', 'name');
            const curPayroll = payrollListData.current;
            const futurePayroll = payrollListData.future;
            const aPayrollList = [...curPayroll, ...futurePayroll];
            const aPayrollListEnums = oHelper.generateEnumsConcatPropAndValDate(aPayrollList, 'id', 'payrollDate', 'MMMM DD, YYYY');
            console.log('aPayrollListEnums: ' + JSON.stringify(aPayrollListEnums));
            return(
                <View>
                    <MonetaryAdjustmentForm 
                        title={TITLE}
                        data ={{employeeList: aEmpListEnums, payrollList: aPayrollListEnums}}
                        visible={this.props.visible}
                        onCancel={() => this.props.onCancel()}
                        onSubmit={this._onFormSubmit}/>

                    <MessageBox
                        promptType={this.state.msgBox.type || ''}
                        show={this.state.msgBox.show || false}
                        onClose={this._msgBoxOnClose}
                        message={this.state.msgBox.msg || ''}
                    />

                    <PromptScreen.PromptGeneric 
                        show= {this.state.loadingScreen.show || false} 
                        title={this.state.loadingScreen.msg || ''}
                    />
                </View>
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