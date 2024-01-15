/**
 * @fileoverview Interfaces for the Outlook service
 */

/**
 * @interface OutlookTriggerData
 * @description The data of a Outlook trigger
 */
interface OutlookTriggerData {
    userId: string;
    subjectOfEmail: string;
    numberOfMails: number;
    isNew: boolean;
}

export {OutlookTriggerData};
