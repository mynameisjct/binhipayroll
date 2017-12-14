import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles'
import CustomCard from '../../../components/CustomCards';
import FormBreakTime from '../Forms/formBreakTime';
import MessageBox from '../../../components/MessageBox';

const title_BreakTime = 'Break Time';
const description_BreakTime = 'Allow break time';
const color_SwitchOn='#FFF4DE';
const color_SwitchOff='#838383';
const color_SwitchThumb='#EEB843';

export default class Breaktime extends Component{
    constructor(props){
        super(props);
        this.state = {
            _isBreaktimeEnabled: true,
            _data: [
                {
                    id: '0001',
                    name: 'MORNING BREAK',
                    timestart: '10:00 AM',
                    timeend: '10:15 AM',
                    duration: '0hr 15min',
                },
                {
                    id: '0001',
                    name: 'LUNCH BREAK',
                    timestart: '12:00 PM',
                    timeend: '01:30 PM',
                    duration: '1hr 30min',
                },
                {
                    id: '0001',
                    name: 'AFTERNOON BREAK',
                    timestart: '03:00 PM',
                    timeend: '03:15 PM',
                    duration: '0hr 15min',
                }
            ],
            
            _activeData: {
                id: '',
                name: '',
                timestart: '',
                timeend: ''
            },

            _activeDeleteIndex: '',
             _showForm: false,

            //MessageBox
            _msgBoxShow: false,
            _msgBoxType: '',
            _resMsg: '',
            
        }
        this._onFormClose = this._onFormClose.bind(this);
        this._onWarningContinue = this._onWarningContinue.bind(this);
    }

    _onFormClose = () => {
        this.setState({
            _showForm: false
        })
    }

    _openUpdateForm = (oBreakTime) => {
        let oActiveBreakTime = {...this.state._activeData};
        oActiveBreakTime.id = oBreakTime.id;
        oActiveBreakTime.name = oBreakTime.name;
        oActiveBreakTime.timestart = oBreakTime.timestart;
        oActiveBreakTime.timeend = oBreakTime.timeend;

        this.setState({
            _activeData: oActiveBreakTime,
            _showForm: true
        })
    }

    _openAddForm = () => {
        let oActiveBreakTime = {...this.state._activeData};
        oActiveBreakTime.id = '';
        oActiveBreakTime.name = '';
        oActiveBreakTime.timestart = '00:00 AM';
        oActiveBreakTime.timeend = '00:00 AM';

        this.setState({
            _activeData: oActiveBreakTime,
            _showForm: true
        })
    }

    _deleteBreakTime = (oBreakTime, index) => {
        this.setState({
            _msgBoxShow: true,
            _msgBoxType: 'warning',
            _resMsg: 'This action will permanently delete ' + 
                oBreakTime.name.toUpperCase() + '. Press continue to proceed.',
            _activeDeleteIndex: index
        });
    }
    
    _onWarningContinue = () => {
        let oData = [...this.state._data];
        oData.splice(this.state._activeDeleteIndex,1);

        this.setState({
            _data: oData,
        });

        this._closeMsgBox();
    }

    _closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        });
    }

    render(){
        const breakTimeDetails = 
                <View style={styles.containerPlaceholder}>
                    <ScrollView horizontal={true}>
                        <View style={styles.breakCont}>
                            <View style={[styles.breakTimeDetailsCont, styles.breakHeaderBorder]}>
                                <View style={styles.breakNameCont}>
                                    <Text style={styles.txtBreakName}>NAME</Text>
                                </View>
                                <View style={styles.breakDetailsCont}>
                                    <Text style={styles.txtDefault}>TIME START</Text>
                                </View>
                                <View style={styles.breakDetailsCont}>
                                    <Text style={styles.txtDefault}>TIME END</Text>
                                </View>
                                <View style={styles.breakDetailsCont}>
                                    <Text style={styles.txtDefault}>DURATION</Text>
                                </View>
                                <View style={styles.breakDetailsCont}>
                                    <Text style={styles.txtDefault}>REMOVE</Text>
                                </View>
                            </View>

                            {
                                this.state._data.map((oBreakTime, index) => (
                                    <TouchableNativeFeedback
                                        key={index}
                                        onPress={() => {
                                            this._openUpdateForm(oBreakTime)
                                        }}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <View style={styles.breakTimeDetailsCont}>
                                            <View style={styles.breakNameCont}>
                                                <Text style={styles.txtBreakName}>{oBreakTime.name}</Text>
                                            </View>
                                            <View style={styles.breakDetailsCont}>
                                                <Text style={styles.txtDefault}>{oBreakTime.timestart}</Text>
                                            </View>
                                            <View style={styles.breakDetailsCont}>
                                                <Text style={styles.txtDefault}>{oBreakTime.timeend}</Text>
                                            </View>
                                            <View style={styles.breakDetailsCont}>
                                                <Text style={styles.txtDefault}>{oBreakTime.duration}</Text>
                                            </View>
                                            <View style={styles.breakDetailsCont}>
                                                <TouchableOpacity
                                                    activeOpacity={0.7}
                                                    onPress={() => {this._deleteBreakTime(oBreakTime, index)}}
                                                    >
                                                    <Icon size={30} name='md-close-circle' color='#EEB843' />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>

            const actionButton = 
                <ActionButton buttonColor="rgba(1, 111, 0, 0.8)">
                    <ActionButton.Item buttonColor='#EEB843' title="ADD NEW BREAK TIME" onPress={() => {this._openAddForm()}}>
                        <Icon2 name="timer" color='#fff' size={25} style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
        return(
            <View style={styles.container}>
                <ScrollView>
                    <CustomCard 
                        title={title_BreakTime} 
                        description={description_BreakTime} 
                        oType='Switch'
                        rightHeader={
                            <Switch
                                onValueChange={ (value) => this.setState({_isBreaktimeEnabled: value})} 
                                onTintColor={color_SwitchOn}
                                thumbTintColor={color_SwitchThumb}
                                tintColor={color_SwitchOff}
                                value={ this.state._isBreaktimeEnabled } 
                            />
                        }
                    >
                    {
                        this.state._isBreaktimeEnabled ? breakTimeDetails : null
                    }      
                    </CustomCard>
                </ScrollView>

                {
                        this.state._isBreaktimeEnabled ? actionButton : null
                }
                
                <FormBreakTime 
                    data={this.state._activeData}
                    title={'MODIFY BREAK TIME'}
                    show={this.state._showForm}
                    onFormClose={this._onFormClose}/>

                <MessageBox
                    promptType={this.state._msgBoxType}
                    show={this.state._msgBoxShow}
                    onClose={this._closeMsgBox}
                    onWarningContinue={this._onWarningContinue}
                    message={this.state._resMsg}
                />
                
            </View>
        );
    }
}