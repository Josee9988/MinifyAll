"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentRemover {
    constructor(lineContent) {
        this.lineContent = lineContent;
    }
    getCommentsRemoved() {
        return this.lineContent;
    }
    removeCommentsMain() {
        for (let i = 0; i < this.lineContent.length; i++) {
            this.lineContent[i] = this.lineContent[i].replace(/\/\*([\s\S]*?)\*\//g, '');
        }
        const lineContentString = this.removeComments(this.lineContent.join('\n'));
        this.lineContent = lineContentString.split('\n');
    }
    removeComments(str) {
        const uid = `_${+new Date()}`;
        const primatives = [];
        let primIndex = 0;
        return (str
            .replace(/(['"])(\\\1|.)+?\1/g, (match) => {
            primatives[primIndex] = match;
            return `${uid}${primIndex++}`;
        })
            .replace(/([^/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, ($1, $2) => {
            primatives[primIndex] = $2;
            return `${$1}${uid}${primIndex++}`;
        })
            .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
            .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
            .replace(RegExp(`\\/\\*[\\s\\S]+${uid}\\d+`, 'g'), '')
            .replace(RegExp(`${uid}(\\d+)`, 'g'), (_match, n) => primatives[n]));
    }
}
exports.default = CommentRemover;
//# sourceMappingURL=commentRemover.js.map