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
     * @param {Array} lineContent all the code that will be minified.
     */
    constructor(lineContent) {
        this.lineContent = lineContent;
    }

    /**
     * getLineRemoved finds lasts spaces and trim it into just one line.
     * @return {Array} the line minified.
     */
    getLineRemoved() {
        return this.lineContent;
    }

    /**
     * removeCommentsMain method that is called when you want to remove the 
     * comments from the array of lines
     * First remove all the multiline comments in the same lne
     * calls removeMultipleLineComments();
     * Then it calls the method removeComments 
     * which receives a single string and it does all the job.
     * This method is only a for with a method call.
     */
    removeCommentsMain() {
        for (let i = 0; i < this.lineContent.length; i++) {
            this.lineContent[i] = this.lineContent[i].replace(/\/\*([\s\S]*?)\*\//g, '');

        }
        this.removeMultipleLineComments();
        for (let i = 0; i < this.lineContent.length; i++) {
            let newLine = this.removeComments(this.lineContent[i]);
            let numberOfUndefinedCurrencies = (this.lineContent[i].match(/\bundefined\b/g) || []).length;
            let newNumberOfUndefinedCurrencies = (newLine.match(/\bundefined\b/g) || []).length;
            if (numberOfUndefinedCurrencies == newNumberOfUndefinedCurrencies) {
                this.lineContent[i] = newLine;
            }
        }
    }

    /**
     * removeComments method that removes all the single line and multiline 
     * comments from a String and it returns the new string without the comments,
     * it also support comments inside string which are not comments
     * 
     * Remove single-line comments that contain would-be multi-line delimiters
     * E.g. // Comment /* <--
     * Remove multi-line comments that contain would be single-line delimiters
     * E.g. /* // <-- 
     * 
     * Don't Removes regex
     * 
     * Don't Removes string
     * 
     * Remove multi-line comments that have a replace ending (string/regex)
     * Greedy, so no inner strings/regex will stop it.
     * 
     * @param {String} str the string to remove the comments
     */
    removeComments(str) {
        var uid = '_' + +new Date(),
            primatives = [],
            primIndex = 0;
        return (
            str
            .replace(/(['"])(\\\1|.)+?\1/g, function (match) {
                primatives[primIndex] = match;
                return (uid + '') + primIndex++;
            })
            .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, function (match, $1, $2) {
                primatives[primIndex] = $2;
                return $1 + (uid + '') + primIndex++;
            })
            .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
            .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
            .replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')
            .replace(RegExp(uid + '(\\d+)', 'g'), function (match, n) {
                return primatives[n];
            })
        );
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
            let begin = this.lineContent[i].match(/(\/\*)/gm); // first /* found
            if (begin != null) {
                for (let j = 0; j < this.lineContent.length; j++) {
                    let end = this.lineContent[j].match(/(\*\/)/gm); //found */ end
                    if (end != null) {
                        for (let k = i; k < j + 1; k++) {
                            if (k == i) {
                                let FirstCharacterToRemove = this.lineContent[k].indexOf("/");
                                let firstLineToReplace = this.lineContent[k].substring(0, FirstCharacterToRemove);
                                this.lineContent[k] = firstLineToReplace;
                            } else if (k == j) {
                                let lastCharacterToRemove = this.lineContent[k].indexOf("*/");
                                let lastLineToReplace = this.lineContent[k].substring(lastCharacterToRemove + 2, this.lineContent[k].length + 1);
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