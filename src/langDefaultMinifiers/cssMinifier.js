/**
 * @file That is called when the user minifies a CSS document
 * This file receives the CSS document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
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
        return this.cssContent.join('').replace(/;?\s*}/g, '}') //reduce any whitespace preceding } and remove semicolon if present
            .replace(/\/\*(?:.|\s)*?(?:(?=(\/\*))|\*\/)/g, '$1').replace(/\/\*(?:.|\s)*?(?:(?=(\/\*))|\*\/)/g, '$1').replace(/\/\*(?:.|\s)*?(?:(?=(\/\*))|\*\/)/g, '$1') // removes nested comments 2 levels deep... there is probably a better way to go about this, but this works
            .replace(/\s+/g, ' ') //reduce any type of whitespace to a single space
            .replace(/[\t]/g, '') // the previous version for parsing # had incorrectly removed spaces between CSS selectors that use IDs 
            .replace(/ ?([;(){}!,>]) ?/g, '$1') // removes space before or after these chars
            .replace(/: /g, ':') //not included in prev line to avoid conflicts with CSS selectors for space before :
            .replace(/:0(?!ms|s)[a-z%]+?([;}])/gi, ':0$1') //remove units from 0, unless it is ms or s for CSS transitions
            .replace(/:0(\.\d+)/g,':$1'); //remove any prefixed 0 from decimal values
    }

}

module.exports = cssMinifier;
