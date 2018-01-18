import React, { Component } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    TimePickerAndroid,
    ScrollView,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    TouchableNativeFeedback,
    ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ranksActions from './data/actions';

import styles from './styles';
import TabsRoot from './tabs/root';
import CustomCard, 
{
    Description,
    PropTitle,
    PropLevel1, 
    PropLevel2
}
from '../../../components/CustomCards';

const CARD_TITLE = 'Employee Ranks'

export class Ranks extends Component{

    componentDidMount(){
        /* if(!this.props.ranks) { */
            this.props.actions.ranks.get({
                companyid: this.props.activecompany.id,
                username: this.props.logininfo.resUsername,
                transtype: 'get',
                accesstoken: '',
                clientid: '',
            })
            .then(() => {
            })
            .catch((exception) => {
            });
        
    }
    

    shouldComponentUpdate(nextProps) {
        return (JSON.stringify(this.props.ranks) != JSON.stringify(nextProps.ranks))
    }

    render(){
        console.log('this.props.ranks')
        return(
            <View style={styles.container}>
                <View style={styles.contContent}>
                    <View style={styles.contForm}>
                        {this.props.ranks ? 
                            <CustomCard title={CARD_TITLE} oType='Text'>
                                <PropLevel1 
                                    name='Rank Name' 
                                    content={
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={'0001'}
                                            onValueChange={(itemValue, itemIndex) => {this._requestToChangePayType(itemValue)}}>
                                            {
                                                this.props.ranks.data.map((data, index) => (
                                                    <Picker.Item key={index} label={data.name.value} value={data.id} />
                                                ))
                                            }
                                        </Picker>
                                    }
                                />
                            </CustomCard>
                            :
                            null
                        }
                    </View>
                    <View style={styles.contRootTabs}>
                        <TabsRoot/>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        logininfo: state.loginReducer.logininfo,
        activecompany: state.activeCompanyReducer.activecompany,
        ranks: state.companyPoliciesReducer.ranks

    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ranks: bindActionCreators(ranksActions, dispatch),
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ranks)