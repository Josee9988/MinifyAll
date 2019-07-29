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
     * @return {Array} the line compressed
     */
    getLineRemoved() {
        return this.lineContent;
    }

    removeCommentsMain() {
        for (let i = 0; i < this.lineContent.length; i++) {
            this.lineContent[i] = this.removeComments(this.lineContent[i]);
        }
    }

    removeComments(str) {
        for (let i = 0; i < this.lineContent.length; i++) {

        }
        var uid = '_' + +new Date(),
            primatives = [],
            primIndex = 0;

        return (
            str
            /* Remove strings */
            .replace(/(['"])(\\\1|.)+?\1/g, function (match) {
                primatives[primIndex] = match;
                return (uid + '') + primIndex++;
            })

            /* Remove Regexes */
            .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, function (match, $1, $2) {
                primatives[primIndex] = $2;
                return $1 + (uid + '') + primIndex++;
            })

            /*
            - Remove single-line comments that contain would-be multi-line delimiters
                E.g. // Comment /* <--
            - Remove multi-line comments that contain would be single-line delimiters
                E.g. /* // <-- 
           */
            .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')

            /*
            Remove single and multi-line comments,
            no consideration of inner-contents
           */
            .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')

            /*
            Remove multi-line comments that have a replace ending (string/regex)
            Greedy, so no inner strings/regexes will stop it.
           */
            .replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')

            /* Bring back strings & regexes */
            .replace(RegExp(uid + '(\\d+)', 'g'), function (match, n) {
                return primatives[n];
            })
        );

    }
}
module.exports = lineRemover;