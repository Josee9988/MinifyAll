"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
var PrefixesAvailable;
(function (PrefixesAvailable) {
    PrefixesAvailable["hyphenMin"] = "-min";
    PrefixesAvailable["dotMin"] = ".min";
    PrefixesAvailable["minifiedHyphen"] = "minified-";
    PrefixesAvailable["docMinified"] = ".minified";
})(PrefixesAvailable = exports.PrefixesAvailable || (exports.PrefixesAvailable = {}));
function getUserSettings() {
    const conf = vscode.workspace.getConfiguration('MinifyAll');
    if (conf.get('minifyOnSaveToNewFIle')) {
        vscode.window.showWarningMessage('You are using the deprecated setting "minifyOnSaveToNewFIle", please replace it with: "minifyOnSaveToNewFile" (mind the capital letter I)');
    }
    return {
        hexDisabled: conf.get('disableHexadecimalShortener'),
        disableHtml: conf.get('disableHtml'),
        disableCss: conf.get('disableCss'),
        disableScss: conf.get('disableScss'),
        disableLess: conf.get('disableLess'),
        disableSass: conf.get('disableSass'),
        disableJson: conf.get('disableJson'),
        disableJsonc: conf.get('disableJsonc'),
        disableMessages: conf.get('disableMessages'),
        minifyOnSave: conf.get('minifyOnSave'),
        minifyOnSaveToNewFile: conf.get('minifyOnSaveToNewFile') ? true : conf.get('minifyOnSaveToNewFIle'),
        prefix: conf.get('PrefixOfNewMinifiedFiles'),
        disableJavascript: conf.get('disableJavascript'),
        disableJavascriptReact: conf.get('disableJavascriptReact'),
        openMinifiedDocument: conf.get('openMinifiedDocument'),
    };
}
exports.getUserSettings = getUserSettings;
//# sourceMappingURL=getConfiguration.js.map