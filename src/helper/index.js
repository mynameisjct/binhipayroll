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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}