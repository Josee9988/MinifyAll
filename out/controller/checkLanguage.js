"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkLanguageStyles(languageId, settings) {
    if ((languageId === 'css' && !settings.disableCss) ||
        (languageId === 'scss' && !settings.disableScss) ||
        (languageId === 'less' && !settings.disableLess) ||
        (languageId === 'sass' && !settings.disableSass)) {
        return true;
    }
    return false;
}
exports.checkLanguageStyles = checkLanguageStyles;
function checkLanguageJson(languageId, settings) {
    if ((languageId === 'json' && !settings.disableJson) ||
        (languageId === 'jsonc' && !settings.disableJsonc)) {
        return true;
    }
    return false;
}
exports.checkLanguageJson = checkLanguageJson;
function checkLanguageHtmlPhp(languageId, settings) {
    if ((languageId === 'html' && !settings.disableHtml) ||
        (languageId === 'php')) {
        return true;
    }
    return false;
}
exports.checkLanguageHtmlPhp = checkLanguageHtmlPhp;
function checkLanguageJS(languageId, settings) {
    if ((languageId === 'javascript' && !settings.disableJavascript) ||
        (languageId === 'javascriptreact' && !settings.disableJavascriptReact)) {
        return true;
    }
    return false;
}
exports.checkLanguageJS = checkLanguageJS;
//# sourceMappingURL=checkLanguage.js.map