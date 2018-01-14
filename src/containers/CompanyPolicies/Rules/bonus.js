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

//Class Constants
const add_loading_message = 'Saving new 13th Month Pay Schedule. Please wait...';
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
                    _strInstallments: value
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
        /* this.props.updateInstallments(value); */
    }

    _updateActiveRule = (id) => {
        this.props.updateActiveRule(id);
    }

    _showDatePicker = async() => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              minDate: new Date(2018, 0, 1),
              maxDate: new Date(2018, 11, 31),
              date: new Date(2018, 0, 1)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
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
        return(
            <CustomCard 
                title={title_Bonus} 
                description={description_Bonus} 
                oType='Switch'
                rightHeader={
                    <Switch
                        onValueChange={ (value) => this._toggleSwitch(value)} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={ this.props.allData.enabled } 
                    />
                }>

                { 
                    this.props.allData.enabled ?
                        <View>
                            <PropLevel1 
                                name='Select Year'
                                content={
                                    <Picker
                                        enabled={this.props.disabledMode}
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
                                }
                                hideBorder={this.props.disabledMode}
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
                                            /* this._updateInstallments(this.state._strInstallments); */
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
                                this.props.activeData.schedule.map((objData, index)=> (
                                    <PropLevel2 
                                        key={index}
                                        name={'Payment ' + objData.index}
                                        content={
                                            <Text 
                                                disabled={((!objData.editable) || this.props.disabledMode)}
                                                onPress={() => {this._showDatePicker()}}
                                                style={{color: '#434646', 
                                                    height: '100%', 
                                                    textAlignVertical: 'center',
                                                }}>
                                                {objData.date.label}
                                            </Text>
                                        }
                                        hideBorder={this.props.disabledMode}
                                        contentStyle={{
                                            paddingLeft: 15,
                                            justifyContent: 'center',
                                            width: 200
                                        }}
                                    />
                                ))
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
        let oAllData = JSON.parse(JSON.stringify(bonusSelector.getAllData()));
        let oActiveData = JSON.parse(JSON.stringify(bonusSelector.getDefaultActiveData()));        

        this.setState({
            _allData: oAllData,
            _activeData: oActiveData
        })
    }

    _toggleSwitch = async(value) => {
        let oAllData = {...this.state._allData};
        let bFlag = true;
        let bSuccess = false;
        let strTransType = '';
        let strLoading = '';

        if(bFlag){
/*             bSuccess = await this._toggleSwitchToDB(strTransType, value, strLoading);
            if(bSuccess){
                let oInput = this._requiredInputs();
                oInput.enabled = value;
                oInput.transtype = strTransType;
                this._toggleSwitchToDB(oAllData);
            } */

            //Update Data from store
            oAllData.enabled = value;
            this._updateAllData(oAllData);
        }
    }

    _toggleSwitchToDB = async (strTransType, value, strLoading) => {
        let bFlag = false;
        this._showLoadingPrompt(strLoading);

        let oInput = this._requiredInputs();
        oInput.enabled = value;
        oInput.transtype = strTransType;

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
        console.log('========_updateInstallment: ' + value);
        let oAllData = {...this.state._allData};
        let oActiveData = {...this.state._activeData};

        oActiveData.installments = value;
        let objIndex = oAllData.data.findIndex((obj => obj.id == this.state._activeData.id));
        oAllData.data[objIndex] = oActiveData;
        console.log('========oActiveData: ' + JSON.stringify(oActiveData));
        console.log('========oAllData: ' + JSON.stringify(oAllData));
        this._updateActiveData(oActiveData);
        this._updateAllData(oAllData);
/*         if(bFlag){
            bSuccess = await this._toggleSwitchToDB(strTransType, value, strLoading);
            if(bSuccess){
                let oInput = this._requiredInputs();
                oInput.enabled = value;
                oInput.transtype = strTransType;
                this._toggleSwitchToDB(oAllData);
            }

            //Update Data from store
            let objIndex = oAllData.data.findIndex((obj => obj.id == this.state._activeData.id));
            oAllData.data[objIndex].installments = value;
            this._updateAllData(oAllData);
        } */
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
        this.setState({
            _isNewSched: false
        })
    }

    _updateActiveData = (value) => {
        this.setState({
            _activeData: value
        })
    }

    _updateAllData = (value) => {
        this.setState({
            _allData: value
        })
        this.props.actions.bonus.update(value);
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

        if(pProgress==2){
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
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
                            allData={this.state._allData}
                            activeData={this.state._activeData}
                            toggleSwitch={this._toggleSwitch}
                            updateInstallments={this._updateInstallments}
                            updateActiveRule={this._updateActiveRule}
                            disabledMode={this.state._disabledMode}
                            />
                    </ScrollView>

                    { this.state._allData.enabled ?
                        <ActionButton 
                            buttonColor="#EEB843"
                            spacing={10}>
                            <ActionButton.Item buttonColor='#26A65B' title="ADD NEW SCHEDULE" onPress={() => {this._addNewSchedule()}}>
                                <Icon2 name="plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor='#4183D7' title="MODIFY SELECTED YEAR'S SCHEDULE" onPress={() => {this.setState({_disabledMode: false})}}>
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
                <PromptScreen.PromptError title='13th Month Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
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