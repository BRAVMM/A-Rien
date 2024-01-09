/**
 * @fileoverview Type for ModalData
 */

import { ActionJsonArray } from "./ActionJson.interface";

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
 * @interface ServiceActionInterface
 * @description Interface for ServiceActionInterface
 */
interface ServiceActionInterface {
  id: number;
  name: string;
  args: ActionJsonArray;
  reactionIds: number[];
}

// REACTION

/**
 * @interface ReactionJson
 * @description Interface for ReactionJson
 */
interface ReactionJson {
  title: string;
  type: string;
  description: string;
  range?: number[];
}

/**
 * @interface ReactionJsonArray
 * @description Interface for ReactionJsonArray
 */
interface ReactionJsonArray extends Array<ReactionJson> {}

/**
 * @interface ServiceReactionInterface
 * @description Interface for ServiceReactionInterface
 */
interface ServiceReactionInterface {
  id: number;
  name: string;
  args: ReactionJsonArray;
  actionIds: number[];
}

export type {
  ModalDataInterface,
  ServiceActionInterface,
  ServiceReactionInterface,
};
