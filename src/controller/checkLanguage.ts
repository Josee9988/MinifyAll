/**
 * @file file that contains all the functions needed to check if the language given
 * is not disabled, and it will be executed.
 *
 * @since 1.9.1
 * @author Jose Gracia Berenguer
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

import { IUserSettings } from "./getConfiguration";

/**
 * Summary: A function that checks the if the language given is not disabled by the user
 * in their settings, if it is not disabled it will return true, if not false.
 *
 * @param {String} languageId Name of the language that the user is going to Minify.
 * @param {Object} settings object with all the settings, with the settings we will obtain
 * the disabled languages by the user.
 * @return {Boolean} true if the language it is not disabled and the extension will continue
 * or false if the language is disabled by the user.
 */
export function checkLanguageStyles(languageId: string, settings: IUserSettings): boolean {
    if ((languageId === 'css' && !settings.disableCss) ||
        (languageId === 'scss' && !settings.disableScss) ||
        (languageId === 'less' && !settings.disableLess) ||
        (languageId === 'sass' && !settings.disableSass)) {
        return true;
    }
    return false;
}


/**
 * Summary: A function that checks the if the language given is not disabled by the user
 * in their settings, if it is not disabled it will return true, if not false.
 *
 * @param {String} languageId Name of the language that the user is going to Minify.
 * @param {Object} settings object with all the settings, with the settings we will obtain
 * the disabled languages by the user.
 * @return {Boolean} true if the language it is not disabled and the extension will continue
 * or false if the language is disabled by the user.
 */
export function checkLanguageJson(languageId: string, settings: IUserSettings): boolean {
    if ((languageId === 'json' && !settings.disableJson) ||
        (languageId === 'jsonc' && !settings.disableJsonc)) {
        return true;
    }
    return false;
}


/**
 * Summary: A function that checks the if the language given is not disabled by the user
 * in their settings, if it is not disabled it will return true, if not false.
 *
 * @param {String} languageId Name of the language that the user is going to Minify.
 * @param {Object} settings object with all the settings, with the settings we will obtain
 * the disabled languages by the user.
 * @return {Boolean} true if the language it is not disabled and the extension will continue
 * or false if the language is disabled by the user.
 */
export function checkLanguageHtmlPhp(languageId: string, settings: IUserSettings): boolean {
    if ((languageId === 'html' && !settings.disableHtml) ||
        (languageId === 'twig' && !settings.disableTwig) ||
        ((languageId === 'php') && !settings.disablePhp) || languageId === 'vue' || languageId === 'vue-html' || languageId === 'xml') {
        return true;
    }
    return false;
}


/**
 * Summary: A function that checks the if the language given is not disabled by the user
 * in their settings, if it is not disabled it will return true, if not false.
 *
 * @param {String} languageId Name of the language that the user is going to Minify.
 * @param {Object} settings object with all the settings, with the settings we will obtain
 * the disabled languages by the user.
 * @return {Boolean} true if the language it is not disabled and the extension will continue
 * or false if the language is disabled by the user.
 */
export function checkLanguageJS(languageId: string, settings: IUserSettings): boolean {
    if ((languageId === 'javascript' && !settings.disableJavascript) ||
        (languageId === 'javascriptreact' && !settings.disableJavascriptReact)) {
        return true;
    }
    return false;
}
