import React, { Component, PureComponent } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity 

} from 'react-native';

//Styles
import styles from './styles';

export default class FormModal extends PureComponent{
    render(){
        return(
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.props.visible || false}
                onRequestClose={() => {}}>

                <View style={styles.mainContainer}>
                    <View style={[styles.modalRules.container, this.props.containerStyle]}>
                        <View style={styles.modalRules.titleCont}>
                            <Text style={styles.modalRules.txtHeader}>
                                {this.props.title || ''}
                            </Text>
                        </View>

                        <View style={styles.modalRules.contentCont}>
                            {this.props.children}
                        </View>

                        <View style={styles.modalRules.footerCont}>
                            <TouchableOpacity 
                                style={styles.modalRules.btnContLeft}
                                onPress={() => this.props.onCancel()}>
                                    <Text style={styles.modalRules.txtBtn}>CANCEL</Text>
                            </TouchableOpacity>


                            <TouchableOpacity 
                                style={styles.modalRules.btnContRight}
                                onPress={() => this.props.onOK()}>
                                    <Text style={styles.modalRules.txtBtn}>
                                        OK
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            
        )
    }
}