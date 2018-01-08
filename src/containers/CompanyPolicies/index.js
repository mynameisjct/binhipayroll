import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
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
import * as taxActions from './data/tax/actions';
import * as tardinessActions from './data/tardiness/actions';
import * as undertimeActions from './data/undertime/actions';
import * as overtimeActions from './data/overtime/actions';
import * as leavesActions from './data/leaves/actions';
import * as benefitsActions from './data/benefits/actions';

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
            _tardinessStatus: ['2', ''],
            _undertimeStatus: ['2', ''],
            _overtimeStatus: ['2', ''],
            _leaveStatus: ['2', ''],
            _benefitsStatus: ['2', ''],
            _bonusStatus: ['2', ''],

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
                    btnColor: btnInactive
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
                    btnColor: btnActive
                },
                {
                    id : '009',
                    name: '13th Month Pay',
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
/*         this._getWorkSchedule = this._getWorkSchedule.bind(this);
        this._getPayrollSchedule = this._getPayrollSchedule.bind(this);
        this._getTaxSettings = this._getTaxSettings.bind(this);
        this._getTardinessRule = this._getTardinessRule.bind(this);
        this._getUndertimeRule = this._getUndertimeRule.bind(this);
        this._getOvertimeRule = this._getOvertimeRule.bind(this);
        this._getLeavesRule = this._getLeavesRule.bind(this);
        this._getBenefitsRule = this._getBenefitsRule.bind(this);
        this._getBonusRule = this._getBenefitsRule.bind(this); */

        //Active Unsaved Transaction Trigger
        this._hasActiveTransaction = this._hasActiveTransaction.bind(this);
    }

    static navigationOptions = {
        header : 
            <Header2 title= 'COMPANY POLICIES'/>
    }
    
    componentDidMount = () => {
        this._initPage(this.props);
    }

    componentWillReceiveProps(nextProps){
        let objActiveCompany = {...nextProps.activecompany};
        if (this.props.activecompany.id !== objActiveCompany.id){
            /* console.log('objActiveCompany: ' + JSON.stringify(objActiveCompany)); */
            this._initPage(nextProps);
        }
    }

    _initPage = (oProps) => {
        try{
            this.setState({
                _objLoginInfo: {...oProps.logininfo},
                _objActiveCompany: {...oProps.activecompany},
                _status: 1,
                _activeChild: '008'
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
        this._getTardinessRule();
        this._getUndertimeRule();
        this._getOvertimeRule();
        this._getLeavesRule();
        this._getBenefitsRule();
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

    _getTaxSettings = (bForceUpdate) => {
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
            /* console.log('this.props.tax: ' + JSON.stringify(this.props.tax)); */
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

    _getTardinessRule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _tardinessStatus: curStatus
        });
        
        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }

        this.props.actions.tardiness.get(oInput)
        .then(() => {
/*             console.log('this.props.tardiness: ' + JSON.stringify(this.props.tardiness)); */
            let oTardiness  = {...this.props.tardiness};
            let oStatus = [oTardiness.flagno, oTardiness.message];
            this.setState({
                _tardinessStatus: oStatus
            });
		})
		.catch((exception) => {
            /* console.log('oInput: ' + JSON.stringify(oInput));
            console.log('exception: ' + exception); */
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _tardinessStatus: oStatus
            })
		});
    }

    _getUndertimeRule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _undertimeStatus: curStatus
        });

        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }
        
        this.props.actions.undertime.get(oInput)
        .then(() => {
            /* console.log('this.props.undertime: ' + JSON.stringify(this.props.undertime)); */
            let oUndertime  = {...this.props.undertime};
            let oStatus = [oUndertime.flagno, oUndertime.message];
            this.setState({
                _undertimeStatus: oStatus
            });
		})
		.catch((exception) => {
            /* console.log('oInput: ' + JSON.stringify(oInput));
            console.log('exception: ' + exception); */
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _undertimeStatus: oStatus
            })
		}); 
    }

    _getOvertimeRule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _overtimeStatus: curStatus
        });

        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }
        
        this.props.actions.overtime.get(oInput)
        .then(() => {
            /* console.log('this.props.overtime: ' + JSON.stringify(this.props.overtime)); */
            let oOvertime  = {...this.props.overtime};
            let oStatus = [oOvertime.flagno, oOvertime.message];
            this.setState({
                _overtimeStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('======OVERTIME ERROR=======');
            console.log('oInput: ' + JSON.stringify(oInput));
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _overtimeStatus: oStatus
            })
		}); 
    }

    _getLeavesRule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _leaveStatus: curStatus
        });

        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }
        
        this.props.actions.leaves.get(oInput)
        .then(() => {
            console.log('this.props.leaves: ' + JSON.stringify(this.props.leaves));
            let oLeaves  = {...this.props.leaves};
            let oStatus = [oLeaves.flagno, oLeaves.message];
            this.setState({
                _leaveStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('oInput: ' + JSON.stringify(oInput));
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _leaveStatus: oStatus
            })
		}); 
    }

    _getBenefitsRule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _benefitsStatus: curStatus
        });

        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }
        
        this.props.actions.benefits.get(oInput)
        .then(() => {
            console.log('this.props.benefits: ' + JSON.stringify(this.props.benefits));
            let oBenefits  = {...this.props.benefits};
            let oStatus = [oBenefits.flagno, oBenefits.message];
            this.setState({
                _benefitsStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('oInput: ' + JSON.stringify(oInput));
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _benefitsStatus: oStatus
            })
		}); 
    }

    _setActiveChild = (id, index) => {
        let btnState = this._getBtnState(index);
        requestAnimationFrame(() => {
            this.setState({
                _policyList: btnState,
                _activeChild: id,
                _activeBtn: index,
            })
        })
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
        if(this.state._status == 0){
            return(<StatusLoader.PromptError title={'Unable to load Company Policies.\n Please Contact BINHI-MeDFI.'}/>)
        }
        else if(this.state._status == 2){
            return(<StatusLoader.PromptLoading title='Loading...'/>)
        }
        else{
            switch (this.state._activeChild){
                case '001': 
                    childComponent = (
                        <WorkShift 
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._workShiftStatus} 
                            triggerRefresh={this._getWorkSchedule}/>
                    );
                    break;
                case '002':
                    childComponent = (
                        <Payroll 
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._payrollStatus} 
                            triggerRefresh={this._getPayrollSchedule}/>
                    );
                    break;
                case '003':
                    childComponent = (
                        <Tax 
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._taxStatus} 
                            triggerRefresh={this._getTaxSettings}/>
                    );
                    break;
                case '004':
                    childComponent = (
                        <Tardiness 
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._tardinessStatus} 
                            triggerRefresh={this._getTardinessRule}/>
                    )
                    break;
                case '005':
                    childComponent = (
                        <Undertime 
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._undertimeStatus} 
                            triggerRefresh={this._getUndertimeRule}/>
                    )
                    break;
                case '006':
                    childComponent = (
                        <Overtime
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._overtimeStatus} 
                            triggerRefresh={this._getOvertimeRule}/>
                    );
                    break;
                case '007':
                    childComponent = (
                        <Leaves
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._leaveStatus} 
                            triggerRefresh={this._getLeavesRule}/>
                    );
                    break;
                case '008':
                    childComponent = (
                        <Benefits
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._benefitsStatus} 
                            triggerRefresh={this._getBenefitsRule}/>
                    );
                    break;
                case '009':
                    childComponent = (<Bonus/>);
                    break;
                default:
                    childComponent = (null);
                    break;
            }

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
        tax: state.companyPoliciesReducer.tax,
        tardiness: state.companyPoliciesReducer.tardiness,
        undertime: state.companyPoliciesReducer.undertime,
        overtime: state.companyPoliciesReducer.overtime,
        leaves: state.companyPoliciesReducer.leaves,
        benefits: state.companyPoliciesReducer.benefits
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            workshift: bindActionCreators(workshiftActions, dispatch),
            payroll: bindActionCreators(payrollActions, dispatch),
            tax: bindActionCreators(taxActions,dispatch),
            tardiness: bindActionCreators(tardinessActions,dispatch),
            undertime: bindActionCreators(undertimeActions,dispatch),
            overtime: bindActionCreators(overtimeActions, dispatch),
            leaves: bindActionCreators(leavesActions, dispatch),
            benefits: bindActionCreators(benefitsActions, dispatch)
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPolicies)