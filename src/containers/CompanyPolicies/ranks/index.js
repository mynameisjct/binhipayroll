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
    render() {
        const ele = (value) => (
            <TouchableOpacity onPress={() => this._alert(value)}>
                <View style={styles.leavesTable.contDeleteBtn}>
                    <Icon size={25} name='md-close-circle' color='#D75450' />
                </View>
            </TouchableOpacity>
        );
        const tableHead = ['NAME', 'PAID DAYS', 'DELETE'];
        const tableData = [
            ['Multi-Purpose Leave', '2', ele('')],
            ['Sick Leave', '5', ele('')],
        ];

        
        return (
            <View style={styles.leavesTable.container}>
                <Table borderStyle={styles.leavesTable.border}>
                    <Row data={tableHead} style={styles.leavesTable.head} flexArr={[1.5, 1, 0.5]} textStyle={styles.leavesTable.text.header}/>
                    <Rows data={tableData} style={styles.leavesTable.row} flexArr={[1.5, 1, 0.5]} textStyle={styles.leavesTable.text.content}/>
                </Table>
                <View style={styles.leavesTable.contAddBtn}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.leavesTable.addBtn}
                        onPress={() => this.props.showLeaves('LEAVES')}>

                        <Text style={styles.leavesTable.txtBtn}>Add New Leave Type</Text>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export class Ranks extends Component{
    constructor(props){
        super(props);
        this.state = {
            _bRefreshingRules: false,
            _disabledMode: false,
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
                    label: 'TARDINESS',
                    value: ''
                },
                undertime:{
                    label:"UNDERTIME",
                    value: ''
                },
                overtime:{
                    label:"OVERTIME",
                    value: ''
                }
            },
            _leavesData: [],
            _modalVisible: false,
            _activePolicy: ''
        }
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
            let bFlag = true;
            let oAllData = JSON.parse(JSON.stringify(ranksSelector.getAllData()));
            let oActiveData = JSON.parse(JSON.stringify(
                this.props.ranks.activeRule == '' ||  isNaN(this.props.ranks.activeRule) ?
                ranksSelector.getDefaultActive() : ranksSelector.getDataFromID(this.props.ranks.activeRule)
            ));
            
            if (!oActiveData){
                oActiveData = JSON.parse(JSON.stringify(this.state._defaultData));
                bFlag = false;
            }

            
            this._setActiveRules(oActiveData);
            this.setState({
                _allData: oAllData,
                _activeData: oActiveData,
                /* _disabledMode: bFlag */
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

    render(){
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
                    <ScrollView>
                        <CustomCard title={CARD_TITLE} oType='Text'>
                            <PropLevel1 
                                name='Rank Name' 
                                content={
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
                                contentStyle={styles.level2Styles.cont}
                            />
                            <PropTitle name='Leave Policy'/>
                            <LeavesTable 
                                data={this.state._leavesData}
                                deleteItem={()=>{}} 
                                showLeaves={(strType) => this._showPolicy(strType)}
                                />
                        </CustomCard>
                    </ScrollView>

                    {vPolicy}

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