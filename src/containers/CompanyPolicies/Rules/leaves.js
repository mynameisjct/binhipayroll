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
import FormLeaves from '../Forms/formLeaves';
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
" the system will allow the employer to add Leave Types from which" +
" the employer can assign to its employees, individually."

const monthNames = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

class LeaveType extends Component{
    _requestToShowForm = (value) => {
        let objVal;

        if(!value){
            objVal = {
                id: '',
                name: '',
                paiddays: ''
            }
        }
        else{
            objVal = {...value}
        }
        console.log('objVal: ' + JSON.stringify(objVal));
        this.props.showForm(objVal)
    }

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
                                        this._requestToShowForm(oLeave)
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
                                                        onPress={() => {this.props.deleteItem(oLeave)}}
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
                                            onPress={() => {this._requestToShowForm(null)}}
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
    _getDays(month) {
        try{
            let iDays = new Date(2018, month, 0).getDate();
            console.log('iDays: ' + iDays);
            let days = [];

            for (let index = 1; index <= iDays; index++) { 
                days.push(''+index);
            }
            return days;
        }
        catch(exception){
            console.log('exception: ' + exception);
            return [];
        }
        
    }

    render(){
        let iExpiryMonth = this.props.data.expirydate.month - 1;
        let iExpiryDay = this.props.data.expirydate.day - 1;
        let aDays = this._getDays(this.props.data.expirydate.month);
        console.log('this.props.data.expirydate.day: ' + this.props.data.expirydate.day);
        console.log('iExpiryDay: ' + iExpiryDay);
        console.log('aDays: ' + aDays);
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

                            <LeaveType 
                                data={this.props.data} 
                                disabledMode={this.props.disabledMode}
                                showForm={(value) => this.props.showForm(value)}
                                deleteItem={(value) => this.props.deleteItem(value)}/>
                                    
                            <PropTitle name='Leave Expiration'/>
                            
                            <PropLevel2 
                                name='Select Month'
                                content={
                                    <Picker
                                        prompt='Select Month'
                                        mode='dialog'
                                        style={styles.pickerStyle}
                                        selectedValue={iExpiryMonth}
                                        onValueChange={(itemValue, itemIndex) => {this.props.updateExpiry('month', 1+itemValue)}}>
                                        {
                                            monthNames.map((data, index) => (
                                                <Picker.Item itemStyle={{backgroundColor: 'red'}} key={index} label={data} value={index} />
                                            ))
                                        }
                                    </Picker>
                                }
                                contentStyle={{
                                    width: 140
                                }}

                                placeHolderStyle={{height: 60}}
                            />
                            <PropLevel2 
                                name='Select Day'
                                content={
                                    <Picker
                                        prompt='Select Day'
                                        mode='dialog'
                                        style={styles.pickerStyle}
                                        selectedValue={iExpiryDay}
                                        onValueChange={(itemValue, itemIndex) => {this.props.updateExpiry('day', 1+itemValue)}}>
                                        {
                                            aDays.map((data, index) => (
                                                <Picker.Item itemStyle={{backgroundColor: 'red'}} key={index} label={data} value={index} />
                                            ))
                                        }
                                    </Picker>
                                }
                                contentStyle={{
                                    width: 140
                                }}

                                placeHolderStyle={{height: 60}}
                            />
                            
                            <PropLevel2 
                                name='Unused Leaves Action'
                                content={
                                    <Picker
                                        mode='dropdown'
                                        style={styles.pickerStyle}
                                        selectedValue={this.props.data.expirydate.unusedleaveaction.value}
                                        onValueChange={(itemValue, itemIndex) => {this.props.updateExpiry('unusedleaveaction', itemValue)}}>
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
                            {
                                this.props.data.expirydate.unusedleaveaction.value.toUpperCase() == 'CONVERT TO CASH' ?
                                    <PropLevel2 
                                        name={'Maximum\nConvertibleLeaves'}
                                        content={
                                            <TextInput 
                                                autoCapitalize='none'
                                                keyboardType='numeric'
                                                placeholder=''
                                                style={{paddingLeft: 15, color: '#434646', height: '100%'}}
                                                onChangeText={inputTxt =>  {this.props.updateExpiry('maxconvertible', inputTxt)}}
                                                value={''+this.props.data.expirydate.maxconvertible}
                                                returnKeyType="done"
                                                underlineColorAndroid='transparent'
                                            />
                                        }
                                        hideBorder={this.props.disabledMode}
                                        contentStyle={{
                                            width: 75
                                        }}
                                    />
                                :
                                    null
                            }
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
            _allData: null,
            _activeLeaveType: null,
            _leaveFormTitle: '',
            _bShowForm: false,
            _pendingTransactionType: '',
            _pendingTransactionData: null
        }

        this._triggerSwitch = this._triggerSwitch.bind(this);
        this._onLeaveFormClose = this._onLeaveFormClose.bind(this);
        this._onFormCommit = this._onFormCommit.bind(this);
        this._showLeaveForm = this._showLeaveForm.bind(this);
        this._deleteLeaveTypeRequest = this._deleteLeaveTypeRequest.bind(this);
        this._updateExpiry = this._updateExpiry.bind(this);
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

    _onLeaveFormClose = (value) => {
        this.setState({
            _bShowForm: false
        })
    }

    _onFormCommit = (value) => {
        if(value.id == ''){
            let id = '-1';
            this._pushNewLeaveType(id, value);
            this.setState({
                _msgBoxShow: true,
                _msgBoxType: 'success',
                _resMsg: 'Successfully Saved new Leave Type "' + value.name + '."'
            })
            this._onLeaveFormClose();
        }
        else{
            this._updateLeaveType(value);
        }

        let res = {flagno: '1', message: 'Sample Error'};

        return res;
    }

    _pushNewLeaveType = (id, value) => {
        let oAllData = {...this.state._allData};
        let oDataArray = [...oAllData.data];

        let oActiveType = {...value};
        oActiveType.id = id
        oDataArray.push(oActiveType);

        oAllData.data = oDataArray;

        this.props.actions.leaves.update(oAllData);
        this._initValues();
    }

    _updateLeaveType = (value) => {
        let oAllData = {...this.state._allData}; 
        let objIndex = oAllData.data.findIndex((obj => obj.id == value.id));
        
        oAllData.data[objIndex].name = value.name;
        oAllData.data[objIndex].name = value.paiddays;

        this.props.actions.leaves.update(oAllData);
        this._initValues();
    }

    _deleteLeaveTypeRequest = (value) => {
        this.setState({
            _pendingTransactionType: 'DELETE',
            _pendingTransactionData: value,
            _msgBoxShow: true,
            _msgBoxType: 'warning',
            _resMsg: 'Deleting a Leave Type is an irreversible action.' + 
                ' The system, though,  will not allow to delete a Leave Type that is currently' + 
                ' assigned to any employee. Please continue to delete "' + value.name + '".'
        })
    }

    _deleteLeaveType = (value) => {
        let oAllData = {...this.state._allData}; 
        let objIndex = oAllData.data.findIndex((obj => obj.id == value.id));

        oAllData.data.splice(objIndex, 1);

        this.props.actions.leaves.update(oAllData);
        this.setState({_msgBoxShow: false});
        this._initValues();
    }

    _showLeaveForm = (value) => {
        let strFormTitle = 'ADD NEW LEAVE TYPE';
        if (value.id > 0){
            strFormTitle = 'EDIT LEAVE TYPE';
        }
        this.setState({
            _activeLeaveType: {...value},
            _bShowForm: true,
            _leaveFormTitle: strFormTitle
        })
    }
    
    _continueActionOnWarning = () => {
        if(this.state._pendingTransactionType == 'DELETE'){
           this._deleteLeaveType(this.state._pendingTransactionData);
        }
    }

    _updateExpiry = (strType, value) => {
        console.log('=====_updateExpiry=====')
        console.log('strType: ' + strType);
        console.log('value: ' + value);
        let oAllData = {...this.state._allData}; 
        let bFlagUpdate = true;

        switch(strType.toUpperCase()){
            case 'DAY':
                oAllData.expirydate.day = value;
                break;
            case 'MONTH':
                oAllData.expirydate.month = value;
                break;
            case 'UNUSEDLEAVEACTION':
                oAllData.expirydate.unusedleaveaction.value = value;
                break;
            case 'MAXCONVERTIBLE':
                oAllData.expirydate.maxconvertible = value;
                break;
            default:
                bFlagUpdate = false;
        }
        
        if (bFlagUpdate) {

            this.setState({
                _allData: oAllData
            },
                () => {
                    console.log('this.state._allData: ' + JSON.stringify(this.state._allData))
                }
            );

            this.props.actions.leaves.update(oAllData);
        }
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
                            showForm={this._showLeaveForm}
                            deleteItem={this._deleteLeaveTypeRequest}
                            updateExpiry={this._updateExpiry}
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

                    <FormLeaves
                        data={this.state._activeLeaveType}
                        title={this.state._leaveFormTitle}
                        show={this.state._bShowForm}
                        onFormClose={this._onLeaveFormClose}
                        onDone={this._onFormCommit}/>
                        

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
