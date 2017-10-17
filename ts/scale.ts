/////////////////////////scale.js
"use strict";
import { Rezo } from './rezo'

import { MultiBulleArray, Menu, Multi, BulleArray, Bulle } from './index'

var scalBullFirstPo
var tempScaleArray: MultiBulleArray[] = []
export class Scale {
 static scaleBulle() {
    var selectedBulle = Rezo.selectedBulle;
    var startZoom =  (data: Bulle) =>{
        selectedBulle = Rezo.selectedBulle;

        data.data.originalEvent.preventDefault();
        data.dragging = true
        //upperScene.dragging = false;
        scalBullFirstPo = data.data.getLocalPosition(data.parent)
        if (Menu.multBool) {
            tempScaleArray = Multi.multiArray
        } else {
            tempScaleArray.push({
                bulle: selectedBulle,
                loc: {
                    x: selectedBulle.x,
                    y: selectedBulle.y
                },
                links: [],
                linksIndex: []
            })
        }
    }
    var sensorScaleBulleScene = Rezo.sensorScaleBulleScene
    sensorScaleBulleScene.on("touchstart", startZoom);
    var stopZoom =  (data: Bulle)=> {
        data.dragging = false;
        tempScaleArray = []
    }
    sensorScaleBulleScene.on("touchend", stopZoom);
    sensorScaleBulleScene.on("touchendouside", stopZoom);
    var zoomTouch =  (data: Bulle)=> {
        if (data.dragging && Menu.selectBool == false) {

            var newPosition = data.data.getLocalPosition(data.parent);

            if (newPosition.y < scalBullFirstPo.y) {
                for (var i = 0; i < tempScaleArray.length; i++) {
                    tempScaleArray[i].bulle.scale.x *= 1.03;
                    tempScaleArray[i].bulle.scale.y *= 1.03;
                }
            } else {
                for (var i = 0; i < tempScaleArray.length; i++) {
                    tempScaleArray[i].bulle.scale.x /= 1.03;
                    tempScaleArray[i].bulle.scale.y /= 1.03;
                }
            }

        }
    }
    sensorScaleBulleScene.on("touchmove", zoomTouch);
    sensorScaleBulleScene.interactive = false
}
static scaleBulleScroll(scrollEvent) {
    if (Menu.multBool) {
        tempScaleArray = Multi.multiArray;
    } else {
        tempScaleArray.push({
            bulle: Rezo.selectedBulle,
            loc: {
                x: Rezo.selectedBulle.x,
                y: Rezo.selectedBulle.y
            },
            links: [],
            linksIndex: []
        });
    }
    if (scrollEvent.deltaY < 0) {
        for (var i = 0; i < tempScaleArray.length; i++) {
            tempScaleArray[i].bulle.scale.x /= 1.1
            tempScaleArray[i].bulle.scale.y /= 1.1
        }
    } else {
        for (var i = 0; i < tempScaleArray.length; i++) {
            tempScaleArray[i].bulle.scale.x *= 1.1
            tempScaleArray[i].bulle.scale.y *= 1.1
        }
    }
    tempScaleArray = []
}
 static scaleBullePlus(bulleToScale) {
    bulleToScale.scale.x *= 1.5
    bulleToScale.scale.y *= 1.5
}
 static scaleBulleMoins(bulleToScale) {
    bulleToScale.scale.x /= 1.5
    bulleToScale.scale.y /= 1.5
}

static scaleBulleTouch() {
    var stage = Rezo.stage;
    if (Menu.scalBool) {
        Rezo.sensorScaleBulleScene.interactive = true;
        Rezo.upperScene.interactive = false;
        Rezo.sensorZoomScene.interactive = false;
        stage.swapChildren(stage.sensorZoomScene, stage.sensorScaleBulleScene)
    } else {
        Rezo.sensorScaleBulleScene.interactive = false
        Rezo.upperScene.interactive = true;
        Rezo.sensorZoomScene.interactive = true;


        stage.swapChildren(stage.sensorZoomScene, stage.sensorScaleBulleScene)
    }
}
 static multiScaleBullePlus(scaleMultiArray: BulleArray[]) {
    for (var i = 0; i < scaleMultiArray.length; i++) {
        Scale.scaleBullePlus(scaleMultiArray[i].bulle)
    }
}
 static multiScaleBulleMoins(scaleMultiArray: BulleArray[]) {
    for (var i = 0; i < scaleMultiArray.length; i++) {
        Scale.scaleBulleMoins(scaleMultiArray[i].bulle)
    }
}
}