"use strict";
//Utilitary
Object.defineProperty(exports, "__esModule", { value: true });
class Utilitary {
    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
    static startLoad() {
        $("#loading").css("display", "block");
    }
    static stopLoad() {
        $("#loading").css("display", "none");
    }
}
exports.Utilitary = Utilitary;
