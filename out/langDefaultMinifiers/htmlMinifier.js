"use strict";
class HtmlMinifier {
    constructor(htmlContent) {
        this.htmlContent = htmlContent;
    }
    getHtmlMinified() {
        return this.htmlContent.join('').replace(/;\}|\s+}/g, '}')
            .replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':')
            .replace(/ {/g, '{')
            .replace(/[\t]/g, '')
            .replace(/\s{2}/g, '')
            .replace(/(>)\1+/g, '>')
            .replace(/"\s/igm, '"');
    }
    removeMultipleLineComments() {
        for (let i = 0; i < this.htmlContent.length; i++) {
            const begin = this.htmlContent[i].match(/(<!--)/ig);
            if (begin !== null) {
                for (let j = 0; j < this.htmlContent.length; j++) {
                    const end = this.htmlContent[j].match(/(-->)/g);
                    if (end !== null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k === i) {
                                const FirstCharacterToRemove = this.htmlContent[k].indexOf('<!--');
                                const firstLineToReplace = this.htmlContent[k].substring(0, FirstCharacterToRemove);
                                this.htmlContent[k] = firstLineToReplace;
                            }
                            else if (k === j) {
                                const lastCharacterToRemove = this.htmlContent[k].indexOf('-->');
                                const lastLineToReplace = this.htmlContent[k].substring(lastCharacterToRemove + 2, this.htmlContent[k].length);
                                this.htmlContent[k] = lastLineToReplace;
                            }
                            else {
                                this.htmlContent[k] = '';
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
}
module.exports = HtmlMinifier;
//# sourceMappingURL=htmlMinifier.js.map