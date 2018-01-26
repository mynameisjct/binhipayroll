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
import styles from './styles';
import stylesheet from '../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../global/tcomb-customTemplate';

//Redux
import { connect } from 'react-redux';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
  
const Form = t.form.Form;

export class Dependents extends Component {
    constructor(props){
        super(props);
        this.state={
            _oSpouse: null
        }
    }

    _onPress = () => {
        const navigation = this.props.logininfo.navigation;

        if (oPresentAdd && oPermanentAdd) {
        navigation.navigate('Family');
        }
        else{
            Alert.alert(
                'Error',
                'One of the inputs is invalid. Check the highlighted fields.',
                [
                {text: 'Review Form', onPress: () => {}},
                ],
                { cancelable: false }
            )
        }
    }

    render() {
    //This is put into render method to allow direct access to class properties

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contDivider}>
            <View style={styles.contFormLeft}>
                { /********** Work Experience Information **********/ }
                <View style={styles.contTitle}>
                    <PropTitle name='WORK EXPERIENCE'/>
                </View>
                <CustomForm.Dynamic2DListType2 
                    ref={(oInstance) => {this.emailList = oInstance;}}
                    label='TEST' 
                    placeholder1='Enter Name'
                    placeholder2='Enter Name'
                    value={[
                        {textVal: 'Isaac Newton', optionVal: 'Parent'},
                        {textVal: 'Jose Einstein', optionVal: 'Child'}
                    ]}
                    keyboardType='default'
                    prompt='RELATIONSHIP TO EMPLOYEE'
                    options={[
                        '-',
                        'Spouse',
                        'Child',
                        'Parent',
                        'Brother',
                        'Sister',
                        'Relative',
                    ]}/>
            </View>

            <View style={styles.contFormRight}>
              { /********** Dependents Information **********/ }
                <View style={styles.contTitle}>
                    <PropTitle name='EDUCATION'/>
                </View>
                <CustomForm.Dynamic2DListType2 
                    ref={(oInstance) => {this.emailList = oInstance;}}
                    label='TEST' 
                    placeholder1='Enter Name'
                    placeholder2='Enter Name'
                    value={[
                        {textVal: 'Isaac Newton', optionVal: 'Parent'},
                        {textVal: 'Jose Einstein', optionVal: 'Child'}
                    ]}
                    keyboardType='default'
                    prompt='RELATIONSHIP TO EMPLOYEE'
                    options={[
                        '-',
                        'Spouse',
                        'Child',
                        'Parent',
                        'Brother',
                        'Sister',
                        'Relative',
                    ]}/>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps (state) {
  return {
      logininfo: state.loginReducer.logininfo,
      activecompany: state.activeCompanyReducer.activecompany
  }
}

export default connect(
  mapStateToProps,
)(Dependents)