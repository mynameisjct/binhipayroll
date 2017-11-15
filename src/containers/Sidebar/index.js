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

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EmpeSidebarSidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            _activeCompany: 'BINHI-MeDFI',
            _dblProfileIconSize: 35,
            _dblCompanyIconSize: 55,
            _dblContentIconSize: 25,
            _dblFooterIconSize: 20,
            _dblFooterIconLogoutSize: 18,
            _strIconName: {
                company: 'md-home',
                dashboard: 'md-apps',
                policies: 'md-list-box',
                employees: 'ios-people',
                transactions: 'ios-card',
                reports: 'ios-book',
                profile: 'md-person',
                settings: 'md-settings',
                sync: 'md-sync',
                logout: 'md-power',
                notification: 'md-notifications-outline'},

            _strIconColor: '#434646',
            _strIconNotificationColor: '#EA0202',
            _profileName: 'Pedro Duterte',
            _profileDesc: 'My Profile'
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableNativeFeedback
                    onPress={this._onPressButton}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.companyCont}>
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
                </TouchableNativeFeedback>

                <ScrollView style={styles.scrollableCont}>

                    {/*************Dashbord*************/}
                    <TouchableNativeFeedback
                        style={{backgroundColor: 'red'}}
                        onPress={this._onPressButton}
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
                        onPress={this._onPressButton}
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
                        onPress={this._onPressButton}
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
                        onPress={this._onPressButton}
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
                        onPress={this._onPressButton}
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
                        onPress={this._onPressButton}
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
                            onPress={this._onPressButton}
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
                            onPress={this._onPressButton}
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
                            onPress={this._onPressButton}
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
            </View>
        );
    }
}

