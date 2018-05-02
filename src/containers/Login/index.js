/**************************************************************
 *  FileName:           index.js
 *  Description:        Login Container
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from "moment";

//Styles
import styles from './styles';

//Custom Components
import DigitalClock from '../../components/DigitalClock';
import Logo from '../../components/BinhiLogo';
import MsgBox from '../../components/MessageBox';
import LoadingScreen from '../../components/LoadingScreen';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {SetLoginInfo, SetActiveCompany} from '../../actions';

//Api
import apiConfig from '../../services/api/config';
import * as session from '../../services/session';

//Utils
import * as oHelper from '../../helper';
import _ from 'lodash';

let tmpUsername = "admin";
let tmpUserGroup = "employer";
let tmpPassword = "Admin123";
let tmpFName = "Jovan";
let tmpMName = "Protacio";
let tmpLName = "Oilixua";
let tmpCompany = ["Uniliver", "Ayala", "Nestle"];
let maxAttemps = 5;
let tmpDefaultPassword = '12345';

let _accountLockedDuration = 30;
let script_Login='logins.php';
let script_TimeIn='timein.php';
let script_TimeOut='timeout.php';
let script_ForgotPassword='forgotpassword.php';

export class Login extends Component {
    static navigationOptions = {
        header : null,
    }

    constructor(props){
        super(props);
        this.state = {
            //Date Time for Clock
            _curDate: '',
            _curDateMDY: '',
            _curTime: '',
            _curDay: '',
            
            //Current Date Time for Transaction
            _transDate: '',
            _transTime: '',

            //Login Credentials
            _username: 'jovani',
            _password: '12345',

            //FormButtons
            _errorForm: false,
            _disableBtn: false,
            _btnTextColor: '#fff',
            
            //Response from DB
            _resSuccess: '',
            _resMsg: '',
            _resUserGroup: '',
            _resFName: '',
            _resMName: '',
            _resLName: '',
            _resCompany: '',
            _resBranch: '',
            _resPosition: '',
            _resAccessToken: '',

            _resDefaultCompanyName: '',
            _resDefaultCompanyId: '',

            //forms
            _msgBoxType: '',
            _msgBoxShow: false,
            _transTime: '',
            _iPasswordAttemp: 1,
            _prevUsername: '',
            _accountLockedTimer: '0',
            _showSplash: false
        };

        this.closeMsgBox = this.closeMsgBox.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.msgBoxYesAction = this.msgBoxYesAction.bind(this);
    }

    //Initializations
    componentWillMount()
    {
        this.getCurrentTime();
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
    }

    componentDidMount() {
        this.timer = setInterval(() => { 
            this.getCurrentTime();
            this.accountLockedTimer();
        }, 1000);
    }

    //Get Current Time
    getCurrentTime = () => {
        let _curWeekday = moment().format("dddd").toUpperCase()
        this.setState({
            _curDate: moment().format("LL"),
            _curDateMDY:  moment().format("MM/DD/YYYY"),
            _curTime: moment().add(8,'hours').format("hh:mm:ss A"),
            /* _curTime: moment().format("hh:mm:ss A"), */
            _curDay: this.getDayAbbrev(_curWeekday)
        });
    }

    accountLockedTimer = () => {
        if(this.state._accountLockedTimer > 0){
            this.setState(prevState => ({ _accountLockedTimer: prevState._accountLockedTimer - 1 }));
        }
    }

    //Get Day Abbreviations
    getDayAbbrev = (_strDay) => {
        let _curAbbrev = _strDay=='SUNDAY' ? 'SUN':
        _strDay=='MONDAY' ? 'MON':
        _strDay=='TUESDAY'?'TUE':
        _strDay=='WEDNESDAY'?'WED':
        _strDay=='THURSDAY' ? 'THU':
        _strDay=='FRIDAY'?'FRI':
        _strDay=='SATURDAY'?'SAT':'SUN';
        return _curAbbrev;
    }
    
    //Enabling-Disbling Buttons
    setUsername(_strUsername){
        this.setState({_username: _strUsername});
        this.enableButtons(_strUsername, this.state._password);
    }

    setPassword(_strPassword){
        this.setState({_password: _strPassword});
        this.enableButtons(this.state._username, _strPassword);
    }

    enableButtons(_strUsername,_strPassword){
        let _bFlag = false;
        let _strBtnColor = '#fff';

        if(_strUsername=="" || _strPassword==""){
            _bFlag = true;
            _strBtnColor = 'gray'
        }

        this.setState({
            _disableBtn: _bFlag,
            _btnTextColor: _strBtnColor
        });
    }

    

    transLogin = async(strType) => {
        this.setState({_showSplash: true},
            () => {
                this.setTransTime(
                    () => {
                        this.fetchDataFromDB(strType);
                    }
                )
            }
        );
    }

/*     transLogin(strType){
        this.setTransTime(
            () => {this.tmpFetchDataFromDB(strType);}
        );
    } */

    evaluateTransaction = async(strType, objRes) => {
        if(this.state._resSuccess == 1){
            switch(strType.toUpperCase()){
                case 'LOGIN':
                    //VNX_TEST
                    await session.onRequestSuccess(objRes);
                    await this.props.dispatchStoreValues({
                        navigation: this.props.navigation,
                        resUsername: this.state._username,
                        resSuccess: this.state._resSuccess,
                        resMsg: this.state._resMsg,
                        resUserGroup: this.state._resUserGroup,
                        resFName: this.state._resFName,
                        resMName: this.state._resMName,
                        resLName: this.state._resLName,
                        resCompany: this.state._resCompany,
                        resBranch: this.state._resBranch,
                        resPosition: this.state._resPosition,
                        resAccessToken: this.state._resAccessToken,
                    });      

                    await this.props.dispatchActiveCompany({
                        name: this.state._resDefaultCompanyName,
                        id: this.state._resDefaultCompanyId
                    });

                    /* this.props.navigation.navigate('EmprDashBoard') */
                    /* this.props.navigation.navigate('CompanyPolicies') */
                    this.props.navigation.navigate('Employees');
                    /* this.props.navigation.navigate('Transactions'); */
                    /* this.props.navigation.navigate('AddEmployeeForm') */
                    /* this.props.navigation.navigate('EmploymentInfo') */
                    /* this.props.navigation.navigate('EmployeeWorkShift') */
                    /* this.props.navigation.navigate('EmployeeBenefits') */
                    /* this.props.navigation.navigate('RankBasedRules'); */
                    /* this.props.navigation.navigate('RankBasedRules'); */
                    /* this.props.navigation.navigate('PersonalInfo'); */
                    break;

                case 'TIMEIN':
                    this.setState({
                        _msgBoxType: 'success'
                    },
                        () => this.setState({
                            _msgBoxShow: true
                        })
                    );
                    break;
                case 'TIMEOUT':
                    this.setState({
                        _msgBoxType: 'success'
                    },
                        () => this.setState({
                            _msgBoxShow: true
                        })
                    );
                    break;
            }
        }

        else if(this.state._resSuccess == 2){
            this.setState({
                _msgBoxType: 'error-tryagain'
            },
                () => this.setState({
                    _msgBoxShow: true, 
                })
            );
        }

        else if(this.state._resSuccess == 3){
            this.setState({
                _msgBoxType: 'error-password'
            },
                () => this.setState({
                    _msgBoxShow: true, 
                })
            );
        }

        else if(this.state._resSuccess == 5){
            this.setState({
                _msgBoxType: 'warning'
            },
                () => this.setState({
                    _msgBoxShow: true, 
                })
            );
        }

        else{
            this.setState({
                _msgBoxType: 'error-ok'
            },
                () => this.setState({
                    _msgBoxShow: true, 
                })
            );
        }
    }
    
/*     evaluateSuccessTrans(strType){
        console.log('strType: ' + strType);
        switch (strType.toUpperCase()){
            case 'LOGIN':
                if(this.state._password==tmpDefaultPassword){
                    this.setState({
                        _resMsg: 'Your current password is set as default. You need to change password before you can proceed.',
                        _msgBoxType: 'warning'
                     },
                        () => this.setState({
                            _msgBoxShow: true
                        })
                    );
                }
                
                else{
                    //VNX_TEST
                    this.props.dispatchStoreValues({
                        resUsername: this.state._password,
                        resSuccess: this.state._resSuccess,
                        resMsg: this.state._resMsg,
                        resUserGroup: this.state._resUserGroup,
                        resFName: this.state._resFName,
                        resMName: this.state._resMName,
                        resLName: this.state._resLName,
                        resCompany: this.state._resCompany,
                        resBranch: this.state._resBranch,
                        resPosition: this.state._resPosition,
                        resAccessToken: this.state._resAccessToken,
                    });

                    this.props.navigation.navigate('EmprDashBoard', 
                        {
                            username: this.state._username,
                            password: this.state._password,
                            company: this.state._resCompany,
                            firstname: this.state._resFName,
                            middlename: this.state._resMName,
                            lastname: this.state._resLName
                        });
                    break;
                }
                this.setState({
                    _resMsg: 'Credentials are correct. This should proceed to Dash Board.',
                },
                    () => this.setState({
                        _msgBoxShow: true
                    })
                );
                break;
            case 'TIMEIN':
                this.setState({
                    _resMsg: this.state._resFName + ', ' + 
                                'your time-in today is ' + this.state._transTime + '.',
                 },
                    () => this.setState({
                        _msgBoxShow: true
                    })
                );
                break;
            case 'TIMEOUT':
                this.setState({
                    _resMsg: this.state._resFName + ', ' + 
                                'your time-out today is ' + this.state._transTime + '.',
                },
                    () => this.setState({
                        _msgBoxShow: true
                    })
                );
                break;
        }
    } */

    setTransTime(callback) {
        this.setState({
            _transDate: this.state._curDateMDY,
            _transTime: this.state._curTime
        },
            () => {
                callback();
            },
        );
    }

    passwordErrorFlag(callback){
        if (this.state._prevUsername == this.state._username){
            this.setState(prevState => ({ _iPasswordAttemp: prevState._iPasswordAttemp + 1 }));
        }
        else {
            this.setState({_iPasswordAttemp: 1} );
        }
        callback();
    }
    
    tmpFetchDataFromDB(strType){
        if(this.state._username == tmpUsername){
            if(this.state._password == tmpPassword){
                this.setState({
                    _resFName: tmpFName,
                    _resLName: tmpLName,
                    _msgBoxType: 'success',
                    _resSuccess: 1,
                },
                    () => {
                        this.evaluateSuccessTrans(strType);
                    }
                );
            }
            else {
                this.setState({
                    _prevUsername: this.state._username,
                    _resSuccess: 0,
                },
                    () => {
                        this.passwordErrorFlag(                
                            () => {
                                if(this.state._iPasswordAttemp >= maxAttemps){
                                    this.setState({
                                    _resMsg: 'Your account is temporarily locked due to maximum password attemp. Contact your employer or Binhi-Medfi.',
                                    _msgBoxType: 'error-ok',
                                    },
                                        () => this.setState({
                                            _msgBoxShow: true
                                        })
                                    );
                                }
                                else if(this.state._iPasswordAttemp == maxAttemps-1) {
                                    this.setState({
                                        _resMsg: 'You have only one (1) password attempt left. Your account will be temporarily locked when maximum attemp is reached.',
                                        _msgBoxType: 'warning-password',
                                        },
                                        () => this.setState({
                                            _msgBoxShow: true
                                        })
                                    );
                                }
                                else{
                                    this.setState({
                                        _resMsg: 'The password you’ve entered is incorrect.',
                                        _msgBoxType: 'error-password',
                                    },
                                        () => this.setState({
                                            _msgBoxShow: true
                                        })
                                    );
                                }
                            }
                        );
        
                    }
                );
            }
        }

        else{
            this.setState({
                _resMsg: 'The username you’ve entered doesn’t match any account.',
                _msgBoxType: 'error-ok',
            },
                () => this.setState({
                    _msgBoxShow: true
                })
            );
        }
    }

    fetchDataFromDB = async(strType) => {
        console.log('---------------------------------');
        console.log('START: ' + this.state._curTime);

        let objRes = null;
        let oBody = {
            sysdate: this.state._transDate,
            systime: this.state._transTime,
            username: this.state._username,
            password: this.state._password,
            deviceinfo: await oHelper.getDeviceInfo()
        }

        console.log('INPUT: ' + JSON.stringify(oBody));
        
        if (strType.toUpperCase()=='LOGIN'){
            
            session.authenticate(this.state._username, this.state._password, oBody)
            .then((res)=>{
                objRes = res;
                console.log('END: ' + this.state._curTime);
                console.log('JSON.stringify(res): ' + JSON.stringify(res))
                this.setState({
                    _resSuccess: res.flagno,
                    _resMsg: res.message,
                    _resUserGroup: res.usergroup,
                    _resFName: res.firstname,
                    _resMName: res.middlename,
                    _resLName: res.lastname,
                    _resCompany: res.companyname,
                    _resBranch: res.branch,
                    _resPosition: res.position,
                    _resAccessToken: res.accesstoken,                          
                },
                    () => {
                        if (this.state._resCompany !== undefined){
                            let arrCompany = this.state._resCompany;
                            let counter= 0
                            arrCompany.forEach(function(element) {
                                counter+=1;
                                /* console.log('Company' + counter + ': ' + element.name + ' ' + element.default ) */
                            
                                if(element.default == 1){
                                    this.setState({
                                        _resDefaultCompanyName: element.name,
                                        _resDefaultCompanyId: element.id
                                    })
                                }
                            
                            }, this);
                        }
                    }
                );
            }).then((res)=>{
                this.evaluateTransaction(strType, objRes);
                this.setState({_showSplash: false});

            }).catch((exception)=> {
                session.onRequestFailed(exception);
                console.log('error:' + exception);
                this._showConnectionError(exception);
            });
        }
        
        else{
            let curType = '';
            if(strType.toUpperCase()=='TIMEIN'){
                curType = script_TimeIn;
            }
            else{
                curType = script_TimeOut;
            }

            fetch(apiConfig.url + curType,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    sysdate: this.state._transDate,
                    systime: this.state._transTime,
                    transtype: strType.toLowerCase(),
                    username: this.state._username,
                    password: this.state._password,
                })
                
                
            }).then((response)=> response.json())
                .then((res)=>{
                        objRes = res;
                        /* alert(res); */
                        this.setState({
                            _resSuccess: res["flagno"],
                            _resMsg: res["message"],
                            _resFName: res["firstname"],
                            _resCompany: res["companyname"],                         
                        },
                            () => {
/*                                 console.log('*************************************')
                                console.log('SCRIPT: ' + curType)
                                console.log('INPUTS: ')
                                console.log('date: ' + this.state._transDate)
                                console.log('time: ' + this.state._transTime)
                                console.log('transtype: ' + strType.toLowerCase())
                                console.log('username: ' + this.state._username)
                                console.log('password: ' + this.state._password)
                                console.log('-----------------------------------------')
                                console.log('OUTPUTS: ')
                                console.log('_resSuccess: ' + this.state._resSuccess)
                                console.log('_resMsg: ' + this.state._resMsg)
                                console.log('_resFName: ' + this.state._resFName)
                                console.log('_resCompany: ' + this.state._resCompany) */
                                this.evaluateTransaction(strType, objRes);
                                this.setState({_showSplash: false});
                            }
                        );
                }).catch((error)=> {
                    alert(error);
                    this.setState({_showSplash: false});
            });
        }
    }

    closeMsgBox = () => {
        this.setState({
            _msgBoxShow: false
        });
    }

    forgotPassword = () => {
        this.setState({
            _msgBoxShow: false
        },
            () => {
                this.setState({
                    _resMsg: 'Are you sure you want to reset your password?',
                    _msgBoxType: 'yes-no'
                },
                    () => {
                        this.setState({
                            _msgBoxShow: true
                        });
                    }
                );
            }
        );
    }

    changePassword = () => {
        this.setState({
            _msgBoxShow: false
        });
        this.props.navigation.navigate('ChangePassword', 
        {username: this.state._username,
            password: this.state._password});

    }
    
/*     msgBoxYesAction = () => {
        if(tmpUserGroup=='employer'){
            this.setState({
                _resMsg: 'A reset link was sent to your email. Please check your email.',
                _msgBoxType: 'success'
            });
        }
        else{
            this.setState({
                _resMsg: 'Successfully notified your employer to reset your password.',
                _msgBoxType: 'success'
            });
        }

    } */
    
    msgBoxYesAction = () => {
        this.pushForgotPassword();
        

    }

    evaluateForgotPassword = () => {
        if(this.state._resSuccess==1){
            this.setState({
                _msgBoxType: 'success'
            });
        }
        else{
            this.setState({
                _msgBoxType: 'error-ok'
            });
        }
    }

    pushForgotPassword = () => {
        fetch(apiConfig.url + script_ForgotPassword,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                username: this.state._username,
            })
            
            
        }).then((response)=> response.json())
            .then((res)=>{
                    /* alert(res); */
                    this.setState({
                        _resSuccess: res["flagno"],
                        _resMsg: res["message"],                     
                    },
                        () => {
/*                             console.log('*************************************')
                            console.log('SCRIPT: ' + apiConfig.url + script_ForgotPassword)
                            console.log('INPUTS: ')
                            console.log('username: ' + this.state._username)
                            console.log('-----------------------------------------')
                            console.log('OUTPUTS: ')
                            console.log('_resSuccess: ' + this.state._resSuccess)
                            console.log('_resMsg: ' + this.state._resMsg) */
                            this.evaluateForgotPassword();
                        }
                    );
            }).catch((error)=> {
                alert(error);
        });
    }

    _showConnectionError = (oError) => {
        this.setState({_showSplash: false});
        this.setState({
            _msgBoxShow: true,
            _msgBoxType: 'error-ok',
            _resMsg: oError.message + '.'
        })
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.mainCont}>
                        <View style={[styles.boxCont, styles.boxContTopEdge, styles.headerCont]}>
                            <DigitalClock 
                                time   ={this.state._curTime}
                                date={this.state._curDate}
                                day={this.state._curDay}/>
                        </View>
                        <View style={[styles.boxCont, styles.logoCont]}>
                            <Logo/>
                        </View>

                        <View style={[styles.boxCont, styles.formCont, styles.boxContBottom]}>
                            <View style={styles.boxContField}>
                                <View style={styles.flexIcon}>
                                    <Icon style={styles.iconField} size={30} name='md-person' color='#838383' />
                                </View>
                                <TextInput 
                                    placeholder='Username...'
                                    style={styles.textinputField}
                                    onChangeText={_curUsername => {
                                        this.setUsername(_curUsername);
                                        }
                                    }
                                    value={this.state._username}
                                    ref='_fieldUsername'
                                    onSubmitEditing={(event) => {this.refs._fieldPassword.focus();}}
                                    returnKeyType="next"
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            <View style={styles.boxContField}>
                                <View style={styles.flexIcon}>
                                    <Icon style={styles.iconField} size={30}name='ios-lock' color='#838383' />
                                </View>
                                <TextInput 
                                    placeholder='Password...' 
                                    style={styles.textinputField}
                                    onChangeText={_curPassword => {
                                        this.setPassword(_curPassword);
                                        }
                                    }
                                    value={this.state._password}
                                    ref='_fieldPassword'
                                    onSubmitEditing={(event) => {this.refs._fieldPassword.focus();}}
                                    returnKeyType="done" 
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.btnCont}>
                                <View style={styles.timeCont}>
                                    <View style={[styles.btnTimeCont]}>
                                        <TouchableOpacity 
                                            disabled={this.state._disableBtn}
                                            style={styles.touchableTimeBtn}
                                            activeOpacity={0.6}
                                            onPress={() => this.transLogin('timein')}>
                                            <Image
                                                style={styles.imgCustomBtn} 
                                                source={require('../../assets/img/log-in-button.png')}/>
                                                <Text style={{color: this.state._btnTextColor, position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>TIME IN</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.btnGap]}>
                                    </View>
                                    <View style={[styles.btnTimeCont]}>
                                        <TouchableOpacity 
                                            disabled={this.state._disableBtn}
                                            style={styles.touchableTimeBtn}
                                            activeOpacity={0.6}
                                            onPress={() => this.transLogin('timeout')}>
                                            <Image
                                                style={styles.imgCustomBtn}  
                                                source={require('../../assets/img/log-in-button.png')}/>
                                                <Text style={{color: this.state._btnTextColor, position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>TIME OUT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={[styles.boxContLogin, styles.loginCont]}>
                                    <TouchableOpacity 
                                        disabled={this.state._disableBtn}
                                        style={styles.touchableLoginBtn}
                                        activeOpacity={0.6}
                                        onPress={() => {this.transLogin('login')}}>
                                        <Image 
                                            style={styles.imgCustomBtn} 
                                            source={require('../../assets/img/log-in-button.png')}/>
                                            <Text style={{color: this.state._btnTextColor, position: 'absolute', fontFamily: 'Helvetica-Light', fontSize: 15}}>LOG IN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <MsgBox
                    promptType={this.state._msgBoxType}
                    show={this.state._msgBoxShow}
                    onClose={this.closeMsgBox}
                    onForgotPassword={this.forgotPassword}
                    onWarningContinue={this.changePassword}
                    message={this.state._resMsg}
                    onYes={this.msgBoxYesAction}
                />
                <LoadingScreen show = {this.state._showSplash}/>
            </ScrollView>   
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo
    }
}
  
function mapDispatchToProps (dispatch) {
    
    return {
        dispatchStoreValues: (logininfo) => {
            dispatch(SetLoginInfo(logininfo))
        },
        dispatchActiveCompany: (activecompany) => {
            dispatch(SetActiveCompany(activecompany))
        }
  }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login)
  