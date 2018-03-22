import React, { Component, PureComponent } from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  ActivityIndicator

} from 'react-native';

//Styles
import styles from './styles';

export default class FormModal extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            _bHasMounted: false
        }
    }
    componentDidMount = () => {
        this.setState({_bHasMounted: true})
    }

    render(){
        console.log('this.state._bHasMounted: ' + this.state._bHasMounted);
        if(this.props.visible || false) {
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
                                {
                                    this.state._bHasMounted ? this.props.children :
                                        <ActivityIndicator size="small" color="#EEB843" />
                                }
                            </View>
    
                            <View style={styles.modalRules.footerCont}>
                                <TouchableOpacity 
                                    style={this.props.viewOnly || false ?  styles.modalRules.btnContSingleBtn : styles.modalRules.btnContLeft}
                                    onPress={() => this.props.onCancel()}>
                                        <Text style={styles.modalRules.txtBtn}>{this.props.cancelLabel || 'CANCEL'}</Text>
                                </TouchableOpacity>
    
                                {
                                    this.props.viewOnly || false?
                                        null
                                    :
                                        <TouchableOpacity 
                                            style={styles.modalRules.btnContRight}
                                            onPress={() => this.props.onOK()}>
                                                <Text style={styles.modalRules.txtBtn}>
                                                    {this.props.submitLabel || 'OK'}
                                                </Text>
                                        </TouchableOpacity>
                                }
                                
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
        else{
            return null;
        } 
    }
}