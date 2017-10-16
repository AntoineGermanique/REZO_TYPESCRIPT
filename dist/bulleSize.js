/////////////bulleSize.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bulleSize(bulleToSize) {
    var toSize = bulleToSize.getChildAt(0);
    var rawSize = toSize.width;
    var lineSize = toSize.lineWidth;
    var size = (rawSize - lineSize) / 2;
    return size;
}
exports.bulleSize = bulleSize;
//# sourceMappingURL=bulleSize.js.map