import { Request } from "express";
import { TokenData } from "./token.interface";

/**
 * Extends of Request express type if there is a need to stock other data in the request
 */
interface CustomRequest extends Request {
    user: TokenData
}

export { CustomRequest }
