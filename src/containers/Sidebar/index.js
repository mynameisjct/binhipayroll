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

//Styles
import styles from './styles';

export class EmpeSidebarSidebar extends Component {
    render(){
        return(
            <View style={styles.container}>
                <SidebarHeader loginInfo={this.props.logininfo} activeCompany={this.props.activecompany}/>
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
      dispatchStoreValues: (activecompany) => {
        dispatch(SetActiveCompany(activecompany))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpeSidebarSidebar)
  