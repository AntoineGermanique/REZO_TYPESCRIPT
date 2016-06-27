var TextRecognition = (function () {
    function TextRecognition() {
    }
    TextRecognition.prototype.xhr = function (type, url, data) {
        function onLoad() {
            if (request.status >= 200 && request.status < 300) {
                console.log(request);
            }
        }
        var request = new XMLHttpRequest();
        request.open(type, url, true);
        request.withCredentials = true;
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        //request.onload = onLoad;
        //request.onerror = onError;
        //request.onprogress = onProgress;
        //request.onreadystatechange = onStateChange;
        request.send(this.transformRequest(data));
    };
    TextRecognition.prototype.transformRequest = function (data) {
        var str = [];
        for (var p in data) {
            if ((typeof data[p] !== 'undefined') &&
                (typeof data[p] !== 'function')) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
            }
        }
        return str.join('&');
    };
    TextRecognition.prototype.createInput = function (path) {
        var textInputUnits;
        textInputUnits = {
            components: [],
            textInputType: "MULTI_LINE_TEXT"
        };
        for (var i = 0; i < path.length; i++) {
            var strokeComponent;
            strokeComponent = {
                x: path[i].x,
                y: path[i].y,
                type: "stroke"
            };
            textInputUnits.components.push(strokeComponent);
        }
        return textInputUnits;
    };
    TextRecognition.prototype.setRequestInputParams = function (inputUnits) {
        var textRecoInputs = {
            inputUnits: [],
            textParameter: {
                langague: Ressource.langage,
                textInputMode: Ressource.textInputNode,
            }
        };
        textRecoInputs.inputUnits.push(inputUnits);
        this.input = textRecoInputs;
    };
    TextRecognition.prototype.setDataRequest = function () {
        this.data = {
            applicationKey: Ressource.RecoAppliKey,
            hmac: Ressource.HmacKey,
            textInput: this.computeHmac(Ressource.RecoAppliKey, this.input, Ressource.HmacKey)
        };
    };
    TextRecognition.prototype.computeHmac = function (applicationKey, data, hmacKey) {
        var jsonInput = (typeof data === 'object') ? JSON.stringify(data) : data;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };
    ;
    return TextRecognition;
}());
//# sourceMappingURL=TextRecognition.js.map