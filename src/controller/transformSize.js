/**
 * @file file that contains the function transformSize.
 *
 * @since 1.9.1
 * @author Jose Gracia Berenguer
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

/**
 * Summary receives an int (number of bytes) and
 * transform its value to KB, OR MB.
 *
 * Description it receives a size in Bytes and it will return a String
 * with the number of Bytes, KiloBytes or MegaBytes + 'B' or 'KB' or 'MB'.
 *
 * @access private
 *
 * @param {number} size A number in bytes.
 *
 * @return {String} the new value in KB, MB or in Bytes
 */
function transformSize(size) {
    if (size >= 1048576)
        return `${Math.floor(size / 10485.76) / 100} Mb`;
    if (size >= 1024)
        return `${Math.floor(size / 10.24) / 100} Kb`;
    return `${size} b`;
}


exports.transformSize = transformSize;
