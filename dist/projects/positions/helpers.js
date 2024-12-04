"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
exports.Helpers = {
    multiplication(a, b) {
        const result = a * b;
        return result;
    },
    sumData(array) {
        const sum = array.positions.reduce((prevPosition, position) => {
            return prevPosition + position.result;
        }, 0);
        return sum;
    },
    sumEstimate(array) {
        const sum = array.estimates.reduce((prevPosition, position) => {
            return prevPosition + position.total;
        }, 0);
        return sum;
    },
    getGeneral(a, b, c, d) {
        const result = a + b - c - d;
        return result;
    },
    sumMaterials(array) {
        const sum = array.reduce((prevMaterial, material) => {
            return prevMaterial + material.sum;
        }, 0);
        return sum;
    },
    sumLowEstimates(array) {
        const sum = array.lowEstimates.reduce((prevPosition, position) => {
            return prevPosition + position.total;
        }, 0);
        return sum;
    },
    checkId(id) {
        const isValidObjectId = /^[a-f0-9]{24}$/.test(id);
        return isValidObjectId ? true : false;
    },
    middlePrice(array) {
        const pricesLength = array.length;
        const sum = array.reduce((prevPrice, priceItem) => {
            return prevPrice + priceItem.price;
        }, 0);
        return sum / pricesLength;
    },
};
//# sourceMappingURL=helpers.js.map