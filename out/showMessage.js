"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const vscode = require("vscode");
/**
 * Summary it shows a warning or information message.
 *
 * Description showMessage shows a message to the user, it might be a warning
 * or an informational one, the method receives a text with the message
 * and a boolean for saying if it is a warning (true)
 * or an informational(false).
 *
 * @access private
 *
 * @param {String} text The text to be displayed in the message
 * @param {boolean} warning If it is a warning or an informational message
 * @return {void}
 */
function showMessage(text, warning) {
    if (warning) {
        if (!main_1.settings.disableMessages) {
            vscode.window.showWarningMessage(text);
        }
    }
    else if (!main_1.settings.disableMessages) {
        vscode.window.showInformationMessage(text);
    }
}
exports.showMessage = showMessage;
//# sourceMappingURL=showMessage.js.map