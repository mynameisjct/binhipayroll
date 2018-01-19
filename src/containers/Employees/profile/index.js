//Packages
import React, { Component } from 'react';
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
import BasicInfo from './basicinfo/';

//Helper
import * as oHelper from '../../../helper';

//Redux
import { connect } from 'react-redux';

//constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Employee Profile Summary'

export class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
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
                    type: "content"
                },
                {
                    key: "0003",
                    name: "Address Info",
                    icon: "map-marker",
                    type: "content"
                },
                {
                    key: "0004",
                    name: "Family & Dependents",
                    icon: "account-multiple",
                    type: "content"
                },
                {
                    key: "0005",
                    name: "Work and Education",
                    icon: "briefcase",
                    type: "content"
                },
                {
                    key: "0006",
                    name: "BANK INFORMATION",
                    type: "title"
                },
                {
                    key: "0007",
                    name: "Bank Account Info",
                    icon: "bank",
                    type: "content"
                },
                {
                    key: "0008",
                    name: "EMPLOYMENT",
                    type: "title"
                },
                {
                    key: "0009",
                    name: "Employment Info",
                    icon: "file-document",
                    type: "content"
                },
                {
                    key: "0010",
                    name: "Work Shift",
                    icon: "calendar-clock",
                    type: "content"
                },
                {
                    key: "0011",
                    name: "Payroll Schedule",
                    icon: "credit-card",
                    type: "content"
                },
                {
                    key: "0012",
                    name: "Tardiness Policy",
                    icon: "clock-alert",
                    type: "content"
                },
                {
                    key: "0013",
                    name: "Undertime Policy",
                    icon: "timelapse",
                    type: "content"
                },
                {
                    key: "0014",
                    name: "Overtime Policy",
                    icon: "clock-fast",
                    type: "content"
                },
                {
                    key: "0015",
                    name: "Leaves",
                    icon: "timer-off",
                    type: "content"
                },
                {
                    key: "0016",
                    name: "Benefits",
                    icon: "format-list-numbers",
                    type: "content"
                },
                {
                    key: "0017",
                    name: "Tax",
                    icon: "calculator",
                    type: "content"
                },
                {
                    key: "0018",
                    name: "REPORTS",
                    type: "title"
                },
                {
                    key: "0019",
                    name: "Daily Time Record",
                    icon: "timetable",
                    type: "content"
                },
                {
                    key: "0020",
                    name: "Leave History",
                    icon: "file-excel",
                    type: "content"
                },
                {
                    key: "0021",
                    name: "Late/OT/UT History",
                    icon: "file-delimited",
                    type: "content"
                },
                {
                    key: "0022",
                    name: "Benefits",
                    icon: "file-send",
                    type: "content"
                },

            ]
        }
    }

    static navigationOptions = {
        header : 
            <Header1 title= 'MY EMPLOYEES'/>
    }

    render(){
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
                    
                    <LinearGradient 
                        colors={['#818489', '#3f4144', '#202626']}
                        style={styles.contTitle}>

                        <View style={styles.contIconProfile}>
                            <Icon name='account' size={70} color='#EEB843'/>
                        </View>

                        <View style={styles.contInfoProfile}>
                            <Text style={styles.txtProfileTitle}>
                                Asin, Jose Protacio
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                Binhi-Medfi
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                Auditor
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                Yacapin Branch
                            </Text>
                        </View>

                    </LinearGradient>

                    <View style={styles.optionsCont}>
                        <FlatList
                            /* getItemLayout={this._getItemLayout} */
                            ListHeaderComponent={oListHeader}
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.state._list}
                            renderItem={({item}) => 
                                <TouchableNativeFeedback 
                                    onPress={() => {/* this._setActiveChild(item) */}}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View>
                                        {
                                            item.type.toUpperCase() == 'CONTENT' ?
                                                <View style={[styles.btnCont]}>
                                                    <View style={styles.iconCont}>
                                                        <View style={styles.iconPlaceholder}>
                                                            <Icon name={item.icon} size={16} color='#404242'/>
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
                            }
                        />
                    </View>
                </LinearGradient>
                    
                <View style={styles.rightCont}>
                    <BasicInfo/>
                </View>
            </View>
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)