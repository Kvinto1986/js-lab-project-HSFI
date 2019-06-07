export const getRandomSerial = function () {
    let serial = Math.floor(Math.random() * 10000000000001)

    return serial.toString();
};

export const sum=function(a, b) {
    return a + b;
}
