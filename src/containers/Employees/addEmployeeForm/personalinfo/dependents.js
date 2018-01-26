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

const EMPLOYEE_SPOUSE = t.struct({
    name: t.String,
    work: t.String,
    company: t.maybe(t.String)
});

export class Dependents extends Component {
    constructor(props){
        super(props);
        this.state={
            _oSpouse: null
        }
    }

    _onPress = () => {
        const navigation = this.props.logininfo.navigation;

        let oPresentAdd = this.refs.presentadd_form.getValue();
        let oPermanentAdd = this.refs.permanentadd_form.getValue();

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

    { /********** SPOUSE INFO **********/ }
    const OPTIONS_SPOUSE = {
        fields: {
            name:{ 
                label: 'NAME' ,
            },
            work:{ 
                label: 'WORK',
            },
            company:{ 
                label: 'COMPANY',
            }
        },
        stylesheet: stylesheet
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contDivider}>
            <View style={styles.contFormLeft}>
                { /********** SPOUSE Information **********/ }
                <View style={styles.contTitle}>
                    <PropTitle name='SPOUSE INFORMATION'/>
                </View>
                <Form 
                    ref='presentadd_form'
                    type={EMPLOYEE_SPOUSE} 
                    value={this.state._oSpouse}
                    options={OPTIONS_SPOUSE}/>
            </View>

            <View style={styles.contFormRight}>
              { /********** Dependents Information **********/ }
                <View style={styles.contTitle}>
                    <PropTitle name='DEPENDENTS INFORMATION'/>
                </View>
                <CustomForm.Dynamic2DListType1 
                    ref={(oInstance) => {this.emailList = oInstance;}}
                    label='DEPENDENT' 
                    placeholder='Enter Name'
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