"use strict";
///////interactiveHyper.js
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
function hyperInteractiveFun() {
    var dragStart = function (data) {
        this.dragging = true;
        selectHyperFun(this, data);
    };
    _1.Hyper.hyperHandler.on("mousedown", dragStart);
    _1.Hyper.hyperHandler.on("touchstart", dragStart);
    var dragStop = () => {
        releaseHyper(this);
    };
    _1.Hyper.hyperHandler.on("mouseup", dragStop);
    _1.Hyper.hyperHandler.on("mouseupoutside", dragStop);
    _1.Hyper.hyperHandler.on("touchend", dragStop);
    _1.Hyper.hyperHandler.on("touchendoutside", dragStop);
    var drag = () => {
        dragHyper(this);
    };
    _1.Hyper.hyperHandler.on("mousemove", drag);
    _1.Hyper.hyperHandler.on("touchmove", drag);
}
exports.hyperInteractiveFun = hyperInteractiveFun;
function selectHyperFun(clickedHyper, data) {
    data.data.originalEvent.preventDefault();
    data.stopPropagation();
    clickedHyper.data = data;
    //upperScene.dragging = false;
}
function releaseHyper(releasedHyper) {
    releasedHyper.dragging = false;
    releasedHyper.data = null;
}
function dragHyper(draggedHyper) {
    if (draggedHyper.dragging) {
        var newPosition = draggedHyper.data.data.getLocalPosition(draggedHyper.parent.parent);
        draggedHyper.parent.position.x = newPosition.x;
        draggedHyper.parent.position.y = newPosition.y;
    }
}
//# sourceMappingURL=interactiveHyper.js.map