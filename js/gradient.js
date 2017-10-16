/////////gradient.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
var gradientArray = ["ffffff", "000000", "00EEff", "00CCff", "00AAff", "0088ff", "0066ff", "0044ff", "0022ff", "0000ff", "2200FF", "4400FF", "6600FF", "8800FF", "AA00FF", "CC00FF", "EE00FF", "FF00EE", "FF00CC", "FF00AA", "FF0088", "FF0066", "FF0044", "FF0022", "FF0000", "FF2200", "FF4400", "FF8800", "FFAA00", "FFCC00", "FFEE00", "EEFF00", "CCFF00", "AAFF00", "88FF00", "66FF00", "44FF00", "22FF00", "00FF00", "00FF22", "00FF44", "00FF66", "00FF88", "00FFAA", "00FFDD", "00FFEE", "0193cf", "0282c1", "046db1", "0658a1", "0e4392", "193186", "2c257f", "491a7c", "6c127d", "910a7f", "b5057f", "d1027e", "e20078", "e2006e", "e10060", "e20051", "e20242", "e20a33", "e11827", "e62e1e", "ef5015", "fc780c", "ffa106", "ffc501", "ffdf00", "f7e801", "d6e709", "a9d814", "78c421", "47ae2d", "1d9c3a", "009041"];
var goodColor;
var tempColorArray = [];
function gradient() {
    if (!_1.Menu.coloBool) {
        _1.Menu.coloBool = true;
        $("#gradient").css("display", "block");
        $("#bordBulle").css("display", "block");
        console.log($("#gradient").children().length);
        if ($("#gradient").children().length == 0) {
            for (var i = 0; i < gradientArray.length; i++) {
                $("#gradient").append("<div class='gardient' attr='#" + gradientArray[i] + "' style='background:#" + gradientArray[i] + ";'></div>");
                var gradientChild = $("#gradient").children();
                if (gradientArray[i] == "ffffff") {
                    $(gradientChild[i]).css('border', '1px solid black');
                }
                $(gradientChild[i]).on('click tap', function () {
                    var goodColor = parseInt($(this).attr("attr").replace(/^#/, ''), 16);
                    var test = goodColor.toString(16);
                    var selectedBulle = _1.Rezo.selectedBulle;
                    if (selectedBulle) {
                        if (_1.Menu.multBool) {
                            tempColorArray = _1.Multi.multiArray;
                            for (i = 0; i < tempColorArray.length; i++) {
                                setColorFun(tempColorArray[i].bulle, goodColor);
                            }
                            tempColorArray = [];
                        }
                        else {
                            setColorFun(selectedBulle, goodColor);
                        }
                    }
                });
            }
        }
    }
    else {
        _1.Menu.coloBool = false;
        $("#gradient").css("display", "none");
        $("#bordBulle").css("display", "none");
    }
}
exports.gradient = gradient;
function setColorFun(bulleToColor, goodColor) {
    var circleSize = _1.bulleSize(bulleToColor);
    var newColor = bulleToColor.shape;
    if (bulleToColor.shape.kind == _1.ShapeEnum.circle) {
        newColor.clear();
        newColor.beginFill(goodColor, 1);
        if (goodColor == 0xffffff) {
            console.log(goodColor);
            newColor.lineStyle(1, 0x000000, 1);
        }
        newColor.drawCircle(0, 0, circleSize);
        newColor.endFill();
        bulleToColor.clear();
        bulleToColor.lineStyle(16, goodColor, 0.5);
        bulleToColor.drawCircle(0, 0, circleSize);
        if (goodColor == 0xffffff) {
            bulleToColor.clear();
            bulleToColor.lineStyle(16, 0x000000, 0.5);
            bulleToColor.drawCircle(0, 0, circleSize);
        }
    }
    else {
        bulleToColor.clear();
        bulleToColor.lineStyle(16, goodColor, 0.5);
        bulleToColor.drawPolygon(bulleToColor.polyPathNumber);
        bulleToColor.endFill();
        newColor.beginFill(goodColor, 1);
        newColor.drawPolygon(bulleToColor.polyPathNumber);
        newColor.endFill();
    }
    _1.Bulle.bulleColor = goodColor;
    newColor.rezoColor = goodColor;
}
