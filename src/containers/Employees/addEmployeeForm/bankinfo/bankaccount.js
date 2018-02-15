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

//Styles
import styles from '../personalinfo/styles';
import stylesheet from '../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../global/tcomb-custom-select-android';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../data/activeProfile/actions';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';

//Helper
import * as oHelper from '../../../../helper';

const Form = t.form.Form;

export class BankAccount extends Component {
  constructor(props){
    super(props);
    this.state={
      _oBankAccount: {
          bankname: '',
          accountnumber: ''
      }
    }
  }

  _onChangeData = (value) => {

    let oData = JSON.parse(JSON.stringify(this.state._oBankAccount));
    oData.bankname = value.bankname || '';
    oData.accountnumber = value.accountnumber || '';
    this.setState({_oBankAccount: oData})
  }

  _onPress = () => {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXX');
    console.log('this.state._oBankAccount: ' + JSON.stringify(this.state._oBankAccount));
    const navigation = this.props.logininfo.navigation;
    let oBankInfo = this.refs.form_bankinfo.getValue();

    if (oBankInfo) {
      this.props.actions.employee.updateBankInfo(oBankInfo);
      
      this.setState({ _oBankAccount: oBankInfo});
      navigation.navigate('EmplomentDetails');
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
        </View>
    );
  }
}

function mapStateToProps (state) {
  return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        oEmployeeBankInfo: state.employees.activeProfile.data.bakinfo
  }
}

function mapDispatchToProps (dispatch) {
  return {
      actions: {
          employee: bindActionCreators(employeeActions, dispatch),
      },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankAccount)