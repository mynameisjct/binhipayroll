import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    TimePickerAndroid,
    ScrollView,
    TextInput,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from '../styles'

//Redux
import { connect } from 'react-redux';
import * as tardinessSelector from '../data/tardiness/selector';
import * as tardinessActions from '../data/tardiness/actions';
import { bindActionCreators } from 'redux';

//API
import * as tardinessApi from '../data/tardiness/api';

//Custom Components
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import CustomCard, 
{
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

//Helper
import * as oHelper from '../../../helper';

//Constants
import {CONSTANTS} from '../../../constants';

const description_Tardiness = 'Set Tardiness Rules';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';
const cl_suspension = '2001';
const cl_deduction = '2002';
const save_loading_message = 'Saving new Tardiness Policy. Please wait...';
const switch_loading_message = 'Switching Tardiness Policy. Please wait...';
const delete_loading_message = 'Deleting Active Rule. Please wait...';

const tardiness_disabled = "Disabled — when Tardiness is disabled, the system will NOT impose any " +
"penalty or pay deductions on employees who clock in after their scheduled time-in."

const tardiness_enabled = "Enabled — when Tardiness is enabled, the system will impose " +
"predefined penalties on employees who clock in after their scheduled time-in. " + 
"Employer can add Rules and set Grace Periods and Penalties."

export class Tardiness extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Gereric States
            _refreshing: false,
            _disabledMode: true,
            _status: [2, 'Loading...'],
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Penalty
            _suspensionOptions: [
                'from the end of the grace period',
                'from the beginning of the shift'
            ],
            _maxallowedtardiness: '6',
            _frombegintime: 1,

            //Local States
            _activeTardiness:{
                id: "0001",
                name: "Default",
                threshhold: {
                    graceperiod: "25 mins",
                    maxduration: "1 hour"
                },
                activepenalty:  {
                    id: "2001",
                    label: "Suspension"
                },
                penalties:[
                    {
                        id: "2001",
                        label: "Suspension",
                        maxallowedtardiness: "6",
                    },
                    {
                        id: "2002",
                        label: "Deduction",
                        frombegintime: true
                    }
                ]
            },
            _tardinessData: {
                defaultdata: {
                    id: "",
                    name: "",
                    threshhold: {
                        graceperiod: "15 mins",
                        maxduration: "Do not mark as Leave"
                    },
                    activepenalty: {
                        "id": "2001",
                    },

                    penalties:[
                        {
                            "id": "2001",
                            "label": "Suspension",
                            "maxallowedtardiness": "6"
                        },
                        {
                            "id": "2002",
                            "label": "Deduction",
                            "frombegintime": true
                        }
                    ]
                },
                enabled: true
            },
            _penalties:{
                value: 'Suspension',
                options: ['Suspension', 'Deduction']
            }
        }
    }

    componentWillUnmount(){
        this.props.actions.tardiness.setActiveRule('');
    }

    componentDidMount(){
        if(this.props.tardiness.data){
            this._initValues();
            this.setState({_status: [1,'']})
        }
        else{
            this._getDataFromDB();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.tardiness.status[0]){
                this.setState({ _status: nextProps.tardiness.status })
        }

        if(
            (JSON.stringify(this.state._tardinessData) !== JSON.stringify(nextProps.tardiness.data)) &&
            (nextProps.tardiness.status[0] == 1)
        ){
            this._initValues();
        }

        if(
            (this.state._activeTardiness.id !== nextProps.tardiness.activeRule) &&
            (this.state._status[0] == 1)
        ){
            this._updateActiveRule(nextProps.tardiness.activeRule);
        }
    }

    _getDataFromDB = () => {
        this.props.actions.tardiness.get({...this._requiredInputs(), transtype:'get'});
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
            let bFlag = true;
            let oActiveTardiness = JSON.parse(JSON.stringify(
                this.props.tardiness.activeRule == '' ||  isNaN(this.props.tardiness.activeRule) ? 
                tardinessSelector.getDefaultActiveTardiness() : tardinessSelector.getActiveTardinessFromID(this.props.tardiness.activeRule)
            ));
            if (!oActiveTardiness){
                oActiveTardiness = JSON.parse(JSON.stringify(tardinessSelector.getDefaultTardiness()));
                bFlag = false;
            }
            /* console.log('oActiveTardiness: ' + JSON.stringify(oActiveTardiness));
            console.log('bFlag: ' + bFlag); */

            this.setState({
                _tardinessData: JSON.parse(JSON.stringify(tardinessSelector.getTardinessData())),
                _activeTardiness: oActiveTardiness,
                _disabledMode: bFlag
            },
                () => {
                    /* console.log('_activeTardiness: ' + JSON.stringify(this.state._activeTardiness));
                    console.log('_tardinessData: ' + JSON.stringify(this.state._tardinessData)); */
                }
            )
            
            this.props.actions.tardiness.setActiveRule(oActiveTardiness.id);
        }
        catch(exception){
            this.setState({_status: [0,CONSTANTS.ERROR.SERVER]})
            console.log('exception: ' + exception.message);
            this.props.actions.tardiness.updateStatus([0,CONSTANTS.ERROR.SERVER]);
        }
    }

    _updateActiveRule = (iActiveRule) => {
        let oNewActive = JSON.parse(JSON.stringify(tardinessSelector.getActiveTardinessFromID(iActiveRule)));
        this.setState({
            _activeTardiness: oNewActive
        })
    }

    _saveRule = () => {
        if(!oHelper.isStringEmptyOrSpace(this.state._activeTardiness.name)){
            this.setState({
                _promptMsg: save_loading_message,
                _promptShow: true
            })
            const oInput = {
                companyid: this.props.activecompany.id,
                username: this.props.logininfo.resUsername,
                transtype: 'update',
                accesstoken: '',
                clientid: '',
                data: this.state._activeTardiness,
            };

            tardinessApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('INPUT: ' + JSON.stringify(oInput));
                console.log('OUTPUT: ' + JSON.stringify(res));
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
                        _resMsg: res.message
                    })
                    this._pushNewRuleToStore(res);
                }
                else{
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'error-ok',
                        _resMsg: 'Unable to save. An Unknown Error has been encountered. Contact BINHI-MeDFI.'
                    });
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
            /* console.log('SHOULD BE AN ERROR PROMPT!'); */
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: 'Unable to save. Please input Rule Name.'
            });
        }
    }

    _toggleTardiness = (value) => {
        this.setState({
            _promptMsg: switch_loading_message,
            _promptShow: true
        })
        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'request',
            accesstoken: '',
            clientid: '',
            enabled: value
        };

        tardinessApi.toggleSwitch(oInput)
        .then((response) => response.json())
        .then((res) => {
/*             console.log('INPUT: ' + JSON.stringify(oInput));
            console.log('OUTPUT: ' + JSON.stringify(res)); */
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
                    _resMsg: res.message
                })
                this._setTardinessSwitch(value);
            }
            else{
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: 'Unable to save. An Unknown Error has been encountered. Contact BINHI-MeDFI.'
                });
            }
        })
        .catch((err) => {
            this.setState({
                _promptShow: false,
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: err.message + '. Please check you Internet Settings.'
            })
        });
    }

    _deleteActiveRule = (value) => {
        this.setState({
            _promptMsg: delete_loading_message,
            _promptShow: true
        })
        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'delete',
            accesstoken: '',
            clientid: '',
            id: this.state._activeTardiness.id
        };

        tardinessApi.remove(oInput)
        .then((response) => response.json())
        .then((res) => {
/*             console.log('INPUT: ' + JSON.stringify(oInput));
            console.log('OUTPUT: ' + JSON.stringify(res)); */
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
                    _resMsg: res.message
                })
                this.props.actions.tardiness.setActiveRule('');
                this._popActiveRuleFromStore(value);
                
            }
            else{
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: 'Unable to save. An Unknown Error has been encountered. Contact BINHI-MeDFI.'
                });
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

    _pushNewRuleToStore = (res) => {
        let oTardinessData = {...this.state._tardinessData};
        let oData = [...oTardinessData.data];

        let oActiveTardiness = {...this.state._activeTardiness};
        oActiveTardiness.id = res.id
        oData.push(oActiveTardiness);

        oTardinessData.data = oData;

        this.props.actions.tardiness.update(oTardinessData);
        this.props.actions.tardiness.setActiveRule(res.id);
        this._disableAll();
        this._initValues();
    }

    _setTardinessSwitch = (value) => {
        let oTardiness = {...this.state._tardinessData};
        oTardiness.enabled = value;
        this.props.actions.tardiness.update(oTardiness);
        this._initValues();
    }

    _popActiveRuleFromStore = () => {
        let oTardiness = {...this.state._tardinessData};
        let aTardinessData = [...oTardiness.data];
        let iPopIndex;

        aTardinessData.map((data,index) => {
            if(data.id == this.state._activeTardiness.id){
                aTardinessData.splice(index, 1);
            }
        });

        oTardiness.data = aTardinessData;
        this.props.actions.tardiness.update(oTardiness);
        this._initValues();
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false,
            _resMsg: '',
            _activeRequest: '',
            _activeBreakTimeIndex: ''
        });
    }

    _updateRuleName = (strVal) => {
        let oActiveTardiness = {...this.state._activeTardiness};
        oActiveTardiness.name = strVal;
        this.setState({
            _activeTardiness: oActiveTardiness
        })
    }

    _getPenaltyValue = () => {
        let oPenaltyVal = null;
        let oPenalties = [...this.state._activeTardiness.penalties];
        oPenalties.map(a => {
            if(a.id == this.state._activeTardiness.activepenalty.id){
                if(a.id == cl_deduction){
                    oPenaltyVal = a.frombegintime;
                }
                else if(a.id == cl_suspension){
                    oPenaltyVal = a.maxallowedtardiness;
                }
            }
        });
        /* console.log('_getPenaltyValue: ' + oPenaltyVal); */
        return oPenaltyVal;
    }
    
    _setActiveRule = (value) => {
        this.props.actions.tardiness.setActiveRule(value);
    }

    _setPenalty = (value) => {
        let strLabel = '';

        if(value==cl_deduction){
            strLabel = 'Deduction';
        }
        else{
            strLabel = 'Suspension';
        }

        let oActiveTardiness = {...this.state._activeTardiness};
        oActiveTardiness.activepenalty.id=value;
        oActiveTardiness.activepenalty.label=strLabel;
        this.setState({
            _activeTardiness: oActiveTardiness
        })
    }

    _showTimePicker = async(attribName) => {
        let defaultTime = 0;

        try {
            const {action, hour, minute} =await TimePickerAndroid.open({
                hour: defaultTime,
                minute: 0,
                is24Hour: true,
                mode: 'spinner'
            });

            if (action !== TimePickerAndroid.dismissedAction) {
                let strHr = '';
                let strMin = '';

                hour>1 ? strHr = 'hours' : strHr = 'hour'
                minute>1 ? strMin = 'mins' : strMin = 'min'


                let strTime = hour + strHr + ' ' + minute + strMin
                if(attribName=='GP'){
                    this._updateGracePeriod(strTime);
                }
                else if(attribName == 'HDL'){
                    this._updateMaxTolerance(strTime);
                }
            }
        } 
        
        catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    }

    _updateGracePeriod = (strTime) => {
        let oActiveTardiness = {...this.state._activeTardiness};
        oActiveTardiness.threshhold.graceperiod = strTime;
        this.setState({
            _activeTardiness: oActiveTardiness
        })
    }

    _updateMaxTolerance = (strTime) => {
        let oActiveTardiness = {...this.state._activeTardiness};
        oActiveTardiness.threshhold.maxduration = strTime;
        this.setState({
            _activeTardiness: oActiveTardiness
        })
    }

    _setTime = () => {
        
    }

    _setPenaltyValue = (strVal) =>{
        let oActiveTardiness = {...this.state._activeTardiness};
        let oPenalties = [...oActiveTardiness.penalties];
        oPenalties.map((a, index) => {
            if(a.id == this.state._activeTardiness.activepenalty.id){
                if(a.id == cl_deduction){
                    oPenalties[index].frombegintime = !!+strVal;
                }
                else if(a.id == cl_suspension){
                    oPenalties[index].maxallowedtardiness = strVal;
                }
            }
        });

        oActiveTardiness.penalties = oPenalties
        
        this.setState({
            _activeTardiness: oActiveTardiness
        })
    }
    
    //Add New Rule
    _addNewRule = () => {
        this.setState({
            _activeTardiness: JSON.parse(JSON.stringify(tardinessSelector.getDefaultTardiness()))
        })
        this._enableAll();
    }

    //Cancel Add/Edit Transaction
    _cancelEdit = () => {
        this._initValues();
        this._disableAll();
        if(this.state._tardinessData.data.length === 0){
            this._toggleTardiness(false);
        }
    }

    //Disable Edit Mode
    _disableAll = () => {
        this.setState({
            _disabledMode: true
        })
    }
    
    //Enable Edit Mode
    _enableAll = () => {
        this.setState({
            _disabledMode: false
        })
    }

    render(){
        console.log('xxxxxxxxxxxxx______REDERING TARDINESS');
        //Loading View Status
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Tardiness Policy' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress==1){
            let pTitle;
            let pType;
            let oRuleName;
            let oRightOption;
            let oRightOptionType;
            let strTitle;
            let oActivePenalty;
            let oActivePenaltyRule;
            let suspensionValue = null;

            if(this.state._disabledMode || !this.state._tardinessData.enabled){
                pTitle='Tardiness';
                pType='Switch';
                oRightOption = (
                    <Switch
                        disabled={false}
                        onValueChange={ (value) => {this._toggleTardiness(value)}} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={this.state._tardinessData.enabled} 
                    />
                );
                oRightOptionType = 'Switch';
                strTitle = pTitle;

                //Rule Name
                oRuleName = (
                    <Picker
                        mode='dropdown'
                        style={styles.pickerStyle}
                        selectedValue={this.state._activeTardiness.id}
                        onValueChange={(itemValue, itemIndex) => {this._setActiveRule(itemValue)}}>
                        {
                            this.state._tardinessData.data.map((data, index) => (
                                <Picker.Item key={index} label={data.name} value={data.id} />
                            ))
                        }
                    </Picker>
                );

                //Penalty
                oActivePenalty = (
                    <Text 
                        style={{color: '#434646', 
                            height: '100%', 
                            textAlignVertical: 'center',
                            width: 150,
                            paddingLeft: 15,
                            paddingRight: 15
                        }}>
                        {this.state._activeTardiness.activepenalty.label}
                    </Text>
                );
            }
            else{
                pTitle='Add New Tardiness Rule';
                pType='Text';
                oRightOption = (
                    <View style={styles.btnRightCont}>
                        <TouchableOpacity 
                            disabled={false}
                            style={styles.btnCancel}
                            activeOpacity={0.6}
                            onPress={() => {this._cancelEdit()}}>
                            <Text style={styles.txtBtn}>CANCEL</Text>
                        </TouchableOpacity>
                        <View style={{width: 10}}></View>
                        <TouchableOpacity 
                            disabled={this.state._disableBtn}
                            style={styles.btnSave}
                            activeOpacity={0.6}
                            onPress={() => {this._saveRule()}}>
                            <Text style={styles.txtBtn}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                );
                oRightOptionType = 'BUTTON';
                strTitle = pTitle;
                oRuleName = (
                    <TextInput 
                        autoCapitalize='none'
                        editable={!this.state._disabledMode}
                        placeholder='Rule Name'
                        style={{color: '#434646', paddingLeft: 10, height: '100%'}}
                        onChangeText={(text) => {this._updateRuleName(text)}}
                        value={this.state._tardinessData.name}
                        returnKeyType="done"
                        underlineColorAndroid='transparent'
                    />
                );
                oActivePenalty = (
                    <Picker
                        mode='dropdown'
                        style={styles.pickerStyle}
                        selectedValue={this.state._activeTardiness.activepenalty.id}
                        onValueChange={(itemValue, itemIndex) => {this._setPenalty(itemValue)}}>
                        {
                            this.state._activeTardiness.penalties.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.id} />
                            ))
                        }
                    </Picker>
                )
            }

            return(
                <View style={styles.container}>
                    { this.state._promptShow ?
                        <PromptScreen.PromptGeneric show= {this.state._promptShow} title={this.state._promptMsg}/>
                        : null
                    }

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={this._getDataFromDB}
                            />
                        }
                    >
                        <CustomCard 
                            title={strTitle} 
                            description={description_Tardiness} 
                            oType={oRightOptionType}
                            rightHeader={
                                oRightOption
                            }
                        >

                        { 
                            this.state._tardinessData.enabled ? 
                                <View>
                                    <PropLevel1 
                                        name='Rule Name'
                                        content={
                                            oRuleName
                                        }
                                    />
                                    <PropTitle name='Threshhold'/>
                                    <PropLevel2 
                                        name='Grace Period'
                                        content={
                                            <Text 
                                                disabled={this.state._disabledMode}
                                                onPress={() => {this._showTimePicker('GP')}}
                                                style={{color: '#434646', height: '100%', textAlignVertical: 'center'}}>
                                                {this.state._activeTardiness.threshhold.graceperiod}
                                            </Text>
                                        }
                                        hideBorder={this.state._disabledMode}
                                        contentStyle={{
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            width: 140
                                        }}
                                    />
                                    <View style={{height: 15}}>
                                    </View>
                                    <PropLevel2 
                                        name={'Mark as Half Day Leave' +'\n' + 'after specified duration'}
                                        content={
                                            <Text 
                                                disabled={this.state._disabledMode}
                                                onPress={() => {this._showTimePicker('HDL')}}
                                                style={{color: '#434646', 
                                                height: '100%', 
                                                textAlignVertical: 'center'}}>
                                                {this.state._activeTardiness.threshhold.maxduration}
                                            </Text>
                                        }
                                        hideBorder={this.state._disabledMode}
                                        contentStyle={{
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            width: 140
                                        }}
                                    />

                                    <PropTitle name='Tardiness Penalties'/>
                                    <PropLevel2 
                                        name='Penalty Type'
                                        content={
                                            oActivePenalty
                                        }
                                        hideBorder={this.state._disabledMode}
                                        contentStyle={{
                                            width: 150
                                        }}
                                    />
                                    
                                    { this.state._activeTardiness.activepenalty.id == cl_deduction ?
                                        <PropLevel2 
                                            name={'If employee clocked in\n' + 
                                                'after the grace period,\n' + 
                                                'make a tardiness de-\n' +
                                                'duction based on the\n' + 
                                                'number of minutes'}
                                            content={
                                                <Picker
                                                    enabled={!this.state._disabledMode}
                                                    mode='dropdown'
                                                    style={styles.pickerStyle}
                                                    selectedValue={Number(this.state._activeTardiness.penalties[1].frombegintime)}
                                                    onValueChange={(itemValue, itemIndex) => {this._setPenaltyValue(itemIndex)}}>
                                                    {
                                                        this.state._suspensionOptions.map((option, index) => (
                                                            <Picker.Item key={index} label={option} value={index} />
                                                        ))
                                                    }
                                                </Picker>
                                            }
                                            hideBorder={this.state._disabledMode}
                                            
                                            contentStyle={{
                                                width: 280,
                                            }}

                                            placeHolderStyle={{height: 100}}
                                        />
                                        : null
                                    }
                                    
                                    {
                                        this.state._activeTardiness.activepenalty.id == cl_suspension ?
                                            <PropLevel2 
                                                name={'Notify a Suspension\n' + 
                                                    'Approval when number\n' + 
                                                    'of occurences is breached'}
                                                content={
                                                    <TextInput 
                                                        editable={!this.state._disabledMode}
                                                        autoCapitalize='none'
                                                        keyboardType='numeric'
                                                        placeholder='Rule Name'
                                                        style={{color: '#434646', height: '100%'}}
                                                        onChangeText={(text)  => {this._setPenaltyValue(text)}}
                                                        value={this._getPenaltyValue()}
                                                        returnKeyType="done"
                                                        underlineColorAndroid='transparent'
                                                    />
                                                }
                                                contentStyle={{
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    width: 150,
                                                }}
                                                hideBorder={this.state._disabledMode}
                        
                                                placeHolderStyle={{height: 100}}
                                            />
                                        : null
                                    }
                                </View>
                            : 
                            <View style={{paddingTop: 10}}>
                                <Text>{tardiness_disabled}</Text>
                                <Text>{'\n' + tardiness_enabled}</Text>
                            </View>
                        }
                        </CustomCard>
                    </ScrollView>
                    { 
                        this.state._tardinessData.enabled && this.state._disabledMode ? 
                            <ActionButton 
                                buttonColor="#EEB843"
                                spacing={10}
                            >
                                <ActionButton.Item buttonColor='#26A65B' title="ADD NEW TARDINESS RULE" onPress={() => {this._addNewRule()}}>
                                    <Icon2 name="bell-plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                
                                <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT TARDINESS RULE" onPress={() => {this._deleteActiveRule()}}>
                                    <Icon2 name="delete-empty" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                        :null
                    }
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
        tardiness: state.companyPoliciesReducer.tardiness
        
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            tardiness: bindActionCreators(tardinessActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tardiness)