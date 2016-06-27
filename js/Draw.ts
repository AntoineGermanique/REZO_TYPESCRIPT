//class draw, to draw stuff...

var sceneDraw: SceneDraw;

class Draw extends PIXI.Graphics {
    _path: Loc[] = [];
    _polyPath: number[] = [];
    _recoPath: Path[] = [];
    _bmp: PIXI.Sprite;
    constructor(loc: Loc, isPolygon?: boolean) {
        super();
        if (!isPolygon) {
            this._path.push(loc);
        } else {
            this._polyPath.push(loc.x);
            this._polyPath.push(loc.y);
        }
    }
    addPolyPathPoint(x: number, y: number) {
        this._polyPath.push(x);
        this._polyPath.push(y);
    }
    addPathPointLoc(loc: Loc): void {
        this._path.push(loc);
    }
    addPathPoint(x: number, y: number) {
        var loc: Loc = {
            x: x,
            y: y
        };
        this._path.push(loc);
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
        this.beginFill(bulleColor);
        this.drawPolygon(this._polyPath);
        this.endFill();

    }
    setRecoPath(path: Loc[]): void {
        var pathPath: Array<Loc[]> = [];
        for (var i = 1; i < path.length; i++) {
            var pathX;
            var pathY;
            var loc1 = path[i - 1];
            var loc2 = path[i];
            if (loc1.x == loc2.x && loc1.y == loc2.y) {
                var tempPath = path.slice(counter, i);
                pathPath.push(tempPath);
            }
        }
        for (var i = 0; i < pathPath.length; i++){
            var slicedPath = pathPath[i];
            var slicedPathX = [];
            var slicedPathY = [];
            var slicedPathXY: Path;
            for (var j = 0; j < slicedPath.length; j++) {
                slicedPathX.push(slicedPath[j].x);
                slicedPathY.push(slicedPath[j].y);
                slicedPathXY.x = slicedPathX;
                slicedPathXY.y = slicedPathY;
            }
            this._recoPath.push(slicedPathXY);
        }
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