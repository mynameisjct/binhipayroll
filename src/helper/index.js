//Check if String is empty
export function isStringEmpty(strValue) {
    return !strValue
}

export function isStringOnlySpace(strValue){
    return !strValue.trim().length
}

export function isStringEmptyOrSpace(strValue){
    return (isStringEmpty(strValue) || isStringOnlySpace(strValue));
}

export function capitalizeFirstLetter(string) {
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