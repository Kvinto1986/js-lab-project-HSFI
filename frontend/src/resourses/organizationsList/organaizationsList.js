
const getOrganizationsList=function (organizations) {

    const arr=organizations.map(function (elem) {
        const newElem={};
        newElem.value=elem.organization;
        newElem.label=elem.organization;
        return newElem
    });
    return arr
}

export default getOrganizationsList