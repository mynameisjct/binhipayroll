/**************************************************************
 *  FileName:           formLeaves.js
 *  Description:        Leaves Form
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-11

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    TouchableNativeFeedback,
    TimePickerAndroid,
    Keyboard,
    ToastAndroid, 
    Picker
} from 'react-native';
import moment from "moment";

//Styles
import styles from './styles';

//Custom Components
import SaveHeaderPrompt from '../../../components/SaveHeaderPrompt';
import {isStringEmptyOrSpace} from '../../../helper';
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';

//Constants
const edit_loading_message = 'Saving changes on Company Benefits. Please wait...'
const add_loading_message = 'Saving new Company Benefit. Please wait...'

export default class FormCompBenefits extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Component States
            _showForm: false,
            _disableSave: true,
            
            //Props
            _id: '',
            _name: '',
            _amountpermonth: '',
            _scheme: {},

            //Messagebox
            _msgBoxType: '',
            _msgBoxShow: false,
            _resMsg: '',

            //Promt
            _promptShow: false,
            _promptMsg: ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(!this.props.show && (this.props.show!=nextProps.show)){
            let objData = {...nextProps.data}
            this.setState({
                _id: objData.id,
                _name: objData.name,
                _amountpermonth: ''+objData.amountpermonth,
                _scheme: objData.scheme
            })
        }
    }

    _updateName = (value) => {
        this.setState({
            _name: value,
        },
            () => {
                this._evaluateSaveButton();
            }
        )
    }

    _updateAmount = (value) => {
        let strLastChar = value.slice(-1);
        if(!isNaN(value)){
            this.setState({
                _amountpermonth: value,
            },
                () => { this._evaluateSaveButton() }
            )
        }
        else{
            this._showToast('INVALID INPUT. INPUT ONLY NUMBERS AND DASH (-).')
        }
    }

    _updateScheme = (value) => {
        let oScheme = {...this.state._scheme};
        oScheme.value = value;
        this.setState({_scheme: oScheme}, ()=> {this._evaluateSaveButton()});
    }

    _evaluateSaveButton = () => {
        let bDisabled = true;
        
        if((this.props.data.name != this.state._name || 
            this.props.data.amountpermonth != this.state._amountpermonth ||
            this.props.data.scheme.value != this.state._scheme.value) &&
            !isStringEmptyOrSpace(this.state._name) && 
            !isStringEmptyOrSpace(this.state._amountpermonth)) {
                
            bDisabled = false;
        }

        this.setState({
            _disableSave: bDisabled
        })
    }

    _onCommit = async() => {
        Keyboard.dismiss();
        this._showPrompt();
        let oData = {
            id: this.state._id,
            name: this.state._name,
            amountpermonth: this.state._amountpermonth,
            scheme: {...this.state._scheme}
        }

        let oRes = await this.props.onDone(oData);
        this._hideLoadingPrompt();
        if (oRes.flagno == 0){
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: oRes.message
            })
        }
    }

    _showPrompt = () =>{
        let strMsg = add_loading_message;

        if(this.state.id == ''){
            strMsg = edit_loading_message;
        }

        this.setState({
            _promptShow: true,
            _promptMsg: strMsg
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

    _showToast = (value) => {
        ToastAndroid.show(value, ToastAndroid.SHORT);
    }

    render(){
        
        if (!this.props.show){
            return null;
        }
        else{
            return(
                <Modal 
                    animationType="fade"
                    transparent={true}
                    visible={this.props.show}
                    onRequestClose={() => {}}>
                    <View style={styles.container}>
                        <PromptScreen.PromptGeneric 
                            show= {this.state._promptShow} 
                            title={edit_loading_message}/>
                        <SaveHeaderPrompt 
                            title={this.props.title}
                            commitTitle='SAVE'
                            onFormClose={() => this.props.onFormClose()}
                            disableSave={this.state._disableSave}
                            onDone={() => {this._onCommit()}}/>
                        <View style={styles.formCont}>
                            <View style={styles.fieldCont}>
                                <Text style={styles.txtNameLabel}>NAME</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {this._updateName(inputTxt)}}
                                    value={this.state._name}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="done"
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                />
                            </View>
                            <View style={styles.fieldCont}>
                                <Text style={styles.txtNameLabel}>AMOUNT PER MONTH</Text>
                                <TextInput 
                                    style={styles.textinputField}
                                    onChangeText={inputTxt => {this._updateAmount(inputTxt)}}
                                    value={this.state._amountpermonth}
                                    underlineColorAndroid='#D1D4D6'
                                    returnKeyType="done"
                                    keyboardType='numeric'
                                />
                            </View>

                            <View style={styles.fieldCont}>
                                <Text style={styles.txtNameLabel}>SCHEME</Text>
                                <View style={{borderBottomWidth: 1.5, borderColor: '#D1D4D6', height: 45, marginLeft: 2, marginRight: 2}}>
                                    <Picker
                                        prompt='Select Month'
                                        mode='dropdown'
                                        style={{marginLeft: -15}}
                                        selectedValue={this.state._scheme.value}
                                        onValueChange={(itemValue, itemIndex) => {this._updateScheme(itemValue)}}>
                                        {
                                            this.state._scheme.options.map((data, index) => (
                                                <Picker.Item key={index} label={data} value={data} />
                                            ))
                                        }
                                    </Picker>
                                </View>
                                
                            </View>
                        </View>

                        <MessageBox
                            promptType={this.state._msgBoxType}
                            show={this.state._msgBoxShow}
                            onClose={this._closeMsgBox}
                            onWarningContinue={this._continueActionOnWarning}
                            message={this.state._resMsg}
                        />
                        
                    </View>
                </Modal>
            );
        }
    }
}