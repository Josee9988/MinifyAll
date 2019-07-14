/**
 * @file That is called when the user minifies a html document
 * This file receives the html document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.3.0
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */

class htmlMinifier {
    /**
     * Minifier constructor that maps and trims the code.
     * @param {Array} htmlContent all the code that will be minified 
     */
    constructor(htmlContent) {
        this.htmlContent = htmlContent.map(content => content.trim());
    }

    /**
     * gethtmlMinified finds lasts spaces and trim it into just one line
     * @return {String} the line compressed
     */
    gethtmlMinified() {
        return this.htmlContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':').replace(/ {/g, '{').replace(/[\t]/g, '').replace(/\s\s/g, '').replace(/(\>)\1+/g, '');
    }


    /**
     * removeMultipleLineComments checks line by line
     * and removes the multiple line comments
     * it only removes the content inside the comments
     * if the multiple line comment is placed in a line
     * with usefull code it will not be replaced.
     */
    removeMultipleLineComments() {
        for (let i = 0; i < this.htmlContent.length; i++) {
            let begin = this.htmlContent[i].match(/(<!--)/ig); // first <!-- found
            if (begin != null) {
                for (let j = 0; j < this.htmlContent.length; j++) {
                    let end = this.htmlContent[j].match(/(-->)/g); //found --> end
                    if (end != null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k == i) {
                                let FirstCharacterToRemove = this.htmlContent[k].indexOf("<!--");
                                let firstLineToReplace = this.htmlContent[k].substring(0, FirstCharacterToRemove);
                                this.htmlContent[k] = firstLineToReplace;
                            } else if (k == j) {
                                let lastCharacterToRemove = this.htmlContent[k].indexOf("-->");
                                let lasttLineToReplace = this.htmlContent[k].substring(lastCharacterToRemove + 2, this.htmlContent[k].length);
                                this.htmlContent[k] = lasttLineToReplace;

                            } else {
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