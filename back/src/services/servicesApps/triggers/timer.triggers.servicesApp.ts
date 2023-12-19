/**
 * @fileOverview Timer Triggers ServicesApp
 */

/**
 * @constant
 */
const userTimerTriggerData: Record<string, TimerTriggerData> = {};

/**
 * @namespace TimerTriggers
 * @description Timer Triggers ServicesApp
 */
namespace TimerTriggers {
    /**
     * Get or create the timer trigger data
     * @param userId - The user id
     * @param timeNeeded - The time needed
     * @returns {TimerTriggerData} - The timer trigger data
     **/
    function getOrCreateUserTimerTriggerData(userId: number, timeNeeded: Date): TimerTriggerData {
        if (userTimerTriggerData[userId]) {
            return userTimerTriggerData[userId];
        }
        userTimerTriggerData[userId] = {
            userId,
            timer: new Date(),
            timeNeeded: timeNeeded
        };
        return userTimerTriggerData[userId];
    }

    /**
     * Add a song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the oauth
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const actionWhenXTimeStamped = async (ownerId: number, oauthId: number, data: JSON): Promise<{result: boolean, data: any}> => {
        try {
            const timerTriggerData: TimerTriggerData = getOrCreateUserTimerTriggerData(ownerId, data.timeNeeded);

            if (timerTriggerData.timer.getTime() - timerTriggerData.timeNeeded.getTime() >= 0) {
                console.log('Timer is expired');
                return {data: null, result: false};
            } else {
                return {data: null, result: true};
            }
        } catch (error) {
            console.error('Error executing reaction timer add to playlist:', error);
            return {data: null, result: false};
        }
    }
}