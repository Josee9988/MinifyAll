"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNewFilePath(path, fileName, extensionWithOutDot, prefixUsed = '-min') {
    const filePath = path.dirname(fileName);
    const newName = path.basename(fileName).replace(`.${extensionWithOutDot}`, `${prefixUsed}.${extensionWithOutDot}`);
    const path2NewFile = path.join(filePath, newName);
    return path2NewFile;
}
exports.default = getNewFilePath;
//# sourceMappingURL=getNewFilePath.js.map