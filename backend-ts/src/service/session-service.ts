import ngoService from './ngo-service';
import {EntityNotFoundError} from '../exceptions/entity-not-found.error';

class SessionService {

  async handleSession(ngoLogin: string): Promise<string> {
      const ngo = await ngoService.findByLogin(ngoLogin);
      if (!ngo) {
        throw EntityNotFoundError.create('The provided NGO does not exists');
      }
      return ngo.name;
  }
}

export default new SessionService();