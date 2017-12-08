import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    ScrollView,
    CheckBox,
    TimePickerAndroid,
    Switch,
    RefreshControl,
    Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";
import _ from 'lodash';

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

import {UpdateWorkShift} from '../../../actions/companyPolicies';

const title_WorkShift = 'Set the Company’s Default Work Shift';
const category = ['', 'DAY OFF', 'TIME-IN', 'TIME-OUT'];
const description_DefaultTime = 'The same Time-in and Time-out';

export class WorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            _language: '',
            _curTimePolicy: null,
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
        this._initValues(this.props.workshift);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.state._curTimePolicy) !== 
            JSON.stringify(nextProps.workshift)){
            console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
            console.log('I ENTERED componentWillReceiveProps');
            this._initValues(nextProps.workshift);
        }

        let oRes = {...nextProps.updateresponse};
        if(oRes.flagno!= -1 && oRes!=null){
            let oResponse = {...nextProps.updateresponse};
            let strMsgType = '';
            switch(oResponse.flagno){
                case '0':
                    strMsgType='error';
                    break;
                case '1':
                    this.props.triggerRefresh(true);
                    strMsgType='success';
                    break;
                case '2':
                    strMsgType='warning'
                    break;
            }
            
            this.setState({
                _msgBoxType: strMsgType,
                _msgBoxShow: true,
                _resMsg: oRes.message
            },
                () => {
                    this.props.dispatchResetResponse({
                        flagno: -1
                    })
                }
            )
        }
    }

    _initValues = (curWorkShiftProps) => {
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
    }

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
            
            } catch ({code, message}) {
                console.warn('Cannot open time picker', message);
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

    render(){
        const oDailyPolicy = this.state._dailyPolicy;
        let iBorderCounter = -1;

        if(this.props.workShifthasErrored){
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state._refreshing}
                            onRefresh={() => this.props.triggerRefresh(true)}
                        />
                        }
                >
                    <PromptError title='An error has occured. Pull down to refresh.'/>
                </ScrollView>
            );
        }
        else if(this.props.workShiftLoading){
            return (
                <PromptLoading title='Loading...'/>
            );
        }

        else{
            return(
                <View style={styles.container}>
                    {this.state._changeDetected ? <SavePrompt undoAction={this._undoAction} saveAction={this._saveAction}/> : null}
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={() => this.props.triggerRefresh(true)}
                            />
                        }
                    >
                        <CustomCard 
                            title={title_WorkShift} 
                            oType='PICKER'
                            oPicker={
                                <View style={[styles.propContChild, styles.adjustChildProp]}>
                                    <Picker
                                        mode='dropdown'
                                        style={styles.pickerStyle}
                                        selectedValue={this.state.language}
                                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                                        <Picker.Item label="Java" value="java" />
                                        <Picker.Item label="JavaScript" value="js" />
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
                                                        <Text style={styles.txtHorizontalHeader}>{oDailyPolicy[key].header}</Text>
                                                    </View>
                                                    <View style={styles.dailyPlaceholder}>
                                                        <CheckBox
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
                                {!this.state._defaultSetting.enabled ? null :
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
                                }
                            </View>
                        </CustomCard>
                        
                    </ScrollView>
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
        workShifthasErrored: state.WorkShiftHasErrored,
        workShiftLoading: state.WorkShiftIsLoading,
        workshift: state.GetWorkShift,
        dataactiontrigger: state.dataActionTriggerReducer.dataactiontrigger,
        updateresponse: state.UpdateWorkShift
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