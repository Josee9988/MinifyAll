/**
 * @file That is called when the user minifies a css document
 * This file receives the css document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.1.0
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */
class cssMinifier {
    /**
     * Minifier constructor that maps and trims the code.
     * @param {Array} cssContent all the code that will be minified 
     */
    constructor(cssContent) {
        this.cssContent = cssContent.map(content => content.trim());
    }

    /**
     * getCssMinified finds lasts spaces and trim it into just one line
     * @return {String} the line compressed
     */
    getCssMinified() {
        return this.cssContent.join('').replace(/;\}|\s+}/g, '}').replace(/\/\*.*?\*\//g, '').replace(/ {/g, '{').replace(/[\t]/g, '').replace(/#/g, ' #').replace(/\s{2}/g, '').replace(/px/ig, 'px ').replace(/keyframes/g, 'keyframes ');
    }

}

module.exports = cssMinifier;