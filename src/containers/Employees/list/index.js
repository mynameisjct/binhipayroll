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
import * as StatusLoader from '../../../components/ScreenLoadStatus'
import SearchBox from '../../../components/SearchBox';
import ActionButton from '../../../components/ActionButton';
import * as PromptScreen from '../../../components/ScreenLoadStatus';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeListActions from './data/actions';
import * as employeeActions from '../profile/data/actions';

import { employee } from '../profile/data/reducer';

//Constants
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
                <View style={[styles.btnCont, this.props.activeKey == item.key ? {backgroundColor: 'rgba(255, 255, 255, 0.3);'} : {}]}>
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
            _promptShow: false,
            _promptMsg: '',
            _refreshing: false,
            _activeKey: '84',
            _list: []
        }
    }

    componentDidMount = () => {
        this.props.actions.employeelist.get();
    }

    _doNothing = () => {

    }

    componentWillReceiveProps(nextProps){
        if(
            (this.state._list.length === 0) &&
            (nextProps.employeelist.data.length > 0)
        ){
            this.setState({
                _list: [...nextProps.employeelist.data],
                _activeKey: nextProps.employeelist.data[0].key
            })
        }
    }

    _addNewEmployee = () => {
        this._showLoadingPrompt('Loading required forms. Please wait...');
        requestAnimationFrame(() => {
            this._hideLoadingPrompt();
            this.props.logininfo.navigation.navigate('AddEmployeeForm');
            
        })
    }

    _setActiveChild = (oItem) => {
        console.log('oItem: ' + oItem.key);
        this.setState({
            _activeKey: oItem.key
        },
            this.props.actions.employee.getBasicInfo(oItem.key)
        );
        
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
        console.log('this.props.employeelist')
        const oListHeader = (
            <View style={styles.contSearch}>
                <View style={styles.iconFilter}>
                    <Icon name='filter' size={20} color='#fff' />
                </View>
                
                <SearchBox value={'TEST'} 
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
                        onRefresh={() => {
                            this.setState({_list: [], _activeKey: ''});
                            this.props.actions.employeelist.get();
                        }}
                        ListHeaderComponent={oListHeader}
                        ref={(ref) => { this.flatListRef = ref; }}
                        data={this.props.employeelist.data}
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
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        employeelist: state.employeeList
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            employeelist: bindActionCreators(employeeListActions, dispatch),
            employee: bindActionCreators(employeeActions, dispatch),
        },
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)