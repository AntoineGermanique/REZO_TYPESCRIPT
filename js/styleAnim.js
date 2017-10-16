"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function afficheGoodNews() {
    $("#goodNews").css("visibility", "visible");
    $("#goodNews").css("background-color", "#0F0");
    $("#goodNews").css("top", "0");
    setTimeout(function () {
        cacherGoodNews();
    }, 3000);
}
exports.afficheGoodNews = afficheGoodNews;
function cacherGoodNews() {
    $("#goodNews").css("visibility", "");
    $("#goodNews").css("background-color", "");
    $("#goodNews").css("top", "");
}
exports.cacherGoodNews = cacherGoodNews;
//# sourceMappingURL=styleAnim.js.map
