//Packages
import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

//Styles Properties
import styles from './styles';

//Custom Components
import Header2 from '../Headers/header2';
import * as StatusLoader from '../../components/ScreenLoadStatus'

//Helper
import * as oHelper from '../../helper';

export class Employees extends Component {
    constructor(props){
        super(props);
        this.state = {
            _status: 2,
            _activeChild: '',
            _list: []
        }
    }
        
    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'MY EMPLOYEES'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    componentDidMount = () => {
        this._initComponent(this.props);
    }

    componentWillReceiveProps(nextProps){
        let objActiveCompany = {...nextProps.activecompany};
        if (this.props.activecompany.id !== objActiveCompany.id){
            this.setState({
                _status: 2
            },
                () => {
                    this._initComponent(nextProps);
                }
            )
            
        }
    }

    _initComponent = (oProps) => {

    }

    render(){
        if(this.state._status == 0){
            return(<StatusLoader.PromptError title={'Unable to load Company Policies.\n Please Contact BINHI-MeDFI.'}/>)
        }
        else if(this.state._status == 2){
            return(<StatusLoader.PromptLoading title='Loading...'/>)
        }
        else{
            let childComponent = null;

            const headerComponent = (
                <LinearGradient 
                    colors={['#a1a1a3', '#6a6a6d', '#303033']}
                    style={styles.contTitle}>
                    <Text style={styles.txtTitle}>
                        {this.props.activecompany.name.toUpperCase()}
                    </Text>
                </LinearGradient>
            )

            return(
                <View style={styles.container}>
                    <LinearGradient 
                        colors={['#818489', '#3f4144', '#202626']}
                        style={styles.leftCont}>
                        
                        <View style={styles.optionsCont}>
                            <FlatList
                                ListHeaderComponent={headerComponent}
                                data={this.state._list}
                                renderItem={({item}) => 
                                    <TouchableNativeFeedback 
                                        onPress={() => {this._setActiveChild(item)}}
                                        background={TouchableNativeFeedback.SelectableBackground()}>
                                        <View style={[styles.btnCont, {backgroundColor: item.btnColor}]}>
                                            <View style={styles.iconCont}>
                                                <View style={styles.iconPlaceholder}>
                                                    <Icon name={item.iconName} size={20} color='#fff'/>
                                                </View>
                                            </View>
                                            <View style={styles.labelCont}>
                                                <Text style={styles.txtLabel}>{item.name}</Text>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                                }
                                
                            />
                        </View>
                    </LinearGradient>
                        
                    <View style={styles.rightCont}>
                        {childComponent}
                    </View>
                </View>
            );
        }
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employees)