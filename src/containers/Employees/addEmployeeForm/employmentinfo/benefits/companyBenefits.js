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

import styles from '../styles';

//Custom Components
import CompanyBenefitsForm from '../forms/companyBenefitsForm';
import ActionButton from '../../../../../components/ActionButton';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../../data/activeProfile/actions';

//Helper and Project Constants
import * as oHelper from '../../../../../helper';
import { CONSTANTS } from '../../../../../constants/index';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

export class EmpCompBenefits extends Component {
    constructor(props){
        super(props);
        this.state = {
            _oData: this.props.oEmpBenefits.company.data || []
        }
    }

    _addNewBenefit = () => {
        
        this.setState({
            _showCompanyBenefitsForm: true
        })
    }

    _onCancel = () => {
        this.setState({
            _showCompanyBenefitsForm: false
        })
    }

    _onSubmit = () => {
        this.setState({
            _showCompanyBenefitsForm: false
        })
    }

    render(){
        return(
            <View style={styles.genericContainer}>
                <View style={styles.benefitsStyles.contTitle}>
                    <Text style={styles.txtFormTitle}>{this.props.oEmpBenefits.company.title}</Text>
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
                <CompanyBenefitsForm
                    title={'ADD NEW COMPANY BENEFIT'}
                    visible={this.state._showCompanyBenefitsForm}
                    onCancel={this._onCancel}
                    onSubmit={this._onSubmit}
                />
                <ActionButton onPress={this._addNewBenefit} iconname='plus'/>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        oEmpBenefits: state.employees.activeProfile.data.employmentinfo.benefits

    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch)
        },
    }
  }
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpCompBenefits)