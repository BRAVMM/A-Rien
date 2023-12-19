/**
 * @fileoverview Timer interface.
 */

/**
 * @interface TimerTriggerData
 * @description Timer trigger data
 * @property {number} userId - The user id
 * @property {Date} timer - The timer
 */
interface TimerTriggerData {
    userId: number;
    timer: Date;
    timeNeeded: Date;
}