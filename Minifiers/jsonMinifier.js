/**
 * @file That is called when the user minifies a json document
 * This file receives the json document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.2.0
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */

class jsonMinifier {
    /**
     * Minifier constructor that maps and trims the code.
     * @param {Array} jsonContent all the code that will be minified 
     */
    constructor(jsonContent) {
        this.jsonContent = jsonContent.map(content => content.trim());
    }

    /**
     * getJSONMinified finds lasts spaces and trim it into just one line
     * @return {String} the line compressed
     */
    getJSONMinified() {
        return this.jsonContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '').replace(/:\s/g, ':').replace(/ {/g, '{').replace(/[\t]/g, '');
    }

    /**
     * removeSingleLineComments checks line by line 
     * and removes the single lines comments //
     */
    removeSingleLineComments() {
        for (let i = 0; i < this.jsonContent.length; i++) {
            let hexadecimal = this.jsonContent[i].replace(/[/]+.*/g, '');
            if (hexadecimal != null) {
                this.jsonContent[i].replace(/[/]+.*/g, '');
                this.jsonContent[i] = hexadecimal;
            }
        }
    }

    /**
     * removeMultipleLineComments checks line by line
     * and removes the multiple line comments
     * it only removes the content inside the comments
     * if the multiple line comment is placed in a line
     * with usefull code it will not be replaced.
     */
    removeMultipleLineComments() {
        console.log("Multi line comments;");
        for (let i = 0; i < this.jsonContent.length; i++) {
            let begin = this.jsonContent[i].match(/(\/\*)/ig); // first /* found
            if (begin != null) {
                for (let j = 0; j < this.jsonContent.length; j++) {
                    let end = this.jsonContent[j].match(/(\*\/)/g); //found */ end
                    if (end != null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k == i) {
                                let FirstCharacterToRemove = this.jsonContent[k].indexOf("/*");
                                let firstLineToReplace = this.jsonContent[k].substring(0, FirstCharacterToRemove);
                                this.jsonContent[k] = firstLineToReplace;
                            } else if (k == j) {
                                let lastCharacterToRemove = this.jsonContent[k].indexOf("*/");
                                let lasttLineToReplace = this.jsonContent[k].substring(lastCharacterToRemove + 2, this.jsonContent[k].length);
                                this.jsonContent[k] = lasttLineToReplace;

                            } else {
                                this.jsonContent[k] = '';

                            }
                        }
                        break; // to stop reading the rest of the document
                    }

                }
            }
        }
    }
}
module.exports = jsonMinifier;