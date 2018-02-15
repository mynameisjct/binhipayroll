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
import { customPickerTemplate } from '../../../../global/tcomb-custom-select-android';
import { customDatePickerTemplate } from '../../../../global/tcomb-custom-datepicker-android'

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../data/activeProfile/actions';

//API
import * as employeeApi from '../../data/activeProfile/api';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
import * as PromptScreen from '../../../../components/ScreenLoadStatus';
import { validate } from 'tcomb-validation';

const Form = t.form.Form;

const EMPLOYMENTTYPES = t.enums({
    Regular: 'Regular',
    Probationary: 'Probationary'
  });

export class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            _dateFormat: 'MMMM DD, YYYY',
            _oEmploymentDetails: {
                employmenttype: '',
                datehired: null,
                dateend: null
            },

            _oPositions: []
        }
    }

    _onPress = () => {
        
        /* const navigation = this.props.logininfo.navigation;
        let bPermanentAdd = this.permanent_address.getValue();
        let bPresentAdd = this.present_address.getValue();
        console.log('bPresentAdd: ' + JSON.stringify(bPresentAdd));
        console.log('bPermanentAdd: ' + JSON.stringify(bPermanentAdd));

        if (bPresentAdd && bPermanentAdd) {
            this.props.actions.employee.updateAddress({
                present: { ...bPresentAdd },
                permanent: { ...bPermanentAdd }
            });
            navigation.navigate('Dependents');
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
        } */
    }

    render() {
        //This is put into render method to allow direct access to class properties
        let myFormatFunction = (format,strDate) => {
            return moment(strDate).format(format);
        }

        let oDateHiredConfig = {
            template: customDatePickerTemplate,
            label: 'DATE HIRED',
            mode:'date',
            config:{
                format: (strDate) => myFormatFunction(this.state._dateFormat, strDate)
            },
            error: '*Select birth date'
        };

        let oDateEndConfig = {
            template: customDatePickerTemplate,
            label: 'END DATE',
            mode:'date',
            disabled: true,
            config:{
                format: (strDate) => myFormatFunction(this.state._dateFormat, strDate)
            }
        };

        const EMPLOYEE_EMPLOYMENTDETAILS = t.struct({
            employmenttype: EMPLOYMENTTYPES,
            datehired: t.Date,
            dateend: t.maybe(t.Date)
        });

        const OPTIONS_GENERALINFO = {
            fields: {
                employmenttype:{ 
                    template: customPickerTemplate,
                    label: 'EMPLOYMENT TYPE',
                    error: '*Select an employment type'
                },

                datehired: oDateHiredConfig,

                dateend: oDateEndConfig,
            },
            stylesheet: stylesheet
        };

        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.contDivider}>
                            <View style={styles.contFormLeft}>
                                { /********** GENERAL INFORMATION **********/ }
                                <View style={styles.contTitle}>
                                    <PropTitle name='GENERAL INFORMATION'/>
                                </View>
                                <Form 
                                    ref='form_employment_general_information'
                                    type={EMPLOYEE_EMPLOYMENTDETAILS} 
                                    value={this.state._oEmploymentDetails}
                                    onChange={this._onChangeData}
                                    options={OPTIONS_GENERALINFO}/>
                            </View>

                            <View style={styles.contFormRight}>
                                { /********** POSITION HISTORY **********/ }
                                <View style={styles.contTitle}>
                                    <PropTitle name='POSITION HISTORY'/>
                                </View>
            
                            </View>
                        </View>
                        <View style={{flex:1, padding: 40}}>
                            <Button
                                onPress={this._onPress}
                                title='Next'
                                color="#3b5998"
                                accessibilityLabel='Next'
                            />
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
        activecompany: state.activeCompanyReducer.activecompany,
        oEmployeeAddress: state.employees.activeProfile.data.personalinfo.address
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
)(Details)