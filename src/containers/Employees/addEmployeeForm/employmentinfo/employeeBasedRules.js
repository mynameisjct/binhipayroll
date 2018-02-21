import React, { Component } from 'react';
import {
    View,
    Text,
    Picker
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles';
import WorkShift from '../../../CompanyPolicies/workshift';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workshiftActions from '../../../CompanyPolicies/data/workshift/actions';
import * as employeeActions from '../../data/activeProfile/actions';

export class EmployeeBasedRules extends Component {
    constructor(props){
        super(props);
        this.state = {
            language: ''
        }
    }
    componentWillMount(){
        
    }
    render(){
        return(
            <View style={styles.transparentContainer}>
                <View style={styles.container}>
                    <View style={styles.workshiftStyles.header.container}>
                        <View style={styles.workshiftStyles.header.contInfo}>
                            <View style={styles.workshiftStyles.header.contInfoLabel}>
                                <Text style={styles.workshiftStyles.header.txtInfo}>
                                    Effective Date:
                                </Text>
                            </View>
                            <View style={styles.workshiftStyles.header.contInfoData}>
                                <View style={styles.workshiftStyles.header.pickerContainer}>
                                    <Picker
                                        style={styles.workshiftStyles.header.namePickerStyle}
                                        selectedValue={this.state.language}
                                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                                        <Picker.Item label="Java" value="java" />
                                        <Picker.Item label="JavaScript" value="js" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View style={styles.workshiftStyles.header.contBtn}>
                        </View>
                    </View>
                    <View style={styles.workshiftStyles.body.container}>
                        <View style={styles.workshiftStyles.body.contRule}>
                            <WorkShift hideHeader={true} viewOnly={true}/>
                        </View>
                    </View>
                    <ActionButton
                        bgColor='rgba(0,0,0,0.8)'
                        shadowStyle={{elevation: 30}}
                        buttonColor="#EEB843"
                        spacing={10}
                        icon={<Icon name="alarm-multiple" color='#fff' size={25} style={styles.actionButtonIcon} />}  
                        >
                        <ActionButton.Item size={45} buttonColor='#26A65B' title="ADD NEW EMPLOYEE SCHEDULE" onPress={() => {this._addNewWorkShift()}}>
                            <Icon name="bell-plus" color='#fff' size={18} style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item size={45} buttonColor='#4183D7' title="ADD NEW WORKSHIFT TYPE" onPress={() => {}}>
                            <Icon name="table-edit" color='#fff' size={18} style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item size={45} buttonColor='#26A65B' title="ADD NEW EMPLOYEE SCHEDULE" onPress={() => {this._addNewWorkShift()}}>
                            <Icon name="bell-plus" color='#fff' size={18} style={styles.actionButtonIcon} />
                        </ActionButton.Item>

                    </ActionButton>
                </View>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        workshift: state.companyPoliciesReducer.workshift,
        oEmpWorkShift: state.employees.activeProfile.data.employmentinfo.workshift,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employee: bindActionCreators(employeeActions, dispatch),
            workshift: bindActionCreators(workshiftActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeBasedRules)