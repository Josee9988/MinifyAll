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
    return this.cssContent.join('').replace(/\s+/g, ' ') // reduce any type of whitespace to a single space
      .replace(/\/\*(?:.| )*?(?:(?=(\/\*))|\*\/)/g, '$1').replace(/\/\*(?:.| )*?(?:(?=(\/\*))|\*\/)/g, '$1')
      .replace(/\/\*(?:.| )*?(?:(?=(\/\*))|\*\/)/g, '$1') // removes nested comments 2 levels deep... there is probably a better way to go about this, but this works
      .replace(/;? }/g, '}') // remove space (and semicolon if present) preceding }
      .replace(/ ?([;{}!,>]) ?| ([)])|([:(]) /g, '$1$2$3') // removes space before or after these chars
      .replace(/(\b0)(?:\.0+)?(?:r?e[mx]|p[xtc]|[chm]{2}|in|v(?:h|w|min|max)|%)/gi, '$1') // remove units from 0 that are allowed to be omitted
      .replace(/\b0(\.\d+)/g, '$1'); // remove any prefixed 0 from decimal values
  }
}

module.exports = cssMinifier;
