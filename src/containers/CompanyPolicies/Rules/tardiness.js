import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    TimePickerAndroid,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles'

//Custom Components
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import CustomCard, 
{
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

//Class Constants
const description_Tardiness = 'Set Tardiness Rules';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

const cl_suspension = '2001';
const cl_deduction = '2002';

export default class Tardiness extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Gereric States
            _disabledMode: true,
            _status: [1, 'Loading...'],

            //Penalty
            _suspensionOptions: [
                'from the beginning of the shift',
                'from the end of the grace period'
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

/*     componentDidMount(){
        if(this.props.status[0]==1){
            this._initValues();
        }

        this.setState({
            _status: [...this.props.status]
        });
    }

    _initValues = () => {

        this.setState({
            _curWorkShiftObj: oWorkShift,
            _activeSchedule: oDefaultScheule,
            _activeType: oActiveType,
            _bNoWorkShift: bNoWorkShift,
            _disabledMode: !bNoWorkShift
        }); 
    } */

    _enableTardiness = (value) => {
        let oTardiness = {...this.state._tardinessData};
        oTardiness.enabled = value;
        this.setState({
            _tardinessData: oTardiness
        })
    }

    _setPenalty = (value) => {
        let oActiveTardiness = {...this.state._activeTardiness};
        oActiveTardiness.activepenalty.id=value;
        this.setState({
            _activeTardiness: oActiveTardiness
        })
    }

    _showTimePicker = async() => {
        let defaultTime = 0;

        try {
            const {action, hour, minute} =await TimePickerAndroid.open({
                hour: defaultTime,
                minute: 0,
                is24Hour: true,
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

    _setTime = () => {
        
    }

    _setSuspensionRule = () =>{
        
    }
    
    //Add New Rule
    _addNewRule = () => {
        this._enableAll();
    }

    //Cancel Add/Edit Transaction
    _cancelEdit = () => {
        this._disableAll();
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
        //Loading View Status
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

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
                    <PromptScreen.PromptError title={pMessage}/>
                </ScrollView>
            );
        }
        else if(pProgress==2){
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
            );
        }

        else{
            let pTitle;
            let pType;
            let oRuleName;
            let oRightOption;
            let oRightOptionType;
            let strTitle;
            let oActivePenalty;
            let oActivePenaltyRule;

            if(this.state._disabledMode){
                pTitle='Tardiness';
                pType='Switch';
                oRightOption = (
                    <Switch
                        disabled={false}
                        onValueChange={ (value) => {this._enableTardiness(value)}} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={this.state._tardinessData.enabled} 
                    />
                );
                oRightOptionType = 'Switch';
                strTitle = pTitle;
                oRuleName = (
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
                );
                oActivePenalty = (
                    <Text 
                        style={{color: '#434646', 
                            height: '100%', 
                            textAlignVertical: 'center',
                            paddingLeft: 15
                        }}>
                        {this.state._activeTardiness.activepenalty.label}
                    </Text>
                )
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
                            onPress={() => {this._saveWorkShift()}}>
                            <Text style={styles.txtBtn}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                );
                oRightOptionType = 'BUTTON';
                strTitle = pTitle;
                oRuleName = (
                    <TextInput 
                        autoCapitalize='none'
                        disabled={true}
                        placeholder='Rule Name'
                        style={{paddingRight: 10, height: '100%'}}
                        onChangeText={() => {}}
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

            if(this.state._activeTardiness.activepenalty.id == cl_deduction){
                oActivePenaltyRule = (
                    <PropLevel2 
                        name={'If employee clocked in\n' + 
                            'after the grace period,\n' + 
                            'make a tardiness de-\n' +
                            'duction based on the\n' + 
                            'number of minutes'}
                        content={
                            <Picker
                                mode='dropdown'
                                style={styles.pickerStyle}
                                selectedValue={this.state._frombegintime}
                                onValueChange={(itemValue, itemIndex) => {this._setSuspensionRule(itemValue)}}>
                                {
                                    this.state._suspensionOptions.map((option, index) => (
                                        <Picker.Item key={index} label={option} value={index} />
                                    ))
                                }
                            </Picker>
                        }
                        contentStyle={{
                            width: 280,
                        }}

                        placeHolderStyle={{height: 100}}
                    />
                );
            }
            else if(this.state._activeTardiness.activepenalty.id == cl_suspension){
                oActivePenaltyRule = (
                    <PropLevel2 
                        name={'Notify a Suspension\n' + 
                            'Approval when number\n' + 
                            'of occurences is breached'}
                        content={
                            <TextInput 
                                autoCapitalize='none'
                                keyboardType='numeric'
                                disabled={true}
                                placeholder='Rule Name'
                                style={{paddingRight: 10, height: '100%'}}
                                onChangeText={() => {}}
                                value={this.state._tardinessData.name}
                                returnKeyType="done"
                                underlineColorAndroid='transparent'
                            />
                        }
                        contentStyle={{
                            width: 280,
                        }}

                        placeHolderStyle={{height: 100}}
                    />
                )
            }
            return(
                <View style={styles.container}>
                    <ScrollView>
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
                                        contentStyle={{
                                            paddingRight: 15,
                                            
                                        }}
                                    />
                                    <PropTitle name='Threshhold'/>
                                    <PropLevel2 
                                        name='Grace Period'
                                        content={
                                            <Text 
                                                disabled={this.state._disabledMode}
                                                onPress={() => {this._showTimePicker()}}
                                                style={{color: '#434646', height: '100%', textAlignVertical: 'center'}}>
                                                {this.state._activeTardiness.threshhold.graceperiod}
                                            </Text>
                                        }
                                        contentStyle={{
                                            paddingLeft: 15,
                                            justifyContent: 'center',
                                            width: 120
                                        }}
                                    />
                                    <View style={{height: 15}}>
                                    </View>
                                    <PropLevel2 
                                        name={'Mark as Half Day Leave' +'\n' + 'after specified duration'}
                                        content={
                                            <Text 
                                                disabled={this.state._disabledMode}
                                                onPress={() => {this._showTimePicker()}}
                                                style={{color: '#434646', 
                                                height: '100%', 
                                                textAlignVertical: 'center'}}>
                                                {this.state._activeTardiness.threshhold.maxduration}
                                            </Text>
                                        }
                                        contentStyle={{
                                            paddingLeft: 15,
                                            justifyContent: 'center',
                                            width: 120
                                        }}
                                    />
                                    <View style={{marginTop: 30, borderBottomWidth: 1, borderColor: '#D1D4D6'}}>
                                    </View>
                                    <PropTitle name='Tardiness Penalties'/>
                                    <PropLevel2 
                                        name='Penalty Type'
                                        content={
                                            oActivePenalty
                                        }
                                        contentStyle={{
                                            width: 150
                                        }}
                                    />
                                    {
                                        oActivePenaltyRule
                                    }

                                </View>
                            : null
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
                                
                                <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT TARDINESS RULE" onPress={() => {this._deleteActiveWorkShiftRequest()}}>
                                    <Icon2 name="delete-empty" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                        :null
                    }
                </View>
            );
        }
    }
}