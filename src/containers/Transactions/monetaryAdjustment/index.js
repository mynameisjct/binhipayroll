import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Children Components
import MonetaryAdjustmentForm from './form';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeListActions from '../../Employees/data/list/actions';

//helper
import * as oHelper from '../../../helper';

//Constants
const TITLE = 'SPECIAL DEDUCTIONS & ALLOWANCES';

export default class MonetaryAdjustment extends Component {

/*     componentDidMount(){
        this._getUpdatedRequiredDataFromDB();
    }

    _getUpdatedRequiredDataFromDB = () => {
        this.props.actions.employeelist.get();
    } */

    render(){
        return(
            <MonetaryAdjustmentForm 
                title={TITLE}
                visible={this.props.visible}
                onCancel={() => this.props.onCancel()}
                onSubmit={() => this.props.onSubmit()}/>
        );
    }
}

function mapStateToProps (state) {
    return {
        employeelist: state.employees.list,
        payrollList: state.transactions.payrollList
    }
}

/* function mapDispatchToProps (dispatch) {
    return {
        actions: {
            payrollList: bindActionCreators(payrollListActions, dispatch),
            payrollGeneration: bindActionCreators(payrollGenerationActions, dispatch),
            employeelist: bindActionCreators(employeeListActions, dispatch)
        }
    }
}
  
export default  withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(PayrollTransaction)) */