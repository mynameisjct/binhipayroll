/**************************************************************
 *  FileName:           index.js
 *  Description:        Custom Cards
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-12-01

 *  Modification History:
        Date              By            Description

**************************************************************/
import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView,
} from 'react-native';

import styles from './styles';

//Available Props:
//1. title

export default class CustomCard extends Component{
    _getTitleBgColor = () => {
        try{
            if(this.props.headerBackground){
                return ({
                    backgroundColor: this.props.headerBackground
                })
            }

            return;
        }
        catch(exception){
            return;
        }
    }

    _getMarginConfig = () => {
        try{
            if(this.props.clearMargin){
                return ({
                    margin: 0,
                    marginBottom: 30
                })
            }
            return;
        }
        catch(exception){
            return;
        }
    }
    
    render(){
        let oTitle = null;
        if(this.props.oType.toUpperCase()=='SWITCH'){
            oTitle =  
                <View style={styles.textCont}>
                    <View style={{flex: 0.5, flexDirection: 'column'}}>
                        <View style={{flex:0.55, justifyContent: 'flex-end'}}>
                            <Text style={styles.txtTitle}>{this.props.title}</Text>
                        </View>
                        <View style={{flex: 0.45, justifyContent: 'flex-start'}}>
                            <Text style={styles.txtDescription}>{this.props.description}</Text>
                        </View>
                    </View>
                    <View style={{flex:0.5, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 50}}>
                        {this.props.rightHeader}
                    </View>
                </View>
        }
        else if(this.props.oType.toUpperCase()=='PICKER'){
            oTitle =  
                <View style={styles.textCont}>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <Text style={styles.txtTitle}>{this.props.title}</Text>
                    </View>
                    <View style={{flex:0.5, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 25}}>
                        {this.props.rightHeader}
                    </View>
                </View>
        }
        else if(this.props.oType.toUpperCase()=='BUTTON'){
            oTitle =  
                <View style={styles.textCont}>
                    <View style={{flex: 0.5, justifyContent: 'center'}}>
                        <Text style={styles.txtTitle}>{this.props.title}</Text>
                    </View>
                    <View style={{flex:0.5, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 25}}>
                        {this.props.rightHeader}
                    </View>
                </View>
        }
        else{
            oTitle =  
                <View style={styles.textCont}>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={styles.txtTitle}>{this.props.title}</Text>
                    </View>
                </View>
        }

        const oChildContent = 
            <View style={[styles.detailsCont, this._getMarginConfig()]}>
                {this.props.children}
            </View>
            

        return(
            
            <View style={styles.container}>
                <View style={[styles.titleCont, this._getTitleBgColor()]}>
                    {oTitle}
                </View>
                {
                    this.props.isScrollable ? 
                        <View style={styles.contentCont}>
                            <ScrollView>
                                {oChildContent}
                            </ScrollView>
                        </View>
                    :
                        <View style={styles.contentCont}>
                            {oChildContent}
                        </View>
                }
            </View>
        );
    }
}

export class Description extends PureComponent{
    render(){
        return(
            <View style={{paddingTop: 10}}>
                <Text style={styles.txtDescriptionCard}>{this.props.disabled}</Text>
                <Text style={styles.txtDescriptionCard}>{'\n' + this.props.enabled}</Text>
            </View>
        )
    }
}

export class PropTitle extends Component{
    render(){
        return(
            <View style={styles.subContentCont}>
                <View style={styles.childTitleCont}>
                    <Text style={styles.txtPropTitle}>{this.props.name}</Text>
                </View>
            </View>
        )
    }
}

export class PropLevel1 extends Component{
    constructor(props) {
        super(props);

        this.state = {
            nameStyle: this.props.nameStyle || {},
            contentStyle: this.props.contentStyle || {},
            contentType: this.props.contentType || '',
            hideBorder: this.props.hideBorder || false,
            hideBottomBorder: this.props.hideBottomBorder || false,
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.state.hideBorder !== nextProps.hideBorder){
            this.setState({
                hideBorder: nextProps.hideBorder
            })
        }
        if(this.state.hideBottomBorder !== nextProps.hideBottomBorder){
            this.setState({
                hideBottomBorder: nextProps.hideBottomBorder
            })
        }
    }

    _getBorder = () => {
        if (this.state.hideBorder){
            return({
                borderWidth: 0
            })
        }
    }

    _getBottomBorder = () => {
        if (this.state.hideBottomBorder){
            return({
                borderBottomWidth: 0
            })
        }
    }

    render(){
        return(
            <View style={[styles.childCont, styles.customBottomBorder, this._getBottomBorder()]}>
                <View style={[styles.childTitleCont, this.state.nameStyle]}>
                    <Text style={styles.txtPropTitle}>{this.props.name}</Text>
                </View>
                <View style={[styles.propCont, styles.adjustPropLevel1, this.state.contentStyle, this._getBorder()]}>
                    {this.props.content}
                </View>
            </View>
        )
    }
}

export class PropLevel2 extends Component{
    constructor(props) {
        super(props);

        this.state = {
            nameStyle: this.props.nameStyle || {},
            contentStyle: this.props.contentStyle || {},
            placeHolderStyle: this.props.placeHolderStyle || {},
            contentType: this.props.contentType || '',
            hideBorder: this.props.hideBorder || false
        }
    }
    
    componentWillReceiveProps = (nextProps) => {
        if(this.state.hideBorder !== nextProps.hideBorder){
            this.setState({
                hideBorder: nextProps.hideBorder
            })
        }
    }

    _getBorder = () => {
        /* console.log('this.state.hideBorder: ' + this.state.hideBorder); */
        if (this.state.hideBorder){
            return({
                borderWidth: 0
            })
        }
    }

    render(){
        let oContent = 
            <View style={[styles.propContChild, this.state.contentStyle, this._getBorder()]}>
                {this.props.content}
            </View>;

        if(this.state.contentType.toUpperCase() == "TEXT"){
            oContent = (
                <View style={[styles.propContTxt, this.state.contentStyle]}>
                    <Text style={styles.txtDefault}>
                        {this.props.content}
                    </Text>
                </View>
            )
        }
        
        return(
            <View style={[styles.payrollChildProp, this.state.placeHolderStyle]}>
                <View style={[styles.childTitleCont, this.state.nameStyle]}>
                    <Text style={styles.txtDefault}>{this.props.name}</Text>
                </View>
                {oContent}
            </View>
        )
    }
}

export class FormCard extends PureComponent{
    render(){
        return(
            <View style={styles.contFormCard}>
                <View style={styles.contFormCardError}>

                    <Text style={styles.txtFormCardError}>
                        {this.props.errorMessage || ''}
                    </Text>

                </View>
                <View style={styles.contFormCardContent}>
                    {this.props.children}
                </View>
                <View style={styles.contFormCardFooter}>
                    <Button
                        onPress={() => this.props.onSubmit()}
                        title={this.props.btnLabel}
                        color="#841584"
                        accessibilityLabel={this.props.btnLabel}
                    />
                </View>
            </View>
        )
    }
}