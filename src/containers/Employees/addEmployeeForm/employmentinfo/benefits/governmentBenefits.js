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
import EffectiveDateForm from '../forms/effectiveDateForm';
import ActionButton from '../../../../../components/ActionButton';
import * as PromptScreen from '../../../../../components/ScreenLoadStatus';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../../data/activeProfile/actions';
import * as benefitsActions from '../../../../CompanyPolicies/data/benefits/actions';

//Helper and project constants
import * as oHelper from '../../../../../helper';
import { CONSTANTS } from '../../../../../constants/index';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

export class EmpGovBenefits extends Component {
    constructor(props){
        super(props);
        console.log('this.props.oEmpBenefits: ' + JSON.stringify(this.props.oEmpBenefits));
        this.state = {
            _status: CONSTANTS.STATUS.SUCCESS,
            _activeIndex: '',
            _bPendingValue: false,
            _bShowEffectiveDateForm: false,
            _showCompanyBenefitsForm: false,
            _oData: this.props.oEmpBenefits.government.data || [],

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
        let oData = [...this.state._oData];
        oData[this.state._activeIndex].enabled = this.state._bPendingValue;
        oData[this.state._activeIndex].effectivedate.from.value = oHelper.convertDateToString(value.effectivedate, 'YYYY-MM-DD');
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
        let oData = [...this.state._oData];
        oData[index].enabled = value;
        this.setState({
            _oData: oData
        })
    }

    render(){
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Benefits Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
            ); 
        }

        else if(pProgress==1){

            const oDefaultDate = JSON.parse(JSON.stringify(this.state._oDefaultEffectiveDate));
            return(
                <View style={styles.genericContainer}>
                    <View style={styles.benefitsStyles.contTitle}>
                        <Text style={styles.txtFormTitle}>GOVERNMENT BENEFITS</Text>
                    </View>
                    <View style={styles.benefitsStyles.contContent}>
                        {
                            this.state._oData.map((oData, index) => 
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

        else{
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
            );
        }
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
            employee: bindActionCreators(employeeActions, dispatch),
            benefits: bindActionCreators(benefitsActions, dispatch)
        },
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpGovBenefits)