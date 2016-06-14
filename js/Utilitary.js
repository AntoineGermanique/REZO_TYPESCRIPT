//Utilitary
var Utilitary = (function () {
    function Utilitary() {
    }
    Utilitary.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    };
    Utilitary.startLoad = function () {
        $("#loading").css("display", "block");
    };
    Utilitary.stopLoad = function () {
        $("#loading").css("display", "none");
    };
    return Utilitary;
}());
//# sourceMappingURL=Utilitary.js.map