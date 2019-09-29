function isFiniteNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

export {
    isFiniteNumber
}