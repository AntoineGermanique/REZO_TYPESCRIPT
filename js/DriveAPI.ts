﻿// class to handel Drive Api request//
// using the v2 version



//object of the js drive api didn't found tpescript def, but should exist
declare var gapi

interface DriveFile {
    id: string
    title: string;
    name: string;
    downloadUrl: string;
    webContentLink: string;
    modifiedDate: string;
    fileExtension: string;

}

class DriveAPI {

    CLIENT_ID: string = '274114145570-ohvfonvi299jafoco3s9jld3omfhk3in.apps.googleusercontent.com';

    SCOPES: string[] = ['https://www.googleapis.com/auth/drive'];
    faustFolder: string = "FaustPlayground";
    isFaustFolderPresent: boolean = false;
    faustFolderId: string;
    lastSavedFileId: string;
    lastSavedFileMetadata: string;
    tempBlob: Blob;
    innerHTML: string = "";
    extension: string = ".rezo";
    static counter: number = 0;



    /**
     * Check if current user has authorized this application.
    * disable to deactivate pop up window when not connected
     */
    checkAuth() {

    }



    updateConnection() {
        $('#loading').css("display", "block");
        
        gapi.auth.authorize(
            {
                'client_id': this.CLIENT_ID,
                'scope': this.SCOPES.join(' '),
                'immediate': true
            }, (authResult) => { this.handleAuthResult(authResult) });
    }

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    handleAuthResult(authResult, auto?) {

        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.

            var event = new CustomEvent("authon")
            $("#saveBulle").css("display", "block");
            $("#homeBulle").css("display", "block");
            $("#driveBulle").css("display", "none");
            document.dispatchEvent(event);
            Rezo.isDriveConnected = true;
            this.loadDriveApi();
        } else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            var event = new CustomEvent("authoff")
            document.dispatchEvent(event);
        }
        if (authResult.error) {
            var event = new CustomEvent("clouderror", { 'detail': authResult.error })
            document.dispatchEvent(event);
        }
    }

    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    handleAuthClick(event) {
        if (gapi) {
            gapi.auth.authorize(
                { client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: false },
                (authResult) => { this.handleAuthResult(authResult) });
            return false;
        } else {
            alert("connexion au drive impossible, vérifiez votre connexion  internet")
            Utilitary.stopLoad();
        }
    }

    /**
     * Load Drive API client library.
     */
    loadDriveApi() {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        gapi.client.load('drive', 'v2', () => { this.listFolder() });
    }

    /**
     * Print files.
     */

    listFolder() {
        var request = gapi.client.drive.files.list({
            'maxResults': 10000,
            'q': "title contains 'rezo' and trashed!=true "

        });

        request.execute((resp) => {
            console.log(DriveAPI.counter++)
            var event = new CustomEvent("finishloaddrive")
            document.dispatchEvent(event);
            var files = resp.items;
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file: DriveFile = files[i];
                    if (file.fileExtension == "rezo") {
                        this.appendPre(file.title, file.id, file.modifiedDate);

                    }
                }
                openLoad(this.innerHTML);
                this.innerHTML = "";
                $('#loading').css("display", "none");

            } else {
                this.appendPre("", null,null);
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
    appendPre(name: string, id: string, timeStamp: string) {
        //var option = document.createElement("option");
        var titre = name.replace(/.rezo$/, '');
        var timeStampNumber = Date.parse(timeStamp);
        var innerHTML = "<div class='open' id='" + id + "' attr='" + timeStampNumber + "'><span class='openSpan' id='" + titre + "'>" + titre + "</span><img class='openImgModif' id='" + titre + "' src='images/pen.png'/><img class='openImgSuppr' src='images/SUPPR.png'></div>";
        //document.getElementById('open').innerHTML += innerHTML;
        this.innerHTML += innerHTML;

        //var event = new CustomEvent("fillselect", { 'detail': option })
        //document.dispatchEvent(event);

    }
    /**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
    downloadFile(file: DriveFile, callback: (rezoSave: RezoSave, title: string, timeStamp: number) => void) {
        if (file.downloadUrl) {
            var accessToken = gapi.auth.getToken().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file.downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function () {
                var obj = JSON.parse(xhr.response);
                Rezo.rezoId = file.id;
                var title = file.title.replace(".rezo", "");
                var timeStamp = Date.parse(file.modifiedDate);
                callback(obj, title, timeStamp);
            };
            xhr.onerror = function () {
                callback(null,null,null);
            };
            xhr.send();
        } else {
            callback(null,null,null);
        }
    }
    /**
 * Print a file's metadata.
 *
 * @param {String} fileId ID of the file to print metadata for.
 */
    getFile(fileId, callback): any {
        var request = gapi.client.drive.files.get({
            'fileId': fileId
        });
        try {
            request.execute((resp) => {
                console.log(DriveAPI.counter++)

                this.lastSavedFileMetadata = resp;
                callback(resp)
            })
        } catch (e) {
            'new Message("erreur")';
        }
    }


    createFile(fileName: string, callback) {
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

        request.execute((resp) => {
            this.getFile(resp.id, (fileMetada) => { this.updateFile(resp.id, fileMetada, this.tempBlob, null) })
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
            var multipartRequestBody =
                delimiter +
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
                callback = () => {
                    Rezo.load.style.display = "none";


                };
            }
            request.execute(callback);
        }
    }
    updateName(newname:string,id:string) {
        var request = gapi.client.drive.files.update({
            'fileId': id,
            'resource': {
                'title': newname + '.rezo'
            }
        })
        request.execute((resp) => {
            $(".open").remove();
            this.updateConnection();
        })
    }
    trashFile(fileId: string) {
        var event = new CustomEvent("startloaddrive");
        document.dispatchEvent(event);
        var request = gapi.client.drive.files.trash({
            'fileId': fileId
        });
        request.execute(function (resp) {
            console.log(DriveAPI.counter++)
            $(".open").remove();
            $('#loading').css("display", "block");
            drive.updateConnection();
            var event = new CustomEvent("updatecloudselect");
            document.dispatchEvent(event)
        });
    }
    logOut() {

        $("#saveBulle").css("display", "none");
        $("#homeBulle").css("display", "none");
        $("#driveBulle").css("display", "block");
        $(".open").remove();
        window.open("https://accounts.google.com/logout", "newwindow", "width=500,height=700")
    }
}