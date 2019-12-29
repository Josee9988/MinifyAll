"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentRemover_1 = require("../controller/commentRemover");
const hexMinifier_1 = require("../controller/hexMinifier");
class GlobalMinifiers {
    constructor(willMinifyHex) {
        this.willMinifyHex = willMinifyHex;
    }
    minifyCssScssLessSass(cssContent) {
        const CssMinifier = require('../langDefaultMinifiers/cssMinifier');
        const RemoveComments = this.removeComments(cssContent);
        const hexMinifiedCss = this.HexMinify(RemoveComments);
        const minifierCss = new CssMinifier(hexMinifiedCss);
        return minifierCss.getCssMinified();
    }
    minifyJsonJsonc(jsonContent) {
        const JsonMinifier = require('../langDefaultMinifiers/jsonMinifier');
        const contentWithHexMinified = this.HexMinify(jsonContent);
        const RemoveComments = this.removeComments(contentWithHexMinified);
        const minifierJson = new JsonMinifier(RemoveComments);
        return minifierJson.getJSONMinified();
    }
    minifyHtml(htmlContent) {
        const HtmlMinifier = require('../langDefaultMinifiers/htmlMinifier');
        const minifierHtml = new HtmlMinifier(htmlContent);
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