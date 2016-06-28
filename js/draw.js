//class draw, to draw stuff...
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sceneDraw;
var Draw = (function (_super) {
    __extends(Draw, _super);
    function Draw(loc, timeStamp, isPolygon) {
        _super.call(this);
        this._path = [];
        this._polyPath = [];
        this._recoPath = [];
        this._timeStamp = [];
        if (!isPolygon) {
            this._path.push(loc);
        }
        else {
            this._polyPath.push(loc.x);
            this._polyPath.push(loc.y);
            this._timeStamp.push(timeStamp);
        }
    }
    Draw.prototype.addPolyPathPoint = function (x, y, timeStamp) {
        this._polyPath.push(x);
        this._polyPath.push(y);
        this._timeStamp.push(timeStamp);
    };
    Draw.prototype.addPathPointLoc = function (loc, timeStamp) {
        this._path.push(loc);
        this._timeStamp.push(timeStamp);
    };
    Draw.prototype.addPathPoint = function (x, y, timeStamp) {
        var loc = {
            x: x,
            y: y
        };
        this._path.push(loc);
        this._timeStamp.push(timeStamp);
    };
    Draw.prototype.getTimeStamps = function () {
        return this._timeStamp;
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
    Draw.prototype.setRecoPath = function (path, timeStamp) {
        path = this.makePathUint(path);
        var pathPath = [];
        var sliceTimeStamp = [];
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
        for (var i = 0; i < pathPath.length; i++) {
            var slicedPath = pathPath[i];
            var slicedPathX = [];
            var slicedPathY = [];
            var slicedPathT = [];
            var slicedPathXYT = { x: null, y: null, t: null };
            for (var j = 0; j < slicedPath.length; j++) {
                slicedPathX.push(slicedPath[j].x);
                slicedPathY.push(slicedPath[j].y);
            }
            slicedPathXYT.x = slicedPathX;
            slicedPathXYT.y = slicedPathY;
            slicedPathXYT.t = sliceTimeStamp[i];
            this._recoPath.push(slicedPathXYT);
        }
    };
    Draw.prototype.makePathUint = function (path) {
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