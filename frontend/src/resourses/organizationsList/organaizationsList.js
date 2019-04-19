
const getOrganizationsList=function (organizations) {

    const arr=organizations.map(function (elem) {
        const newElem={};
        newElem.value=elem.organization;
        newElem.label=elem.organization;
        return newElem
    });
    console.log(arr);
    return arr
}

export default getOrganizationsList