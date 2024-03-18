export const objToStringArray = (dataArray) => {
    let arr = [];
    if (dataArray.length > 0) {
        dataArray.forEach(item => {
            arr.push(item.value);
        });
    }
    return arr;
}


export const convertToObjectArray = (stringArray, objectArray) => {
    return stringArray.map(str => {
        const foundObject = objectArray.find(obj => obj.value === str);
        return foundObject ? { label: foundObject.label, value: foundObject.value } : null;
    }).filter(obj => obj !== null);
}