// convert object to string array taking the values as string in array 
export const objToStringArray = (dataArray) => {
    let arr = [];
    if (dataArray.length > 0) {
        dataArray.forEach(item => {
            arr.push(item.value);
        });
    }
    return arr;
}

// this takes an array of string and convert it to array of object with value, label matching the given object array corresponding to string array
export const convertToObjectArray = (stringArray, objectArray) => {
    return stringArray.map(str => {
        const foundObject = objectArray.find(obj => obj.value === str);
        return foundObject ? { label: foundObject.label, value: foundObject.value } : null;
    }).filter(obj => obj !== null);
}


// this gives the array of date object label, value of 7 days from today
export const generateDateOptions = () => {
    const today = new Date();
    const options = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
        const label = date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' });
        const value = date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
        options.push({ label, value });
    }

    return options;
};