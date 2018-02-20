import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

//Styles
import styles from './styles';


import WorkShift from '../../../CompanyPolicies/workshift';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workshiftActions from '../../../CompanyPolicies/data/workshift/actions';

export class EmployeeWorkShift extends Component {
    componentWillMount(){
        
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.workshiftStyles.contHeader}>
                    <View style={styles.workshiftStyles.contEffectivedate}>
                    </View>
                    <View style={styles.workshiftStyles.contAddBtn}>
                    </View>
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
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            workshift: bindActionCreators(workshiftActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeWorkShift)