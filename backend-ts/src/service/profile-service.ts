import incidentService from '../service/incident-service';
import ngoService from '../service/ngo-service';

import {EntityNotFoundError} from '../exceptions/entity-not-found.error';
import {Incident} from '../model/incident.model';

class ProfileService {

  async findAllByNgo(ngoLogin: string):Promise<Array<Incident>> {
    const ngo = await ngoService.findByLogin(ngoLogin);
    if (!ngo) {
      throw EntityNotFoundError.create('The provided NGO does not exists');
    }
    return incidentService.findAllByNgo(ngo);
  }

}

export default new ProfileService();