import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

//Styles
import styles from '../personalinfo/styles';

import {WorkShift as WorkShiftPolicy} from '../../../CompanyPolicies/Rules/workshift';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workshiftActions from '../../../CompanyPolicies/data/workshift/actions';

export class WorkShift extends Component {
    constructor(props){
        super(props);
        this.state = {
            _workShiftStatus: [3, 'Loading...']
        }
    }
    _triggerRefresh = () => {
        console.log('IM IN _getWorkSchedule');
        let curStatus = [2, 'Loading...'];
        this.setState({
            _workShiftStatus: curStatus
        });

        this.props.actions.workshift.get({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'get',
            accesstoken: '',
            clientid: '',
        })
        .then(() => {
            let oWorkShift  = {...this.props.companyWorkShift};
            let oStatus = [oWorkShift.flagno, oWorkShift.message];
            this.setState({
                _workShiftStatus: oStatus
            });
		})
		.catch((exception) => {
            console.log('exception: ' + exception);
            let oStatus = [0, 'Application error was encountered. \n Please contact BINHI-MeDFI'];
			this.setState({
                _workShiftStatus: oStatus
            })
		});
    }

    render(){
        return(
            <View style={styles.container}>
                <WorkShiftPolicy status={this.state._workShiftStatus} triggerRefresh={this._triggerRefresh}/>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        companyWorkShift: state.companyPoliciesReducer.workshift,
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
)(WorkShift)