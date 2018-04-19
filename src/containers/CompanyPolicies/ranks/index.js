//Modules and Packages
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
    Modal,
    Button,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Selectors
import * as ranksSelector from '../data/ranks/selector';
import * as tardinessSelector from '../data/tardiness/selector';
import * as undertimeSelector from '../data/undertime/selector';
import * as overtimeSelector from '../data/overtime/selector';
import * as leavesSelector from '../data/leaves/selector';

//Actions
import * as ranksActions from '../data/ranks/actions';
import * as tardinessActions from '../data/tardiness/actions';
import * as undertimeActions from '../data/undertime/actions';
import * as overtimeActions from '../data/overtime/actions';
import * as leavesActions from '../data/leaves/actions';

//API
import * as ranksApi from '../data/ranks/api';

//Styles
import styles from './styles';

//Children Components
import TabsRoot from './tabs/root';
import Tardiness from '../tardiness';
import Overtime from '../overtime';
import Undertime from '../undertime';
import Leaves from '../leaves';

//Custom Components
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import MessageBox from '../../../components/MessageBox';
import GenericContainer from '../../../components/GenericContainer';
import FormModal from '../../../components/FormModal';
    
//helper
import * as oHelper from '../../../helper';
import * as blackOps from '../../../global/blackOps';

//Constants
import {CONSTANTS} from '../../../constants';
const TITLE = 'Employee Ranks'

const add_loading_message = 'Saving New Rank. Please wait...';
const update_loading_message = 'Updating Existing Rank. Please wait...';
const delete_loading_message = 'Updating Existing Rank. Please wait...';

export class Ranks extends Component{
    constructor(props){
        super(props);
        this.state = {
            _activeType: '',
            //Gereric States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            _refreshing: false,
            _disabledMode: true,

            _allData: {},
            _activeData: null,
            _defaultData: {
                id:'',
                name:{
                    label:'NAME',
                    value:''
                },
                tardiness: {
                    label: 'OFF',
                    value: ''
                },
                undertime: {
                    label:"OFF",
                    value: ''
                },
                overtime:{
                    label:"OFF",
                    value: ''
                },
                leaves:{
                    data:[]
                }
            },
            _modalVisible: false,
            _activePolicy: ''
        }
    }

    componentWillUnmount(){
        this.props.actions.tardiness.setActiveRule('');
        this.props.actions.overtime.setActiveRule('');
        this.props.actions.undertime.setActiveRule('');
    }

    componentDidMount(){
        if(this.props.ranks.status[0] != 1){
            this._getDataFromDB();
        }
    }

    _getDataFromDB = () => {
        this.props.actions.ranks.get({...this._requiredInputs(), transtype:'get'});
    }

    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
        })
    }

    _setActiveData = async(oActive) => {
        console.log('XXXXXXXX: _setActiveData-oActive:' + oActive);
        let oNewActive = oHelper.getElementByPropValue(
            this.props.ranks.data.data,
            'id',
            oActive
        )
        this._setActiveRules(oNewActive);
    }

    _setActiveRules = (oActiveData) => {
        console.log('XXXXXX_setActiveRules-oActiveData: ' + JSON.stringify(oActiveData));
        if(!oHelper.isStringEmptyOrSpace(String(oActiveData.id))){
            this.props.actions.ranks.setActiveRule(oActiveData);
            this.props.actions.tardiness.setActiveRule(oActiveData.tardiness.value);
            this.props.actions.overtime.setActiveRule(oActiveData.overtime.value);
            this.props.actions.undertime.setActiveRule(oActiveData.undertime.value);
        }
    }

    _showPolicy = async (strType, value) => {
        /* console.log('XXXX=strType: ' + strType); */
        let iActiveID = (value && value !== 0) ? value : '';
        switch(strType.toUpperCase()){
            case 'UNDERTIME':
                await this.props.actions.undertime.setActiveRule(iActiveID);
                break;
            case 'TARDINESS':
                await this.props.actions.tardiness.setActiveRule(iActiveID);
                break;
            case 'OVERTIME':
                await this.props.actions.overtime.setActiveRule(iActiveID);
                break;
        }
        let strPolicy = strType.toUpperCase()
        this.setState({
            _activePolicy: strPolicy,
            _modalVisible: true,
        })
    }

    _updateRuleValue = () => {
        let oActiveRule = null;
        let oActiveData = {...this.state._activeData};
        switch(this.state._activePolicy){
            case 'TARDINESS':
                oActiveRule = JSON.parse(JSON.stringify(
                    tardinessSelector.getActiveTardinessFromID(this.props.tardiness.activeRule)
                ));
                oActiveData.tardiness.label = oActiveRule.name;
                oActiveData.tardiness.value = oActiveRule.id;
                this.setState({
                    _activeData: oActiveData
                },
                    () =>{
                        this.props.actions.tardiness.setActiveRule(oActiveRule.id);
                    }
                )
                break;
            case 'UNDERTIME':
                oActiveRule = JSON.parse(JSON.stringify(
                    undertimeSelector.getActiveUndertimeFromID(this.props.undertime.activeRule)
                ));
                oActiveData.undertime.label = oActiveRule.name;
                oActiveData.undertime.value = oActiveRule.id;
                this.setState({
                    _activeData: oActiveData
                },
                    () => {
                        this.props.actions.undertime.setActiveRule(oActiveRule.id);
                    }
                )
                break;
            case 'OVERTIME':
                oActiveRule = JSON.parse(JSON.stringify(
                    overtimeSelector.getActiveRuleFromID(this.props.overtime.activeRule)
                ));
                oActiveData.overtime.label = oActiveRule.name;
                oActiveData.overtime.value = oActiveRule.id;
                this.setState({
                    _activeData: oActiveData
                },
                    () => {
                        this.props.actions.overtime.setActiveRule(oActiveRule.id);
                    }
                )
                break;

            case 'LEAVES':
                oActiveRule = JSON.parse(JSON.stringify(
                    leavesSelector.getRuleFromID(this.props.leaves.activeRule)
                ));
                let obj = {
                    value: oActiveRule.id,
                    label: oActiveRule.name,
                    paiddays: oActiveRule.allowablecount.value
                }
                oActiveData.leaves.data.push(obj);

                this.setState({
                    _activeData: oActiveData
                },
                    () => {
                        this.props.actions.ranks.updateLeaves(oActiveData.leaves);
                    }
                );
                break;

            default:
                break;
        }

        this.setState({ _modalVisible: false })
    }

    _deleteLeaveItem = async(index) => {
        /* console.log('index:' + index) */
        let oActiveData = {...this.state._activeData};
        oActiveData.leaves.data = oHelper.removeElementByIndex(oActiveData.leaves.data, index);

        this.setState({ _activeData: oActiveData });
    }

    _updateActiveName = (value) => {
        oActiveData = {...this.state._activeData};
        oActiveData.name.value = value;
        this.setState({ _activeData: oActiveData });
    }

    _destroyEnabledMode = () => {
        this.setState({
            _disabledMode: true,
            _activeData: null,
            _modalVisible: false
        })
    }

    _hidePolicyModal = () => {
        this.setState({ _modalVisible: false });
    }

    _saveRule = async() => {
        if(oHelper.isStringEmptyOrSpace(this.state._activeData.id)){
            if(blackOps.mode){
                let oAllData = {...this.state._allData};
                let maxid = 0;
                oAllData.data.map(oData => {
                    if (oData.id > maxid) {
                        maxid = oData.id;    
                    }
                });
                this._pushNewRule(maxid+1, this.state._activeData);
            }
            else{
                this._saveRuleToDB(this.state._activeData);
            }
        }else{
            if(blackOps.mode){
                this._updateRule(this.state._activeData);
            }
            else{
                this._updateRuleToDB(this.state._activeData);
            }
        }
    }

    _saveRuleToDB = async(value) => {
        this._showLoadingPrompt(add_loading_message);

        let bFlag = false;
        let oInput = {data: value};

        await ranksApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                console.log('res: ' + JSON.stringify(res));
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno==1){
                    this._pushNewRule(res.id,value);
                }
                
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }

    _updateRuleToDB = async(value) => {
        this._showLoadingPrompt(update_loading_message);

        let bFlag = false;
        let oInput = {data: value};

        await ranksApi.update(oInput)
            .then((response) => response.json())
            .then((res) => {
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno==1){
                    this._updateRule(value);
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }

    _pushNewRule = async (id, value) => {
        let oAllData = oHelper.copyObject(this.props.ranks.data);
        let oDataArray = [...oAllData.data];

        let oActiveType = {...value};
        oActiveType.id = id
        oDataArray.push(oActiveType);

        oAllData.data = oDataArray;
        console.log('_pushNewRule-oAllData: ' + JSON.stringify(oAllData));
        console.log('_pushNewRule-oActiveType: ' + JSON.stringify(oActiveType));
        this.props.actions.ranks.update(oAllData);
        this.props.actions.ranks.setActiveRule(oActiveType);
        this._destroyEnabledMode();
    }

    _updateRule = (value) => {
        let oAllData = oHelper.copyObject(this.props.ranks.data);
        let objIndex = oAllData.data.findIndex((obj => obj.id == value.id));
        
        oAllData.data[objIndex]=value;

        this.props.actions.ranks.update(oAllData);
        this.props.actions.ranks.setActiveRule(value);
        this._destroyEnabledMode();
    }

    _addRule = () => {
        this.setState({ 
            _activeData: oHelper.copyObject(this.state._defaultData),
            _disabledMode: false
        },
            () => this._setActiveRules(this.state._activeData)
        )
    }

    _modifyRule = () => {
        this.setState({ 
            _activeData: oHelper.copyObject(this.props.ranks.activeRule),
            _disabledMode: false 
        })
    }

    _deleteActiveRule = async() => {
        if(blackOps.mode){
            this._deleteRuleFromStore(this.props.ranks.activeRule)
        }
        else{
            this._deleteRuleFromDB(this.props.ranks.activeRule)
        }
    }

    _deleteRuleFromDB = async(value) => {
        this._showLoadingPrompt(delete_loading_message);
        
        let bFlag = false;
        let oInput = {data: value};

        await ranksApi.remove(oInput)
            .then((response) => response.json())
            .then((res) => {
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
                if(res.flagno==1){
                    this._deleteRuleFromStore(value);
                }
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }

    _deleteRuleFromStore = (oActiveData) => {
        let oAllData = oHelper.copyObject(this.props.ranks.data);
        if(oAllData.data.length > 0){
            this.props.actions.ranks.setActiveRule(oAllData.data[0]);
        }
        else{
            this.props.actions.ranks.setActiveRule(null);
        }
        let indexActive = oAllData.data.findIndex((obj => obj.id == oActiveData.id));
        oAllData.data = oHelper.removeElementByIndex(oAllData.data, indexActive);
        this.props.actions.ranks.update(oAllData);
        this._destroyEnabledMode();
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
                this._showMsgBox('error-ok', CONSTANTS.ERROR.UNKNOWN);
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

    _onFormClose = () => {
        this.setState({
            _bShowCompForm: false,
            _bShowGovForm: false
        })
    }

    render(){
        console.log('===RENDERING: Ranks');
        console.log('XXXXXXXXXXXthis.props.ranks.activeRule: ' + JSON.stringify(this.props.ranks.activeRule));
        console.log('XXXXXXXXXXXthis.props.ranks.data: ' + JSON.stringify(this.props.ranks.data));
        const pStatus = [...this.props.ranks.status];
        const pProgress = pStatus[0];
        const oAllData = this.props.ranks.data;
        const oActiveData = this.props.ranks.activeRule || oHelper.copyObject(this.state._defaultData)
        let oActivePolicy = null;
        let vPolicy = null;
        let strFormTitle = '';
        const bIsEmpty = this.props.ranks.data ?
                            (this.props.ranks.data.data.length > 0 ? false : true) :
                            false
        
        if(pProgress == 1){
            switch(this.state._activePolicy){
                case 'TARDINESS':
                    oActivePolicy = (
                        <Tardiness 
                            disableClearActiveOnUnmount = {true}
                            viewOnly = {this.state._disabledMode}
                        />
                    )
                    strFormTitle = 'Tardiness Rules';
                    break;
                case 'OVERTIME':
                    oActivePolicy = (
                        <Overtime 
                            disableClearActiveOnUnmount = {true}
                            viewOnly = {this.state._disabledMode}
                        />
                    )
                    strFormTitle = 'Overtime Rules';
                    break;
                case 'UNDERTIME':
                    oActivePolicy = (
                        <Undertime
                            disableClearActiveOnUnmount = {true}
                            viewOnly = {this.state._disabledMode}
                        />
                    )
                    strFormTitle = 'Undertime Rules';
                    break;
                case 'LEAVES':
                    oActivePolicy = (<Leaves/>)
                    strFormTitle = 'Leave Rules';
                    break;
                default:
                    break;
            }

            vPolicy = (
                <FormModal 
                    cancelLabel={this.state._disabledMode ? 'Close' : 'Cancel'}
                    submitLabel={this.state._disabledMode ? 'OK' : 'Select'}
                    viewOnly={this.state._disabledMode}
                    containerStyle={styles.form.container}
                    visible={this.state._modalVisible}
                    onCancel={this._hidePolicyModal}
                    onOK={this._updateRuleValue}
                    title={ this.state._disabledMode ? strFormTitle : 
                        this.state._activePolicy === 'LEAVES' ?
                            'Add Leave Type' : 
                            'Select a Rule or Modify Policy' 
                    }
                >

                    <View style={styles.form.content}>
                        { oActivePolicy }
                    </View>
                    
                </FormModal>
            );
        }

        return(
            <GenericContainer 
                status={this.props.ranks.status}
                title={TITLE}
                onRefresh={this._getDataFromDB}>

                {
                    pProgress == 1 ?
                        <View style={styles.container}>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state._refreshing}
                                        onRefresh={this._getDataFromDB}
                                    />
                                }>
                                <CustomCard 
                                    hideHeader={this.props.hideHeader || false}
                                    title={this.props.title || TITLE} 
                                    oType={!this.state._disabledMode ? 'button' : 'text'}
                                    rightHeader={
                                        <View style={styles.btnRightCont}>
                                            <TouchableOpacity 
                                                disabled={false}
                                                style={styles.btnCancel}
                                                activeOpacity={0.6}
                                                onPress={this._destroyEnabledMode}>
                                                <Text style={styles.txtBtn}>CANCEL</Text>
                                            </TouchableOpacity>
                                            <View style={{width: 10}}></View>
                                            <TouchableOpacity 
                                                disabled={this.props.disabledMode}
                                                style={styles.btnSave}
                                                activeOpacity={0.6}
                                                onPress={() => {this._saveRule()}}>
                                                <Text style={styles.txtBtn}>SAVE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                >
                                    {
                                        bIsEmpty && this.state._disabledMode ? 
                                            <TouchableOpacity 
                                                activeOpacity={0.6}
                                                style={styles.contEmpty}
                                                onPress={() => {this._addRule()}}>
                                                <Text>No Existing Ranks. Tap here to add.</Text>
                                            </TouchableOpacity>
                                        :
                                            <View>
                                                <PropLevel1 
                                                    name='Rank Name' 
                                                    content={
                                                        this.props.viewOnly || false ?
                                                            <Text style={styles.txtDisabledValue}>
                                                                { oActiveData.name.value }
                                                            </Text>
                                                        :
                                                            this.state._disabledMode ?
                                                                <Picker
                                                                    mode='dropdown'
                                                                    selectedValue={oActiveData.id}
                                                                    onValueChange={(itemValue, itemIndex) => {this._setActiveData(itemValue)}}>
                                                                    {
                                                                        oAllData.data.map((data, index) => (
                                                                            <Picker.Item key={index} label={data.name.value} value={data.id} />
                                                                        ))
                                                                    }
                                                                </Picker>
                                                            :
                                                            <TextInput 
                                                                autoCapitalize='none'
                                                                placeholder='Leave Type Name'
                                                                style={{color: '#434646', paddingLeft: 15, paddingRight: 15, height: '100%'}}
                                                                onChangeText={(text) => this._updateActiveName(text)}
                                                                value={ this.state._disabledMode ? 
                                                                    oActiveData.name.value :
                                                                    this.state._activeData.name.value
                                                                    
                                                                }
                                                                returnKeyType="done"
                                                                underlineColorAndroid='transparent'
                                                            />
                                                    }
                                                    hideBorder={this.props.viewOnly || false}
                                                    
                                                />
                                                <PropTitle name='Time Policies'/>
                                                <PropLevel2 
                                                    name='Tardiness Rule'
                                                    content={
                                                        <Text 
                                                            style={
                                                                (this.state._disabledMode && oActiveData.tardiness.value) ? 
                                                                    styles.level2Styles.button 
                                                                : 
                                                                    styles.level2Styles.txt
                                                            }
                                                            disabled={oActiveData.tardiness.value || !this.state._disabledMode ? false : true}
                                                            onPress={
                                                                () => this._showPolicy(
                                                                    'TARDINESS',
                                                                    this.state._disabledMode ? 
                                                                        oActiveData.tardiness.value :
                                                                        this.state._activeData.tardiness.value
                                                                )
                                                            }
                                                        >
                                                            {
                                                                this.state._disabledMode ? 
                                                                    oActiveData.tardiness.label :
                                                                    this.state._activeData.tardiness.label
                                                                    
                                                            }
                                                        </Text>
                                                    }
                                                    hideBorder={this.state._disabledMode}
                                                    contentStyle={styles.level2Styles.cont}
                                                />
                                                <PropLevel2 
                                                    name='Undertime Rule'
                                                    content={
                                                        <Text 
                                                            style={
                                                                (this.state._disabledMode && oActiveData.undertime.value) ? 
                                                                    styles.level2Styles.button 
                                                                : 
                                                                    styles.level2Styles.txt
                                                            }
                                                            disabled={oActiveData.undertime.value || !this.state._disabledMode ? false : true}
                                                            onPress={
                                                                () => this._showPolicy(
                                                                    'UNDERTIME', 
                                                                    this.state._disabledMode ? 
                                                                        oActiveData.undertime.value :
                                                                        this.state._activeData.undertime.value
                                                                )
                                                            }
                                                        >
                                                            
                                                            {
                                                                this.state._disabledMode ? 
                                                                    oActiveData.undertime.label :
                                                                    this.state._activeData.undertime.label
                                                            }

                                                        </Text>
                                                    }
                                                    hideBorder={this.state._disabledMode}
                                                    contentStyle={styles.level2Styles.cont}
                                                />
                                                <PropLevel2 
                                                    name='Overtime Rule'
                                                    content={
                                                        <Text 
                                                            style={
                                                                (this.state._disabledMode && oActiveData.overtime.value) ? 
                                                                    styles.level2Styles.button 
                                                                : 
                                                                    styles.level2Styles.txt
                                                            }
                                                            disabled={oActiveData.overtime.value || !this.state._disabledMode ? false : true}
                                                            onPress={
                                                                () => this._showPolicy(
                                                                    'OVERTIME', 
                                                                    this.state._disabledMode ? 
                                                                        oActiveData.overtime.value :
                                                                        this.state._activeData.overtime.value
                                                                    )
                                                                }
                                                        >
                                                            
                                                            {
                                                                this.state._disabledMode ? 
                                                                    oActiveData.overtime.label :
                                                                    this.state._activeData.overtime.label
                                                            }
                                                            
                                                        </Text>
                                                    }
                                                    hideBorder={this.state._disabledMode}
                                                    contentStyle={styles.level2Styles.cont}
                                                />
                                                <PropTitle name='Leave Policy'/>
                                                <LeavesTable 
                                                    data={this.state._disabledMode ? 
                                                        oActiveData.leaves :
                                                        this.state._activeData.leaves
                                                        
                                                    }
                                                    deleteItem={(index) => this._deleteLeaveItem(index) } 
                                                    showLeaves={(strType) => this._showPolicy(strType)}
                                                    disabledMode={this.state._disabledMode}
                                                    />
                                            </View>
                                    }
                                </CustomCard>
                            </ScrollView>

                            {vPolicy}
                            { 
                                this.state._disabledMode && !bIsEmpty?
                                    this.props.viewOnly ? 
                                        null
                                    :
                                        <ActionButton 
                                            bgColor='rgba(0,0,0,0.8)'
                                            buttonColor="#EEB843"
                                            spacing={10}>
                                            <ActionButton.Item buttonColor='#26A65B' title="ADD NEW RANK" onPress={() => {this._addRule()}}>
                                                <Icon2 name="plus" color='#fff' size={22} style={styles.actionButtonIcon} />
                                            </ActionButton.Item>
                                            <ActionButton.Item buttonColor='#4183D7' title="MODIFY CURRENT RANK" onPress={() => {this._modifyRule()}}>
                                                <Icon2 name="table-edit" color='#fff' size={22} style={styles.actionButtonIcon} />
                                            </ActionButton.Item>
                                            <ActionButton.Item buttonColor='#D75450' title="DELETE CURRENT RANK" onPress={() => {this._deleteActiveRule()}}>
                                                <Icon2 name="delete-empty" color='#fff' size={22} style={styles.actionButtonIcon} />
                                            </ActionButton.Item>
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
                    : 
                        null
                }
            </GenericContainer>
        );
    }
}

class LeavesTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            _curData: {},
            _curDisabledMode: true,
            _arrTableData: [],
            _bDidMount: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(
            (JSON.stringify(this.state._curData) !== JSON.stringify(nextProps.data)) || 
            (this.state._curDisabledMode !== nextProps.disabledMode)
        ){
            this._initValues(nextProps.data, nextProps.disabledMode);
        }
    }

    componentDidMount = () => {  
        /* console.log('DID MOUNT'); */
        this._initValues(this.props.data, this.props.disabledMode); 
    }

    _initValues = async(oData, oDisabledMode) => {
        /* console.log('INIT LEAVES TABLE!'); */
        let arrLeaves = await this._generateLeavesArray(oData, oDisabledMode);
        this.setState({
            _arrTableData: [...arrLeaves],
            _bDidMount: true,
            _curData: JSON.parse(JSON.stringify(oData)),
            _curDisabledMode: oDisabledMode
        })
    }

    _generateLeavesArray = async(oLeave, disabledMode) => {
        /* console.log('disabledMode: ' + disabledMode); */
        const ele = (value) => (
            <TouchableOpacity onPress={() => this.props.deleteItem(value)}>
                <View style={styles.leavesTable.contDeleteBtn}>
                    <Icon size={25} name='md-close-circle' color='#D75450' />
                </View>
            </TouchableOpacity>
        );
        let arrLeaves= [];
        await oLeave.data.map((oData, index) => {
            let arrTemp = [];
            arrTemp.push(oData.label);
            arrTemp.push(oData.paiddays);
            if(!disabledMode){
                arrTemp.push(ele(index));
            }
            arrLeaves.push(arrTemp);
        })
        /* console.log('arrLeaves: ' + JSON.stringify(arrLeaves)); */
        return arrLeaves;
    }

    _/* mapData = async(oLeave, disabledMode) => {
        
    } */

    render() {
        if(this.state._bDidMount){
            if(this.state._arrTableData.length > 0){
                /* console.log('rending leaves table')
 */
                let tableHead = ['NAME', 'PAID DAYS'];
                if(!this.props.disabledMode){
                    tableHead = ['NAME', 'PAID DAYS', 'DELETE'];
                }
               /*  console.log('this.state._arrTableData: ' + this.state._arrTableData); */

                return(
                    <View style={styles.leavesTable.container}>
                        <Table borderStyle={styles.leavesTable.border}>
                            <Row data={tableHead} style={styles.leavesTable.head} flexArr={[1.5, 1, 0.5]} textStyle={styles.leavesTable.text.header}/>
                            <Rows data={this.state._arrTableData} style={styles.leavesTable.row} flexArr={[1.5, 1, 0.5]} textStyle={styles.leavesTable.text.content}/>
                        </Table>
                        {
                            !this.props.disabledMode ?
                                <View style={styles.leavesTable.contAddBtn}>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        style={styles.leavesTable.addBtn}
                                        onPress={() => this.props.showLeaves('LEAVES')}>

                                        <Text style={styles.leavesTable.txtBtn}>Add New Leave Type</Text>

                                    </TouchableOpacity>
                                </View>
                            : null
                        }
                    </View>
                )
            }
            else{
                return(
                        <View>
                            {
                                !this.props.disabledMode ?
                                    <View style={styles.leavesTable.emptyContAddBtn}>
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                            style={styles.leavesTable.emptyLeavesBtn}
                                            onPress={() => this.props.showLeaves('LEAVES')}>

                                            <Text style={styles.leavesTable.txtBtn}>No Leaves assigned for the current rank. Press this button to add a Leave Type.</Text>

                                        </TouchableOpacity>
                                    </View>
                                :
                                    <PropLevel2 
                                        name='No Assigned Leaves'
                                        content={null}
                                        hideBorder={true}
                                    />
                            }
                        </View>
                    
                )
            }
        }
        else{
            return (
                <View style={styles.leavesTable.container}>
                    <ActivityIndicator
                        animating = {!this.state._bDidMount}
                        color = '#EEB843'
                        size = "small"/>
                </View>
            )
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        ranks: state.companyPoliciesReducer.ranks,
        tardiness: state.companyPoliciesReducer.tardiness,
        overtime: state.companyPoliciesReducer.overtime,
        undertime: state.companyPoliciesReducer.undertime,
        leaves: state.companyPoliciesReducer.leaves
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ranks: bindActionCreators(ranksActions, dispatch),
            tardiness: bindActionCreators(tardinessActions, dispatch),
            overtime: bindActionCreators(overtimeActions, dispatch),
            undertime: bindActionCreators(undertimeActions, dispatch),
            leaves: bindActionCreators(leavesActions, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ranks)