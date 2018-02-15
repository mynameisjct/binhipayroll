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

class AddressForm extends Component {
    constructor(props){
        super(props);
        this.state={
            _oAddress: {
                province: this.props.initialValue.province,
                city: this.props.initialValue.city,
                barangay: this.props.initialValue.barangay,
                street: this.props.initialValue.street
            },
            _oProvinces: {},
            _oCities: {},
            _oBarangay: {}
        }
    }

    componentDidMount = async() => {
        let oProvince = this.state._oAddress.province;
        let oCity = this.state._oAddress.city;
        let oBarangay = this.state._oAddress.barangay;

        this._getProvinces(true);
        if(oCity != ''){
            this._getCities(oProvince, true);

            if(oBarangay != ''){
                this._getBarangays(oProvince, oCity, true);
            }
        }
    }

    _getProvinces = async(bHideLoading) => {
        
        bHideLoading ? null : this.props.setLoadingStatus(true);

        employeeApi.getProvinces()
        .then((response) => response.json())
        .then((res) => {
            if(res.flagno != 1){
                
            }
            else{
                /* console.log('PROVINCE: ' + JSON.stringify(res)) */
                this._updateList('PROVINCE', res.province);
            }
            bHideLoading ? null : this.props.setLoadingStatus(false);
        })
        .catch((exception) => {
            console.log('exception: ' + exception.message);
            bHideLoading ? this.props.setLoadingStatus(false) : null;
        });
    }

    _getCities = async(provinceID, bHideLoading) => {
 
        bHideLoading ? null : this.props.setLoadingStatus(true);

        employeeApi.getCities({province: provinceID})
        .then((response) => response.json())
        .then((res) => {
            /* console.log('_getCities: ' + JSON.stringify(res)) */
            if(res.flagno != 1){
                
            }
            else{
                this._updateList('CITY', res.city)
            }
            bHideLoading ? null : this.props.setLoadingStatus(false);
        })
        .catch((exception) => {
            console.log('exception: ' + exception.message)
            bHideLoading ? null : this.props.setLoadingStatus(false);
        });
    }

    _getBarangays = async(provinceID, cityID, bHideLoading) => {

        bHideLoading ? null : this.props.setLoadingStatus(true);

        employeeApi.getBarangays({province: provinceID, city: cityID})
        .then((response) => response.json())
        .then((res) => {
            /* console.log('_getBarangays: ' + JSON.stringify(res)) */
            if(res.flagno != 1){
                
            }
            else{
                this._updateList('BARANGAY', res.barangay)
            }

            bHideLoading ? null : this.props.setLoadingStatus(false);
        })
        .catch((exception) => {
            console.log('exception: ' + exception.message)
            bHideLoading ? null : this.props.setLoadingStatus(false);
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
        /* console.log("aList: " + JSON.stringify(aList)); */
        await aList.map(data => {
            console.log("data: " + JSON.stringify(data));
            oList[String(data.id)]=data.name;
        })
        /* console.log("oList: " + JSON.stringify(oList)); */
    }

    /* _arrayToEnums = (aList, oList) => {
        for(i=0; i < aList.length; i++) {
            console.log('[aList[i].id]: ' + [aList[i].id] );
            console.log('aList[i].name: ' + aList[i].name );
            oList[aList[i].id] = aList[i].name;
        }

        console.log("oList: " + JSON.stringify(oList));
    } */

/*     _arrayToEnums = (aList, oList) => {
        let strList = '';
        aList.map(data => {
            if (strList==''){
                strList = strList + '"' + data.id + '":"' +  data.name + '"';
            }
            else{
                strList = strList + ',' + '"' + data.id + '":"' +  data.name + '"';
            }
        })
        strList = '{' + strList + '}'
        console.log("FINALLIST: " + strList);
        oList = JSON.parse(strList);
        console.log("=========oList: " + JSON.stringify(oList));
    } */

/*     _arrayToEnums = async(aList, oList) => {
        let ordered = {};
        console.log("aList: " + JSON.stringify(aList));
        await aList.map(data => {
            console.log("data: " + JSON.stringify(data));
            oList[(data.id)]=data.name;
        })

        Object.keys(oList).sort().forEach(function(key) {
            ordered[key] = oList[key];
        });
        console.log("ordered: " + JSON.stringify(ordered));
    } */

    _onChangePS = (value) => {
        if((value.province != '') && this.state._oAddress.province !== value.province){
            this._getCities(value.province);
            value.city = ''
            value.barangay = '';
            this.setState({_oCities: {}})
            this.setState({_oBarangay: {}})
        }else if((value.city != '') && (this.state._oAddress.city !== value.city)){
            this._getBarangays(value.province, value.city);
            value.barangay = '';
            this.setState({_oBarangay: {}})
        }else {

        }
        this.setState({
            _oAddress: value
        })
    }

    getValue = () => {
        return this.refs.form_address.getValue();
    }

    render(){
        /* console.log('this.state._oProvinces:' + JSON.stringify(this.state._oProvinces)); */
        const Province = t.enums(this.state._oProvinces);
        const City = t.enums(this.state._oCities);

        const Barangay = t.enums(this.state._oBarangay);
        
        const EMPLOYEE_PRESENTADD = t.struct({
            province: Province,
            city: City,
            barangay: Barangay,
            street: t.String
        });

        const OPTIONS = {
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

        return(
            <Form 
                ref='form_address'
                type={EMPLOYEE_PRESENTADD} 
                value={this.state._oAddress}
                onChange={this._onChangePS}
                options={OPTIONS}/>
        );        
    }
}

export class Address extends Component {
    constructor(props){
        super(props);
        this.state={
            _promptMsg: 'Populating Address List. Please wait...',
            _promptShow: false
        }
    }

    _updateLoadingStatus = (value) => {
        this.setState({ _promptShow: value })
    }

    _onPress = () => {
        
        const navigation = this.props.logininfo.navigation;
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
        }
    }

    render() {
        //This is put into render method to allow direct access to class properties
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.contDivider}>
                            <View style={styles.contFormLeft}>
                                { /********** Present Address **********/ }
                                <View style={styles.contTitle}>
                                    <PropTitle name='PRESENT ADDRESS'/>
                                </View>
                                <AddressForm 
                                    initialValue={{
                                        province: this.props.oEmployeeAddress.present.province.id,
                                        city: this.props.oEmployeeAddress.present.city.id,
                                        barangay: this.props.oEmployeeAddress.present.barangay.id,
                                        street: this.props.oEmployeeAddress.present.street.value
                                    }}
                                    ref={(oInstance) => { this.present_address = oInstance; }}
                                    setLoadingStatus={this._updateLoadingStatus}/>
                            </View>

                            <View style={styles.contFormRight}>
                                { /********** PERMANENT Information **********/ }
                                <View style={styles.contTitle}>
                                    <PropTitle name='PERMANENT ADDRESS'/>
                                </View>
                                <AddressForm 
                                    initialValue={{
                                        province: this.props.oEmployeeAddress.permanent.province.id,
                                        city: this.props.oEmployeeAddress.permanent.city.id,
                                        barangay: this.props.oEmployeeAddress.permanent.barangay.id,
                                        street: this.props.oEmployeeAddress.permanent.street.value
                                    }}
                                    ref={(oInstance) => { this.permanent_address = oInstance; }}
                                    setLoadingStatus={this._updateLoadingStatus}/>
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
                <PromptScreen.PromptGeneric 
                    show= {this.state._promptShow} 
                    title={this.state._promptMsg}/>
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
)(Address)