import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

//Children Components
import SidebarHeader from './header';
import SidebarBody from './body';
import SidebarFooter from './footer';

//Redux
import { connect } from 'react-redux';
import { SetActiveCompany } from '../../actions';

//Styles
import styles from './styles';

//helper
import * as oHelper from '../../helper';

export class EmpeSidebarSidebar extends Component {
    render(){
        return(
            <View style={styles.container}>
                <SidebarHeader 
                    loginInfo={this.props.logininfo} activeCompany={this.props.activecompany}
                    onSwitchCompany={this._onSwitchCompany}
                />
                <SidebarBody/>
                <SidebarFooter loginInfo={this.props.logininfo}/>
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setActiveCompany: (activecompany) => {
            dispatch(SetActiveCompany(activecompany))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpeSidebarSidebar)
  