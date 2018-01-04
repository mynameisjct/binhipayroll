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
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles'

//Redux
import { connect } from 'react-redux';
import * as leavesSelector from '../data/leaves/selector';
import * as leavesActions from '../data/leaves/actions';
import { bindActionCreators } from 'redux';

//API
import * as leavesApi from '../data/leaves/api';

//Custom Components
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import CustomCard, 
{
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

//Helper
import * as oHelper from '../../../helper';

//Class Constants
const title_Leaves = 'Leaves';
const description_Leaves = 'Allow Paid Leaves';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';

const leaves_disabled = 'Disabled — when Leaves is turned off,' +
" the system will automatically mark an employee as absent when" +
" the employee has no time-in and time-out record on a working day." +
' Consequently, "No Work, No Pay" policy will be imposed.'

const leaves_enabled = 'Enabled — when Leaves is turned on,' +
" the system will allows the employer to add Leave Types from which" +
" the employer can assign to its employees, individually."

class LeaveType extends Component{
    render(){
        return(
            <View style={styles.containerPlaceholder}>
                <ScrollView horizontal={true}>
                    <View style={styles.leaveCont}>
                        <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                            <View style={styles.leaveNameCont}>
                                <Text style={styles.txtBreakName}>NAME</Text>
                            </View>
                            <View style={styles.leaveDetailsCont}>
                                <Text style={styles.txtDefault}>NUMBER OF PAID DAYS</Text>
                            </View>
                            { 
                                !this.props.disabledMode ?
                                    <View style={styles.leaveDetailsCont}>
                                        <Text style={styles.txtDefault}>DELETE</Text>
                                    </View>
                                :null
                            }
                                
                        </View>
                        
                        {
                            this.props.data.data.map((oLeave, index) => (
                                <TouchableNativeFeedback
                                    key={index}
                                    onPress={() => {
                                        /* this._openUpdateLeaveForm(oLeave) */
                                    }}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.breakTimeDetailsCont}>
                                        <View style={styles.leaveNameCont}>
                                            <Text style={styles.txtBreakName}>{oLeave.name}</Text>
                                        </View>
                                        <View style={styles.leaveDetailsCont}>
                                            <Text style={styles.txtDefault}>{oLeave.paiddays}</Text>
                                        </View>
                                        { 
                                            !this.props.disabledMode ?
                                                <View style={styles.leaveDetailsCont}>
                                                    <TouchableOpacity
                                                        activeOpacity={0.7}
                                                        onPress={() => {}}
                                                        >
                                                        <Icon size={30} name='md-close-circle' color='#EEB843' />
                                                    </TouchableOpacity>
                                                </View>
                                            : null
                                        }
                                    </View>
                                </TouchableNativeFeedback>
                            ))
                        }
                        { 
                            !this.props.disabledMode ?
                                <View style={styles.breakTimeDetailsCont}>
                                    <View style={styles.breakNameCont}>
                                        <TouchableOpacity
                                            style={{paddingLeft: 30, paddingTop: 10}}
                                            activeOpacity={0.7}
                                            onPress={() => {/* this._openUpdateLeaveForm(JSON.parse(JSON.stringify(this.state._defaultLeave))) */}}
                                            >
                                            <Icon size={30} name='md-add' color='#EEB843' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            :
                            null
                        }

                    </View>
                </ScrollView>
            </View>
        )
    }
}

class LeavesForm extends Component {
    render(){
        return(
            <CustomCard
                title={title_Leaves} 
                description={description_Leaves} 
                oType='Switch'
                rightHeader={
                    <Switch
                        onValueChange={ (value) => {this.props.triggerSwitch(value)}} 
                        onTintColor={color_SwitchOn}
                        thumbTintColor={color_SwitchThumb}
                        tintColor={color_SwitchOff}
                        value={this.props.data.enabled} 
                    />
                }
            >
                {   
                    this.props.data.enabled ?
                        <View>
                            <View style={{marginTop: -20}}>
                                <PropTitle name='Leave Types'/>
                            </View>

                            <LeaveType data={this.props.data} disabledMode={this.props.disabledMode}/>
                                    
                            <PropTitle name='Leave Expiration'/>
                            <PropLevel2 
                                name='Select Month and Day'
                                content={
                                    <Text 
                                        style={{color: '#434646', 
                                            height: '100%', 
                                            textAlignVertical: 'center',
                                            width: 190,
                                            paddingLeft: 15,
                                            paddingRight: 15
                                        }}>
                                        December 31
                                    </Text>
                                }
                                contentStyle={{
                                    width: 190
                                }}
                            />
                            <PropLevel2 
                                name='Unused Leaves Action'
                                content={
                                    <Picker
                                        mode='dropdown'
                                        style={styles.pickerStyle}
                                        selectedValue={this.props.data.expirydate.unusedleaveaction.value}
                                        onValueChange={(itemValue, itemIndex) => {this.props.updateThreshhold('minovertime', itemValue)}}>
                                        {
                                            this.props.data.expirydate.unusedleaveaction.options.map((data, index) => (
                                                <Picker.Item key={index} label={data} value={data} />
                                            ))
                                        }
                                    </Picker>
                                }
                                contentStyle={{
                                    width: 190
                                }}

                                placeHolderStyle={{height: 60}}
                            />
                        </View>
                    :
                        <View style={{paddingTop: 10}}>
                            <Text>{leaves_disabled}</Text>
                            <Text>{'\n' + leaves_enabled}</Text>
                        </View>  
                }           
            </CustomCard>
        )
    }
}

export class Leaves extends Component{
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

        this._triggerSwitch = this._triggerSwitch.bind(this);
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
        this.setState({
            _allData: JSON.parse(JSON.stringify(leavesSelector.getAllData())),
        },
            () => {
                console.log('this.state._allData: ' + JSON.stringify(this.state._allData));
            }
        )
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }
    
    _triggerSwitch = (value) => {
        let oData = {...this.state._allData}
        oData.enabled = value;
        this.setState({
            _allData: oData
        })
    }

    render(){
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title='Leave Policy' onRefresh={()=>this.props.triggerRefresh(true)}/>
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
                        <LeavesForm
                            disabledMode={this.state._disabledMode}
                            data={this.state._allData}
                            triggerSwitch={this._triggerSwitch}
/*                             activeRule={this.state._activeRule}
                            updateActiveRule={this._updateActiveRule}
                            cancelEdit={this._cancelEdit}
                            saveRule={this._saveRule}
                            updateRates={this._updateRates}
                            updateThreshhold={this._updateThreshhold}
                            updateRuleName={this._updateRuleName} */
                        />

                    </ScrollView>

                    <MessageBox
                        promptType={this.state._msgBoxType}
                        show={this.state._msgBoxShow}
                        onClose={this._closeMsgBox}
                        onWarningContinue={this._continueActionOnWarning}
                        message={this.state._resMsg}
                    />
                    { this.state._promptShow ?
                        <PromptScreen.PromptGeneric show= {this.state._promptShow} title={this.state._promptMsg}/>
                        : null
                    }
                </View>
            );
        }
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        leaves: state.companyPoliciesReducer.leaves
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            leaves: bindActionCreators(leavesActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaves)
