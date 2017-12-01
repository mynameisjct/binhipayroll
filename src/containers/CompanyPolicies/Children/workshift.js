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

export default class WorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            _dailyPolicy: {
                sunday: {
                    header: 'S',
                    dayoff: true,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
                monday: {
                    header: 'M',
                    dayoff: false,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
                tuesday: {
                    header: 'T',
                    dayoff: false,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
                wednesday: {
                    header: 'W',
                    dayoff: false,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
                thursday: {
                    header: 'T',
                    dayoff: false,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
                friday: {
                    header: 'F',
                    dayoff: false,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
                saturday: {
                    header: 'S',
                    dayoff: false,
                    timein: '8:00 AM',
                    timeout: '5:30 PM',
                },
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

    _setBottomBorder = (index) => {
        console.log('index: ' + index)
        if(index==0){
            return({
                borderBottomWidth: 0,
            })
        }
    }

    render(){
        const oDailyPolicy = this.state._dailyPolicy;
        let iBorderCounter = -1;

        return(
            <View style={styles.container}>
                <ScrollView>
                    <CustomCard title={title_WorkShift}>
                        <View style={styles.tableCont}>
                            <View style={styles.categoryCont}>
                                {
                                    category.map((info, index) => (
                                        <View key={index} style={[styles.categoryPlaceholder, this._setBottomBorder(index)]}>
                                            <Text>{info}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                            <ScrollView horizontal={true}>
                                <View style={styles.detailsCont}>
                                    {
                                        Object.keys(oDailyPolicy).map(key => (
                                            <View key={key} style={styles.dailyCont}>
                                                <View style={styles.dailyPlaceholder}>
                                                    <Text>{oDailyPolicy[key].header}</Text>
                                                </View>
                                                <View style={styles.dailyPlaceholder}>
                                                    <CheckBox
                                                        onValueChange={ (value) => {}} 
                                                        value={oDailyPolicy[key].dayoff}
                                                    />
                                                </View>
                                                <View style={styles.dailyPlaceholder}>
                                                    <Text style={styles.txtTime}>{oDailyPolicy[key].timein}</Text>
                                                </View>
                                                <View style={styles.dailyPlaceholder}>
                                                    <Text style={styles.txtTime}>{oDailyPolicy[key].timeout}</Text>
                                                </View>
                                            </View>
                                        ))
                                        
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </CustomCard>
                </ScrollView>
            </View>
        );
    }
}

{/* <View style={styles.cardTitleCont}>
    <Text style={styles.txtCardTitle}>
        Hello
    </Text>
</View>
<View style={styles.contentCont}>
</View> */}