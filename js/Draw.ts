//class draw, to draw stuff...

var sceneDraw: SceneDraw;

class Draw extends PIXI.Graphics {
    _path: Loc[] = [];
    _polyPath: number[] = [];
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
        this.moveTo(this._path[0].x, this._path[0].y)
        for (var i = 1; i < this._path.length; i++) {
            this.lineTo(this._path[i].x, this._path[i].y)
        }
    }
    drawPoly() {
        this.clear();
        this.beginFill(bulleColor);
        this.drawPolygon(this._polyPath);
        this.endFill();

    }
    
}