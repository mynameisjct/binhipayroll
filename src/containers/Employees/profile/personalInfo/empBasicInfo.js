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
import * as employeeActions from '../data/actions';
import { bindActionCreators } from 'redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Basic and Contact Information'
export class EmpBasicInfo extends Component {
    render(){
        const navigation = this.props.logininfo.navigation;
        const attribs_BasicInfo = 
            [
                {
                    label: 'FIRST NAME',
                    value: this.props.myEmployees.employee.personalinfo.basicinfo.firstname || ''
                },
                {
                    label: 'MIDDLE NAME',
                    value: this.props.myEmployees.employee.personalinfo.basicinfo.middlename || ''
                },
                {
                    label: 'LAST NAME',
                    value: this.props.myEmployees.employee.personalinfo.basicinfo.lastname || ''
                },
                {
                    label: 'NICK NAME',
                    value: this.props.myEmployees.employee.personalinfo.basicinfo.nickname || ''
                },
                {
                    label: 'BIRTH DATE',
                    value: oHelper.convertDateToString(
                        this.props.myEmployees.employee.personalinfo.basicinfo.birthdate.value,
                        this.props.myEmployees.employee.personalinfo.basicinfo.birthdate.format
                    ) || ''
                },
                {
                    label: 'GENDER',
                    value: this.props.myEmployees.employee.personalinfo.basicinfo.gender.value || ''
                },
                {
                    label: 'CIVIL STATUS',
                    value: this.props.myEmployees.employee.personalinfo.basicinfo.civilstatus.value || ''
                }
            ]

        const attribs_ContactInfo = 
            [
                {
                    label: 'MOBIE NUMBER',
                    value: this.props.myEmployees.employee.personalinfo.contactinfo.mobile || ''
                },
                {
                    label: 'TELEPHONE NUMBER',
                    value: this.props.myEmployees.employee.personalinfo.contactinfo.telephone || ''                },
                {
                    label: 'EMAIL ADDRESS',
                    value: this.props.myEmployees.employee.personalinfo.contactinfo.email || ''
                }
            ]

        const attribs_IDS = 
            [
                {
                    label: this.props.myEmployees.employee.personalinfo.ids.tin.label || '',
                    value: this.props.myEmployees.employee.personalinfo.ids.tin.value || ''
                },
                {
                    label: this.props.myEmployees.employee.personalinfo.ids.sss.label || '',
                    value: this.props.myEmployees.employee.personalinfo.ids.sss.value || ''
                },
                {
                    label: this.props.myEmployees.employee.personalinfo.ids.philhealth.label || '',
                    value: this.props.myEmployees.employee.personalinfo.ids.philhealth.value || ''
                },
                {
                    label: this.props.myEmployees.employee.personalinfo.ids.pagibig.label || '',
                    value: this.props.myEmployees.employee.personalinfo.ids.pagibig.value || ''
                },
            ]

        return(
            <View style={styles.child.container}>
                <View style={styles.child.contCard}>
                    <CustomCard clearMargin={true} title={TITLE} oType='Text'>
                        <ScrollView>
                            <View style={styles.child.contContent}>

                                <FixedCard1
                                    title={this.props.myEmployees.employee.personalinfo.basicinfo.title}
                                    attributes={attribs_BasicInfo}/>
                                
                                <FixedCard1
                                    title={this.props.myEmployees.employee.personalinfo.contactinfo.title}
                                    attributes={attribs_ContactInfo}/>

                                <FixedCard1
                                    title={this.props.myEmployees.employee.personalinfo.ids.title}
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
        myEmployees: state.employeeProfile
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