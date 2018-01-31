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
import moment from "moment";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles';
import stylesheet from '../../../../global/globalFormStyle';

//Form Template 
import { customPickerTemplate } from '../../../../global/tcomb-customTemplate';

//Redux
import { connect } from 'react-redux';

//Helper 
import * as oHelper from '../../../../helper';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
  
const Form = t.form.Form;
const DEFAULT_DEPENDENT = {name: '', birthday: '', relationship: ''};

const RELATIONSHIPS = t.enums({
    Spouse:'Spouse',
    Son: 'Son',
    Daughter: 'Daughter',
    Parent: 'Parent',
    Brother: 'Brother',
    Sister: 'Sister',
    Relative: 'Relative'
});

class DependentsFields extends Component {
    constructor(props){
        super(props);
        this.state={
            _oDependent: {
                name: this.props.value.name,
                birthdate: this.props.value.date,
                relationship: this.props.value.relationship,
            }
        }
    }

    render(){

        let myFormatFunction = (format,date) => {
            return moment(date).format(format);
        }
          
        let oBday = {
            label: 'BIRTHDAY',
            mode:'date',
            config:{
                format:(date) => myFormatFunction("MMMM DD YYYY",date)
            },
            error: '*Select birth date'
        };

        const EMPLOYEEE_DEPENDENT = t.struct({
            name: t.String,
            birthdate: t.Date,
            relationship: RELATIONSHIPS
        });
        
        const OPTIONS = {
            fields: {
                name:{ 
                    label: 'NAME' ,
                },
                birthdate:oBday,

                relationship:{ 
                    template: customPickerTemplate,
                    label: 'RELATIONSHIP',
                }
            },
            stylesheet: stylesheet
        };

        return(
            <View style={styles.genericContainer}>
                <Form 
                    ref='dependent_form'
                    type={EMPLOYEEE_DEPENDENT} 
                    value={this.state._oDependent}
                    options={OPTIONS}/>
            </View>
        )
    }
}

class DependentsForm extends Component{
    constructor(props){
        super(props);
        this._nodes = new Map();
        this.state={
            _value: this.props.value.length == 0 ? [DEFAULT_DEPENDENT] : this.props.value,
        }
    }

    _addNewRow = () => {
        let aList = [...this.state._value];
        let oLastRow = aList.slice(-1)[0];
        if(oHelper.isStringEmptyOrSpace(oLastRow.name)){
            /* this._textInput.focus(); */
            aList.push(DEFAULT_DEPENDENT);
            this.setState({
                _value: aList
            })
        }
        else{
            aList.push(DEFAULT_DEPENDENT);
            this.setState({
                _value: aList
            })
        }
    }

    _requestRemoveRow = (index) => {
        Alert.alert(
            'Confirm to Delete',
            'Removing a data is an irreversible action. Are you sure you want to proceed?',
            [
              {text: 'Cancel', onPress: () => {}},
              {text: 'YES', onPress: () => this._removeRow(index)},
            ],
            { cancelable: false }
          )
    }

    _removeRow = (index) => {
        let aList = [...this.state._value];
        aList.splice(index, 1);
        this.setState({
            _value: aList
        })
    }

    render(){
        return(
            <View style={styles.genericContainer}>
                {
                    this.state._value.map((data,index) =>
                        <View style={styles.contGroupWrapper} key={index}>
                            <View style={styles.contLabel}>
                                <Text style={styles.txtGroupLabel}>{this.props.label + ' ' + (index+1) || 'ROW ' + (index+1)}</Text>
                            </View>
                            <DependentsFields 
                                ref={(oInstance) => {this.dependentField_Form = oInstance;}}
                                value={data}/>
                            {
                                this.state._value.length !== 1 ?
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => {this._requestRemoveRow(index)}}
                                        style={{height: 36, paddingRight: 0, position: 'absolute', top: 20, right: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'center', width: 70}}
                                        >
                                        <Icon size={25} name='close-circle' color='#EEB843' />
                                    </TouchableOpacity>
                                :
                                    null
                            }
                        </View>
                    )
                }

                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this._addNewRow()}>
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
            </View>
        )
    }

}

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

    const EMPLOYEE_SPOUSE = t.struct({
        name: t.String,
        work: t.String,
        company: t.maybe(t.String)
    });

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
                <View style={styles.contNote}>
                    <Text style={styles.txtNoteLabel}>Note: There is no need to add a spouse in the dependents.</Text>
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
                <DependentsForm 
                    label='DEPENDENT'
                    value={[]}/>
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