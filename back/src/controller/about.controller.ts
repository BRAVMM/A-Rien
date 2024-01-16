import { Request, Response } from 'express';
import { get } from 'request';

interface MessageAction {
  name: string;
  description: string;
}

interface Reaction {
  name: string;
  description: string;
}

interface Service {
  name: string;
  actions: MessageAction[];
  reactions: Reaction[];
}

interface Server {
  current_time: number;
  services: Service[];
}

interface Client {
  host: string;
}

interface MyJson {
  client: Client;
  server: Server;
}


const getUnixTime = (): number => {
  return Math.floor(Date.now() / 1000);
}

const json: MyJson = {
  client: {
    host: "bravmm.myfdp.online"
  },
  server: {
    current_time: getUnixTime(),
    services: [
      {
        name: "Spotify",
        actions: [
          {
            name: "New saved song",
            description: "When a new song is saved"
          },
          {
            name: "New saved album",
            description: "When a new album is saved"
          },
          {
            name: "New created playlist",
            description: "When a new playlist is created"
          },
          {
            name: 'New saved song from genre',
            description: 'When a new song is saved from a genre',
          },
          {
            name: 'New saved song from artist',
            description: 'When a new song is saved from an artist',
          }
        ],
        reactions: [
          {
            name: 'Add to playlist',
            description: 'Add a song to a playlist',
          },
          {
            name: 'Add random to playlist',
            description: 'Add a random song to a playlist',
          }
        ]
      },
      {
        name: "Timer",
        actions: [
          {
            name: "When X time stamped",
            description: "When X time is stamped (in minutes)"
          }
        ],
        reactions: [
        ]
      },
      {
        name: 'Outlook',
        actions: [
          {
            name: 'When a new email is received',
            description: 'When a new email is received'
          },
        ],
        reactions: [
          {
            name: 'Send email',
            description: 'Send an email',
          },
          {
            name: 'Create Folder',
            description: 'Create a folder',
          }
        ]
      },
      {
        name: 'OneDrive',
        actions: [
          {
            name: 'When a new document or folder is created',
            description: 'When a new document or folder is created',
          },
        ],
        reactions: []
      },
      {
        name: 'Teams',
        actions: [
        ],
        reactions: [
          {
            name: 'Send group message',
            description: 'Send a message to the group choosen',

          },
          {
            name: 'Send message to team channel',
            description: 'Send a message to the channel of a team chosen',
          }
        ]
      },
      {
        name: "Discord",
        actions: [
        ],
        reactions: [
          {
            name: 'Send discord message',
            description: 'Send a message to a channel',
          }
        ]
      }
    ]
  }
};

const getAbout = async (req: Request, res: Response) => {
  try {
    const about = json;

    res.status(200).json(about);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export { getAbout };
