import { experienceYears, symptoms } from "@/lib/constant";

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
export const generateDateOptions = (availableDates) => {

    const dates = Object.keys(availableDates);
    const options = [];

    dates.map(item => {
        options.push({
            label: item.substring(0, 5),
            value: item,
        })
    })
    return options;
};


// take file object and convert it to data url 
export const toDataURL = (file) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = () => reject(fileReader.error);
        fileReader.readAsDataURL(file);
    });


// get experiance label from its value 
export const getExp = (value) => {
    let label = "";
    for (let i = 0; i < experienceYears.length; i++) {
        const item = experienceYears[i];
        if (item.value === value) {
            label = item.label;
            break;
        }
    }
    return label;
};



// get symptoms that are not selected 
export const getRemainingSymptoms = (data) => {
    return symptoms.filter(item => !data.includes(item));
}


// formats date in "DD Month" format
export const getFormatedDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const monthIndex = date.getMonth();

    const formattedDate = `${day} ${monthNames[monthIndex]}`;

    return formattedDate;
};