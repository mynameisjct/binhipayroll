import moment from "moment";

//Check if String is empty
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
    return moment(strDate).format(format);
}

export const isValidDate = (strDate) => {
    console.log('strDate: ' + strDate);
    console.log('moment(strDate, "YYYY-MM-DD", true).isValid(): ' + moment(strDate, "YYYY-MM-DD", true).isValid());
    return moment(strDate, "YYYY-MM-DD", true).isValid();
}

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