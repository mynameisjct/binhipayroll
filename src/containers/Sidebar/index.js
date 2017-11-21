/**************************************************************
 *  FileName:           index.js
 *  Description:        Sidebar
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Picker,
    TouchableNativeFeedback
} from 'react-native';

import { DrawerItems, SafeAreaView } from 'react-navigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import {SetLoginInfo, SetActiveCompany} from '../../actions';

import apiConfig from '../../services/api/config';

const script_Notification = 'forms/empnotifications.php';

const btnActiveColor='rgba(0, 0, 0, 0.1);';
const btnInactiveColor='transparent';

export class EmpeSidebarSidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            _activeUser: {},
            _activeCompany: '',
            _dblProfileIconSize: 35,
            _dblCompanyIconSize: 50,
            _dblContentIconSize: 25,
            _dblNotificationIconSize: 22,
            _dblFooterIconSize: 20,
            _dblFooterIconLogoutSize: 18,
            _strIconName: {
                company: 'md-home',
                dashboard: 'md-apps',
                policies: 'ios-book',
                employees: 'ios-people',
                transactions: 'ios-card',
                reports: 'md-list-box',
                profile: 'md-person',
                settings: 'md-settings',
                sync: 'md-sync',
                logout: 'md-power',
                notification: 'md-notifications-outline'},

            _strIconColor: '#434646',
            _strIconNotificationColor: '#EA0202',
            _profileName: 'Pedro Duterte',
            _profileDesc: 'My Profile',

            //touchable colors
            _btnColors: {
                company: btnInactiveColor,
                dashboard: btnActiveColor,
                policies: btnInactiveColor,
                employees: btnInactiveColor,
                transactions: btnInactiveColor,
                reports: btnInactiveColor,
                profile: btnInactiveColor,
                settings: btnInactiveColor,
                sync: btnInactiveColor,
                logout: btnInactiveColor
            },
            
            _dblFooterIconSize: 20,

            _notificationCount: 0,
        }
    }

    componentWillMount()
    {
        let objActiveUser = Object.assign({}, this.props.logininfo);
        this.setState(
            {
                _activeUser: objActiveUser
            },
                () => {
                    this.initPicker();
                }
        )
        
    }

    initPicker(){
        this.state._activeUser.resCompany.forEach(function(element) {
            if(element.default == 1){
                this.setState(
                    {
                        _activeCompany: element.name
                    },
                        () => {
                            this.getNotificationsCount();
                            this.props.dispatchStoreValues({
                                name: this.state._activeCompany
                            });
                        }
                );
            }
        }, this);
    }

    getNotificationsCount(){
        this.fetchNotificationFromDB();
    }

    getNotificationColor(){
    }

    fetchNotificationFromDB = () => {
        console.log('*************************************')
        console.log('apiConfig.url + script_Notification: ' + apiConfig.url + script_Notification);
        fetch(apiConfig.url + script_Notification,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                companyname: this.state._activeCompany
            })
            
        }).then((response)=> response.json())
            .then((res)=>{
                    /* alert(res); */
                    this.setState({
                        _resSuccess: res.flagno,
                        _resMsg: res.msg,
                        _notificationCount: res.notificationcount,                       
                    },
                        () => {
                            console.log('*************************************')
                            console.log('INPUTS: ')
                            console.log('companyname: ' + this.state._activeCompany)
                            console.log('-----------------------------------------')
                            console.log('OUTPUTS: ')
                            console.log('_resSuccess: ' + this.state._resSuccess)
                            console.log('_resMsg: ' + this.state._resMsg)
                            console.log('_notificationCount: ' + this.state._notificationCount)
                        }
                    );
            }).catch((error)=> {
                alert(error);
        });
    }
    _onPressButton = (targetPage) => {
        console.log('THIS IS A FUCKING TEST')
        let objBtnColor = Object.assign({}, this.state._btnColors);

        Object.keys(objBtnColor).map(key => {
            if (key.toUpperCase() == targetPage.toUpperCase()){
                objBtnColor[key] = btnActiveColor;
            }
            
            else{
                objBtnColor[key] = btnInactiveColor;
            }
        });

        this.setState({
            _btnColors: objBtnColor
        });

        switch(targetPage.toUpperCase()){
            case 'COMPANY':
                this.props.navigation.navigate('CompanyProfile');
                break
            case 'DASHBOARD':
                this.props.navigation.navigate('EmprDashBoard');
                break
            case 'POLICIES':
                this.props.navigation.navigate('CompanyPolicies');
                break
            case 'EMPLOYEES':
                this.props.navigation.navigate('EmployeeInfo');
                break
            case 'TRANSACTIONS':
                this.props.navigation.navigate('Transactions');
                break
            case 'REPORTS':
                this.props.navigation.navigate('Reports');
                break
            case 'PROFILE':
                alert('TO DISCUSS UI REQUIREMENT');
                break
            case 'SETTINGS':
                alert('TO DISCUSS UI REQUIREMENT');
                break
            case 'SYNC':
                alert('TO DISCUSS UI REQUIREMENT');
                break
            case 'LOGOUT':
                this.props.navigation.navigate('Login');
                break
        }
    }

    getUserFullName = () => {
        return(this.state._activeUser.resFName + ' ' + this.state._activeUser.resLName);
    }

    setPickerValue = (item) => {
        this.setState({
            _activeCompany: item
        },
            () => {
                this.getNotificationsCount();
                this.props.dispatchStoreValues({
                    name: this.state._activeCompany
                });
            }
        )
        
    }

    render(){
        return(
            <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.companyCont}>
                    <TouchableNativeFeedback
                        onPress={() => {this._onPressButton('company')}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.mainContentDiv}>
                            <View style={styles.iconCont}>
                                <Icon
                                    size={this.state._dblCompanyIconSize} 
                                    name={this.state._strIconName.company} 
                                    color={this.state._strIconColor}  />
                            </View>
                            <View style={styles.labelCont}>
                                <Text style={styles.txtTitle}>
                                    {this.state._activeCompany}
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.miscContentDiv}>
                        <View style={styles.companyPicker}>
                            <Picker
                                mode='dropdown'
                                selectedValue={this.state._activeCompany}
                                onValueChange={(itemValue, itemIndex) => {this.setPickerValue(itemValue)}}>
                                
                                {
                                    this.state._activeUser.resCompany.map((company, index) => (
                                        <Picker.Item key={index} label={company.name} value={company.name} />
                                    ))
                                }
                                
                            </Picker>
                        </View>
                    </View>
                </View>
                

                <ScrollView style={styles.scrollableCont}>

                    {/*************Dashbord*************/}
                    <TouchableNativeFeedback
                        style={{backgroundColor: 'red'}}
                        onPress={() => {this._onPressButton('dashboard')}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={[styles.contentStyle, styles.dashboardCont, {backgroundColor: this.state._btnColors.dashboard}]}>
                            <View style={styles.mainContentDiv}>
                                <View style={styles.iconCont}>
                                    <Icon 
                                        size={this.state._dblContentIconSize} 
                                        name={this.state._strIconName.dashboard} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={styles.labelCont}>
                                    <Text style={styles.txtContent}>
                                        Dashboard
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.miscContentDiv}>
                                <View style={styles.notificationCont}>
                                    <Text style={styles.txtNotification}>
                                        {this.state._notificationCount}
                                    </Text>
                                    <Icon 
                                        size={this.state._dblNotificationIconSize} 
                                        name={this.state._strIconName.notification} 
                                        color={this.state._strIconNotificationColor}  />
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    {/*************Company Policies*************/}
                    <TouchableNativeFeedback
                        onPress={() => {this._onPressButton('policies')}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={[styles.contentStyle, styles.policiesCont, {backgroundColor: this.state._btnColors.policies}]}>
                            <View style={styles.mainContentDiv}>
                                <View style={styles.iconCont}>
                                    <Icon 
                                        size={this.state._dblContentIconSize} 
                                        name={this.state._strIconName.policies} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={styles.labelCont}>
                                    <Text style={styles.txtContent}>
                                        Company Policies
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.miscContentDiv}>
                                {/*Future use*/}
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    {/*************My Employees*************/}
                    <TouchableNativeFeedback
                        onPress={() => {this._onPressButton('employees')}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={[styles.contentStyle, styles.employeesCont, {backgroundColor: this.state._btnColors.employees}]}>
                            <View style={styles.mainContentDiv}>
                                <View style={styles.iconCont}>
                                    <Icon 
                                        size={this.state._dblContentIconSize} 
                                        name={this.state._strIconName.employees} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={styles.labelCont}>
                                    <Text style={styles.txtContent}>
                                        My Employees
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.miscContentDiv}>
                                {/*Future use*/}
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    {/*************Transactions*************/}
                    <TouchableNativeFeedback
                        onPress={() => {this._onPressButton('transactions')}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={[styles.contentStyle, styles.transactionsCont, {backgroundColor: this.state._btnColors.transactions}]}>
                            <View style={styles.mainContentDiv}>
                                <View style={styles.iconCont}>
                                    <Icon 
                                        size={this.state._dblContentIconSize} 
                                        name={this.state._strIconName.transactions} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={styles.labelCont}>
                                    <Text style={styles.txtContent}>
                                        Transactions
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.miscContentDiv}>
                                {/*Future use*/}
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    {/*************Reports*************/}
                    <TouchableNativeFeedback
                        onPress={() => {this._onPressButton('reports')}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={[styles.contentStyle, styles.reportsCont, {backgroundColor: this.state._btnColors.reports}]}>
                            <View style={styles.mainContentDiv}>
                                <View style={styles.iconCont}>
                                    <Icon 
                                        size={this.state._dblContentIconSize} 
                                        name={this.state._strIconName.reports} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={styles.labelCont}>
                                    <Text style={styles.txtContent}>
                                        Reports
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.miscContentDiv}>
                                {/*Future use*/}
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    
                    
{/*                     <View style={[styles.contentStyle]}>
                        <Text> Scroll Test. To be removed.</Text>
                    </View>

                    <View style={[styles.contentStyle]}>
                        <Text> Scroll Test. To be removed.</Text>
                    </View>
                    
                    <View style={[styles.contentStyle]}>
                        <Text> Scroll Test. To be removed.</Text>
                    </View>

                    <View style={[styles.contentStyle]}>
                        <Text> Scroll Test. To be removed.</Text>
                    </View>
                    
                    <View style={[styles.contentStyle]}>
                        <Text> Scroll Test. To be removed.</Text>
                    </View>

                    <View style={[styles.contentStyle]}>
                        <Text> Scroll Test. To be removed.</Text>
                    </View> */}

                </ScrollView>

                {/******************Footer Layout******************/}
                <View style={styles.footerCont}>

                    <TouchableNativeFeedback
                        onPress={() => {this._onPressButton('profile')}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.profileCont}>
                            <View style={styles.mainContentDiv}>
                                <View style={styles.iconCont}>
                                    <Icon 
                                        size={this.state._dblProfileIconSize} 
                                        name={this.state._strIconName.profile} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={styles.specialProfileLabelCont}>
                                    <Text style={styles.txtContent}>
                                        {this.getUserFullName()}
                                    </Text>
                                    <Text style={styles.txtProfileDesc}>
                                        {this.state._profileDesc}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.miscContentDiv}>
                                {/*Future use*/}
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.bottomCont}>

                        <TouchableNativeFeedback
                            onPress={() => {this._onPressButton('settings')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={[styles.bottomContentStyle, styles.settingCont]}>
                                <View style={styles.footerIconCont}>
                                    <Icon 
                                        style={styles.iconFooterCorrection}
                                        size={this.state._dblFooterIconSize} 
                                        name={this.state._strIconName.settings} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={[styles.footerLabelCont, styles.txtFooterCorrection]}>
                                    <Text style={styles.txtFooter}>
                                        Settings
                                    </Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPress={() => {this._onPressButton('sync')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={[styles.bottomContentStyle,styles.syncCont]}>
                                <View style={styles.footerIconCont}>
                                    <Icon 
                                        style={styles.iconFooterCorrection}
                                        size={this.state._dblFooterIconSize} 
                                        name={this.state._strIconName.sync} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={[styles.footerLabelCont, styles.txtFooterCorrection]}>
                                    <Text style={styles.txtFooter}>
                                        Sync
                                    </Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback
                            onPress={() => {this._onPressButton('logout')}}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={[styles.bottomContentStyle,styles.logoutCont]}>
                                <View style={styles.footerIconCont}>
                                    <Icon 
                                        style={styles.specialIconFooterCorrection}
                                        size={this.state._dblFooterIconLogoutSize} 
                                        name={this.state._strIconName.logout} 
                                        color={this.state._strIconColor}  />
                                </View>
                                <View style={[styles.footerLabelCont, styles.txtFooterCorrection]}>
                                    <Text style={styles.txtFooter}>
                                        Logout
                                    </Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        
                    </View>
                </View>
            </SafeAreaView>
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
      dispatchStoreValues: (activecompany) => {
        dispatch(SetActiveCompany(activecompany))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpeSidebarSidebar)
  