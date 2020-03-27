import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

class IncidentControllerValidation {

  public saveValidation(): RequestHandler {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required().min(5).max(50),
        description: Joi.string().required(),
        value: Joi.number().required(),
      }),
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown(),
    });
  }

  public deleteValidation(): RequestHandler {
    return celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8)
      }).unknown(),
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      }),
    });
  }

}

export default new IncidentControllerValidation();