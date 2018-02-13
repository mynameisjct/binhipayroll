//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from '../styles';

//Custom Components
import * as StatusLoader from '../../../../components/ScreenLoadStatus'
import CustomCard from '../../../../components/CustomCards';
import FixedCard1 from '../../../../components/FixedCards';

//Helper
import * as oHelper from '../../../../helper';

//Redux
import { connect } from 'react-redux';
import * as employeeActions from '../../data/activeProfile/actions';
import { bindActionCreators } from 'redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Basic and Contact Information'
export class EmpBasicInfo extends Component {
    render(){
        let oBasicInfo = this.props.employees.activeProfile.data.personalinfo.basicinfo;
        let oContactInfo = this.props.employees.activeProfile.data.personalinfo.contactinfo;
        let oIDS = this.props.employees.activeProfile.data.personalinfo.ids;
        const navigation = this.props.logininfo.navigation;
        const attribs_BasicInfo = 
            [
                {
                    label: 'FIRST NAME',
                    value: oBasicInfo.firstname || ''
                },
                {
                    label: 'MIDDLE NAME',
                    value: oBasicInfo.middlename || ''
                },
                {
                    label: 'LAST NAME',
                    value: oBasicInfo.lastname || ''
                },
                {
                    label: 'NICK NAME',
                    value: oBasicInfo.nickname || ''
                },
                {
                    label: 'BIRTH DATE',
                    value: oHelper.convertDateToString(
                        oBasicInfo.birthdate.value,
                        oBasicInfo.birthdate.format
                    ) || ''
                },
                {
                    label: 'GENDER',
                    value: oBasicInfo.gender.value || ''
                },
                {
                    label: 'CIVIL STATUS',
                    value: oBasicInfo.civilstatus.value || ''
                }
            ]

        const attribs_ContactInfo = 
            [
                {
                    label: 'MOBIE NUMBER',
                    value: oContactInfo.mobile || ''
                },
                {
                    label: 'TELEPHONE NUMBER',
                    value: oContactInfo.telephone || ''                },
                {
                    label: 'EMAIL ADDRESS',
                    value: oContactInfo.email || ''
                }
            ]

        const attribs_IDS = 
            [
                {
                    label: oIDS.tin.label || '',
                    value: oIDS.tin.value || ''
                },
                {
                    label: oIDS.sss.label || '',
                    value: oIDS.sss.value || ''
                },
                {
                    label: oIDS.philhealth.label || '',
                    value: oIDS.philhealth.value || ''
                },
                {
                    label: oIDS.pagibig.label || '',
                    value: oIDS.pagibig.value || ''
                },
            ]

        return(
            <View style={styles.child.container}>
                <View style={styles.child.contCard}>
                    <CustomCard clearMargin={true} title={TITLE} oType='Text'>
                        <ScrollView>
                            <View style={styles.child.contContent}>

                                <FixedCard1
                                    title={oBasicInfo.title}
                                    attributes={attribs_BasicInfo}/>
                                
                                <FixedCard1
                                    title={oContactInfo.title}
                                    attributes={attribs_ContactInfo}/>

                                <FixedCard1
                                    title={oContactInfo.title}
                                    attributes={attribs_IDS}/>

                            </View>
                        </ScrollView>
                        
                    </CustomCard>
                </View>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        employees: state.employees
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
)(EmpBasicInfo)