<!-- omit in toc -->
# How to add a service

## Summary

- [Summary](#summary)
- [Files to modify](#files-to-modify)
- [Create your triggers and reactions](#create-your-triggers-and-reactions)
  - [Create your triggers](#create-your-triggers)
  - [Create your reactions](#create-your-reactions)
- [Add your service to the task scheduler](#add-your-service-to-the-task-scheduler)
  - [Import your service](#import-your-service)
  - [Add your service to functions lists](#add-your-service-to-functions-lists)
- [Add your service to the API](#add-your-service-to-the-api)
  - [Create your service API](#create-your-service-api)
  - [Create a route for your service](#create-a-route-for-your-service)
- [Add your service to the DB](#add-your-service-to-the-db)
  - [Add your service](#add-your-service)
  - [Add your actions](#add-your-actions)
- [Add your reactions](#add-your-reactions)
- [Add your service to the about.json page](#add-your-service-to-the-aboutjson-page)

## Files to modify

- `/back/src/services/taskScheduler.ts`
- `/back/src/services/servicesApps/triggers/<yourService>.triggers.servicesApp.ts`
- `/back/src/services/servicesApps/reactions/<yourService>.reactions.servicesApp.ts`
- `/back/src/services/API/<YourService>/refreshToken.service.ts`

- `/back/src/middleware/services/Auth/<yourService>Auth.middleware.ts`
- `/back/src/middleware/services/refreshCallback/<yourService>Refresh.middleware.ts`

- `/back/src/route/services.route.ts`

- `/back/src/controller/services/<yourService>.controller.ts`

- `/back/src/index.ts`

- `/back/src/controller/about.controller.ts`

## Create your triggers and reactions

### Create your triggers

Create your triggers in `/back/src/services/servicesApps/triggers/<yourService>.triggers.servicesApp.ts`:

```typescript
/**
 * @fileOverview <YourService> Triggers ServicesApp
 */

/**
 * @namespace <YourService>Triggers
 * @description <YourService> Triggers ServicesApp
 */
namespace <YourService>Triggers {
    /**
     * Check if a new song has been saved
     * @param ownerId - The owner id of the trigger
     * @param oauthId - The oauth id of the trigger
     * @param data - The data of the trigger
     * @returns {Promise<boolean>} - The result of the trigger
     */
    export const check<YourService>NewSavedSong = async (ownerId: number, oauthId: number, data: JSON): Promise<boolean> => {
        console.log(ownerId);
        console.log(oauthId);
        console.log(data);
        return true;
    }
}

export {<YourService>Triggers};
```

### Create your reactions

Create your reactions in `/back/src/services/servicesApps/reactions/<yourService>.reactions.servicesApp.ts`:

```typescript
/**
 * @fileOverview <YourService> reactions services
 */

/* Services */
import {OAuthService} from "../../oauth.service";

/**
 * @namespace <YourService>Reactions
 * @description <YourService> reactions services
 */
namespace <YourService>Reactions {
    /**
     * Add a song to a playlist
     * @param ownerId - The id of the owner
     * @param oauthId - The id of the OAuth
     * @param actionData - The action data
     * @param reactionData - The reaction data
     * @returns {Promise<boolean>} - The result of the reaction
     */
    export const reaction<YourService>AddToPlaylist = async (ownerId: number, oauthId: number, actionData: JSON, reactionData: JSON): Promise<boolean> => {
        const oauthToken: string | null = await OAuthService.getDecryptedAccessTokenFromId(oauthId, ownerId);

        if (oauthToken === null) {
            console.error("OAuth token not found");
            return false;
        }
        console.log(ownerId);
        console.log(actionData);
        console.log(reactionData);
        return true;
    }
}

export {<YourService>Reactions};
```

## Add your service to the task scheduler

Add your service to the task scheduler in `/back/src/services/taskScheduler.ts`:

### Import your service

```typescript
/* Import all triggers functions */
import {<YourService>Triggers} from "./<yourService>/triggers/<yourservice>.triggers.servicesApp";
/* Import all reactions functions */
import {<YourService>Reactions} from "./<yourService>/reactions/<yourservice>.reactions.servicesApp";
```

### Add your service to functions lists

```typescript
/* Constants */
const ACTIONS_FUNCTIONS: actionFunction = {
    1: <YourService>Triggers.check<YourService>NewSavedSong,
    2: <YourService>Triggers.check<YourService>NewSavedAlbum,
    3: <YourService>Triggers.check<YourService>NewSavedArtist,
    4: <YourService>Triggers.check<YourService>NewSavedPlaylist,
    5: <YourService>Triggers.check<YourAction>,
};

const REACTIONS_FUNCTIONS: reactionFunction = {
    1: <YourService>Reactions.reaction<YourService>AddToPlaylist,
    2: <YourService>Reactions.reaction<YourAction>,
};
```

## Add your service to the API

### Create your service API

Create your service API in `/back/src/services/API/<YourService>/refreshToken.service.ts`:

```typescript
/**
 * @fileOverview <YourService> refresh token service
 */
```

### Create a route for your service

Add your service to the API in ``/back/src/route/services.route.ts``:

```typescript
/** Definitions of routes */
router.post('/<yourservice>/registerToken', verifyToken, <yourservice>Auth, refreshTokens, userAlreadyAuth, <yourservice>Controller.registerToken)
```

## Add your service to the DB

### Add your service

Add your service to the DB in `/back/src/index.ts`:

```typescript
const addServicesToDB = async () => {
    const SERVICES: any[] = [
        {
            id: 1,
            name: 'Spotify',
            actionsId: [1, 2, 3, 4, 5, 6, 7],
            reactionsId: [1, 2],
        },
        {
            id: 2,
            name: 'Timer',
            actionsId: [8],
            reactionsId: [],
        },
        // Add your service here
        {
            id: 3,
            name: '<YourService>',
            actionsId: [1, 2, 3, 4, 5],
            reactionsId: [1, 2],
        }
    ];

    for (const service of SERVICES) {
        if (await Service.findOne({where: {name: service.name}})) {
            continue;
        }
        await Service.create({
            id: service.id,
            name: service.name,
            actionsIds: service.actionsId,
            reactionsIds: service.reactionsId,
        });
    }
};
```

- id: The id of the service (incremental)
- name: The name of the service
- actionsId: The ids of the actions of the service (can be found in `/back/src/services/taskScheduler.ts`)
- reactionsId: The ids of the reactions of the service (can be found in `/back/src/services/taskScheduler.ts`)

### Add your actions

Add your actions to the DB in `/back/src/index.ts`:

```typescript
const addActionsToDB = async () => {
    const ACTIONS: any[] = [
        {
            name: 'Spotify',
            actions: [
                {
                    id: 1,
                    name: 'New saved song',
                    description: 'When a new song is saved',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 2,
                    name: 'New saved album',
                    description: 'When a new album is saved',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 3,
                    name: 'New saved artist',
                    description: 'When a new artist is saved',
                    args: [{
                        title: "gender",
                        type: 'string',
                        description: "Enter a gender",
                    }],
                    reactionsIds: [1],
                },
                {
                    id: 4,
                    name: 'New created playlist',
                    description: 'When a new playlist is created',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 5,
                    name: 'New saved playlist',
                    description: 'When a new playlist is saved',
                    args: [],
                    reactionsIds: [1],
                },
                {
                    id: 6,
                    name: 'New saved song from genre',
                    description: 'When a new song is saved from a genre',
                    args: [{
                        title: "genre",
                        type: 'string',
                        description: 'Enter a genre',
                    }],
                    reactionsIds: [1],
                },
                {
                    id: 7,
                    name: 'New saved song from artist',
                    description: 'When a new song is saved from an artist',
                    args: [{
                        title: "artistId",
                        type: 'string',
                        description: 'Enter an artist id',
                    }],
                    reactionsIds: [1],
                },
            ]
        },
        {
            name: 'Timer',
            actions: [
                {
                    id: 8,
                    name: 'When X time stamped',
                    description: 'When X time is stamped (in minutes)',
                    args: [{
                        title: "timeNeeded",
                        type: 'number',
                        description: 'Enter a number (in minutes)',
                        range: [1, 1440],
                    }],
                    reactionsIds: [2],
                },
            ]
        },
        // Add your service here
        {
            name: '<YourService>',
            actions: [
                {
                    id: 1,
                    name: '<YourAction>',
                    description: '<YourAction> description',
                    args: [
                        {
                            title: "<YourArgument>",
                            type: '<YourType>',
                            description: "<YourArgument> description",
                        },
                    ],
                    reactionsIds: [1],
                },
            ]
        }
    ];

    for (const service of ACTIONS) {
        for (const action of service.actions) {
            if (await Action.findOne({where: {name: action.name}})) {
                continue;
            }
            await Action.create({
                id: action.id,
                name: action.name,
                args: action.args,
                reactionsIds: action.reactionsIds,
            });
        }
    }
}
```

- name: The name of the service
- actions: The actions of the service
  - id: The id of the action (incremental)
  - name: The name of the action
  - description: The description of the action
  - args: The arguments of the action
    - title: The title of the argument
    - type: The type of the argument
    - description: The description of the argument
    - range: The range of the argument (only for number type)
  - reactionsIds: The ids of the reactions of the action (can be found in `/back/src/services/taskScheduler.ts`)

## Add your reactions

Add your reactions to the DB in `/back/src/index.ts`:

```typescript
const addReactionsToDB = async () => {
    const REACTIONS: any[] = [
        {
            name: 'Spotify',
            reactions: [
                {
                    id: 1,
                    name: 'Add to playlist',
                    description: 'Add a song to a playlist',
                    args: [
                        {
                            title: "playlistId",
                            type: 'string',
                            description: "Enter a playlist id",
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Add random to playlist',
                    description: 'Add a random song to a playlist',
                    args: [
                        {
                            title: "playlistId",
                            type: 'string',
                            description: "Enter a playlist id",
                        },
                    ],
                },
            ]
        },
        // Add your service here
        {
            name: '<YourService>',
            reactions: [
                {
                    id: 1,
                    name: '<YourReaction>',
                    description: '<YourReaction> description',
                    args: [
                        {
                            title: "<YourArgument>",
                            type: '<YourType>',
                            description: "<YourArgument> description",
                        },
                    ],
                },
            ]
        }
    ];

    for (const service of REACTIONS) {
        for (const reaction of service.reactions) {
            if (await Reaction.findOne({where: {name: reaction.name}})) {
                continue;
            }
            await Reaction.create({
                id: reaction.id,
                name: reaction.name,
                description: reaction.description,
                args: reaction.args,
            });
        }
    }
}
```

- name: The name of the service
- reactions: The reactions of the service
  - id: The id of the reaction (incremental)
  - name: The name of the reaction
  - description: The description of the reaction
  - args: The arguments of the reaction
    - title: The title of the argument
    - type: The type of the argument
    - description: The description of the argument
    - range: The range of the argument (only for number type)

## Add your service to the about.json page

Add your service to the about.json page in `/back/src/controller/about.controller.ts`:

```typescript

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
      },
      // Add your service here
      {
        name: "<YourService>",
        actions: [
          {
            name: "<YourAction>",
            description: "<YourAction> description"
          }
        ],
        reactions: [
          {
            name: "<YourReaction>",
            description: "<YourReaction> description"
          }
        ]
      }
    ]
  }
};
```

- name: The name of the service
- actions: The actions of the service
  - name: The name of the action
  - description: The description of the action
- reactions: The reactions of the service
  - name: The name of the reaction
  - description: The description of the reaction
