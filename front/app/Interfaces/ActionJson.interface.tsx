/**
 * @fileoverview Type for AREAJsonArray
 */

/**
 * @interface ActionJsonInterface
 * @description Interface for ActionJson
 * @property {string} title
 * @property {string} type
 */
interface ActionJsonInterface {
    title: string;
    type: string;
}

/**
 * @interface ActionJsonArrayType
 * @description Interface for ActionJsonArray
 * @extends {Array<ActionJsonInterface>}
 * @see {ActionJsonInterface}
 */
 */
interface ActionJsonArray extends Array<ActionJsonInterface> {}

export type { ActionJsonInterface, ActionJsonArray };

