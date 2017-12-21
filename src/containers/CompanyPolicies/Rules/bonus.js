import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    DatePickerAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
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

const title_Bonus = '13th Month Pay';
const description_Bonus = 'Allow and Schedule';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

export default class Bonus extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: ['2', 'Loading...'],
            _taxData: {},
            _changeFlag: false,

            //MessageBox
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Refresh
            _refreshing: false,

            _tempSwitch: true,
            _tempActiveInstallments: 1,
            _tempInstallments: [
                '1', '2', '3', '4'
            ]
        }
    }
    _setSwitch = (value) =>{
        this.setState({
            _tempSwitch: value
        })
    }

    _setNumberOfInstallments = (index) => {
        this.setState({
            _tempActiveInstallments: index
        })
    }

    _showDatePicker = async() => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(2018, 4, 25)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    } 
    render(){
        return(
            <View style={styles.container}>
                <CustomCard 
                    title={title_Bonus} 
                    description={description_Bonus} 
                    oType='Switch'
                    rightHeader={
                        <Switch
                            onValueChange={ (value) => this._setSwitch(value)} 
                            onTintColor={color_SwitchOn}
                            thumbTintColor={color_SwitchThumb}
                            tintColor={color_SwitchOff}
                            value={ this.state._tempSwitch } 
                        />
                    }
                >
                { this.state._tempSwitch ? 
                    <View style={{marginTop: -10}}>
                        <PropTitle name='Installments'/>
                    
                        <PropLevel2 
                            name='Number of Installments'
                            content={
                                <Picker
                                    mode='dropdown'
                                    style={styles.pickerStyle}
                                    selectedValue={this.state._tempActiveInstallments}
                                    onValueChange={(itemValue, itemIndex) => {this._setNumberOfInstallments(itemValue)}}>
                                    {
                                        this.state._tempInstallments.map((option, index) => (
                                            <Picker.Item key={index} label={option} value={index} />
                                        ))
                                    }
                                </Picker>
                            }
                            contentStyle={{
                                paddingLeft: 15,
                                justifyContent: 'center',
                                width: 130
                            }}
                        />

                        <PropTitle name='Payment Schedule'/>

                        <PropLevel2 
                            name='First Payment'
                            content={
                                <Text 
                                    onPress={() => {this._showDatePicker()}}
                                    style={{color: '#434646', 
                                        height: '100%', 
                                        textAlignVertical: 'center',
                                    }}>
                                    June 10
                                </Text>
                            }
                            contentStyle={{
                                paddingLeft: 15,
                                justifyContent: 'center',
                                width: 130
                            }}
                        />
                        <View style={{height: 10}}>
                        </View>
                        <PropLevel2 
                            name='Second Payment'
                            content={
                                <Text 
                                    onPress={() => {this._showDatePicker()}}
                                    style={{color: '#434646', 
                                        height: '100%', 
                                        textAlignVertical: 'center',
                                    }}>
                                    December 10
                                </Text>
                            }
                            contentStyle={{
                                paddingLeft: 15,
                                justifyContent: 'center',
                                width: 130
                            }}
                        />
                    </View>
                    : null
                    }

                </CustomCard>
            </View>
        );
    }
}