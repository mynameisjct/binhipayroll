import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Picker,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Styles and Behavior
import CustomCard, 
    {
        PropTitle,
        PropLevel1, 
        PropLevel2
    } 
from '../../../components/CustomCards';
import styles from './styles'

//Redux
import * as payrollSelector from '../data/payroll/selector';

const title_Payroll = 'Set Payroll Rules and Schedule';

export class SemiMonthly extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: 2,
            _data: {}
        }
    }
    
    componentDidMount = () => {
        this.setState({
            _status: 1,
            _data: this.props.data
        })
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
                    <PropTitle name='Payroll Schedule'/>
                    <PropLevel2 
                        name='First Pay Day'
                        content={
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
                        }
                    />
                    <PropLevel2 
                        name='Second Pay Day'
                        content={this.state._data.secondpayday.value}
                        contentType='Text'
                    />
                    <PropLevel2 
                        name='Cut-off'
                        content={
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
                        }
                    />
                    <PropLevel2 
                        name='First Period'
                        content={this.state._data.firstperiod.value}
                        contentType='Text'
                    />
                    <PropLevel2 
                        name='Second Period'
                        content={this.state._data.secondperiod.value}
                        contentType='Text'
                    />
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
                    <PropTitle name='Payroll Schedule'/>
                    <PropLevel2 
                        name='Pay Day'
                        content={
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
                        }
                    />

                    <PropLevel2 
                        name='Cut-off'
                        content={
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
                        }
                    />

                    <PropLevel2 
                        name='Period'
                        content={this.state._data.period.value}
                        contentType='Text'
                    />
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

/*         console.log('iPayDay: ' + iPayDay);
        console.log('iCutOff: ' + iCutOff);
        console.log('tempDay: ' + tempDay);
        console.log('tempCutOff: ' + tempCutOff);
        console.log('xPeriod: ' + xPeriod);
        console.log('yPeriod: ' + yPeriod); */

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
                    <PropTitle name='Payroll Schedule'/>
                    <PropLevel2 
                        name='Pay Day'
                        content={
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
                        }
                        contentStyle={{width: 150}}
                    />
                    <PropLevel2 
                        name='Cut-off'
                        content={
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
                        }
                        contentStyle={{width: 150}}
                    />

                    <PropLevel2 
                        name='Period'
                        content={this.state._data.period.value}
                        contentType='Text'
                        contentStyle={{width: 200}}
                    />
    
                </View>
            );
        }
    }
}

export default class Payroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: [2, 'Loading...'],
            _payrolldata: {},
            _refreshing: false
        }
    }
    
    componentDidMount(){
        if(this.props.status[0]==1){
            this._initValues(this.props.status);
        }

        this.setState({
            _status: [...this.props.status]
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.status[0]){
            if(nextProps.status[0]==1){
                this._initValues(nextProps.status);
            }
        }
    }

    _initValues = (status) => {
        this.setState({
            _status: status,
            _payrolldata: JSON.parse(JSON.stringify(payrollSelector.getPayrollData()))
        })
        console.log('JSON.stringify(payrollSelector.getPayrollData()): ' + JSON.stringify(payrollSelector.getPayrollData()))
    }

    _setActivePaytype = (strActivePayType) => {
        let oData = {...this.state._payrolldata};
        oData.paytype.value = strActivePayType;
        this.setState({
            _payrolldata: oData,
        });
    }

    render(){
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        if(pProgress == 0){
            return null;
        }
        else if(pProgress == 2){
            return null;
        }
        else{
            let oPayrollSchedule;
            switch(this.state._payrolldata.paytype.value.toUpperCase()){
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
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={() => this.props.triggerRefresh(true)}
                            />
                        }
                    >
                        <CustomCard title={title_Payroll} oType='Text'>
                            <PropLevel1 
                                name='Payroll Type' 
                                content={
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
                                }
                            />
                            { oPayrollSchedule }

                        </CustomCard>
                    </ScrollView>
                </View>
            );
        }
    }
}