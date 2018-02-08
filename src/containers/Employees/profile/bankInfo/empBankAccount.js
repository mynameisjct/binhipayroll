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
const TITLE = 'Personal Bank Account Information'

export class EmpBankAccount extends Component {
    render(){
        const oBankInfo =  this.props.myEmployees.employee.bankinfo;
        const navigation = this.props.logininfo.navigation;
        const attribs_BankAccount = 
            [
                {
                    label: 'BANK NAME',
                    value: oBankInfo.bankname || ''
                },
                {
                    label: 'ACCOUNT NUMBER',
                    value: oBankInfo.accountnumber || ''
                }
            ]

        return(
            <View style={styles.child.container}>
                <View style={styles.child.contCard}>
                    <CustomCard clearMargin={true} title={TITLE} oType='Text'>
                        <ScrollView>
                            <View style={styles.child.contContent}>

                                <FixedCard1
                                    title={oBankInfo.title || 'PRESENT ADDRESS'}
                                    attributes={attribs_BankAccount}/>

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
)(EmpBankAccount)