declare var CryptoJS;

interface TextRecognitionInputs {
    textParameter: { langague: string, textInputMode: string },
    inputUnits: TextInputUnits[];
}

interface TextRecognitionData {
    applicationKey: string;
    hmac: string;
    textInput: string;
}

interface TextInputUnits {
    components: StrokeComponent[];
    textInputType: string;
}

interface StrokeComponent {
    x: number[];
    y: number[];
    type: string;
}
interface Path {
    x: number[];
    y: number[];
}
class TextRecognition {
    input: TextRecognitionInputs;
    data: TextRecognitionData;
    xhr(type: string, url: string, data: TextInputUnits) {

        function onLoad() {
            if (request.status >= 200 && request.status < 300) {
                console.log(request);
                //deferred.resolve(NetworkInterface.parse(request));
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
                type: "stroke"
            }
            textInputUnits.components.push(strokeComponent);
        }
        return textInputUnits;
    }
    setRequestInputParams(inputUnits: TextInputUnits) {
        var textRecoInputs: TextRecognitionInputs={
            inputUnits: [],
            textParameter: {
                langague: Ressource.langage,
                textInputMode: Ressource.textInputNode,
            }
        }
        textRecoInputs.inputUnits.push(inputUnits);
        this.input = textRecoInputs;
    }
    setDataRequest() {
        this.data = {
            applicationKey: Ressource.RecoAppliKey,
            hmac: Ressource.HmacKey,
            textInput: this.computeHmac(Ressource.RecoAppliKey, this.input, Ressource.HmacKey)
        };

    }
    computeHmac(applicationKey: string, data: TextRecognitionInputs, hmacKey: string) {
        var jsonInput = (typeof data === 'object') ? JSON.stringify(data) : data;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };
}