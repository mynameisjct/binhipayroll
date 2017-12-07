import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomCard from '../../../components/CustomCards';
import styles from './styles'

const title_Payroll = 'Set Payroll Rules and Schedule';

export default class Payroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            _payrolldata: {
                flagno: "1",
                message: "Success!",
                paytype:{
                        label: "Payroll Type",
                        value: "Semi-Monthly",
                        options: ["Semi-Monthly","Monthly","Weekly"]
                },
                data:{
                    semimonthly:{
                        firstpayday:{
                            value: "15",
                            options: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
                        },
                        secondpayday:{
                            value:"30"
                        },
                        cutoff:{
                            value:"5",
                            options:["1","2","3","4","5","6","7","8","9","10"]
                        },

                        firstperiod:{
                            value:"25-09"
                        },

                        secondperiod:{
                            value:"10-24"
                        }
                    },

                    monthly:{
                        payday:{
                            value: "30",
                            options: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
                        },
                        cutoff:{
                            value:"5",
                            options:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
                        },
                        period:{
                            value:"25-26"
                        },
                    },

                    weekly:{
                        payday:{
                            value: "Friday",
                            options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
                        },
                        cutoff:{
                            value:"2",
                            options:["1","2","3","4","5","6"]
                        },
                        period:{
                            value:"Wednesday-Thursday"
                        },
                    }, 
                }
            }
        }
    }
    
    _setActivePaytype = (value) => {
        let oData = {...this.state._payrolldata};
        oData.paytype.value = value;

        this.setState({
            _payrolldata: oData
        })
    }

    _setFirstPayDay = (value) => {
        let oData = {...this.state._payrolldata};
        switch (this.state._payrolldata.paytype.value.toUpperCase()){
            case 'SEMI-MONTHLY':
                oData.data.semimonthly.firstpayday.value = value;
                break;
            case 'MONTHLY':
                oData.data.monthly.payday.value=value;
                break;
            case 'WEEKLY':
                oData.data.weekly.payday.value=value;
                break;
            default:
                break;
        }

        this.setState({
            _payrolldata: oData
        })
    }

    _setCutOff = (value) => {
        let oData = {...this.state._payrolldata};
        switch (this.state._payrolldata.paytype.value.toUpperCase()){
            case 'SEMI-MONTHLY':
                oData.data.semimonthly.cutoff.value = value;
                break;
            case 'MONTHLY':
                oData.data.monthly.cutoff.value=value;
                break;
            case 'WEEKLY':
                oData.data.weekly.cutoff.value=value;
                break;
            default:
                break;
        }

        this.setState({
            _payrolldata: oData
        })
    }

    render(){
        const semimonthlyView = 
            <View style={styles.payrollSchedCont}>
                <View style={styles.payrollChildProp}>
                    <View style={styles.titleCont}>
                        <Text style={styles.txtDefault}>First Pay Day </Text>
                    </View>
                    <View style={[styles.propContChild, styles.adjustChildProp]}>
                        <Picker
                            mode='dropdown'
                            style={styles.pickerStyle}
                            selectedValue={this.state._payrolldata.data.semimonthly.firstpayday.value}
                            onValueChange={(itemValue, itemIndex) => {this._setFirstPayDay(itemValue)}}>
                            {
                                this.state._payrolldata.data.semimonthly.firstpayday.options.map((paytype, index) => (
                                    <Picker.Item key={index} label={paytype} value={paytype} />
                                ))
                            }
                        </Picker>
                    </View>
                </View>

                <View style={styles.payrollChildProp}>

                    <View style={styles.titleCont}>
                        <Text style={styles.txtDefault}>Second Pay Day</Text>
                    </View>
                    <View style={[styles.propContTxt, styles.adjustChildProp]}>
                        <Text style={styles.txtDefault}>
                            {this.state._payrolldata.data.semimonthly.secondpayday.value}
                        </Text>
                    </View>

                </View>
                
                <View style={styles.payrollChildProp}>
                    <View style={styles.titleCont}>
                        <Text style={styles.txtDefault}>Cut-off</Text>
                    </View>
                    <View style={[styles.propContChild, styles.adjustChildProp]}>
                        <Picker
                            mode='dropdown'
                            style={styles.pickerStyle}
                            selectedValue={this.state._payrolldata.data.semimonthly.cutoff.value}
                            onValueChange={(itemValue, itemIndex) => {this._setCutOff(itemValue)}}>
                            {
                                this.state._payrolldata.data.semimonthly.cutoff.options.map((paytype, index) => (
                                    <Picker.Item key={index} label={paytype} value={paytype} />
                                ))
                            }
                        </Picker>
                    </View>
                </View>

                <View style={styles.payrollChildProp}>

                    <View style={styles.titleCont}>
                        <Text style={styles.txtDefault}>First Period</Text>
                    </View>
                    <View style={[styles.propContTxt, styles.adjustChildProp]}>
                        <Text style={styles.txtDefault}>
                            {this.state._payrolldata.data.semimonthly.firstperiod.value}
                        </Text>
                    </View>

                </View>

                <View style={styles.payrollChildProp}>

                    <View style={styles.titleCont}>
                        <Text style={styles.txtDefault}>Second Period</Text>
                    </View>
                    <View style={[styles.propContTxt, styles.adjustChildProp]}>
                        <Text style={styles.txtDefault}>
                            {this.state._payrolldata.data.semimonthly.secondperiod.value}
                        </Text>
                    </View>

                </View>

            </View>

        const monthlyView = 
        <View style={styles.payrollSchedCont}>
            <View style={styles.payrollChildProp}>
                <View style={styles.titleCont}>
                    <Text style={styles.txtDefault}>Pay Day </Text>
                </View>
                <View style={[styles.propContChild, styles.adjustChildProp]}>
                    <Picker
                        mode='dropdown'
                        style={styles.pickerStyle}
                        selectedValue={this.state._payrolldata.data.semimonthly.firstpayday.value}
                        onValueChange={(itemValue, itemIndex) => {this._setFirstPayDay(itemValue)}}>
                        {
                            this.state._payrolldata.data.semimonthly.firstpayday.options.map((paytype, index) => (
                                <Picker.Item key={index} label={paytype} value={paytype} />
                            ))
                        }
                    </Picker>
                </View>
            </View>

            <View style={styles.payrollChildProp}>

                <View style={styles.titleCont}>
                    <Text style={styles.txtDefault}>Second Pay Day</Text>
                </View>
                <View style={[styles.propContTxt, styles.adjustChildProp]}>
                    <Text style={styles.txtDefault}>
                        {this.state._payrolldata.data.semimonthly.secondpayday.value}
                    </Text>
                </View>

            </View>
            
            <View style={styles.payrollChildProp}>
                <View style={styles.titleCont}>
                    <Text style={styles.txtDefault}>Cut-off</Text>
                </View>
                <View style={[styles.propContChild, styles.adjustChildProp]}>
                    <Picker
                        mode='dropdown'
                        style={styles.pickerStyle}
                        selectedValue={this.state._payrolldata.data.semimonthly.cutoff.value}
                        onValueChange={(itemValue, itemIndex) => {this._setCutOff(itemValue)}}>
                        {
                            this.state._payrolldata.data.semimonthly.cutoff.options.map((paytype, index) => (
                                <Picker.Item key={index} label={paytype} value={paytype} />
                            ))
                        }
                    </Picker>
                </View>
            </View>

            <View style={styles.payrollChildProp}>

                <View style={styles.titleCont}>
                    <Text style={styles.txtDefault}>First Period</Text>
                </View>
                <View style={[styles.propContTxt, styles.adjustChildProp]}>
                    <Text style={styles.txtDefault}>
                        {this.state._payrolldata.data.semimonthly.firstperiod.value}
                    </Text>
                </View>

            </View>

            <View style={styles.payrollChildProp}>

                <View style={styles.titleCont}>
                    <Text style={styles.txtDefault}>Second Period</Text>
                </View>
                <View style={[styles.propContTxt, styles.adjustChildProp]}>
                    <Text style={styles.txtDefault}>
                        {this.state._payrolldata.data.semimonthly.secondperiod.value}
                    </Text>
                </View>

            </View>

        </View>
        
        return(
            <View style={styles.container}>
                <ScrollView>
                    <CustomCard title={title_Payroll} oType='Text'>
                        <View style={[styles.contentCont, styles.customBottomBorder]}>
                            <View style={styles.titleCont}>
                                <Text style={styles.txtPropTitle}>Payroll Type </Text>
                            </View>
                            <View style={styles.propCont}>
                                <Picker
                                    mode='dropdown'
                                    style={styles.pickerStyle}
                                    selectedValue={this.state._payrolldata.paytype.value}
                                    onValueChange={(itemValue, itemIndex) => {this._setActivePaytype(itemValue)}}>
                                    {
                                        this.state._payrolldata.paytype.options.map((paytype, index) => (
                                            <Picker.Item key={index} label={paytype} value={paytype} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.subContentCont}>
                            <View style={styles.titleCont}>
                                <Text style={styles.txtPropTitle}>Payroll Schedule </Text>
                            </View>
                        </View>
                        
                        {this.state._payrolldata.paytype.value.toUpperCase() == 
                            'SEMI-MONTHLY' ? 
                            semimonthlyView :
                            null
                        }

                        {this.state._payrolldata.paytype.value.toUpperCase() == 
                            'MONTHLY' ? 
                            monthlyView :
                            null
                        }

                        {this.state._payrolldata.paytype.value.toUpperCase() == 
                            'WEEKLY' ? 
                            weekylyView :
                            null
                        }
                            

                    </CustomCard>
                </ScrollView>
            </View>
        );
    }
}