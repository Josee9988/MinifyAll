"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentRemover_1 = require("../controller/commentRemover");
const hexMinifier_1 = require("../controller/hexMinifier");
const cssMinifier_1 = require("../langDefaultMinifiers/cssMinifier");
const htmlMinifier_1 = require("../langDefaultMinifiers/htmlMinifier");
const jsonMinifier_1 = require("../langDefaultMinifiers/jsonMinifier");
class GlobalMinifiers {
    constructor(willMinifyHex) {
        this.willMinifyHex = willMinifyHex;
    }
    minifyCssScssLessSass(cssContent) {
        const removeComments = this.removeComments(cssContent);
        const hexMinifiedCss = this.HexMinify(removeComments);
        const minifierCss = new cssMinifier_1.default(hexMinifiedCss);
        return minifierCss.getCssMinified();
    }
    minifyJsonJsonc(jsonContent) {
        const contentWithHexMinified = this.HexMinify(jsonContent);
        const removeComments = this.removeComments(contentWithHexMinified);
        const minifierJson = new jsonMinifier_1.default(removeComments);
        return minifierJson.getJSONMinified();
    }
    minifyHtml(htmlContent) {
        const minifierHtml = new htmlMinifier_1.default(htmlContent);
        minifierHtml.removeMultipleLineComments();
        return minifierHtml.getHtmlMinified();
    }
    HexMinify(content) {
        let returnValue;
        if (this.willMinifyHex) {
            const hexMinifier = new hexMinifier_1.default(content);
            hexMinifier.shortHexMain();
            hexMinifier.shortRGBMain();
            hexMinifier.shortRGBAMain();
            returnValue = hexMinifier.getHexMinified();
        }
        else {
            returnValue = content;
        }
        return returnValue;
    }
    removeComments(content) {
        const removeComments = new commentRemover_1.default(content);
        removeComments.removeCommentsMain();
        return removeComments.getCommentsRemoved();
    }
}
exports.default = GlobalMinifiers;
//# sourceMappingURL=globalMinifiers.js.map