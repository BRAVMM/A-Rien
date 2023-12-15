/**
 * @fileoverview Type for ModalData
 */

import { MouseEventHandler } from "react";

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


export type { ModalDataInterface };
