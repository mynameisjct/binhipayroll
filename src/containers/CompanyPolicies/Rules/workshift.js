import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    ScrollView,
    CheckBox,
    TimePickerAndroid,
    Switch,
    RefreshControl,
    Picker,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import _ from 'lodash';
import ActionButton from 'react-native-action-button';

import styles from './styles'
import CustomCard from '../../../components/CustomCards';
import MessageBox from '../../../components/MessageBox';
import SavePrompt from '../../../components/SavePrompt';
import apiConfig, {endPoints} from '../../../services/api/config';
import {PromptError, PromptLoading} from '../../../components/ScreenLoadStatus';

//Redux
import { connect } from 'react-redux';
import {SetLoginInfo,
    SetActiveCompany, 
    FetchDataFromDB, 
    SetDataActionTrigger
} from '../../../actions';
import * as workShiftSelector from '../data/workshift/selector';

import {UpdateWorkShift} from '../../../actions/companyPolicies';

const title_WorkShift = 'Work Shift Schedule';
const category = ['', 'DAY OFF', 'TIME-IN', 'TIME-OUT'];
const description_DefaultTime = 'The same Time-in and Time-out';

const title_BreakTime = 'Break Time';
const description_BreakTime = 'Allow break time';
const color_SwitchOn='#838383';
const color_SwitchOff='#D1D4D6';
const color_SwitchThumb='#EEB843';
const status_loading = [2, 'Loading...'];
const status_success = [1, ''];

export class WorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            _status: status_loading,
            _disabledMode: true,
            _activeSchedule: null,

            _data: [
                {
                    id: '0001',
                    name: 'MORNING BREAK',
                    timestart: '10:00 AM',
                    timeend: '10:15 AM',
                    duration: '0hr 15min',
                },
                {
                    id: '0001',
                    name: 'LUNCH BREAK',
                    timestart: '12:00 PM',
                    timeend: '01:30 PM',
                    duration: '1hr 30min',
                },
                {
                    id: '0001',
                    name: 'AFTERNOON BREAK',
                    timestart: '03:00 PM',
                    timeend: '03:15 PM',
                    duration: '0hr 15min',
                }
            ],

            _activeType: '50',
            _curWorkShiftObj: {
                schedule: [
                    {
                        id: '',
                        description: ''
                    }
                ], 
                breaktime: [
                    {
                        id: '',
                        description: ''
                    }
                ]},
            _dailyPolicy: {
                sunday: {
                    header: 'S',
                    dayoff: false,
                    timein: '08:00 AM',
                    timeout: '05:30 PM',
                },
                monday: {
                    header: 'M',
                    dayoff: false,
                    timein: '08:00 AM',
                    timeout: '05:30 PM',
                },
                tuesday: {
                    header: 'T',
                    dayoff: false,
                    timein: '08:00 AM',
                    timeout: '05:30 PM',
                },
                wednesday: {
                    header: 'W',
                    dayoff: false,
                    timein: '08:00 AM',
                    timeout: '05:30 PM',
                },
                thursday: {
                    header: 'T',
                    dayoff: false,
                    timein: '08:00 AM',
                    timeout: '05:30 PM',
                },
                friday: {
                    header: 'F',
                    dayoff: false,
                    timein: '08:00 AM',
                    timeout: '05:30 PM',
                },
                saturday: {
                    header: 'S',
                    dayoff: false,
                    timein: '08:00 AM',
                    timeout: '05:30 PM',
                },
            },

            _defaultSetting:{
                enabled: false,
                timein: '00:00 PM',
                timeout: '00:00 PM'
            },

            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            
            _changeDetected: false,

            _refreshing: false
        }

        this._continueActionOnWarning = this._continueActionOnWarning.bind(this);
        this._closeMsgBox = this._closeMsgBox.bind(this);
        this._saveAction = this._saveAction.bind(this);
        this._undoAction = this._undoAction.bind(this);
    }

    componentDidMount(){
        if(this.props.status[0]==1){
            this._initValues();
        }

        this.setState({
            _status: [...this.props.status]
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.status[0]){
            if(nextProps.status[0]==1){
                this._initValues();
            }

            this.setState({
                _status: nextProps.status
            })
        }
    }

    _initValues = (companyWorkShift) => {
        this.setState({
            _curWorkShiftObj: workShiftSelector.getWorkShiftObject(),
            _activeSchedule: workShiftSelector.getDefaultActiveType()
        });
/*         console.log('workShiftSelector.getDefaultActiveType(): ' + JSON.stringify());
        console.log('workShiftSelector.getWorkShifTypes(): ' + JSON.stringify(workShiftSelector.getWorkShifTypes())); */
    }

/*     _initValues = (curWorkShiftProps) => {
        let oCurProps = curWorkShiftProps;
        let oWorkShift = {...oCurProps};
        let oWorkShiftDay = {...oWorkShift.day};
        let oWorkShiftDefaultSetting = {...oWorkShift.defaultsetting};

        let oDailyPolicy = {...this.state._dailyPolicy};
        let oDefaultSetting = {...this.state._defaultSetting};

        let oCurtimePolicy = {...this.state._curTimePolicy};

        //Init Daily Time Setting
        Object.keys(oWorkShiftDay).map(function (storeDay) {
            let oStoreDay = {...oWorkShiftDay[storeDay]};

            Object.keys(oDailyPolicy).map(function (tempDay) {
                if (storeDay==tempDay){
                    oDailyPolicy[storeDay].timein = oStoreDay.timein;
                    oDailyPolicy[storeDay].timeout = oStoreDay.timeout;
                    oDailyPolicy[storeDay].dayoff = oStoreDay.dayoff;
                }
            })
        });

        //Init Default Setting
        oDefaultSetting.enabled = oWorkShiftDefaultSetting.enabled;
        oDefaultSetting.timein = oWorkShiftDefaultSetting.timein;
        oDefaultSetting.timeout = oWorkShiftDefaultSetting.timeout;

        oCurtimePolicy = oWorkShift;
        this.setState({
            _dailyPolicy: oDailyPolicy,
            _defaultSetting: oDefaultSetting,
            _curTimePolicy: oCurtimePolicy
        },
            () => {
                this._detectChanges();
            }
        )
    } */

    _saveAction = () => {
        let objLoginInfo = Object.assign({}, this.props.logininfo)
        let objActiveCompany = Object.assign({}, this.props.activecompany)
        this.props.dispatchFetchDataFromDB({
            strModule: 'WORKSHIFT',
            url: apiConfig.url + endPoints.workShift,
            strType: 'WORKSHIFT_UPDATE',
            input: {
                transtype: 'UPDATE',
                companyid: objActiveCompany.id,
                username: objLoginInfo.resUsername,
                defaultsetting: this.state._defaultSetting,
                day: this.state._dailyPolicy,
            }
        });
    }

    _undoAction = () => {
        this._initValues(this.props.workshift);
    }

    _setBottomBorder = (index) => {
        if(index==0){
            return({
                borderBottomWidth: 0.7,
                borderColor: '#D1D4D6'
            })
        }
    }

    _setDayOff = (strkey, value) => {
        let objPolicy = {...this.state._dailyPolicy};
        Object.keys(objPolicy).map(function (key) {
            if(key==strkey){
                objPolicy[key].dayoff = value;
            }
        })
        this.setState({
            _dailyPolicy: objPolicy
        },
            () => {this._detectChanges()}
        )
    }

    _activateDefaultTime = (value) => {
        if(value){
            this._triggerDefaultTime(true)
            this.setState({
                _resMsg: 'Daily Time Settings will be overriden. Are you sure you want to proceed?',
                _msgBoxShow: true,
                _msgBoxType: 'WARNING',
            },
                () => {
                    this._triggerDefaultTime(false);
                }
            )
        }
        else{
            this._triggerDefaultTime(false);
        }
    }

    _triggerDefaultTime = (value) => {
        let objDefaultSetting = {...this.state._defaultSetting};
        Object.keys(objDefaultSetting).map(function (key) {
            if(key=='enabled'){
                objDefaultSetting[key] = value;
            }
        })
        this.setState({
            _defaultSetting: objDefaultSetting
        },
            () => {
                this._detectChanges();
            }
        )
        
    }
    

    _showTimePicker = async(strKey, strType) => {
        if(!this.state._disabledMode){
            let defaultTime = '';
            if(strType == 'timeout'){
                defaultTime = 17
            }
            else{
                defaultTime = 8
            }
            try {
                const {action, hour, minute} =await TimePickerAndroid.open({
                    hour: defaultTime,
                    minute: 0,
                    is24Hour: false,
                    mode: 'spinner'
                });

                if (action !== TimePickerAndroid.dismissedAction) {
                this._setTime(strKey, strType, hour, minute);
                }
            } 
            
            catch ({code, message}) {
                console.warn('Cannot open time picker', message);
            }
        }
    }

    _setTime = (strKey, strType, hour, minute) => {
        let strTime = moment(hour +':' + minute, 'hh:mm').format('hh:mm A');

        if(strKey=='default'){
            let objDefaultSetting = {...this.state._defaultSetting};
            Object.keys(objDefaultSetting).map(function (key) {
                if(key==strType){
                    
                    objDefaultSetting[key] = strTime;
                }
            })
            this.setState({
                _defaultSetting: objDefaultSetting
            },
                () => {
                    this._setAllTime(strType, strTime);
                }
            )
        }
        else{
            let objPolicy = {...this.state._dailyPolicy};
            Object.keys(objPolicy).map(function (key) {
                if(key==strKey){
                    if(strType=='timein'){
                        objPolicy[key].timein = strTime;
                    }
                    else if(strType=='timeout'){
                        objPolicy[key].timeout = strTime;
                    }
                }
            })
            this.setState({
                _dailyPolicy: objPolicy
            },
                () => {this._detectChanges()}
            )
        }
    }

    _setAllTime = (strType, strTime) => {
        let objPolicy = {...this.state._dailyPolicy};
        Object.keys(objPolicy).map(function (key) {
            if(strType=='timein'){
                objPolicy[key].timein = strTime;
            }
            else if(strType=='timeout'){
                objPolicy[key].timeout = strTime;
            }
        })
        this.setState({
            _dailyPolicy: objPolicy
        },
            () => {this._detectChanges()}
        )
    }

    _overrideAllTime = () => {
        this._triggerDefaultTime(true);
        this._setAllTime('timein', this.state._defaultSetting.timein);
        this._setAllTime('timeout', this.state._defaultSetting.timeout);
    }

    _continueActionOnWarning = () => {
        this._closeMsgBox();
        this._overrideAllTime();
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false,
            _resMsg: ''
        });
    }

    _detectChanges = () => {
        let bChangeFlag = false;

        let oWorkShift = {...this.props.workshift};
        let oWorkShiftDay = {...oWorkShift.day};
        let oWorkShiftDefaultSetting = {...oWorkShift.defaultsetting};

        let oDailyPolicy = {...this.state._dailyPolicy};
        let oDefaultSetting = {...this.state._defaultSetting};

        //Init Daily Time Setting
        Object.keys(oWorkShiftDay).map(function (storeDay) {
            let oStoreDay = {...oWorkShiftDay[storeDay]};

            Object.keys(oDailyPolicy).map(function (tempDay) {
                if (storeDay==tempDay){
                    if(oDailyPolicy[storeDay].timein != oStoreDay.timein ||
                        oDailyPolicy[storeDay].timeout != oStoreDay.timeout ||
                        oDailyPolicy[storeDay].dayoff != oStoreDay.dayoff){
                            bChangeFlag = true;
                        }
                }
            })
        });

        //Init Default Setting
        if(oDefaultSetting.enabled != oWorkShiftDefaultSetting.enabled ||
            oDefaultSetting.timein != oWorkShiftDefaultSetting.timein ||
            oDefaultSetting.timeout != oWorkShiftDefaultSetting.timeout ){

            bChangeFlag = true;
        }

        this.setState({
            _changeDetected: bChangeFlag
        },
            () => {
                let objTest = {...this.props.workshift};
            }
        )
    }

    _deleteActiveWorkShift = () => {
        this.setState({
            _resMsg: 'Successfully deleted "Shift A" !',
            _msgBoxShow: true,
            _msgBoxType: 'SUCCESS'
        })
    }

    _setActiveWorkShiftType = (itemValue) => {
        console.log('itemValue: ' + itemValue);
        this.setState({
            _activeType: itemValue,
            _activeSchedule: workShiftSelector.getScheduleFromTypeID(itemValue)
        })
    }

    render(){
        //Loading View Status
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        //Floating Actions Buttons for A/D Work Shift Type
        const actionButton = 
            <ActionButton 
                buttonColor="#EEB843"
                spacing={10}
            >
                <ActionButton.Item buttonColor='#26A65B' title="ADD NEW WORK SHIFT" onPress={() => {}}>
                    <Icon2 name="bell-plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#4183D7' title="MODIFY CURRENT WORK SHIFT" onPress={() => {}}>
                    <Icon2 name="table-edit" color='#fff' size={22} style={styles.actionButtonIcon} />
                </ActionButton.Item>
                
                <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT WORK SHIFT" onPress={() => {this._deleteActiveWorkShift()}}>
                    <Icon2 name="delete-empty" color='#fff' size={22} style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>

        //Break Time Details
        const breakTimeDetails = 
            <View style={styles.containerPlaceholder}>
                <ScrollView horizontal={true}>
                    <View style={styles.breakCont}>
                        <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                            <View style={styles.breakNameCont}>
                                <Text style={styles.txtBreakName}>NAME</Text>
                            </View>
                            <View style={styles.breakDetailsCont}>
                                <Text style={styles.txtDefault}>TIME START</Text>
                            </View>
                            <View style={styles.breakDetailsCont}>
                                <Text style={styles.txtDefault}>TIME END</Text>
                            </View>
                            <View style={styles.breakDetailsCont}>
                                <Text style={styles.txtDefault}>DURATION</Text>
                            </View>
                            <View style={styles.breakDetailsCont}>
                                <Text style={styles.txtDefault}>REMOVE</Text>
                            </View>
                        </View>

                        {
                            this.state._data.map((oBreakTime, index) => (
                                <TouchableNativeFeedback
                                    key={index}
                                    onPress={() => {
                                        this._openUpdateForm(oBreakTime)
                                    }}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.breakTimeDetailsCont}>
                                        <View style={styles.breakNameCont}>
                                            <Text style={styles.txtBreakName}>{oBreakTime.name}</Text>
                                        </View>
                                        <View style={styles.breakDetailsCont}>
                                            <Text style={styles.txtDefaultTime}>{oBreakTime.timestart}</Text>
                                        </View>
                                        <View style={styles.breakDetailsCont}>
                                            <Text style={styles.txtDefaultTime}>{oBreakTime.timeend}</Text>
                                        </View>
                                        <View style={styles.breakDetailsCont}>
                                            <Text style={styles.txtDefault}>{oBreakTime.duration}</Text>
                                        </View>
                                        <View style={styles.breakDetailsCont}>
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => {this._deleteBreakTime(oBreakTime, index)}}
                                                >
                                                <Icon size={30} name='md-close-circle' color='#EEB843' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>

        //
        let iBorderCounter = -1;

        if(pProgress==0){
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state._refreshing}
                            onRefresh={() => this.props.triggerRefresh(true)}
                        />
                        }
                >
                    <PromptError title={pMessage}/>
                </ScrollView>
            );
        }
        else if(pProgress==2){
            return (
                <PromptLoading title={pMessage}/>
            );
        }

        else{
            const oDailyPolicy = {...this.state._activeSchedule.day};
            return(
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={() => this.props.triggerRefresh(true)}
                            />
                        }>
                        <CustomCard 
                            title={title_WorkShift}
                            oType='PICKER'
                            oPicker={
                                <View style={styles.effectivityOptionCont}>
                                    <Picker
                                        mode='dropdown'
                                        style={styles.effectiveDatePickerStyle}
                                        selectedValue={this.state._activeType}
                                        onValueChange={(itemValue, itemIndex) => {this._setActiveWorkShiftType(itemValue)}}>
                                        {
                                            this.state._curWorkShiftObj.schedule.map((oSchedule, index) => (
                                                <Picker.Item key={index} label={oSchedule.description} value={oSchedule.id}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                            }
                        >

                            <View style={styles.tableCont}>
                                <View style={styles.categoryCont}>
                                    {
                                        category.map((info, index) => (
                                            <View key={index} style={[styles.categoryPlaceholder, this._setBottomBorder(index)]}>
                                                <Text style={styles.txtVerticalHeader}>{info}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                                
                                <View style={styles.detailsCont}>
                                    <ScrollView horizontal={true}>
                                        {
                                            
                                            Object.keys(oDailyPolicy).map(key => (
                                                <View key={key} style={styles.dailyCont}>
                                                    <View style={[styles.dailyPlaceholder, this._setBottomBorder(0)]}>
                                                        {/* <Text style={styles.txtHorizontalHeader}>{oDailyPolicy[key].header}</Text> */}
                                                        <Text style={styles.txtHorizontalHeader}>OG-BE</Text>
                                                    </View>
                                                    <View style={styles.dailyPlaceholder}>
                                                        <CheckBox
                                                            disabled={this.state._disabledMode}
                                                            onValueChange={ (value) => {this._setDayOff(key, value)}} 
                                                            value={oDailyPolicy[key].dayoff}
                                                        />
                                                    </View>
                                                    <View style={styles.dailyPlaceholder}>
                                                        <Text 

                                                            disabled={oDailyPolicy[key].dayoff} 
                                                            onPress={() => {
                                                                !this.state._defaultSetting.enabled ? 
                                                                    this._showTimePicker(key, 'timein') : 
                                                                    null
                                                            }} 
                                                            style={styles.txtContent}>
                                                            
                                                            {oDailyPolicy[key].timein ? oDailyPolicy[key].timein.toUpperCase() : null}

                                                        </Text>
                                                        
                                                    </View>
                                                    <View style={styles.dailyPlaceholder}>

                                                    <Text 
                                                        disabled={oDailyPolicy[key].dayoff} 
                                                        onPress={() => {
                                                            !this.state._defaultSetting.enabled ? 
                                                                this._showTimePicker(key, 'timeout') :
                                                                null
                                                        }}
                                                        style={styles.txtContent}>
                                                        
                                                        {oDailyPolicy[key].timeout ? oDailyPolicy[key].timeout.toUpperCase() : null}

                                                    </Text>

                                                    </View>
                                                </View>
                                            )) 
                                        }
                                    </ScrollView>
                                    
                                </View>
                            </View>
                            
                            { 
                                !this.state._disabledMode ?
                                    <View style={styles.defaultTimeCont}>
                                        <View style={styles.defaultTimeCheckbox}>
                                            <CheckBox
                                                onValueChange={ (value) => {this._activateDefaultTime(value)}} 
                                                value={this.state._defaultSetting.enabled}
                                            />
                                            <Text style={styles.txtDefaultTimeMsg}>
                                                {description_DefaultTime}
                                            </Text>
                                        </View>
                                            <View style={styles.defaultTimePlaceholder}>
                                                <View style={styles.defaultTimeRow}>
                                                    <View style={styles.defaultTimeLeft}>
                                                        <Text style={styles.txtDefaultTimeMsg}>TIME-IN</Text>
                                                    </View>
                                                    <View style={styles.defaultTimeRight}>
                                                        <Text 
                                                            onPress={() => this._showTimePicker('default', 'timein')} 
                                                            style={styles.txtContent}>
                                                            
                                                            {this.state._defaultSetting.timein ? this.state._defaultSetting.timein.toUpperCase() : null}

                                                        </Text>
                                                    </View>
                                                </View>
                                                <View style={styles.defaultTimeRow}>
                                                    <View style={styles.defaultTimeLeft}>
                                                        <Text style={styles.txtDefaultTimeMsg}>TIME-OUT</Text>
                                                    </View>
                                                    <View style={styles.defaultTimeRight}>
                                                        <Text 
                                                            onPress={() => this._showTimePicker('default', 'timeout')} 
                                                            style={styles.txtContent}>
                                                            
                                                            {this.state._defaultSetting.timeout ? this.state._defaultSetting.timeout.toUpperCase() : null}
                                                            
                                                        </Text>
                                                    </View>
                                                </View>
                                                    
                                            </View>
                                        
                                    </View>
                                : null
                            }


{/*                             <View style={styles.childPropGroupCont}>
                                <View style={styles.childGroupTitleCont}>
                                    <Text style={styles.txtChildGroupTitle}>
                                        Work Shift Effectivity
                                    </Text>
                                </View>
                                <View style={styles.childContentCont}>
                                    <View style={styles.childPropCont}>
                                        <View style={styles.childPropNameCont}>
                                            <Text style={styles.txtChildStyle}>
                                            VALID FROM
                                            </Text>
                                        </View>
                                        <View style={styles.childPropValueCont}>
                                            <View style={styles.datePickerCont}>
                                                <Text numberOfLines={1} style={styles.txtChildStyle}>
                                                    (WED) FEB 10, 2017
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.childPropCont}>
                                        <View style={styles.childPropNameCont}>
                                            <Text style={styles.txtChildStyle}>
                                            VALID UNTIL
                                            </Text>
                                        </View>
                                        <View style={styles.childPropValueCont}>
                                            <View style={styles.datePickerCont}>
                                                <Text numberOfLines={1} style={styles.txtChildStyle}>
                                                    UNTIL CHANGED
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View> */}
                        </CustomCard>

                        <CustomCard 
                            title={title_BreakTime} 
                            headerBackground={'transparent'}
                            description={description_BreakTime} 
                            oType='Switch'
                            oSwitch={
                                <Switch
                                    disabled={this.state._disabledMode}
                                    onValueChange={ (value) => this.setState({_isBreaktimeEnabled: value})} 
                                    onTintColor={color_SwitchOn}
                                    thumbTintColor={color_SwitchThumb}
                                    tintColor={color_SwitchOff}
                                    value={ this.state._isBreaktimeEnabled } 
                                />
                            }
                        >
                            {
                                this.state._isBreaktimeEnabled ? breakTimeDetails : null
                            }      
                        </CustomCard>
                        
                    </ScrollView>
                    <MessageBox
                        promptType={this.state._msgBoxType}
                        show={this.state._msgBoxShow}
                        onClose={this._closeMsgBox}
                        onWarningContinue={this._continueActionOnWarning}
                        message={this.state._resMsg}
                    />
                    {actionButton}
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        companyWorkShift: state.companyPoliciesReducer.workshift
    }
}

function mapDispatchToProps (dispatch) {
    
    return {
        dispatchFetchDataFromDB: (objData) => {
            dispatch(FetchDataFromDB(objData))
        },
        dispatchResetResponse: (response) => {
            dispatch(UpdateWorkShift(response))
        },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkShift)