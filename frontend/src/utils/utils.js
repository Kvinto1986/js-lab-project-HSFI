export const getLicenseSelect = function (obj) {
    const licenseArr = obj.map(function (elem) {
        const newElem = {};
        newElem.value = elem.license;
        newElem.label = elem.license;
        return newElem
    });

    return licenseArr;
};

export const getSeller = function (obj, license) {
    let seller = {};
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].license === license) {
            seller = obj[i]
        }
    }

    return seller;
};

export const getRandomSerial = function () {
    let serial = Math.floor(Math.random() * 10000000000001)

    return serial.toString();
};

export const getSerialSelect = function (obj) {
    const serialArr = obj.map(function (elem) {
        const newElem = {};
        newElem.value = elem.cardSerial;
        newElem.label = elem.cardSerial;
        return newElem
    });

    return serialArr;
};