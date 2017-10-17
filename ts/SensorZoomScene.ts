//SensorZoomScene.ts : in charge of first touch tracking when squeeze zoom 
//contains down hierarchie of scenes

import {UpperScene} from './index'

export class SensorZoomScene extends PIXI.Graphics {
    upperScene: UpperScene;
    dragging: boolean;
    data: any
}