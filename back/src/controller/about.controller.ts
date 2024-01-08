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
            name: "new_message_in_group",
            description: "A new message is posted in the group"
          },
          {
            name: "new_message_inbox",
            description: "A new private message is received by the user"
          },
          {
            name: "new_like",
            description: "The user gains a like from one of their messages"
          }
        ],
        reactions: [
          {
            name: "like_message",
            description: "The user likes a message"
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
