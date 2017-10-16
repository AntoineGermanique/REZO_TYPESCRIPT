"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const gapi_client_1 = require("gapi-client");
class Realtime {
    constructor() {
        this.realtimeUtils = new utils.RealtimeUtils({ clientId: _1.drive.CLIENT_ID });
    }
    init() {
        gapi_client_1.default.load("auth:client,drive-realtime,drive-share", () => { this.authorize(); });
    }
    startUsingRealtime() {
        var fileId = (_1.Rezo.rezoId) ? _1.Rezo.rezoId : _1.Save.saveDrive();
        if (fileId)
            gapi_client_1.default.drive.realtime.load(fileId, (doc) => { this.onFileLoaded(doc); }, (model) => { this.opt_initializerFn(model); }, (error) => { this.opt_errorFn(error); });
    }
    onFileLoaded(doc) {
        // Get the field named "text" in the root map.
        var text = doc.getModel().getRoot().get("text");
        // Connect the event to the listener.
        text.addEventListener(gapi_client_1.default.drive.realtime.EventType.TEXT_INSERTED, this.onStringChanged);
    }
    opt_initializerFn(model) {
        this.initializeModel(model);
    }
    opt_errorFn(error) {
        console.log(error);
    }
    initializeModel(model) {
        var string = model.createString("Hello Realtime World!");
        model.getRoot().set("text", string);
    }
    onStringChanged(evt) {
        // Log the event to the console.
        console.log(evt);
    }
    authorize() {
        // Attempt to authorize
        this.realtimeUtils.authorize((response) => {
            if (response.error) {
                // Authorization failed because this is the first time the user has used your application,
                // show the authorize button to prompt them to authorize manually.
                var button = document.getElementById('auth_button');
                button.classList.add('visible');
                button.addEventListener('click', () => {
                    this.realtimeUtils.authorize((response) => {
                        this.startUsingRealtime();
                    }, true);
                });
            }
            else {
                this.startUsingRealtime();
            }
        }, false);
    }
}
exports.Realtime = Realtime;
