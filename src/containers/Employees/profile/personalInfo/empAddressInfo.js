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
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from '../styles';

//Children Components
import EmployeeAddress from '../../addEmployeeForm/personalinfo/address';

//Custom Components
import * as StatusLoader from '../../../../components/ScreenLoadStatus'
import CustomCard from '../../../../components/CustomCards';
import FixedCard1 from '../../../../components/FixedCards';
import FormModal from '../../../../components/FormModal';

//Helper
import * as oHelper from '../../../../helper';

//Redux
import { connect } from 'react-redux';
import * as employeeActions from '../../data/activeProfile/actions';
import { bindActionCreators } from 'redux';

//Constants
const TITLE = 'Address Information'

export class EmpAddressInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            _bShowForm: false
        }
    }
    _editData = () => {
        this.setState({ _bShowForm: true });
    }

    _onCancel = () => {
        this.setState({ _bShowForm: false });
    }

    _onSubmit = () => {
        this.setState({ _bShowForm: false });
    }

    render(){
        const oAddress =  this.props.employees.activeProfile.data.personalinfo.address;
        const navigation = this.props.logininfo.navigation;
        const attribs_PresentAddress = 
            [
                {
                    label: oAddress.present.province.label || 'PROVINCE',
                    value: oAddress.present.province.value || ''
                },
                {
                    label: oAddress.present.city.label || 'CITY',
                    value: oAddress.present.city.value || ''
                },
                {
                    label: oAddress.present.barangay.label || 'BARANGAY',
                    value: oAddress.present.barangay.value || ''
                },
                {
                    label: oAddress.present.street.label || 'STREET',
                    value: oAddress.present.street.value || ''
                }
            ]

        const attribs_PermanentAddress = 
            [
                {
                    label: oAddress.permanent.province.label || 'PROVINCE',
                    value: oAddress.permanent.province.value || ''
                },
                {
                    label: oAddress.permanent.city.label || 'CITY',
                    value: oAddress.permanent.city.value || ''
                },
                {
                    label: oAddress.permanent.barangay.label || 'BARANGAY',
                    value: oAddress.permanent.barangay.value || ''
                },
                {
                    label: oAddress.permanent.street.label || 'STREET',
                    value: oAddress.permanent.street.value || ''
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
                                    title={oAddress.present.title || 'PRESENT ADDRESS'}
                                    attributes={attribs_PresentAddress}/>
                                
                                <FixedCard1
                                    hideActionIcon={true}
                                    title={oAddress.permanent.title || 'PERMANENT ADDRESS'}
                                    attributes={attribs_PermanentAddress}/>

                            </View>
                        </ScrollView>
                        
                    </CustomCard>
                </View>
                
                <FormModal 
                    containerStyle={styles.formModal.container}
                    visible={this.state._bShowForm}
                    onCancel={this._onCancel}
                    onOK={this._onSubmit}
                    title="MODIFY ADDRESS INFORMATION">
                    <EmployeeAddress/>
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
)(EmpAddressInfo)