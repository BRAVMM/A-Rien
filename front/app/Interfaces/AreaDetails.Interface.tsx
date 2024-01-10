/**
 * @fileoverview Type for AreaDetailsInterface.
 */


/**
 * @interface AreaDetailsInterface
 * @description Interface for AreaDetailsInterface.
 * @property {number} id - Id of the AreaDetailsInterface.
 * @property {string} title - Name of the AreaDetailsInterface.
 * @property {string} actionName - Name of the action of the AreaDetailsInterface.
 * @property {boolean} isActivated - Status of the AreaDetailsInterface.
 */
interface AreaDetailsInterface {
    id: number;
    title: string;
    actionName: string;
    isActivated: boolean;
}

export type { AreaDetailsInterface };
