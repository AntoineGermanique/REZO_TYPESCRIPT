"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class to handel Drive Api request//
// using the v2 version
const _1 = require("./");
const gapi_client_1 = require("gapi-client");
class DriveAPI {
    constructor() {
        this.CLIENT_ID = '274114145570-ohvfonvi299jafoco3s9jld3omfhk3in.apps.googleusercontent.com';
        this.SCOPES = ['https://www.googleapis.com/auth/drive'];
        this.faustFolder = "FaustPlayground";
        this.isFaustFolderPresent = false;
        this.innerHTML = "";
        this.extension = ".rezo";
    }
    /**
     * Check if current user has authorized this application.
    * disable to deactivate pop up window when not connected
     */
    checkAuth() {
    }
    updateConnection() {
        $('#loading').css("display", "block");
        if (_1.Rezo.isDriveConnected) {
            this.loadDriveApi();
        }
        else {
            gapi_client_1.default.auth.authorize({
                'client_id': this.CLIENT_ID,
                'scope': this.SCOPES.join(' '),
                'immediate': false
            }, (authResult) => {
                this.handleAuthResult(authResult);
            });
        }
    }
    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    handleAuthResult(authResult, auto) {
        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            var event = new CustomEvent("authon");
            $("#saveBulle").css("display", "block");
            $("#homeBulle").css("display", "block");
            $("#driveBulle").css("display", "none");
            $("#realtimeBulle").css("display", "block");
            document.dispatchEvent(event);
            _1.Rezo.isDriveConnected = true;
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
    }
    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    handleAuthClick(event) {
        if (gapi_client_1.default) {
            gapi_client_1.default.auth.authorize({ client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: false }, (authResult) => {
                this.handleAuthResult(authResult);
            });
            return false;
        }
        else {
            alert("connexion au drive impossible, vérifiez votre connexion  internet");
            _1.Utilitary.stopLoad();
        }
    }
    /**
     * Load Drive API client library.
     */
    loadDriveApi() {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        gapi_client_1.default.client.load('drive', 'v2', () => { this.listFolder(); });
    }
    /**
     * Print files.
     */
    listFolder() {
        var request = gapi_client_1.default.client.drive.files.list({
            'maxResults': 10000,
            'q': "title contains 'rezo' and trashed!=true "
        });
        request.execute((resp) => {
            console.log(DriveAPI.counter++);
            var event = new CustomEvent("finishloaddrive");
            document.dispatchEvent(event);
            var files = resp.items;
            if (files && files.length > 0) {
                var innerHTML = "";
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (file.fileExtension == "rezo") {
                        innerHTML = this.appendPre(file.title, file.id, file.modifiedDate, innerHTML);
                    }
                }
                _1.openLoad(innerHTML = (this.innerHTML) ? this.innerHTML : innerHTML);
                this.innerHTML = "";
                innerHTML = "";
                $('#loading').css("display", "none");
            }
            else {
                this.appendPre("", null, null, null);
            }
        });
    }
    //getFileMetadata(fileId) {
    //    var request = gapi.client.drive.files.get({
    //        'fileId': fileId
    //    });
    //    request.execute((file) => {
    //        console.log(DriveAPI.counter++)
    //        this.appendPre(file.title, file.id);
    //    })
    //}
    /**
     * Append a pre element to the body containing the given message
     * as its text node.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre(name, id, timeStamp, innerHTMLRef) {
        //var option = document.createElement("option");
        var titre = name.replace(/.rezo$/, '');
        var timeStampNumber = Date.parse(timeStamp);
        var innerHTML = "<div class='open' id='" + id + "' attr='" + timeStampNumber + "'><span class='openSpan' id='" + titre + "'>" + titre + "</span><img class='openImgModif' id='" + titre + "' src='images/pen.png'/><img class='openImgSuppr' src='images/SUPPR.png'></div>";
        //document.getElementById('open').innerHTML += innerHTML;
        this.innerHTML += innerHTML;
        innerHTMLRef += innerHTML;
        return innerHTMLRef;
        //var event = new CustomEvent("fillselect", { 'detail': option })
        //document.dispatchEvent(event);
    }
    /**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
    downloadFile(file, callback) {
        if (file.downloadUrl) {
            var accessToken = gapi_client_1.default.auth.getToken().access_token;
            $.support.cors;
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open('GET', file.downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function () {
                var obj = JSON.parse(xhr.response);
                _1.Rezo.rezoId = file.id;
                var title = file.title.replace(".rezo", "");
                var timeStamp = Date.parse(file.modifiedDate);
                callback(obj, title, timeStamp);
            };
            xhr.onerror = function () {
                callback(null, null, null);
            };
            xhr.send();
        }
        else {
            callback(null, null, null);
        }
    }
    /**
 * Print a file's metadata.
 *
 * @param {String} fileId ID of the file to print metadata for.
 */
    getFile(fileId, callback) {
        var request = gapi_client_1.default.client.drive.files.get({
            'fileId': fileId
        });
        try {
            request.execute((resp) => {
                console.log(DriveAPI.counter++);
                this.lastSavedFileMetadata = resp;
                callback(resp);
            });
        }
        catch (e) {
            'new Message("erreur")';
        }
    }
    createFile(fileName, callback) {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        var request = gapi_client_1.default.client.request({
            'path': '/drive/v2/files',
            'method': 'POST',
            'body': {
                "title": fileName + this.extension,
                "mimeType": "application/json",
            }
        });
        request.execute((resp) => {
            this.getFile(resp.id, (fileMetada) => { this.updateFile(resp.id, fileMetada, this.tempBlob, null); });
        });
    }
    /**
 * Update an existing file's metadata and content.
 *
 * @param {String} fileId ID of the file to update.
 * @param {Object} fileMetadata existing Drive file's metadata.
 * @param {File} fileData File object to read data from.
 * @param {Function} callback Callback function to call when the request is complete.
 */
    updateFile(fileId, fileMetadata, fileData, callback) {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";
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
            var request = gapi_client_1.default.client.request({
                'path': '/upload/drive/v2/files/' + fileId,
                'method': 'PUT',
                'params': { 'uploadType': 'multipart', 'alt': 'json' },
                'headers': {
                    'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            });
            if (!callback) {
                callback = () => {
                    _1.Rezo.load.style.display = "none";
                };
            }
            request.execute(callback);
        };
    }
    updateName(newname, id) {
        var request = gapi_client_1.default.client.drive.files.update({
            'fileId': id,
            'resource': {
                'title': newname + '.rezo'
            }
        });
        request.execute((resp) => {
            $(".open").remove();
            this.updateConnection();
        });
    }
    trashFile(fileId) {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        var request = gapi_client_1.default.client.drive.files.trash({
            'fileId': fileId
        });
        request.execute((resp) => {
            console.log(DriveAPI.counter++);
            $(".open").remove();
            $('#loading').css("display", "block");
            this.updateConnection();
            var event = new CustomEvent("updatecloudselect");
            document.dispatchEvent(event);
        });
    }
    logOut() {
        $("#saveBulle").css("display", "none");
        $("#homeBulle").css("display", "none");
        $("#realtimeBulle").css("display", "none");
        $("#driveBulle").css("display", "block");
        $(".open").remove();
        window.open("https://accounts.google.com/logout", "newwindow", "width=500,height=700");
    }
}
DriveAPI.counter = 0;
exports.DriveAPI = DriveAPI;
