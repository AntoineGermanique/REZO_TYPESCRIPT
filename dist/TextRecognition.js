"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class TextRecognition {
    xhr(type, url, data, text) {
        function onLoad() {
            if (request.status >= 200 && request.status < 300) {
                var textResult = JSON.parse(request.response).result.textSegmentResult.candidates[0].label;
                console.log(textResult);
                var textRecognize = prompt("is it Okay?", textResult);
                if (textRecognize && textRecognize != "") {
                    text.text = textRecognize;
                } //deferred.resolve(NetworkInterface.parse(request));
            }
        }
        function onError() {
        }
        function onStateChange() {
        }
        var request = new XMLHttpRequest();
        request.open(type, url, true);
        request.withCredentials = true;
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        request.onload = onLoad;
        request.onerror = onError;
        //request.onprogress = onProgress;
        request.onreadystatechange = onStateChange;
        request.send(this.transformRequest(data));
    }
    transformRequest(data) {
        var str = [];
        for (var p in data) {
            if ((typeof data[p] !== 'undefined') &&
                (typeof data[p] !== 'function')) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
            }
        }
        return str.join('&');
    }
    createInput(path) {
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
                t: path[i].t,
                type: "stroke"
            };
            textInputUnits.components.push(strokeComponent);
        }
        return textInputUnits;
    }
    createRequestInputParams(inputUnits) {
        var textRecoInputs = {
            textParameter: {
                language: _1.Ressource.langage,
                textInputMode: _1.Ressource.textInputNode,
            },
            inputUnits: []
        };
        textRecoInputs.inputUnits.push(inputUnits);
        this.input = textRecoInputs;
        return textRecoInputs;
    }
    createDataRequest(input) {
        this.data = {
            applicationKey: _1.Ressource.RecoAppliKey,
            hmac: this.computeHmac(_1.Ressource.RecoAppliKey, input, _1.Ressource.HmacKey),
            textInput: JSON.stringify(input),
            instanceId: undefined
        };
        return this.data;
    }
    computeHmac(applicationKey, data, hmacKey) {
        var jsonInput = (typeof data === 'object') ? JSON.stringify(data) : data;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    }
    ;
}
exports.TextRecognition = TextRecognition;
//# sourceMappingURL=TextRecognition.js.map