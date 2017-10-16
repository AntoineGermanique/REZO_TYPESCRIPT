"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Bezier {
    constructor() {
        this.pathTest = [];
    }
    testBezier() {
        var bezierCurve = new PIXI.Graphics();
        _1.Rezo.scene.addChild(bezierCurve);
        bezierCurve.lineStyle(5, 0x000000, 1);
        //bezierCurve.moveTo(0, 0);
        var loc1 = { x: 0, y: 0 };
        var loc2 = { x: 50, y: 50 };
        var loc3 = { x: 100, y: 0 };
        // var loc4: Loc = { x: 150, y: 50 };
        this.pathTest.push(loc1);
        this.pathTest.push(loc2);
        this.pathTest.push(loc3);
        this.pathTest.push({ x: 150, y: 50 });
        this.pathTest.push({ x: 150, y: 150 });
        this.pathTest.push({ x: 250, y: 350 });
        this.pathTest.push({ x: 350, y: 150 });
        this.pathTest.push({ x: 150, y: 100 });
        this.drawQuadraticCurve(this.pathTest, bezierCurve);
        this.drawStraightLines(this.pathTest);
        // bezierCurve.quadraticCurveTo(75, 0, 50, 100);
    }
    drawQuadraticCurve(path, bezierCurve) {
        bezierCurve.clear();
        var pathPath = this.slicePath(path);
        for (var j = 0; j < pathPath.length; j++) {
            var path = pathPath[j];
            for (var i = 0; i < path.length; i++) {
                this.setLineWidth(i, path, bezierCurve);
                if (path[i + 1] && path[i - 1]) {
                    var locC;
                    var locP;
                    var loc1 = path[i - 1];
                    var loc2 = path[i];
                    var loc3 = path[i + 1];
                    if (loc3.x == loc2.x && loc2.y == loc3.y) {
                        bezierCurve.moveTo(loc2.x, loc2.y);
                    }
                    else {
                        //locP = this.relativeLoc(this.calculateOppositeControlePoint(loc2.x, loc3.x, loc2.y, loc3.y), loc2);
                        //locC = this.trimControlePoint(loc1, loc2, this.absoluteControlePoint(this.calculateControlePoint(locP), loc2));
                        //bezierCurve.quadraticCurveTo(loc2.x, loc2.y, loc2.x, loc2.y);
                        bezierCurve.bezierCurveTo(loc2.x, loc2.y, loc2.x, loc2.y, loc2.x, loc2.y);
                    }
                }
                else if (this.pathTest[i - 1]) {
                    bezierCurve.lineTo(path[i].x, path[i].y);
                }
                else if (!this.pathTest[i - 1]) {
                    bezierCurve.moveTo(path[i].x, path[i].y);
                }
            }
        }
    }
    drawStraightLines(path) {
        var straightCurve = new PIXI.Graphics();
        straightCurve.lineStyle(1, 0xFF0000);
        for (var i = 0; i < path.length; i++) {
            if (path[i - 1]) {
                straightCurve.lineTo(path[i].x, path[i].y);
            }
            else {
                straightCurve.moveTo(path[i].x, path[i].y);
            }
        }
        _1.Rezo.scene.addChild(straightCurve);
    }
    calculateOppositeControlePoint(x2, x3, y2, y3) {
        var xp = x2 + ((x3 - x2) / 2);
        var yp = y2 + ((y3 - y2) / 2);
        return { x: xp, y: yp };
    }
    calculateControlePoint(loc) {
        return { x: loc.x * -1, y: loc.y * -1 };
    }
    relativeLoc(locP, loc2) {
        return { x: locP.x - loc2.x, y: locP.y - loc2.y };
    }
    absoluteControlePoint(locC, loc2) {
        return { x: locC.x + loc2.x, y: locC.y + loc2.y };
    }
    trimControlePoint(loc1, loc2, locC) {
        var xMax = (loc1.x < loc2.x) ? loc2.x : loc1.x;
        var xMin = (loc1.x > loc2.x) ? loc2.x : loc1.x;
        var yMax = (loc1.y < loc2.y) ? loc2.y : loc1.y;
        var yMin = (loc1.y > loc2.y) ? loc2.y : loc1.y;
        locC.x = (locC.x < xMin) ? xMin : locC.x;
        locC.x = (locC.x > xMax) ? xMax : locC.x;
        locC.y = (locC.y < yMin) ? yMin : locC.y;
        locC.y = (locC.y > yMax) ? yMax : locC.y;
        return locC;
    }
    setLineWidth(i, path, bezierCurve) {
        if (i < 2 || i > path.length - 4) {
            bezierCurve.lineStyle(0.5, 0x000000, 1);
        }
        else if (i < 3 || i > path.length - 5) {
            bezierCurve.lineStyle(1.10, 0x000000, 1);
        }
        else if (i < 4 || i > path.length - 6) {
            bezierCurve.lineStyle(1.80, 0x000000, 1);
        }
        else if (i < 5 || i > path.length - 7) {
            bezierCurve.lineStyle(2.20, 0x000000, 1);
        }
        else if (i < 6 || i > path.length - 8) {
            bezierCurve.lineStyle(2.40, 0x000000, 1);
        }
        else if (i < 7 || i > path.length - 9) {
            bezierCurve.lineStyle(2.50, 0x000000, 1);
        }
        else if (i < 8 || i > path.length - 10) {
            bezierCurve.lineStyle(2.60, 0x000000, 1);
        }
        else if (i < 9 || i > path.length - 11) {
            bezierCurve.lineStyle(2.70, 0x000000, 1);
        }
        else if (i < 10 || i > path.length - 12) {
            bezierCurve.lineStyle(2.80, 0x000000, 1);
        }
        else if (i < 11 || i > path.length - 13) {
            bezierCurve.lineStyle(2.90, 0x000000, 1);
        }
        else if (bezierCurve.lineWidth != 3) {
            bezierCurve.lineStyle(3, 0x000000, 1);
        }
        return bezierCurve;
    }
    slicePath(path) {
        var pathPath = [];
        var counter = 0;
        for (var i = 1; i < path.length; i++) {
            var loc1 = path[i - 1];
            var loc2 = path[i];
            if (loc1.x == loc2.x && loc1.y == loc2.y) {
                var tempPath = path.slice(counter, i);
                pathPath.push(tempPath);
                counter = i;
                console.log("pause");
            }
        }
        pathPath.push(path.slice(counter, i));
        return pathPath;
    }
}
exports.Bezier = Bezier;
//# sourceMappingURL=BezierCurve.js.map