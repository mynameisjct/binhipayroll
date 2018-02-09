import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    FlatList,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from './styles';

//Child Containers
import WorkShift from './workshift';;
import Payroll from './payroll';
import Tax from './tax';
import Tardiness from './tardiness';
import Undertime from './undertime';
import Overtime from './overtime';
import Leaves from './leaves';
import Benefits from './Rules/benefits';
import Bonus from './Rules/bonus';
import Ranks from './ranks';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {SetLoginInfo, SetActiveCompany} from '../../actions';
import * as payrollActions from './data/payroll/actions';
import * as taxActions from './data/tax/actions';
import * as benefitsActions from './data/benefits/actions';
import * as bonusActions from './data/bonus/actions';
import * as ranksActions from './data/ranks/actions';

//Custom Components
import * as StatusLoader from '../../components/ScreenLoadStatus';
import Header2 from '../Headers/header2';

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
            _payrollStatus: ['3', 'Loading...'],
            _taxStatus: ['3','Loading...'],
            _benefitsStatus: ['3', 'Loading...'],
            _bonusStatus: ['3', 'Loading...'],
            _ranksStatus: ['3', 'Loading...'],

            //Unsaved Transaction
            _hasActiveTransaction: false,

            //Active Child State
            _activeChild: '',   

            //List of Children
            _policyList: [
                {
                    key : '001',
                    name: 'Work Shift',
                    iconName: 'timetable',
                    btnColor: btnInactive,
                    /* childComponent: <WorkShift 
                        status={this.state._workShiftStatus} 
                        triggerRefresh={this._getWorkSchedule}/> */
                },
                {
                    key : '002',
                    name: 'Payroll',
                    iconName: 'cash',
                    btnColor: btnInactive,
                    /* childComponent: <Payroll 
                        status={this.state._payrollStatus} 
                        triggerRefresh={this._getPayrollSchedule}/> */
                },
                {
                    key : '003',
                    name: 'Withholding Tax',
                    iconName: 'calculator',
                    btnColor: btnInactive,
                    /* childComponent: <Tardiness 
                        status={this.state._taxStatus} 
                        triggerRefresh={this._getTaxSettings}/> */
                },
                {
                    key : '004',
                    name: 'Tardiness',
                    iconName: 'clock-alert',
                    btnColor: btnInactive,
                    /* childComponent: <Undertime 
                        status={this.state._tardinessStatus} 
                        triggerRefresh={this._getTardinessRule}/> */
                },
                {
                    key : '005',
                    name: 'Undertime',
                    iconName: 'timelapse',
                    btnColor: btnInactive,
                    /* childComponent: <Undertime 
                        status={this.state._undertimeStatus} 
                        triggerRefresh={this._getUndertimeRule}/> */
                },
                {
                    key : '006',
                    name: 'Overtime',
                    iconName: 'clock-fast',
                    btnColor: btnInactive,
                    /* childComponent: <Overtime 
                        status={this.state._overtimeStatus} 
                        triggerRefresh={this._getOvertimeRule}/> */
                },
                {
                    key : '007',
                    name: 'Leaves',
                    iconName: 'timer-off',
                    btnColor: btnInactive,
                    /* childComponent: <Leaves 
                        status={this.state._leaveStatus} 
                        triggerRefresh={this._getLeavesRule}/> */
                },
                {
                    key : '008',
                    name: 'Benefits',
                    iconName: 'format-list-numbers',
                    btnColor: btnInactive,
                    /* childComponent: <Benefits 
                        status={this.state._benefitsStatus} 
                        triggerRefresh={this._getBenefitsRule}/> */
                },
                {
                    key : '009',
                    name: '13th Month Pay',
                    iconName: 'wunderlist',
                    btnColor: btnActive,
                    /* childComponent: <Bonus 
                        status={this.state._bonusStatus} 
                        triggerRefresh={this._getBonusRule}/> */
                },
                {
                    key : '010',
                    name: 'Ranks',
                    iconName: 'account-star',
                    btnColor: btnInactive,
                    /* childComponent: <Ranks 
                        status={this.state._ranksStatus} 
                        triggerRefresh={this._getRanksRule}/> */
                },
            ],
        }
        
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
            this.setState({
                _status: 2
            },
                () => {
                    this._initPage(nextProps);
                }
            )
            
        }
    }

    _initPage = (oProps) => {
        try{
            this.setState({
                _objLoginInfo: {...oProps.logininfo},
                _objActiveCompany: {...oProps.activecompany},
                _payrollStatus: ['3', 'Loading...'],
                _taxStatus: ['3','Loading...'],
                _benefitsStatus: ['3', 'Loading...'],
                _bonusStatus: ['3', 'Loading...'],
                _ranksStatus: ['3', 'Loading...']
            },
                () => {
                    this._setActiveChild({key:'010'});
                    this.setState({_status: 1});
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

    _getBonusRule = (bForceUpdate) => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _bonusStatus: curStatus
        });

        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }
        
        this.props.actions.bonus.get(oInput)
        .then(() => {
            console.log('this.props.bonus: ' + JSON.stringify(this.props.bonus));
            let oBonus  = {...this.props.bonus};
            let oStatus = [oBonus.flagno, oBonus.message];
            this.setState({
                _bonusStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('oInput: ' + JSON.stringify(oInput));
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _bonusStatus: oStatus
            })
		}); 
    }

    _getRanksRule = () => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _ranksStatus: curStatus
        });

        let oInput = {
            companyid: this.state._objActiveCompany.id,
            username: this.state._objLoginInfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        }
        
        this.props.actions.ranks.get(oInput)
        .then(() => {
            console.log('this.props.ranks: ' + JSON.stringify(this.props.ranks));
            let oRanks  = {...this.props.ranks};
            let oStatus = [oRanks.flagno, oRanks.message];
            this.setState({
                _bonusStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('oInput: ' + JSON.stringify(oInput));
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _ranksStatus: oStatus
            })
		}); 
    }

    _setActiveChild = (oItem) => {
        this._setButtons(oItem);
        requestAnimationFrame(() => {
            this._setChildComponent(oItem);
        })
    }

_setActiveChild = (oItem) => {
    if(this.state._activeChild != oItem.key){
        this._setButtons(oItem); //immediately trigg
        requestAnimationFrame(() => {
            this._setChildComponent(oItem);
            this.flatListRef.scrollToIndex({animated: true, index: Number(oItem.key)-1});
        })
    }
}

    _setButtons = (oItem) => {
        let aList = [...this.state._policyList];
        aList.map((oPolicy) => oPolicy.key === oItem.key ?  
            oPolicy.btnColor=btnActive : oPolicy.btnColor=btnInactive );
        this.setState({ _policyList: aList,  _activeChild: '' });
    }

    _setChildComponent = (oItem) => {
        this.setState({ _activeChild: oItem.key })
    }

    _getItemLayout = (data, index) => (
        { length: 50, offset: 50 * index, index }
      )

    render(){
        
        //Child View Should be placed within render to make it listen to parent's state changes
        /* let childComponent; */
        if(this.state._status == 0){
            return(<StatusLoader.PromptError title={'Unable to load Company Policies.\n Please Contact BINHI-MeDFI.'}/>)
        }
        else if(this.state._status == 2){
            return(<StatusLoader.PromptLoading title='Loading...'/>)
        }
        else{
            let childComponent = '';
            switch (this.state._activeChild){
                case '001': 
                    childComponent = (
                        <WorkShift/>
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
                        <Tardiness/>
                    )
                    break;
                case '005':
                    childComponent = (
                        <Undertime/>
                    )
                    break;
                case '006':
                    childComponent = (
                        <Overtime/>
                    );
                    break;
                case '007':
                    childComponent = (
                        <Leaves/>
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
                    childComponent = (
                        <Bonus
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._bonusStatus} 
                            triggerRefresh={this._getBonusRule}
                        />);
                    break;
                case '010':
                    childComponent = (
                        <Ranks
                            hasUnsaved={this._hasActiveTransaction} 
                            status={this.state._ranksStatus} 
                            triggerRefresh={this._getRanksRule}
                        />);
                    break;
                default:
                    childComponent = (<StatusLoader.PromptLoading title='Loading...'/>);
                    break;
            }

            return(
                <View style={styles.container}>
                    <LinearGradient 
                        colors={['#818489', '#3f4144', '#202626']}
                        style={styles.leftCont}>
                        
                        <View style={styles.optionsCont}>
                            <LinearGradient 
                                colors={['#a1a1a3', '#6a6a6d', '#303033']}
                                style={styles.contTitle}>
                                <Text style={styles.txtTitle}>
                                    {this.props.activecompany.name.toUpperCase()}
                                </Text>
                            </LinearGradient>
                            <FlatList
                                getItemLayout={this._getItemLayout}
                                ref={(ref) => { this.flatListRef = ref; }}
                                data={this.state._policyList}
                                renderItem={({item}) => 
                                    <TouchableNativeFeedback 
                                        onPress={() => {this._setActiveChild(item)}}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <View style={[styles.btnCont, {backgroundColor: item.btnColor}]}>
                                            <View style={styles.iconCont}>
                                                <View style={styles.iconPlaceholder}>
                                                    <Icon name={item.iconName} size={20} color='#fff'/>
                                                </View>
                                            </View>
                                            <View style={styles.labelCont}>
                                                <Text style={styles.txtLabel}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                }
                            />
                        </View>
                    </LinearGradient>
                        
                    <View style={styles.rightCont}>
                        {childComponent}
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
        payroll: state.companyPoliciesReducer.payroll,
        tax: state.companyPoliciesReducer.tax,
        benefits: state.companyPoliciesReducer.benefits,
        bonus: state.companyPoliciesReducer.bonus,
        ranks: state.companyPoliciesReducer.ranks

    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            payroll: bindActionCreators(payrollActions, dispatch),
            tax: bindActionCreators(taxActions,dispatch),
            benefits: bindActionCreators(benefitsActions, dispatch),
            bonus: bindActionCreators(bonusActions, dispatch),
            ranks: bindActionCreators(ranksActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPolicies)