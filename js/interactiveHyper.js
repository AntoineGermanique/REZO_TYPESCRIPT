///////interactiveHyper.js
function hyperInteractiveFun() {
    var dragStart = function (data) {
        this.dragging = true;
        selectHyperFun(this, data);
    };
    hyperHandler.on("mousedown", dragStart);
    hyperHandler.on("touchstart", dragStart);
    var dragStop = function (data) {
        releaseHyper(this);
    };
    hyperHandler.on("mouseup", dragStop);
    hyperHandler.on("mouseupoutside", dragStop);
    hyperHandler.on("touchend", dragStop);
    hyperHandler.on("touchendoutside", dragStop);
    var drag = function (data) {
        dragHyper(this);
    };
    hyperHandler.on("mousemove", drag);
    hyperHandler.on("touchmove", drag);
}
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