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

}
module.exports = jsonMinifier;