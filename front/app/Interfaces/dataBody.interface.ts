/**
 * Represents the interface for a data body.
 */
interface DataBody {
    /**
     * Gets the string representation of the data body.
     * @returns The string representation.
     */
    getString(): string;
}

/**
 * Represents the Spotify data body.
 */
class SpotifyDataBody implements DataBody {
    readonly code: string;
    /**
     * Creates a new instance of SpotifyDataBody.
     * @param code - The code.
     */
    constructor(code: string) {
        this.code = code
    }

    /**
     * Gets the string representation of the Spotify data body.
     * @returns The string representation.
     */
    getString(): string {
        return JSON.stringify({ code: this.code })
    }
}

/**
 * Represents the Discord data body.
 */
class DiscordDataBody implements DataBody {
    readonly code: string;
    readonly guildId: string;

    /**
     * Creates a new instance of DiscordDataBody.
     * @param code - The code.
     */
    constructor(code: string, guildId: string) {
        this.code = code
        this.guildId = guildId
    }

    /**
     * Gets the string representation of the Discord data body.
     * @returns The string representation.
     */
    getString(): string {
        return JSON.stringify({ code: this.code, guildId: this.guildId })
    }
}

export type { DataBody };

export { SpotifyDataBody, DiscordDataBody };
