//class draw, to draw stuff...
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sceneDraw;
var Draw = (function (_super) {
    __extends(Draw, _super);
    function Draw(loc) {
        _super.call(this);
        this._path = [];
        this._path.push(loc);
    }
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
    Draw.prototype.drawLine = function () {
        this.moveTo(this._path[0].x, this._path[0].y);
        for (var i = 1; i < this._path.length; i++) {
            this.lineTo(this._path[i].x, this._path[i].y);
        }
    };
    return Draw;
}(PIXI.Graphics));
//# sourceMappingURL=Draw.js.map