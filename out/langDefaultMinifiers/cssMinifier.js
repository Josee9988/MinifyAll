"use strict";
class CssMinifier {
    constructor(cssContent) {
        this.cssContent = cssContent;
    }
    getCssMinified() {
        return this.cssContent.join('').replace(/\s+/g, ' ')
            .replace(/\/\*(?:.| )*?(?:(?=(\/\*))|\*\/)/g, '$1').replace(/\/\*(?:.| )*?(?:(?=(\/\*))|\*\/)/g, '$1')
            .replace(/\/\*(?:.| )*?(?:(?=(\/\*))|\*\/)/g, '$1')
            .replace(/;? }/g, '}')
            .replace(/ ?([;{}!,>]) ?| ([)])|([:(]) /g, '$1$2$3')
            .replace(/(\b0)(?:\.0+)?(?:r?e[mx]|p[xtc]|[chm]{2}|in|v(?:h|w|min|max)|%)/gi, '$1')
            .replace(/\b0(\.\d+)/g, '$1');
    }
}
module.exports = CssMinifier;
//# sourceMappingURL=cssMinifier.js.map