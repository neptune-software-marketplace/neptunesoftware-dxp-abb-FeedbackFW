
const mKeyToText = {
    MultiSelectLookup: 'MultiSelect Lookup',
    MultiSelectScript: 'MultiSelect Script',
    SingleSelectLookup: 'SingleSelect Lookup',
    SingleSelectScript: 'SingleSelect Script',
};

function keyToText(k) {
    return mKeyToText[k] !== undefined ? mKeyToText[k] : k;
}

function valuesToKeyText(values) {
    return values.map(function (v) {
        if (v.includes('|')) {
            const [key, text] = v.split('|');
            return { key, text };
        }

        return { key: v, text: keyToText(v) };
    });
}