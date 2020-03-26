import {Response} from "express";

export class ResponseWrapper {

  static wrapError(error: Error, response: Response): Response {
    return this.wrap(error.message, response);
  }

  static wrap(message: string, response: Response): Response {
    return response.status(400).json( {"error": message} )
  }

}
