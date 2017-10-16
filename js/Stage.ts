//Stage.ts highest container, renderer PIXI.js
import { SensorZoomScene } from './'

export class Stage extends PIXI.Container {
    sensorZoomScene: SensorZoomScene;
    sensorZoomScene2: SensorZoomScene;
    sceneDraw: PIXI.Graphics;
    sensorScaleBulleScene: PIXI.Graphics;

}