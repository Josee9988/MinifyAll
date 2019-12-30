"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const main_1 = require("../main");
var MessageTypes;
(function (MessageTypes) {
    MessageTypes[MessageTypes["Error"] = 0] = "Error";
    MessageTypes[MessageTypes["Warning"] = 1] = "Warning";
    MessageTypes[MessageTypes["Informational"] = 2] = "Informational";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
function showMessage(text, messageType) {
    if (!main_1.settings.disableMessages) {
        if (messageType === 0) {
            vscode.window.showErrorMessage(text);
        }
        else if (messageType === 1) {
            vscode.window.showWarningMessage(text);
        }
        else if (messageType === 2) {
            vscode.window.showInformationMessage(text);
        }
    }
}
exports.showMessage = showMessage;
//# sourceMappingURL=showMessage.js.map