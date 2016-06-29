var Realtime = (function () {
    function Realtime() {
        this.realtimeUtils = new utils.RealtimeUtils({ clientId: drive.CLIENT_ID });
    }
    Realtime.prototype.init = function () {
        var _this = this;
        gapi.load("auth:client,drive-realtime,drive-share", function () { _this.authorize(); });
    };
    Realtime.prototype.startUsingRealtime = function () {
        var _this = this;
        var fileId = (Rezo.rezoId) ? Rezo.rezoId : saveDrive();
        if (fileId)
            gapi.drive.realtime.load(fileId, function (doc) { _this.onFileLoaded(doc); }, function (model) { _this.opt_initializerFn(model); }, function (error) { _this.opt_errorFn(error); });
    };
    Realtime.prototype.onFileLoaded = function (doc) {
        // Get the field named "text" in the root map.
        var text = doc.getModel().getRoot().get("text");
        // Connect the event to the listener.
        text.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, this.onStringChanged);
    };
    Realtime.prototype.opt_initializerFn = function (model) {
        this.initializeModel(model);
    };
    Realtime.prototype.opt_errorFn = function (error) {
        console.log(error);
    };
    Realtime.prototype.initializeModel = function (model) {
        var string = model.createString("Hello Realtime World!");
        model.getRoot().set("text", string);
    };
    Realtime.prototype.onStringChanged = function (evt) {
        // Log the event to the console.
        console.log(evt);
    };
    Realtime.prototype.authorize = function () {
        var _this = this;
        // Attempt to authorize
        this.realtimeUtils.authorize(function (response) {
            if (response.error) {
                // Authorization failed because this is the first time the user has used your application,
                // show the authorize button to prompt them to authorize manually.
                var button = document.getElementById('auth_button');
                button.classList.add('visible');
                button.addEventListener('click', function () {
                    _this.realtimeUtils.authorize(function (response) {
                        _this.startUsingRealtime();
                    }, true);
                });
            }
            else {
                _this.startUsingRealtime();
            }
        }, false);
    };
    return Realtime;
}());
//# sourceMappingURL=realtime.js.map