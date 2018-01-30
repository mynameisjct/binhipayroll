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

//API
import * as employeeApi from '../../profile/data/api';

//Custom Component
import {FormCard, PropTitle} from '../../../../components/CustomCards';
import * as CustomForm from '../../../../components/CustomForm';
  
const Form = t.form.Form;

export class Address extends Component {
    constructor(props){
        super(props);
        this.state={
            _oPresentAdd: null,
            _oPermanentAdd: null,
            _oProvinces: {},
            _oCities: {},
            _oBarangay: {}
        }
    }

    componentDidMount = async() => {
        this._getProvinces();
    }

    _getProvinces = async() => {
        employeeApi.getProvinces()
        .then((response) => response.json())
        .then((res) => {
            if(res.flagno != 1){
                
            }
            else{
                console.log('PROVINCE: ' + JSON.stringify(res))
                this._updateList('PROVINCE', res.province);
            }
        })
        .catch((exception) => {
            console.log('exception: ' + exception.message)
        });
    }

    _getCities = async(provinceID) => {
        employeeApi.getCities({province: provinceID})
        .then((response) => response.json())
        .then((res) => {
            if(res.flagno != 1){
                
            }
            else{
                this._updateList('CITY', res.city)
            }
        })
        .catch((exception) => {
            console.log('exception: ' + exception.message)
        });
    }

    _getBarangays = async(provinceID, cityID) => {
        employeeApi.getBarangays({province: provinceID, city: cityID})
        .then((response) => response.json())
        .then((res) => {
            console.log('_getBarangays: ' + JSON.stringify(res))
            if(res.flagno != 1){
                
            }
            else{
                this._updateList('BARANGAY', res.barangay)
            }
        })
        .catch((exception) => {
            console.log('exception: ' + exception.message)
        });
    }

    _updateList = (strType, aList) => {
        let oList = null;
        switch(strType.toUpperCase()){
            case 'PROVINCE':
                oList = {...this.state._oProvinces};
                this._arrayToEnums(aList, oList);
                this.setState({_oProvinces: oList});
                break;

            case 'CITY': 
                oList = {...this.state._oCities};
                this._arrayToEnums(aList, oList);
                this.setState({_oCities: oList});
                break;

            case 'BARANGAY': 
                oList = {...this.state._oBarangay};
                this._arrayToEnums(aList, oList);
                this.setState({_oBarangay: oList});
                break;

            default:
                //Display Error Here
                break;
        }
    }

    _arrayToEnums = async(aList, oList) => {
        await aList.map(data => {
            oList[String(data.id)]=data.name;
        })
    }

    _onChangePS = (value) => {
        //Update List of Cities
        if(!isNaN(value.province) && value.province != ''){
            this._getCities(value.province)
            //Update List of Barangays
        }
        else{
        }

        if(!isNaN(value.city) && value.city != ''){
            this._getBarangays(value.province, value.city)
        }
        else{
            value.barangay = '-';
        }

        this.setState({
            _oPresentAdd: value
        })
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
        const Province = t.enums(this.state._oProvinces);

        const City = t.enums(this.state._oCities);
        
        const Barangay = t.enums(this.state._oBarangay);
        
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
        
        const OPTIONS_PS = {
            fields: {
                province:{ 
                    template: customPickerTemplate,
                    label: 'SELECT PROVINCE' ,
                    error: '*Required field'
                },
                city:{ 
                    template: customPickerTemplate,
                    label: 'SELECT CITY',
                    error: '*Required field'
                },
                barangay:{ 
                    template: customPickerTemplate,
                    label: 'SELECT BARANGAY',
                    error: '*Required field'
                },
                street:{ 
                    label: 'ENTER STREET',
                    returnKeyType: 'done',
                    error: '*Required field'
                }
            },
            stylesheet: stylesheet
        };

        const OPTIONS_PM = {
            fields: {
                province:{ 
                    template: customPickerTemplate,
                    label: 'SELECT PROVINCE' ,
                    error: '*Required field'
                },
                city:{ 
                    template: customPickerTemplate,
                    label: 'SELECT CITY',
                    error: '*Required field'
                },
                barangay:{ 
                    template: customPickerTemplate,
                    label: 'SELECT BARANGAY',
                    error: '*Required field'
                },
                street:{ 
                    label: 'ENTER STREET',
                    returnKeyType: 'done',
                    error: '*Required field'
                }
            },
            stylesheet: stylesheet
        };

    

        return (
        <ScrollView>
            <View style={styles.container}>
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
                            onChange={this._onChangePS}
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