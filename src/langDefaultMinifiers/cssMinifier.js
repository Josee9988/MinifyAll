/**
 * @file That is called when the user minifies a CSS document
 * This file receives the CSS document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll
 */
class cssMinifier {
    /**
     * Summary Minifier constructor that receives the content.
     * 
     * Description this is the constructor of the class and it 
     * will receive an array with the content and it will assign it
     * to a private variable that will be used later on.
     * 
     * @access public
     * 
     * @param {Array} cssContent all the code that will be minified.
     */
    constructor(cssContent) {
        this.cssContent = cssContent;
    }

    /**
     * Summary getCssMinified finds lasts spaces and 
     * trim it into just one line.
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
    getCssMinified() {
        return this.cssContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '').replace(/ {/g, '{').replace(/[\t]/g, '').replace(/#/g, ' #').replace(/\s{2}/g, '')
            .replace(/ \#/g, '#').replace(/\s\s/g, ' ').replace(/\s\}/g, '}').replace(/\s\;/g, ';').replace(/\:\s/g, ':')
            .replace(/\s\)/g, ')').replace(/\)\s/g, ')')
            .replace(/\s\(/g, '(').replace(/\)\s/g, '(')
            .replace(/\s\!/g, '!')
            .replace(/\s\,/g, ',').replace(/\,\s/g, ',')
            .replace(/[:](0px)/g, ':0');
    }

}

module.exports = cssMinifier;