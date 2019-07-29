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
            this.lineContent[i] = this.lineContent[i].replace(/\/\/.*/g, '');
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
            this.lineContent[i] = this.lineContent[i].replace(/\/\*([\s\S]*?)\*\//g, '');
        }
    }
}
module.exports = lineRemover;