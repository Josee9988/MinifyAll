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
     * Summary Minifier constructor that maps and trims the code.
     * 
     * @access public
     * 
     * @param {Array} cssContent all the code that will be minified.
     */
    constructor(cssContent) {
        this.cssContent = cssContent.map(content => content.trim());
    }

    /**
     * Summary getCssMinified finds lasts spaces and trim it into just one line.
     * 
     * @access public
     * 
     * @return {String} the line minified.
     */
    getCssMinified() {
        return this.cssContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '').replace(/ {/g, '{').replace(/[\t]/g, '').replace(/#/g, ' #').replace(/\s{2}/g, '').replace(/px/ig, 'px ').replace(/keyframes/g, 'keyframes ')
            .replace(/ \#/g, '#').replace(/\s\s/g, ' ').replace(/\s\}/g, '}').replace(/\s\;/g, ';').replace(/\:\s/g, ':')
            .replace(/\s\)/g, ')').replace(/\)\s/g, ')')
            .replace(/\s\(/g, '(').replace(/\)\s/g, '(')
            .replace(/\s\!/g, '!')
            .replace(/\s\,/g, ',').replace(/\,\s/g, ',')
            .replace(/[:](0px)/g, ':0');
    }

}

module.exports = cssMinifier;