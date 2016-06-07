/////////////////////////scale.js
"use strict";
var scalBullFirstPo;
var tempScaleArray = [];
function scaleBulle() {
    var startZoom = function (data) {
        data.originalEvent.preventDefault();
        this.dragging = true;
        //upperScene.dragging = false;
        scalBullFirstPo = data.getLocalPosition(this.parent);
        if (multBool) {
            tempScaleArray = multiArray;
        }
        else {
            tempScaleArray.push([selectedBulle]);
        }
    };
    sensorScaleBulleScene.on("touchstart", startZoom);
    var stopZoom = function (data) {
        this.dragging = false;
        tempScaleArray = [];
    };
    sensorScaleBulleScene.on("touchend", stopZoom);
    sensorScaleBulleScene.on("touchendouside", stopZoom);
    var zoomTouch = function (data) {
        if (this.dragging && drawBool == false) {
            var newPosition = data.getLocalPosition(this.parent);
            if (newPosition.y < scalBullFirstPo.y) {
                for (var i = 0; i < tempScaleArray.length; i++) {
                    tempScaleArray[i][0].scale.x *= 1.03;
                    tempScaleArray[i][0].scale.y *= 1.03;
                }
            }
            else {
                for (var i = 0; i < tempScaleArray.length; i++) {
                    tempScaleArray[i][0].scale.x /= 1.03;
                    tempScaleArray[i][0].scale.y /= 1.03;
                }
            }
        }
    };
    sensorScaleBulleScene.on("touchmove", zoomTouch);
    sensorScaleBulleScene.interactive = false;
}
function scaleBulleScroll(scrollEvent) {
    if (multBool) {
        tempScaleArray = multiArray;
    }
    else {
        tempScaleArray.push([selectedBulle]);
    }
    if (scrollEvent.deltaY < 0) {
        for (var i = 0; i < tempScaleArray.length; i++) {
            tempScaleArray[i][0].scale.x /= 1.1;
            tempScaleArray[i][0].scale.y /= 1.1;
        }
    }
    else {
        for (var i = 0; i < tempScaleArray.length; i++) {
            tempScaleArray[i][0].scale.x *= 1.1;
            tempScaleArray[i][0].scale.y *= 1.1;
        }
    }
    tempScaleArray = [];
}
function scaleBullePlus(bulleToScale) {
    bulleToScale.scale.x *= 1.5;
    bulleToScale.scale.y *= 1.5;
}
function scaleBulleMoins(bulleToScale) {
    bulleToScale.scale.x /= 1.5;
    bulleToScale.scale.y /= 1.5;
}
function scaleBulleTouch() {
    if (scalBool) {
        sensorScaleBulleScene.interactive = true;
        stage.swapChildren(sensorZoomScene, sensorScaleBulleScene);
    }
    else {
        sensorScaleBulleScene.interactive = false;
        stage.swapChildren(sensorZoomScene, sensorScaleBulleScene);
    }
}
function multiScaleBullePlus(scaleMultiArray) {
    for (var i = 0; i < scaleMultiArray.length; i++) {
        scaleBullePlus(scaleMultiArray[i][0]);
    }
}
function multiScaleBulleMoins(scaleMultiArray) {
    for (var i = 0; i < scaleMultiArray.length; i++) {
        scaleBulleMoins(scaleMultiArray[i][0]);
    }
}
//# sourceMappingURL=scale.js.map