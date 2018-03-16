import React, { Component, PureComponent } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableNativeFeedback, 
  ScrollView,
  TouchableOpacity
} from 'react-native';

//Styles
import styles from './styles';

export default class CustomPicker extends PureComponent{
    render(){
        const aList = this.props.list || [];
        const oOptions = (
            aList.map((data, index) => 
                <View key={index} style={styles.modalRules.contentCont}>
                    <TouchableNativeFeedback
                        onPress={() => this.props.onSelect(data.id)}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.modalRules.contOption}>
                            <Text style={styles.modalRules.txtBtn}>
                                {data.label}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    {
                        index === aList.length - 1 ? 
                            null
                        :
                             <View style={styles.modalRules.divider}/>
                    }
                   
                </View>
            )
        )

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
                                <View style={{flex:0}}>
                                    {

                                            <ScrollView contentContainerStyle={{flex: 1}}>
                                                {oOptions}
                                            </ScrollView>
                                    }
                                    
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