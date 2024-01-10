namespace TeamsTriggers {

    export const checkTeamsNewSavedSong = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        console.log(ownerId);
        console.log(oauthId);
        console.log(data);
        return true;
    }
    
}

export {TeamsTriggers};