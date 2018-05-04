/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

//Styles
import styles from './styles';

//Children Components
import DTRItem from './dailyItem';
import DTRTimeForm from './timeForm';
import GenericContainer from '../../components/GenericContainer';

//Api
import * as dtrApi from './data/api';

//Helper
import * as oHelper from '../../helper';

export default class DTRCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _strFormTitle: '',
        _bShowTimeForm: false,
        _activeTimeData: {
          employeename: '',
          date: '',
          oldtime: '',
          newtime: null,
          remarks: '',
        },
        selected: null,

        loadingScreen: {
          show: false,
          msg: 'test'
        },

        msgBox: {
          show: false,
          type: '',
          msg: '',
          param: ''
        },
    };
  }

  _onModifyTimeIn = (oDate, oTime) => {
    const oActiveEmpBasicInfo = this.props.activeEmployee.personalinfo.basicinfo;
    const oActiveEmpName = oActiveEmpBasicInfo.lastname + ', ' + oActiveEmpBasicInfo.firstname;
    console.log('activeEmployee: ' + JSON.stringify(this.props.activeEmployee))
    console.log('_onModifyTimeIn_oDate: ' + oDate);
    console.log('_onModifyTimeIn_oTime: ' + oTime);
    let oActive = {...this.state._activeTimeData}; 
    oActive.code = '1009';
    oActive.employeeid = this.props.activeEmployee.id;         
    oActive.employeename = oActiveEmpName;
    oActive.date = oDate;
    oActive.oldtime = oTime ? oTime : null;
    oActive.newtime = null;
    oActive.remarks = '';
    this.setState({
        _activeTimeData: oActive,
        _strFormTitle: 'MODIFY EMPLOYEE TIME-IN',
        _bShowTimeForm: true
    })
  }

  _onModifyTimeOut = (oDate, oTime) => {
    let oActive = {...this.state._activeTimeData};
    oActive.code = '1010';
    oActive.employeename = 'TEMP'; //TEMP
    oActive.date = oDate;
    oActive.oldtime = oTime;
    oActive.newtime = null;
    oActive.remarks = '';
    this.setState({
        _activeTimeData: oActive,
        _strFormTitle: 'MODIFY EMPLOYEE TIME-OUT',
        _bShowTimeForm: true
    })
  }

  _onDayPress = (day) => {
    this.setState({
        selected: day
    });
  }

  _hideTimeForm = () => {
    this.setState({
        _strFormTitle: '',
        _bShowTimeForm: false
    })
  }

  _onSubmit = async(oData) => {
      this._setLoadingScreen(true, 'Modifying DTR. Please wait...');
      let oCurData = {...oData};
      oCurData.oldtime = await oCurData.oldtime ? oHelper.convertDateToString(oCurData.oldtime, 'hh:mm:mm A') : '';
      oCurData.newtime = await  oCurData.newtime ? oHelper.convertDateToString(oCurData.newtime, 'hh:mm:mm A') : '';
      console.log('oCurData: ' + JSON.stringify(oCurData));
      
      await dtrApi.update(oCurData)
      .then((response) => response.json())
      .then((res) => {
          console.log('res: ' + JSON.stringify(res));
          if(res.flagno == 1){
            this._setMessageBox(true, 'success', res.message);
            this._hideTimeForm();
          }else{
            this._setMessageBox(true, 'error-ok', res.message);
          }
      }).catch((exception) => {
        this._setMessageBox(true, 'error-ok', exception.message);
          console.log('exception: ' + exception.message);
          bHideLoading ? this.props.setLoadingStatus(false) : null;
      });

      this._setLoadingScreen(false);
      
  }

  _setMessageBox = (show, type, msg, param) => {
    this.setState({
      msgBox: oHelper.setMsgBox(
          this.state.msgBox,
          show, 
          type,
          msg,
          param
      )
    })
  }

  _setLoadingScreen = (show, msg) => {
    let oLoadingScreen = {...this.state.loadingScreen};
    oLoadingScreen.show = show;
    oLoadingScreen.msg = msg;
    this.setState({ loadingScreen: oLoadingScreen });
  }

  _msgBoxOnClose = (params) => {
      this.setState({
          msgBox: oHelper.clearMsgBox(this.state.msgBox)
      })
  }

  render() {
    const oData = this.props.data;
    const oCurPeriod = this.props.data.currentperiod;
    /* console.log('this.state.items: ' + JSON.stringify(this.state.items)); */
    return (
        <View style={styles.container}>
            <Agenda
                style={styles.container}
                items={oCurPeriod.details}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={this.state.selected ? this.state.selected : oCurPeriod.period.datefrom}
                onDayPress={this._onDayPress}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                minDate={oCurPeriod.period.datefrom}
                maxDate={oCurPeriod.period.dateto}
                markingType={'multi-dot'}
                markedDates={oCurPeriod.markings}
                pastScrollRange={1}
                futureScrollRange={2}
                // agenda theme
                theme={{
                agendaDayTextColor: '#838383',
                agendaDayNumColor: '#434646',
                agendaTodayColor: '#505251',
                agendaKnobColor: '#EEB843'
                }}
            />
            {
              this.state._bShowTimeForm ? 
                <DTRTimeForm
                  data={this.state._activeTimeData}
                  visible={this.state._bShowTimeForm}
                  title={this.state._strFormTitle}
                  onCancel={this._hideTimeForm}
                  onOK={this._onSubmit}/>
              :
                null
            }

            { this.state.msgBox.show || this.state.loadingScreen.show ?
                <GenericContainer
                  containerStyle={{position: 'absolute'}}
                  msgBoxShow = {this.state.msgBox.show}
                  msgBoxType = {this.state.msgBox.type}
                  msgBoxMsg = {this.state.msgBox.msg}
                  msgBoxOnClose = {this._msgBoxOnClose}
                  msgBoxOnYes = {this._msgBoxOnYes}
                  msgBoxParam = {this.state.msgBox.param}
                  loadingScreenShow = {this.state.loadingScreen.show}
                  loadingScreenMsg = {this.state.loadingScreen.msg}
                  status={[1, '']}
                  title={''}
                  onRefresh={this._fetchDataFromDB}>
                  {null}
                </GenericContainer>
              : 
                null
            }
            
        </View>
    );
  }
  loadItems(day) {
    /* setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`); */
  }

  renderItem(item) {
    const oLabels = this.props.data.labels;

    let oTimeIn = {...item.data.timein};
    let oTimeOut = {...item.data.timeout};
    let aValidations = [...item.data.rulesvalidation];
    let iValidationsLen = item.data.rulesvalidation.length;
    
    return (
      /* <View style={[styles.item, {height: 60}]}><Text>{JSON.stringify(item.data.timein)}</Text></View> */
      <View style={styles.itemStyle.container}>
        <DTRItem
          date={item.data.date}
          name={oLabels.timein} 
          value={oTimeIn.value ? oTimeIn.value : ''}
          remarks={oTimeIn.remarks} 
          remarksColor={null}
          showButton={true} 
          buttonTitle='MODIFY TIME-IN '
          onPress={this._onModifyTimeIn}/>

        <DTRItem 
          date={item.data.date}
          name={oLabels.timeout} 
          value={oTimeOut.value ? oTimeOut.value : ''}
          remarks={oTimeOut.remarks}
          remarksColor={null}
          showButton={true} 
          hideBorder={iValidationsLen===0 ? true : false}
          buttonTitle='MODIFY TIME-OUT'
          onPress={this._onModifyTimeOut}/>

        {
          aValidations.map((oData, index) => 
            <DTRItem 
              date={item.data.date}
              hideBorder={(iValidationsLen-1)===index ? true : false}
              key={index}
              name={oData.label} 
              value={oData.value}
              remarks={oData.remarks}
              remarksColor={oData.color}/>
          )
        }
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

