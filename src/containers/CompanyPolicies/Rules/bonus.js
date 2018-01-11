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
            _strInstallments: ''
        }
    }

/*     componentWillReceiveProps = (nextProps) => {
        if(nextProps.data.expirydate.maxconvertible != this.state._strMaxConvertible){
            this.setState({
                _strInstallments: nextProps.data.expirydate.maxconvertible
            })
        }
    } */

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
                        value={ this.props.data.enabled } 
                    />
                }>

                <PropLevel1 
                    name='Select Schedule'
                    content={
                        <Picker
                            mode='dropdown'
                            style={styles.pickerStyle}
                            selectedValue={this.props.data.id}
                            onValueChange={(itemValue, itemIndex) => {this.props.updateActiveRule(itemValue)}}>
                            {
                                this.props.data.data.map((data, index) => (
                                    <Picker.Item key={index} label={data.name} value={data.id} />
                                ))
                            }
                        </Picker>
                    }
                    contentStyle={{
                        width: 130
                    }}
                />

                <PropTitle name='Installments'/>
                    
                        <PropLevel2 
                            name='Number of Installments'
                            content={
                                <TextInput 
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    placeholder=''
                                    onBlur={() => {
                                        /* this.props.updateExpiry('maxconvertible', this.state._strMaxConvertible) */
                                    }}
                                    style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                    onChangeText={inputTxt =>  {
                                        /* this._setNumberOfInstallments(inputTxt) */
                                    }}
                                    value={'2'}
                                    returnKeyType="done"
                                    underlineColorAndroid='transparent'
                                />
                            }
                            contentStyle={{
                                width: 75
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
            _disabledMode: false,
            _status: [2, 'Loading...'],
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Local States
            _allData: null,
        }
    }

    

    componentDidMount(){
        if(this.props.status[0]==1){
            this._initValues();
        }

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
        console.log('BONUS_oAllData: ' + JSON.stringify(oAllData));
        this.setState({
            _allData: oAllData,
        })
    }

    _toggleSwitch = async(value) => {
        let oAllData = JSON.parse(JSON.stringify(this.state._allData));
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
                this._showMsgBox('error-ok', exception);
            });

        return bFlag;
    }

    _updateAllData = (value) => {
        this.setState({
            _allData: value
        })
        this.props.actions.benefits.update(value);
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
                            data={this.state._allData}
                            toggleSwitch={this._toggleSwitch}
                            />
                    </ScrollView>
                    
                    <ActionButton 
                        buttonColor="#EEB843"
                        spacing={10}>
                        <ActionButton.Item buttonColor='#26A65B' title="ADD SCHEDULE FOR NEXT YEAR" onPress={() => {this._deleteActiveWorkShiftRequest()}}>
                            <Icon2 name="plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>

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