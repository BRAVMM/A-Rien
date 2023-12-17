interface DataBody {
    getString(): string;
}

class SpotifyDataBody implements DataBody {
    code: string;
    constructor(code: string) {
        this.code = code
    }

    getString(): string {
        return JSON.stringify({code : this.code})
    }
}
export type { DataBody };

export { SpotifyDataBody };
