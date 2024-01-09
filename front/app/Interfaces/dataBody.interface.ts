interface DataBody {
    getString(): string;
}

class SpotifyDataBody implements DataBody {
    readonly code: string;
    constructor(code: string) {
        this.code = code
    }

    getString(): string {
        return JSON.stringify({code : this.code})
    }
}

class MicroSoftDataBody implements DataBody {
    readonly code: string;
    constructor(code: string) {
        this.code = code
    }

    getString(): string {
        return JSON.stringify({code : this.code})
    }
}




export type { DataBody };

export { SpotifyDataBody, MicroSoftDataBody };
