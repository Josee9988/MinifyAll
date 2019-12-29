"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_test_1 = require("vscode-test");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const extensionDevelopmentPath = path.resolve(__dirname, '../../');
            const extensionTestsPath = path.resolve(__dirname, './suite/index');
            yield vscode_test_1.runTests({ extensionDevelopmentPath, extensionTestsPath });
        }
        catch (err) {
            console.error('Failed to run tests');
            process.exit(1);
        }
    });
}
main();
//# sourceMappingURL=runTest.js.map