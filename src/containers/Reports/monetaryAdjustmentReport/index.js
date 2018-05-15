import React, { Component, PureComponent } from 'react';
import {
    View,
    Text
} from 'react-native';

//Children Components
import GenericContainer from '../../../components/GenericContainer';
import ReportContent from '../reportContent';

//Styls
import styles from '../styles';

//Constants
const TITLE = 'SPECIAL DEDUCTIONS AND ALLOWANCES';

export default class MonetaryAdjustmentReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
            loadingScreen: {
                show: false,
                msg: 'test'
            },
            _status: [1, 'Loading...'],
            msgBox: {
                show: false,
                type: '',
                msg: '',
                param: ''
            }
        }
    }

    _fetchDataFromDB = () => {

    }

    render(){
        let item = this.props.item;
        let oBody = null;
        let aFilters = [];

        if(this.state._status[0] == 1){
            oBody = <View><Text>CRAZY!</Text></View>;
            aFilters = [];
        }

        return(
            <GenericContainer
                msgBoxShow = {this.state.msgBox.show}
                msgBoxType = {this.state.msgBox.type}
                msgBoxMsg = {this.state.msgBox.msg}
                msgBoxOnClose = {this._msgBoxOnClose}
                msgBoxOnYes = {this._msgBoxOnYes}
                containerStyle = {styles.container}
                msgBoxParam = {this.state.msgBox.param}
                loadingScreenShow = {this.state.loadingScreen.show}
                loadingScreenMsg = {this.state.loadingScreen.msg}
                status={this.state._status}
                title={TITLE}
                onRefresh={this._fetchDataFromDB}>

                <ReportContent
                    body={oBody}
                    filters={aFilters}
                />

            </GenericContainer>
        )
    }
}