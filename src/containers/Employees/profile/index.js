//Packages
import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';

//Styles Properties
import styles from './styles';

//Custom Components
import * as StatusLoader from '../../../components/ScreenLoadStatus'
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';
import Header1 from '../../Headers/header1';

//Children Components
import EmpBasicInfo from './personalInfo/empBasicInfo';
import EmpAddressInfo from './personalInfo/empAddressInfo';
import EmpFamily from './personalInfo/empFamily';
import EmpBankAccount from './bankInfo/empBankAccount';

import EmpBenefits from './employmentInfo/empBenefits';
import EmpBonus from './employmentInfo/empBonus';
import EmpDetails from './employmentInfo/empDetails';
import EmpLeaves from './employmentInfo/empLeaves';
import EmpOvertime from './employmentInfo/empOvertime';
import EmpPayroll from './employmentInfo/empPayroll';
import EmpTardiness from './employmentInfo/empTardiness';
import EmpTax from './employmentInfo/empTax';
import EmpUndertime from './employmentInfo/empUndertime';
import EmpWorkshift from './employmentInfo/empWorkshift';

import EmpBenefitsReport from './reports/empBenefitsReport';
import EmpDTR from './reports/empDTR';
import EmpLeaveHistory from './reports/empLeaveHistory'
import EmpPaySlip from './reports/empPaySlip'
import EmpTimeDisputes from './reports/empTimeDisputes'

//Helper
import * as oHelper from '../../../helper';

//Redux
import { connect } from 'react-redux';

//constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Employee Profile Summary'

export class ProfileMenu extends PureComponent{
    render(){
        let item = this.props.item;
        return(
            <TouchableNativeFeedback 
                onPress={() => this.props.itemPressed(item)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View>
                    {
                        item.type.toUpperCase() == 'CONTENT' ?
                        <View style={[styles.btnCont, this.props.activeItem.key == item.key ? styles.btnContActive : {}]}>
                                <View style={styles.iconCont}>
                                    <View style={styles.iconPlaceholder}>
                                        <Icon name={item.icon} size={16} color='#fff'/>
                                    </View>
                                </View>
                                <View style={styles.labelCont}>
                                    <Text style={styles.txtLabel}>{item.name}</Text>
                                </View>
                            </View>
                        :
                            <View style={styles.titleCont}>
                                <View style={styles.contContentTitle}>
                                    <Text style={styles.txtLabelTitle}>{item.name}</Text>
                                </View>
                            </View>
                    }
                </View>
            </TouchableNativeFeedback>
        )
    }
}

export class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            _refreshing: false,
            _list: [
                {
                    key: "0001",
                    name: "PERSONAL INFORMATION",
                    type: "title"

                },
                {
                    key: "0002",
                    name: "Basic & Contact Info",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <EmpBasicInfo/>
                },
                {
                    key: "0003",
                    name: "Address Info",
                    icon: "map-marker",
                    type: "content",
                    oComponent: <EmpAddressInfo/>
                },
                {
                    key: "0004",
                    name: "Family & Dependents",
                    icon: "account-multiple",
                    type: "content",
                    oComponent: <EmpFamily/>
                },
                /* {
                    key: "0005",
                    name: "Work and Education",
                    icon: "briefcase",
                    type: "content",
                    oComponent: <BasicInfo/>
                }, */
                {
                    key: "0006",
                    name: "BANK INFORMATION",
                    type: "title"
                },
                {
                    key: "0007",
                    name: "Bank Account Info",
                    icon: "bank",
                    type: "content",
                    oComponent: <EmpBankAccount/>
                },
                {
                    key: "0008",
                    name: "EMPLOYMENT INFORMATION",
                    type: "title"
                },
                {
                    key: "0009",
                    name: "Employment Details",
                    icon: "file-document",
                    type: "content",
                    oComponent: <EmpDetails/>
                },
                {
                    key: "0010",
                    name: "Work Shift",
                    icon: "calendar-clock",
                    type: "content",
                    oComponent: <EmpWorkshift/>
                },
                {
                    key: "0011",
                    name: "Payroll Schedule",
                    icon: "credit-card",
                    type: "content",
                    oComponent: <EmpPayroll/>
                },
                {
                    key: "0012",
                    name: "Tardiness Policy",
                    icon: "clock-alert",
                    type: "content",
                    oComponent: <EmpTardiness/>
                },
                {
                    key: "0013",
                    name: "Undertime Policy",
                    icon: "timelapse",
                    type: "content",
                    oComponent: <EmpUndertime/>
                },
                {
                    key: "0014",
                    name: "Overtime Policy",
                    icon: "clock-fast",
                    type: "content",
                    oComponent: <EmpOvertime/>
                },
                {
                    key: "0015",
                    name: "Leaves",
                    icon: "timer-off",
                    type: "content",
                    oComponent: <EmpLeaves/>
                },
                {
                    key: "0016",
                    name: "Benefits",
                    icon: "format-list-numbers",
                    type: "content",
                    oComponent: <EmpBenefits/>
                },
                {
                    key: "0017",
                    name: "Tax",
                    icon: "calculator",
                    type: "content",
                    oComponent: <EmpTax/>
                },
                {
                    key: "0018",
                    name: "13th Month Pay",
                    icon: "account-star",
                    type: "content",
                    oComponent: <EmpBonus/>
                },
                {
                    key: "0019",
                    name: "PERSONAL REPORTS",
                    type: "title"
                },
                {
                    key: "0020",
                    name: "Daily Time Record",
                    icon: "timetable",
                    type: "content",
                    oComponent: <EmpDTR/>
                },
                {
                    key: "0021",
                    name: "Leave History",
                    icon: "file-excel",
                    type: "content",
                    oComponent: <EmpLeaveHistory/>
                },
                {
                    key: "0022",
                    name: "Late/OT/UT History",
                    icon: "file-delimited",
                    type: "content",
                    oComponent: <EmpTimeDisputes/>
                },
                {
                    key: "0023",
                    name: "Benefits",
                    icon: "file-send",
                    type: "content",
                    oComponent: <EmpBenefitsReport/>
                },
                {
                    key: "0024",
                    name: "Pay Slips",
                    icon: "file-account",
                    type: "content",
                    oComponent: <EmpPaySlip/>
                },
            ],
            _activeItem: {
                key: "0002",
                name: "Basic & Contact Info",
                icon: "information-variant",
                type: "content",
                oComponent: <EmpBasicInfo/>
            },

        }
    }

    static navigationOptions = {
        header : 
            <Header1 title= 'MY EMPLOYEES'/>
    }

    _setActiveChild = (oItem) => {
        requestAnimationFrame(() => {
            let oActiveItem = {...this.state._activeItem}
            oActiveItem.key=oItem.key;
            oActiveItem.name=oItem.name;
            oActiveItem.icon=oItem.Icon;
            oActiveItem.type=oItem.type;
            oActiveItem.oComponent=oItem.oComponent;
            this.setState({
                _activeItem: oActiveItem
            })
        })
    }

/*     _setActiveChild = (oItem) => {
        if(this.state._activeChild != oItem.key){
            this._setButtons(oItem); //immediately trigg
            requestAnimationFrame(() => {
                this._setChildComponent(oItem);
                this.flatListRef.scrollToIndex({animated: true, index: Number(oItem.key)-1});
            })
        }
    } */

    render(){
        let oProfile = this.props.employees.activeProfile.data;
        const oListHeader = (
            <View style={styles.contSearch}>
                <View style={styles.contSearchBox}>
                    <Icon name='magnify' size={22} color='#000' style={styles.iconSearch}/>
                    <TextInput 
                        style={styles.textinputField}
                        placeholder='Search'
                        onChangeText={txtInput => {}}
                        value={''}
                        ref='_ref_emp_search'
                        returnKeyType="search"
                        underlineColorAndroid='transparent'
                    />
                </View>
            </View>
        )
        
        const navigation = this.props.logininfo.navigation;
        return(
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#818489', '#3f4144', '#202626']}
                    style={styles.leftCont}>
                    
                    <View style={styles.contTitle}>

                        <View style={styles.contIconProfile}>
                            {/* <View style={{width: 65, height: 65, backgroundColor: 'red', borderWidth: 1, borderColor: '#EEB843', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}> */}
                                <Icon name='account-circle' size={67} color='#fff'/>
                            {/* </View> */}
                        </View>

                        <View style={styles.contInfoProfile}>
                            <Text style={styles.txtProfileTitle}>
                                {
                                    oProfile.personalinfo.basicinfo.lastname + ', ' +
                                    oProfile.personalinfo.basicinfo.firstname 
                                }
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                {this.props.activecompany.name}
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                Auditor
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                Yacapin Branch
                            </Text>
                        </View>

                    </View>

                    <View style={styles.optionsCont}>
                        <FlatList
                            /* getItemLayout={this._getItemLayout} */
                            ListHeaderComonent={oListHeader}
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.state._list}
                            renderItem={({item}) => 
                                <ProfileMenu
                                    activeItem={this.state._activeItem}
                                    item={item} 
                                    itemPressed={(pressedItem) => this._setActiveChild(pressedItem)}/>
                            }
                        />
                    </View>
                </LinearGradient>
                    
                <View style={styles.rightCont}>
                    {
                        this.state._activeItem.oComponent
                    }
                </View>
            </View>
        );
    }
}


function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        employees: state.employees
    }
}

function mapDispatchToProps (dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)