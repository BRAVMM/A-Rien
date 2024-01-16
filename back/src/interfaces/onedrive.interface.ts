/**
 * @fileoverview Interfaces for the OneDrive service
 */

/**
 * @interface OneDriveTriggerData
 * @description The data of a OneDrive trigger
 */
interface OneDriveTriggerData {
    userId: string;
    id: string;
    folderLength: number;
    isNew: boolean;
}

export {OneDriveTriggerData};
