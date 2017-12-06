export function isStringEmpty(strValue) {
    return !strValue
}

export function isStringOnlySpace(strValue){
    return !strValue.trim().length
}

export function isStringEmptyOrSpace(strValue){
    return (isStringEmpty(strValue) || isStringOnlySpace(strValue));
}