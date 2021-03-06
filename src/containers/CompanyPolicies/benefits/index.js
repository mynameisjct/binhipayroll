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
    CheckBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from '../styles'

//Redux
import { connect } from 'react-redux';
import * as benefitsSelector from '../data/benefits/selector';
import * as benefitsActions from '../data/benefits/actions';
import { bindActionCreators } from 'redux';

//API
import * as benefitsApi from '../data/benefits/api';

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
import FormGovBenefits from '../Forms/formGovBenefits';
import FormCompBenefits from '../Forms/formCompBenefits';

//Helper
import * as oHelper from '../../../helper';

//Class Constants
const save_loading_message = 'Saving new Company Benefit. Please wait...';
const gov_switch_loading_message = 'Switching Government Benefits Policy. Please wait...';
const comp_switch_loading_message = 'Switching Company Benefits Policy. Please wait...';
const disableBenefit_loading_message = 'Deactivating a Government Benefit. Please wait...';
const enableBenefit_loading_message = 'Activating a Government Benefit. Please wait...';

const gov_form_modify_title = 'MODIFY GOVERNMENT BENEFIT TYPE';
const comp_form_modify_title = 'MODIFY COMPANY BENEFIT TYPE';
const comp_form_add_title = 'ADD NEW COMPANY BENEFIT TYPE';

const delete_loading_message = 'Deleting a Benefit Type. Please wait...';
const expiry_loading_message = 'Updating Leave Expiry Rule. Please wait...';

const title_Gov = 'Government Benefits';
const description_Gov= 'Allow SSS, PAGIBIG, and PhilHealth';
const title_Comp = 'Company Benefits';
const description_Comp= 'Add Company Allowances';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';
const UNKNOWNERROR = 'Unable to commit transaction. An Unknown Error has been encountered. Contact BINHI-MeDFI.';

class GovernmentBenefits extends Component{
    _toggleSwitch = (value) => {
        this.props.toggleSwitch('GOVERNMENT', value);
    }

    _toggleCheckbox = (id, value) => {
        this.props.toggleCheckbox(id, value)
    }

    _openForm = (oBenefit) => {
        this.props.openForm(oBenefit)
    }

    render(){
        const govCheckbox = (id, value) => (
            <CheckBox
                onValueChange={ (val) => {this._toggleCheckbox(id, val)}} 
                value={value}
            />
        );

        const govName = (value) => (
            <View>
            </View>
        );

        const govId = (value) => (
            <View>
            </View>
        );
        
        return(
            <CustomCard 
                title={title_Gov} 
                description={description_Gov} 
                oType='Switch'
                rightHeader={
                    <Switch
                        onValueChange={ (value) => this._toggleSwitch(value)} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={ this.props.data.enabled } 
                    />
                }
            >

            {
                this.props.data.enabled ?
                    <View style={{marginTop: -20}}>
                        <PropTitle name='Government Benefits Table'/>
                        {/* <View>
                            {govCheckbox()}
                            {govName()}
                            {govId()}
                        </View> */}
                        <View style={styles.benefitsCont}>
                            <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                                <View style={styles.benefitsNameCont}>
                                    <Text style={styles.txtBreakName}>NAME</Text>
                                </View>
                                <View style={styles.benefitsAmountCont}>
                                    <Text style={styles.txtDefault}>COMPANY ID</Text>
                                </View>
                                <View style={[styles.benefitsDetailsCont, {width: 50}]}>
                                    <Text style={styles.txtDefault}>ACTIVATE</Text>
                                </View>
                            </View>
                            
                            {
                                this.props.data.data.map((oBenefit, index) => (
                                    <TouchableNativeFeedback
                                        key={index}
                                        onPress={() => this._openForm(oBenefit)}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <View style={styles.breakTimeDetailsCont}>
                                            <View style={styles.benefitsNameCont}>
                                                <Text style={[styles.txtDefault, {paddingLeft: 20}]}>{oBenefit.name}</Text>
                                            </View>
                                            <View style={styles.benefitsAmountCont}>
                                                <Text style={styles.txtDefault}>{oBenefit.compid}</Text>
                                            </View>
                                            <View style={[styles.benefitsDetailsCont, {width: 50}]}>
                                                {govCheckbox(oBenefit.id, oBenefit.enabled)}
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                ))
                            }
                        </View>
                    </View>
                :
                    <Description 
                        enabled={this.props.data.description.enabled}
                        disabled={this.props.data.description.disabled}/>
            }

            </CustomCard>
        )
    }
}

class CompanyBenefits extends Component{
    /* shouldComponentUpdate(nextProps, nextStates){
        return (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data));
    } */

    _toggleSwitch = (value) => {
        this.props.toggleSwitch('COMPANY', value);
    }

    _openForm = (oBenefit) => {
        let objBenefit = {...oBenefit};
        if (objBenefit.id == ''){
            objBenefit = {
                id: '',
                name: '',
                amountpermonth: '',
                scheme: {
                    value: "Last Pay of the Month",
                    options: ["First Pay of the Month", "Last Pay of the Month"]
                }
            }
        }
        this.props.openForm(objBenefit);   
    }

    _deleteCompBenefit = (oBenefit) => {
        this.props.removeItem(oBenefit);   
    }

    render(){
        return(
            <CustomCard 
                title={title_Comp} 
                description={description_Comp} 
                oType='Switch'
                rightHeader={
                    <Switch
                        onValueChange={ (value) => this._toggleSwitch(value)} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={ this.props.data.enabled } 
                    />
                }
            >
                {
                    this.props.data.enabled ?
                        <View>
                            <View style={{marginTop: -20}}>
                                <PropTitle name='Company Benefits Table'/>
                                <View style={styles.leaveCont}>
                                    <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                                        <View style={styles.benefitsNameCont}>
                                            <Text style={styles.txtBreakName}>NAME</Text>
                                        </View>
                                        <View style={styles.benefitsAmountCont}>
                                            <Text style={styles.txtDefault}>AMOUNT PER MONTH</Text>
                                        </View>
                                        <View style={styles.benefitsDetailsCont}>
                                            <Text style={styles.txtDefault}>SCHEME</Text>
                                        </View>
                                        <View style={styles.benefitsDeleteCont}>
                                            <Text style={styles.txtDefault}>REMOVE</Text>
                                        </View>
                                  
                                            
                                    </View>
                                    
                                    {
                                        this.props.data.data.map((oBenefit, index) => (
                                            <TouchableNativeFeedback
                                                key={index}
                                                onPress={() => this._openForm(oBenefit)}
                                                background={TouchableNativeFeedback.SelectableBackground()}>
                                                <View style={styles.breakTimeDetailsCont}>
                                                    <View style={styles.benefitsNameCont}>
                                                        <Text style={styles.txtBreakName}>{oBenefit.name}</Text>
                                                    </View>
                                                    <View style={styles.benefitsAmountCont}>
                                                        <Text style={styles.txtDefault}>{oBenefit.amountpermonth}</Text>
                                                    </View>
                                                    <View style={styles.benefitsDetailsCont}>
                                                        <Text style={styles.txtDefault}>{oBenefit.scheme.value}</Text>
                                                    </View>
                                                    <View style={styles.benefitsDeleteCont}>
                                                        <TouchableOpacity
                                                            activeOpacity={0.7}
                                                            onPress={() => {this._deleteCompBenefit(oBenefit)}}
                                                            >
                                                            <Icon size={30} name='md-close-circle' color='#EEB843' />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </TouchableNativeFeedback>
                                        ))
                                    }
                                    
                                    <View style={styles.breakTimeDetailsCont}>
                                        <View style={styles.breakNameCont}>
                                            <TouchableOpacity
                                                style={{paddingLeft: 30}}
                                                activeOpacity={0.7}
                                                onPress={() => this._openForm({id:''})}
                                                >
                                                <Icon size={30} name='md-add' color='#EEB843' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    :
                        <Description 
                            enabled={this.props.data.description.enabled}
                            disabled={this.props.data.description.disabled}/>
                }

            </CustomCard>
        )
    }
}

export class Benefits extends Component{
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
            _bShowGovForm: false,
            _bShowCompForm: false,
            _activeBenefitType: {},
            _strBenefitTitle: ''
        }
    }

    

    componentDidMount(){
        if(this.props.benefits.data){
            this._initValues();
        }
        else{
            this._getDataFromDB();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(
            (this.state._status[0] != nextProps.benefits.status[0]) &&
            (this.state._status[0] != 1)
        ){
            this.setState({ _status: nextProps.benefits.status })
        }

        if(
            (JSON.stringify(this.state._allData) !== JSON.stringify(nextProps.benefits.data)) &&
            (nextProps.benefits.status[0] == 1)
        ){
            this._initValues();
        }
    }

    _getDataFromDB = () => {
        this.props.actions.benefits.get({...this._requiredInputs(), transtype:'get'});
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
        let oAllData = JSON.parse(JSON.stringify(benefitsSelector.getAllData()));
        this.setState({
            _allData: oAllData,
            _status: [1,''],
        })
    }

    _toggleSwitch = async(strType, value) => {
        let oAllData = JSON.parse(JSON.stringify(this.state._allData));
        let bFlag = true;
        let bSuccess = false;
        let strTransType = '';
        let strLoading = '';

        switch(strType.toUpperCase()){
            case 'GOVERNMENT':
                oAllData.government.enabled = value;
                strTransType = 'requestswitchgovt';
                strLoading = gov_switch_loading_message;
                break;
            case 'COMPANY':
                oAllData.company.enabled = value;
                strTransType = 'requestswitchcomp';
                strLoading = comp_switch_loading_message;
                break;
            default:
                bFlag = false;
                break;
        }

        if(bFlag){
            bSuccess = await this._toggleSwitchToDB(strTransType, value, strLoading);
            if(bSuccess){
                this._updateAllData(oAllData);
            }
        }
    }

    _toggleSwitchToDB = async (strTransType, value, strLoading) => {
        let bFlag = false;
        this._showLoadingPrompt(strLoading);

        let oInput = this._requiredInputs();
        oInput.enabled = value;
        oInput.transtype = strTransType;

        console.log('oInput: ' + JSON.stringify(oInput));
        await benefitsApi.toggleSwitch(oInput)
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

    _toggleCheckbox = async(id, value) => {
        console.log('=======id: ' + id);
        console.log('=======value: ' + value);
        let oAllData = JSON.parse(JSON.stringify(this.state._allData));
        let oGov = oAllData.government;
        let bFlag = false;
        let bSuccess = false;
        let iBenIndex = 0;
        let strLoading = disableBenefit_loading_message;

        if(value){
            strLoading =  enableBenefit_loading_message;
        }

        oGov.data.map((oBen, index) => {
            if(oBen.id == id){
                oAllData.government.data[index].enabled = value
                bFlag = true;
                iBenIndex=index;
            }
        })

        if(bFlag){
            let oBenefit = oAllData.government.data[iBenIndex];
            bSuccess = await this._toggleCheckboxToDB({data: oBenefit}, strLoading);
            if(bSuccess){
                this._updateAllData(oAllData);
            }
        }
    }

    _toggleCheckboxToDB = async(value, strLoading) => {
        let bFlag = false;
        this._showLoadingPrompt(strLoading);

        let oInput = this._requiredInputs();
        oInput.transtype = 'modifygovtbenefits'
        oInput.government = value;

        console.log('oInput: ' + JSON.stringify(oInput));
        await benefitsApi.toggleSwitch(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('res:' + JSON.stringify(res));
                this._hideLoadingPrompt();
                bFlag = this._evaluateResponse(res);
            })
            .catch((exception) => {
                this._hideLoadingPrompt();
                this._showMsgBox('error-ok', exception.message);
            });

        return bFlag;
    }

    _updateAllData = (value) => {
        this.setState({
            _allData: value
        })
        this.props.actions.benefits.update(value);
    }

    //Gov Form
    _openGovForm = (value) => {
        this.setState({
            _activeBenefitType: value,
            _bShowGovForm: true,
            _strBenefitTitle: gov_form_modify_title
        })
    }

    _onGovFormCommit = async(value) => {
        let oRes = {};
        let government = {data: value};
        try{
            let oInput = this._requiredInputs();

            oInput.government = {...government};
            oInput.transtype = 'modifygovtbenefits';

            console.log('oInput: ' + JSON.stringify(oInput));
            await benefitsApi.create(oInput)
                .then((response) => response.json())
                .then((res) => {
                    console.log('OUTPUT: ' + JSON.stringify(res));
                    oRes = res;
                    if(res.flagno==1){
                        this._evaluateResponse(res);
                        this._closeGovForm();
                        this._updateGovBenefitsData(value);
                    }
                })
                .catch((exception) => {
                    this._showMsgBox('error-ok', exception.message);
                    oRes={flagno:0, message: exception.message};
                });
        }
        catch(exception){
            oRes={flagno:0, message: UNKNOWNERROR};
            this._showMsgBox('error-ok', exception.message);
        };
        return oRes;
    }

    _closeGovForm = () => {
        this.setState({_bShowGovForm: false})
    }

    _updateGovBenefitsData = (value) => {
        try{
            let oAllData = {...this.state._allData};
            let oGov = oAllData.government;
            let bFlag = false;
            
            oAllData.government.data.map((x, index) => {
                if(x.id == value.id){
                    oGov.data[index].compid = value.compid;
                    bFlag = true;
                }
            })

            if(bFlag){
                oAllData.government = oGov;
                this._updateAllData(oAllData);
            }
        }
        catch(exception){
            this._showMsgBox('error-ok', exception.message);
        }
    }

    //Company Form
    _openCompForm = (value) => {
        let strTitle = comp_form_modify_title;
        if(value.id == ''){
            strTitle = comp_form_add_title;
        }
        this.setState({
            _activeBenefitType: value,
            _bShowCompForm: true,
            _strBenefitTitle: strTitle
        })
    }

    _onCompFormCommit = async(value) => {
        let oRes = {};
        let company = {data: value};
        let oInput = this._requiredInputs();

        oInput.company = {...company};
        if(value.id==''){
            oInput.transtype = 'addcompbenefits';
        }
        else{
            oInput.transtype = 'updatecomptbenefits';
        }

        console.log('oInput: ' + JSON.stringify(oInput));
        await benefitsApi.create(oInput)
            .then((response) => response.json())
            .then((res) => {
                console.log('OUTPUT: ' + JSON.stringify(res));
                oRes = res;
                if(res.flagno==1){
                    this._closeCompForm();
                    this._evaluateResponse(res);
                    this._updateCompBenefitsData(value, res);
                    
                }
            })
            .catch((exception) => {
                this._showMsgBox('error-ok', exception.message);
            });

        return oRes;
    }

    _closeCompForm = () => {
        this.setState({_bShowCompForm: false})
    }
    
    _updateCompBenefitsData = (value, res) => {
        try{
            let curBenefit = value;
            let oAllData = {...this.state._allData};
            let oComp = oAllData.company;
            let bFlag = false;
            if(curBenefit.id==''){
                curBenefit.id = res.id;
                oAllData.company.data.push(curBenefit);
            }
            else{
                oComp.data.map((x, index) => {
                    if(x.id == value.id){
                        oAllData.company.data[index].name = value.name;
                        oAllData.company.data[index].amountpermonth = value.amountpermonth;
                        oAllData.company.data[index].scheme = value.scheme;
                        bFlag = true;
                    }
                })
            }

            if(bFlag){
                oAllData.company = oComp;
                this._updateAllData(oAllData);
            }
        }
        catch(exception){
            this._showMsgBox('error-ok', exception.message);
        }
    }

    //Delete Company Benefit
    _deleteCompBenefit = (value) => {
        this._showLoadingPrompt(delete_loading_message)
        let oInput = this._requiredInputs();

        oInput.id = value.id || '';
        oInput.transtype = 'delete';

        console.log('oInput: ' + JSON.stringify(oInput));
        benefitsApi.remove(oInput)
            .then((response) => response.json())
            .then((res) => {
                this._hideLoadingPrompt();
                if(this._evaluateResponse(res)){
                    this._deleteCompBenefitFromStore(value);
                }
            })
            .catch((exception) => {
                this._showMsgBox('error-ok', exception.message);
            });
    }

    _deleteCompBenefitFromStore = (value) => {
        let oAllData = {...this.state._allData};
        let objIndex = oAllData.company.data.findIndex((obj => obj.id == value.id));

        oAllData.company.data.splice(objIndex, 1);

        this.setState({
            _allData: oAllData
        })
        this.props.actions.benefits.update(oAllData);
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
    _evaluateResponse = async(res) => {
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

    _hideLoadingPrompt = () => {
        this.setState({
            _promptShow: false
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

    _onFormClose = () => {
        this.setState({
            _bShowCompForm: false,
            _bShowGovForm: false
        })
    }

    render(){
        console.log('xxxxxxxxxxxxx______REDERING BENEFITS');
        console.log('======================this.state._status: ' + this.state._status);
        console.log('======================this.state._allData: ' + JSON.stringify(this.state._allData));
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Benefits Policy' onRefresh={this._getDataFromDB}/>
            ); 
        }

        else if(pProgress==1){
            return(
                <View style={styles.container}>

                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={this._getDataFromDB}
                            />
                        }
                    >
                        <GovernmentBenefits 
                            data={this.state._allData.government}
                            toggleSwitch={this._toggleSwitch}
                            toggleCheckbox={this._toggleCheckbox}
                            openForm={this._openGovForm}/>

                        <CompanyBenefits 
                            data={this.state._allData.company}
                            toggleSwitch={this._toggleSwitch}
                            openForm={this._openCompForm}
                            removeItem={this._deleteCompBenefit}/>

                    </ScrollView>
                    
                    <PromptScreen.PromptGeneric 
                        show= {this.state._promptShow} 
                        title={this.state._promptMsg}/>

                    <MessageBox
                        promptType={this.state._msgBoxType}
                        show={this.state._msgBoxShow}
                        onClose={this._closeMsgBox}
                        onWarningContinue={this._continueActionOnWarning}
                        message={this.state._resMsg}/>

                    <FormGovBenefits
                        data={this.state._activeBenefitType}
                        title={this.state._strBenefitTitle}
                        show={this.state._bShowGovForm}
                        onFormClose={this._onFormClose}
                        onDone={this._onGovFormCommit}/>

                    <FormCompBenefits
                        data={this.state._activeBenefitType}
                        title={this.state._strBenefitTitle}
                        show={this.state._bShowCompForm}
                        onFormClose={this._onFormClose}
                        onDone={this._onCompFormCommit}/>
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
        benefits: state.companyPoliciesReducer.benefits
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            benefits: bindActionCreators(benefitsActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Benefits)
