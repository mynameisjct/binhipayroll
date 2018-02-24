import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    Switch,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Custom Components
import EffectiveDateForm from './forms/effectiveDateForm';
import ActionButton from '../../../../components/ActionButton';

import styles from './styles';
/* import {Benefits as BenefitsPolicy} from '../../../CompanyPolicies/Rules/benefits'; */

//Helper
import * as oHelper from '../../../../helper';
import { CONSTANTS } from '../../../../constants/index';

const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

class EmpGovBenefits extends Component {
    constructor(props){
        super(props);
        this.state = {
            _activeIndex: '',
            _bPendingValue: false,
            _bShowEffectiveDateForm: false,
            _oData: {
                data: [
                    {
                        id: '0001',
                        name: 'SSS',
                        enabled: false,
                        effectivedate: {
                            from:{
                                value: '2017-01-01',
                                format: 'YYYY-MM-DD'
                            },
                            to:{
                                value: null,
                                format: 'YYYY-MM-DD'
                            }
                        }
                    },

                    {
                        id: '0002',
                        name: 'PAGIBIG',
                        enabled: true,
                        effectivedate: {
                            from:{
                                value: '2017-01-01',
                                format: 'YYYY-MM-DD'
                            },
                            to:{
                                value: null,
                                format: 'YYYY-MM-DD'
                            }
                        }
                    },


                    {
                        id: '0003',
                        name: 'PHILHEALTH',
                        enabled: false,
                        effectivedate: {
                            from:{
                                value: '2017-01-01',
                                format: 'YYYY-MM-DD'
                            },
                            to:{
                                value: null,
                                format: 'YYYY-MM-DD'
                            }
                        }
                    },
                ]
            },

            _oDefaultEffectiveDate: {
                from:{
                    value: null,
                    format: 'YYYY-MM-DD'
                },
                to:{
                    value: null,
                    format: 'YYYY-MM-DD'
                }
            }
        }
    }

    _updateEffectiveDate = (value) => {
        let oData = {...this.state._oData};
        oData.data[this.state._activeIndex].enabled = this.state._bPendingValue;
        oData.data[this.state._activeIndex].effectivedate.from.value = oHelper.convertDateToString(value.effectivedate, 'YYYY-MM-DD');
        this.setState({
            _oData: oData,
            _bShowEffectiveDateForm: false
        })
    }

    _hideEffectiveDateForm = () => {
        this.setState({
            _bPendingValue: false,
            _activeIndex: '',
            _bShowEffectiveDateForm: false
        })
    }

    _toggleGovBenefit = (value, index) => {
        if(value){
            this.setState({
                _bPendingValue: value,
                _activeIndex: index,
                _bShowEffectiveDateForm: true
            })
        }
        else{
            Alert.alert(
                'Warning',
                'Disabling the selected Government Benefit will take effect immediately on the current payroll period. ' +
                    'Are you sure you want to proceed?',
                [
                {text: 'NO', onPress: () => {}},
                {text: 'YES', onPress: () => this._toggleOffGovBenefit(value,index)},
                ],
                { cancelable: false }
            )
        }
    }

    _toggleOffGovBenefit = (value, index) => {
        let oData = {...this.state._oData};
        oData.data[index].enabled = value;
        this.setState({
            _oData: oData
        })
    }

    render(){
        const oDefaultDate = JSON.parse(JSON.stringify(this.state._oDefaultEffectiveDate));
        return(
            <View style={styles.genericContainer}>
                <View style={styles.benefitsStyles.contTitle}>
                    <Text style={styles.txtFormTitle}>GOVERNMENT BENEFITS</Text>
                </View>
                <View style={styles.benefitsStyles.contContent}>
                    {
                        this.state._oData.data.map((oData, index) => 
                            <View key={index} style={styles.benefitsStyles.contElementPlaceholder}>
                                <View style={styles.benefitsStyles.contElementMain}>
                                    <View style={styles.benefitsStyles.contLeftElement}>
                                        <Text style={styles.benefitsStyles.txtPropName}>{oData.name}</Text>
                                    </View>
                                    <View style={styles.benefitsStyles.contRightElement}>
                                        <Switch
                                            onValueChange={ (value) => {this._toggleGovBenefit(value, index)}} 
                                            onTintColor={color_SwitchOn}
                                            thumbTintColor={color_SwitchThumb}
                                            tintColor={color_SwitchOff}
                                            value={ oData.enabled }
                                        />
                                    </View>
                                </View>
                                {
                                    oData.enabled ?
                                        <View style={styles.benefitsStyles.contElementDescription}>
                                            <View style={styles.benefitsStyles.contLeftElementDescription}>
                                                <Text style={styles.benefitsStyles.txtDescription}>
                                                    {
                                                        'Effective Date: ' +
                                                        oHelper.convertDateToString(new Date(oData.effectivedate.from.value), oData.effectivedate.from.format)
                                                    }
                                                </Text>
                                            </View>
                                            <View style={styles.benefitsStyles.contRightElement}>
                                                
                                            </View>
                                        </View>
                                    :
                                        null
                                }
                            </View>
                        )
                    }
                </View>
                {
                    this.state._bShowEffectiveDateForm ?
                        <EffectiveDateForm 
                            title='SELECT AN EFFECTIVE DATE'
                            visible={this.state._bShowEffectiveDateForm}
                            onSubmit={this._updateEffectiveDate}
                            onCancel={this._hideEffectiveDateForm}
                            effectivedate={oDefaultDate}
                        />
                    : null
                }
            </View>
        )
    }
}

class EmpCompBenefits extends Component {
    constructor(props){
        super(props);
        this.state = {
            _oData: [
                {
                    id: '0004',
                    name: 'Clothing Allowance',
                    amountpermonth: '200',
                    scheme: {
                        value: 'Last Pay of the Month',
                        options: [
                            'First Pay of the Month',
                            'Last Pay of the Month'
                        ]
                    },
                    effectivedate: {
                        from: {
                            value: '2017-01-01',
                            format: 'YYYY-MM-DD'
                        },
                        to: {
                            value: null,
                            format: 'YYYY-MM-DD'
                        }
                    }
                },
                {
                    id: '0005',
                    name: 'Laundry Allowance',
                    amountpermonth: '100',
                    scheme: {
                        value: 'Last Pay of the Month',
                        options: [
                            'First Pay of the Month',
                            'Last Pay of the Month'
                        ]
                    },
                    effectivedate: {
                        from: {
                            value: '2017-01-01',
                            format: 'YYYY-MM-DD'
                        },
                        to: {
                            value: null,
                            format: 'YYYY-MM-DD'
                        }
                    }
                },

                {
                    id: '0006',
                    name: 'Management Allowance',
                    amountpermonth: '300',
                    scheme: {
                        value: 'Last Pay of the Month',
                        options: [
                        'First Pay of the Month',
                        'Last Pay of the Month'
                        ]
                    },
                    effectivedate: {
                        from: {
                            value: '2017-01-01',
                            format: 'YYYY-MM-DD'
                        },
                        to: {
                            value: null,
                            format: 'YYYY-MM-DD'
                        }
                    }
                    
                },
                {
                    id: '0007',
                    name: 'Medical Allowance',
                    amountpermonth: '100',
                    scheme: {
                        value: 'Last Pay of the Month',
                        options: [
                        'First Pay of the Month',
                        'Last Pay of the Month'
                        ]
                    },
                    effectivedate: {
                        from: {
                            value: '2017-01-01',
                            format: 'YYYY-MM-DD'
                        },
                        to: {
                            value: null,
                            format: 'YYYY-MM-DD'
                        }
                    }
                    
                },
                {
                    id: '0008',
                    name: 'Rice Alowance',
                    amountpermonth: '250',
                    scheme: {
                        value: 'Last Pay of the Month',
                        options: [
                        'First Pay of the Month',
                        'Last Pay of the Month'
                        ]
                    },
                    effectivedate: {
                        from: {
                            value: '2017-01-01',
                            format: 'YYYY-MM-DD'
                        },
                        to: {
                            value: null,
                            format: 'YYYY-MM-DD'
                        }
                    }
                }
                
            ]
        }
    }

    _addNewBenefit = () => {

    }

    render(){
        return(
            <View style={styles.genericContainer}>
                <View style={styles.benefitsStyles.contTitle}>
                    <Text style={styles.txtFormTitle}>COMPANY BENEFITS</Text>
                </View>
                {
                    this.state._oData.length === 0 ?
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.benefitsStyles.contEmpty}
                            onPress={this._addNewBenefit}>
                            <Text style={styles.benefitsStyles.txtDescription}>
                                No existing company benefits. Tap here to add.
                            </Text>
                        </TouchableOpacity>
                    :
                        
                            <View style={styles.benefitsStyles.contCompanyBenefits}>
                                <ScrollView>
                                {
                                    this.state._oData.map((oData, index) => 
                                        <View key={index} style={styles.benefitsStyles.placeholderCompanyBenefit}>
                                            <View style={styles.benefitsStyles.contRemove}> 
                                                <Text>REMOVE</Text>
                                            </View>
                                            <View style={styles.benefitsStyles.contProperty}> 
                                                <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                    <Text style={styles.benefitsStyles.txtPropNameCompany}>NAME</Text>
                                                </View>
                                                <View style={styles.benefitsStyles.contPropertyRight}>  
                                                    <Text style={styles.benefitsStyles.txtPropValueCompany}>{oData.name}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.benefitsStyles.contProperty}> 
                                                <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                    <Text style={styles.benefitsStyles.txtPropNameCompany}>AMOUNT PER MONTH</Text>
                                                </View>
                                                <View style={styles.benefitsStyles.contPropertyRight}>  
                                                    <Text style={styles.benefitsStyles.txtPropValueCompany}>{oData.amountpermonth}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.benefitsStyles.contProperty}> 
                                                <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                    <Text style={styles.benefitsStyles.txtPropNameCompany}>SCHEME</Text>
                                                </View>
                                                <View style={styles.benefitsStyles.contPropertyRight}>  
                                                    <Text style={styles.benefitsStyles.txtPropValueCompany}>{oData.scheme.value}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.benefitsStyles.contProperty}> 
                                                <View style={styles.benefitsStyles.contPropertyLeft}>  
                                                    <Text style={styles.benefitsStyles.txtPropNameCompany}>EFFECTIVE DATE</Text>
                                                </View>
                                                <View style={styles.benefitsStyles.contPropertyRight}>  
                                                    <Text style={styles.benefitsStyles.txtPropValueCompany}>
                                                        {oHelper.convertDateToString(oData.effectivedate.from.value, oData.effectivedate.from.format)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                                </ScrollView>
                            </View>
                        
                }
                <ActionButton onPress={this._addNewBenefit} iconname='plus'/>
            </View>
        )
    }
}

export default class EmployeeBenefits extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.benefitsStyles.container}>
                    <View style={styles.benefitsStyles.contLeft}>
                        <EmpGovBenefits/>
                    </View>
                    <View style={styles.benefitsStyles.contRight}>
                        <EmpCompBenefits/>
                    </View>
                </View>
            </View>
        )
    }
}
 