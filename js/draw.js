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
        this.moveTo(this._path[0].x, this._path[0].y);
        for (var i = 1; i < this._path.length; i++) {
            this.lineTo(this._path[i].x, this._path[i].y);
        }
    };
    Draw.prototype.drawPoly = function () {
        this.clear();
        this.beginFill(bulleColor);
        this.drawPolygon(this._polyPath);
        this.endFill();
    };
    return Draw;
}(PIXI.Graphics));
//# sourceMappingURL=Draw.js.map