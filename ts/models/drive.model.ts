export interface IDriveAPI {

    CLIENT_ID: string

    SCOPES: string[]
    faustFolder: string
    isFaustFolderPresent: boolean
    faustFolderId: string;
    lastSavedFileId: string;
    lastSavedFileMetadata: string;
    tempBlob: Blob;
    innerHTML: string
    extension: string

    /**
     * Check if current user has authorized this application.
    * disable to deactivate pop up window when not connected
     */
    checkAuth: () => void
    updateConnection: () => void
    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    handleAuthResult: (authResult) => void
    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    handleAuthClick: () => void
    /**
     * Load Drive API client library.
     */
    loadDriveApi: () => void
    /**
     * Print files.
     */

    listFolder: () => void
    /**
     * Append a pre element to the body containing the given message
     * as its text node.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre: (name: string, id: string, timeStamp: string, innerHTMLRef: string) => string
    /**
    * Download a file's content.
    *
    * @param {File} file Drive File instance.
    * @param {Function} callback Function to call when the request is complete.
    */
    downloadFile: (file: any, callback: (rezoSave: any, title: string, timeStamp: number) => void) => void
    /**
    * Print a file's metadata.
    *
    * @param {String} fileId ID of the file to print metadata for.
    */
    getFile: (fileId, callback) => any
    createFile: (fileName: string) => void
    /**
    * Update an existing file's metadata and content.
    *
    * @param {String} fileId ID of the file to update.
    * @param {Object} fileMetadata existing Drive file's metadata.
    * @param {File} fileData File object to read data from.
    * @param {Function} callback Callback function to call when the request is complete.
    */
    updateFile: (fileId, fileMetadata, fileData, callback) => void
    updateName: (newname: string, id: string) => void
    trashFile: (fileId: string) => void
    logOut: () => void
}