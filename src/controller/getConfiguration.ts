/**
 * @file getConfiguration file that contains a fucntion that gathers all the user settings.
 *
 * @author Jose Gracia Berenguer
 * @since 1.8.1.
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

import * as vscode from 'vscode';

export enum PrefixesAvailable {
    hyphenMin = "-min",
    dotMin = ".min",
    minifiedHyphen = "minified-",
    docMinified = ".minified",
}

export interface IUserSettings {
    /**
     * disableHexadecimalShortener:
     * If you want MinifyAll to stop shortening colors,
     * such as rgb to 3 digit hex, or rgba to hex, or 6
     * digit hex to 3 digit hex. (True for disabling hex.)
     */
    hexDisabled: boolean;
    /**
     * disableHtml: If you want MinifyAll to stop minimizing HTML. (True for disabling)
     */
    disableHtml: boolean;
    /**
     * disableCss: If you want MinifyAll to stop minimizing CSS. (True for disabling)
     */
    disableCss: boolean;
    /**
     * disableScss: If you want MinifyAll to stop minimizing SCSS. (True for disabling)
     */
    disableScss: boolean;
    /**
     * disableLess: If you want MinifyAll to stop minimizing LESS. (True for disabling)
     */
    disableLess: boolean;
    /**
     * disableSass: If you want MinifyAll to stop minimizing SASS. (True for disabling)
     */
    disableSass: boolean;
    /**
     * disableJson: If you want MinifyAll to stop minimizing JSON. (True for disabling)
     */
    disableJson: boolean;
    /**
     * disableJsonc: If you want MinifyAll to stop minimizing JSONC. (True for disabling)
     */
    disableJsonc: boolean;
    /**
     * disableJavascript: If you want MinifyAll to stop minimizing JavaScript. (True for disabling)
     */
    disableJavascript: boolean;
    /**
     * disableJavascriptReact: If you want MinifyAll to stop
     * minimizing JavaScriptReact. (True for disabling).
     */
    disableJavascriptReact: boolean;
    /**
     * disableMessages: If you want MinifyAll to stop showing error, warning or
     * information messages. (True for disabling).
     */
    disableMessages: boolean;
    /**
     * minifyOnSave: If you want MinifyAll to minify every time you save in
     * the same file. (True for enabling).
     */
    minifyOnSave: boolean;
    /**
     * minifyOnSaveToNewFile: If you want MinifyAll to minify every time
     * you save in other file. (True for enabling).
     */
    minifyOnSaveToNewFile: boolean;
    /**
     * PrefixOfNewMinifiedFiles: The prefix of the extension of the new file.
     */
    prefix: PrefixesAvailable;
    /**
     * openMinifiedDocument: If you want MinifyAll to open the new minified
     * document after you minify. (False for not opening it every time you
     * create a minified file).
     */
    openMinifiedDocument: boolean;
}

/**
 * Summary: The function getUserSettings gathers all settings from the user and returns them.
 *
 * @return {Object} with all the settings.
 */
export function getUserSettings(): IUserSettings {
    const conf: any = vscode.workspace.getConfiguration('MinifyAll');
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
