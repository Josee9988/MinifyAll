/**
 * @file That is called for performing comment removing
 * removes // and / * * / comments
 * @author Jose Gracia Berenguer
 * @since 0.2.2
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

class commentRemover {
  /**
   * Summary Minifier constructor that maps and trims the code.
   *
   * @access public
   *
   * @param {Array} lineContent all the code that will be minified.
   */
  constructor(lineContent) {
    this.lineContent = lineContent;
  }

  /**
   * Summary getLineRemoved finds lasts spaces and trim it into just one line.
   *
   * @access public
   *
   * @return {Array} the line minified.
   */
  getCommentsRemoved() {
    return this.lineContent;
  }

  /**
   * Summary main method that perform all the tasks to remove comments.
   *
   * Description removeCommentsMain method that is called when
   * you want to remove the comments from the array of lines
   * First remove all the multiline comments in the same line
   * calls removeComments.
   * Then it calls the method removeComments
   * which receives a single string and it does all the job;
   * This method is only a for with a method call.
   *
   * @access public
   */
  removeCommentsMain() {
    // Remove multiline comments in the same line
    for (let i = 0; i < this.lineContent.length; i++) {
      this.lineContent[i] = this.lineContent[i].replace(/\/\*([\s\S]*?)\*\//g, '');
    }

    this.lineContent = this.removeComments(this.lineContent.join('\n'));

    this.lineContent = this.lineContent.split('\n');
  }

  /**
   * Summary removes most of the '//' comments.
   *
   * Description removeComments method that removes all the single line and multiline
   * comments from a String and it returns the new string without the comments,
   * it also support comments inside string which are not comments
   *
   * Remove single-line comments that contain would-be multi-line delimiters
   * Example // Comment /* <--
   * Remove multi-line comments that contain would be single-line delimiters
   * Example /* // <--
   *
   * Don't Removes regex
   *
   * Don't Removes string
   *
   * Remove multi-line comments that have a replace ending (string/regex)
   * Greedy, so no inner strings/regex will stop it.
   *
   * @access private
   *
   * @param {String} str the string to remove the comments.
   */
  removeComments(str) {
    const uid = `_${+new Date()}`;
    const primatives = [];
    let primIndex = 0;
    return (
      str
      .replace(/(['"])(\\\1|.)+?\1/g, (match) => {
        primatives[primIndex] = match;
        return `${uid}${primIndex++}`;
      })
      .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, (match, $1, $2) => {
        primatives[primIndex] = $2;
        return `${$1}${uid}${primIndex++}`;
      })
      .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
      .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
      .replace(RegExp(`\\/\\*[\\s\\S]+${uid}\\d+`, 'g'), '')
      .replace(RegExp(`${uid}(\\d+)`, 'g'), (match, n) => primatives[n])
    );
  }
}
module.exports = commentRemover;
