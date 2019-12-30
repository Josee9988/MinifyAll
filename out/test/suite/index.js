"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const Mocha = require("mocha");
const path = require("path");
function run() {
    const mocha = new Mocha({
        ui: 'tdd',
    });
    mocha.useColors(true);
    const testsRoot = path.resolve(__dirname, '..');
    return new Promise((c, e) => {
        glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
            if (err) {
                return e(err);
            }
            files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));
            try {
                mocha.run(failures => {
                    if (failures > 0) {
                        e(new Error(`${failures} tests failed.`));
                    }
                    else {
                        c();
                    }
                });
            }
            catch (err) {
                e(err);
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map