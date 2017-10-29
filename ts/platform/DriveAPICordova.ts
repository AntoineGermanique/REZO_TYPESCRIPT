
import { Utilitary, openLoad, RezoSave, IDriveAPI } from '../index';
import { Rezo } from '../rezo';
import * as $ from 'jquery';
declare let window: {
    plugins: any
}

export class DriveAPICordova implements IDriveAPI {
    CLIENT_ID: string;
    SCOPES: string[];
    faustFolder: string;
    isFaustFolderPresent: boolean;
    faustFolderId: string;
    lastSavedFileId: string;
    lastSavedFileMetadata: string;
    tempBlob: Blob;
    innerHTML: string;
    extension: string;
    constructor() {

    }


    checkAuth: () => void;
    updateConnection () {
        this.listFolder();
    };
    handleAuthResult: (authResult: any) => void;
    handleAuthClick() {
        Rezo.isDriveConnected = true;
        $("#saveBulle").css("display", "block");
        $("#homeBulle").css("display", "block");
        $("#driveBulle").css("display", "none");
        $("#realtimeBulle").css("display", "block");
        $('#loading').css("display", "none");        
    };
    loadDriveApi: () => void;

    listFolder() {
        window.plugins.gdrive.fileList(
            (res) => {
                //the files are under res.flist;
                console.log(res);
            },
            function (err) {
                console.log(err);
            }
        );
    };
    appendPre: (name: string, id: string, timeStamp: string, innerHTMLRef: string) => string;
    downloadFile: (file: any, callback: (rezoSave: any, title: string, timeStamp: number) => void) => void;
    getFile: (fileId: any, callback: any) => any;
    createFile: (fileName: string) => void;
    updateFile: (fileId: any, fileMetadata: any, fileData: any, callback: any) => void;
    updateName: (newname: string, id: string) => void;
    trashFile: (fileId: string) => void;
    logOut: () => void;

}