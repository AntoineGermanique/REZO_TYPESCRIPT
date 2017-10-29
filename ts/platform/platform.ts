import { DriveAPI, DriveAPICordova } from './'
import { IDriveAPI } from '../'
import { } from './DriveAPICordova'

declare const ENV
export let drive: IDriveAPI = (() => {
    if (ENV === 'web') {
        return new DriveAPI();
    } else {
        return new DriveAPICordova()
    }
})()
