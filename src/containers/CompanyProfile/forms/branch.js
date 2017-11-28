import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
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
            _branchName: '',
            _address: '',
            _contact: [''],
            _emailAddress: '',
            _modifiedDataArr: [''],

            _msgBoxType: 'SUCCESS',
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
        this._initFormValues();
    }

    componentWillReceiveProps(nextProps){
        let objNextProps = Object.assign({}, nextProps.dataactiontrigger)
        if(objNextProps.saveTrigger){
            this._saveAndDispatch();
        }
    }
    
    _saveAndDispatch = () => {
        if(this.state._branchName != ''){
            if(!this.state._modifiedDataArr==[""]){
                this._saveDataToDB();
            }
        }
    }

    closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false,
        })
    }

    _generateJSONString = () => {
        var objRoute = Object.assign({}, this.props.routehistory);
        var activecompany = Object.assign({}, this.props.activecompany);
        var logininfo = Object.assign({}, this.props.logininfo)
        var activebranch = Object.assign({}, this.props.activebranch);

        var _data = [];
        if(objRoute.mode.toUpperCase()=='UPDATE'){
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
            oid: activebranch.id,
            data: _data
        }]
        
        return(
            JSON.stringify({
                companyname: activecompany.name,
                infotype: 'branch',
                transtype: objRoute.mode,
                username: logininfo.username,
                compid: activecompany.id,
                objdata: _objdata
            })
        )
    }

    _saveDataToDB = () => {
        console.log("this._generateJSONString(): " + this._generateJSONString());
        var objRoute = Object.assign({}, this.props.routehistory);
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
                        if(this.state._resSuccess == 1){
                            this.setState({
                                _resMsg: 'Successfully created new branch, ' + this.state._branchName,
                                _msgBoxShow: true
                            },
                                () => {
                                    this.props.dispatchDataActionTrigger({saveTrigger: false});
                                }
                            )
                        }
                    }
                );
                
            }).catch((error)=> {
                alert(error);
                this.props.dispatchDataActionTrigger({saveTrigger: false});
        });
    }
    
    _initFormValues = () => {
        let activebranch = Object.assign({}, this.props.activebranch);
        this.setState({
            _branchName: activebranch.name,
            _address: activebranch.address,
            _emailAddress: activebranch.email
        })

        if(activebranch.contact){
            this.setState({
                _contact: activebranch.contact
            })
        }
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
        console.log('=====20171128_TEST');
        var activebranch = Object.assign({}, this.props.activebranch);
        var objRoute = Object.assign({}, this.props.routehistory);
        var _disabledSave = true;
        console.log("BEFORE UPDATE: " + this.state._modifiedDataArr);

        console.log('objRoute.mode : ' + objRoute.mode);
        if (!this._isStringEmpty(this.state._branchName)){
            if(objRoute.mode.toUpperCase() == 'UPDATE'){
                console.log('================================================');
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
                    console.log("_objChanged.length : " + _objChanged.length);
                    _disabledSave = false
                    this.setState({ 
                        _modifiedDataArr: _objChanged
                    },
                        () => {
                            console.log('this.state._modifiedDataArr :' + JSON.stringify(this.state._modifiedDataArr))
                        }
                    );
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
        let objRoute = Object.assign({}, this.props.routehistory);
        
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