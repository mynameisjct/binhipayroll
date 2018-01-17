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
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles'

//Redux
import { connect } from 'react-redux';
import * as leavesSelector from '../data/leaves/selector';
import * as leavesActions from '../data/leaves/actions';
import { bindActionCreators } from 'redux';

//API
import * as leavesApi from '../data/leaves/api';

//Custom Components
import FormLeaves from '../Forms/formLeaves';
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import CustomCard, 
{
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

//Helper
import * as oHelper from '../../../helper';

//Class Constants
const title_Leaves = 'Leaves';
const description_Leaves = 'Allow Paid Leaves';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';

const update_loading_message = 'Updating Leave Type. Please wait...';
const add_loading_message = 'Saving new Leave Type. Please wait...';
const switch_loading_message = 'Switching Leave Policy. Please wait...';
const delete_loading_message = 'Deleting a Leave Type. Please wait...';

const leaves_disabled = 'Disabled — when Leaves is turned off,' +
" the system will automatically mark an employee as absent when" +
" the employee has no time-in and time-out record on a working day." +
' Consequently, "No Work, No Pay" policy will be imposed.'

const leaves_enabled = 'Enabled — when Leaves is turned on,' +
" the system will allow the employer to add Leave Types from which" +
" the employer can assign to its employees, individually."

const monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];


class LeavesForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            _strMaxConvertible: ''+this.props.activeData.expirydate.maxconvertible.value,
            _aDays: oHelper.getArrayOfDaysInMonth(this.props.activeData.expirydate.month.value),
            _leaveCount: ''+this.props.activeData.allowablecount.value
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.state._leaveCount != nextProps.activeData.allowablecount.value){
            this.setState({
                _leaveCount: nextProps.activeData.allowablecount.value
            })
        }
    }

    _showToast = (value) => {
        ToastAndroid.show(value, ToastAndroid.SHORT);
    }

    _updateMaxConvertible = (value) => {
        if((!isNaN(value) && value.slice(-1) != '.') || value==''){
            this.setState({_strMaxConvertible: value})
        }
        else{
            this._showToast('INPUT SHOULD BE A VALID NUMBER FORMAT')
        }
    }
    
    _updateLeaveCount = (value) => {
        if((!isNaN(value) && value.slice(-1) != '.') || value==''){
            this.setState({_leaveCount: value});
        }
        else{
            this._showToast('INPUT SHOULD BE A VALID NUMBER FORMAT')
        }
    }

    render(){
        
        let iExpiryMonth = this.props.activeData.expirydate.month.value-1;
        let pTitle = '';
        if(this.props.disabledMode){
            pTitle='Leaves';
            oRightOption = (
                <Switch
                    disabled={false}
                    onValueChange={ (value) => {this.props.toggleSwitch(value)}} 
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
                    onValueChange={(itemValue, itemIndex) => {this.props.updateActiveRule(itemValue)}}>
                    {
                        this.props.allData.data.map((data, index) => (
                            <Picker.Item key={index} label={''+data.name} value={data.id} />
                        ))
                    }
                </Picker>
            );
        }
        else{
            if(this.props.activeData.id == ''){
                pTitle='Add New Leave Type';
            }   
            else{
                pTitle='Modify Leave Type';
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
                    placeholder='Leave Type Name'
                    style={{color: '#434646', paddingLeft: 15, paddingRight: 15, height: '100%'}}
                    onChangeText={(text) => {this.props.updateRuleName(text)}}
                    value={this.props.activeData.name}
                    returnKeyType="done"
                    underlineColorAndroid='transparent'
                />
            );
        }

        return(
            <CustomCard 
                title={pTitle} 
                description={description_Leaves} 
                oType={oRightOptionType}
                rightHeader={
                    oRightOption
                }>

                { 
                    this.props.allData.enabled ?
                        <View>
                            <View>
                                <PropLevel1 
                                    name='Leave Type'
                                    content={
                                        oRuleName
                                    }
                                    contentStyle={{
                                        width: 210
                                    }}
                                />
                            </View>
                    
                            <View>
                                <PropTitle name="Available Leave Count"/>
                                    <PropLevel2 
                                        name={this.props.activeData.allowablecount.label}
                                        content={
                                            <TextInput 
                                                editable={!this.props.disabledMode}
                                                autoCapitalize='none'
                                                keyboardType='numeric'
                                                placeholder=''
                                                onBlur={() =>  {this.props.updateLeaveCount(this.state._leaveCount)}}
                                                style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                                onChangeText={(inputTxt) =>  {this._updateLeaveCount(inputTxt)}}
                                                value={''+this.state._leaveCount}
                                                returnKeyType="done"
                                                underlineColorAndroid='transparent'
                                            />
                                        }
                                        contentStyle={{
                                            paddingLeft: 20,
                                            paddingRight: 15,
                                            width: 100
                                        }}
                                        hideBorder={this.props.disabledMode}
                                        placeHolderStyle={{height: 50}}
                                    />

                                <PropTitle name='Leave Expiration'/>
                                    
                                <PropLevel2 
                                    name={this.props.activeData.expirydate.month.label}
                                    content={
                                        <Picker
                                            enabled={!this.props.disabledMode}
                                            prompt='Select Month'
                                            mode='dropdown'
                                            style={styles.pickerStyle}
                                            selectedValue={iExpiryMonth}
                                            onValueChange={(itemValue, itemIndex) => {this.props.updateExpiry('month', itemValue+1)}}>
                                            {
                                                monthNames.map((data, index) => (
                                                    <Picker.Item itemStyle={{backgroundColor: 'red'}} key={index} label={data} value={index} />
                                                ))
                                            }
                                        </Picker>
                                    }
                                    hideBorder={this.props.disabledMode}
                                    contentStyle={{
                                        width: 140
                                    }}

                                    placeHolderStyle={{height: 55}}
                                />
                                
                                <PropLevel2 
                                    name={this.props.activeData.expirydate.day.label}
                                    content={
                                        <Picker
                                            enabled={!this.props.disabledMode}
                                            prompt={this.props.activeData.expirydate.day.label}
                                            mode='dropdown'
                                            style={styles.pickerStyle}
                                            selectedValue={this.props.activeData.expirydate.day.value}
                                            onValueChange={(itemValue, itemIndex) => {this.props.updateExpiry('day', itemValue)}}>
                                            {
                                                this.props.aDays.map((data, index) => (
                                                    <Picker.Item key={index} label={data} value={data} />
                                                ))
                                            }
                                        </Picker>
                                    }
                                    hideBorder={this.props.disabledMode}
                                    contentStyle={{
                                        paddingLeft: 20,
                                        width: 140
                                    }}

                                    placeHolderStyle={{height: 55}}
                                />

                                <PropLevel2 
                                    name={this.props.activeData.expirydate.unusedleaveaction.label}
                                    content={
                                        <Picker
                                            enabled={!this.props.disabledMode}
                                            mode='dropdown'
                                            style={styles.pickerStyle}
                                            selectedValue={this.props.activeData.expirydate.unusedleaveaction.value}
                                            onValueChange={(itemValue, itemIndex) => {this.props.updateExpiry('unusedleaveaction', itemValue)}}>
                                            {
                                                this.props.activeData.expirydate.unusedleaveaction.options.map((data, index) => (
                                                    <Picker.Item key={index} label={data} value={data} />
                                                ))
                                            }
                                        </Picker>
                                    }
                                    hideBorder={this.props.disabledMode}
                                    contentStyle={{
                                        width: 190
                                    }}

                                    placeHolderStyle={{height: 55}}
                                />
                                {
                                    this.props.activeData.expirydate.unusedleaveaction.value.toUpperCase() == 'CONVERT TO CASH' ?
                                        <PropLevel2 
                                            name={this.props.activeData.expirydate.maxconvertible.label}
                                            content={
                                                <TextInput 
                                                    editable={!this.props.disabledMode}
                                                    autoCapitalize='none'
                                                    keyboardType='numeric'
                                                    placeholder=''
                                                    style={{paddingLeft: 15, paddingRight: 15,color: '#434646', height: '100%'}}
                                                    onBlur={() =>  {this.props.updateExpiry('maxconvertible', this.state._strMaxConvertible)}}
                                                    onChangeText={inputTxt =>  {this._updateMaxConvertible(inputTxt)}}
                                                    value={''+this.state._strMaxConvertible}
                                                    returnKeyType="done"
                                                    underlineColorAndroid='transparent'
                                                />
                                            }
                                            contentStyle={{
                                                paddingLeft: 20,
                                                paddingRight: 20,
                                                width: 100
                                            }}
                                            hideBorder={this.props.disabledMode}
                                            placeHolderStyle={{height: 55}}
                                        />
                                    :
                                        null
                                }
                            </View>
                        </View>
                        :
                            <View style={{paddingTop: 10}}>
                                <Text>{leaves_disabled}</Text>
                                <Text>{'\n' + leaves_enabled}</Text>
                            </View>  
                        
                }     
            </CustomCard>
        )
    }
}

export class Leaves extends Component{
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
            _activeData: null,
            _leaveFormTitle: '',
            _bShowForm: false,
            _pendingTransactionType: '',
            _pendingTransactionData: null,
            _aDays: []
        }
    }

    componentDidMount(){
        if(this.props.status[0]==1){
            this._initValues();
        }
        else if(this.props.status[0]==3){
            this.props.triggerRefresh(true);
        }
        else;

        this.setState({
            _status: [...this.props.status]
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.status[0]){
            if(nextProps.status[0]==1){
                this._initValues();
            }

            this.setState({
                _status: nextProps.status
            })
        }
    }

    _initValues = () => {
        let oAllData = JSON.parse(JSON.stringify(leavesSelector.getAllData()));
        let oActiveData = JSON.parse(JSON.stringify(leavesSelector.getDefaultActiveData()));
        let bFlag=true;
        
        if(!oActiveData){
            oActiveData = JSON.parse(JSON.stringify(leavesSelector.getDefaultData()));
            if(oAllData.enabled==true){
                bFlag= false
            }
        }
        console.log('oActiveData: ' + JSON.stringify(oActiveData));

        
        this.setState({
            _allData: oAllData,
            _activeData: oActiveData,
            _disabledMode: true,
            _aDays: oHelper.getArrayOfDaysInMonth(oActiveData.expirydate.month.value),
            _disabledMode: bFlag
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
                this._initValues();
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
        await leavesApi.toggleSwitch(oInput)
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

    _setLeaveSwitch = (value) => {
        let oData = {...this.state._allData}
        oData.enabled = value;
        this.setState({
            _allData: oData
        })
        this.props.actions.leaves.update(oData);
    }


    _saveRule = () => {
        if(!oHelper.isStringEmptyOrSpace(this.state._activeData.name)){
            let oActiveData = JSON.parse(JSON.stringify(this.state._activeData));
            let bSuccess = false;

            let strTransType = 'update';
            let strLoading = update_loading_message;
            if(oActiveData.id==''){
                strTransType='add';
                strLoading = add_loading_message;
            }

            bSuccess = this._saveRuleToDB(strTransType, oActiveData, strLoading);
        }
        else{
            this._showMsgBox('error-ok', "Unable to save. Please input Leave Type Name.");
        }
    }

    _saveRuleToDB = async(strTransType, value, strLoading) => {
        let bFlag = false;
        this._showLoadingPrompt(strLoading);

        let oInput = this._requiredInputs();
        oInput.data = value;
        oInput.transtype = strTransType;

        console.log('=====INPUT: ' + JSON.stringify(oInput));
        await leavesApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('=======OUTPUT: ' + JSON.stringify(res));
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno==1){
                    if(value.id == ''){
                        this._pushNewLeaveType(res.id, value);
                    }
                    else{
                        this._updateLeaveType(value);
                    }
                    
                }
                
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }

    _pushNewLeaveType = (id, value) => {
        let oAllData = {...this.state._allData};
        let oDataArray = [...oAllData.data];

        let oActiveType = {...value};
        oActiveType.id = id
        oDataArray.push(oActiveType);

        oAllData.data = oDataArray;
        this.props.actions.leaves.update(oAllData);
        this._initValues();
    }

    _updateLeaveType = (value) => {
        let oAllData = {...this.state._allData}; 
        let objIndex = oAllData.data.findIndex((obj => obj.id == value.id));
        
        oAllData.data[objIndex]=value;

        this.props.actions.leaves.update(oAllData);
        this._initValues();
    }

    _deleteActiveRule = () => {
        let bFlag = false;
        this._showLoadingPrompt(delete_loading_message);

        let oInput = this._requiredInputs();
        oInput.id = this.state._activeData.id;
        oInput.transtype = 'delete';

        console.log('=====INPUT: ' + JSON.stringify(oInput));
        leavesApi.remove(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('=======OUTPUT: ' + JSON.stringify(res));
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno==1){
                    this._popLeaveFromStore(this.state._activeData.id)
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });
    }

    _popLeaveFromStore = (value) => {
        let oAllData = {...this.state._allData}; 
        let objIndex = oAllData.data.findIndex((obj => obj.id == value.id));

        oAllData.data.splice(objIndex, 1);

        this.props.actions.leaves.update(oAllData);
        this._initValues();
    }
    

    _updateExpiry = async(strType, value) => {
        console.log('========UPDATE EXPIRY===========');
        console.log('strType: ' + strType);
        console.log('value: ' + value);

        let oActiveData = {...this.state._activeData}; 
        let bFlagUpdate = true;
        let bFlagDBSuccess = false;
        let aDays = [];

        switch(strType.toUpperCase()){
            case 'DAY':
                oActiveData.expirydate.day.value = value;
                break;
            case 'MONTH':
                aDays = oHelper.getArrayOfDaysInMonth(value+1);
                oActiveData.expirydate.month.value = value;
                break;
            case 'UNUSEDLEAVEACTION':
                oActiveData.expirydate.unusedleaveaction.value = value;
                break;
            case 'MAXCONVERTIBLE':
                let val = value;
                if(val==''){
                    val='0'
                }
                oActiveData.expirydate.maxconvertible.value = val;
                break;
            default:
                bFlagUpdate = false;
        }

        if (bFlagUpdate) {
            /* bFlagDBSuccess = await this._updateExpiryToDB({...oAllData.expirydate}); */
            bFlagDBSuccess = true;
            if(bFlagDBSuccess){
                if(aDays.length > 0){
                    this.setState({
                        _activeData: oActiveData,
                        _aDays: aDays
                    });
                }
                else{
                    this.setState({
                        _activeData: oActiveData,
                    });
                }
            }
        }
    }

    _addRule = () => {
        let oActiveData = JSON.parse(JSON.stringify(leavesSelector.getDefaultData()));
        this.setState({ _activeData: oActiveData, _disabledMode: false });
    }

    _modifyRule = () => {
        this.setState({ _disabledMode: false })
    }

    _cancelEdit = () => {
        if(this.state._allData.data.length === 0){
            this._toggleSwitch(false);
        }
        this._initValues();
    }
    
    _updateActiveRule = (value) => {
        let oActiveData = JSON.parse(JSON.stringify(leavesSelector.getRuleFromID(value)));
        this.setState({ _activeData: oActiveData });
    }

    _updateLeaveCount = (value) => {
        if(value==''){
            value='0';
        }
        let oActiveData = {...this.state._activeData}
        oActiveData.allowablecount.value = value
        this.setState({ _activeData: oActiveData });
    }

    _updateRuleName = (value) => {
        let oActiveData = {...this.state._activeData};
        oActiveData.name = value;
        this.setState({ _activeData: oActiveData });
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

    _updateAllData = (value) => {
        this.setState({
            _allData: value
        })
        this.props.actions.leaves.update(value);
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
        console.log('xxxxxxxxxxxxx______REDERING LEAVES');
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Leave Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
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
                        <LeavesForm
                            disabledMode={this.state._disabledMode}
                            allData={this.state._allData}
                            activeData={this.state._activeData}
                            toggleSwitch={this._toggleSwitch}
                            cancelEdit={this._cancelEdit}
                            updateActiveRule={this._updateActiveRule}
                            updateLeaveCount={this._updateLeaveCount}
                            updateExpiry = {this._updateExpiry}
                            aDays={this.state._aDays}
                            saveRule={this._saveRule}
                            updateRuleName={this._updateRuleName}
                        />

                    </ScrollView>

                    <MessageBox
                        promptType={this.state._msgBoxType}
                        show={this.state._msgBoxShow}
                        onClose={this._closeMsgBox}
                        onWarningContinue={this._continueActionOnWarning}
                        message={this.state._resMsg}
                    />

                    { this.state._promptShow ?
                        <PromptScreen.PromptGeneric show= {this.state._promptShow} title={this.state._promptMsg}/>
                        : null
                    }    

                    { this.state._allData.enabled && this.state._disabledMode ?
                            <ActionButton 
                                buttonColor="#EEB843"
                                spacing={10}>
                                <ActionButton.Item buttonColor='#26A65B' title="ADD NEW LEAVE TYPE" onPress={() => {this._addRule()}}>
                                    <Icon2 name="plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#4183D7' title="MODIFY CURRENT LEAVE TYPE" onPress={() => {this._modifyRule()}}>
                                    <Icon2 name="table-edit" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT LEAVE TYPE" onPress={() => {this._deleteActiveRule()}}>
                                    <Icon2 name="delete-empty" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                            : null
                        }            

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
        leaves: state.companyPoliciesReducer.leaves
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            leaves: bindActionCreators(leavesActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaves)
