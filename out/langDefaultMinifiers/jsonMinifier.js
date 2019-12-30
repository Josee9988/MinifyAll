"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = JsonMinifier;
//# sourceMappingURL=jsonMinifier.js.map