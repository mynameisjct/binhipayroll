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
  Alert,
  TouchableOpacity
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import moment, { lang } from "moment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
import EmployeePositionForm from './forms/employeePositionForm';
import FixedCard1 from '../../../../components/FixedCards';

//Helper
import * as oHelper from '../../../../helper';

const Form = t.form.Form;

const EMPLOYMENTTYPES = t.enums({
    Regular: 'Regular',
    Probationary: 'Probationary'
  });

export class EmployeePositions extends Component{
    _generateAttributesList = (oData) => {
        return [
            {
                label: 'POSITION',
                value: oData.position.label
            },
            {
                label: 'BRANCH',
                value: oData.branch.label
            },
            {
                label: 'REMARKS',
                value: oData.remarks
            }
        ]
    }
    
    render(){
        console.log('this.props.data: ' + JSON.stringify(this.props.data));
        return(
            <View>
                {
                    this.props.data.map((oData, index) => 
                        <View key={index} style={styles.contPosition}>
                            <FixedCard1
                                iconSize={30}
                                title={
                                    (oHelper.isValidDate(new Date(oData.effectivedate.from.value)) ? 
                                        oHelper.convertDateToString(new Date(oData.effectivedate.from.value), oData.effectivedate.from.format)
                                    :
                                        oData.effectivedate.from.value)
                                    + ' - ' + 
                                        (oHelper.isValidDate(new Date(oData.effectivedate.to.value)) ? 
                                        oHelper.convertDateToString(new Date(oData.effectivedate.to.value), oData.effectivedate.to.format)
                                    :
                                        oData.effectivedate.to.value)
                                }
                                attributes={this._generateAttributesList(oData)}/>
                        </View>
                    )
                }
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => this.props.onAddAction()}>
                    
                    <View style={styles.contIcon}>
                        <View style={styles.contAddLabel}>
                            <Text style={styles.txtAddLabel}>Add New</Text>
                        </View>
                        <View>
                            <Icon name='plus-circle-outline'  size={25} color='#EEB843'/>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
}

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

            _positions: [],

            _showPositionForm: false,

            _oActivePosition: {
                id: '',
                index: 1,
                position: {
                    label:'',
                    value:''
                },
                branch: {
                    label:'',
                    value:''
                },
                effectivedate: {
                    from: {
                        value: '',
                        format: 'MMMM DD, YYYY'
                    },
                    to: {
                        value: '',
                        format: 'MMMM DD, YYYY'
                    }
                },
                remarks: ''
            }
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

    _addPostion = () => {
        this.setState({_showPositionForm: true});
    }

    _cancelPositionTransaction = () => {
        this.setState({_showPositionForm: false});
    }

    _submitPositionTransaction = (oData) => {
        let oPosition = JSON.parse(JSON.stringify(this.state._oActivePosition));
        let arrPositions = [...this.state._positions];
        let oLastData = {};
        oPosition.id = ''; //Temp val
        oPosition.position.label = oData.position;
        oPosition.position.value = oData.position; //Temp val
        oPosition.branch.label = oData.branch;
        oPosition.branch.value = oData.branch; //Temp val
        oPosition.effectivedate.from.value = (oHelper.convertDateToString(oData.effectivedate, 'YYYY-MM-DD'));
        if(this.state._positions.length > 0){
            let oLastDate = new Date(oData.effectivedate);
            oLastDate = oLastDate.setDate(oLastDate.getDate()-1);
            arrPositions[0].effectivedate.to.value = (oHelper.convertDateToString(oLastDate, 'YYYY-MM-DD'));
        }
        oPosition.effectivedate.to.value = 'PRESENT';

        oPosition.remarks = oData.remarks;
        arrPositions.splice(0,0,oPosition)
        this.setState({
            _positions: arrPositions,
            _showPositionForm: false
        });
    }

    render() {
        const iPositionLength = this.state._positions.length;
        
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
            <View style={styles.genericContainer}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.contDivider}>
                            <View style={styles.contFormLeft}>

                                { /********** GENERAL INFORMATION **********/ }
                                <View style={styles.contTitle}>
                                    <Text style={styles.txtFormTitle}> GENERAL INFORMATION </Text>
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
                                    <Text style={styles.txtFormTitle}> POSITION HISTORY </Text>
                                </View>
                                {
                                    this.state._positions.length === 0 ?
                                        <TouchableOpacity 
                                            activeOpacity={0.6}
                                            style={styles.contEmpty}
                                            onPress={() => {this._addPostion()}}>
                                            <Text>No Existing Positions. Tap here to Add.</Text>
                                        </TouchableOpacity>
                                    : 
                                        <EmployeePositions
                                            onAddAction={this._addPostion}
                                            data={this.state._positions}/>
                                }
            
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
                    </ScrollView>
                </View>
                
                <EmployeePositionForm 
                    minEffectiveDate={iPositionLength === 0 ?
                        null
                    :
                        oHelper.addDaysFromDate(this.state._positions[0].effectivedate.from.value, 1)
                    }
                    visible={this.state._showPositionForm}
                    cancelForm={this._cancelPositionTransaction}
                    submitForm={this._submitPositionTransaction}
                    title='ADD NEW POSITION'
                    positions={{Pos1: 'Pos1', Pos2: 'Post2'}}
                    branches={{Branch1: 'Branch1', Branch2: 'Branch2'}}
                />
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