import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Chil Views and Properties
import styles from './styles';
import apiConfig, {endPoints} from '../../services/api/config';

//Child Containers
import WorkShift from './Rules/workshift';;
import Payroll from './Rules/payroll';
import Tax from './Rules/tax';
import Tardiness from './Rules/tardiness';
import Undertime from './Rules/undertime';
import Overtime from './Rules/overtime';
import Leaves from './Rules/leaves';
import Benefits from './Rules/benefits';
import Bonus from './Rules/bonus';

//API
import * as workshiftAPI from './data/workshift/api';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {SetLoginInfo, SetActiveCompany} from '../../actions';
import * as workshiftActions from './data/workshift/actions';
import * as payrollActions from './data/payroll/actions';
import * as taxActions from './data/tax/actions'

//Custom Components
import * as StatusLoader from '../../components/ScreenLoadStatus';
import Header2 from '../Headers/header2';
import MessageBox from '../../components/MessageBox';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';

export class CompanyPolicies extends Component {
    constructor(props){
        super(props);
        this.state = {
            //Component State
            _status: '2',

            //Redux Store
            _objLoginInfo: null,
            _objActiveCompany: null,

            //Error-0, Success-1, Loading-2,  Handler
            _workShiftStatus: ['2', ''],
            _payrollStatus: ['2', ''],
            _taxStatus: ['2',''],

            //Unsaved Transaction
            _hasActiveTransaction: false,

            //Active Child State
            _activeChild: '',   

            //List of Children
            _policyList: [
                {
                    id : '001',
                    name: 'Work Shift',
                    iconName: 'timetable',
                    btnColor: btnInactive
                },
                {
                    id : '002',
                    name: 'Payroll',
                    iconName: 'cash',
                    btnColor: btnActive
                },
                {
                    id : '003',
                    name: 'Withholding Tax',
                    iconName: 'calculator',
                    btnColor: btnInactive
                },
                {
                    id : '004',
                    name: 'Tardiness',
                    iconName: 'clock-alert',
                    btnColor: btnInactive
                },
                {
                    id : '005',
                    name: 'Undertime',
                    iconName: 'timelapse',
                    btnColor: btnInactive
                },
                {
                    id : '006',
                    name: 'Overtime',
                    iconName: 'clock-fast',
                    btnColor: btnInactive
                },
                {
                    id : '007',
                    name: 'Leaves',
                    iconName: 'timer-off',
                    btnColor: btnInactive
                },
                {
                    id : '008',
                    name: 'Benefits',
                    iconName: 'format-list-numbers',
                    btnColor: btnInactive
                },
                {
                    id : '009',
                    name: 'Bonus',
                    iconName: 'wunderlist',
                    btnColor: btnInactive
                },
            ],

            //Messagebox
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: ''
        }
        
        //Binding for Refresh Control
        this._getWorkSchedule = this._getWorkSchedule.bind(this);
        this._getPayrollSchedule = this._getPayrollSchedule.bind(this);

        //Active Unsaved Transaction Trigger
        this._hasActiveTransaction = this._hasActiveTransaction.bind(this);
    }

    static navigationOptions = {
        header : 
            <Header2 title= 'COMPANY POLICIES'/>
    }
    
    componentDidMount = () => {
        this._initPage();
    }

    _initPage = () => {
        try{
            this.setState({
                _objLoginInfo: {...this.props.logininfo},
                _objActiveCompany: {...this.props.activecompany},
                _status: 1,
                _activeChild: '002'
            },
                () => {
                    this._getAllCompanyPolicies();
                }
            )
        }
        catch(exception){
            this.setState({
                _status: 0
            })
        }
    }

    _hasActiveTransaction = (value) => {
        this.setState({
            _hasActiveTransaction: value
        })
    }
    
    _getAllCompanyPolicies = () => {
        this._getWorkSchedule();
        this._getPayrollSchedule();
        this._getTaxSettings();
    }

    _getWorkSchedule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _workShiftStatus: curStatus
        });

        this.props.actions.workshift.get({
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        })
        .then(() => {
            let oWorkShift  = {...this.props.companyWorkShift};
            let oStatus = [oWorkShift.flagno, oWorkShift.message];
            this.setState({
                _workShiftStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _workShiftStatus: oStatus
            })
		});
    }

    _getPayrollSchedule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _payrollStatus: curStatus
        });

        this.props.actions.payroll.get({
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        })
        
        .then(() => {
            /* console.log('this.props.payroll: ' + JSON.stringify(this.props.payroll)); */
            let oPayroll  = {...this.props.payroll};
            let oStatus = [oPayroll.flagno, oPayroll.message];
            this.setState({
                _payrollStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _payrollStatus: oStatus
            })
		});
    }

    _getTaxSettings = () => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _taxStatus: curStatus
        });
        
        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }

        this.props.actions.tax.get(oInput)
        .then(() => {
            let oTax  = {...this.props.tax};
            let oStatus = [oTax.flagno, oTax.message];
            this.setState({
                _taxStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _taxStatus: oStatus
            })
		});
    }

    _setActiveChild = (id, index) => {
        let btnState = this._getBtnState(index);
        this.setState({
            _policyList: btnState,
            _activeChild: id,
            _activeBtn: index,
        });
    }

    _getBtnState = (index) => {
        let objNew = [...this.state._policyList];
        objNew.map((btnInfo, curIndex) => {
            if(index==curIndex){
                objNew[curIndex].btnColor = btnActive;
            }
            else{
                objNew[curIndex].btnColor = btnInactive;
            }
        })
        return objNew;
    }

    render(){
        //Child View Should be placed within render to make it listen to parent's state changes
        let childComponent;

        switch (this.state._activeChild){
            case '001': 
                childComponent = (<WorkShift hasUnsaved={this._hasActiveTransaction} status={this.state._workShiftStatus} triggerRefresh={this._getWorkSchedule}/>);
                break;
            case '002':
                childComponent = (<Payroll hasUnsaved={this._hasActiveTransaction} status={this.state._payrollStatus} triggerRefresh={this._getPayrollSchedule}/>);
                break;
            case '003':
                childComponent = (<Tax hasUnsaved={this._hasActiveTransaction} status={this.state._taxStatus} triggerRefresh={this._getTaxSettings}/>);
                break;
            case '004':
                childComponent = (<Tardiness/>);
                break;
            case '005':
                childComponent = (<Undertime/>);
                break;
            case '006':
                childComponent = (<Overtime/>);
                break;
            case '007':
                childComponent = (<Leaves/>);
                break;
            case '008':
                childComponent = (<Benefits/>);
                break;
            case '009':
                childComponent = (<Bonus/>);
                break;
            default:
                childComponent = (null);
                break;
        }

        if(this.state._status == 0){
            return(<StatusLoader.PromptError title={'Unable to load Company Policies.\n Please Contact BINHI-MeDFI.'}/>)
        }
        else if(this.state._status == 2){
            return(<StatusLoader.PromptLoading title='Loading...'/>)
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={styles.leftCont}>
                        <ScrollView contentContainerStyle={styles.scrollableCont}>
                            <View style={styles.optionsCont}>
                                {
                                    this.state._policyList.map((btnInfo, index) => (
                                        <TouchableNativeFeedback 
                                            key={index}
                                            onPress={() => {this._setActiveChild(btnInfo.id, index)}}
                                            background={TouchableNativeFeedback.SelectableBackground()}>
                                            <View style={[styles.btnCont, {backgroundColor: btnInfo.btnColor}]}>
                                                <View style={styles.iconCont}>
                                                    <View style={styles.iconPlaceholder}>
                                                        <Icon name={btnInfo.iconName} size={20} color='#fff'/>
                                                    </View>
                                                </View>
                                                <View style={styles.labelCont}>
                                                    <Text style={styles.txtLabel}>{btnInfo.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                    
                    <View style={styles.rightCont}>
                        {   
                            childComponent
                        }
                    </View>
                    <MessageBox
                        promptType={this.state._msgBoxType}
                        show={this.state._msgBoxShow}
                        onClose={this._closeMsgBox}
                        onWarningContinue={this._continueActionOnWarning}
                        message={this.state._resMsg}
                    />
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        companyWorkShift: state.companyPoliciesReducer.workshift,
        payroll: state.companyPoliciesReducer.payroll,
        tax: state.companyPoliciesReducer.tax
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            workshift: bindActionCreators(workshiftActions, dispatch),
            payroll: bindActionCreators(payrollActions, dispatch),
            tax: bindActionCreators(taxActions,dispatch)
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPolicies)