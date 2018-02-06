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
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import _ from 'lodash';
import ActionButton from 'react-native-action-button';

import styles from '../styles';
import CustomCard from '../../../components/CustomCards';
import MessageBox from '../../../components/MessageBox';
import SavePrompt from '../../../components/SavePrompt';
import apiConfig, {endPoints} from '../../../services/api/config';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import FormBreakTime from '../Forms/formBreakTime';

//Helper
import * as oHelper from '../../../helper';

//api
import * as workshiftApi from '../data/workshift/api';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workShiftSelector from '../data/workshift/selector';
import {UpdateWorkShift} from '../../../actions/companyPolicies';
import * as workshiftActions from '../data/workshift/actions';

//Constants
import {CONSTANTS} from '../../../constants';

const category = ['', 'DAY OFF', 'TIME-IN', 'TIME-OUT'];
const description_DefaultTime = 'The same Time-in and Time-out';

const title_BreakTime = 'Break Time';
const description_BreakTime = 'Allow break time';
const color_SwitchOn='#838383';
const color_SwitchOff='#D1D4D6';
const color_SwitchThumb='#EEB843';
const status_loading = [2, 'Loading...'];
const status_success = [1, ''];
const save_loading_message = 'Saving new Work Shift. Please wait...';

export class WorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            _activeRequest: '',
            _activeBreakTimeIndex: '',
            _loadedStatus: '',
            _bNoWorkShift: false,
            _status: CONSTANTS.STATUS.LOADING,
            _disabledMode: true,
            _activeSchedule: null,
            _activeType: '',
            _curWorkShiftObj: {},
            _isBreaktimeEnabled: true,
            _showBreakTimeForm: false,
            _activeBreakTime: {
                id: '', 
                name: '',
                timestart: '12:00 PM',
                timeend: '01:00 PM',
                duration: '1hour 0min'
            },
            _defaultBreakTime: {
                id: '', 
                name: '',
                timestart: '12:00 PM',
                timeend: '01:00 PM',
                duration: '1hour 0min'
            },
            _iBreakTimeIDGenerator: 0,
            _defaultSchedule: {
                id: '',
                description: '',
                defaultactive: true,
                defaultsetting: { 
                    enabled: false, 
                    timein: '00:00 AM', 
                    timeout: '00:00 AM' 
                },
                day:
                    { 
                        sunday:{ 
                            dayoff: true,
                            header: 'S',
                            timein: '01:00 am',
                            timeout: '12:00 Pm' 
                        },
                        monday:{ 
                            dayoff: false,
                            header: 'M',
                            timein: '9:00 am',
                            timeout: '6:00 am' 
                        },
                        tuesday:{ 
                            dayoff: false,
                            header: 'T',
                            timein: '9:00 am',
                            timeout: '6:00 am' 
                        },
                        wednesday:{ 
                            dayoff: false,
                            header: 'W',
                            timein: '9:00 am',
                            timeout: '6:00 am' 
                        },
                        thursday:{ 
                            dayoff: false,
                            header: 'T',
                            timein: '9:00 am',
                            timeout: '6:00 am' 
                        },
                        friday:{ 
                            dayoff: false,
                            header: 'F',
                            timein: '9:00 am',
                            timeout: '6:00 am'
                        },
                        saturday:{ 
                            dayoff: false,
                            header: 'S',
                            timein: '9:00 am',
                            timeout: '6:00 am' 
                        } 
                    },
                enablebreaktime: false,
                breaktime: [],
            },
            
            //Custom MessageBox
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Screen Overlay Message
            _promptMsg: '',
            _promptShow: false,

            _refreshing: false
        }

        this._continueActionOnWarning = this._continueActionOnWarning.bind(this);
        this._closeMsgBox = this._closeMsgBox.bind(this);
        this._onBreakTimeFormClose = this._onBreakTimeFormClose.bind(this);
        this._onBreakTimeUpdate = this._onBreakTimeUpdate.bind(this);
    }

    componentWillMount(){
        console.log('+++++++++++++++++++++++++++++++++++++this.props.workshift: ' + JSON.stringify(this.props.workshift));
    }

    componentWillUnmount(){
        this.props.actions.workshift.setActiveRule('')
    }

    componentDidMount(){
        if(this.props.workshift.data){
            this._initValues();
            this.setState({_status: [1,'']})
        }
        else{
            console.log('componentDidMount==_getDataFromDB');
            this._getDataFromDB();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('####################################################################################')
        console.log('##########################this.props.workshift.data: ' + JSON.stringify(this.props.workshift.data));
        console.log('##########################nextProps.workshift.data: ' + JSON.stringify(nextProps.workshift.data));
        if(this.state._status[0] != nextProps.workshift.status[0]){
                this.setState({ _status: nextProps.workshift.status })
        }

        if(
            (JSON.stringify(this.state._curWorkShiftObj) !== JSON.stringify(nextProps.workshift.data)) &&
            (nextProps.workshift.status[0] == 1)
        ){
            this._initValues();
        }

        if(
            (this.state._activeType !== nextProps.workshift.activeRule) &&
            (this.state._status[0] == 1)
        ){
            this._updateActiveRule(nextProps.workshift.activeRule);
        }

    }

    _getDataFromDB = () => {
        this.props.actions.workshift.get({...this._requiredInputs(), transtype:'get'});
    }

    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            accesstoken: '',
            clientid: ''
        })
    }

    _initValues = () => {
        try{
            let bNoWorkShift = false;
            let oWorkShift = {...workShiftSelector.getWorkShiftObject()};
            let oDefaultSchedule = this.props.workshift.activeRule == '' ||  isNaN(this.props.workshift.activeRule) ?
                workShiftSelector.getDefaultActiveSchedule() : workShiftSelector.getScheduleFromTypeID(this.props.workshift.activeRule)
            if(Object.keys(oDefaultSchedule).length === 0){
                oDefaultSchedule = JSON.parse(JSON.stringify(this.state._defaultSchedule));
                bNoWorkShift = true;
            }

            //Initialize component values
            this.setState({
                _curWorkShiftObj: oWorkShift,
                _activeSchedule: oDefaultSchedule,
                _activeType:  oDefaultSchedule.id,
                _bNoWorkShift: bNoWorkShift,
                _disabledMode: !bNoWorkShift,
            }); 

            //Initialize Active Rule
            this.props.actions.workshift.setActiveRule(oDefaultSchedule.id);
        }
        catch(exception){
            this.setState({_status: [0,CONSTANTS.ERROR.SERVER]})
            this.props.actions.workshift.updateStatus([0,CONSTANTS.ERROR.SERVER]);
            console.log('exception:' + exception.message);
        }
    }

    _updateActiveRule = (iActiveRule) => {
        let oNewActive = workShiftSelector.getScheduleFromTypeID(iActiveRule);
        this.setState({
            _activeType: oNewActive.id,
            _activeSchedule: oNewActive
        })
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
        let activeSchedule = {...this.state._activeSchedule};
        let oDay = {...activeSchedule.day}
        Object.keys(oDay).map(function (key) {
            if(key==strkey){
                oDay[key].dayoff = value;
            }
        })

        this.setState({
            _activeSchedule: activeSchedule
        });
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
        
        let activeSchedule = {...this.state._activeSchedule};
        let oDefaultSetting = {...activeSchedule.defaultsetting};
        Object.keys(oDefaultSetting).map(function (key) {
            if(key=='enabled'){
                oDefaultSetting[key] = value;
            }
        })

        activeSchedule.defaultsetting = oDefaultSetting;

        this.setState({
            _activeSchedule: activeSchedule
        })
        
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
        let oActiveSchedule = {...this.state._activeSchedule};

        if(strKey=='default'){
            let oDefaultSetting = {...oActiveSchedule.defaultsetting};
            Object.keys(oDefaultSetting).map(function (key) {
                if(key==strType){
                    oDefaultSetting[key] = strTime;
                }
            }); 

            oActiveSchedule.defaultsetting = oDefaultSetting;

            this.setState({
                _activeSchedule: oActiveSchedule
            },
                () => {
                    this._setAllTime(strType, strTime);
                }
            )
        }
        else{
            let oDay = {...oActiveSchedule.day};
            Object.keys(oDay).map(function (key) {
                if(key==strKey){
                    if(strType=='timein'){
                        oDay[key].timein = strTime;
                    }
                    else if(strType=='timeout'){
                        oDay[key].timeout = strTime;
                    }
                }
            })

            oActiveSchedule.day = oDay;
            
            this.setState({
                _activeSchedule: oActiveSchedule
            })
        }
    }

    _setAllTime = (strType, strTime) => {
        let activeSchedule = {...this.state._activeSchedule};
        let oDay = {...activeSchedule.day};
        Object.keys(oDay).map(function (key) {
            if(strType=='timein'){
                oDay[key].timein = strTime;
            }
            else if(strType=='timeout'){
                oDay[key].timeout = strTime;
            }
        })

        activeSchedule.day = oDay;

        this.setState({
            _activeSchedule: activeSchedule
        })
    }

    _overrideAllTime = () => {
        this._setAllTime('timein', this.state._activeSchedule.defaultsetting.timein);
        this._setAllTime('timeout', this.state._activeSchedule.defaultsetting.timeout);
        this._triggerDefaultTime(true);
    }

    _enableBreakTime = (value) => {
        let oActiveSchedule = {...this.state._activeSchedule};
        oActiveSchedule.enablebreaktime = value;
        this.setState({
            _activeSchedule: oActiveSchedule
        })
    }

    _continueActionOnWarning = () => {
        this._closeMsgBox();
        if(this.state._activeRequest == 'DELETE-ACTIVE-SCHEDULE'){
            this._deleteActiveWorkShift();
        }
        else if(this.state._activeRequest == 'DELETE-BREAKTIME'){
            this._deleteBreakTime(this.state._activeBreakTimeIndex);
        }
        else{
            this._overrideAllTime();
        }
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false,
            _resMsg: '',
            _activeRequest: '',
            _activeBreakTimeIndex: ''
        });
    }

    _setActiveWorkShiftType = (itemValue) => {
        this.props.actions.workshift.setActiveRule(itemValue);
    }

    _addNewWorkShift = () => {
        let oDefaultSetting = workShiftSelector.getDefaultSchedule();
        this.setState({
            _disabledMode: false,
            _activeSchedule: JSON.parse(JSON.stringify(this.state._defaultSchedule))
        })
    }

    _cancelEdit = () => {
        this._initValues();
        this.setState({
            _disabledMode: true
        })
    }

    _saveWorkShift = () => {
        if(!oHelper.isStringEmptyOrSpace(this.state._activeSchedule.description)){
            this.setState({
                _promptMsg: save_loading_message,
                _promptShow: true
            })
            const oInput = {
                companyid: this.props.activecompany.id,
                username: this.props.logininfo.resUsername,
                transtype: 'insert',
                accesstoken: '',
                clientid: '',
                schedule: this.state._activeSchedule
            };

            workshiftApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('SAVE_RES: ' + JSON.stringify(res));
                this.setState({
                    _promptShow: false
                });
                if(res.flagno==0){
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'error-ok',
                        _resMsg: res.message
                    });
                }
                else if(res.flagno==1){
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'success',
                        _resMsg: res.message,
                        _bNoWorkShift: false
                    },
                        this._getDataFromDB()
                    )
                }
            })
            .catch((exception) => {
                this.setState({
                    _promptShow: false,
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: exception.message
                })
            });
        }
        else{
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: 'Unable to save. Please input Shift Name.'
            });
        }
    }

    _deleteActiveWorkShiftRequest = () => {
        this.setState({
            _msgBoxShow: true,
            _msgBoxType: 'warning',
            _resMsg: 'This will permanently delete work shift "' + this.state._activeSchedule.description + '". Press continue to proceed.',
            _activeRequest: 'DELETE-ACTIVE-SCHEDULE'
        });
    }

    _deleteActiveWorkShift = () => {
        this.setState({
            _promptMsg: 'Deleting workshift ' + this.state._activeSchedule.description + '. Please wait...',
            _promptShow: true
        });

        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'delete',
            accesstoken: '',
            clientid: '',
            schedid: this.state._activeSchedule.id
        };

        workshiftApi.remove(oInput)
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                _promptShow: false
            });
            if(res.flagno==0){
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: res.message
                });
            }else if(res.flagno==1){
                this.props.actions.workshift.setActiveRule('');
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'success',
                    _resMsg: res.message
                },
                    this._getDataFromDB()
                )
            }
            
            
        })
        .catch((exception) => {
            this.setState({
                _promptShow: false
            })
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: exception.message
            });
        });
    }

    _openUpdateBreakTimeForm = (oBreakTime) => {
        let oActiveBreakTime = {...oBreakTime};
        if(oActiveBreakTime.id == ''){
            this.setState({
                _iBreakTimeIDGenerator: this.state._iBreakTimeIDGenerator - 1,
            },
                () => {
                    oActiveBreakTime.id = this.state._iBreakTimeIDGenerator;
                }
            )
            
        }
        else{
            oActiveBreakTime.id = oBreakTime.id;
        }
        
        oActiveBreakTime.name = oBreakTime.name;
        oActiveBreakTime.timestart = oBreakTime.timestart;
        oActiveBreakTime.timeend = oBreakTime.timeend;

        this.setState({
            _activeBreakTime: oActiveBreakTime,
        },
            () => {
                this.setState({
                    _showBreakTimeForm: true
                })
            }
        )
    }

    _onBreakTimeFormClose = () => {
        this.setState({
            _showBreakTimeForm: false
        })
    }
    
    _onBreakTimeUpdate = (oActiveBreakTime) => {
        this._onBreakTimeFormClose();
        let oActiveSchedule = {...this.state._activeSchedule};
        let oBreakTime = [...oActiveSchedule.breaktime];

        let bExist = oActiveSchedule.breaktime.find( breakTime => breakTime['id'] == oActiveBreakTime.id);
        if(!bExist){
            oBreakTime.push(oActiveBreakTime)
        }

        else{
            oBreakTime.map((oBreak, index) => {
                if(oBreak.id==oActiveBreakTime.id){
                    oBreakTime[index] = oActiveBreakTime;
                }
            })
        }
        
        oActiveSchedule.breaktime = oBreakTime;

        this.setState({
            _activeSchedule: oActiveSchedule
        })
    }
/*     _requestDeleteBreakTime = () => {
        this.setState({
            _msgBoxType: 'warning',
            _resMsg: 'This will permanently delete '
            _msgBoxShow: true,
        })
    } */
    _deleteBreakTimeRequest = (oBreakTime, index) => {
        this.setState({
            _msgBoxShow: true,
            _msgBoxType: 'warning',
            _resMsg: 'This will permanently delete the break time named "' + oBreakTime.name + '". Press continue to proceed.',
            _activeRequest: 'DELETE-BREAKTIME',
            _activeBreakTimeIndex: index
        });
    }

    _deleteBreakTime = (index) => {
        let oActiveSchedule = {...this.state._activeSchedule};
        let oActiveBreakTime = [...this.state._activeSchedule.breaktime];

        oActiveBreakTime.splice(index, 1);

        oActiveSchedule.breaktime = oActiveBreakTime;

        this.setState({
            _activeSchedule: oActiveSchedule
        });
    }

    _setScheduleName = (value) => {
        let oActiveSchedule = {...this.state._activeSchedule};
        oActiveSchedule.description = value;

        this.setState({
            _activeSchedule: oActiveSchedule
        })
    }

    
 
    render(){
        console.log('xxxxxxxxxxxxx______REDERING WORKSHIFT');
        console.log('this.state._status: ' + this.state._status);
        //Loading View Status
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Work Shift Policy' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress==1){
            let oDailyPolicy = {...this.state._activeSchedule.day};
            let oRightOption;
            let oRightOptionType;
            let strTitle;
            if(this.state._disabledMode){
                oRightOption = (
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
                );
                oRightOptionType = 'PICKER';
                strTitle = 'Work Shift Schedule';
            }
            else{
                oRightOption = (
                    <View style={styles.btnRightCont}>
                        {!this.state._bNoWorkShift ?
                            <TouchableOpacity 
                                disabled={false}
                                style={styles.btnCancel}
                                activeOpacity={0.6}
                                onPress={() => {this._cancelEdit()}}>
                                <Text style={styles.txtBtn}>CANCEL</Text>
                            </TouchableOpacity>
                            : null
                        }
                        <View style={{width: 10}}></View>
                        <TouchableOpacity 
                            disabled={this.state._disableBtn}
                            style={styles.btnSave}
                            activeOpacity={0.6}
                            onPress={() => {this._saveWorkShift()}}>
                            <Text style={styles.txtBtn}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                );
                oRightOptionType = 'BUTTON';
                strTitle = 'Add New WorkShift';
            }

            //Floating Actions Buttons for A/D Work Shift Type
            const actionButton = 
                <ActionButton
                    shadowStyle={{elevation: 30}}
                    buttonColor="#EEB843"
                    spacing={10}
                >
                    <ActionButton.Item buttonColor='#26A65B' title="ADD NEW WORK SHIFT" onPress={() => {this._addNewWorkShift()}}>
                        <Icon2 name="bell-plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                    </ActionButton.Item>
    {/*                 <ActionButton.Item buttonColor='#4183D7' title="MODIFY CURRENT WORK SHIFT" onPress={() => {}}>
                        <Icon2 name="table-edit" color='#fff' size={22} style={styles.actionButtonIcon} />
                    </ActionButton.Item> */}
                    
                    <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT WORK SHIFT" onPress={() => {this._deleteActiveWorkShiftRequest()}}>
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
                                { 
                                    !this.state._disabledMode ?
                                        <View style={styles.breakDetailsCont}>
                                            <Text style={styles.txtDefault}>REMOVE</Text>
                                        </View>
                                    :null
                                }
                                    
                            </View>
                            
                            {
                                this.state._activeSchedule.breaktime.map((oBreakTime, index) => (
                                    <TouchableNativeFeedback
                                        key={index}
                                        onPress={() => {
                                            this._openUpdateBreakTimeForm(oBreakTime)
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
                                            { 
                                                !this.state._disabledMode ?
                                                    <View style={styles.breakDetailsCont}>
                                                        <TouchableOpacity
                                                            activeOpacity={0.7}
                                                            onPress={() => {this._deleteBreakTimeRequest(oBreakTime, index)}}
                                                            >
                                                            <Icon size={30} name='md-close-circle' color='#EEB843' />
                                                        </TouchableOpacity>
                                                    </View>
                                                : null
                                            }
                                        </View>
                                    </TouchableNativeFeedback>
                                ))
                            }
                            { 
                                !this.state._disabledMode ?
                                    <View style={styles.breakTimeDetailsCont}>
                                        <View style={styles.breakNameCont}>
                                            <TouchableOpacity
                                                style={{paddingLeft: 30, paddingTop: 10}}
                                                activeOpacity={0.7}
                                                onPress={() => {this._openUpdateBreakTimeForm(JSON.parse(JSON.stringify(this.state._defaultBreakTime)))}}
                                                >
                                                <Icon size={30} name='md-add' color='#EEB843' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                : null
                            }

                        </View>
                    </ScrollView>
                </View>

            return(
                <View style={styles.container}>
                    { this.state._promptShow ?
                        <PromptScreen.PromptGeneric show= {this.state._promptShow} title={this.state._promptMsg}/>
                        : null
                    }

                    { !this.state._disabledMode ?
                        <FormBreakTime 
                            data={this.state._activeBreakTime}
                            title={'ADD A BREAK TIME'}
                            show={this.state._showBreakTimeForm}
                            onFormClose={this._onBreakTimeFormClose}
                            onDone={this._onBreakTimeUpdate}/>
                        : null
                    }

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={this._getDataFromDB}
                            />
                        }>
                        <CustomCard 
                            title={strTitle}
                            oType={oRightOptionType}
                            rightHeader={oRightOption}
                        >
                            {
                                !this.state._disabledMode ? 
                                    <View style={[styles.childPropCont, {paddingTop: -20, paddingBottom: 20, borderColor: '#D1D4D6', borderBottomWidth: 0.7}]}>
                                        <View style={styles.childPropNameCont}>
                                            <Text style={[styles.txtChildStyle, {paddingLeft: 20,}]}>
                                                Work Shift Name
                                            </Text>
                                        </View>
                                        <View style={styles.childPropValueCont}>
                                            <View style={styles.datePickerCont}>
                                                <TextInput 
                                                    placeholder='Shift Name'
                                                    style={{width: '90%', height: '100%'}}
                                                    onChangeText={_curUsername => {this._setScheduleName(_curUsername)}}
                                                    value={this.state._activeSchedule.description}
                                                    returnKeyType="done"
                                                    underlineColorAndroid='transparent'
                                                />
                                                {/* <Text numberOfLines={1} style={styles.txtChildStyle}>
                                                    1 Hour
                                                </Text> */}
                                            </View>
                                        </View>
                                    </View>
                                : null
                            }

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
                                                        <Text style={styles.txtHorizontalHeader}>{oDailyPolicy[key].header}</Text>
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
                                                            onPress={() => {this._showTimePicker(key, 'timein')}}
                                                            style={styles.txtContent}>
                                                            
                                                            {oDailyPolicy[key].timein ? oDailyPolicy[key].timein.toUpperCase() : null}

                                                        </Text>
                                                        
                                                    </View>
                                                    <View style={styles.dailyPlaceholder}>

                                                    <Text 
                                                        disabled={oDailyPolicy[key].dayoff} 
                                                        onPress={() => {this._showTimePicker(key, 'timeout')}}
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
                                                value={this.state._activeSchedule.defaultsetting.enabled}
                                            />
                                            <Text style={styles.txtDefaultTimeMsg}>
                                                {description_DefaultTime}
                                            </Text>
                                        </View>
                                        {
                                            this.state._activeSchedule.defaultsetting.enabled ?
                                                <View style={styles.defaultTimePlaceholder}>
                                                    <View style={styles.defaultTimeRow}>
                                                        <View style={styles.defaultTimeLeft}>
                                                            <Text style={styles.txtDefaultTimeMsg}>TIME-IN</Text>
                                                        </View>
                                                        <View style={styles.defaultTimeRight}>
                                                            <Text 
                                                                onPress={() => this._showTimePicker('default', 'timein')} 
                                                                style={styles.txtContent}>
                                                                
                                                                {this.state._activeSchedule.defaultsetting.timein ? this.state._activeSchedule.defaultsetting.timein.toUpperCase() : null}

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
                                                                
                                                                {this.state._activeSchedule.defaultsetting.timeout ? this.state._activeSchedule.defaultsetting.timeout.toUpperCase() : null}
                                                                
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            : null
                                        }
                                    </View>
                                : null
                            }

                        </CustomCard>

                        <CustomCard 
                            title={title_BreakTime} 
                            headerBackground={'transparent'}
                            description={description_BreakTime} 
                            oType='Switch'
                            rightHeader={
                                <Switch
                                    disabled={this.state._disabledMode}
                                    onValueChange={ (value) => {this._enableBreakTime(value)}} 
                                    onTintColor={color_SwitchOn}
                                    thumbTintColor={color_SwitchThumb}
                                    tintColor={color_SwitchOff}
                                    value={ this.state._activeSchedule.enablebreaktime} 
                                />
                            }
                        >
                            {
                                this.state._activeSchedule.enablebreaktime ? breakTimeDetails : null
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
                    {this.state._disabledMode ? actionButton : null}
                </View>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        workshift: state.companyPoliciesReducer.workshift
    }
}

function mapDispatchToProps (dispatch) {
    
    return {
        dispatchFetchDataFromDB: (objData) => {
            dispatch(FetchDataFromDB(objData))
        },

        actions: {
            workshift: bindActionCreators(workshiftActions, dispatch),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkShift)