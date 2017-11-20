import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header2 from '../Headers/header2';
import styles from './styles';

export default class CompanyProfile extends Component {
    static navigationOptions = {
        headerTitle : 
            <Header2
                title= 'COMPANY PROFILE'
            />,
        headerLeft: null,
        headerStyle : 
            {backgroundColor: '#fff'},
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    {/* <Text>This will display Company Profile</Text> */}
                    <View style={styles.titleCont}>
                    </View>

                    <View style={styles.brachesCont}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.txtHeader}>
                                Branches
                            </Text>
                        </View>
                        <View style={styles.branchList}>
                        </View>
                    </View>

                    <View style={styles.ownersCont}>
{/*                         <View style={styles.cardHeader}>
                        </View>
                        <View style={styles.ownersList}>
                        </View> */}
                    </View>

                    <View style={styles.companyIds}>
{/*                         <View style={styles.cardHeader}>
                        </View>
                        <View style={styles.idsList}>
                        </View> */}
                    </View>
                </View>
            </ScrollView>
        );
    }
}