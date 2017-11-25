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

            _msgBoxType: 'SUCCESS',
            _msgBoxShow: false,
            _resMsg: 'Successfully created new branch, BINHI-MeDFI'
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
            this.props.dispatchDataActionTrigger({saveTrigger: false});
            this._saveDataToDB();
        }
    }

    closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false,
        })
    }

    _saveDataToDB = () => {
        console.log('this.state._branchName: ' + this.state._branchName);
/*         console.log('this.state._branchName: ' + this.state._branchName);
        console.log('this.state._address: ' + this.state._address);
        console.log('this.state._contact: ' + this.state._contact);
        console.log('this.state._emailAddress: ' + this.state._emailAddress);

        let activecompany = Object.assign({}, this.props.activecompany);
        let logininfo = Object.assign({}, this.props.logininfo)
        let _data = [
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
        let _objdata = [{
            oid: '',
            data: _data
        }]

        fetch(apiConfig.url + endPoints.newBranch,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                companyname: activecompany.name,
                infotype: 'branch',
                transtype: 'insert',
                username: logininfo.username,
                compid: activecompany.id,
                objdata: _objdata
            })
            
        }).then((response)=> response.json())
            .then((res)=>{
                console.log('ADD BRANCH: ' + JSON.stringify({res}));
                this.setState({
                    _resSuccess: res.flagno,
                    _resMsg: res.message,
                });
                
            }).catch((error)=> {
                alert(error);
        }); */
        this.setState({
            _msgBoxShow: true
        })
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
                });
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
                console.log('this.state._contact: ' + this.state._contact)
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
            });
        }
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
                                    this.setState({_branchName: inputTxt});
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
                                    this.setState({_address: inputTxt});
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
                                    this.setState({_emailAddress: inputTxt});
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