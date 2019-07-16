/**
 * @file That is called for transforming the
 * size of a document. receives in bytes
 * @author Jose Gracia Berenguer
 * @since 0.5.5
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll
 */

class sizeTransform {
    /**
     * sizeTransform transforms from byte to SI
     */
    constructor() {}

    /**
     * transformSize receives an int and transform its value to KB, OR MB
     * @param {number} size 
     */
    transformSize(size) {
        if (size >= 1048576) return `${Math.floor(size / 10485.76) / 100} MB`;
        else if (size >= 1024) return `${Math.floor(size / 10.24) / 100} KB`;
        else return `${size} B`;
    }


}
module.exports = sizeTransform;