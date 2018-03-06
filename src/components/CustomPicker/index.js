import React, { Component, PureComponent } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity, 
  ScrollView
} from 'react-native';

//Styles
import styles from './styles';

export default class CustomPicker extends PureComponent{
    render(){
        let aList = this.props.list || [];
        return(
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.props.visible || false}
                onRequestClose={() => {}}>
                
                <TouchableOpacity 
                    activeOpacity={1}
                    style={styles.mainContainer}
                    onPress={() => this.props.onClose()}>
                    <TouchableOpacity 
                        activeOpacity={1}
                        style={styles.modalRules.container}
                        onPress={() => {}}>
                        <View style={styles.modalRules.titleCont}>
                            <Text style={styles.modalRules.txtHeader}>
                                {this.props.title || ''}

                            </Text>
                        </View>
                        {
                            aList.length > 0 ?
                                <View>
                                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                                        {
                                            aList.map((data, index) => 
                                                <View key={index} style={styles.modalRules.contentCont}>
                                                    <TouchableOpacity 
                                                        style={styles.modalRules.contOption}
                                                        onPress={() => this.props.onSelect()}>
                                                        <Text style={styles.modalRules.txtBtn}>
                                                            {data.label}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }
                                        
                                    </ScrollView>
                                </View>
                            :
                                <View style={styles.modalRules.emptyList}>
                                    <Text>{this.props.emptyprompt}</Text>
                                </View>
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            
        )
    }
}