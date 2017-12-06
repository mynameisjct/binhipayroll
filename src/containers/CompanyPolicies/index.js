import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header2 from '../Headers/header2';
import styles from './styles';
import apiConfig, {endPoints} from '../../services/api/config';

import WorkShift from './Children/workshift';
import Breaktime from './Children/breaktime';
import Payroll from './Children/payroll';
import Tax from './Children/tax';
import Tardiness from './Children/tardiness';
import Undertime from './Children/undertime';
import Overtime from './Children/overtime';
import Leaves from './Children/leaves';
import Benefits from './Children/benefits';
import Bonus from './Children/bonus';

//Redux
import { connect } from 'react-redux';
import {SetLoginInfo,SetActiveCompany, FetchDataFromDB} from '../../actions';

const btnActive = 'rgba(0, 0, 0, 0.1);'
const btnInactive = 'transparent';

export class CompanyPolicies extends Component {
    constructor(props){
        super(props);
        this.state = {
            _activeChild: <Breaktime/>,
            _policyList: [
                {
                    name: 'Work Shift',
                    childComponent: <WorkShift triggerRefresh={this._getWorkSchedule}/>,
                    iconName: 'timetable',
                    btnColor: btnInactive
                },
                {
                    name: 'Break Time',
                    childComponent: <Breaktime/>,
                    iconName: 'timer',
                    btnColor: btnActive
                },
                {
                    name: 'Payroll',
                    childComponent: <Payroll/>,
                    iconName: 'cash',
                    btnColor: btnInactive
                },
                {
                    name: 'Withholding Tax',
                    childComponent: <Tax/>,
                    iconName: 'calculator',
                    btnColor: btnInactive
                },
                {
                    name: 'Tardiness',
                    childComponent: <Tardiness/>,
                    iconName: 'clock-alert',
                    btnColor: btnInactive
                },
                {
                    name: 'Undertime',
                    childComponent: <Undertime/>,
                    iconName: 'timelapse',
                    btnColor: btnInactive
                },
                {
                    name: 'Overtime',
                    childComponent: <Overtime/>,
                    iconName: 'clock-fast',
                    btnColor: btnInactive
                },
                {
                    name: 'Leaves',
                    childComponent: <Leaves/>,
                    iconName: 'timer-off',
                    btnColor: btnInactive
                },
                {
                    name: 'Benefits',
                    childComponent: <Benefits/>,
                    iconName: 'format-list-numbers',
                    btnColor: btnInactive
                },
                {
                    name: 'Bonus',
                    childComponent: <Bonus/>,
                    iconName: 'wunderlist',
                    btnColor: btnInactive
                },
            ]
        }
        
        this._getWorkSchedule = this._getWorkSchedule.bind(this);
    }

    static navigationOptions = {
        header : 
            <Header2 title= 'COMPANY POLICIES'/>
    }

    componentDidMount = () => {
        this._getWorkSchedule(false);
    }

    _getWorkSchedule = (bForceUpdate) => {
        if(!this.props.workShift || bForceUpdate){
            let objLoginInfo = Object.assign({}, this.props.logininfo)
            let objActiveCompany = Object.assign({}, this.props.activecompany)
            this.props.dispatchFetchDataFromDB({
                url: apiConfig.url + endPoints.workShift,
                strModule: 'WORKSHIFT',
                strType: 'WORKSHIFT_GET',
                input: {
                    companyid: objActiveCompany.id,
                    username: objLoginInfo.resUsername,
                    transtype: 'get'
                }
            });
        }
    }

    _setActiveChild = (oComponent, index) => {
        this.setState({
            _activeChild: oComponent,
            _activeBtn: index,
        },
            () => {
                this._setBtnColor(index);
            }
        );
    }

    _setBtnColor = (index) => {
        let objNew = [...this.state._policyList];
        objNew.map((btnInfo, curIndex) => {
            if(index==curIndex){
                objNew[curIndex].btnColor = btnActive;
            }
            else{
                objNew[curIndex].btnColor = btnInactive;
            }
        })
        this.setState({
            _policyList: objNew
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.leftCont}>
                    <ScrollView contentContainerStyle={styles.scrollableCont}>
                        <View style={styles.optionsCont}>
                            {
                                this.state._policyList.map((btnInfo, index) => (
                                    <TouchableNativeFeedback 
                                        key={index}
                                        onPress={() => {this._setActiveChild(btnInfo.childComponent, index)}}
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
                    {this.state._activeChild}
                </View>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        fetchHasErrored: state.fetchHasErrored,
        fetchIsLoading: state.fetchIsLoading,
        workShift: state.GetWorkShift
    }
}

function mapDispatchToProps (dispatch) {
    
    return {
        dispatchFetchDataFromDB: (objData) => {
            dispatch(FetchDataFromDB(objData))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPolicies)