/**************************************************************
 *  FileName:           index.js
 *  Description:        Success Prompt Component
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-11

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Easing
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Logo, {AnimatedLogo} from '../BinhiLogo';

const dMinOpacity = 0.2;
const dMaxOpacity = 1;

class FadeInView extends React.Component {
    state = {
      fadeAnim: new Animated.Value(dMaxOpacity),  // Initial value for opacity: 0
    }
  
    _textAnimate = () => {
        if(!this.props.show){
            return;
        }

        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: dMinOpacity,                         
                duration: 3000, 
                delay: 1000,
            }
        ).start(() => {
            Animated.timing(  
                this.state.fadeAnim,            
                {
                toValue: dMaxOpacity,                    
                duration: 3000,          
                }
            ).start(() => {
                this._textAnimate();
                });
        });    
    }
    
    componentDidMount() {
        this._textAnimate();
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                 // Special animatable View
          style={{
            ...this.props.style,
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }



export default class LoadingScreen extends Component{
    render(){
        return(
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.props.show}
                onRequestClose={() => {alert("Modal has been closed.")}}>
            
                <View style={styles.container}>
                    <FadeInView show={this.props.show} style={styles.logoCont}>
                        <Logo/>
                    </FadeInView>
                    <View style={styles.messageCont}>
                        <Text style={styles.txtMsg}> Connecting...</Text>
                        <ActivityIndicator
                        animating = {this.props.show}
                        color = '#EEB843'
                        size = "large"
                        style = {styles.activityIndicator}/>
                    </View>

                </View>
            </Modal>

        );
    }
}