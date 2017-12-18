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
import Header2 from '../Headers/header2';
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

//Status Prompt Components
import * as StatusLoader from '../../components/ScreenLoadStatus';

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
            ]
        }
        
        //Binding for Refresh Control
        this._getWorkSchedule = this._getWorkSchedule.bind(this);
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
    
    _getAllCompanyPolicies = () => {
/*         this._getWorkSchedule(); */
        this._getPayrollSchedule();
      /*   this._getTaxSettings(); */
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
            console.log('this.props.payroll: ' + JSON.stringify(this.props.payroll));
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
                _workShiftStatus: oStatus
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
                childComponent = (<WorkShift status={this.state._workShiftStatus} triggerRefresh={this._getWorkSchedule}/>);
                break;
            case '002':
                childComponent = (<Payroll status={this.state._payrollStatus} triggerRefresh={this._getPayrollSchedule}/>);
                break;
            case '003':
                childComponent = (<Tax/>);
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
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        fetchHasErrored: state.fetchHasErrored,
        fetchIsLoading: state.fetchIsLoading,
        companyWorkShift: state.companyPoliciesReducer.workshift,
        payroll: state.companyPoliciesReducer.payroll
        
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            workshift: bindActionCreators(workshiftActions, dispatch),
            payroll: bindActionCreators(payrollActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPolicies)