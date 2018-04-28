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
import * as undertimeSelector from '../data/undertime/selector';
import * as undertimeActions from '../data/undertime/actions';
import { bindActionCreators } from 'redux';

//API
import * as undertimeApi from '../data/undertime/api';

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
import {CONSTANTS} from '../../../constants';
const description_undertime = 'Set Undertime Rules';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';
const cl_suspension = '2001';
const cl_deduction = '2002';
const save_loading_message = 'Saving new Undertime Rule. Please wait...';
const switch_loading_message = 'Switching Undertime Rule. Please wait...';
const delete_loading_message = 'Deleting Active Rule. Please wait...';

const undertime_disabled = 'Disabled — when Undertime is turned off,' +
" when an employee has clocked out earlier from its scheduled time-out,"  +
" the system will NOT impose a penalty and will NOT deduct the employees' pay."

const undertime_enabled = 'Enabled — when Undertime is turned on,' +
" when an employee has clocked out earlier from its scheduled time-out,"  +
" the system WILL IMPOSE a penalty or WILL DEDUCT the employee's pay."

export class Undertime extends Component{
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
            _suspensionOptions: [
                'from the end of the grace period',
                'from the beginning of the shift'
            ],
            _activeUndertime:{},
            _undertimeData: {},
            _penalties:{}
        }
    }

    componentWillUnmount(){
        if(!(this.props.disableClearActiveOnUnmount || false)){
            this.props.actions.undertime.setActiveRule('');
        }
    }

    componentDidMount(){
        if(this.props.undertime.data){
            this._initValues();
            this.setState({_status: [1,'']})
        }
        else{
            this._getDataFromDB();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.undertime.status[0]){
            this.setState({ _status: nextProps.undertime.status })
        }

        if(
            (JSON.stringify(this.state._undertimeData) !== JSON.stringify(nextProps.undertime.data)) &&
            (nextProps.undertime.status[0] == 1)
        ){
            this._initValues();
        }
        
        if(
            (this.state._activeUndertime.id !== nextProps.undertime.activeRule) &&
            (this.state._status[0] == 1)
        ){
            if(nextProps.undertime.activeRule){
                this._updateActiveRule(nextProps.undertime.activeRule);
            }
        }
    }

    _getDataFromDB = () => {
        this.props.actions.undertime.get({...this._requiredInputs(), transtype:'get'});
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
        try{
            let bFlag = true;
            let oActiveUndertime = JSON.parse(JSON.stringify(
                this.props.undertime.activeRule == '' ||  isNaN(this.props.undertime.activeRule) ? 
                undertimeSelector.getDefaultActiveUnderTime() : undertimeSelector.getActiveUndertimeFromID(this.props.undertime.activeRule)
            ));

            if (!oActiveUndertime){
                oActiveUndertime = JSON.parse(JSON.stringify(undertimeSelector.getDefaultUndertime()));
                bFlag = false;
            }

            this.setState({
                _undertimeData: JSON.parse(JSON.stringify(undertimeSelector.getUndertimeData())),
                _activeUndertime: oActiveUndertime,
                _disabledMode: bFlag
            })

            this.props.actions.undertime.setActiveRule(oActiveUndertime.id);
        }
        catch(exception){
            this.setState({_status: [0,CONSTANTS.ERROR.SERVER]})
            console.log('exception: ' + exception.message);
            this.props.actions.undertime.updateStatus([0,CONSTANTS.ERROR.SERVER]);
        }
    }

    _updateActiveRule = (iActiveRule) => {
        let oNewActive = JSON.parse(JSON.stringify(undertimeSelector.getActiveUndertimeFromID(iActiveRule)));
        this.setState({ _activeUndertime: oNewActive })
    }

    _saveRule = () => {
        if(!oHelper.isStringEmptyOrSpace(this.state._activeUndertime.name)){
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
                data: this.state._activeUndertime,
            };

            undertimeApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                /* console.log('===========SAVE UNDERTIME===========');
                console.log('INPUT: ' + JSON.stringify(oInput));
                console.log('OUTPUT: ' + JSON.stringify(res)); */
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
                /* console.log('INPUT: ' + JSON.stringify(oInput)); */
                this.setState({
                    _promptShow: false,
                    _msgBoxShow: true,
                    _msgBoxType: 'error-ok',
                    _resMsg: exception.message
                })
            });
        }
        else{
            /* console.log('SHOULD BE AN ERROR PROMPT!'); */
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: 'Unable to save. Please input Rule Name.'
            });
        }
    }

    _toggleUndertime = (value) => {
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

        undertimeApi.toggleSwitch(oInput)
        .then((response) => response.json())
        .then((res) => {
            /* console.log('INPUT: ' + JSON.stringify(oInput));
            console.log('OUTPUT: ' + JSON.stringify(res)); */
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
                this._setUndertimeSwitch(value);
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
            /* console.log('INPUT: ' + JSON.stringify(oInput)); */
            this.setState({
                _promptShow: false,
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: exception.message
            })
        });
    }

    _deleteActiveRule = (value) => {
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
            id: this.state._activeUndertime.id
        };

        undertimeApi.remove(oInput)
        .then((response) => response.json())
        .then((res) => {
            /* console.log('INPUT: ' + JSON.stringify(oInput));
            console.log('OUTPUT: ' + JSON.stringify(res)); */
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
                this.props.actions.undertime.setActiveRule('')
                this._popActiveRuleFromStore(value);
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
            /* console.log('INPUT: ' + JSON.stringify(oInput)); */
            this.setState({
                _promptShow: false,
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: exception.message
            })
        });
    }

    _pushNewRuleToStore = (res) => {
        let oundertimeData = {...this.state._undertimeData};
        let oData = [...oundertimeData.data];

        let oActiveUndertime = {...this.state._activeUndertime};
        oActiveUndertime.id = res.id
        oData.push(oActiveUndertime);

        oundertimeData.data = oData;

        this.props.actions.undertime.update(oundertimeData);
        this.props.actions.undertime.setActiveRule(res.id);
        this._disableAll();
        this._initValues();
    }

    _setUndertimeSwitch = (value) => {
        let oUndertime = {...this.state._undertimeData};
        oUndertime.enabled = value;
        this.props.actions.undertime.update(oUndertime);
        this._initValues();
    }

    _popActiveRuleFromStore = () => {
        let oundertime = {...this.state._undertimeData};
        let aundertimeData = [...oundertime.data];
        let iPopIndex;

        aundertimeData.map((data,index) => {
            if(data.id == this.state._activeUndertime.id){
                aundertimeData.splice(index, 1);
            }
        });

        oundertime.data = aundertimeData;
        this.props.actions.undertime.update(oundertime);
        this._initValues();
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false,
            _resMsg: '',
            _activeRequest: '',
            _activeBreakTimeIndex: ''
        });
    }

    _updateRuleName = (strVal) => {
        let oActiveUndertime = {...this.state._activeUndertime};
        oActiveUndertime.name = strVal;
        this.setState({
            _activeUndertime: oActiveUndertime
        })
    }

    _getPenaltyValue = () => {
        let oPenaltyVal = null;
        let oPenalties = [...this.state._activeUndertime.penalties];
        oPenalties.map(a => {
            if(a.id == this.state._activeUndertime.activepenalty.id){
                if(a.id == cl_deduction){
                    //no action for now
                }
                else if(a.id == cl_suspension){
                    oPenaltyVal = a.maxallowedundertime;
                }
            }
        });
        /* console.log('_getPenaltyValue: ' + oPenaltyVal); */
        return oPenaltyVal;
    }
    
    _setActiveRule = (value) => {
        this.props.actions.undertime.setActiveRule(value);
    }

    _setPenalty = (value) => {
        let strLabel = '';

        if(value==cl_deduction){
            strLabel = 'Deduction';
        }
        else{
            strLabel = 'Suspension';
        }

        let oActiveUndertime = {...this.state._activeUndertime};
        oActiveUndertime.activepenalty.id=value;
        oActiveUndertime.activepenalty.label=strLabel;
        this.setState({
            _activeUndertime: oActiveUndertime
        })
    }

    _setPenaltyValue = (strVal) =>{
        let oActiveUndertime = {...this.state._activeUndertime};
        let oPenalties = [...oActiveUndertime.penalties];
        oPenalties.map((a, index) => {
            if(a.id == this.state._activeUndertime.activepenalty.id){
                if(a.id == cl_deduction){
                    //No action for now
                }
                else if(a.id == cl_suspension){
                    oPenalties[index].maxallowedundertime = strVal;
                }
            }
        });

        oActiveUndertime.penalties = oPenalties
        
        this.setState({
            _activeUndertime: oActiveUndertime
        })
    }
    
    //Add New Rule
    _addNewRule = () => {
        this.setState({
            _activeUndertime: JSON.parse(JSON.stringify(undertimeSelector.getDefaultUndertime()))
        })
        this._enableAll();
    }

    //Cancel Add/Edit Transaction
    _cancelEdit = () => {
        this._initValues();
        this._disableAll();
        if(this.state._undertimeData.data.length === 0){
            this._toggleUndertime(false);
        }
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

    render(){
        console.log('xxxxxxxxxxxxx______REDERING UNDERTIME');
        //Loading View Status
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Undertime Policy' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress==1){
            let pTitle;
            let pType;
            let oRuleName;
            let oRightOption;
            let oRightOptionType;
            let strTitle;
            let oActivePenalty;
            let oActivePenaltyRule;
            let suspensionValue = null;

            if(this.state._disabledMode || !this.state._undertimeData.enabled){
                pTitle='Undertime';
                pType='Switch';
                oRightOption = (
                    <Switch
                        disabled={false}
                        onValueChange={ (value) => {this._toggleUndertime(value)}} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={this.state._undertimeData.enabled} 
                    />
                );
                oRightOptionType = 'Switch';
                strTitle = pTitle;

                //Rule Name
                oRuleName = (
                    <Picker
                        mode='dropdown'
                        style={styles.pickerStyle}
                        selectedValue={this.state._activeUndertime.id}
                        onValueChange={(itemValue, itemIndex) => {this._setActiveRule(itemValue)}}>
                        {
                            this.state._undertimeData.data.map((data, index) => (
                                <Picker.Item key={index} label={data.name} value={data.id} />
                            ))
                        }
                    </Picker>
                );

                //Penalty
                oActivePenalty = (
                    <Text 
                        style={{color: '#434646', 
                            height: '100%', 
                            textAlignVertical: 'center',
                            width: 150,
                            paddingLeft: 15,
                            paddingRight: 15
                        }}>
                        {this.state._activeUndertime.activepenalty.label}
                    </Text>
                );
            }
            else{
                pTitle='Add New Undertime Rule';
                pType='Text';
                oRightOption = (
                    <View style={styles.btnRightCont}>
                        <TouchableOpacity 
                            disabled={false}
                            style={styles.btnCancel}
                            activeOpacity={0.6}
                            onPress={() => {this._cancelEdit()}}>
                            <Text style={styles.txtBtn}>CANCEL</Text>
                        </TouchableOpacity>
                        <View style={{width: 10}}></View>
                        <TouchableOpacity 
                            disabled={this.state._disableBtn}
                            style={styles.btnSave}
                            activeOpacity={0.6}
                            onPress={() => {this._saveRule()}}>
                            <Text style={styles.txtBtn}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                );
                oRightOptionType = 'BUTTON';
                strTitle = pTitle;
                oRuleName = (
                    <TextInput 
                        autoCapitalize='none'
                        editable={!this.state._disabledMode}
                        placeholder='Rule Name'
                        style={{color: '#434646', paddingLeft: 10, height: '100%'}}
                        onChangeText={(text) => {this._updateRuleName(text)}}
                        value={this.state._undertimeData.name}
                        returnKeyType="done"
                        underlineColorAndroid='transparent'
                    />
                );
                oActivePenalty = (
                    <Picker
                        mode='dropdown'
                        style={styles.pickerStyle}
                        selectedValue={this.state._activeUndertime.activepenalty.id}
                        onValueChange={(itemValue, itemIndex) => {this._setPenalty(itemValue)}}>
                        {
                            this.state._activeUndertime.penalties.map((option, index) => (
                                <Picker.Item key={index} label={option.label} value={option.id} />
                            ))
                        }
                    </Picker>
                )
            }

            return(
                <View style={styles.container}>
                    { this.state._promptShow ?
                        <PromptScreen.PromptGeneric show= {this.state._promptShow} title={this.state._promptMsg}/>
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
                        <CustomCard 
                            title={strTitle} 
                            description={description_undertime} 
                            oType={oRightOptionType}
                            rightHeader={
                                oRightOption
                            }
                            hideHeader={this.props.viewOnly || false}
                        >

                        { 
                            this.state._undertimeData.enabled ? 
                                <View>
                                    <PropLevel1 
                                        name='Rule Name'
                                        content={
                                            oRuleName
                                        }
                                    />
                                    <PropTitle name='Undertime Penalties'/>
                                    <PropLevel2 
                                        name='Penalty Type'
                                        content={
                                            oActivePenalty
                                        }
                                        hideBorder={this.state._disabledMode}
                                        contentStyle={{
                                            width: 150
                                        }}
                                    />
                                    
                                    { this.state._activeUndertime.activepenalty.id == cl_deduction ?
                                        <PropLevel2 
                                            name={'A notification for undertime deduction will prompt for the employer. Deduction amount will be based on the number of minutes multiplied by the rate per minute of the employee.'}
                                            content={
                                                null
                                            }
                                            hideBorder={true}
                                            
                                            contentStyle={{
                                                width: 280,
                                            }}

                                            placeHolderStyle={{height: 140}}
                                        />
                                        : null
                                    }
                                    
                                    {
                                        this.state._activeUndertime.activepenalty.id == cl_suspension ?
                                            <PropLevel2 
                                                name={'Notify a Suspension\n' + 
                                                    'Approval when number\n' + 
                                                    'of occurences is breached'}
                                                content={
                                                    <TextInput 
                                                        editable={!this.state._disabledMode}
                                                        autoCapitalize='none'
                                                        keyboardType='numeric'
                                                        placeholder='Enter a Number'
                                                        style={{color: '#434646', height: '100%'}}
                                                        onChangeText={(text)  => {this._setPenaltyValue(text)}}
                                                        value={this._getPenaltyValue()}
                                                        returnKeyType="done"
                                                        underlineColorAndroid='transparent'
                                                    />
                                                }
                                                contentStyle={{
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    width: 150,
                                                }}
                                                hideBorder={this.state._disabledMode}
                        
                                                placeHolderStyle={{height: 100}}
                                            />
                                        : null
                                    }
                                </View>
                            : 
                            <View style={{paddingTop: 10}}>
                                    <Text>{undertime_disabled}</Text>
                                    <Text>{'\n' + undertime_enabled}</Text>
                            </View>
                        }
                        </CustomCard>
                    </ScrollView>
                    { 
                        this.state._undertimeData.enabled && this.state._disabledMode && !(this.props.viewOnly || false) ? 
                            <ActionButton 
                                bgColor='rgba(0,0,0,0.8)'
                                buttonColor="#EEB843"
                                spacing={10}>
                                <ActionButton.Item buttonColor='#26A65B' title="ADD NEW UNDERTIME RULE" onPress={() => {this._addNewRule()}}>
                                    <Icon2 name="bell-plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                
                                <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT UNDERTIME RULE" onPress={() => {this._deleteActiveRule()}}>
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
        undertime: state.companyPoliciesReducer.undertime
        
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            undertime: bindActionCreators(undertimeActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Undertime)