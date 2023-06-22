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

export { checkboxTruthyMapping };