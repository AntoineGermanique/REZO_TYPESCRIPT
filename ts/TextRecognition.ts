declare var CryptoJS;

import {TextRezo, Ressource} from './'

interface TextRecognitionInputs {
    textParameter: { language: string, textInputMode: string },
    inputUnits: TextInputUnits[];
}

interface TextRecognitionData {
    applicationKey: string;
    hmac: string;
    textInput: string;
    instanceId: string;
}

interface TextInputUnits {
    components: StrokeComponent[];
    textInputType: string;
}

interface StrokeComponent {
    x: number[];
    y: number[];
    t: number[];
    type: string;
}
export interface Path {
    x: number[];
    y: number[];
    t: number[];
}
export class TextRecognition {
    input: TextRecognitionInputs;
    data: TextRecognitionData;
    xhr(type: string, url: string, data: TextRecognitionData, text: TextRezo) {

        function onLoad() {
            if (request.status >= 200 && request.status < 300) {
                var textResult = JSON.parse(request.response).result.textSegmentResult.candidates[0].label;
                console.log(textResult);
                var textRecognize = prompt("is it Okay?", textResult)
                if (textRecognize&&textRecognize != "") {
                    text.text = textRecognize;
                }//deferred.resolve(NetworkInterface.parse(request));
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
    transformRequest(data) :string {
        var str = [];
        for (var p in data) {
            if ((typeof data[p] !== 'undefined') &&
                (typeof data[p] !== 'function')) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
            }
        }
        return str.join('&');
    }
    createInput(path: Path[]): TextInputUnits {
        var textInputUnits: TextInputUnits;
        textInputUnits = {
            components: [],
            textInputType: "MULTI_LINE_TEXT"
        }
        for (var i = 0; i < path.length; i++) {
            var strokeComponent: StrokeComponent;
            strokeComponent = {
                x: path[i].x,
                y: path[i].y,
                t: path[i].t,
                type: "stroke"
            }
            textInputUnits.components.push(strokeComponent);
        }
        return textInputUnits;
    }
    createRequestInputParams(inputUnits: TextInputUnits): TextRecognitionInputs {
        var textRecoInputs: TextRecognitionInputs = {
            textParameter: {
                language: Ressource.langage,
                textInputMode: Ressource.textInputNode,
            },
            inputUnits: []
        }
        textRecoInputs.inputUnits.push(inputUnits);
        this.input = textRecoInputs;
        return textRecoInputs
    }
    createDataRequest(input: TextRecognitionInputs): TextRecognitionData {
        this.data = {
            applicationKey: Ressource.RecoAppliKey,
            hmac:this.computeHmac(Ressource.RecoAppliKey, input, Ressource.HmacKey),
            textInput: JSON.stringify(input),
            instanceId: undefined

        };
        return this.data;

    }
    computeHmac(applicationKey: string, data: TextRecognitionInputs, hmacKey: string) {
        var jsonInput = (typeof data === 'object') ? JSON.stringify(data) : data;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };
}