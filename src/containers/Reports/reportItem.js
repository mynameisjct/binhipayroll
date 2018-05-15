import React, { Component, PureComponent } from 'react';
import {
    TouchableNativeFeedback,
    View,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles';

export default class ReportItem extends Component{
    shouldComponentUpdate(nextProps, nextState){
        console.log('shouldComponentUpdate_nextProps: ' + JSON.stringify(nextProps));
        console.log('shouldComponentUpdate_nextState: ' + JSON.stringify(nextState));
        if(
            (this.props.activeItem.key === this.props.item.key) ||
            (nextProps.activeItem.key === this.props.item.key)
        ){
            return true;
        }
        else{
            return false;
        }
    }

    render(){
        let item = this.props.item;
        console.log(JSON.stringify(item));
        return(
            <TouchableNativeFeedback 
                onPress={() => this.props.itemPressed(item)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View>
                    {
                        item.type.toUpperCase() == 'CONTENT' ?
                        <View style={[styles.btnCont, this.props.activeItem.key == item.key ? styles.btnContActive : {}]}>
                                <View style={styles.iconCont}>
                                    <View style={styles.iconPlaceholder}>
                                        <Icon name={item.icon} size={16} color='#fff'/>
                                    </View>
                                </View>
                                <View style={styles.labelCont}>
                                    <Text style={styles.txtLabel}>{item.name}</Text>
                                </View>
                            </View>
                        :
                            <View style={styles.titleCont}>
                                <View style={styles.contContentTitle}>
                                    <Text style={styles.txtLabelTitle}>{item.name}</Text>
                                </View>
                            </View>
                    }
                </View>
            </TouchableNativeFeedback>
        )
    }
}