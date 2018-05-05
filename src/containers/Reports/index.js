import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';

import styles from './styles';

export default class Reports extends Component {
    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'REPORTS'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    render(){
        return(
            <View style={styles.container}>
                <LinearGradient 
                    colors={['#818489', '#3f4144', '#202626']}
                    style={styles.leftCont}>
                    
                    <View style={styles.contTitle}>

                        <View style={styles.contIconProfile}>
                            {/* <View style={{width: 65, height: 65, backgroundColor: 'red', borderWidth: 1, borderColor: '#EEB843', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}> */}
                                <Icon name='account-circle' size={67} color='#fff'/>
                            {/* </View> */}
                        </View>

                        <View style={styles.contInfoProfile}>
                            <Text style={styles.txtProfileTitle}>
                                {
                                    oProfile.personalinfo.basicinfo.lastname + ', ' +
                                    oProfile.personalinfo.basicinfo.firstname 
                                }
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                {this.props.activecompany.name}
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                Auditor
                            </Text>
                            <Text style={styles.txtProfileLabel}>
                                Yacapin Branch
                            </Text>
                        </View>

                    </View>

                    <View style={styles.optionsCont}>
                        <FlatList
                            /* getItemLayout={this._getItemLayout} */
                            ListHeaderComonent={oListHeader}
                            ref={(ref) => { this.flatListRef = ref; }}
                            data={this.state._list}
                            renderItem={({item}) => 
                                <ProfileMenu
                                    activeItem={this.state._activeItem}
                                    item={item} 
                                    itemPressed={(pressedItem) => this._setActiveChild(pressedItem)}/>
                            }
                        />
                    </View>
                </LinearGradient>
                    
                <View style={styles.rightCont}>
                    {
                        this.state._activeItem.oComponent
                    }
                </View>
            </View>
        );
    }
}