const checkboxTruthMapping = {
    true: "on",
    false: "off"
}

function checkboxTruthyMapping(boolean) {
    if (boolean !== true && boolean !== false) {
        throw new Error("Checkbox mapping must be true or false");
    }
    return checkboxTruthMapping[boolean];
}

function getDomain() {
    return "http://localhost";
}

export { checkboxTruthyMapping, getDomain };