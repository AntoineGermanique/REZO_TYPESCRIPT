// class to handel Drive Api request//
// using the v2 version
var DriveAPI = (function () {
    function DriveAPI() {
        this.CLIENT_ID = '274114145570-ohvfonvi299jafoco3s9jld3omfhk3in.apps.googleusercontent.com';
        this.SCOPES = ['https://www.googleapis.com/auth/drive'];
        this.faustFolder = "FaustPlayground";
        this.isFaustFolderPresent = false;
        this.extension = ".rezo";
    }
    /**
     * Check if current user has authorized this application.
    * disable to deactivate pop up window when not connected
     */
    DriveAPI.prototype.checkAuth = function () {
    };
    DriveAPI.prototype.updateConnection = function () {
        var _this = this;
        $('#loading').css("display", "block");
        gapi.auth.authorize({
            'client_id': this.CLIENT_ID,
            'scope': this.SCOPES.join(' '),
            'immediate': true
        }, function (authResult) { _this.handleAuthResult(authResult); });
    };
    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    DriveAPI.prototype.handleAuthResult = function (authResult, auto) {
        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            var event = new CustomEvent("authon");
            $("#saveBulle").css("display", "block");
            $("#homeBulle").css("display", "block");
            $("#driveBulle").css("display", "none");
            document.dispatchEvent(event);
            Rezo.isDriveConnected = true;
            this.loadDriveApi();
        }
        else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            var event = new CustomEvent("authoff");
            document.dispatchEvent(event);
        }
        if (authResult.error) {
            var event = new CustomEvent("clouderror", { 'detail': authResult.error });
            document.dispatchEvent(event);
        }
    };
    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    DriveAPI.prototype.handleAuthClick = function (event) {
        var _this = this;
        gapi.auth.authorize({ client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: false }, function (authResult) { _this.handleAuthResult(authResult); });
        return false;
    };
    /**
     * Load Drive API client library.
     */
    DriveAPI.prototype.loadDriveApi = function () {
        var _this = this;
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        gapi.client.load('drive', 'v2', function () { _this.listFolder(); });
    };
    /**
     * Print files.
     */
    DriveAPI.prototype.listFolder = function () {
        var _this = this;
        var request = gapi.client.drive.files.list({
            'maxResults': 10000,
            'q': "title contains 'rezo' and trashed!=true "
        });
        request.execute(function (resp) {
            console.log(DriveAPI.counter++);
            var event = new CustomEvent("finishloaddrive");
            document.dispatchEvent(event);
            var files = resp.items;
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (file.fileExtension == "rezo") {
                        _this.appendPre(file.title, file.id);
                    }
                }
                openLoad(_this.innerHTML);
                _this.innerHTML = "";
                $('#loading').css("display", "none");
            }
            else {
                _this.appendPre("", null);
            }
        });
    };
    DriveAPI.prototype.getFileMetadata = function (fileId) {
        var _this = this;
        var request = gapi.client.drive.files.get({
            'fileId': fileId
        });
        request.execute(function (file) {
            console.log(DriveAPI.counter++);
            _this.appendPre(file.title, file.id);
        });
    };
    /**
     * Append a pre element to the body containing the given message
     * as its text node.
     *
     * @param {string} message Text to be placed in pre element.
     */
    DriveAPI.prototype.appendPre = function (name, id) {
        //var option = document.createElement("option");
        var titre = name.replace(/.rezo$/, '');
        var innerHTML = "<div class='open' id='" + id + "'><span class='openSpan' id='" + titre + "'>" + titre + "</span><img class='openImgModif' src='images/PLUS.png'/><img class='openImgSuppr' src='images/SUPPR.png'></div>";
        //document.getElementById('open').innerHTML += innerHTML;
        this.innerHTML += innerHTML;
        //var event = new CustomEvent("fillselect", { 'detail': option })
        //document.dispatchEvent(event);
    };
    /**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
    DriveAPI.prototype.downloadFile = function (file, callback) {
        if (file.downloadUrl) {
            var accessToken = gapi.auth.getToken().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file.downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function () {
                var obj = JSON.parse(xhr.response);
                Rezo.rezoId = file.id;
                callback(obj);
            };
            xhr.onerror = function () {
                callback(null);
            };
            xhr.send();
        }
        else {
            callback(null);
        }
    };
    /**
 * Print a file's metadata.
 *
 * @param {String} fileId ID of the file to print metadata for.
 */
    DriveAPI.prototype.getFile = function (fileId, callback) {
        var _this = this;
        var request = gapi.client.drive.files.get({
            'fileId': fileId,
        });
        try {
            request.execute(function (resp) {
                console.log(DriveAPI.counter++);
                _this.lastSavedFileMetadata = resp;
                callback(resp);
            });
        }
        catch (e) {
            'new Message("erreur")';
        }
    };
    DriveAPI.prototype.createFile = function (fileName, callback) {
        var _this = this;
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        var request = gapi.client.request({
            'path': '/drive/v2/files',
            'method': 'POST',
            'body': {
                "title": fileName + this.extension,
                "mimeType": "application/json",
            }
        });
        request.execute(function (resp) {
            _this.getFile(resp.id, function (fileMetada) { _this.updateFile(resp.id, fileMetada, _this.tempBlob, null); });
        });
    };
    /**
 * Update an existing file's metadata and content.
 *
 * @param {String} fileId ID of the file to update.
 * @param {Object} fileMetadata existing Drive file's metadata.
 * @param {File} fileData File object to read data from.
 * @param {Function} callback Callback function to call when the request is complete.
 */
    DriveAPI.prototype.updateFile = function (fileId, fileMetadata, fileData, callback) {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        var boundary = '-------314159265358979323846';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";
        var reader = new FileReader();
        reader.readAsBinaryString(fileData);
        reader.onload = function (e) {
            var contentType = fileData.type || 'application/octet-stream';
            // Updating the metadata is optional and you can instead use the value from drive.files.get.
            var base64Data = btoa(reader.result);
            var multipartRequestBody = delimiter +
                'Content-Type: application/json\r\n\r\n' +
                JSON.stringify(fileMetadata) +
                delimiter +
                'Content-Type: ' + contentType + '\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                '\r\n' +
                base64Data +
                close_delim;
            var request = gapi.client.request({
                'path': '/upload/drive/v2/files/' + fileId,
                'method': 'PUT',
                'params': { 'uploadType': 'multipart', 'alt': 'json' },
                'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            });
            if (!callback) {
                callback = function () {
                    Rezo.load.style.display = "none";
                };
            }
            request.execute(callback);
        };
    };
    DriveAPI.prototype.trashFile = function (fileId) {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        var request = gapi.client.drive.files.trash({
            'fileId': fileId
        });
        request.execute(function (resp) {
            console.log(DriveAPI.counter++);
            var event = new CustomEvent("updatecloudselect");
            document.dispatchEvent(event);
        });
    };
    DriveAPI.prototype.logOut = function () {
        $("#saveBulle").css("display", "none");
        $("#homeBulle").css("display", "none");
        document.getElementById('open').innerHTML = "";
        $("#driveBulle").css("opacity", "0.5");
        window.open("https://accounts.google.com/logout", "newwindow", "width=500,height=700");
    };
    DriveAPI.counter = 0;
    return DriveAPI;
}());
//# sourceMappingURL=DriveAPI.js.map