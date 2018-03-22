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
import Benefits from './benefits';
import Bonus from './bonus';
import Ranks from './ranks';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {SetLoginInfo, SetActiveCompany} from '../../actions';

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

            //Unsaved Transaction
            _hasActiveTransaction: false,

            //Active Child State
            _activeChild: '001',   

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
                _objActiveCompany: {...oProps.activecompany}
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
                    childComponent = (<WorkShift/>);
                    break;
                case '002':
                    childComponent = (<Payroll/>);
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
                case '010':
                    childComponent = (<Ranks/>);
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
        activecompany: state.activeCompanyReducer.activecompany

    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPolicies)