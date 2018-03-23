import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

//Redux
import { connect } from 'react-redux';
import { SetActiveCompany } from '../../../actions';

//helper
import * as oHelper from '../../../helper';

//Custom Components
import CustomPicker from '../../../components/CustomPicker';

//Styles
import styles from '../styles';

//constants
const COLOR_ICON = '#434646';
const COLOR_NOTIFICATION = '#434646';
const employer = {
    header: {
        iconName: 'md-home',
        iconSize: 50,
    },

    dropdown: {
        iconName: 'md-git-compare',
        iconSize: 15,
        color: '#505251'
    }
}

class SidebarHeaderEmployer extends Component{
    constructor(props){
        super(props);
        this.state = {
            _bShowPicker: false
        }
    }
    _navigateHeaderView = () => {
        this.props.navigation.navigate('CompanyProfile');
    }

    _showPickerMenu = () => {
        this.setState({ _bShowPicker: true });
    }

    _onSelect = (value) => {
        let oActiveCompany = oHelper.getElementByPropValue(this.props.logininfo.resCompany, 'id', value)
        this.props.setActiveCompany(oActiveCompany);
        this.props.navigation.navigate('DrawerClose');
        this.props.navigation.navigate('EmprDashBoard');
        this._hidePicker();
    }

    _resetData = () => {
        let oPoliciesStore = this.props.reduxState.companyPoliciesReducer;
    }

    _hidePicker = () => {
        this.setState({ _bShowPicker: false });
    }

    render(){
        const headerStyles = styles.header;
        const textStyles = styles.textStyles;

        return(
            <View style={styles.header.container}>
                <TouchableNativeFeedback
                    onPress={this._navigateHeaderView}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={headerStyles.content}>
                        <View style={headerStyles.left}>
                            <Icon
                                size={employer.header.iconSize} 
                                name={employer.header.iconName} 
                                color={COLOR_ICON}  />
                        </View>
                        <View style={headerStyles.right}>
                            <Text style={textStyles.title}>
                                {this.props.activecompany.name}
                            </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={this._showPickerMenu}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={headerStyles.picker}>
                        <Icon
                            size={employer.dropdown.iconSize} 
                            name={employer.dropdown.iconName} 
                            color={employer.dropdown.color}  />
                    </View>
                </TouchableNativeFeedback>
                {
                    <CustomPicker 
                        list={this.props.logininfo.resCompany}
                        emptyprompt = 'Error: No data found'
                        title='SWITCH COMPANY'
                        objLabelName={'name'}
                        onSelect={this._onSelect}
                        visible={this.state._bShowPicker}
                        onClose={this._hidePicker}/>
                }
            </View>
        )
    }
}

function mapStateToProps (state) {
    return {
        reduxState: state,
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

export default withNavigation(connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarHeaderEmployer));