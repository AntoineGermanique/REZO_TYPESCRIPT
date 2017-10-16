
declare var utils;
import { Rezo, drive, Save } from './'
import gapi from 'gapi-client'
export class Realtime {
    realtimeUtils = new utils.RealtimeUtils({ clientId: drive.CLIENT_ID });

    init() {
        gapi.load("auth:client,drive-realtime,drive-share", () => { this.authorize() });
    }

    startUsingRealtime() {
        var fileId = (Rezo.rezoId) ? Rezo.rezoId : Save.saveDrive();
        if (fileId)
            gapi.drive.realtime.load(
                fileId,
                (doc) => { this.onFileLoaded(doc) },
                (model) => { this.opt_initializerFn(model) },
                (error) => { this.opt_errorFn(error) });

    }
    onFileLoaded(doc) {
        // Get the field named "text" in the root map.
        var text = doc.getModel().getRoot().get("text");
        // Connect the event to the listener.
        text.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, this.onStringChanged);
    }
    opt_initializerFn(model) {
        this.initializeModel(model)
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
                    this.realtimeUtils.authorize(() => {
                        this.startUsingRealtime();
                    }, true);
                });
            } else {
                this.startUsingRealtime();
            }
        }, false);
    }
}