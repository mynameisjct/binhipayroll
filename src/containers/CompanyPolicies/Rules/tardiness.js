import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    TimePickerAndroid,
    ScrollView,
    TextInput
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

const description_Tardiness = 'Set Tardiness Rules';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

export default class Tardiness extends Component{
    constructor(props){
        super(props);
        this.state = {
            _disabledMode: true,
            _status: [1, 'Loading...'],
            _activeTardiness:{
                id: "0001",
                name: "Default",
                threshhold: {
                    graceperiod: "25 mins",
                    maxduration: "Do not mark as Leave"
                },
                activepenalty:  {
                    id: "0001",
                    label: "Suspension",
                },
                penalties:[
                    {
                        id: "0001",
                        label: "Suspension",
                        maxallowedtardiness: "6"
                    },
                    {
                        id: "0002",
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
                        "id": "0001",
                        "label": "Suspension",
                    },

                    penalties:[
                        {
                            "id": "0001",
                            "label": "Suspension",
                            "maxallowedtardiness": "6"
                        },
                        {
                            "id": "0002",
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

    _enableTardiness = (value) => {
        let oTardiness = {...this.state._tardinessData};
        oTardiness.enabled = value;
        this.setState({
            _tardinessData: oTardiness
        })
    }

    _setPenalty = (value) => {

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

    render(){
        //Loading View Status
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        let pTitle;
        let pType;
        
        if(!this.state._disabledMode){
            pTitle='Tardiness';
            pType='Switch'
        }
        else{
            pTitle='Add New Tardiness Rule';
            pType='Text'
        }
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
            return(
                <View style={styles.container}>
                    <ScrollView>
                        <CustomCard 
                            title={pTitle} 
                            description={description_Tardiness} 
                            oType={pType}
                            rightHeader={
                                <Switch
                                    disabled={this.state._disabledMode}
                                    onValueChange={ (value) => {this._enableTardiness(value)}} 
                                    onTintColor={color_SwitchOn}
                                    thumbTintColor={color_SwitchThumb}
                                    tintColor={color_SwitchOff}
                                    value={this.state._tardinessData.enabled} 
                                />
                            }
                        >

                        { 
                            this.state._tardinessData.enabled ? 
                                <View>
                                    <PropLevel1 
                                        name='Rule Name'
                                        content={
                                            <TextInput 
                                                disabled={true}
                                                placeholder='Rule Name'
                                                style={{paddingLeft: 10, height: '100%'}}
                                                onChangeText={() => {}}
                                                value={this.state._tardinessData.name}
                                                returnKeyType="done"
                                                underlineColorAndroid='transparent'
                                            />
                                        }
                                        contentStyle={{
                                            paddingLeft: 15,
                                            
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
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 150
                                            
                                        }}
                                    />
                                    <View style={{height: 15}}>
                                    </View>
                                    <PropLevel2 
                                        name={'Mark as Half Day Leave' +'\n' + ' after specified duration'}
                                        content={
                                            <Text 
                                                style={{color: '#434646', 
                                                height: '100%', 
                                                textAlignVertical: 'center'}}>
                                                {this.state._activeTardiness.threshhold.maxduration}
                                            </Text>
                                        }
                                        contentStyle={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 190
                                        }}
                                    />
                                    <View style={{marginTop: 30, borderBottomWidth: 1, borderColor: '#D1D4D6'}}>
                                    </View>
                                    <PropTitle name='Tardiness Penalties'/>
                                    <PropLevel2 
                                        name='Penalty Type'
                                        content={
                                            <Text 
                                                style={{color: '#434646', 
                                                height: '100%', 
                                                textAlignVertical: 'center'}}>
                                                {this.state._activeTardiness.activepenalty.label}
                                            </Text>

                                            /* <Picker
                                                mode='dropdown'
                                                style={styles.pickerStyle}
                                                selectedValue={this.state._penalties.value}
                                                onValueChange={(itemValue, itemIndex) => {this._setPenalty(itemValue)}}>
                                                {
                                                    this.state._penalties.options.map((paytype, index) => (
                                                        <Picker.Item key={index} label={paytype} value={paytype} />
                                                    ))
                                                }
                                            </Picker> */
                                        }
                                        contentStyle={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 150
                                        }}
                                    />
                                    
                                </View>
                            : null
                        }
                        </CustomCard>
                    </ScrollView>
                    { 
                        this.state._tardinessData.enabled ? 
                            <ActionButton 
                                buttonColor="#EEB843"
                                spacing={10}
                            >
                                <ActionButton.Item buttonColor='#26A65B' title="ADD NEW TARDINESS RULE" onPress={() => {this._addNewWorkShift()}}>
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