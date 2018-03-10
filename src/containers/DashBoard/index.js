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
import Header1 from '../Headers/header1';
import * as PromptScreen from '../../components/ScreenLoadStatus';

//Helper
import * as oHelper from '../../helper';

//Redux
import { connect } from 'react-redux';
import { CONSTANTS } from '../../constants';

//constants
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';
const TITLE = 'Employee Profile Summary'

export class ProfileMenu extends Component{
    shouldComponentUpdate(nextProps, nextState){
        if(
            (this.props.activeItem.key === this.props.item.key) ||
            (nextProps.activeItem.key === this.props.item.key)
        ){
            /* console.log('this.props.item.name: ' + this.props.item.name); */
            return true;
        }
        else{
            return false;
        }
    }

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

export default class EmprDashBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            _status: CONSTANTS.STATUS.LOADING,
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
                },
                {
                    key: "0003",
                    name: "Address Info",
                    icon: "map-marker",
                    type: "content",
                },
                {
                    key: "0004",
                    name: "Family & Dependents",
                    icon: "account-multiple",
                    type: "content",
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
                },
                {
                    key: "0010",
                    name: "Work Shift",
                    icon: "calendar-clock",
                    type: "content",
                },
                {
                    key: "0011",
                    name: "Payroll Schedule",
                    icon: "credit-card",
                    type: "content",
                },
                {
                    key: "0012",
                    name: "Tardiness Policy",
                    icon: "clock-alert",
                    type: "content",
                },
                {
                    key: "0013",
                    name: "Undertime Policy",
                    icon: "timelapse",
                    type: "content",
                },
                {
                    key: "0014",
                    name: "Overtime Policy",
                    icon: "clock-fast",
                    type: "content",
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
                    name: "13th Month Pay",
                    icon: "account-star",
                    type: "content"
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
                    type: "content"
                },
                {
                    key: "0021",
                    name: "Leave History",
                    icon: "file-excel",
                    type: "content"
                },
                {
                    key: "0022",
                    name: "Late/OT/UT History",
                    icon: "file-delimited",
                    type: "content"
                },
                {
                    key: "0023",
                    name: "Benefits",
                    icon: "file-send",
                    type: "content"
                },
                {
                    key: "0024",
                    name: "Pay Slips",
                    icon: "file-account",
                    type: "content"
                },
            ],
            _activeItem: {
                key: "0002",
                name: "Basic & Contact Info",
                icon: "information-variant",
                type: "content"
            },

        }
    }

    static navigationOptions = {
        header : 
            <Header1 title= 'DASHBOARD'/>
    }

    componentDidMount(){
        this.setState({ _status: CONSTANTS.STATUS.SUCCESS });
    }

    _setActiveChild = async(oItem) => {
        await this._setInitialActiveComponent(oItem)
        requestAnimationFrame(() => {
            let oActiveItem = {...this.state._activeItem};
            oActiveItem.key=oItem.key;
            oActiveItem.name=oItem.name;
            oActiveItem.icon=oItem.Icon;
            oActiveItem.type=oItem.type;
            oActiveItem.oComponent=oItem.oComponent;
            this.setState({ _activeItem: oActiveItem })
        })
    }

    _setInitialActiveComponent = (oItem) => {
        let oInitialItem = {...this.state._activeItem};
        oInitialItem.key=oItem.key;
        oInitialItem.oComponent = <PromptScreen.PromptLoading title={''}/>;
        this.setState({ _activeItem: oInitialItem })
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
        let pStatus = this.state._status;
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title={TITLE} onRefresh={()=>this.props.triggerRefresh(true)}/>
            );
        }
        else if(pProgress==1){
            const oListHeader = (
                <View style={styles.contSearch}>
                    <View style={styles.contSearchBox}>
                        <Text>HELLO!</Text>
                    </View>
                </View>
            )
            
            return(
                <View style={styles.container}>
                    <LinearGradient 
                        colors={['#818489', '#3f4144', '#202626']}
                        style={styles.leftCont}>

                        <View style={styles.optionsCont}>
                            <FlatList
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
        else{
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
            );
        }
    }
}