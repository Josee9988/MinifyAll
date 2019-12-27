/**
 * @file getConfiguration file that contains a fucntion that gathers all the user settings.
 *
 * @author Jose Gracia Berenguer
 * @since 1.8.1.
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

import vscode = require('vscode');

export enum PrefixesAvailable {
    hyphenMin = "-min",
    dotMin = ".min",
    minifiedHyphen = "minified-",
    docMinified = ".minified",
}

export interface IUserSettings {
    hexDisabled: boolean;
    disableHtml: boolean;
    disableCss: boolean;
    disableScss: boolean;
    disableLess: boolean;
    disableSass: boolean;
    disableJson: boolean;
    disableJsonc: boolean;
    disableMessages: boolean;
    minifyOnSave: boolean;
    minifyOnSaveToNewFile: boolean;
    prefix: PrefixesAvailable;
    disableJavascript: boolean;
    disableJavascriptReact: boolean;
    openMinifiedDocument: boolean;
}

/**
 * Summary: The function getUserSettings gathers all settings from the user and returns them.
 *
 * @return {Object} with all the settings.
 */
export function getUserSettings(): IUserSettings {
    const conf = vscode.workspace.getConfiguration('MinifyAll');
    if (conf.get('minifyOnSaveToNewFIle')) { // if the user is using a deprecated setting.
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
