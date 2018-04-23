import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    Switch,
    ScrollView,
    RefreshControl
} from 'react-native';
import CustomCard, {PropLevel2} from '../../../components/CustomCards';
import GenericContainer from '../../../components/GenericContainer';
import EmployeeSavingsPolicyForm from './form';
import * as PromptScreen from '../../../components/ScreenLoadStatus';

//Styles
import styles from './styles';

//helper
import * as oHelper from '../../../helper';

//Component Constants
const TITLE = 'Employee Savings Policy';
const DESCRIPTION = 'Automatically Deduct Savings on every Pay Day'
const SWITCH_COLOR_ON = '#838383';
const SWITCH_COLOR_THUMB = '#EEB843';
const SWITCH_COLOR_TINT = '#505251';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as savingsPolicyActions from '../data/savings/actions';

//API
import * as savingsApi from '../data/savings/api';

export class EmployeeSavingsPolicy extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            showEmployeeSavingsPolicyForm: false, 
            disabledMode: false,
            data: {
                
                isenabled: true,
                datedisplayformat: 'MMM DD YYYY',
                datedisplayformformat: 'MMMM DD, YYYY'
            },

            loadingScreen: {
                show: false,
                msg: 'test'
            },

            msgBox: {
                show: false,
                type: '',
                msg: '',
                param: ''
            },
            
        }
    }

    componentDidMount(){
        if(this.props.savingsPolicy.status[0] != 1){
            this._fetchDataFromDB();
        }
    }

    _fetchDataFromDB= () => {
        this.props.actions.savingsPolicy.get();
    }

    _toggleSwitch = (value) => {
        const oSavPol = this.props.savingsPolicy.data;

        if(value){
            this._setEmpSavPolForm(value);
        }else{
            this._setMessageBox(
                true, 
                'yes-no',
                oSavPol ? oSavPol.msgdisablepolicy : '',
                ['SWITCHOFFPOLICY', value]
            );
        }
    }

    _onCloseEmpSavPolForm = () => {
        const msg = 'Any unsaved data will be lost. Are you sure you want to exit from ' + 
            TITLE + 
            ' set-up ?'
        this._setMessageBox(
            true, 
            'yes-no',
            msg,
            ['CLOSEPOLICYFORM', true]
        )
    }
    
    _onSubmitEmpSavPolForm = (value) => {
        this._setMessageBox(
            true, 
            'yes-no',
            this.props.savingsPolicy.data.questionupdatepolicy,
            ['UPDATEPOLICY', value]
        )
    }

    _updateEmpSavPol= async(data) => {
        this._setLoadingScreen(true, this.props.savingsPolicy.data.loadingupdatepolicy);
        await savingsApi.update(data)
            .then((response) => response.json())
            .then((res) => {
                console.log('RES: ' + JSON.stringify(res));
                if(res.flagno == 1){
                    this._updateLocalStore(data);
                    this._setEmpSavPolForm(false);
                }
                this._setMessageBox(true, res.flagno==1 ? 'success' : 'error-ok', res.message);
            })
            .catch((exception) => {
                /* this._setMessageBox(true, 'error-ok', 'Failed to update ' + TITLE); */
                this._setMessageBox(true, 'error-ok', exception.message);
            });

        this._setLoadingScreen(false);
    }

    _updateLocalStore(data){
        let oData = {...this.props.savingsPolicy.data};
        oData.validfrom = data.validfrom;
        oData.validto = data.validto;
        oData.amount = data.amount;
        oData.isenabled = data.isenabled;
        this.props.actions.savingsPolicy.update(oData);
    }
 
    _setEmpSavPolForm = (value) => {
        this.setState({
            showEmployeeSavingsPolicyForm: value
        });
    }

    _setMessageBox = (show, type, msg, param) => {
        this.setState({
            msgBox: oHelper.setMsgBox(
                this.state.msgBox,
                show, 
                type,
                msg,
                param
            )
        })
    }

    _setLoadingScreen = (show, msg) => {
        let oLoadingScreen = {...this.state.loadingScreen};
        oLoadingScreen.show = show;
        oLoadingScreen.msg = msg;
        this.setState({ loadingScreen: oLoadingScreen });
    }

    _msgBoxOnClose = (params) => {
        this.setState({
            msgBox: oHelper.clearMsgBox(this.state.msgBox)
        })
    }

    _msgBoxOnYes = (param) => {
        console.log('param: ' + param );
        let oData = null;
        switch(param[0].toUpperCase()){
            case 'SWITCHOFFPOLICY':
                oData = {...this.props.savingsPolicy.data};
                oData.validfrom = null;
                oData.validto = null;
                oData.amount = 0;
                oData.isenabled = param[1];
                this._updateEmpSavPol(oData);
                break;

            case 'CLOSEPOLICYFORM':
                this._setEmpSavPolForm(false);
                this._setMessageBox(false);
                break;

            case 'UPDATEPOLICY':
                this._setMessageBox(false);
                oData = {...param[1]};
                oData.isenabled = true;
                this._updateEmpSavPol(oData);
                break;

            default:
                this._setMessageBox(false);
                break;
        }
    }

    _onPress = () => {
        let oLoadingScreen = {...this.state.loadingScreen};
        oLoadingScreen.show = true;
        oLoadingScreen.msg = 'HAHAHHAhAHA';;
        
        this.setState({
            loadingScreen: oLoadingScreen
        });
    }

    render(){
        const oSavPol = this.props.savingsPolicy.data;
        const oSavPolStatus = this.props.savingsPolicy.status;
        
        if(!oSavPol){
            return <PromptScreen.PromptLoading title={TITLE}/>;
        }

        else{
            const lvl2BtnStyle = styles.level2Styles.button;
            const lvl2TextStyle = styles.level2Styles.txt;
            const lvl2ContStyle = styles.level2Styles.cont;
            const lvl2PlaceholderStyle = styles.level2Styles.placeHolder;
            const specialNoteStyle = styles.specialNoteStyle;
            const noteStyles = styles.noteStyles;

            const oBody = 
                <View>
                    <PropLevel2 
                        name={oSavPol.labelamount}
                        content={
                            <Text 
                                style={this.state.disabledMode ?  lvl2TextStyle :  lvl2BtnStyle}
                                disabled={ this.state.disabledMode ? true : false }
                                onPress={() => this._setEmpSavPolForm(true)}
                            >
                                { oSavPol.amount }
                            </Text>
                        }
                        hideBorder={true}
                        placeHolderStyle={lvl2PlaceholderStyle}
                        contentStyle={lvl2ContStyle}
                    />

                    <PropLevel2 
                        name={ oSavPol.labelvalidfrom }
                        content={
                            <Text 
                                style={this.state.disabledMode ?  lvl2TextStyle :  lvl2BtnStyle}
                                disabled={ this.state.disabledMode ? true : false }
                                onPress={() => this._setEmpSavPolForm(true)}
                            >
                                { oHelper.convertDateToString(oSavPol.validfrom, oSavPol.displaydateformat) }
                            </Text>
                        }
                        hideBorder={true}
                        placeHolderStyle={lvl2PlaceholderStyle}
                        contentStyle={lvl2ContStyle}
                    />
                    <PropLevel2 
                        name={oSavPol.labelvalidto}
                        content={
                            <Text 
                                style={this.state.disabledMode ?  lvl2TextStyle :  lvl2BtnStyle}
                                disabled={ this.state.disabledMode ? true : false }
                                onPress={() => this._setEmpSavPolForm(true)}
                            >
                                { oSavPol.validto ? 
                                    oHelper.convertDateToString(oSavPol.validto, oSavPol.displaydateformat) :
                                    oSavPol.displaydatenull 
                                }
                            </Text>
                        }
                        hideBorder={true}
                        placeHolderStyle={lvl2PlaceholderStyle}
                        contentStyle={lvl2ContStyle}
                    />
                    <View style={specialNoteStyle.container}>
                        <Text style={specialNoteStyle.txt}>
                            {oSavPol.note}
                        </Text>  
                    </View>
                </View>;
            
            const oDisabledContent = 
                <View style={noteStyles.container}>
                    <View style={noteStyles.content}>
                        <Text style={noteStyles.txtTitle}>Policy is currently turned OFF.</Text>
                    </View>
                        
                    <View style={noteStyles.content}>
                        <Text style={noteStyles.txtDescription}>{oSavPol.noteDisabled}</Text>
                    </View>
                    <View style={noteStyles.content}>
                        <Text style={noteStyles.txtDescription}>{oSavPol.noteEnabled}</Text>
                    </View>
                </View>

            return(
                <GenericContainer
                    msgBoxShow = {this.state.msgBox.show}
                    msgBoxType = {this.state.msgBox.type}
                    msgBoxMsg = {this.state.msgBox.msg}
                    msgBoxOnClose = {this._msgBoxOnClose}
                    msgBoxOnYes = {this._msgBoxOnYes}
                    msgBoxParam = {this.state.msgBox.param}
                    loadingScreenShow = {this.state.loadingScreen.show}
                    loadingScreenMsg = {this.state.loadingScreen.msg}
                    status={this.props.savingsPolicy.status}
                    title={ oSavPol.title}
                    onRefresh={this._fetchDataFromDB}>
                    <ScrollView
                        scrollEnabled={this.props.scrollEnabled && true}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._fetchDataFromDB}
                            />
                        }
                    >
                        <CustomCard 
                            title={TITLE} 
                            oType='switch'
                            description = { oSavPol.description }
                            rightHeader = {
                                <Switch
                                    onValueChange={ (value) => {this._toggleSwitch(value)}} 
                                    onTintColor={SWITCH_COLOR_ON}
                                    thumbTintColor={SWITCH_COLOR_THUMB}
                                    tintColor={SWITCH_COLOR_TINT}
                                    value={oSavPol.isenabled}
                                />
                            }
                        >
                    
                            { oSavPol.isenabled ? oBody : oDisabledContent }
                            <EmployeeSavingsPolicyForm 
                                onCancel={this._onCloseEmpSavPolForm}
                                onSubmit={this._onSubmitEmpSavPolForm}
                                visible={this.state.showEmployeeSavingsPolicyForm}
                                title='EMPLOYEE SAVINGS POLICY'
                                data={oSavPol}
                            />
                        
                        </CustomCard>
                    </ScrollView>
                </GenericContainer>
            );
        }
    }
    
}

function mapStateToProps (state) {
    return {
        savingsPolicy: state.companyPoliciesReducer.savings
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            savingsPolicy: bindActionCreators(savingsPolicyActions, dispatch),
        }
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeSavingsPolicy)