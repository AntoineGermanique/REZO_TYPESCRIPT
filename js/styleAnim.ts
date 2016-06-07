function afficheGoodNews() {
    $("#goodNews").css("visibility", "visible");
    $("#goodNews").css("background-color", "#0F0");
    $("#goodNews").css("top", "0");
    setTimeout(function () {
        cacherGoodNews();
    }, 3000);
}
function cacherGoodNews() {
    $("#goodNews").css("visibility", "");
    $("#goodNews").css("background-color", "");
    $("#goodNews").css("top", "");
}
//# sourceMappingURL=styleAnim.js.map
