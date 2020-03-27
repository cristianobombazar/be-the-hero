import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

class ProfileControllerValidation {
  
  findAll(): RequestHandler {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown(),
      
    });
  }
}

export default new ProfileControllerValidation();