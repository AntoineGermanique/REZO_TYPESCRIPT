///////////// interactiveBulle.js
"use strict";
var lastBulleSelected;
var dataFake;
var startDragBulle;
var stopDragBulle;
function dragBulle() {
    startDragBulle = function (data) {
        var bulle;
        if (multBool) {
            if (!data) {
                data = { data: dataFake };
            }
            bulle = data.data.target;
            if (bulle == null)
                bulle = data.target;
            selectBulleFun(bulle, data);
            multiSelect(bulle);
        }
        else {
            if (data == undefined) {
                data = { data: dataFake };
            }
            bulle = data.data.target;
            if (bulle == null)
                bulle = data.target;
            selectBulleFun(bulle, data);
            bulle.dragging = true;
            lastSelectedBulleFun();
            linkSelection(bulle);
            Link.linkFun();
        }
    };
    this.on("mousedown", startDragBulle);
    this.on("touchstart", startDragBulle);
    // set the events for when the mouse is released or a touch is released
    stopDragBulle = function (data) {
        if (multBool) {
        }
        else {
            if (!data) {
                data = { data: dataFake };
            }
            var bulle = data.data.target;
            if (bulle == null)
                bulle = data.target;
            releaseBulle(bulle);
        }
    };
    this.on("mouseup", stopDragBulle);
    this.on("mouseupoutside", stopDragBulle);
    this.on("touchend", stopDragBulle);
    this.on("touchendoutside", stopDragBulle);
    // set the callbacks for when the mouse or a touch moves
    var drag = function (data) {
        if (multBool) {
        }
        else if (this.dragging) {
            bulleDragging(this);
        }
    };
    this.on("mousemove", drag);
    this.on("touchmove", drag);
}
function selectBulleFun(clickedBulle, data) {
    data.data.originalEvent.preventDefault();
    if (data.stopPropagation) {
        data.stopPropagation();
    }
    var selectedBulle = Rezo.selectedBulle;
    clickedBulle.data = data;
    //upperScene.dragging = false;
    if (selectedBulle != clickedBulle) {
        lastBulleSelected = selectedBulle;
    }
    Rezo.selectedBulle = clickedBulle;
    selectedBulle = Rezo.selectedBulle;
    circleSize = bulleSize(selectedBulle);
    circleColor = selectedBulle.shape.rezoColor;
    if (selectedBulle.lineAlpha == 0) {
        selectedBulle.lineStyle(16, circleColor, 0.5);
        selectedBulle.drawCircle(0, 0, circleSize);
        if (circleColor == 0xffffff) {
            selectedBulle.lineStyle(16, 0x000000, 0.5);
            selectedBulle.drawCircle(0, 0, circleSize);
        }
    }
    else {
        selectedBulle.clear();
        selectedBulle.lineStyle(16, circleColor, 0.5);
        selectedBulle.drawCircle(0, 0, circleSize);
        if (circleColor == 0xffffff) {
            selectedBulle.lineStyle(16, 0x000000, 0.5);
            selectedBulle.drawCircle(0, 0, circleSize);
        }
    }
}
function lastSelectedBulleFun() {
    if (lastBulleSelected) {
        lastBulleSelected.clear();
        lastBulleSelected.lineAlpha = 0;
    }
}
function releaseBulle(releasedBulle) {
    //var positionTemp = releasedBulle.data.getLocalPosition(releasedBulle.parent)
    releasedBulle.dragging = false;
    releasedBulle.data = null;
    clearMotion();
}
function bulleDragging(draggedBulle) {
    if (draggedBulle.dragging && Link.linkBool == false) {
        var newPosition = draggedBulle.data.data.getLocalPosition(draggedBulle.parent);
        draggedBulle.position.x = newPosition.x;
        draggedBulle.position.y = newPosition.y;
        motion(newPosition.x, newPosition.y);
    }
}
function fakeClickFun(fakeBulle) {
    dataFake = new PIXI.interaction.InteractionData();
    dataFake.target = fakeBulle;
    // dataFake.target=multiArray[multiArray.length-1]
    var evt = new MouseEvent("mousedown", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 20,
    });
    dataFake.originalEvent = evt;
    startDragBulle();
    stopDragBulle();
    //document.dispatchEvent(dataFake);
}
//# sourceMappingURL=interactiveBulle.js.map