"use strict";
class JsonMinifier {
    constructor(jsonContent) {
        this.jsonContent = jsonContent;
    }
    getJSONMinified() {
        return this.jsonContent.join('').replace(/;\}|\s+}/g, '}')
            .replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':')
            .replace(/\s{2}/g, '')
            .replace(/ {/g, '{')
            .replace(/[\t]/g, '')
            .replace(/,}/g, '}')
            .replace(/,]/g, ']');
    }
}
module.exports = JsonMinifier;
//# sourceMappingURL=jsonMinifier.js.map