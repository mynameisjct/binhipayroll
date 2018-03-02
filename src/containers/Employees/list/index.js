//Packages
import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableNativeFeedback,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from './styles';

//Custom Components
import Header2 from '../../Headers/header2';
import SearchBox from '../../../components/SearchBox';
import ActionButton from '../../../components/ActionButton';
import * as PromptScreen from '../../../components/ScreenLoadStatus';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeListActions from '../data/list/actions';
import * as employeeActions from '../data/activeProfile/actions';
import * as allProfilesActions from '../data/allProfiles/actions';

//Constants
import { CONSTANTS } from '../../../constants/index';
const btnActive = 'rgba(255, 255, 255, 0.3);'
const btnInactive = 'transparent';

export class EmployeeList extends React.PureComponent{
    render(){
        let item = this.props.item;

        return(
            <TouchableNativeFeedback 
                onPress={() => this.props.itemPressed(item)}
                onLongPress={() => {
                    alert('ALERT TEST!')
                }}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={[styles.btnCont, this.props.activeKey == item.key ? {backgroundColor: 'rgba(255, 153, 36, 0.1);'} : {}]}>
                    <View style={styles.iconCont}>
                        <View style={styles.iconPlaceholder}>
                            <Text style={styles.txtFirstLetter}>{item.name.charAt(0)}</Text>
                        </View>
                    </View>
                    <View style={styles.labelCont}>
                        <Text style={styles.txtLabelTitle}>{item.name}</Text>
                        <Text style={styles.txtLabel}>{item.position || 'Not Available'}</Text>
                        <Text style={styles.txtLabel}>{item.branch || 'Not Available'}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

export class List extends Component {
        //List of Children
    constructor(props){
        super(props);
        this.state = {
            _status: CONSTANTS.STATUS.SUCCESS,
            _promptShow: false,
            _promptMsg: '',
            _refreshing: false,
            _activeKey: '',
            _list: []
        }
    }

    componentDidMount = () => {
        this._setActiveChild(this.props.employees.list.data[0]);
    }

    _doNothing = () => {

    }

    componentWillReceiveProps(nextProps){
        if(
            JSON.stringify(nextProps.employees.list.data) !== JSON.stringify(this.props.employees.list.data)
            
        ){
            this._setActiveChild(nextProps.employees.list.data[0]);
            this.setState({
                _list: [...nextProps.employees.list.data]
            })
        }
    }

    _addNewEmployee = () => {
        this._showLoadingPrompt('Loading required forms. Please wait...');
        requestAnimationFrame(() => {
            this._hideLoadingPrompt();
            this.props.actions.employee.clearActiveData();
            this.props.logininfo.navigation.navigate('AddEmployeeForm');
            
        })
    }

    _setActiveChild = async(oItem) => {
        this.setState({ _activeKey: oItem.key });
        let bIndex = false;
        if(this.state._activeKey != oItem.key){
            console.log('oItem: ' + oItem.key);
            await this.props.actions.employee.updateActiveID(oItem.key);
            bIndex = await this._checkIfNewProfile(oItem.key);
            if(bIndex < 0){
                console.log('GETTING FROMSERVER');
                this.props.actions.employee.getAllInfo(oItem.key);
            }
            else{
                console.log('EXISTING. UPDATING FROM VIEW.');
                this.props.actions.employee.updateAllInfo({employee:this.props.employees.allProfiles.data[bIndex]});
            }
        }
    }

    _checkIfNewProfile = async(key) => {
        let newArray = this.props.employees.allProfiles.data.slice();
        iData = newArray.findIndex(obj => obj.id == key);
        if(iData >= 0){
            return iData;
        }
        else{
            return -1;
        }
    }

    _refreshList = () => {
        this.setState({_list: [], _activeKey: ''});
        this.props.actions.allProfiles.clearAll();
        this.props.actions.employeelist.get();
    }

    _hideLoadingPrompt = () => {
        this.setState({
            _promptShow: false
        })
    }

    _showLoadingPrompt = (msg) => {
        this.setState({
            _promptMsg: msg,
            _promptShow: true
        })
    }
    
    render(){
        /* console.log('this.props.employees.allProfiles: ' + JSON.stringify(this.props.employees.allProfiles)); */
        /* console.log('this.props.employees.list.data: ' + JSON.stringify(this.props.employees.list.data)); */
        let pStatus = [...this.state._status]
        let pProgress = pStatus[0];
        let pMessage = pStatus[1];

        if(pProgress==0){
            return (
                <PromptScreen.PromptError title={TITLE} onRefresh={()=>this.props.triggerRefresh(true)}/>
            );
        }

        else if(pProgress==1){
            const navigation = this.props.logininfo.navigation;
            const oListHeader = (
                <View style={styles.contSearch}>
                    <View style={styles.iconFilter}>
                        <Icon name='filter' size={20} color='#fff' />
                    </View>
                    
                    <SearchBox value={''} 
                        onChangeText={this._doNothing} 
                        onSubmit={this._doNothing}/>

                </View>
            )
            return(
                <LinearGradient 
                    colors={['#818489', '#3f4144', '#202626']}
                    style={styles.leftCont}>
                    
                    <LinearGradient 
                        colors={['#818489', '#3f4144', '#202626']}
                        style={styles.contTitle}>

                        
                        <View style={styles.contTitleName}>
                            <Text style={styles.txtTitle}>
                                {this.props.activecompany.name.toUpperCase()}
                            </Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.optionsCont}>
                        <FlatList
                            /* getItemLayout={this._getItemLayout} */
                            initialNumToRender={3}
                            refreshing={this.state._refreshing}
                            onRefresh={() => {this._refreshList()}}
                            ListHeaderComponent={oListHeader}
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.props.employees.list.data}
                            renderItem={({item}) =>
                                <EmployeeList 
                                    activeKey={this.state._activeKey}
                                    item={item} 
                                    itemPressed={(pressedItem) => this._setActiveChild(pressedItem)}/>
                            }
                        />
                        <ActionButton onPress={this._addNewEmployee}/>
                    </View>
                    
                    <PromptScreen.PromptGeneric 
                        show= {this.state._promptShow} 
                        title={this.state._promptMsg}/>

                </LinearGradient>
            )
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
        employees: state.employees
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employeelist: bindActionCreators(employeeListActions, dispatch),
            employee: bindActionCreators(employeeActions, dispatch),
            allProfiles: bindActionCreators(allProfilesActions, dispatch),
        },
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)