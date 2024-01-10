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
    function getOrCreateUserTimerTriggerData(userId: number, timeNeeded: string): TimerTriggerData {
        if (userTimerTriggerData[userId]) {
            return userTimerTriggerData[userId];
        }
        const timeNeededTemp: number = parseInt(timeNeeded);
        userTimerTriggerData[userId] = {
            userId,
            timer: new Date(),
            gap: timeNeededTemp,
        };
        let userTimerTriggerDataTemp: TimerTriggerData = userTimerTriggerData[userId];

        userTimerTriggerDataTemp.timer.setMinutes(userTimerTriggerDataTemp.timer.getMinutes() + timeNeededTemp);
        console.log('userTimerTriggerDataTemp.timer = ', userTimerTriggerDataTemp.timer);
        console.log("actual time = ", new Date());
        console.log("diff = ", userTimerTriggerDataTemp.timer.getTime() - new Date().getTime());
        return userTimerTriggerData[userId];
    }

    /**
     * Add a song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the oauth
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const actionWhenXTimeStamped = async (ownerId: number, oauthId: number, data: any): Promise<{result: boolean, data: any}> => {
        try {
            const timerTriggerData: TimerTriggerData = getOrCreateUserTimerTriggerData(ownerId, data.timeNeeded);

            if (timerTriggerData.timer.getTime() - new Date().getTime() <= 0) {
                console.log('Timer is expired');
                timerTriggerData.timer = new Date();
                timerTriggerData.timer.setMinutes(timerTriggerData.timer.getMinutes() + timerTriggerData.gap);
                return {data: null, result: true};
            } else {
                return {data: null, result: true};
            }
        } catch (error) {
            console.error('Error executing reaction timer add to playlist:', error);
            return {data: null, result: true};
        }
    }
}

export { TimerTriggers };
