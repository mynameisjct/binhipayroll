//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch,
    TouchableNativeFeedback,
    Picker,
    TextInput,
    RefreshControl
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles'

//Custom Components
import FormBreakTime from '../Forms/formBreakTime';
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import SavePrompt from '../../../components/SavePrompt';
import CustomCard, 
{
    PropTitle,
    PropLevel1, 
    PropLevel2
} 
from '../../../components/CustomCards';

//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taxActions from '../data/tax/actions';
import * as taxSelector from '../data/tax/selector';

//Api
import * as taxApi from '../data/tax/api';
import { CONSTANTS } from '../../../constants/index';

const title_Tax = 'Withholding Tax';
const description_Tax = 'Enable Withholding Tax Calculation';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';
const tax_disabled = "Disabled — When Withholding Tax is turned off, the" +
    " system will NOT calculate and will NOT deduct a tax component from every"
    " employee."

const tax_enabled = "Enabled - When Withholding Tax is turned on, the" + 
    " system will calculate and deduct a tax component from every employee based" +
    " on Personal Income Tax Rates."

export class Tax extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: ['2', 'Loading...'],
            _disabledMode: this.props.viewOnly || false ,

            _taxData: {},
            _changeFlag: false,

            //MessageBox
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',

            //Refresh
            _refreshing: false,
        }
    }

    componentDidMount(){
        if(this.props.tax.data){
            this._initValues();
        }
        else{
            this._getDataFromDB();
        }
    }
  
    componentWillReceiveProps(nextProps) {
        if(
            (this.state._status[0] != nextProps.tax.status[0]) &&
            (nextProps.tax.status[0] != 1)
        ){
            console.log('STATUS HAS CHANGED!')
            this.setState({ _status: nextProps.tax.status })
        }

        if(
            (JSON.stringify(this.state._allData) !== JSON.stringify(nextProps.tax.data)) &&
            (nextProps.tax.status[0] == 1)
        ){
            this._initValues();
        }
    }

    _getDataFromDB = () => {
        this.props.actions.tax.get({...this._requiredInputs(), transtype:'get'});
    }

    _requiredInputs = () => {
        return({
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            accesstoken: '',
            clientid: ''
        })
    }

    _initValues = () => {
        this.setState({
            _status: CONSTANTS.STATUS.SUCCESS,
            _taxData: JSON.parse(JSON.stringify(taxSelector.getAllTaxData()))
        })
    }

    _setFrequencyType = (id, index) => {
        let oData = {...this.state._taxData};
        oData.frequency.data.value.id = id;
        oData.frequency.data.value.label = this.state._taxData.frequency.data.options[index].label;
        this.setState({
            _taxData: oData
        },
            () => {
                this._detectChanges();
            }
        )
    }

    _setId = (value) => {
        let oData = {...this.state._taxData};
        oData.companytin.value = value;
        this.setState({
            _taxData: oData
        },
            () => {
                this._detectChanges();
            }
        )
    }

    _setSwitch = (value) => {
        let oData = {...this.state._taxData};
        oData.enabled = value;
        this.setState({
            _taxData: oData
        },
            () => {
                this._detectChanges();
            }
        )
    }

    _undoTaxData = () => {
        this._initValues([1,'']);
        this.setState({_changeFlag: false})
    }

    _updateTaxData = () => {
        this.setState({
            _transPrompt: {show: true, message: 'Saving Tax Policy changes. Please wait...'}
        });

        const oInput = {
            companyid: this.props.activecompany.id,
            username: this.props.logininfo.resUsername,
            transtype: 'update',
            accesstoken: '',
            clientid: '',
            taxdata: this.state._taxData
        };

        taxApi.update(oInput)
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                _transPrompt: {show: false}
            });
            console.log('UPDATE-INPUT: '+ JSON.stringify(oInput))
            console.log('UPDATE-RESPONSE: '+ JSON.stringify(res))
            switch(res.flagno){
                case '0':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'error-ok',
                        _resMsg: res.message
                    })
                    break;
                case '1':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'success',
                        _resMsg: res.message,
                        _changeFlag: false
                    });
                    
                    this.props.actions.tax.update(res);
                    break;
                case '2':
                    this.setState({
                        _msgBoxShow: true,
                        _msgBoxType: 'warning',
                        _resMsg: res.message
                    })
                    break;
                default: 
                    break;
            }
        })

        .catch((exception) => {
            this.setState({
                _transPrompt: false,
                _msgBoxShow: true,
                _msgBoxType: 'error-ok',
                _resMsg: exception.message
            })
        });
    }

    _detectChanges = () => {
        if(JSON.stringify(taxSelector.getAllTaxData()) !== JSON.stringify(this.state._taxData)){
            this.setState({_changeFlag: true})
        }else{
            this.setState({_changeFlag: false})
        }
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        })
    }

    _continueActionOnWarning = () => {
        this._closeMsgBox();
    }

    

    render(){
        console.log('xxxxxxxxxxxxx______REDERING TAX');
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        if(pProgress=='0'){
            return (
                <PromptScreen.PromptError title='Tax Policy' onRefresh={this._getDataFromDB}/>
            );
        }

        else if(pProgress=='1'){
            return(
                <View style={styles.container}>
                    {
                        this.state._changeFlag ?
                            <SavePrompt saveAction={this._updateTaxData} undoAction={this._undoTaxData}/>
                        : null
                    }
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state._refreshing}
                                onRefresh={this._getDataFromDB}
                            />
                        }
                    >
                        <CustomCard 
                            title={this.props.title || title_Tax} 
                            description={description_Tax} 
                            oType='Switch'
                            rightHeader={
                                this.state._disabledMode ?
                                    <Text style={styles.txtSwitchViewOnly}>
                                        {this.state._taxData.enabled ? 'ON' : 'OFF'}
                                    </Text>
                                :
                                    <Switch
                                        onValueChange={ (value) => this._setSwitch(value)} 
                                        onTintColor={color_SwitchOn}
                                        thumbTintColor={color_SwitchThumb}
                                        tintColor={color_SwitchOff}
                                        value={ this.state._taxData.enabled } 
                                    />
                            }
                        >

                        {
                            this.state._taxData.enabled ? 
                                <View style={{paddingTop: 10}}>
                                    <PropLevel2 
                                        name='Deduction Frequency'
                                        contentType={this.state._disabledMode ? 'TEXT' : null}
                                        content={
                                            this.state._disabledMode ? 
                                                this.state._taxData.frequency.data.value.label
                                            :
                                                <Picker
                                                    mode='dropdown'
                                                    style={styles.pickerStyle}
                                                    selectedValue={this.state._taxData.frequency.data.value.id}
                                                    onValueChange={(itemValue, itemIndex) => {this._setFrequencyType(itemValue, itemIndex)}}>
                                                    {
                                                        this.state._taxData.frequency.data.options.map((taxType, index) => (
                                                            <Picker.Item key={index} label={taxType.label} value={taxType.id} />
                                                        ))
                                                    }
                                                </Picker>
                                        }
                                        hideBorder={this.state._disabledMode}
                                        contentStyle={{width: 170}}
                                    />
                                    <View style={{height: 25}}>
                                    </View>
                                    <PropLevel2 
                                        name='Company TIN'
                                        contentType={this.state._disabledMode ? 'TEXT' : null}
                                        content={
                                            this.state._disabledMode ? 
                                                this.state._taxData.companytin.value
                                            :
                                                <TextInput 
                                                    placeholder='Input Company ID'
                                                    style={{paddingLeft: 10, height: '100%'}}
                                                    onChangeText={_curID => {this._setId(_curID)}}
                                                    value={this.state._taxData.companytin.value}
                                                    returnKeyType="done"
                                                    underlineColorAndroid='transparent'
                                                />
                                        }
                                        hideBorder={this.state._disabledMode}
                                        contentStyle={{width: 170}}
                                    />
                                </View>
                            : 
                            <View style={{paddingTop: 10}}>
                                <Text>{tax_disabled}</Text>
                                <Text>{'\n' + tax_enabled}</Text>
                            </View>
                        }

                        </CustomCard>
                    </ScrollView>
                    <MessageBox
                        promptType={this.state._msgBoxType}
                        show={this.state._msgBoxShow}
                        onClose={this._closeMsgBox}
                        onWarningContinue={this._continueActionOnWarning}
                        message={this.state._resMsg}
                    />
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

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        tax: state.companyPoliciesReducer.tax
        
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            tax: bindActionCreators(taxActions, dispatch),
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tax)