import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch,
    TouchableNativeFeedback,
    TouchableOpacity,
    Picker
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

//styles
import styles from './styles'

//Custom Components
import CustomCard from '../../../components/CustomCards';
import FormBreakTime from '../Forms/formBreakTime';
import MessageBox from '../../../components/MessageBox';
import * as PromptScreen from '../../../components/ScreenLoadStatus';
import SavePrompt from '../../../components/SavePrompt';

//redux
import * as taxSelector from '../data/tax/selector';

const title_Tax = 'Withholding Tax';
const description_Tax = 'Enable Withholding Tax Calculation';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';

export default class Tax extends Component{
    constructor(props){
        super(props);
        this.state = {
            _status: ['2', 'Loading...'],
            _taxData: {
                flagno:1,
                message:"Record found",
                enabled: true,
                frequency:{
                    data:{
                        label:"Frequency",
                        value:{id:1, label:'Monthly'},
                        options:[
                            {id:'1', label:"Monthly"},
                            {id:'2', label:"Every Pay Day"}
                        ]
                    }
                },
                companytin:{
                    data:{
                        label:"Company",
                        value:"12345"
                    }
                }
            },
            _isRuleEnabled: true
        }
    }

    componentDidMount(){
        if(this.props.status[0]==1){
            this._initValues(this.props.status);
        }

        this.setState({
            _status: [...this.props.status]
        });
    }

        
    componentWillReceiveProps(nextProps) {
        if(this.state._status[0] != nextProps.status[0]){
            if(nextProps.status[0]==1){
                this._initValues(nextProps.status);
            }

            this.setState({
                _status: nextProps.status
            })
        }
    }

    _initValues = (status) => {
        this.setState({
            _status: status,
            /* _taxData: JSON.parse(JSON.stringify(taxSelector.getAllTaxData())) */
        })
    }

    _setFrequencyType = (id, label) => {
        let oData = {...this.state._taxData};
        oData.frequency.data.value.id = id;
        oData.frequency.data.value.label = label;
        this.setState({
            _taxData: oData
        })
    }

    render(){
        let pStatus = [...this.state._status];
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];
        if(pProgress==0){
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state._refreshing}
                            onRefresh={() => this.props.triggerRefresh(true)}
                        />
                    }
                >
                    <PromptScreen.PromptError title={pMessage}/>
                </ScrollView>
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
                    <ScrollView>
                        <CustomCard 
                            title={title_Tax} 
                            description={description_Tax} 
                            oType='Switch'
                            rightHeader={
                                <Switch
                                    onValueChange={ (value) => this.setState({_isRuleEnabled: value})} 
                                    onTintColor={color_SwitchOn}
                                    thumbTintColor={color_SwitchThumb}
                                    tintColor={color_SwitchOff}
                                    value={ this.state._isRuleEnabled } 
                                />
                            }
                        >

                        {
                            this.state._isRuleEnabled ? 
                                <View style={{flexDirection: 'column'}}>
                                    <View style={{height: 20}}>
                                    </View>
                                    <View style={styles.payrollChildProp}>
                                        <View style={[styles.titleCont, {minWidth: 180}]}>
                                            <Text style={styles.txtDefault}>Deduction Frequency </Text>
                                        </View>
                                        <View style={styles.propCont}>
                                            <Picker
                                                mode='dropdown'
                                                selectedValue={this.state._taxData.frequency.data.value.label}
                                                onValueChange={(itemValue, itemIndex) => {this._setFrequencyType(itemIndex, itemValue)}}>
                                                {
                                                    this.state._taxData.frequency.data.options.map((taxType, index) => (
                                                        <Picker.Item key={index} label={taxType.label} value={taxType.id} />
                                                    ))
                                                }
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{height: 40}}>
                                    </View>
                                    <View style={styles.payrollChildProp}>
                                        <View style={[styles.titleCont, {minWidth: 180,alignItems: 'flex-end', paddingRight: 40}]}>
                                            <Text style={styles.txtDefault}>TIN ID </Text>
                                        </View>
                                        <View style={styles.propCont}>
                                            <Text style={[styles.txtDefault,{paddingLeft: 15} ]}>{this.state._taxData.companytin.data.value}</Text>
                                        </View>
                                    </View>
                                </View>
                                : null
                        }

                        </CustomCard>
                    </ScrollView>
                </View>
            );
        }
    }
}