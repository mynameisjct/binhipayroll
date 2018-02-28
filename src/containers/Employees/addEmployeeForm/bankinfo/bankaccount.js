import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  DatePickerAndroid,
  Button,
  TextInput,
  Alert
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import moment from "moment";
import { withNavigation } from 'react-navigation';

//Styles
import styles from '../personalinfo/styles';
import stylesheet from '../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../global/tcomb-custom-select-android';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../data/activeProfile/actions';

//API
import * as employeeApi from '../../data/activeProfile/api'

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
import * as PromptScreen from '../../../../components/ScreenLoadStatus';
import MessageBox from '../../../../components/MessageBox';

//Helper
import * as oHelper from '../../../../helper';

//CONSTANTS
const add_loading_message = 'Saving New Employee Bank Information. Please wait.';
const update_loading_message = 'Saving Employee Bank Information. Please wait...';

const Form = t.form.Form;

export class BankAccount extends Component {
  constructor(props){
    super(props);
    this.state={
      _oBankAccount: {
          bankname: '',
          accountnumber: ''
      },

      
      //Gereric States
      _promptShow: false,
      _promptMsg: '',
      _msgBoxShow: false,
      _msgBoxType: '',
      _resMsg: '',
      _refreshing: false,
      _disabledMode: true,
      _status: [2, 'Loading...'],
      _hasSentRequest: false,
    }
  }

  componentWillReceiveProps(nextProps){
    if(
        (this.props.formTriggerNext.index !== nextProps.formTriggerNext.index) &&
        (nextProps.formTriggerNext.key === this.props.navigation.state.key)
    ){
        this._onPress();
    }
  }

  _onChangeData = (value) => {

    let oData = JSON.parse(JSON.stringify(this.state._oBankAccount));
    oData.bankname = value.bankname || '';
    oData.accountnumber = value.accountnumber || '';
    this.setState({_oBankAccount: oData})
  }

  _onPress = async() => {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXX');
    console.log('this.state._oBankAccount: ' + JSON.stringify(this.state._oBankAccount));
    const navigation = this.props.logininfo.navigation;
    let oBankInfo = this.refs.form_bankinfo.getValue();

    if (oBankInfo) {
      this.props.actions.employee.updateBankInfo(oBankInfo);
      this.setState({ _oBankAccount: oBankInfo}, this._saveAndNavigate());
      
    }

    else{
      Alert.alert(
        'Error',
        'One of the inputs is invalid. Please check the highlighted fields.',
        [
          {text: 'Review Form', onPress: () => {}},
        ],
        { cancelable: false }
      )
    }
  }

  _saveAndNavigate = async() => {
    const navigation = this.props.logininfo.navigation;
    let bSuccess = await this._saveDataToDB({id: this.props.oEmployee.id, bankinfo: this.props.oEmployeeBankInfo});
    if(bSuccess){
        navigation.navigate('EmplomentDetails');
    }
  }


  _saveDataToDB = async(oData) => {
    this._showLoadingPrompt(add_loading_message);

    let bFlag = false;

    await employeeApi.bankinfo.update(oData)
        .then((response) => response.json())
        .then((res) => {
            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX');
            console.log('res: ' + JSON.stringify(res));
            this._hideLoadingPrompt();
            bFlag = this._evaluateResponse(res);
        })
        .catch((exception) => {
            this._hideLoadingPrompt();
            this._showMsgBox('error-ok', exception.message);
        });

    return bFlag;
}


  //GENERIC METHODS
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


  render() {
    //This is put into render method to allow direct access to class properties
    EMPLOYEE_BANKINFO = t.struct({
        bankname: oHelper.isStringEmptyOrSpace(this.state._oBankAccount.accountnumber) ? t.maybe(t.String) : t.String,
        accountnumber: oHelper.isStringEmptyOrSpace(this.state._oBankAccount.bankname) ? t.maybe(t.String) : t.String
    })
      
    { /********** OPTIONS **********/ }
    const OPTIONS = {
        fields: {
            bankname:{ 
                label: 'BANK NAME (Optional)' ,
                returnKeyType: 'next',
                onSubmitEditing: (event) => {this.refs.form_bankinfo.getComponent('accountnumber').refs.input.focus()},
                error: '*You have an Account Number input. Enter a Bank Name.'
            },
            accountnumber:{ 
                label: 'ACCOUNT NUMBER (Optional)',
                returnKeyType: 'done',
                error: '*You have an Bank Name input. Enter an Account Number.'
            }
        },
        stylesheet: stylesheet
    };

    return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.contFormBankInfo}>

                <Form 
                  ref='form_bankinfo'
                  type={EMPLOYEE_BANKINFO} 
                  value={this.state._oBankAccount}
                  onChange={this._onChangeData}
                  options={OPTIONS}/>

            </View>

            <View style={{flex:1, marginTop: 100, alignSelf: 'center', width: 400}}>
              <Button
                  onPress={this._onPress}
                  title='Next'
                  color="#3b5998"
                  accessibilityLabel='Next'
              />
            </View>
          </ScrollView>
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
}

function mapStateToProps (state) {
  return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        oEmployeeBankInfo: state.employees.activeProfile.data.bankinfo,
        oEmployee: state.employees.activeProfile.data,
        formTriggerNext: state.employees.formTriggerNext
  }
}

function mapDispatchToProps (dispatch) {
  return {
      actions: {
          employee: bindActionCreators(employeeActions, dispatch),
      },
  }
}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccount))