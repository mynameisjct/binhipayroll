//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from '../styles';

//Custom Components
import * as StatusLoader from '../../../../components/ScreenLoadStatus'
import CustomCard from '../../../../components/CustomCards';
import FixedCard1 from '../../../../components/FixedCards';
import FormModal from '../../../../components/FormModal';

//Children Components
import EmployeeBankAccount from '../../addEmployeeForm/bankinfo/bankaccount';

//Helper
import * as oHelper from '../../../../helper';

//Redux
import { connect } from 'react-redux';
import * as employeeActions from '../../data/activeProfile/actions';
import { bindActionCreators } from 'redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Personal Bank Account Information'

export class EmpBankAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            _bShowForm: false,
            _bTriggerSave: false
        }
    }

    _editData = () => {
        this.setState({ _bShowForm: true });
    }

    _onCancel = () => {
        this.setState({ _bShowForm: false });
    }

    _onSubmit = () => {
        Alert.alert(
            'Warning',
            'All changes will be saved and will be irreversible. Are you sure you want to proceed ?',
            [
                {text: 'NO', onPress: () =>  this.setState({ _bTriggerSave: false })},
                {text: 'YES', onPress: () => this.setState({ _bTriggerSave: true })}
            ],
            { cancelable: false }
        )
        //this.setState({ _bShowForm: false });
    }

    render(){
        const oBankInfo =  this.props.employees.activeProfile.data.bankinfo;
        const navigation = this.props.logininfo.navigation;
        const attribs_BankAccount = 
            [
                {
                    label: 'BANK NAME',
                    value: oBankInfo.bankname || '-'
                },
                {
                    label: 'ACCOUNT NUMBER',
                    value: oBankInfo.accountnumber || '-'
                }
            ]

        return(
            <View style={styles.child.container}>
                <View style={styles.child.contCard}>
                    <CustomCard 
                        clearMargin={true} 
                        title={TITLE} 
                        oType='Button'
                        rightHeader={
                            <TouchableOpacity
                                style={styles.child.contBtn}
                                onPress={this._editData}>
                                <Icon name='ios-create-outline' size={40} color='#000000'/>
                            </TouchableOpacity>
                        }>
                        <ScrollView>
                            <View style={styles.child.contContent}>

                                <FixedCard1
                                    hideActionIcon={true}
                                    title={oBankInfo.title || 'BANK ACCOUNT INFORMATION'}
                                    attributes={attribs_BankAccount}/>

                            </View>
                        </ScrollView>
                        
                    </CustomCard>
                </View>
                <FormModal 
                    containerStyle={styles.formModal.container}
                    visible={this.state._bShowForm}
                    onCancel={this._onCancel}
                    onOK={this._onSubmit}
                    title="MODIFY EMPLOYEE BANK ACCOUNT INFORMATION">
                    <EmployeeBankAccount formTriggerSave={this.state._bTriggerSave} hideForm={this._hideForm}/>
                </FormModal>
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
)(EmpBankAccount)