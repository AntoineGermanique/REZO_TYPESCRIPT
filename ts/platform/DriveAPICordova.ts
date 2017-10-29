
import { Utilitary, openLoad, RezoSave, IDriveAPI } from '../index';

export class DriveAPICordova implements IDriveAPI{
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
    checkAuth: () => void;
    updateConnection: () => void;
    handleAuthResult: (authResult: any) => void;
    handleAuthClick: () => void;
    loadDriveApi: () => void;
    listFolder: () => void;
    appendPre: (name: string, id: string, timeStamp: string, innerHTMLRef: string) => string;
    downloadFile: (file: any, callback: (rezoSave: any, title: string, timeStamp: number) => void) => void;
    getFile: (fileId: any, callback: any) => any;
    createFile: (fileName: string) => void;
    updateFile: (fileId: any, fileMetadata: any, fileData: any, callback: any) => void;
    updateName: (newname: string, id: string) => void;
    trashFile: (fileId: string) => void;
    logOut: () => void;

}