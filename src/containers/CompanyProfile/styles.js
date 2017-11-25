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
  },

  ownersCont: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 100,
  },

  companyIds: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 50,
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
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 0.7,
    borderColor: '#D1D4D6',
  },

  branchForm:{
    marginTop: 6,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

  cardHeaderCont:{
    minHeight: 30,
    flexDirection: 'row',
  },

  cardTitle:{
    flex: 0.7,
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 30,
  },

  btnAdd:{
    flex: 0.3,
    maxWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtHeader:{
    color: '#434646',
    fontFamily: 'Helvetica-Light',
    fontSize: 15,
  },

  branchList:{
    flexDirection: 'row',
    minHeight: 50,
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
    flexDirection: 'column'
  },

  fixedGap: {
    height: 10
  },

  bottomGap: {
    height: 20,
    backgroundColor: 'transparent'
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
  },

  contactsFlex: {
    flexDirection: 'row'
  },

  branchInfoCard: {
    paddingBottom: 10,
    paddingTop: 10,
  },

  borderGap: {
    marginRight: 30
  }

};