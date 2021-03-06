import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Picker,
    RefreshControl,
    TouchableOpacity,
    DatePickerAndroid
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
import { connect } from 'react-redux';
import * as payrollSelector from '../data/payroll/selector';
import * as payrollActions from '../data/payroll/actions';
import { bindActionCreators } from 'redux';

//API
import * as payrollApi from '../data/payroll/api';

//Custom Components
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import SavePrompt from '../../../components/SavePrompt';
import MessageBox from '../../../components/MessageBox';

//Helper
import * as oHelper from '../../../helper/';
import { CONSTANTS } from '../../../constants/index';

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
        oData.firstpayday.value=''+value;
        oData.secondpayday.value=''+dSecondPayDay;
        oData.firstperiod.value=arrCutOff[0];
        oData.secondperiod.value=arrCutOff[1];
        
        //Set New Values
        this.setState({
            _data: oData
        },
            () => this.props.change()
        )
    }

    _setCutOff = (value) => {
        let arrCutOff = this._calculatePeriod(
            this.state._data.firstpayday.value,
            this.state._data.secondpayday.value,
            value
        );
        
        let oData = {...this.state._data};
        oData.cutoff.value=''+value;
        oData.firstperiod.value = arrCutOff[0];
        oData.secondperiod.value = arrCutOff[1];

        this.setState({
            _data: oData,
        },
            () => this.props.change()
        )
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


        let firstPeriod = xFirstPeriod + '-' + yFirstPeriod;
        let secondperiod = xSecondPeriod + '-' + ySecondPeriod;

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
        console.log('xxxxxxxxxxxxx______REDERING PAYROLL');
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
                        contentType={this.props.disabledMode ? 'TEXT' : null}
                        content={
                            this.props.disabledMode ? 
                                this.state._data.firstpayday.value
                            :
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
                        hideBorder={this.state._disabledMode}
                    />

                    <PropLevel2 
                        name='Second Pay Day'
                        content={this.state._data.secondpayday.value}
                        contentType='Text'
                    />

                    <PropLevel2 
                        name='Cut-off'
                        contentType={this.props.disabledMode ? 'TEXT' : null}
                        content={
                            this.props.disabledMode ? 
                                this.state._data.cutoff.value
                            :
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
                        hideBorder={this.state._disabledMode}
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
        oData.payday.value=''+value;
        oData.period.value=arrCutOff;

        //Set New Values
        this.setState({
            _data: oData
        },
            () => this.props.change()
        )
    }

    _setCutOff = (value) => {
        let arrCutOff = this._calculatePeriod(
            this.state._data.payday.value,
            value
        );
        
        let oData = {...this.state._data};
        oData.cutoff.value=''+value;
        oData.period.value = arrCutOff;

        this.setState({
            _data: oData,
        },
            () => this.props.change()
        )
    }

    _calculatePeriod = (iPayDay, iCutOff) => {
        //X-FIRST PERIOD
        let xPeriod = parseInt(iPayDay) - parseInt(iCutOff) + 1;
        xPeriod = this._fixDayValue(xPeriod);

        let yPeriod = parseInt(iPayDay) - parseInt(iCutOff);
        yPeriod = this._fixDayValue(yPeriod);

        let period = xPeriod + '-' + yPeriod;

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
                        contentType={this.props.disabledMode ? 'TEXT' : null}
                        content={
                            this.props.disabledMode ? 
                                this.state._data.payday.value
                            :
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
                        hideBorder={this.state._disabledMode}
                    />

                    <PropLevel2 
                        name='Cut-off'
                        contentType={this.props.disabledMode ? 'TEXT' : null}
                        content={
                            this.props.disabledMode ? 
                                this.state._data.cutoff.value
                            :
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
                        hideBorder={this.state._disabledMode}
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
        },
            () => this.props.change()
        )
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
        },
            () => this.props.change()
        )
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

        let period = this._getDay(xPeriod, '') + '-' + this._getDay(yPeriod, '');

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
            return oHelper.capitalizeFirstLetter((days[value]).toLowerCase());
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
                        contentType={this.props.disabledMode ? 'TEXT' : null}
                        content={
                            this.props.disabledMode ? 
                                this.state._data.payday.value
                            :
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
                        hideBorder={this.state._disabledMode}
                        contentStyle={{width: 200}}
                    />
                    <PropLevel2 
                        name='Cut-off'
                        contentType={this.props.disabledMode ? 'TEXT' : null}
                        content={
                            this.props.disabledMode ? 
                                this.state._data.cutoff.value
                            :
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
                        hideBorder={this.state._disabledMode}
                        contentStyle={{width: 200}}
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

export class Payroll extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: [2, 'Loading...'],
            _payrolldata: {},
            _refreshing: false,
            _changeFlag: false,
            _disabledMode: this.props.viewOnly || false ,
            //Messagebox
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Local Prompt
            _transPrompt:{
                show: false,
                message: ''
            }
        }

        this._updatePayrollData = this._updatePayrollData.bind(this);
        this._undoPayrollData = this._undoPayrollData.bind(this);
        this._detectChanges = this._detectChanges.bind(this);
    }
    
    componentDidMount(){
        if(this.props.payroll.data){
            this._initValues();
        }
        else{
            this._getDataFromDB();
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(
            (this.state._status[0] != nextProps.payroll.status[0]) &&
            (nextProps.payroll.status[0] != 1)
        ){
            console.log('STATUS HAS CHANGED!')
            this.setState({ _status: nextProps.payroll.status })
        }

        if(
            (JSON.stringify(this.state._allData) !== JSON.stringify(nextProps.payroll.data)) &&
            (nextProps.payroll.status[0] == 1)
        ){
            this._initValues();
        }
    }

    _getDataFromDB = () => {
        this.props.actions.payroll.get({...this._requiredInputs(), transtype:'get'});
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
        this.setState({
            _status: CONSTANTS.STATUS.SUCCESS,
            _payrolldata: JSON.parse(JSON.stringify(payrollSelector.getPayrollData()))
        })
    }

    _setActivePaytype = (strActivePayType) => {
        let oData = {...this.state._payrolldata};
        oData.paytype.value = strActivePayType;
        this.setState({
            _payrolldata: oData,
        },
            () => {this._detectChanges()}
        );

    }

    _requestToChangePayType = (value) => {
        this.setState({
            _transPrompt: {show: true, message: 'Saving Payroll Policy changes. Please wait...'}
        });

        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'request',
            accesstoken: '',
            clientid: '',
        };

        let oStatus = [2, 'Loading...'];
        this.setState({
            _status: oStatus
        });

        payrollApi.changeRequest(oInput)
        .then((response) => response.json())
        .then((res) => {
            console.log('INPUT: ' + JSON.stringify(oInput))
            console.log('OUTPUT: ' + JSON.stringify(res));
            this.setState({
                _transPrompt: {show: false}
            });
            switch(''+res.flagno){
                case '0':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'error',
                        _resMsg: res.message
                    })
                    break;
                case '1':
                    this.setState({_status: [1, '']})
                    this._setActivePaytype(value);
                    break;
                case '2':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'warning',
                        _resMsg: res.message
                    })
                    break;
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

    _updatePayrollData = () => {
        this.setState({
            _transPrompt: {show: true, message: 'Saving Payroll Policy changes. Please wait...'}
        });

        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'update',
            accesstoken: '',
            clientid: '',
            payrolldata: this.state._payrolldata
        };

        payrollApi.update(oInput)
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                _transPrompt: {show: false}
            });
            console.log('UPDATE-INPUT: '+ JSON.stringify(this.state._payrolldata))
            console.log('UPDATE-RESPONSE: '+ JSON.stringify(res))
            switch(res.flagno){
                case '0':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'error',
                        _resMsg: res.message
                    })
                    break;
                case '1':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'success',
                        _resMsg: res.message,
                        _changeFlag: false,
                        _disabledMode: true
                    });
                    
                    this.props.actions.payroll.update(res);
                    break;
                case '2':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'warning',
                        _resMsg: res.message
                    })
                    break;
                default: 
                    break;
            }
        })

        .catch((exception) => {
            this.setState({
                _transPrompt: false,
                _msgBoxShow: true,
                _msgBoxType: 'error',
                _resMsg: exception.message
            })
        });
    }

    _undoPayrollData = () => {
        this._initValues([1,'']);
        this.setState({_changeFlag: false})
    }

    _detectChanges = () => {
        /* console.log('this.state._payrolldata: ' + JSON.stringify(this.state._payrolldata.data.semimonthly))
        console.log('payrollSelector.getPayrollData()): ' + JSON.stringify(payrollSelector.getPayrollData()))
        console.log('this.state._payrolldata: ' + JSON.stringify(this.state._payrolldata)) */
        if(JSON.stringify(payrollSelector.getPayrollData()) !== JSON.stringify(this.state._payrolldata)){
            this.setState({_changeFlag: true})
        }else{
            this.setState({_changeFlag: false})
        }
    }
    
    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }

    _editPayroll = () => {
        this.setState({
            _disabledMode: false
        })
    }

    _cancelEdit = () => {
        this.setState({
            _disabledMode: true
        })
    }

    _showDatePicker = async() => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              minDate: new Date(),
              date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                alert('year: ' + year + ', month: ' + month+1 + ', day: ' + day); 
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    } 

    render(){
        console.log('this.state._status: ' + JSON.stringify(this.state._status));
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Payroll Policy' onRefresh={this._getDataFromDB}/>
            );
        }
        else if(pProgress==1){
            /* console.log('VARCHECK: ' + JSON.stringify(this.state._payrolldata)); */
            let oPayrollSchedule;
            switch(this.state._payrolldata.paytype.value.toUpperCase()){
                case 'SEMI-MONTHLY':
                    oPayrollSchedule = (
                        <SemiMonthly 
                            change={this._detectChanges} 
                            data={this.state._payrolldata.data.semimonthly}
                            disabledMode={this.state._disabledMode}
                        />);
                    break;
                case 'MONTHLY':
                    oPayrollSchedule = (
                        <Monthly 
                            change={this._detectChanges} 
                            data={this.state._payrolldata.data.monthly}
                            disabledMode={this.state._disabledMode}
                        />);
                    break;
                case 'WEEKLY':
                    oPayrollSchedule = (
                        <Weekly 
                            change={this._detectChanges} 
                            data={this.state._payrolldata.data.weekly}
                            disabledMode={this.state._disabledMode}
                        />);
                    break;
                default:
                    //Display an error
                    break;
            }
            return(
                <View style={styles.container}>
                    { this.state._transPrompt.show ?
                        <PromptScreen.PromptGeneric show= {this.state._transPrompt.show} title={this.state._transPrompt.message}/>
                        : null
                    }
                    {
                        this.state._changeFlag ?
                            <SavePrompt saveAction={this._updatePayrollData} undoAction={this._undoPayrollData}/>
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
                        <CustomCard title={this.props.title || title_Payroll} oType='TEXT'>
                            <PropLevel1 
                                name='Payroll Type' 
                                content={
                                    this.state._disabledMode ? 
                                        <Text style={styles.txtDisabledValue}>{this.state._payrolldata.paytype.value}</Text>
                                    :
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state._payrolldata.paytype.value}
                                            onValueChange={(itemValue, itemIndex) => {this._requestToChangePayType(itemValue)}}>
                                            {
                                                this.state._payrolldata.paytype.options.map((paytype, index) => (
                                                    <Picker.Item key={index} label={paytype} value={paytype} />
                                                ))
                                            }
                                        </Picker> 
                                }
                                hideBorder={this.state._disabledMode}
                            />
                            { oPayrollSchedule }

                            {/* <PropTitle name='First Payroll Day Schedule'/> */}

                            <PropLevel2 
                                name={'First Payroll Date'}
                                content={
                                    <Text 
                                        /* disabled={((!this.props.activeData.schedule[index].editable) || this.props.disabledMode)} */
                                        onPress={this._showDatePicker}
                                        style={{color: '#434646', 
                                            height: '100%', 
                                            textAlignVertical: 'center',
                                        }}>
                                        TEMP
                                    </Text>
                                }
                                hideBorder={false}
                                contentStyle={{
                                    paddingLeft: 15,
                                    justifyContent: 'center',
                                    width: 200
                                }}
                            />

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
        payroll: state.companyPoliciesReducer.payroll
        
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            payroll: bindActionCreators(payrollActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payroll)