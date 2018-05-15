import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';

//Redux
import { connect } from 'react-redux';

//Children Components
import Header2 from '../Headers/header2';
import GenericContainer from '../../components/GenericContainer';
import * as PromptScreen from '../../components/ScreenLoadStatus';
import ReportItem from './reportItem';

import PayrollReport from './payrollReport';
import MonetaryAdjustmentReport from './monetaryAdjustmentReport';

//Styles
import styles from './styles';

//Constants
const TITLE = 'REPORTS';
class TempClass extends Component {
    render(){
        return(
            <View style={{flex: 1}}>
                <Text>0001</Text>
            </View>
        );
    }
};

export class Reports extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            loadingScreen: {
                show: false,
                msg: 'test'
            },
            _status: [2, 'Loading...'],
            msgBox: {
                show: false,
                type: '',
                msg: '',
                param: ''
            },
            _activeItem: {
                key: "0016",
                name: "Special Monetary\nAdjustments",
                icon: "information-variant",
                type: "content",
                oComponent: <MonetaryAdjustmentReport/>
            },
            _list: [
                {
                    key: "0001",
                    name: "ATTENDANCE REPORTS",
                    type: "title"
                },
                {
                    key: "0002",
                    name: "Leaves",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0003",
                    name: "Overtime",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0004",
                    name: "Tardiness",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0005",
                    name: "Undertime",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0006",
                    name: "PAYROLL REPORTS",
                    type: "title"
                },
                {
                    key: "0007",
                    name: "Payroll",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <PayrollReport/>
                },
                {
                    key: "0008",
                    name: "Payslip",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0009",
                    name: "Credit Instruction\nSheet",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0010",
                    name: "SSS Contribution",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0011",
                    name: "HDMF Contribution",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0012",
                    name: "PhilHealth Contribution",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0013",
                    name: "TRANSACTIONS REPORTS",
                    type: "title"
                },
                {
                    key: "0014",
                    name: "DTR Modification",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0015",
                    name: "Leave Application",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
                {
                    key: "0016",
                    name: "Special Monetary\nAdjustments",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <MonetaryAdjustmentReport/>
                },
                {
                    key: "0017",
                    name: "AUDIT REPORTS",
                    type: "title"
                },
                {
                    key: "0018",
                    name: "Audit Trail",
                    icon: "information-variant",
                    type: "content",
                    oComponent: <TempClass/>
                },
            ]
        }
    }

    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'REPORTS'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    componentDidMount = () => {
        setTimeout( () => {
            this.setState({ _status: [1, 'Component Mounted.']});
        },100);
    }
    
    _setActiveChild = async(oItem) => {
        if(this.state._activeItem){
            if(this.state._activeItem.key != oItem.key){
                await this._setInitialActiveComponent(oItem)
                requestAnimationFrame(() => {
                    let oActiveItem = {...this.state._activeItem};
                    oActiveItem.key=oItem.key;
                    oActiveItem.name=oItem.name;
                    oActiveItem.icon=oItem.Icon;
                    oActiveItem.type=oItem.type;
                    oActiveItem.oComponent=oItem.oComponent;
                    this.setState({ _activeItem: oActiveItem })
                });
            }
        }
        
    }

    _setInitialActiveComponent = (oItem) => {
        let oInitialItem = {...this.state._activeItem};
        oInitialItem.key=oItem.key;
        oInitialItem.oComponent = <PromptScreen.PromptLoading title={''}/>;
        this.setState({ _activeItem: oInitialItem })
    }

    render(){
        console.log('------------------------------------');
        console.log('_activeItem: ' + JSON.stringify(this.state._activeItem));
        return(
            <GenericContainer
                msgBoxShow = {this.state.msgBox.show}
                msgBoxType = {this.state.msgBox.type}
                msgBoxMsg = {this.state.msgBox.msg}
                msgBoxOnClose = {this._msgBoxOnClose}
                msgBoxOnYes = {this._msgBoxOnYes}
                containerStyle = {styles.container}
                msgBoxParam = {this.state.msgBox.param}
                loadingScreenShow = {this.state.loadingScreen.show}
                loadingScreenMsg = {this.state.loadingScreen.msg}
                status={this.state._status}
                title={TITLE}
                onRefresh={this._fetchDataFromDB}>
                {console.log('ENTERED RETURN BODY')}
                <LinearGradient 
                    colors={['#818489', '#3f4144', '#202626']}
                    style={styles.leftCont}>

                    <LinearGradient 
                        colors={['#818489', '#3f4144', '#202626']}
                        style={styles.contTitle}>

                        <View style={styles.contTitleName}>
                            <Text style={styles.txtTitle}>
                                {this.props.activecompany.name.toUpperCase()}
                            </Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.optionsCont}>
                        <FlatList
                            ref={(ref) => { this.flatListRef = ref; }}
                            extraData={this.state._activeItem}
                            data={this.state._list}
                            renderItem={({item}) => 
                                <ReportItem
                                    activeItem={this.state._activeItem}
                                    item={item} 
                                    itemPressed={this._setActiveChild}/>
                            }
                        />
                    </View>
                </LinearGradient>

                <View style={styles.rightCont}>
                    {
                        this.state._activeItem.oComponent
                    }
                </View>

                
            </GenericContainer>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
    }
}

function mapDispatchToProps (dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reports)