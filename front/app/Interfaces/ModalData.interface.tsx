/**
 * @fileoverview Type for ModalData
 */

/**
 * @interface ModalDataInterface
 * @description Interface for Services Modal
 * @property {string} name
 * @property {number[]} actionIds
 * @property {number[]} reactionIds
 */
interface ModalDataInterface {
    name: string;
    id: number;
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
 * @interface ReactionJsonArray
 * @description Interface for ReactionJsonArray
 */
interface ReactionJsonArray {
    title: string;
    type: string;
}




/**
 * @interface ServiceReactionInterface
 * @description Interface for ServiceReactionInterface
 */
interface ServiceReactionInterface {
    id: number;
    name: string;
    args: ReactionJsonArray[];
    actionIds: number[];
}

export type { ModalDataInterface, ServiceActionInterface, ServiceReactionInterface };
