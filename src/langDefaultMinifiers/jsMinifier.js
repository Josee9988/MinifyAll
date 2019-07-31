/**
 * @file That is called when the user minifies a JavaScript document
 * This file receives the JavaScript document and returns the minified one.
 * @author Jose Gracia Berenguer
 * @since 0.9.0
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll
 */

class jsMinifier {
    /**
     * Summary Minifier constructor that maps and trims the code.
     * 
     * @access public
     * 
     * @param {Array} jsContent all the code that will be minified 
     */
    constructor(jsContent) {
        this.jsContent = jsContent.map(content => content.trim());
    }

    /**
     * Summary getJsMinified finds lasts spaces and trim it into just one line
     * removes all kind of spaces.
     * 
     * @access public
     * 
     * @return {String} the line minified
     */
    getJsMinified() {
        return this.jsContent.join('\n').replace(/;\}|\s+}/g, '}').replace(/:\s/g, ':').replace(/\s{/g, '{')
            .replace(/[\t]/g, '').replace(/\s{2}/g, '').replace(/}[\n]*\n/igm, '}').replace(/{[\n]*\n/igm, '{').replace(/:[\n]*\n/igm, ':')
            .replace(/;[\n]*\n/igm, ';').replace(/,\n/gm, ',').replace(/\|\|[\n]*\n/gm, '||').replace(/\&\&[\n]*\n/gm, '&&').replace(/\s=\s/g, '=')
            .replace(/\s=/g, '=').replace(/=\s/g, '=').replace(/\bcase\b /g, 'case').replace(/\bswitch\b /g, 'switch')
            .replace(/\bif\b\s/g, 'if').replace(/&&\s/g, '&&').replace(/\s&&/g, '&&')
            .replace(/\s\|\| /g, '||').replace(/==\s/g, '==').replace(/\|\|\s/g, '||').replace(/\s==/g, '==').replace(/\s\|\|/g, '||')
            .replace(/\s\?/g, '?').replace(/\?\s/g, '?').replace(/\s\?/g, '?')
            .replace(/\s\+/g, '+').replace(/\+\s/g, '+').replace(/\s\+/g, '+')
            .replace(/\s\</g, '<').replace(/\<\s/g, '<').replace(/\s\</g, '<')
            .replace(/\s\>/g, '>').replace(/\>\s/g, '>').replace(/\s\>/g, '>')
            .replace(/\s\,/g, ',').replace(/\,\s/g, ',').replace(/\s\,/g, ',')
            .replace(/\s\+/g, '+').replace(/\+\s/g, '+').replace(/\s\+/g, '+')
            .replace(/\s\-/g, '-').replace(/\-\s/g, '-').replace(/\s\-/g, '-')
            .replace(/\s\!\=/g, '!=').replace(/\!\= /g, '!=').replace(/\s\!\=/g, '!=')
            .replace(/\s\!\=\=/g, '!==').replace(/\!\=\=\s/g, '!==').replace(/\s\!\=\=/g, '!==');
    }
}
module.exports = jsMinifier;