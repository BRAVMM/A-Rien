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
- [Add your service to the middleware](#add-your-service-to-the-middleware)

## Files to modify

- `/back/src/services/taskScheduler.ts`
- `/back/src/services/servicesApps/triggers/<yourService>.triggers.servicesApp.ts`
- `/back/src/services/servicesApps/reactions/<yourService>.reactions.servicesApp.ts`
- `/back/src/services/API/<YourService>/refreshToken.service.ts`

- `/back/src/middleware/services/Auth/<yourService>Auth.middleware.ts`
- `/back/src/middleware/services/refreshCallback/<yourService>Refresh.middleware.ts`

- `/back/src/route/services.route.ts`

- `/back/src/controller/services/<yourService>.controller.ts`

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

## Add your service to the middleware
