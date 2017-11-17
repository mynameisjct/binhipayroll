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

const btnActiveColor='red';
const btnInactiveColor='yellow';

export default class EmpeSidebarSidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            _activeCompany: 'BINHI-MeDFI',
            _dblProfileIconSize: 35,
            _dblCompanyIconSize: 50,
            _dblContentIconSize: 25,
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
                company: '',
                dashboard: '',
                policies: '',
                employees: '',
                transactions: '',
                reports: '',
                profile: '',
                settings: '',
                sync: '',
                logout: ''},
            
            _dblFooterIconSize: 20,
        }
    }

    _onPressButton = (targetPage) => {
        var objBtnColor = this.state._btnColors;

        Object.keys(objBtnColor).map(key => {
            if (key.toUpperCase() == targetPage.toUpperCase()){
                this.setState(prevState => ({
                    _btnColors: {
                        ...prevState._btnColors,
                        key: btnActiveColor
                    }
                }),
                    () => {
                        console.log('************************************'),
                        objBtnColor.key = 'test';
                        console.log(key);
                        console.log(objBtnColor[key]);
                    },
                )
                
            }
            
            else{
                this.setState(prevState => ({
                    _btnColors: {
                        ...prevState._btnColors,
                        key: btnInactiveColor
                    }
                }),
                    () => {
                        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
                        objBtnColor.key = 'hello';
                        console.log(key)
                        console.log(objBtnColor[key])
                    }
                )
            }
        });
/* 
        test.forEach(function (item, key) {
            if (key.toUpperCase() == curPage.toUpperCase()){
                this.setState(prevState => ({
                    _btnColors: {
                        ...prevState.jasper,
                        key: btnActiveColor
                    }
                }))
                
            } 
            else{
                this.setState(prevState => ({
                    _btnColors: {
                        ...prevState.jasper,
                        key: btnInactiveColor
                    }
                }))
            }
        }); */

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

    testProp = () => {
        let {params} = this.props.navigation.state;
        console.log('testProp: ' + params.username);
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
                                onValueChange={(itemValue, itemIndex) => this.setState({_activeCompany: itemValue})}>
                                <Picker.Item label="Argus Land" value="Argus Land" />
                                <Picker.Item label="BINHI-MeDFI" value="BINHI-MeDFI" />
                                <Picker.Item label="Credit Ventures Corporation" value="Credit Ventures Corporation" />
                                <Picker.Item label="JCA Realty" value="JCA Realty" />
                                <Picker.Item label="Mitsui Engineering and Shipbuilding Ltd" value="Mitsui Engineering and Shipbuilding Ltd" />
                                
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
                        <View style={[styles.contentStyle, styles.dashboardCont]}>
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
                                        13
                                    </Text>
                                    <Icon 
                                        size={this.state._dblContentIconSize} 
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
                        <View style={[styles.contentStyle, styles.policiesCont]}>
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
                        <View style={[styles.contentStyle, styles.employeesCont]}>
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
                        <View style={[styles.contentStyle, styles.transactionsCont]}>
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
                        <View style={[styles.contentStyle, styles.reportsCont]}>
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
                                        {this.state._profileName}
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

