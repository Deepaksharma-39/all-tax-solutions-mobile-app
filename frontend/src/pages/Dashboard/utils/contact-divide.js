export function divideArrayByType(data) {
    const corporateOfficeArray = [];
    const otherTypesArray = [];

    data.forEach(item => {
        if (item.type === 'Corporate office') {
            corporateOfficeArray.push(item);
        } else {
            otherTypesArray.push(item);
        }
    });

    return [corporateOfficeArray, otherTypesArray];
}