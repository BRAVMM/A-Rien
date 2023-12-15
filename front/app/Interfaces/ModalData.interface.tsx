/**
 * @fileoverview Type for ModalData
 */

/**
 * @interface ModalDataInterface
 * @description Interface for ActionJson
 * @property {string} name
 * @property {number[]} actionIds
 * @property {number[]} reactionIds
 */
interface ModalDataInterface {
    name: string;
    actionIds: number[];
    reactionIds: number[];
}

/**
 * @interface ActionJsonArray
 * @description Interface for ActionJsonArray
 */
interface ActionJsonArray {
    title: string;
    type: string;
}

/**
 * @interface ServiceActionInterface
 * @description Interface for ServiceActionInterface
 */
interface ServiceActionInterface {
    id: number;
    name: string;
    args: ActionJsonArray[];
    reactionIds: number[];
}



        // REACTION



/**
 * @interface ServiceReactionInterface
 * @description Interface for ServiceReactionInterface
 */
interface ServiceReactionInterface {
    id: number;
    name: string;
    args: Record<string, any>[]; 
    actionIds: number[];
}

export type { ModalDataInterface, ServiceActionInterface, ServiceReactionInterface };
