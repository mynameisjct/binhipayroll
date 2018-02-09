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
    Button
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

//helper
import * as oHelper from '../../../helper';

//Constants
import {CONSTANTS} from '../../../constants';
const CARD_TITLE = 'Employee Ranks'

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
            <TouchableOpacity onPress={() => this._alert(value)}>
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
        console.log('rending leaves table')

        let tableHead = ['NAME', 'PAID DAYS'];
        if(!this.props.disabledMode){
            tableHead = ['NAME', 'PAID DAYS', 'DELETE'];
        }
        console.log('this.state._arrTableData: ' + this.state._arrTableData);

        return (
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
}

export class Ranks extends Component{
    constructor(props){
        super(props);
        this.state = {
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
                    () => this.props.actions.tardiness.setActiveRule(oActiveRule.id)
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
                    () => this.props.actions.undertime.setActiveRule(oActiveRule.id)
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
                    () => this.props.actions.overtime.setActiveRule(oActiveRule.id)
                )
                break;

            case 'LEAVES':
                oActiveRule = JSON.parse(JSON.stringify(
                    overtimeSelector.getActiveRuleFromID(this.props.overtime.activeRule)
                ));
                /* oActiveData.overtime.label = oActiveRule.name;
                oActiveData.overtime.value = oActiveRule.id; */
                this.setState({
                    _activeData: oActiveData
                },
                    () => this.props.actions.overtime.setActiveRule(oActiveRule.id)
                )
                break;

            default:
                break;
        }

        this.setState({ _modalVisible: false })
    }

    _updateActiveName = (value) => {
        oActiveData = {...this.state._activeData};
        oActiveData.name.value = value;
        this.setState({ _activeData: oActiveData })
    }

    _cancelEdit = () => {
        this._initValues();
    }

    _saveRule = () => {
        if(oHelper.isStringEmptyOrSpace(this.state._activeData.id)){
        
        }
        else{
            this._updateLeaveType(this.state._activeData);
        }
    }

    _pushNewLeaveType = (id, value) => {
        let oAllData = {...this.state._allData};
        let oDataArray = [...oAllData.data];

        let oActiveType = {...value};
        oActiveType.id = id
        oDataArray.push(oActiveType);

        oAllData.data = oDataArray;
        this.props.actions.leaves.update(oAllData);
        this.props.actions.leaves.setActiveRule(id);
        this._initValues();
    }

    _updateLeaveType = (value) => {
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
        })
    }

    _modifyRule = () => {
        this.setState({ _disabledMode: false })
    }

    _deleteActiveRule = () => {

    }

    //DEDAULT FUNCTIONS
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
        console.log('_allData: ' + JSON.stringify(this.state._allData));
        console.log('this.state._activePolicy: ' + this.state._activePolicy);
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
                                deleteItem={()=>{}} 
                                showLeaves={(strType) => this._showPolicy(strType)}
                                disabledMode={this.state._disabledMode}
                                />
                        </CustomCard>
                    </ScrollView>

                    {vPolicy}
                    { 
                        this.state._disabledMode ?
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
        undertime: state.companyPoliciesReducer.undertime
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