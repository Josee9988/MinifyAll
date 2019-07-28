/**
 * @file That is called for performing line removing
 * removes // and / * * / comments
 * @author Jose Gracia Berenguer
 * @since 0.2.2
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */

class lineRemover {
    /**
     * Minifier constructor that maps and trims the code.
     * @param {Array} lineContent all the code that will be minified 
     */
    constructor(lineContent) {
        this.lineContent = lineContent;
    }

    /**
     * getLineRemoved finds lasts spaces and trim it into just one line
     * @return {Object} the line compressed
     */
    getLineRemoved() {
        return this.lineContent;
    }

    /**
     * removeSingleLineComments checks line by line 
     * and removes the single lines comments //
     */
    removeSingleLineComments() {
        for (let i = 0; i < this.lineContent.length; i++) {
            let hexadecimal = this.lineContent[i].replace(/^((?!:).)*\/\/.*/g, '');
            if (hexadecimal != null) {
                this.lineContent[i].replace(/^((?!:).)*\/\/.*/g, '');
                this.lineContent[i] = hexadecimal;
            }
        }
    }

    /**
     * removeMultipleLineComments checks line by line
     * and removes the multiple line comments
     * it only removes the content inside the comments
     * if the multiple line comment is placed in a line
     * with useful code it will not be replaced.
     */
    removeMultipleLineComments() {
        for (let i = 0; i < this.lineContent.length; i++) {
            let begin = this.lineContent[i].match(/(\/\*)/ig); // first /* found
            if (begin != null) {
                for (let j = 0; j < this.lineContent.length; j++) {
                    let end = this.lineContent[j].match(/(\*\/)/g); //found */ end
                    if (end != null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k == i) {
                                let FirstCharacterToRemove = this.lineContent[k].indexOf("/*");
                                let firstLineToReplace = this.lineContent[k].substring(0, FirstCharacterToRemove);
                                this.lineContent[k] = firstLineToReplace;
                            } else if (k == j) {
                                let lastCharacterToRemove = this.lineContent[k].indexOf("*/");
                                let lastLineToReplace = this.lineContent[k].substring(lastCharacterToRemove + 2, this.lineContent[k].length);
                                this.lineContent[k] = lastLineToReplace;

                            } else {
                                this.lineContent[k] = '';

                            }
                        }
                        break; // to stop reading the rest of the document
                    }

                }
            }
        }
    }
}
module.exports = lineRemover;