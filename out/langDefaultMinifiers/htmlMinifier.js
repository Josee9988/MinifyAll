"use strict";
/**
 * @file That is called when the user minifies an HTML document
 * This file receives the HTML document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.3.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */
class htmlMinifier {
    /**
     * Summary Minifier constructor that receives the content.
     *
     * Description this is the constructor of the class and it
     * will receive an array with the content and it will assign it
     * to a private variable that will be used later on.
     * @access public
     *
     * @param {Array} htmlContent all the code that will be minified.
     */
    constructor(htmlContent) {
        this.htmlContent = htmlContent;
    }
    /**
     * Summary getHtmlMinified finds lasts spaces and trim it into just one line.
     *
     * Description the method will get the array with all the lines and will
     * make one String out of all of them; Then it will use REGEX
     * to replace multiple concurrencies, like removing multiple spaces,
     * unnecessary tabulations and specific things per each language.
     *
     * @access public
     *
     * @return {String} the line minified.
     */
    getHtmlMinified() {
        return this.htmlContent.join('').replace(/;\}|\s+}/g, '}')
            .replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':')
            .replace(/ {/g, '{')
            .replace(/[\t]/g, '')
            .replace(/\s{2}/g, '')
            .replace(/(>)\1+/g, '>')
            .replace(/"\s/igm, '"');
    }
    /**
     * Summary removes multiline comments.
     *
     * Description removeMultipleLineComments checks line by line
     * and removes the multiple line comments
     * it only removes the content inside the comments
     * if the multiple line comment is placed in a line
     * with useful code it will not be replaced.
     *
     * @access public
     */
    removeMultipleLineComments() {
        for (let i = 0; i < this.htmlContent.length; i++) {
            const begin = this.htmlContent[i].match(/(<!--)/ig); // first <!-- found
            if (begin != null) {
                for (let j = 0; j < this.htmlContent.length; j++) {
                    const end = this.htmlContent[j].match(/(-->)/g); // found --> end
                    if (end != null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k == i) {
                                const FirstCharacterToRemove = this.htmlContent[k].indexOf('<!--');
                                const firstLineToReplace = this.htmlContent[k].substring(0, FirstCharacterToRemove);
                                this.htmlContent[k] = firstLineToReplace;
                            }
                            else if (k == j) {
                                const lastCharacterToRemove = this.htmlContent[k].indexOf('-->');
                                const lastLineToReplace = this.htmlContent[k].substring(lastCharacterToRemove + 2, this.htmlContent[k].length);
                                this.htmlContent[k] = lastLineToReplace;
                            }
                            else {
                                this.htmlContent[k] = '';
                            }
                        }
                        break; // to stop reading the rest of the document
                    }
                }
            }
        }
    }
}
module.exports = htmlMinifier;
//# sourceMappingURL=htmlMinifier.js.map