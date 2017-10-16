/////////////////////////scale.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
var scalBullFirstPo;
var tempScaleArray = [];
class Scale {
    static scaleBulle() {
        var selectedBulle = _1.Rezo.selectedBulle;
        var startZoom = (data) => {
            selectedBulle = _1.Rezo.selectedBulle;
            data.data.originalEvent.preventDefault();
            data.dragging = true;
            //upperScene.dragging = false;
            scalBullFirstPo = data.data.getLocalPosition(data.parent);
            if (_1.Menu.multBool) {
                tempScaleArray = _1.Multi.multiArray;
            }
            else {
                tempScaleArray.push({
                    bulle: selectedBulle,
                    loc: {
                        x: selectedBulle.x,
                        y: selectedBulle.y
                    },
                    links: [],
                    linksIndex: []
                });
            }
        };
        var sensorScaleBulleScene = _1.Rezo.sensorScaleBulleScene;
        sensorScaleBulleScene.on("touchstart", startZoom);
        var stopZoom = (data) => {
            data.dragging = false;
            tempScaleArray = [];
        };
        sensorScaleBulleScene.on("touchend", stopZoom);
        sensorScaleBulleScene.on("touchendouside", stopZoom);
        var zoomTouch = (data) => {
            if (data.dragging && _1.Menu.selectBool == false) {
                var newPosition = data.data.getLocalPosition(data.parent);
                if (newPosition.y < scalBullFirstPo.y) {
                    for (var i = 0; i < tempScaleArray.length; i++) {
                        tempScaleArray[i].bulle.scale.x *= 1.03;
                        tempScaleArray[i].bulle.scale.y *= 1.03;
                    }
                }
                else {
                    for (var i = 0; i < tempScaleArray.length; i++) {
                        tempScaleArray[i].bulle.scale.x /= 1.03;
                        tempScaleArray[i].bulle.scale.y /= 1.03;
                    }
                }
            }
        };
        sensorScaleBulleScene.on("touchmove", zoomTouch);
        sensorScaleBulleScene.interactive = false;
    }
    static scaleBulleScroll(scrollEvent) {
        if (_1.Menu.multBool) {
            tempScaleArray = _1.Multi.multiArray;
        }
        else {
            tempScaleArray.push({
                bulle: _1.Rezo.selectedBulle,
                loc: {
                    x: _1.Rezo.selectedBulle.x,
                    y: _1.Rezo.selectedBulle.y
                },
                links: [],
                linksIndex: []
            });
        }
        if (scrollEvent.deltaY < 0) {
            for (var i = 0; i < tempScaleArray.length; i++) {
                tempScaleArray[i].bulle.scale.x /= 1.1;
                tempScaleArray[i].bulle.scale.y /= 1.1;
            }
        }
        else {
            for (var i = 0; i < tempScaleArray.length; i++) {
                tempScaleArray[i].bulle.scale.x *= 1.1;
                tempScaleArray[i].bulle.scale.y *= 1.1;
            }
        }
        tempScaleArray = [];
    }
    static scaleBullePlus(bulleToScale) {
        bulleToScale.scale.x *= 1.5;
        bulleToScale.scale.y *= 1.5;
    }
    static scaleBulleMoins(bulleToScale) {
        bulleToScale.scale.x /= 1.5;
        bulleToScale.scale.y /= 1.5;
    }
    static scaleBulleTouch() {
        var stage = _1.Rezo.stage;
        if (_1.Menu.scalBool) {
            _1.Rezo.sensorScaleBulleScene.interactive = true;
            _1.Rezo.upperScene.interactive = false;
            _1.Rezo.sensorZoomScene.interactive = false;
            stage.swapChildren(stage.sensorZoomScene, stage.sensorScaleBulleScene);
        }
        else {
            _1.Rezo.sensorScaleBulleScene.interactive = false;
            _1.Rezo.upperScene.interactive = true;
            _1.Rezo.sensorZoomScene.interactive = true;
            stage.swapChildren(stage.sensorZoomScene, stage.sensorScaleBulleScene);
        }
    }
    static multiScaleBullePlus(scaleMultiArray) {
        for (var i = 0; i < scaleMultiArray.length; i++) {
            Scale.scaleBullePlus(scaleMultiArray[i].bulle);
        }
    }
    static multiScaleBulleMoins(scaleMultiArray) {
        for (var i = 0; i < scaleMultiArray.length; i++) {
            Scale.scaleBulleMoins(scaleMultiArray[i].bulle);
        }
    }
}
exports.Scale = Scale;
