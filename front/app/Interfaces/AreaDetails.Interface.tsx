/**
 * @fileoverview Type for AreaDetailsInterface.
 */


/**
 * @interface AreaDetailsInterface
 * @description Interface for AreaDetailsInterface.
 * @property {number} id - Id of the AreaDetailsInterface.
 * @property {string} name - Name of the AreaDetailsInterface.
 * @property {string} image - Image of the AreaDetailsInterface.
 * @property {boolean} status - Status of the AreaDetailsInterface.
 */
interface AreaDetailsInterface {
    id: number;
    image: string;
    name: string;
    status: boolean;
}

export type { AreaDetailsInterface };
