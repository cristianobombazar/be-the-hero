import { celebrate, Segments, Joi } from 'celebrate';
import { RequestHandler } from 'express';

class SessionControllerValidation {

  public authenticateValidate(): RequestHandler {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required().length(8),
      })
    });
  }

}
export default new SessionControllerValidation();