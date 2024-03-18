export const objToStringArray = (dataArray) => {
    let arr = [];
    if (dataArray.length > 0) {
        dataArray.forEach(item => {
            arr.push(item.value);
        });
    }
    return arr;
}