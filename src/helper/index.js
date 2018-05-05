import moment from "moment";
import DeviceInfo from 'react-native-device-info';

//String Function
export const isStringEmpty = (strValue) => {
    return !strValue
}

export const isStringOnlySpace = (strValue)  => {
    return !strValue.trim().length
}

export const isStringEmptyOrSpace = (strValue) => {
    return (isStringEmpty(String(strValue)) || isStringOnlySpace(String(strValue)));
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Date Functions
export const getArrayOfDaysInMonth = (month) => {
    try{
        let iDays = new Date(2018, month, 0).getDate();
        let days = [];

        for (let index = 1; index <= iDays; index++) { 
            days.push(''+index);
        }
        return days;
    }
    catch(exception){
        console.log('exception: ' + exception);
        return [];
    }
    
}

export const convertDateToString = (strDate, format) => {
    console.log('strDate:' + strDate);
    return moment(strDate).format(format);
}

export const convertStringToDate = (strDate) => {
    return  strDate ?  new Date(strDate) : null;
}

export const convertRangeDateToString = (oDate) => {
    try{
        let strFrom = '';
        let strTo = '';
        let strSplitString = '';
        if(oDate.from.value){
            strFrom = convertDateToString(oDate.from.value, oDate.from.format);
            if(oDate.to.value){
                strSplitString = ' - ';
                if(isValidDate(oDate.to.value)){
                    strTo = convertDateToString(oDate.to.value, oDate.to.format);
                }
                else{
                    strTo = oDate.to.value;
                }
                
            }
            return(strFrom + strSplitString + strTo);
        }
        else{
            return '';
        }
    }
    catch(error){
        return 'ERROR DATE'
    }
}

export const isValidDate = (strDate) => {
    /* console.log('strDate: ' + strDate);
    console.log('moment(strDate, "YYYY-MM-DD", true).isValid(): ' + moment(strDate, "YYYY-MM-DD", true).isValid()); */
    return moment(strDate, "YYYY-MM-DD", true).isValid();
}

export const addDaysFromDate = (oDate, value) => {
    /* console.log('oDate: ' + oDate); */
    let curDate = new Date(oDate);
    curDate.setDate(curDate.getDate()+value);
    /* console.log('curDate: ' + curDate); */
    return curDate;
}

//Array Functions
export const removeElementByIndex = (arrData, index) => {
    let curData = [...arrData]
    curData.splice(index, 1);
    return curData;
}

export const getElementByPropValue = (source, propertyName, propertyValue) => {
    console.log('source: ' + JSON.stringify(source));
    console.log('propertyName: ' + propertyName);
    console.log('propertyValue: ' + propertyValue);
    if(
        source.length === 0 || 
        isStringEmptyOrSpace(propertyName) || 
        isStringEmptyOrSpace(propertyValue)
    ){
        console.log('EMPTY SOURCE')
        return '';
    }
    else{
        try{
            console.log('RETURNVAL: ' + JSON.stringify(source.find(x => x[propertyName] == propertyValue)));
            return (source.find(x => x[propertyName] == propertyValue))
        }
        catch(exception){
            console.log('ERROR')
            return ''
        }
    }
}

export const getElementIndexByPropValue = (source, propertyName, propertyValue) => {
    console.log('source: ' + JSON.stringify(source));
    console.log('propertyName: ' + propertyName);
    console.log('propertyValue: ' + propertyValue);
    if(
        source.length === 0 || 
        isStringEmptyOrSpace(propertyName) || 
        isStringEmptyOrSpace(propertyValue)
    ){
        console.log('EMPTY SOURCE')
        return -1;
    }
    else{
        try{
            console.log('RETURNVAL: ' + (source.findIndex(x => x[propertyName] == propertyValue)));
            return (source.findIndex(x => x[propertyName] == propertyValue))
        }
        catch(exception){
            console.log('ERROR')
            return -1
        }
    }
}

//Abbreviation
export const getDayAbbrev = (_strDay) => {
    let _curAbbrev = _strDay=='SUNDAY' ? 'SUN':
    _strDay=='MONDAY' ? 'MON':
    _strDay=='TUESDAY'?'TUE':
    _strDay=='WEDNESDAY'?'WED':
    _strDay=='THURSDAY' ? 'THU':
    _strDay=='FRIDAY'?'FRI':
    _strDay=='SATURDAY'?'SAT':'SUN';
    return _curAbbrev;
}

//Object Functions
export const copyObject = (oData) => {
    return (JSON.parse(JSON.stringify(oData)))
}

//Enums function
export const generateEnums = (sourceArray, strPropName, strValue) => {
    let oEnums = {};
    sourceArray.map((data,index) => {
        oEnums[data[strPropName]] = data[strValue]
    });
    return(oEnums);
}

export const generateDateEnums = (sourceArray, strPropName, strValue, format) => {
    let oEnums = {};
    sourceArray.map((data,index) => {
        oEnums[data[strPropName]] = convertDateToString(data[strValue], format);
    });
    return(oEnums);
}

//Custom MessageBox Helper
export const setMsgBox = (sMsgBox, show, type, msg, param) => {
    let oMsgBox = {...sMsgBox};
    oMsgBox.show = show;
    oMsgBox.type = type;
    oMsgBox.msg = msg;
    oMsgBox.param = param;
    return oMsgBox;
}

export const clearMsgBox = (sMsgBox) => {
    let oMsgBox = {...sMsgBox};
    oMsgBox.show = false;
    oMsgBox.type = '';
    oMsgBox.msg = '';
    oMsgBox.param = '';
    return oMsgBox;
}

//Device Info
export const getDeviceInfo = async() => {
    let strIpAddress = null;
    let strMacAddress = null;
    await DeviceInfo.getIPAddress().then(ip => {strIpAddress = ip});
    await DeviceInfo.getMACAddress().then(ip => {strMacAddress = ip});

    return ({
        apilevel: DeviceInfo.getAPILevel(),
        brand: DeviceInfo.getBrand(),
        buildnumber:  DeviceInfo.getBuildNumber(),
        carrier: DeviceInfo.getCarrier(),
        deviceid: DeviceInfo.getDeviceId(),
        devicename: DeviceInfo.getDeviceName(),
        ipaddress: strIpAddress,
        macaddress: strMacAddress,
        model: DeviceInfo.getModel(),
        phonenumber: DeviceInfo.getPhoneNumber(),
        systemname: DeviceInfo.getSystemName(),
        systemversion: DeviceInfo.getSystemVersion(),
        timezone: DeviceInfo.getTimezone(),
        uniqueid: DeviceInfo.getUniqueID(),
        istablet: DeviceInfo.isTablet()
    })
}