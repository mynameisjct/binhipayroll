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
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from '../styles'

//Redux
import { connect } from 'react-redux';
import * as overtimeSelector from '../data/overtime/selector';
import * as overtimeActions from '../data/overtime/actions';
import { bindActionCreators } from 'redux';

//API
import * as overtimeApi from '../data/overtime/api';

//Custom Components
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
const title_Overtime = 'Overtime';
const description_Overtime = 'Allow paid overtime';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';
const save_loading_message = 'Saving new Overtime Policy. Please wait...';
const switch_loading_message = 'Switching Overtime Policy. Please wait...';
const delete_loading_message = 'Deleting Active Overtime Rule. Please wait...';

const overtime_disabled = 'Disabled — when Overtime is turned off,' +
" the system will disregard the hours worked by the employees beyond" +
' the shceduled time-out. Therefore, overtime will not be calculated' +
" during payroll."

const overtime_enabled = 'Enabled — when Overtime is turned on,' +
" the system will calculate, based on rules, the hours worked by the employees beyond" +
" the shceduled time-out and credit the amount on the employees' pay."

class OvertimeForm extends Component {
    render(){
        /* console.log('this.props.disabledMode: ' + this.props.disabledMode); */
        let oRuleName;
        let pTitle = '';
        let pType = '';
        let oRightOption = null;
        let oRightOptionType = 'Switch';
        let strTitle = '';
          
        if(this.props.disabledMode || !this.props.data.enabled){
            pTitle='Overtime';
            pType='Switch';
            oRightOption = (
                <Switch
                    disabled={false}
                    onValueChange={ (value) => {this.props.triggerSwitch(value)}} 
                    onTintColor={color_SwitchOn}
                    thumbTintColor={color_SwitchThumb}
                    tintColor={color_SwitchOff}
                    value={this.props.data.enabled} 
                />
            );
            oRightOptionType = 'Switch';
            strTitle = pTitle;

            //Rule Name
            oRuleName = (
                <Picker
                    mode='dropdown'
                    style={styles.pickerStyle}
                    selectedValue={this.props.activeRule.id}
                    onValueChange={(itemValue, itemIndex) => {this.props.updateActiveRule(itemValue)}}>
                    {
                        this.props.data.data.map((data, index) => (
                            <Picker.Item key={index} label={data.name} value={data.id} />
                        ))
                    }
                </Picker>
            );
        }
        else{
            pTitle='Add New Overtime Rule';
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
                    editable={!this.props.disabledMode}
                    placeholder='Rule Name'
                    style={{color: '#434646', paddingLeft: 10, height: '100%'}}
                    onChangeText={(text) => {this.props.updateRuleName(text)}}
                    value={this.props.activeRule.name}
                    returnKeyType="done"
                    underlineColorAndroid='transparent'
                />
            );
        }

        return(
            <CustomCard 
                title={pTitle} 
                description={description_Overtime} 
                oType={oRightOptionType}
                rightHeader={
                    oRightOption
                }>

                { this.props.data.enabled ?
                    <View>
                        <PropLevel1 
                            name='Rule Name'
                            content={
                                oRuleName
                            }
                        />

                        <PropTitle name='Threshhold'/>

                        <PropLevel2 
                            name={this.props.activeRule.minovertime.label}
                            content={
                                this.props.disabledMode ?
                                    <Text 
                                        style={{color: '#434646', 
                                            height: '100%', 
                                            textAlignVertical: 'center',
                                            width: 90,
                                            paddingLeft: 15,
                                            paddingRight: 15
                                        }}>
                                        {this.props.activeRule.minovertime.value}
                                    </Text>
                                :
                                    <Picker
                                        mode='dropdown'
                                        style={styles.pickerStyle}
                                        selectedValue={this.props.activeRule.minovertime.value}
                                        onValueChange={(itemValue, itemIndex) => {this.props.updateThreshhold('minovertime', itemValue)}}>
                                        {
                                            this.props.activeRule.minovertime.options.map((data, index) => (
                                                <Picker.Item key={index} label={data} value={data} />
                                            ))
                                        }
                                    </Picker>
                            }
                            hideBorder={this.props.disabledMode}
                            contentStyle={{
                                width: 190
                            }}
                        />

                        <PropLevel2 
                            name={this.props.activeRule.maxovertime.label}
                            content={
                                this.props.disabledMode ?
                                    <Text 
                                        style={{color: '#434646', 
                                            height: '100%', 
                                            textAlignVertical: 'center',
                                            width: 90,
                                            paddingLeft: 15,
                                            paddingRight: 15
                                        }}>
                                        {this.props.activeRule.maxovertime.value}
                                    </Text>
                                :
                                    <Picker
                                        mode='dropdown'
                                        style={styles.pickerStyle}
                                        selectedValue={this.props.activeRule.maxovertime.value}
                                        onValueChange={(itemValue, itemIndex) => {this.props.updateThreshhold('maxovertime', itemValue)}}>
                                        {
                                            this.props.activeRule.maxovertime.options.map((data, index) => (
                                                <Picker.Item key={index} label={data} value={data} />
                                            ))
                                        }
                                    </Picker>
                            }
                            hideBorder={this.props.disabledMode}
                            contentStyle={{
                                width: 190
                            }}
                        />

                        <PropTitle name='Rates'/>

                        <PropLevel2 
                            name={this.props.activeRule.rates.regularworkingday.label}
                            content={
                                <TextInput 
                                    editable={!this.props.disabledMode}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    placeholder=''
                                    style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                    onChangeText={(text)  => {this.props.updateRates('regularworkingday', text)}}
                                    value={this.props.activeRule.rates.regularworkingday.value}
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
                            name={this.props.activeRule.rates.regularholiday.label}
                            content={
                                <TextInput 
                                    editable={!this.props.disabledMode}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    placeholder=''
                                    style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                    onChangeText={(text)  => {this.props.updateRates('regularholiday', text)}}
                                    value={this.props.activeRule.rates.regularholiday.value}
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
                            name={this.props.activeRule.rates.specialholiday.label}
                            content={
                                <TextInput 
                                    editable={!this.props.disabledMode}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    placeholder=''
                                    style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                    onChangeText={(text)  => {this.props.updateRates('specialholiday', text)}}
                                    value={this.props.activeRule.rates.specialholiday.value}
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
                            name={this.props.activeRule.rates.restday.label}
                            content={
                                <TextInput 
                                    editable={!this.props.disabledMode}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    placeholder=''
                                    style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                    onChangeText={(text)  => {this.props.updateRates('restday', text)}}
                                    value={this.props.activeRule.rates.restday.value}
                                    returnKeyType="done"
                                    underlineColorAndroid='transparent'
                                />
                            }
                            hideBorder={this.props.disabledMode}
                            contentStyle={{
                                width: 75
                            }}
                        />

                        
                    </View>
                    : 
                    <View style={{paddingTop: 10}}>
                        <Text>{overtime_disabled}</Text>
                        <Text>{'\n' + overtime_enabled}</Text>
                    </View>
                }     
            </CustomCard>
        )
    }
}

export class Overtime extends Component {
    constructor(props){
        super(props);
        this.state = {
            _isBreaktimeEnabled: false,
        
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
            _activeRule: null,
        }

        this._triggerSwitch = this._triggerSwitch.bind(this);
        this._updateActiveRule = this._updateActiveRule.bind(this);
        this._cancelEdit = this._cancelEdit.bind(this);
        this._saveRule = this._saveRule.bind(this);
        this._updateRates = this._updateRates.bind(this);
        this._updateRuleName = this._updateRuleName.bind(this);
        this._updateThreshhold = this._updateThreshhold.bind(this);
    }

    componentWillUnmount(){
        this.props.actions.overtime.setActiveRule('');
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
            }else{
                this.setState({ _status: nextProps.status })
            }
        }
    }

    _initValues = () => {
        try{
            let bFlag = true;
            let oActiveRule = JSON.parse(JSON.stringify(
                this.props.overtime.activeRule == '' ||  isNaN(this.props.overtime.activeRule) ? 
                overtimeSelector.getDefaultActiveRule() : overtimeSelector.getActiveRuleFromID(this.props.overtime.activeRule)
            ));

            if (!oActiveRule){
                oActiveRule = JSON.parse(JSON.stringify(overtimeSelector.getDefaultRule()));
                bFlag = false;
            }

            this.setState({
                _allData: JSON.parse(JSON.stringify(overtimeSelector.getAllData())),
                _activeRule: oActiveRule,
                _disabledMode: bFlag,
                _status: [1, '']
            },
    /*             () => {
                    console.log('======================================================================')
                    console.log('this.state._allData: ' + JSON.stringify(this.state._allData));
                    console.log('this.state._activeRule: ' + JSON.stringify(this.state._activeRule));
                } */
            )

            this.props.actions.overtime.setActiveRule(oActiveRule.id);
        }
        catch(exception){
            console.log('exception: ' + exception.message);
            this.setState({_status: [0,'']})
        }
    }
    
    _saveRule = () => {
        //Temp - To delete
        /* console.log('this.state._activeRule.name: ' + this.state._activeRule.name); */
        /* if(!oHelper.isStringEmptyOrSpace(this.state._activeRule.name)){
            let res = {id: '005', message: 'Successfully Added New Rule, "' + this.state._activeRule.name + '"'}
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'success',
                _resMsg: res.message,
                _bNoWorkShift: false
            })
            this._pushNewRuleToStore(res);
        }
        else{
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: 'Unable to save. Please input Rule Name.'
            });
            
        } */

        if(!oHelper.isStringEmptyOrSpace(this.state._activeRule.name)){
            this.setState({
                _promptMsg: save_loading_message,
                _promptShow: true
            })
            const oInput = {
                companyid: this.props.activecompany.id,
                username: this.props.logininfo.resUsername,
                transtype: 'update',
                accesstoken: '',
                clientid: '',
                data: this.state._activeRule,
            };

            overtimeApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('INPUT: ' + JSON.stringify(oInput));
                console.log('OUTPUT: ' + JSON.stringify(res));
                this.setState({
                    _promptShow: false
                });
                if(res.flagno==0){
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'error-ok',
                        _resMsg: res.message
                    });
                }
                else if(res.flagno==1){
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'success',
                        _resMsg: res.message,
                        _bNoWorkShift: false
                    })
                    this._pushNewRuleToStore(res);
                }
                else{
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'error-ok',
                        _resMsg: 'Unable to save. An Unknown Error has been encountered. Contact BINHI-MeDFI.'
                    });
                }
            })
            .catch((exception) => {
                console.log('INPUT: ' + JSON.stringify(oInput));
                this.setState({
                    _promptShow: false,
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: exception.message
                })
            });
        }
        else{
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: 'Unable to save. Please input Rule Name.'
            });
        }
    }

    _deleteActiveRule = () => {
        this.setState({
            _promptMsg: delete_loading_message,
            _promptShow: true
        })
        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'delete',
            accesstoken: '',
            clientid: '',
            id: this.state._activeRule.id
        };

        overtimeApi.remove(oInput)
        .then((response) => response.json())
        .then((res) => {
            console.log('INPUT: ' + JSON.stringify(oInput));
            console.log('OUTPUT: ' + JSON.stringify(res));
            this.setState({
                _promptShow: false
            });
            if(res.flagno==0){
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: res.message
                });
            }
            else if(res.flagno==1){
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'success',
                    _resMsg: res.message,
                    _bNoWorkShift: false
                })
                this.props.actions.overtime.setActiveRule('')
                this._popActiveRuleFromStore();
            }
            else{
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: 'Unable to Delete. An Unknown Error has been encountered. Contact BINHI-MeDFI.'
                });
            }
        })
        .catch((exception) => {
            console.log('INPUT: ' + JSON.stringify(oInput));
            this.setState({
                _promptShow: false,
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: exception.message
            })
        });
    }

    _toggleOvertime = (value) => {
        this.setState({
            _promptMsg: switch_loading_message,
            _promptShow: true
        })
        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'request',
            accesstoken: '',
            clientid: '',
            enabled: value
        };

        overtimeApi.toggleSwitch(oInput)
        .then((response) => response.json())
        .then((res) => {
            console.log('=======Overtime Toggle=======');
            console.log('INPUT: ' + JSON.stringify(oInput));
            console.log('OUTPUT: ' + JSON.stringify(res));
            this.setState({
                _promptShow: false
            });
            if(res.flagno==0){
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: res.message
                });
            }
            else if(res.flagno==1){
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'success',
                    _resMsg: res.message,
                    _bNoWorkShift: false
                })
                this._setOvertimeSwitch(value);
            }
            else{
                this.setState({
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: 'Unable to save. An Unknown Error has been encountered. Contact BINHI-MeDFI.'
                });
            }
        })
        .catch((exception) => {
            console.log('=======Overtime Toggle ERROR=======');
            console.log('INPUT: ' + JSON.stringify(oInput));
            this.setState({
                _promptShow: false,
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: exception.message
            })
        });
    }

    _pushNewRuleToStore = (res) => {
        let oAllData = {...this.state._allData};
        let oDataArray = [...oAllData.data];

        let oActiveRule = {...this.state._activeRule};
        oActiveRule.id = res.id
        oDataArray.push(oActiveRule);

        oAllData.data = oDataArray;

        this.props.actions.overtime.update(oAllData);
        this.props.actions.overtime.setActiveRule(res.id);
        this._disableAll();
        this._initValues();
    }

    _popActiveRuleFromStore = () => {
        let oOvertime = {...this.state._allData};
        let aOvertimeData = [...oOvertime.data];

        aOvertimeData.map((data,index) => {
            if(data.id == this.state._activeRule.id){
                aOvertimeData.splice(index, 1);
            }
        });

        oOvertime.data = aOvertimeData;
        this.props.actions.overtime.update(oOvertime);
        this._initValues();
    }

    _setOvertimeSwitch = (value) => {
        let oOvertime = {...this.state._allData};
        oOvertime.enabled = value;
        this.props.actions.overtime.update(oOvertime);
        this._initValues();
    }

    //Disable Edit Mode
    _disableAll = () => {
        this.setState({
            _disabledMode: true
        })
    }
    
    //Enable Edit Mode
    _enableAll = () => {
        this.setState({
            _disabledMode: false
        })
    }

    _triggerSwitch = (value) => {
        this._toggleOvertime(value);
    }

    _updateActiveRule = (value) => {
        let oActiveRule = JSON.parse(JSON.stringify(overtimeSelector.getActiveRuleFromID(value)));
        this.setState({ _activeRule: oActiveRule })
        this.props.actions.overtime.setActiveRule(oActiveRule.id);
    }

    _addNewRule = () => {
        this._enableAll();
        let oActiveRule = JSON.parse(JSON.stringify(overtimeSelector.getDefaultRule()));
        this.setState({
            _activeRule: oActiveRule
        })
    }

    _cancelEdit = () => {
        if(this.state._allData.data.length === 0){
            this._toggleOvertime(false);
        }
        this._initValues();
    }

    _updateRuleName = (value) => {
        let oActiveRule = {...this.state._activeRule};
        oActiveRule.name = value;
        this.setState({
            _activeRule: oActiveRule
        })
    }
    _updateRates = (strType, value) => {
        if(!isNaN(value)){
            let oActiveRule = {...this.state._activeRule};
            switch(strType){
                case 'regularworkingday': 
                    oActiveRule.rates.regularworkingday.value = value;
                    break;
                case 'regularholiday': 
                    oActiveRule.rates.regularholiday.value = value;
                    break;
                case 'specialholiday': 
                    oActiveRule.rates.specialholiday.value = value;
                    break;
                case 'restday': 
                    oActiveRule.rates.restday.value = value;
                    break; 
            }
            this.setState({
                _activeRule: oActiveRule
            })
        }
        else{
            //Show Toast
        }
    }

    _updateThreshhold = (strType, value) => {
        let oActiveRule = {...this.state._activeRule};
        switch(strType){
            case 'minovertime':
                oActiveRule.minovertime.value = value;
                break;
            case 'maxovertime':
                oActiveRule.maxovertime.value = value;
                break;
        }
        this.setState({
            _activeRule: oActiveRule
        })
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }
    
    render(){
        console.log('xxxxxxxxxxxxx______REDERING OVERTIME');
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Overtime Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
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
                        <OvertimeForm
                            disabledMode={this.state._disabledMode}
                            data={this.state._allData}
                            activeRule={this.state._activeRule}
                            triggerSwitch={this._triggerSwitch}
                            updateActiveRule={this._updateActiveRule}
                            cancelEdit={this._cancelEdit}
                            saveRule={this._saveRule}
                            updateRates={this._updateRates}
                            updateThreshhold={this._updateThreshhold}
                            updateRuleName={this._updateRuleName}
                        />

                    </ScrollView>

                    { 
                        this.state._allData.enabled && this.state._disabledMode ? 
                            <ActionButton 
                                buttonColor="#EEB843"
                                spacing={10}
                            >
                                <ActionButton.Item buttonColor='#26A65B' title="ADD NEW OVERTIME RULE" onPress={() => {this._addNewRule()}}>
                                    <Icon2 name="bell-plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                
                                <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT OVERTIME RULE" onPress={() => {this._deleteActiveRule()}}>
                                    <Icon2 name="delete-empty" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>

                            </ActionButton>
                        :null
                    }
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
        overtime: state.companyPoliciesReducer.overtime
        
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            overtime: bindActionCreators(overtimeActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Overtime)
