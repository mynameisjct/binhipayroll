import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    CheckBox
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'
import CustomCard from '../../../components/CustomCards';

const title_WorkShift = 'Set the Company’s Default Work Shift';
const category = ['', 'DAY OFF', 'TIME-IN', 'TIME-OUT'];
const description_DefaultTime = 'The same Time-in and Time-out';

export default class WorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            _isLoaded: false,
            _dailyPolicy: {
                sunday: {
                    header: 'S',
                    dayoff: true,
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
                timein: '00:00',
                timeout: '00:00'
            }

/*             _dailyPolicy: {
                sunday: {
                    header: 'S',
                    dayoff: true,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
                monday: {
                    header: 'M',
                    dayoff: false,
                    timein: '',
                    timeout: '',
                },
                tuesday: {
                    header: 'T',
                    dayoff: false,
                    timein: '',
                    timeout: '',
                },
                wednesday: {
                    header: 'W',
                    dayoff: false,
                    timein: '',
                    timeout: '',
                },
                thursday: {
                    header: 'T',
                    dayoff: false,
                    timein: '',
                    timeout: '',
                },
                friday: {
                    header: 'F',
                    dayoff: false,
                    timein: '',
                    timeout: '',
                },
                saturday: {
                    header: 'S',
                    dayoff: false,
                    timein: '',
                    timeout: '',
                },
            } */
        }
    }

    componentDidMount = () => {
        this.setState({
            _isLoaded: true
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
        let objPolicy = {...this.state._dailyPolicy};
        Object.keys(objPolicy).map(function (key) {
            if(key==strkey){
                objPolicy[key].dayoff = value;
            }
        })
        this.setState({
            _dailyPolicy: objPolicy
        })
    }

    render(){
        const oDailyPolicy = this.state._dailyPolicy;
        let iBorderCounter = -1;

        if(!this.state._isLoaded){
            return null;
        }
        else{
            return(
                <View style={styles.container}>
                    <ScrollView>
                        <CustomCard title={title_WorkShift}>
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
                                                        <Text style={styles.txtContent}>{oDailyPolicy[key].timein}</Text>
                                                    </View>
                                                    <View style={styles.dailyPlaceholder}>
                                                        <Text style={styles.txtContent}>{oDailyPolicy[key].timeout}</Text>
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
                                        onValueChange={ (value) => {}} 
                                        value={this.state._defaultSetting.enabled}
                                    />
                                    <Text style={styles.txtDefaultTimeMsg}>{description_DefaultTime}</Text>
                                </View>
                                <View style={styles.defaultTimePlaceholder}>
                                    <View style={styles.defaultTimeRow}>
                                    </View>
                                        <Text style={styles.txtDefaultTime}>{'TIME-IN  : ' + this.state._defaultSetting.timein}</Text>
                                        <Text style={styles.txtDefaultTime}>{'TIME-OUT : ' + this.state._defaultSetting.timein}</Text>
                                </View>
                            </View>
                        </CustomCard>
                    </ScrollView>
                </View>
            );
        }
    }
}