/**************************************************************
 *  FileName:           styles.js
 *  Description:        Digital Clock Styles
 *  Copyright:          Binhi-MeDFI © 2017
 *  Original Author:    Jovanni Auxilio
 *  Date Created:       2017-11-07

 *  Modification History:
        Date              By            Description

**************************************************************/
const React = require('react-native');
const { StyleSheet } = React;

export default {

  container: {
    flex:1,
    backgroundColor: 'transparent',
  },

  titleCont: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 100,
  },

  branchesCont: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 100,
  },

  ownersCont: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 100,
  },

  companyIds: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 100,
  },

  titleContentCont: {
    marginTop: 60,
    minHeight: 100,
    backgroundColor: '#fff',
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },

  imagePlaceholder:{
    width: 90,
    height: 90,
    borderRadius: 90/2,
    backgroundColor: '#fff',
    borderColor: '#434646',
    position: 'absolute',
    marginTop: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    zIndex: 1,
  },

  imgLogo:{
    width:78,
    height:78,
    alignSelf: 'center'
    },
  
  txtCompanyName: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#434646',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 45,
  },

  txtCompanyAddress:{
    fontSize: 12,
    fontFamily: 'Helvetica-Light',
    color: '#434646',
    textAlign: 'center',
  },

  defaultContMargin:{
    marginLeft: 25,
    marginRight: 25,
    borderBottomWidth: 0.7,
    borderColor: '#D1D4D6'
  },

  branchForm:{
    marginTop: 5,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },

  cardHeaderCont:{
    minHeight: 50,
    flexDirection: 'row'
  },

  cardTitle:{
    flex: 0.7,
    paddingTop: 20,
    paddingLeft: 30,
  },

  cardAddBtn:{
    flex: 0.3,
    maxWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  txtHeader:{
    color: '#434646',
    fontFamily: 'Helvetica-Light',
    fontSize: 15,
  },

  branchList:{
    flexDirection: 'row',
    minHeight: 80,
  },

  companyIdList:{
    flexDirection: 'row',
    minHeight: 50,
  },

  iconCont: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 140
  },

  branchInfoCont: {
    flex: 0.7,
    justifyContent: 'center',
  },

  fixedGap: {
    height: 20
  },

  fixedGapContent: {
    height: 7
  },

  contentGap:{
    height: 1,
    flexDirection: 'row',
  },

  lineMargin:{
    width: 40,
  },

  lineFlex: {
    flex: 0.7,
    justifyContent: 'center',
    borderBottomWidth: 0.7,
    borderColor: '#D1D4D6'
  },

  txtInfoTitle: {
    fontSize: 15,
    fontFamily: 'Helvetica-Bold',
    fontWeight: '800',
    color: '#434646'
  },

  txtInfoDetails:{
    fontSize: 12,
    fontFamily: 'Helvetica-Light',
    color: '#434646'
  }

};