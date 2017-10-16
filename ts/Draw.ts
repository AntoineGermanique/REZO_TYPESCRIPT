//class draw, to draw stuff...
import {
    Loc,
    SceneDraw,
    Path, 
    Bezier, 
    Bulle
    
} from './'


export let sceneDraw: SceneDraw;

export class Draw extends PIXI.Graphics {
    _path: Loc[] = [];
    _polyPath: number[] = [];
    _recoPath: Path[] = [];
    _timeStamp: number[]=[];
    _bmp: PIXI.Sprite;
    constructor(loc: Loc, timeStamp?: number, isPolygon?: boolean) {
        super();
        if (!isPolygon) {
            this._path.push(loc);
            //this._timeStamp.push(timeStamp)
        } else {
            this._polyPath.push(loc.x);
            this._polyPath.push(loc.y);
            this._timeStamp.push(timeStamp)
        }
    }
    addPolyPathPoint(x: number, y: number, timeStamp: number) {
        this._polyPath.push(x);
        this._polyPath.push(y);
        this._timeStamp.push(timeStamp)

    }
    addPathPointLoc(loc: Loc, timeStamp: number): void {
        this._path.push(loc);
        this._timeStamp.push(timeStamp)

    }
    addPathPoint(x: number, y: number, timeStamp: number) {
        var loc: Loc = {
            x: x,
            y: y
        };
        this._path.push(loc);
        this._timeStamp.push(timeStamp)

    }
    getTimeStamps(): number[] {
        return this._timeStamp;
    }
    getPath(): Loc[] {
        return this._path;
    }
    getPathNumber(): number[] {
        return this._polyPath;
    }
    getLastPoint(): Loc {
        if (this._path[this._path.length-1])
            return this._path[this._path.length-1];
        return null;
    };
    getPreviousPoint(): Loc {
        if (this._path[this._path.length-2])
            return this._path[this._path.length-2]
        return null
    };
    setPath(path: Loc[]): void {
        this._path = path;
    }
    setPathNumber(path: number[]): void {
        this._polyPath = path;
    }
    drawLine() {
        var bezier = new Bezier();

        bezier.drawQuadraticCurve(this.getPath(), this)
        //this.lineStyle(2, 0x000000, 1);

        //this.moveTo(this._path[0].x, this._path[0].y+100)
        //for (var i = 1; i < this._path.length; i++) {
        //    this.lineTo(this._path[i].x, this._path[i].y+100)
        //}
    }

    drawPoly() {
        this.clear();
        this.beginFill(Bulle.bulleColor);
        this.drawPolygon(this._polyPath);
        this.endFill();

    }
    setRecoPath(path: Loc[], timeStamp: number[]): void {
        path = this.makePathUint(path);
        var pathPath: Array<Loc[]> = [];
        var sliceTimeStamp:Array<number[]>=[]
        var counter = 0;
        for (var i = 1; i < path.length; i++) {
            var pathX;
            var pathY;
            var loc1 = path[i - 1];
            var loc2 = path[i];
            if (loc1.x == loc2.x && loc1.y == loc2.y) {
                var tempPath = path.slice(counter, i);
                var tempTimeStamp = timeStamp.slice(counter, i);
                sliceTimeStamp.push(tempTimeStamp);
                pathPath.push(tempPath);
                counter = i;
            }
        }
        sliceTimeStamp.push(tempTimeStamp);
        pathPath.push(path.slice(counter, i));
        for (var i = 0; i < pathPath.length; i++){
            var slicedPath = pathPath[i];
            var slicedPathX = [];
            var slicedPathY = [];
            var slicedPathT = [];
            var slicedPathXYT: Path = { x: null, y: null, t: null };
            for (var j = 0; j < slicedPath.length; j++) {
                slicedPathX.push(slicedPath[j].x);
                slicedPathY.push(slicedPath[j].y);
            }
            slicedPathXYT.x = slicedPathX;
            slicedPathXYT.y = slicedPathY;
            slicedPathXYT.t = sliceTimeStamp[i];
            this._recoPath.push(slicedPathXYT);
        }
    }
    makePathUint(path: Loc[]): Loc[]{
        var minX = 0;
        var minY = 0;
        for (var i = 0; i < path.length; i++) {
            minX = (minX > path[i].x) ? path[i].x : minX;
            minY = (minY > path[i].y) ? path[i].y : minY;
        }
        minX = minX * (-1);
        minY = minY * (-1);
        for (var i = 0; i < path.length; i++) {
            path[i].x = path[i].x + minX;
            path[i].y = path[i].y + minY;
        }
        return path;
    }
    getRecoPath(): Path[] {
        return this._recoPath;
    }
    static fromPathToPathNumber(path: Loc[]): number[] {
        var pathNum: number[] = []
        for (var i = 0; i < path.length; i++) {
            pathNum.push(path[i].x);
            pathNum.push(path[i].y);
        }
        return pathNum;
    }
    static fromPathToPathNumberX(path: Loc[]): number[] {
        var pathNum: number[] = []
        for (var i = 0; i < path.length; i++) {
            pathNum.push(path[i].x);
        }
        return pathNum;
    } static fromPathToPathNumberY(path: Loc[]): number[] {
        var pathNum: number[] = []
        for (var i = 0; i < path.length; i++) {
            pathNum.push(path[i].y);
        }
        return pathNum;
    }
    static stringPathX(path: Loc[]): string {
        return JSON.stringify(Draw.fromPathToPathNumberX(path));
    }
    static stringPathY(path: Loc[]): string {
        return JSON.stringify(Draw.fromPathToPathNumberY(path));
    }
}