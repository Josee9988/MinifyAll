"use strict";
/**
 * @file File that contains all the methods to show messages to the user.
 *
 * @author Jose Gracia Berenguer
 * @since 2.0.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const vscode = require("vscode");
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["Error"] = 0] = "Error";
    MessageTypes[MessageTypes["Warning"] = 1] = "Warning";
    MessageTypes[MessageTypes["Informational"] = 2] = "Informational";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
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
 * @param {MessageTypes} messageType If it is a warning or an informational message
 * @return {void}
 */
function showMessage(text, messageType) {
    if (!main_1.settings.disableMessages) { // if the user wants to receive messages
        if (messageType === 0) { // error
            vscode.window.showErrorMessage(text);
        }
        else if (messageType === 1) { // warning
            vscode.window.showWarningMessage(text);
        }
        else if (messageType === 2) { // informational
            vscode.window.showInformationMessage(text);
        }
    }
}
exports.showMessage = showMessage;
//# sourceMappingURL=showMessage.js.map