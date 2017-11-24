import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
    Image,
    TouchableNativeFeedback,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';
import styles from './styles';
import ActionButton from 'react-native-action-button';
import apiConfig, {endPoints} from '../../services/api/config';

//Redux
import { connect } from 'react-redux';
import {
    SetLoginInfo, 
    SetActiveCompany,
    SetRouteHistory,
    SetActiveBranch
} from '../../actions';

export class CompanyProfile extends Component {
    static navigationOptions = {
        header : 
            <Header2
                title= 'COMPANY PROFILE'
            />
    }

    constructor(props){
        super(props);
        this.state = {
            _branches: [],
            _owners: [],
            _companyId: [],
            _mainAddress: '',
            _componentMounted: false,
            _titleMounted: false,
            _branchMounted: false,
            _ownerMounted: false,
            _companyIdMounted: false,
            _activeCompany: '', 
            _resSuccess: '',
            _resMsg: ''
        }
    }

    componentWillMount(){
        console.log('-----component WILL mount');
        this._initCompanyInfo(this.props);
    }

    componentDidMount(){
        console.log('-----component DID mount');
        this._fetchDataFromDB();
    }

    componentWillReceiveProps(nextProps){
        console.log('-----component componentWillReceiveProps');
        let objActiveCompany = Object.assign({}, nextProps.activecompany);
        if (this.state._activeCompany !== objActiveCompany.name){
            this._initCompanyInfo(nextProps, {});
            this._fetchDataFromDB();
        }
    }

    _initCompanyInfo = (oProps) => {
        console.log('-----_initCompanyInfo');
        let objActiveCompany = Object.assign({}, oProps.activecompany);
        this.setState({
            _activeCompany: objActiveCompany.name,
            _componentMounted: false
        })
    }

/*     _fetchDataFromDB = () => {
        let element = 'title';
        console.log('URL: ' + apiConfig.url + endPoints.companyProfile)
            fetch(apiConfig.url + endPoints.companyProfile,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
    
                body: JSON.stringify({
                    companyname: 'JCA Realty',
                    infotype: 'title',
                })
                
            }).then((response)=> response.json())
                .then((res)=>{
                    this.setState({
                        _resSuccess: res.flagno,
                        _resMsg: res.message,
                    });
                }).catch((error)=> {
                    alert(error);
            });
    } */

    _fetchDataFromDB = () => {
        console.log("_fetchDataFromDB: ");
        console.log("this.state._activeCompany: " + this.state._activeCompany);
        /* let element = 'title'; */
        /* let infoType = ['title', 'branch', 'owner', 'companyid']; */
        let infoType = ['owner'];

        infoType.map((element, index) => {
            fetch(apiConfig.url + endPoints.companyProfile,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    companyname: this.state._activeCompany,
                    infotype: element,
                })
                
            }).then((response)=> response.json())
                .then((res)=>{
                    console.log('res: ' + JSON.stringify({res}));
                    this.setState({
                        _resSuccess: res.flagno,
                        _resMsg: res.message,
                    },
                        () => {
                            switch(element){
                                case 'title':
                                    this.setState({
                                        _mainAddress: res.address,
                                        _titleMounted: true,
                                    });
                                    break;

                                case 'branch':
                                    if(res.branch){
                                        this.setState({
                                            _branches: res.branch,
                                            _branchMounted: true,
                                        });
                                    }
                                    
                                    else{
                                        this.setState({
                                            _branches: [],
                                            _branchMounted: true,
                                        });
                                    }
                                    
                                    break;

                                case 'owner':
                                    this.setState({
                                        _owners: res.owner,
                                        _ownerMounted: true,
                                    });
                                    break;

                                case 'companyid':
                                    this.setState({
                                        _owners: res.companyid,
                                        _companyIdMounted: true,
                                    });
                                    break;
                            }
                        }
                    );

                }).catch((error)=> {
                    alert(error);
            });
        })
    }

/*     _fetchDataFromDB = () => {
        setTimeout(() => {
            this.setState({
                _branches: [
                    {
                        name: 'Branch1',
                        address: 'Yacapin Street, CDOC',
                        contact: ['857-9000', '09179001137'],
                        email: 'iammonkey@gmail.com'
                    },
    
                    {
                        name: 'Branch2',
                        address: 'Divisoria Street, CDOC',
                        contact: ['231-5000', '09156845320'],
                        email: 'iamgorilla@gmail.com'
                    },
    
                    {
                        name: 'Branch3',
                        address: 'Moon Street, CDOC',
                        contact: ['231-5000', '09156845320'],
                        email: 'iamgorilla@gmail.com'
                    },
    
                    {
                        name: 'Branch4',
                        address: 'Sun Street, CDOC',
                        contact: ['231-5000', '09156845320'],
                        email: 'iamgorilla@gmail.com'
                    }
                    
                ],
    
                _owners: [
                    {
                        name: 'Andres Bonifacio',
                        contact: ['09193658545', '09195684225'],
                        email: 'callmeandressbon@gmail.com'
                    },
    
                    {
                        name: 'Jose Protacio Rizal',
                        contact: ['090562854633'],
                        email: 'iamjoserizal@gmail.com'
                    }
                ],
    
                _companyId: [
                    {
                        name: 'SSS',
                        number: '12345'
                    },
    
                    {
                        name: 'PAGIBIG',
                        number: '6789'
                    },
                    
                    {
                        name: 'PHILHEALTH',
                        number: '101112'
                    },
    
                    {
                        name: 'TIN',
                        number: '131415'
                    },
                ],
    
                _mainAddress: 'Sample Address, Cagayan de Oro City',
                _componentMounted: true
            })
        }, 1000)
    } */

    _setTopBorder = (index) => {
        if (index>0){
            return(
                {
                    backgroundColor: '#D1D4D6',
                    height: 1,
                }
            )
        }

        else{
            return(
                {
                    height: 0,
                }
            )
        }
    }

    _displayAddress = (curEntityType, entity) => {
        if (curEntityType == 'BRANCH' && entity.address){
            return(
                <Text style={styles.txtInfoDetails}>
                    {entity.address}
                </Text>
            )
        }
    }
    
    _displayContact = (curEntityType, entity) => {
        if ((curEntityType == 'BRANCH' || curEntityType == 'OWNER') && entity.contact){
            return(
                entity.contact.map((number, index) =>
                    <Text key={index} style={styles.txtInfoDetails}>
                        {number}
                    </Text>   
                )
            )
        }
    }

    _displayEmail = (curEntityType, entity) => {
        if ((curEntityType == 'BRANCH' || curEntityType == 'OWNER') && entity.email){
            return(
                <Text style={styles.txtInfoDetails}>
                    {entity.email}
                </Text>
            )
        }
    }

    _displayId = (curEntityType, entity) => {
        if (curEntityType == 'COMPANYID' && entity.number){
            return(
                <Text style={styles.txtInfoDetails}>
                    {entity.number}
                </Text>
            )
        }
    }

    _listCards = (curEntityType) => {
        let strEntityType = curEntityType.toUpperCase();
        let oEntity = '';
        let strIcon = '';
        let strTitle = '';
        let strShowFlag = false;

        if (strEntityType == 'BRANCH'){
            oEntity = this.state._branches;
            strIcon = 'md-home',
            strTitle = 'BRANCHES',
            strShowFlag = this.state._branchMounted;
        }
        else if (strEntityType == 'OWNER'){
            oEntity = this.state._owners;
            strIcon = 'md-person',
            strTitle = 'OWNERS'
            strShowFlag = this.state._ownerMounted;
        }
        else if (strEntityType == 'COMPANYID'){
            oEntity = this.state._companyId;
            strIcon = 'ios-card',
            strTitle = 'COMPANY ID',
            strShowFlag = this.state._companyIdMounted;
        }
        else;

        return(
            <View style={styles.branchesCont}>
                <View style={[styles.branchForm, styles.defaultContMargin]}>
                    <View style={styles.cardHeaderCont}>
                        <View style={styles.cardTitle}>
                            <Text style={styles.txtHeader}>
                                {strTitle}
                            </Text>
                        </View>
                    </View>
                    {this._showCardChild(oEntity, strIcon, strEntityType, strShowFlag)}
                    <View style={styles.fixedGap}>
                    </View>
                </View>
            </View>
        )
    }

    _showCardChild = (oEntity, strIcon, strEntityType, strShowFlag) => {
        if(!strShowFlag){
            return(
                <ActivityIndicator
                animating = {!this.state.strShowFlag}
                color = '#EEB843'
                size = "small"
                style = {styles.activityIndicator}/>
            )
        }
        else{
            return(
                oEntity.map((entity, index) => (
                    <TouchableNativeFeedback
                        key={index}
                        onPress={() => {this._navigateToForm(strEntityType, entity)}}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={[styles.branchList]}>
                            <View style={styles.iconCont}>
                                <Icon size={50} name={strIcon} color='#838383' />
                            </View>
                            <View style={[styles.branchInfoCont]}>
                                <View style={[styles.borderGap, this._setTopBorder(index)]}>
                                </View>
                                <View style={styles.branchInfoCard}>
                                    <Text style={styles.txtInfoTitle}>
                                        {entity.name}
                                    </Text>
                                    {this._displayAddress(strEntityType,entity)}
                                    {this._displayContact(strEntityType, entity)}
                                    {this._displayEmail(strEntityType, entity)}
                                    {this._displayId(strEntityType, entity)}
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                ))
            )
        }
    }

    _navigateOnClick = (curActionType) => {
        let strActionType = curActionType.toUpperCase();
        if (strActionType == 'NEW_BRANCH'){
            this.props.dispatchNextHeader({
                name: 'BranchForm',
                title: 'ADD NEW BRANCH',
            });
            this.props.dispatchActiveBranch({
                name: '',
                address: '',
                contact: '',
                email: '',
            })
            this.props.navigation.navigate('BranchForm');
        }
        else{
            alert('Button is pressed. Navigation Address to be identified.');
        }
    }

    _navigateToForm = (curActionType, oInfo) => {
        switch(curActionType){
            case 'BRANCH':
                this.props.dispatchNextHeader({
                    name: 'BranchForm',
                    title: 'MODIFY BRANCH',
                });
                this.props.dispatchActiveBranch({
                    name: oInfo.name,
                    address: oInfo.address,
                    contact: oInfo.contact,
                    email: oInfo.email,
                })
                this.props.navigation.navigate('BranchForm');
                break;

            case 'COMPANYID':
                this.props.dispatchNextHeader({
                    name: 'BranchForm',
                    title: 'MODIFY BRANCH',
                });
                this.props.navigation.navigate('CompanyIdForm', {
                    info: oInfo
                });
                break;
            default:
                alert('UNHANDLED CASE. CHECK CODE');
                break;
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.titleCont}>
                        <View style={styles.imagePlaceholder}>
                            <Image 
                                style={styles.imgLogo}
                                resizeMode='cover'
                                source={require('../../assets/img/storelogo.png')}
                            />
                        </View>

                        <View style={[styles.titleContentCont, styles.defaultContMargin]}>
                            <Text style={styles.txtCompanyName}>{this.state._activeCompany ? this.state._activeCompany.toUpperCase() : this.state._activeCompany}</Text>
                            <Text style={styles.txtCompanyAddress}>{this.state._mainAddress}</Text>
                        </View>
                    </View>
                    
                    {this._listCards('BRANCH')}
                    {this._listCards('OWNER')}
                    {this._listCards('COMPANYID')}

                    <View style={styles.bottomGap}>
                    </View>
                </ScrollView>

                <ActionButton offsetX={40} buttonColor="rgba(1, 111, 0, 0.8)">
                    <ActionButton.Item buttonColor='#EEB843' title="Add New Branch" onPress={() => {this._navigateOnClick('NEW_BRANCH')}}>
                        <Icon name="md-home" color='#fff' size={30} style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                
            </View>
        );
    }

}
        
function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchNextHeader: (routehistory) => {
            dispatch(SetRouteHistory(routehistory))
        },
        dispatchActiveBranch: (activebranch) => {
            dispatch(SetActiveBranch(activebranch))
        }
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CompanyProfile)