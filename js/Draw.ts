//class draw, to draw stuff...

var sceneDraw: SceneDraw;

class Draw extends PIXI.Graphics {
    _path: Loc[]=[];
    constructor(loc: Loc) {
        super();
        this._path.push(loc);

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

    drawLine() {
        this.moveTo(this._path[0].x, this._path[0].y)
        for (var i = 1; i < this._path.length; i++) {
            this.lineTo(this._path[i].x, this._path[i].y)
        }
    }
    
}