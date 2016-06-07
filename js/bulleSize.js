/////////////bulleSize.js
"use strict";
function bulleSize(bulleToSize) {
    var toSize = bulleToSize.getChildAt(0);
    var rawSize = toSize.width;
    var lineSize = toSize.lineWidth;
    var size = (rawSize - lineSize) / 2;
    return size;
}
//# sourceMappingURL=bulleSize.js.map