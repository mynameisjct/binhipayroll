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
    RefreshControl,
    TouchableNativeFeedback,
    ToastAndroid,
    FlatList,
    CheckBox,
    DatePickerAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles'

//Redux
import { connect } from 'react-redux';
import * as bonusSelector from '../data/bonus/selector';
import * as bonusActions from '../data/bonus/actions';
import { bindActionCreators } from 'redux';

//API
import * as bonusApi from '../data/bonus/api';

//Custom Components
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

//Helper
import * as oHelper from '../../../helper';
import { CONSTANTS } from '../../../constants/index';

//Class Constants
const switch_loading_message = 'Switching 13th Month Pay Policy. Please wait...';
const add_loading_message = 'Saving New 13th Month Pay Schedule. Please wait...';
const update_loading_message = 'Saving 13th Month Pay Policy Changes. Please wait...';

const expiry_loading_message = 'Updating Leave Expiry Rule. Please wait...';

const title_Bonus = '13th Month Pay';
const description_Bonus = 'Allow and Schedule';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';
const UNKNOWNERROR = 'Unable to commit changes. An Unknown Error has been encountered. Contact BINHI-MeDFI.';

class BonusForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            _strInstallments: ''+this.props.activeData.installments,
            _strCutoff: ''+this.props.activeData.cutoff
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.activeData.installments != this.state._strInstallments){
            this.setState({
                _strInstallments: ''+nextProps.activeData.installments
            })
        }
        if(nextProps.activeData.cutoff != this.state._strCutoff){
            this.setState({
                _strCutoff: ''+nextProps.activeData.cutoff
            })
        }
    }
    

    _setNumberOfInstallments = (value) => {
        if(Number.isInteger(Number(value))){
            if(value<=12){
                this.setState({
                    _strInstallments: value
                })
            }
            else{
                this._showToast('INSTALLMENT SHOULD NOT BE GREATER THAN 12');
            }
        }
        else{
            this._showToast('INSTALLMENT SHOULD BE A WHOLE NUMBER');
        }
    }

    _setCutoff = (value) => {
        if(Number.isInteger(Number(value))){
            if(value<=30){
                this.setState({
                    _strCutoff: value
                })
            }
            else{
                this._showToast('CUTOFF SHOULD NOT BE GREATER THAN 30 DAYS');
            }
        }
        else{
            this._showToast('CUTOFF SHOULD BE A WHOLE NUMBER');
        }
    }

    _updateInstallments = (value) => {
        if (value==''){
            value='0';
        }
        this.setState({
            _strInstallments: value
        })
        this.props.updateInstallments(value);
    }

    _updateCutoff = (value) => {
        if (value==''){
            value='0';
        }
        this.setState({
            _strCutoff: value
        })
        this.props.updateCutoff(value);
    }

    _updateActiveRule = (id) => {
        this.props.updateActiveRule(id);
    }

    _showDatePicker = async(index) => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              minDate: new Date(Number(this.props.activeData.name), 0, 1),
              maxDate: new Date(Number(this.props.activeData.name), 11, 31),
              date: new Date(Number(this.props.activeData.name), 0, 1)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              this.props.updateSchedule(index,(month+1)+'/'+day+'/'+year)
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    } 

    _toggleSwitch = (value) => {
        this.props.toggleSwitch(value)
    }

    _showToast = (value) => {
        ToastAndroid.show(value, ToastAndroid.CENTER);
    }

    render(){
        console.log('this.props.viewOnly: ' + this.props.viewOnly)
        let pTitle = '';
        if(this.props.disabledMode){
            pTitle='13th Month Pay';
            oRightOption = (
                <Switch
                    disabled={false}
                    onValueChange={ (value) => {this._toggleSwitch(value)}} 
                    onTintColor={color_SwitchOn}
                    thumbTintColor={color_SwitchThumb}
                    tintColor={color_SwitchOff}
                    value={ this.props.allData.enabled }
                />
            );
            oRightOptionType = 'Switch';
            strTitle = pTitle;
            
            //Rule Name
            oRuleName = (
                <Picker
                    mode='dropdown'
                    style={styles.pickerStyle}
                    selectedValue={this.props.activeData.id}
                    onValueChange={(itemValue, itemIndex) => {this._updateActiveRule(itemValue)}}>
                    {
                        this.props.allData.data.map((data, index) => (
                            <Picker.Item key={index} label={data.name} value={data.id} />
                        ))
                    }
                </Picker>
            );
        }
        else{
            if(this.props.activeData.id == ''){
                pTitle='Add New 13th Month Pay Schedule';
            }   
            else{
                pTitle='Modify 13th Month Pay Schedule';
            }
            pType='Text';
            oRightOption = (
                <View style={styles.btnRightCont}>
                    <TouchableOpacity 
                        disabled={false}
                        style={styles.btnCancel}
                        activeOpacity={0.6}
                        onPress={() => {this.props.cancelEdit()}}>
                        <Text style={styles.txtBtn}>CANCEL</Text>
                    </TouchableOpacity>
                    <View style={{width: 10}}></View>
                    <TouchableOpacity 
                        disabled={this.props.disabledMode}
                        style={styles.btnSave}
                        activeOpacity={0.6}
                        onPress={() => {this.props.saveRule()}}>
                        <Text style={styles.txtBtn}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            );
            oRightOptionType = 'BUTTON';
            strTitle = pTitle;
            oRuleName = (
                <TextInput 
                    autoCapitalize='none'
                    editable={this.props.disabledMode}
                    placeholder='Rule Name'
                    style={{color: '#434646', paddingLeft: 10, height: '100%'}}
                    onChangeText={(text) => {/* this.props.updateRuleName(text) */}}
                    value={this.props.activeData.name}
                    returnKeyType="done"
                    underlineColorAndroid='transparent'
                />
            );
        }

        return(
            <CustomCard 
                title={pTitle} 
                description={description_Bonus} 
                oType={oRightOptionType}
                rightHeader={
                    this.props.viewOnly || false ?
                        <Text style={styles.txtSwitchViewOnly}>
                            {this.props.allData.enabled ? 'ON' : 'OFF'}
                        </Text>
                    :
                        oRightOption
                }>

                { 
                    this.props.allData.enabled ?
                        <View>
                            <PropLevel1 
                                name='Year'
                                content={
                                    oRuleName
                                }
                                
                                hideBorder={!this.props.disabledMode}
                                contentStyle={{
                                    width: 130
                                }}
                            />

                            <PropTitle name='Installments'/>
                                
                            <PropLevel2 
                                name='Number of Installments'
                                content={
                                    <TextInput 
                                        editable={!this.props.disabledMode}
                                        autoCapitalize='none'
                                        keyboardType='numeric'
                                        placeholder=''
                                        onBlur={() => {
                                            this._updateInstallments(this.state._strInstallments);
                                        }}
                                        style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                        onChangeText={inputTxt =>  {
                                            this._setNumberOfInstallments(inputTxt)
                                        }}
                                        value={this.state._strInstallments}
                                        returnKeyType="done"
                                        underlineColorAndroid='transparent'
                                    />
                                }
                                hideBorder={this.props.disabledMode}
                                contentStyle={{
                                    width: 75
                                }}
                            />

                            <PropLevel2 
                                name='Cutoff'
                                content={
                                    <TextInput 
                                        editable={!this.props.disabledMode}
                                        autoCapitalize='none'
                                        keyboardType='numeric'
                                        placeholder=''
                                        onBlur={() => {
                                            this._updateCutoff(this.state._strCutoff);
                                        }}
                                        style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                        onChangeText={inputTxt =>  {
                                            this._setCutoff(inputTxt)
                                        }}
                                        value={this.state._strCutoff}
                                        returnKeyType="done"
                                        underlineColorAndroid='transparent'
                                    />
                                }
                                hideBorder={this.props.disabledMode}
                                contentStyle={{
                                    width: 75
                                }}
                            />

                            <PropTitle name='Payment Schedule'/>
                            
                            {
                                this.state._strInstallments == 0 ?
                                    <PropLevel2 
                                    name={'NOT AVAILABLE'}
                                    content={
                                        null
                                    }
                                    placeHolderStyle={{width: 300}}
                                    hideBorder={true}
                                />
                                : null
                            }

                            { 
                                [...Array(Number(this.state._strInstallments))].map((x, index) =>
                                    <PropLevel2 
                                        key={index}
                                        name={'Payment ' + Number(index + 1)}
                                        content={
                                            <Text 
                                                disabled={((!this.props.activeData.schedule[index].editable) || this.props.disabledMode)}
                                                onPress={() => {this._showDatePicker(index)}}
                                                style={{color: '#434646', 
                                                    height: '100%', 
                                                    textAlignVertical: 'center',
                                                }}>
                                                {this.props.activeData.schedule[index].date.label}
                                            </Text>
                                        }
                                        hideBorder={((!this.props.activeData.schedule[index].editable) || this.props.disabledMode)}
                                        contentStyle={{
                                            paddingLeft: 15,
                                            justifyContent: 'center',
                                            width: 200
                                        }}
                                    />
                                  )
                            }
                            
                        </View>
                    :   
                        <Description 
                        enabled={this.props.allData.description.enabled}
                        disabled={this.props.allData.description.disabled}/>
                }

            </CustomCard>
        )
    }
}

export class Bonus extends Component{
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

            //Local States
            _allData: null,
            _activeData: null
        }
    }

    componentDidMount(){
        if(this.props.bonus.data){
            this._initValues();
        }
        else{
            this._getDataFromDB();
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(
            (this.state._status[0] != nextProps.bonus.status[0]) &&
            (nextProps.bonus.status[0] != 1)
        ){
            console.log('STATUS HAS CHANGED!')
            this.setState({ _status: nextProps.bonus.status })
        }

        if(
            (JSON.stringify(this.state._allData) !== JSON.stringify(nextProps.bonus.data)) &&
            (nextProps.bonus.status[0] == 1)
        ){
            this._initValues();
        }
    }

    _getDataFromDB = () => {
        this.props.actions.bonus.get({...this._requiredInputs(), transtype:'get'});
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
        let oAllData = JSON.parse(JSON.stringify(bonusSelector.getAllData()));
        let oActiveData = JSON.parse(JSON.stringify(bonusSelector.getDefaultActiveData()));        

        this.setState({
            _allData: oAllData,
            _activeData: oActiveData,
            _disabledMode: true,
            _status: CONSTANTS.STATUS.SUCCESS
        })
    }

    _toggleSwitch = async(value) => {
        let oAllData = {...this.state._allData};
        let bFlag = true;
        let bSuccess = false;
        let strTransType = '';
        let strLoading = switch_loading_message;

        if(bFlag){
            bSuccess = await this._toggleSwitchToDB(value, strLoading);
            if(bSuccess){
                //Update Data from store
                oAllData.enabled = value;
                this._updateAllData(oAllData);
            }
        }
    }

    _toggleSwitchToDB = async ( value, strLoading) => {
        let bFlag = false;
        this._showLoadingPrompt(strLoading);

        let oInput = this._requiredInputs();
        oInput.enabled = value
        oInput.transtype = 'request';

        console.log('oInput: ' + JSON.stringify(oInput));
        await bonusApi.toggleSwitch(oInput)
            .then((response) => response.json())
            .then((res) => {
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }

    _updateInstallments = (value) => {
        /* console.log('========_updateInstallment: ' + value); */
        /* let oAllData = {...this.state._allData}; */
        let oActiveData = {...this.state._activeData};

        oActiveData.installments = value;
/*         let objIndex = oAllData.data.findIndex((obj => obj.id == this.state._activeData.id));
        oAllData.data[objIndex] = oActiveData; */
        /* console.log('========oActiveData: ' + JSON.stringify(oActiveData));
        console.log('========oAllData: ' + JSON.stringify(oAllData)); */
        this._updateActiveData(oActiveData);
    }

    _updateCutoff = (value) => {
        let oActiveData = {...this.state._activeData};
        oActiveData.cutoff = value;
        this._updateActiveData(oActiveData);
    }

    _updateActiveRule = (id) => {
        console.log('=====_updateActiveRule: ' + id);
        let oActiveData = JSON.parse(JSON.stringify(bonusSelector.getRuleFromID(id)));
        console.log('=====oActiveData: ' + JSON.stringify(oActiveData));
        this.setState({
            _activeData: oActiveData
        })
    }
    
    _addNewSchedule = () => {
        
        let oActiveData = {
            id: '',
            name: String(Number(this._getMaxYear()) + 1),
            default: false,
            editable: true,
            installments: "1",
            cutoff: "5",
            schedule:[]
        }

        for(i=1; i<=12; i++){
            oActiveData.schedule.push({
                "index":String(i),
                "date":{
                    "label":"Select Date",
                    "value":""
                },
                "editable": true
            })
        }

        this.setState({
            _activeData: {...oActiveData},
            _disabledMode: false
        })
    }

    _updateActiveData = (value) => {
        this.setState({
            _activeData: value
        })
    }

    _getMaxYear = () => {
        let res = Math.max.apply(Math,this.state._allData.data.map(function(o){return o.name;}))
        return res;
    }

    _updateAllData = (value) => {
        this.setState({
            _allData: value
        })
        this.props.actions.bonus.update(value);
    }

    _cancelEdit = () => {
        this.setState({
            _disabledMode: true
        })
        this._initValues();
    }

    _modifySelectedYear = () => {
        if(this.state._activeData.editable){
            this.setState({_disabledMode: false})
        }
        else{
            this._showMsgBox('error-ok', 'You cannot anymore modify 13th Month Pay Schedule for the year ' + this.state._activeData.name + '.')
        }
    }

    _updateSchedule = (index, value) => {
        let strTextDate = oHelper.convertDateToString(value,"MMMM DD, dddd");
        oActiveData = {...this.state._activeData}
        oActiveData.schedule.map((x,i) => i == index ? (x.date.value=value, x.date.label=strTextDate) : null)

        console.log('index: ' + index);
        console.log('value: ' + value);
        console.log('strTextDate: ' + strTextDate);
        console.log('oActiveData.schedule: ' + JSON.stringify(oActiveData.schedule));
        
        this.setState({
            _activeData: oActiveData
        })
    }

    _saveRule = () => {
        let oAllData = {...this.state._allData}
        let oActiveData = JSON.parse(JSON.stringify(this.state._activeData));
        let oSchedule = oActiveData.schedule;
        //Clear Unused Leaves
        let iLen = oActiveData.installments;
        console.log('iLen: ' + iLen);
        oSchedule.splice(iLen);
        console.log('oSchedule: ' + JSON.stringify(oSchedule));
        let bSuccess = false;
        let strTransType = 'update';
        let strLoading = update_loading_message;
        if(oActiveData.id==''){
            strTransType='add';
            strLoading = add_loading_message;
        }

        bSuccess = this._saveRuleToDB(strTransType, oActiveData, strLoading);
    }

    _saveRuleToDB = async(strTransType, value, strLoading) => {
        let bFlag = false;
        this._showLoadingPrompt(strLoading);

        let oInput = this._requiredInputs();
        oInput.data = value;
        oInput.transtype = strTransType;

        console.log('oInput: ' + JSON.stringify(oInput));
        await bonusApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno==1){
                    this._updateDataFromRuleChanges(res);
                }
                
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }

    _updateDataFromRuleChanges = (res) => {
        let oAllData = {...this.state._allData};
        let oActiveData = {...this.state._activeData};
        if(oActiveData.id!=''){
            oActiveData.id = res.id;
            oAllData.data.push(oActiveData);
        }
        else{
            oAllData.data.map((x, index) => {
                if(x.id == oActiveData.id){
                    oAllData.data[index].name = oActiveData.name;
                    oAllData.data[index].default = oActiveData.default;
                    oAllData.data[index].editable = oActiveData.editable;
                    oAllData.data[index].installments = oActiveData.installments;
                    oAllData.data[index].cutoff = oActiveData.cutoff;
                    oAllData.data[index].schedule = oActiveData.schedule;
                }
            })
        }

        this._updateAllData(oAllData);
    }
  
    //Default Functions

    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            accesstoken: '',
            clientid: ''
        })
    }
    _evaluateResponse = (res) => {
        switch (res.flagno){
            case 0:
                this._showMsgBox('error-ok', res.message);
                return false
                break;
            case 1:
                this._showMsgBox('success', res.message);
                return true;
                break;
            default:
                this._showMsgBox('error-ok', UNKNOWNERROR);
                return false
                break;
        }
    }

    _showLoadingPrompt = (msg) => {
        this.setState({
            _promptMsg: msg,
            _promptShow: true
        })
    }

    _showMsgBox = (strType, msg) => {
        this.setState({
            _msgBoxShow: true,
            _msgBoxType: strType,
            _resMsg: msg
        });
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }

    _hideLoadingPrompt = () => {
        this.setState({
            _promptShow: false
        })
    }
    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }

    _onFormClose = () => {
        this.setState({
            _bShowCompForm: false,
            _bShowGovForm: false
        })
    }

    render(){
        console.log('xxxxxxxxxxxxx______REDERING BONUS');
        console.log('======================this.state._status: ' + this.state._status);
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='13th Month Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
            );
        }

        else if(pProgress==1){
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
                        <BonusForm
                            viewOnly={this.props.viewOnly}
                            allData={this.state._allData}
                            activeData={this.state._activeData}
                            toggleSwitch={this._toggleSwitch}
                            updateInstallments={this._updateInstallments}
                            updateCutoff={this._updateCutoff}
                            updateActiveRule={this._updateActiveRule}
                            disabledMode={this.state._disabledMode}
                            cancelEdit={this._cancelEdit}
                            updateSchedule={this._updateSchedule}
                            saveRule={this._saveRule}
                            />
                    </ScrollView>

                    { this.state._allData.enabled && this.state._disabledMode && !this.props.viewOnly ?
                        <ActionButton 
                            buttonColor="#EEB843"
                            spacing={10}>
                            <ActionButton.Item buttonColor='#26A65B' title="ADD NEW SCHEDULE" onPress={() => {this._addNewSchedule()}}>
                                <Icon2 name="plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#4183D7' title="MODIFY SELECTED YEAR'S SCHEDULE" onPress={() => {this._modifySelectedYear()}}>
                                <Icon2 name="table-edit" color='#fff' size={22} style={styles.actionButtonIcon} />
                            </ActionButton.Item> */}
                        </ActionButton>
                        : null
                    }

                    <PromptScreen.PromptGeneric 
                        show= {this.state._promptShow} 
                        title={this.state._promptMsg}/>

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
        bonus: state.companyPoliciesReducer.bonus
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            bonus: bindActionCreators(bonusActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bonus)