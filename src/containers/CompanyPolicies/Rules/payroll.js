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

export class SemiMonthly extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: 2,
            _data: {}
        }
    }

    _setFirstPayDay = (value) => {
        //Calculate Second Pay Day
        let dSecondPayDay = 0;
        if(value>15){
            dSecondPayDay = parseInt(value) - 30 + 15
        }
        else{
            dSecondPayDay = parseInt(value) + 15
        }

        let oData = {...this.state._data};

        //Get New Period
        let arrCutOff = this._calculatePeriod(
            value,
            dSecondPayDay,
            this.state._data.cutoff.value
        );
        
        //Assign New Values
        oData.firstpayday.value=value;
        oData.secondpayday.value=dSecondPayDay;
        oData.firstperiod.value=arrCutOff[0];
        oData.secondperiod.value=arrCutOff[1];
        
        //Set New Values
        this.setState({
            _data: oData
        })
    }

    _setCutOff = (value) => {
        let arrCutOff = this._calculatePeriod(
            this.state._data.firstpayday.value,
            this.state._data.secondpayday.value,
            value
        );
        
        let oData = {...this.state._data};
        oData.cutoff.value=value;
        oData.firstperiod.value = arrCutOff[0];
        oData.secondperiod.value = arrCutOff[1];

        this.setState({
            _data: oData,
        })
    }

    _calculatePeriod = (iFirstPayDay, iSecondPayDay, iCutOff) => {
        //X-FIRST PERIOD
        let xFirstPeriod = parseInt(iSecondPayDay) - parseInt(iCutOff) + 1;
        xFirstPeriod = this._fixDayValue(xFirstPeriod);

        let yFirstPeriod = parseInt(iFirstPayDay) - parseInt(iCutOff);
        yFirstPeriod = this._fixDayValue(yFirstPeriod);

        let xSecondPeriod = parseInt(iFirstPayDay) - parseInt(iCutOff) +1;
        xSecondPeriod = this._fixDayValue(xSecondPeriod);

        let ySecondPeriod = parseInt(iSecondPayDay) - parseInt(iCutOff);
        ySecondPeriod = this._fixDayValue(ySecondPeriod);


        let firstPeriod = xFirstPeriod + ' - ' + yFirstPeriod;
        let secondperiod = xSecondPeriod + ' - ' + ySecondPeriod;

        return [firstPeriod, secondperiod]
    }

    //Function used in Period Calculation
    _fixDayValue = (value) => {
        let tempVal = value;
        if(tempVal>30){
            tempVal = tempVal - 30;
        }else if(tempVal<=0){
            tempVal = tempVal + 30;
        }
        return tempVal
    }

    componentDidMount = () => {
        this.setState({
            _status: 1,
            _data: {...this.props.data}
        })
    }

    render(){
        if(this.state._status == 0){
            return null;
        }
        else if(this.state._status == 2){
            return null;
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={styles.subContentCont}>
                        <View style={styles.titleCont}>
                            <Text style={styles.txtPropTitle}>Payroll Schedule </Text>
                        </View>
                    </View>
                    <View style={styles.payrollChildProp}>
                        <View style={styles.titleCont}>
                            <Text style={styles.txtDefault}>FirstPayDay</Text>
                        </View>
                        <View style={[styles.propContChild, styles.adjustChildProp]}>
                            <Picker
                                mode='dropdown'
                                style={styles.pickerStyle}
                                selectedValue={this.state._data.firstpayday.value}
                                onValueChange={(itemValue, itemIndex) => {this._setFirstPayDay(itemValue)}}>
                                {
                                    this.state._data.firstpayday.options.map((paytype, index) => (
                                        <Picker.Item key={index} label={paytype} value={paytype} />
                                    ))
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.payrollChildProp}>
                        <View style={styles.titleCont}>
                            <Text style={styles.txtDefault}>Second Payday</Text>
                        </View>
                        <View style={[styles.propContTxt, styles.adjustChildProp]}>
                            <Text style={styles.txtDefault}>
                                {this.state._data.secondpayday.value}
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
                                selectedValue={this.state._data.cutoff.value}
                                onValueChange={(itemValue, itemIndex) => {this._setCutOff(itemValue)}}>
                                {
                                    this.state._data.cutoff.options.map((paytype, index) => (
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
                                {this.state._data.firstperiod.value}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.payrollChildProp}>
                        <View style={styles.titleCont}>
                            <Text style={styles.txtDefault}>Second Period</Text>
                        </View>
                        <View style={[styles.propContTxt, styles.adjustChildProp]}>
                            <Text style={styles.txtDefault}>
                                {this.state._data.secondperiod.value}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

export class Monthly extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: 2,
            _data: {}
        }
    }

    componentDidMount = () => {
        this.setState({
            _data: this.props.data,
            _status: 1
        })
    }

    _setPayDay = (value) => {
        let oData = {...this.state._data};

        //Get New Period
        let arrCutOff = this._calculatePeriod(
            value,
            this.state._data.cutoff.value
        );
        
        //Assign New Values
        oData.payday.value=value;
        oData.period.value=arrCutOff;

        //Set New Values
        this.setState({
            _data: oData
        })
    }

    _setCutOff = (value) => {
        let arrCutOff = this._calculatePeriod(
            this.state._data.payday.value,
            value
        );
        
        let oData = {...this.state._data};
        oData.cutoff.value=value;
        oData.period.value = arrCutOff;

        this.setState({
            _data: oData,
        })
    }

    _calculatePeriod = (iPayDay, iCutOff) => {
        //X-FIRST PERIOD
        let xPeriod = parseInt(iPayDay) - parseInt(iCutOff) + 1;
        xPeriod = this._fixDayValue(xPeriod);

        let yPeriod = parseInt(iPayDay) - parseInt(iCutOff);
        yPeriod = this._fixDayValue(yPeriod);

        let period = xPeriod + ' - ' + yPeriod;

        return period;
    }

    //Function used in Period Calculation
    _fixDayValue = (value) => {
        let tempVal = value;
        if(tempVal>30){
            tempVal = tempVal - 30;
        }else if(tempVal<=0){
            tempVal = tempVal + 30;
        }
        return tempVal
    }


    render(){
        if(this.state._status == 0){
            return null;
        }
        else if(this.state._status == 2){
            return null;
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={styles.subContentCont}>
                        <View style={styles.titleCont}>
                            <Text style={styles.txtPropTitle}>Payroll Schedule </Text>
                        </View>
                    </View>
                    <View style={styles.payrollChildProp}>
                            <View style={styles.titleCont}>
                                <Text style={styles.txtDefault}>Pay Day</Text>
                            </View>
                            <View style={[styles.propContChild, styles.adjustChildProp]}>
                                <Picker
                                    mode='dropdown'
                                    style={styles.pickerStyle}
                                    selectedValue={this.state._data.payday.value}
                                    onValueChange={(itemValue, itemIndex) => {this._setPayDay(itemValue)}}>
                                    {
                                        this.state._data.payday.options.map((paytype, index) => (
                                            <Picker.Item key={index} label={paytype} value={paytype} />
                                        ))
                                    }
                                </Picker>
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
                                    selectedValue={this.state._data.cutoff.value}
                                    onValueChange={(itemValue, itemIndex) => {this._setCutOff(itemValue)}}>
                                    {
                                        this.state._data.cutoff.options.map((paytype, index) => (
                                            <Picker.Item key={index} label={paytype} value={paytype} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.payrollChildProp}>
                            <View style={styles.titleCont}>
                                <Text style={styles.txtDefault}>Period</Text>
                            </View>
                            <View style={[styles.propContTxt, styles.adjustChildProp]}>
                                <Text style={styles.txtDefault}>
                                    {this.state._data.period.value}
                                </Text>
                            </View>
                        </View>
                </View>
            );
        }
    }
}

export class Weekly extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: 2,
            _data: {}
        }
    }

    componentDidMount = () => {
        this.setState({
            _data: this.props.data,
            _status: 1
        })
    }

    _setPayDay = (value) => {
        let oData = {...this.state._data};

        //Get New Period
        let arrPeriod = this._calculatePeriod(
            value,
            this.state._data.cutoff.value
        );
        
        //Assign New Values
        oData.payday.value=value;
        oData.period.value=arrPeriod;

        //Set New Values
        this.setState({
            _data: oData
        })
    }

    _setCutOff = (value) => {
        let arrPeriod = this._calculatePeriod(
            this.state._data.payday.value,
            value
        );
        
        let oData = {...this.state._data};
        oData.cutoff.value=value;
        oData.period.value = arrPeriod;

        this.setState({
            _data: oData,
        })
    }

    _calculatePeriod = (iPayDay, iCutOff) => {
        let tempDay = this._getDay(iPayDay, 'INDEX');
        let tempCutOff = this._getDay(iCutOff, 'INDEX')

        let xPeriod = parseInt(tempDay) - (parseInt(tempDay) - parseInt(tempCutOff)) + 1;
        xPeriod = this._fixDayValue(xPeriod);

        let yPeriod = parseInt(tempDay) -  (parseInt(tempDay) - parseInt(tempCutOff));
        yPeriod = this._fixDayValue(yPeriod);

        
        
        console.log('iPayDay: ' + iPayDay);
        console.log('iCutOff: ' + iCutOff);
        console.log('tempDay: ' + tempDay);
        console.log('tempCutOff: ' + tempCutOff);
        console.log('xPeriod: ' + xPeriod);
        console.log('yPeriod: ' + yPeriod);

        let period = this._getDay(xPeriod, '') + ' - ' + this._getDay(yPeriod, '');

        return period;
    }

    _fixDayValue = (value) => {
        let tempVal = value;
        if(tempVal>6){
            tempVal = tempVal - 7;
        }else if(tempVal<=-1){
            tempVal = tempVal + 7;
        }
        return tempVal
    }

    //Function used in Period Calculation
    _getDay = (value, strType) => {
        let days = [
            'SUNDAY', 
            'MONDAY', 
            'TUESDAY', 
            'WEDNESDAY', 
            'THURSDAY', 
            'FRIDAY', 
            'SATURDAY'];
        if (strType.toUpperCase() == 'INDEX'){
            return days.indexOf(value.toUpperCase());
        }
        else{
            return days[value];
        }
        
    }

    render(){
        if(this.state._status == 0){
            return null;
        }
        else if(this.state._status == 2){
            return null;
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={styles.subContentCont}>
                        <View style={styles.titleCont}>
                            <Text style={styles.txtPropTitle}>Payroll Schedule </Text>
                        </View>
                    </View>
                    <View style={styles.payrollChildProp}>
                            <View style={styles.titleCont}>
                                <Text style={styles.txtDefault}>Pay Day</Text>
                            </View>
                            <View style={[styles.propContChild, styles.adjustChildProp, {width: 150}]}>
                                <Picker
                                    mode='dropdown'
                                    style={styles.pickerStyle}
                                    selectedValue={this.state._data.payday.value}
                                    onValueChange={(itemValue, itemIndex) => {this._setPayDay(itemValue)}}>
                                    {
                                        this.state._data.payday.options.map((paytype, index) => (
                                            <Picker.Item key={index} label={paytype} value={paytype} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.payrollChildProp}>
                            <View style={styles.titleCont}>
                                <Text style={styles.txtDefault}>Cut-off</Text>
                            </View>
                            <View style={[styles.propContChild, styles.adjustChildProp, {width: 150}]}>
                                <Picker
                                    mode='dropdown'
                                    style={styles.pickerStyle}
                                    selectedValue={this.state._data.cutoff.value}
                                    onValueChange={(itemValue, itemIndex) => {this._setCutOff(itemValue)}}>
                                    {
                                        this.state._data.cutoff.options.map((paytype, index) => (
                                            <Picker.Item key={index} label={paytype} value={paytype} />
                                        ))
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.payrollChildProp}>
                            <View style={styles.titleCont}>
                                <Text style={styles.txtDefault}>Period</Text>
                            </View>
                            <View style={[styles.propContTxt, styles.adjustChildProp, {width: 200}]}>
                                <Text style={styles.txtDefault}>
                                    {this.state._data.period.value}
                                </Text>
                            </View>
                        </View>
                </View>
            );
        }
    }
}

export default class Payroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: 2,
            _activePayrollType: '',
            
            _payrolldata: {
                paytype:{
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
                            options:["0","1","2","3","4","5","6","7","8","9","10"]
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
                            options:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
                        },
                        period:{
                            value:"25-26"
                        },
                    },

                    weekly:{
                        payday:{
                            value: "Friday",
                            options: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        },
                        cutoff:{
                            value:"Thursday",
                            options:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                        },
                        period:{
                            value:"Wednesday-Thursday"
                        },
                    }, 
                }
            }
        }
    }
    
    componentDidMount = () => {
        this.setState({
            _activePayrollType: this.state._payrolldata.paytype.value.toUpperCase(),
            _status: 1
        })
    }

    _setActivePaytype = (strActivePayType) => {
        let oData = {...this.state._payrolldata};
        oData.paytype.value = strActivePayType;
        this.setState({
            _payrolldata: oData,
            _activePayrollType: strActivePayType.toUpperCase()
        });
    }

    render(){
        if(this.state._status == 0){
            return null;
        }
        else if(this.state._status == 2){
            return null;
        }
        else{
            let oPayrollSchedule;
            switch(this.state._activePayrollType){
                case 'SEMI-MONTHLY':
                    oPayrollSchedule = (<SemiMonthly data={this.state._payrolldata.data.semimonthly}/>);
                    break;
                case 'MONTHLY':
                    oPayrollSchedule = (<Monthly data={this.state._payrolldata.data.monthly}/>);
                    break;
                case 'WEEKLY':
                    oPayrollSchedule = (<Weekly data={this.state._payrolldata.data.weekly}/>);
                    break;
                default:
                    //Display an error
                    break;
            }
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

                            { oPayrollSchedule }

                        </CustomCard>
                    </ScrollView>
                </View>
            );
        }
    }
}