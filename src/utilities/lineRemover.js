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
     * First remove all the multiline comments in the same line
     * calls removeMultipleLineComments();
     * Then it calls the method removeComments 
     * which receives a single string and it does all the job.
     * This method is only a for with a method call.
     */
    removeCommentsMain() {
        // Remove multiline comments in the same line
        for (let i = 0; i < this.lineContent.length; i++) {
            this.lineContent[i] = this.lineContent[i].replace(/\/\*([\s\S]*?)\*\//g, '');
        }
        // Remove overall multiline comments
        this.removeMultipleLineComments();

        // Remove all single line comments
        for (let i = 0; i < this.lineContent.length; i++) {
            let newLine = this.removeComments(this.lineContent[i]);
            let newNumberOfUndefinedCurrencies = (newLine.match(/\bundefined\b/g) || []).length;
            //If it is a regex don't replace
            if (!(this.lineContent[i].indexOf("/") != -1 && this.lineContent[i].indexOf("/g") != -1 && this.lineContent[i].indexOf("/") < this.lineContent[i].indexOf("/g"))) {
                if (newNumberOfUndefinedCurrencies < 1) {
                    if (newLine.match(/\/\//g) == null) {
                        this.lineContent[i] = newLine;
                    } else if ((newLine.match(/\"/g) || []).length < 2) {
                        this.lineContent[i] = this.lineContent[i].replace(/([^:]|^)\/\/.*$/g, '');
                    }
                } else {
                    this.lineContent[i].replace(/\/\/.*/g, '');
                }
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
        this.lineContent = this.lineContent.join('\n');
        this.lineContent = this.lineContent.replace(/\/\*[\s\S]*?\*\//g, '');
        this.lineContent = this.lineContent.split('\n')
    }
}
module.exports = lineRemover;