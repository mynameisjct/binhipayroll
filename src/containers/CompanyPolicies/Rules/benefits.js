import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    TimePickerAndroid,
    ScrollView,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    TouchableNativeFeedback,
    ToastAndroid,
    FlatList,
    CheckBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles'

//Redux
import { connect } from 'react-redux';
import * as benefitsSelector from '../data/benefits/selector';
import * as benefitsActions from '../data/benefits/actions';
import { bindActionCreators } from 'redux';

//API
import * as benefitsApi from '../data/benefits/api';

//Custom Components
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

//Helper
import * as oHelper from '../../../helper';

//Class Constants
const save_loading_message = 'Saving new Company Benefit. Please wait...';
const gov_switch_loading_message = 'Switching Government Benefits Policy. Please wait...';
const comp_switch_loading_message = 'Switching Company Benefits Policy. Please wait...';
const disableBenefit_loading_message = 'Disabling a Government Benefit. Please wait...';

const delete_loading_message = 'Deleting a Benefit Type. Please wait...';
const expiry_loading_message = 'Updating Leave Expiry Rule. Please wait...';

const title_Gov = 'Government Benefits';
const description_Gov= 'Allow SSS, PAGIBIG, and PhilHealth';
const title_Comp = 'Company Benefits';
const description_Comp= 'Add Company Allowances';
const color_SwitchOn='#838383';
const color_SwitchOff='#505251';
const color_SwitchThumb='#EEB843';

class GovernmentBenefits extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Gereric States
            _refreshing: false,
            _disabledMode: false,
            _status: [2, 'Loading...'],
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Local States
            _allData: null,
            _activeLeaveType: null,
            _leaveFormTitle: '',
            _bShowForm: false,
            _pendingTransactionType: '',
            _pendingTransactionData: null,
            _aDays: []
        }
    }

    _toggleSwitch = (value) => {
        this.props.toggleSwitch('GOVERNMENT', value);
    }

    render(){
        const govCheckbox = (id, value) => (
            <CheckBox
                onValueChange={ (value) => {}} 
                value={value}
            />
        );

        const govName = (value) => (
            <View>
            </View>
        );

        const govId = (value) => (
            <View>
            </View>
        );
        
        return(
            <CustomCard 
                title={title_Gov} 
                description={description_Gov} 
                oType='Switch'
                rightHeader={
                    <Switch
                        onValueChange={ (value) => this._toggleSwitch(value)} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={ this.props.data.enabled } 
                    />
                }
            >

            {
                this.props.data.enabled ?
                    <View>
                        <PropTitle name='Government Benefits Table'/>
                        {/* <View>
                            {govCheckbox()}
                            {govName()}
                            {govId()}
                        </View> */}
                        <View style={styles.benefitsCont}>
                            <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                                <View style={styles.benefitsNameCont}>
                                    <Text style={styles.txtBreakName}>NAME</Text>
                                </View>
                                <View style={styles.benefitsDetailsCont}>
                                    <Text style={styles.txtDefault}>ID</Text>
                                </View>
                                <View style={[styles.benefitsDetailsCont, {width: 50}]}>
                                    <Text style={styles.txtDefault}>ACTIVATE</Text>
                                </View>
                            </View>
                            
                            {
                                this.props.data.data.map((oBenefit, index) => (
                                    <TouchableNativeFeedback
                                        key={index}
                                        onPress={() => {
                                        }}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <View style={styles.breakTimeDetailsCont}>
                                            <View style={styles.benefitsNameCont}>
                                                <Text style={[styles.txtDefault, {paddingLeft: 20}]}>{oBenefit.name}</Text>
                                            </View>
                                            <View style={styles.benefitsDetailsCont}>
                                                <Text style={styles.txtDefault}>{oBenefit.compid}</Text>
                                            </View>
                                            <View style={[styles.benefitsDetailsCont, {width: 50}]}>
                                                {govCheckbox(oBenefit.enabled)}
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                ))
                            }
                        </View>
                    </View>
                :
                    <Description 
                        enabled={this.props.data.description.enabled}
                        disabled={this.props.data.description.disabled}/>
            }

            </CustomCard>
        )
    }
}

class CompanyBenefits extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Gereric States
            _refreshing: false,
            _disabledMode: false,
            _status: [2, 'Loading...'],
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Local States
            _allData: null,
            _activeLeaveType: null,
            _leaveFormTitle: '',
            _bShowForm: false,
            _pendingTransactionType: '',
            _pendingTransactionData: null,
            _aDays: []
        }
    }

    _toggleSwitch = (value) => {
        this.props.toggleSwitch('COMPANY', value);
    }

    render(){
        return(
            <CustomCard 
                title={title_Comp} 
                description={description_Comp} 
                oType='Switch'
                rightHeader={
                    <Switch
                        onValueChange={ (value) => this._toggleSwitch(value)} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={ this.props.data.enabled } 
                    />
                }
            >
                {
                    this.props.data.enabled ?
                        <View>
                            <View style={{marginTop: -20}}>
                                <PropTitle name='Company Benefits Table'/>
                                <View style={styles.leaveCont}>
                                    <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                                        <View style={styles.leaveNameCont}>
                                            <Text style={styles.txtBreakName}>NAME</Text>
                                        </View>
                                        <View style={styles.leaveDetailsCont}>
                                            <Text style={styles.txtDefault}>AMOUNT PER MONTH</Text>
                                        </View>
                                        <View style={styles.leaveDetailsCont}>
                                            <Text style={styles.txtDefault}>SCHEME</Text>
                                        </View>
                                        <View style={styles.leaveDetailsCont}>
                                            <Text style={styles.txtDefault}>REMOVE</Text>
                                        </View>
                                  
                                            
                                    </View>
                                    
                                    {
                                        this.props.data.data.map((oBenefit, index) => (
                                            <TouchableNativeFeedback
                                                key={index}
                                                onPress={() => {
                                                    
                                                }}
                                                background={TouchableNativeFeedback.SelectableBackground()}>
                                                <View style={styles.breakTimeDetailsCont}>
                                                    <View style={styles.leaveNameCont}>
                                                        <Text style={styles.txtBreakName}>{oBenefit.name}</Text>
                                                    </View>
                                                    <View style={styles.leaveDetailsCont}>
                                                        <Text style={styles.txtDefault}>{oBenefit.amountpermonth}</Text>
                                                    </View>
                                                    <View style={styles.leaveDetailsCont}>
                                                        <Text style={styles.txtDefault}>{oBenefit.scheme.value}</Text>
                                                    </View>
                                                    <View style={styles.leaveDetailsCont}>
                                                        <TouchableOpacity
                                                            activeOpacity={0.7}
                                                            onPress={() => {}}
                                                            >
                                                            <Icon size={30} name='md-close-circle' color='#EEB843' />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </TouchableNativeFeedback>
                                        ))
                                    }
                                    

                                </View>
                            </View>
                        </View>
                    :
                        <Description 
                            enabled={this.props.data.description.enabled}
                            disabled={this.props.data.description.disabled}/>
                }

            </CustomCard>
        )
    }
}

export class Benefits extends Component{
    constructor(props){
        super(props);
        this.state = {
            //Gereric States
            _refreshing: false,
            _disabledMode: false,
            _status: [2, 'Loading...'],
            _promptShow: false,
            _promptMsg: '',
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Local States
            _allData: null
        }
    }

    

    componentDidMount(){
        if(this.props.status[0]==1){
            this._initValues();
        }

        this.setState({
            _status: [...this.props.status]
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.status[0]){
            if(nextProps.status[0]==1){
                this._initValues();
            }

            this.setState({
                _status: nextProps.status
            })
        }
    }

    _initValues = () => {
        let oAllData = JSON.parse(JSON.stringify(benefitsSelector.getAllData()));
        console.log('oAllData: ' + oAllData);
        this.setState({
            _allData: oAllData,
        })
    }

    _toggleSwitch = (strType, value) => {
        let oAllData = JSON.parse(JSON.stringify(this.state._allData));
        let bFlag = true;

        switch(strType.toUpperCase()){
            case 'GOVERNMENT':
                oAllData.government.enabled = value
                break;
            case 'COMPANY':
                oAllData.company.enabled = value
                break;
            default:
                bFlag = false;
                break;
        }

        if(bFlag){
            this.setState({
                _allData: oAllData,
            })
        }
    }

    _toggleSwitchToDB = () => {

    }


    render(){
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Benefits Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
            );
        }

        else if(pProgress==2){
            return (
                <View style={styles.container}>
                    <PromptScreen.PromptLoading title={pMessage}/>
                </View>
            );
        }

        else{
            return(
                <View style={styles.container}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={() => this.props.triggerRefresh(true)}
                            />
                        }
                    >
                        <GovernmentBenefits 
                            data={this.state._allData.government}
                            toggleSwitch={this._toggleSwitch}/>

                        <CompanyBenefits 
                            data={this.state._allData.company}
                            toggleSwitch={this._toggleSwitch}/>
                    </ScrollView>
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        benefits: state.companyPoliciesReducer.benefits
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            benefits: bindActionCreators(benefitsActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Benefits)
