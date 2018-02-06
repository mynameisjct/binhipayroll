import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

//Styles
import styles from '../personalinfo/styles';


import WorkShift from '../../../CompanyPolicies/workshift';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workshiftActions from '../../../CompanyPolicies/data/workshift/actions';

export class EmployeeWorkShift extends Component {
    componentWillMount(){
        console.log('##################this.props.workshift: ' + JSON.stringify(this.props.workshift));
    }
    render(){
        return(
            <View style={styles.container}>
                <WorkShift/>
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