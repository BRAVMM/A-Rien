/**
 * @fileoverview Type for ActionReaction.
 */


/**
 * @interface AreaDetailsInterface
 * @description Interface for ActionReaction.
 * @property {string} id - Id of the ActionReaction.
 * @property {string} name - Name of the ActionReaction.
 * @property {string} image - Image of the ActionReaction.
 * @property {boolean} status - Status of the ActionReaction.
 */
interface AreaDetailsInterface {
    id: number;
    image: string;
    name: string;
    status: boolean;
}

export type { AreaDetailsInterface };
