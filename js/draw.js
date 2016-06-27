//class draw, to draw stuff...
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sceneDraw;
var Draw = (function (_super) {
    __extends(Draw, _super);
    function Draw(loc, isPolygon) {
        _super.call(this);
        this._path = [];
        this._polyPath = [];
        this._recoPath = [];
        if (!isPolygon) {
            this._path.push(loc);
        }
        else {
            this._polyPath.push(loc.x);
            this._polyPath.push(loc.y);
        }
    }
    Draw.prototype.addPolyPathPoint = function (x, y) {
        this._polyPath.push(x);
        this._polyPath.push(y);
    };
    Draw.prototype.addPathPointLoc = function (loc) {
        this._path.push(loc);
    };
    Draw.prototype.addPathPoint = function (x, y) {
        var loc = {
            x: x,
            y: y
        };
        this._path.push(loc);
    };
    Draw.prototype.getPath = function () {
        return this._path;
    };
    Draw.prototype.getPathNumber = function () {
        return this._polyPath;
    };
    Draw.prototype.getLastPoint = function () {
        if (this._path[this._path.length - 1])
            return this._path[this._path.length - 1];
        return null;
    };
    ;
    Draw.prototype.getPreviousPoint = function () {
        if (this._path[this._path.length - 2])
            return this._path[this._path.length - 2];
        return null;
    };
    ;
    Draw.prototype.setPath = function (path) {
        this._path = path;
    };
    Draw.prototype.setPathNumber = function (path) {
        this._polyPath = path;
    };
    Draw.prototype.drawLine = function () {
        var bezier = new Bezier();
        bezier.drawQuadraticCurve(this.getPath(), this);
        //this.lineStyle(2, 0x000000, 1);
        //this.moveTo(this._path[0].x, this._path[0].y+100)
        //for (var i = 1; i < this._path.length; i++) {
        //    this.lineTo(this._path[i].x, this._path[i].y+100)
        //}
    };
    Draw.prototype.drawPoly = function () {
        this.clear();
        this.beginFill(bulleColor);
        this.drawPolygon(this._polyPath);
        this.endFill();
    };
    Draw.prototype.setRecoPath = function (path) {
        var pathPath = [];
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
        for (var i = 0; i < pathPath.length; i++) {
            var slicedPath = pathPath[i];
            var slicedPathX = [];
            var slicedPathY = [];
            var slicedPathXY;
            for (var j = 0; j < slicedPath.length; j++) {
                slicedPathX.push(slicedPath[j].x);
                slicedPathY.push(slicedPath[j].y);
                slicedPathXY.x = slicedPathX;
                slicedPathXY.y = slicedPathY;
            }
            this._recoPath.push(slicedPathXY);
        }
    };
    Draw.prototype.getRecoPath = function () {
        return this._recoPath;
    };
    Draw.fromPathToPathNumber = function (path) {
        var pathNum = [];
        for (var i = 0; i < path.length; i++) {
            pathNum.push(path[i].x);
            pathNum.push(path[i].y);
        }
        return pathNum;
    };
    Draw.fromPathToPathNumberX = function (path) {
        var pathNum = [];
        for (var i = 0; i < path.length; i++) {
            pathNum.push(path[i].x);
        }
        return pathNum;
    };
    Draw.fromPathToPathNumberY = function (path) {
        var pathNum = [];
        for (var i = 0; i < path.length; i++) {
            pathNum.push(path[i].y);
        }
        return pathNum;
    };
    Draw.stringPathX = function (path) {
        return JSON.stringify(Draw.fromPathToPathNumberX(path));
    };
    Draw.stringPathY = function (path) {
        return JSON.stringify(Draw.fromPathToPathNumberY(path));
    };
    return Draw;
}(PIXI.Graphics));
//# sourceMappingURL=Draw.js.map