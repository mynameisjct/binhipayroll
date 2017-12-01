import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header3 from '../../Headers/header3';
import styles from '../forms/styles';
import apiConfig, {endPoints} from '../../../services/api/config';
import MsgBox from '../../../components/MessageBox';

//Redux
import { connect } from 'react-redux';
import {
    SetActiveBranch,
    SetDataActionTrigger
} from '../../../actions';


export class BranchForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            _branchId: '',
            _branchName: '',
            _address: '',
            _contact: [''],
            _emailAddress: '',
            _modifiedDataArr: null,
            _transType: '',
            _msgBoxType: '',
            _msgBoxShow: false,
            _resMsg: '',
        }
        this.closeMsgBox = this.closeMsgBox.bind(this);
    }

    //setting header
    static navigationOptions = {
        header:
            <Header3/>
    }

    componentDidMount(){
        console.log('componentDidMount')
        this._initFormValues();
    }

    componentWillUnmount(){
        this._clearData();
    }

    componentWillReceiveProps(nextProps){
        let objNextProps = Object.assign({}, nextProps.dataactiontrigger)
        if(!objNextProps.disabledsave && objNextProps.saveTrigger){
            console.log('CURRENT__this.state._transType: ' + this.state._transType);
            console.log('CURRENT__this.state._modifiedDataArr: ' + this.state._modifiedDataArr);
            console.log('CURRENT__TYPE: ' + typeof(this.state._modifiedDataArr));
            console.log('CURRENT__VALUE: ' + JSON.stringify(this.state._modifiedDataArr));
            console.log('this.state._modifiedDataArr ' + this.state._modifiedDataArr ? true : false);
            if(this.state._transType.toUpperCase() == 'UPDATE'){
                if(!this.state._modifiedDataArr){
                    return;
                }
            }
            this._saveAndDispatch();
        }
    }
    
    _saveAndDispatch = () => {
        if(this.state._branchName != ''){
            this._saveDataToDB();
        }
    }

    closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false,
        })
    }

    _generateJSONString = () => {
        var activecompany = Object.assign({}, this.props.activecompany);
        var logininfo = Object.assign({}, this.props.logininfo)

        var _data = [];
        if(this.state._transType=='UPDATE'){
            _data  = this.state._modifiedDataArr;
        }

        else{
            var _data = [
                {
                    name: 'branchname',
                    value: this.state._branchName
                },
                {
                    name: 'address',
                    value: this.state._address
                },
                {
                    name: 'contact',
                    value: this.state._contact
                },
                {
                    name: 'emailaddress',
                    value: this.state._emailAddress
                },  
            ];
        }

        var _objdata = [{
            oid: this.state._branchId,
            data: _data
        }]
        
        return(
            JSON.stringify({
                companyname: this.state._branchName,
                infotype: 'branch',
                transtype: this.state._transType,
                username: logininfo.username,
                compid: activecompany.id,
                objdata: _objdata
            })
        )
    }

    _saveDataToDB = () => {
        console.log('********this._generateJSONString(): ' + this._generateJSONString())
        console.log('********_modifiedDataArr: ' + JSON.stringify(this.state._modifiedDataArr));
        fetch(apiConfig.url + endPoints.newBranch,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: this._generateJSONString()
            
        }).then((response)=> response.json())
            .then((res)=>{
                console.log('ADD BRANCH: ' + JSON.stringify({res}));
                this.setState({
                    _resSuccess: res.flagno,
                    _resMsg: res.message,
                },
                    () => {
                        let bFlag = true;
                        let strMsgType = '';

                        switch(this.state._resSuccess){
                            case '0':
                                strMsgType = 'ERROR-OK';
                                break;
                            case '1':
                                strMsgType =  'SUCCESS';
                                break;
                            case '2':
                                strMsgType =  'WARNING';
                                break;
                            default:
                                bFlag = false;
                                strMsgType = '';
                        }

                        this.setState({
                            _msgBoxType: strMsgType,
                            _msgBoxShow: bFlag,
                            _modifiedDataArr: null,
                            _transType: 'UPDATE'
                        },
                            () => {
                                this.props.dispatchDataActionTrigger({disabledSave: true});
                                this.props.dispatchActiveBranch({
                                    id: res.id,
                                    name: this.state._branchName,
                                    address: this.state._address,
                                    contact: this.state._contact,
                                    email: this.state._emailAddress
                                });
                            }
                        )
                    }
                );
                
            }).catch((error)=> {
                alert(error);
                this.props.dispatchDataActionTrigger({disabledSave: true});
        });
    }
    
    _initFormValues = () => {
        let activebranch = Object.assign({}, this.props.activebranch);
        var objRoute = Object.assign({}, this.props.routehistory);

        this.setState({
            _branchId: activebranch.id,
            _branchName: activebranch.name,
            _address: activebranch.address,
            _emailAddress: activebranch.email,
            _transType: objRoute.mode,
        })

        if(activebranch.contact){
            this.setState({
                _contact: activebranch.contact
            })
        }
    }

    _keyboardDidShow() {

    }
    
    _keyboardDidHide() {

    }

    _clearData = () => {
        Keyboard.dismiss();
        this.setState({
            _msgBoxShow: false
        })
    }

    _displayContacts = () => {
        return(
            this.state._contact.map((number, index) => 
                <View key={index}>
                    <TextInput
                        style={styles.textinputField}
                        onChangeText={inputTxt => {
                            this._updateContact(inputTxt, index);
                            }
                        }
                        value={this.state._contact[index]}
                        underlineColorAndroid='#D1D4D6'
                        ref='fieldContact'
                        onSubmitEditing={(event) => {this.refs.fieldEmail.focus();}}
                        returnKeyType="next"
                        
                    />
                    {this._displayDeleteContactBtn(index)}
                </View>
            )
        )
    }

    _displayDeleteContactBtn = (index) => {
        if (this.state._contact.length > 1){
            return(
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {this._removeContact(index)}}
                    style={{position: 'absolute', top: 0, right: 0, bottom: 0, marginRight: 10, alignItems: 'center', justifyContent: 'center'}}
                    >
                    <Icon size={25} name='md-close-circle' color='#EEB843' />
                </TouchableOpacity>
            )
        }
    }

    _removeContact = (index) =>{
        const newArray = [...this.state._contact];
        if (newArray.length!==1){
            if (index > -1) {
                newArray.splice(index, 1);
                this.setState({
                    _contact: newArray 
                },
                    () => {
                        this._compareInputsAndTrigger();
                    }
                );
            }
        }
    }

    _updateContact = (text, index) => {
        const newArray = [...this.state._contact];
        newArray[index] = text;
        this.setState({
            _contact: newArray 
        },
            () => {
                this._compareInputsAndTrigger();
            }
        );
    }

    _addNewContact = () => {
        const newArray = [...this.state._contact];
        
        if(newArray[newArray.length-1] == ''){
            //do something
        }else{
            newArray.push('');
            this.setState({
                _contact: newArray 
            },
            () => {
                this._compareInputsAndTrigger();
            });
        }
    }

    _updateBranchName = (strBranchName) => {
        this.setState({
            _branchName: strBranchName
        },
            () => {
                this._compareInputsAndTrigger();
            }
        )
    }

    _compareInputsAndTrigger = () => {
        var activebranch = Object.assign({}, this.props.activebranch);
        var _disabledSave = true;

        if (!this._isStringEmpty(this.state._branchName)){
            if(this.state._transType.toUpperCase() == 'UPDATE'){
                var _objChanged = [];
                let _curContact = this.state._contact;
                let _prevContact = activebranch.contact;

                if(activebranch.name != this.state._branchName){
                    _objChanged.push({
                        name: 'branchname',
                        value: this.state._branchName
                    })
                }
                if(activebranch.address != this.state._address){
                    _objChanged.push({
                        name: 'address',
                        value: this.state._address
                    })
                }
                if((JSON.stringify(_prevContact.sort())) != (JSON.stringify(_curContact.sort()))){
                    _objChanged.push({
                        name: 'contact',
                        value: this.state._contact
                    })
                }

                if(activebranch.email != this.state._emailAddress){
                    _objChanged.push({
                        name: 'emailaddress',
                        value: this.state._emailAddress
                    })
                }
                
                if(_objChanged.length > 0){  
                    _disabledSave = false
                    this.setState({ 
                        _modifiedDataArr: _objChanged
                    });
                }
                
            }
            else{
                _disabledSave = false
            }

        }

        console.log('_disabledSav: ' + _disabledSave);
        this.props.dispatchDataActionTrigger({disabledSave: _disabledSave});
    }
    

    _isStringEmpty = (strToCheck) => {
        if(!strToCheck || !strToCheck.trim().length){
            return true;
        }
        return false;
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.formCont}>
                        <View style={[styles.nameCont, styles.defaultProp]}>
                            <Text style={styles.txtLabel}>BRANCH NAME</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this._updateBranchName(inputTxt);
                                    }
                                }
                                value={this.state._branchName}
                                underlineColorAndroid='#D1D4D6'
                                ref='fieldName'
                                onSubmitEditing={(event) => {this.refs.fieldAddress.focus();}}
                                returnKeyType="next"
                            />
                        </View>
                        <View style={[styles.addressCont, styles.defaultProp]}>
                            <Text style={styles.txtLabel}>ADDRESS</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this.setState({
                                        _address: inputTxt},

                                        () => {
                                            this._compareInputsAndTrigger();
                                        }
                                    );
                                    }
                                }
                                value={this.state._address}
                                underlineColorAndroid='#D1D4D6'
                                ref='fieldAddress'
                                onSubmitEditing={(event) => {this.refs.fieldContact.focus();}}
                                returnKeyType="next"
                            />
                        </View>
                        <View style={[styles.contactCont]}>
                            <Text style={styles.txtLabel}>CONTACT NUMBERS</Text>
                            {this._displayContacts()}
                            <Text onPress={() => {this._addNewContact()}} style={styles.txtBtnLabel}>Add New</Text>
                        </View>
                        <View style={[styles.emailAddressCont, styles.defaultProp]}>
                            <Text style={styles.txtLabel}>EMAIL ADDRESS</Text>
                            <TextInput 
                                style={styles.textinputField}
                                onChangeText={inputTxt => {
                                    this.setState({_emailAddress: inputTxt},
                                        () => {
                                            this._compareInputsAndTrigger();
                                        });
                                    }
                                }
                                value={this.state._emailAddress}
                                underlineColorAndroid='#D1D4D6'
                                ref='fieldEmail'
                                returnKeyType="done"
                            />
                        </View>
                    </View>
                </ScrollView>
                <MsgBox
                    promptType={this.state._msgBoxType}
                    show={this.state._msgBoxShow}
                    onClose={this.closeMsgBox}
                    message={this.state._resMsg}
                />
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        routehistory: state.routeHistoryReducer.routehistory,
        activebranch: state.activeBranchReducer.activebranch,
        dataactiontrigger: state.dataActionTriggerReducer.dataactiontrigger
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchNextHeader: (routehistory) => {
            dispatch(SetRouteHistory(routehistory))
        },
        dispatchActiveBranch: (activebranch) => {
            dispatch(SetActiveBranch(activebranch))
        },
        dispatchDataActionTrigger: (dataactiontrigger) => {
            dispatch(SetDataActionTrigger(dataactiontrigger))
        }
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(BranchForm)