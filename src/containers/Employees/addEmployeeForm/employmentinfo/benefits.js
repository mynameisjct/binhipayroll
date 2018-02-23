import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import styles from './styles';
/* import {Benefits as BenefitsPolicy} from '../../../CompanyPolicies/Rules/benefits'; */

class EmpGovBenefits extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <View style={styles.genericContainer}>
                <View style={styles.benefitsStyles.contTitle}>
                    <Text style={styles.txtFormTitle}>GOVERNMENT BENEFITS</Text>
                </View>
                <View style={styles.benefitsStyles.contContent}>
                    <View style={styles.benefitsStyles.contElement}>
                        <View style={styles.benefitsStyles.contLeftElement}>
                            <Text>hi!</Text>
                        </View>
                        <View style={styles.benefitsStyles.contRightElement}>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class EmpCompBenefits extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View style={styles.genericContainer}>
                <View style={styles.benefitsStyles.contTitle}>
                    <Text style={styles.txtFormTitle}>COMPANY BENEFITS</Text>
                </View>
            </View>
        )
    }
}

export default class Benefits extends Component {
    _triggerRefresh = () => {
        alert('Should have refreshed');
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.benefitsStyles.container}>
                    <View style={styles.benefitsStyles.contLeft}>
                        <EmpGovBenefits/>
                    </View>
                    <View style={styles.benefitsStyles.contRight}>
                        <EmpCompBenefits/>
                    </View>
                </View>
            </View>
        )
    }
}
 