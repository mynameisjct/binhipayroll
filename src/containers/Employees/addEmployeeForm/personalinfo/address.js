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

const Province = t.enums({
    Province: 'Province'
});

const City = t.enums({
    City: 'City'
});

const Barangay = t.enums({
    Barangay: 'Barangay'
});

const EMPLOYEE_PRESENTADD = t.struct({
    province: Province,
    city: City,
    barangay: Barangay,
    street: t.String
});

const EMPLOYEE_PERMANENTADD = t.struct({
    province: Province,
    city: City,
    barangay: Barangay,
    street: t.String
});


export class Address extends Component {
    constructor(props){
        super(props);
        this.state={
            _oPresentAdd: null,
            _oPermanentAdd: null
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

    { /********** Present Address **********/ }
    const OPTIONS_PS = {
        fields: {
            province:{ 
                template: customPickerTemplate,
                label: 'SELECT PROVINCE' ,
                error: '*Select a Province'
            },
            city:{ 
                template: customPickerTemplate,
                label: 'SELECT CITY',
                error: '*Select a City'
            },
            barangay:{ 
                template: customPickerTemplate,
                label: 'SELECT BARANGAY',
                error: '*Last Name should not be empty'
            },
            street:{ 
                label: 'ENTER STREET',
                returnKeyType: 'done'
            }
        },
        stylesheet: stylesheet
    };

    const OPTIONS_PM = {
        fields: {
            province:{ 
                template: customPickerTemplate,
                label: 'SELECT PROVINCE' ,
                error: '*Select a Province'
            },
            city:{ 
                template: customPickerTemplate,
                label: 'SELECT CITY',
                error: '*Select a City'
            },
            barangay:{ 
                template: customPickerTemplate,
                label: 'SELECT BARANGAY',
                error: '*Last Name should not be empty'
            },
            street:{ 
                label: 'ENTER STREET',
                returnKeyType: 'done'
            }
        },
        stylesheet: stylesheet
    };

    

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contDivider}>
            <View style={styles.contFormLeft}>
                { /********** Basic Information **********/ }
                <View style={styles.contTitle}>
                    <PropTitle name='PRESENT ADDRESS'/>
                </View>
                <Form 
                    ref='presentadd_form'
                    type={EMPLOYEE_PRESENTADD} 
                    value={this.state._oPresentAdd}
                    options={OPTIONS_PS}/>
            </View>

            <View style={styles.contFormRight}>
              { /********** Contact Information **********/ }
                <View style={styles.contTitle}>
                    <PropTitle name='PERMANENT ADDRESS'/>
                </View>
                <Form 
                    ref='permanentadd_form'
                    type={EMPLOYEE_PERMANENTADD} 
                    value={this.state._oPermanentAdd}
                    options={OPTIONS_PM}/>
              
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
)(Address)