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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Children Components
import EmployeeBenefits from '../../addEmployeeForm/employmentinfo/benefits';

//Styles Properties
import styles from '../styles';

//Custom Components
import * as StatusLoader from '../../../../components/ScreenLoadStatus'
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../../components/CustomCards';

//Helper
import * as oHelper from '../../../../helper';

//Redux
import { connect } from 'react-redux';
import * as employeeActions from '../../data/activeProfile/actions';
import { bindActionCreators } from 'redux';

//Constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Employee Benefits Information'
export class EmpBenefits extends Component {
    render(){
        const navigation = this.props.logininfo.navigation;
        return(
            <View style={styles.child.container}>
                <EmployeeBenefits/>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo
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
)(EmpBenefits)