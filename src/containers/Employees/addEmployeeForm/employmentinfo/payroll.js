import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

//Styles
import styles from '../personalinfo/styles';

import {Payroll as PayrollPolicy} from '../../../CompanyPolicies/Rules/payroll';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as payrollActions from '../../../CompanyPolicies/data/workshift/actions';

export class Payroll extends Component {
    constructor(props){
        super(props);
        this.state = {
            _payrollStatus: [3, 'Loading...']
        }
    }
    _triggerRefresh = () => {
        let curStatus = [2, 'Loading...'];
        this.setState({
            _payrollStatus: curStatus
        });

        this.props.actions.payroll.get({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        })
        
        .then(() => {
            /* console.log('this.props.payroll: ' + JSON.stringify(this.props.payroll)); */
            let oPayroll  = {...this.props.payroll};
            let oStatus = [oPayroll.flagno, oPayroll.message];
            this.setState({
                _payrollStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _payrollStatus: oStatus
            })
		});
    }

    render(){
        return(
            <View style={styles.container}>
                <PayrollPolicy status={this.state._payrollStatus} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        payroll: state.companyPoliciesReducer.payroll,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            payroll: bindActionCreators(payrollActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payroll)