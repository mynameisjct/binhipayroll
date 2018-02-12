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

//helper
import * as oHelper from '../../../helper';
import * as blackOps from '../../../global/blackOps';

//Constants
import {CONSTANTS} from '../../../constants';
const CARD_TITLE = 'Employee Ranks'

const add_loading_message = 'Saving New Rank. Please wait...';
const update_loading_message = 'Updating Existing Rank. Please wait...';
const delete_loading_message = 'Updating Existing Rank. Please wait...';

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
        console.log('JSON.stringify(nextProps.data): ' + JSON.stringify(nextProps.data))
        console.log('JSON.stringify((this.state._curData): ' + JSON.stringify(this.state._curData))
        console.log('this.state._curDisabledMode: ' + this.state._curDisabledMode)
        console.log('nextProps.disabledMode: ' + nextProps.disabledMode)
        if(
            (JSON.stringify(this.state._curData) !== JSON.stringify(nextProps.data)) || 
            (this.state._curDisabledMode !== nextProps.disabledMode)
        ){
            this._initValues(nextProps.data, nextProps.disabledMode);
        }
    }

    componentDidMount = () => {  
        console.log('DID MOUNT');
        this._initValues(this.props.data, this.props.disabledMode); 
    }

    _initValues = async(oData, oDisabledMode) => {
        console.log('INIT LEAVES TABLE!');
        let arrLeaves = await this._generateLeavesArray(oData, oDisabledMode);
        this.setState({
            _arrTableData: [...arrLeaves],
            _bDidMount: true,
            _curData: JSON.parse(JSON.stringify(oData)),
            _curDisabledMode: oDisabledMode
        })
    }

    _generateLeavesArray = async(oLeave, disabledMode) => {
        console.log('disabledMode: ' + disabledMode);
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
        console.log('arrLeaves: ' + JSON.stringify(arrLeaves));
        return arrLeaves;
    }

    _/* mapData = async(oLeave, disabledMode) => {
        
    } */

    render() {
        if(this.state._bDidMount){
            if(this.state._arrTableData.length > 0){
                console.log('rending leaves table')

                let tableHead = ['NAME', 'PAID DAYS'];
                if(!this.props.disabledMode){
                    tableHead = ['NAME', 'PAID DAYS', 'DELETE'];
                }
                console.log('this.state._arrTableData: ' + this.state._arrTableData);

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

export class Ranks extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Gereric States
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            _refreshing: false,
            _disabledMode: true,
            _status: [2, 'Loading...'],

            _allData: {},
            _activeData: {},
            _defaultData: {
                id:'',
                name:{
                    label:'NAME',
                    value:''
                },
                tardiness:{
                    label: 'OFF',
                    value: ''
                },
                undertime:{
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
        this.props.actions.ranks.setActiveRule('');
        this.props.actions.tardiness.setActiveRule('');
        this.props.actions.overtime.setActiveRule('');
        this.props.actions.undertime.setActiveRule('');
    }

    componentDidMount(){
        if(this.props.ranks.data){
            this._initValues();
            this.setState({_status: [1,'']})
        }
        else{
            this._getDataFromDB();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.ranks.status[0]){
                this.setState({ _status: nextProps.ranks.status })
        }

        if(
            (JSON.stringify(this.state._allData) !== JSON.stringify(nextProps.ranks.data)) &&
            (nextProps.ranks.status[0] == 1)
        ){
            this._initValues();
        }
    }

    _getDataFromDB = () => {
        this.props.actions.ranks.get({...this._requiredInputs(), transtype:'get'});
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
            /* let bFlag = true; */
            let oAllData = JSON.parse(JSON.stringify(ranksSelector.getAllData()));
            let oActiveData = JSON.parse(JSON.stringify(
                this.props.ranks.activeRule == '' ||  isNaN(this.props.ranks.activeRule) ?
                ranksSelector.getDefaultActive() : ranksSelector.getDataFromID(this.props.ranks.activeRule)
            ));
            
            if (!oActiveData){
                oActiveData = JSON.parse(JSON.stringify(this.state._defaultData));
                /* bFlag = false; */
            }

            
            this._setActiveRules(oActiveData);
            this.setState({
                _allData: oAllData,
                _activeData: oActiveData,
                _disabledMode: true
            })
            

            this.props.actions.ranks.setActiveRule(oActiveData.id);
        }
        catch(exception){
            console.log('exception: ' + exception.message);
            this.setState({_status: [0,CONSTANTS.ERROR.SERVER]})
        }
    }

    _setActiveData = async(value) => {
        let oNewActive = JSON.parse(JSON.stringify(ranksSelector.getDataFromID(value)));
        this.setState({
            _activeData: oNewActive
        })
        
        this.props.actions.ranks.setActiveRule(oNewActive.id);
        this._setActiveRules(oNewActive);
    }

    _setActiveRules = (oActiveData) => {
        if(!oHelper.isStringEmptyOrSpace(String(oActiveData.id))){
            this.props.actions.ranks.setActiveRule(oActiveData.id);
            this.props.actions.tardiness.setActiveRule(oActiveData.tardiness.value);
            this.props.actions.overtime.setActiveRule(oActiveData.overtime.value);
            this.props.actions.undertime.setActiveRule(oActiveData.undertime.value);
        }
    }

    _showPolicy = (strType) => {
        console.log('XXXX=strType: ' + strType);
        let strPolicy = strType.toUpperCase()
        this.setState({
            _activePolicy: strPolicy,
            _modalVisible: true,
        })
    }

    _setPolicyModalVisibility = (bFlag) => {
        this.setState({ _modalVisible: bFlag })
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
                        this.props.actions.ranks.updateTardiness(oActiveData.tardiness);
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
                        this.props.actions.ranks.updateUndertime(oActiveData.undertime);
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
                        this.props.actions.ranks.updateOvertime(oActiveData.overtime);
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
        console.log('index:' + index)
        let oActiveData = {...this.state._activeData};
        oActiveData.leaves.data = oHelper.removeElementByIndex(oActiveData.leaves.data, index);

        this.setState({ _activeData: oActiveData });
    }

    _updateActiveName = (value) => {
        oActiveData = {...this.state._activeData};
        oActiveData.name.value = value;
        this.setState({ _activeData: oActiveData });
    }

    _cancelEdit = () => {
        this._initValues();
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
        await this.props.actions.ranks.setActiveRule(id);
        let oAllData = {...this.state._allData};
        let oDataArray = [...oAllData.data];

        let oActiveType = {...value};
        oActiveType.id = id
        oDataArray.push(oActiveType);

        oAllData.data = oDataArray;
        this.props.actions.ranks.update(oAllData);
        this._initValues();
    }

    _updateRule = (value) => {
        let oAllData = {...this.state._allData}; 
        let objIndex = oAllData.data.findIndex((obj => obj.id == value.id));
        
        oAllData.data[objIndex]=value;

        this.props.actions.ranks.update(oAllData);
        this._initValues();
    }

    _addRule = () => {
        this.setState({ 
            _activeData: JSON.parse(JSON.stringify(this.state._defaultData)),
            _disabledMode: false
        },
            () => this._setActiveRules(this.state._activeData)
        )
        
    }

    _modifyRule = () => {
        this.setState({ _disabledMode: false })
    }

    _deleteActiveRule = async() => {
        if(blackOps.mode){
            this._deleteRuleFromStore(this.state._activeData)
        }
        else{
            this._deleteRuleFromDB(this.state._activeData)
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

    _deleteRuleFromStore = async(oActiveData) => {
        await this.props.actions.ranks.setActiveRule('');
        let oAllData = {...this.state._allData}; 
        let indexActive = oAllData.data.findIndex((obj => obj.id == oActiveData.id));
        oAllData.data = oHelper.removeElementByIndex(oAllData.data, indexActive);
        this.props.actions.ranks.update(oAllData);
        this._initValues();
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
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        console.log('_allData: ' + JSON.stringify(this.state._allData));
        console.log('this.state._activeData: ' + JSON.stringify(this.state._activeData));
        console.log('this.props.ranks.activeRule: ' + this.props.ranks.activeRule);
        console.log('this.props.tardiness.activeRule: ' + this.props.tardiness.activeRule);
        console.log('this.props.overtime.activeRule: ' + this.props.overtime.activeRule);
        console.log('this.props.undertime.activeRule: ' + this.props.undertime.activeRule);
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Tardiness Policy' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress==1){
            let bIsEmpty = this.state._allData.data.length < 1 ? true : false;
            let oActivePolicy = null;
            switch(this.state._activePolicy){
                case 'TARDINESS':
                    oActivePolicy = (<Tardiness/>)
                    break;
                case 'OVERTIME':
                    oActivePolicy = (<Overtime/>)
                    break;
                case 'UNDERTIME':
                    oActivePolicy = (<Undertime/>)
                    break;
                case 'LEAVES':
                    oActivePolicy = (<Leaves/>)
                    break;
                default:
                    break;
            }
    
            const vPolicy = (
                <Modal
                    transparent = {true}
                    visible={this.state._modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => {this._setPolicyModalVisibility(false)}}
                >
                    <View style={styles.modalRules.container}>
                        <View style={styles.modalRules.innerCont}>
                            <View style={styles.modalRules.titleCont}>
                                <Text style={styles.modalRules.txtHeader}>
                                    {
                                        this.state._activePolicy === 'LEAVES' ?
                                            'Add Leave Type'
                                        :   
                                            'Select a Rule or Modify Policy'
                                    }
                                </Text>
                            </View>

                            <View style={styles.modalRules.contentCont}>
                                { oActivePolicy }
                            </View>

                            <View style={styles.modalRules.footerCont}>
                                <TouchableOpacity 
                                    style={styles.modalRules.btnContLeft}
                                    onPress={() => this._setPolicyModalVisibility(false)}>
                                        <Text style={styles.modalRules.txtBtn}>CANCEL</Text>
                                </TouchableOpacity>


                                <TouchableOpacity 
                                    style={styles.modalRules.btnContRight}
                                    onPress={() => this._updateRuleValue()}>
                                        <Text style={styles.modalRules.txtBtn}>
                                            {
                                                this.state._activePolicy === 'LEAVES' ?
                                                    'ADD'
                                                :   
                                                    'OK'
                                            }
                                        </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
            return(
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={this._getDataFromDB}
                            />
                        }>
                        <CustomCard 
                            title={CARD_TITLE} 
                            oType={!this.state._disabledMode ? 'button' : 'text'}
                            rightHeader={
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
                                                this.state._disabledMode ?
                                                    <Picker
                                                        mode='dropdown'
                                                        selectedValue={this.state._activeData.id}
                                                        onValueChange={(itemValue, itemIndex) => {this._setActiveData(itemValue)}}>
                                                        {
                                                            this.state._allData.data.map((data, index) => (
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
                                                    value={this.state._activeData.name.value}
                                                    returnKeyType="done"
                                                    underlineColorAndroid='transparent'
                                                />
                                            }
                                            
                                        />
                                        <PropTitle name='Time Policies'/>
                                        <PropLevel2 
                                            name='Tardiness Rule'
                                            content={
                                                <Text 
                                                    style={styles.level2Styles.txt}
                                                    disabled={this.state._disabledMode}
                                                    onPress={() => this._showPolicy('TARDINESS')}>
                                                    {this.state._activeData.tardiness.label}
                                                </Text>
                                            }
                                            hideBorder={this.state._disabledMode}
                                            contentStyle={styles.level2Styles.cont}
                                        />
                                        <PropLevel2 
                                            name='Undertime Rule'
                                            content={
                                                <Text 
                                                    style={styles.level2Styles.txt}
                                                    disabled={this.state._disabledMode}
                                                    onPress={() => this._showPolicy('UNDERTIME')}>
                                                    {this.state._activeData.undertime.label}
                                                </Text>
                                            }
                                            hideBorder={this.state._disabledMode}
                                            contentStyle={styles.level2Styles.cont}
                                        />
                                        <PropLevel2 
                                            name='Overtime Rule'
                                            content={
                                                <Text 
                                                    style={styles.level2Styles.txt}
                                                    disabled={this.state._disabledMode}
                                                    onPress={() => this._showPolicy('OVERTIME')}>
                                                    {this.state._activeData.overtime.label}
                                                </Text>
                                            }
                                            hideBorder={this.state._disabledMode}
                                            contentStyle={styles.level2Styles.cont}
                                        />
                                        <PropTitle name='Leave Policy'/>
                                        <LeavesTable 
                                            data={this.state._activeData.leaves}
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
                            <ActionButton 
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