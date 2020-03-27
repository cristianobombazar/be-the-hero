import {Incident} from '../model/incident.model';
import repository from '../repository/incident-repository';
import ngoService from '../service/ngo-service';
import {EntityNotFoundError} from '../exceptions/entity-not-found.error';
import {Ngo} from '../model/ngo.model';


class IncidentService {

  async save(incident: Incident): Promise<number> {
    const existsNgo = await ngoService.existsByLogin(incident.ngo_id);
    if (!existsNgo) {
      throw EntityNotFoundError.create('The provided NGO does not exists');
    }
    return await repository.save(incident);
  }
  
  async findAll(page =1, size = 5): Promise<Array<any>> {
    return await repository.findAll(page, size);
  }

  async deleteIncident(incidentId: number, ngoLogin: string): Promise<void> {
    const existsNgo = await ngoService.existsByLogin(ngoLogin);
    if (!existsNgo) {
      throw EntityNotFoundError.create('The provided NGO does not exists');
    }
    return await repository.deleteById(incidentId);    
  }


  async findAllByNgo(ngo: Ngo): Promise<Array<Incident>> {
    return await repository.findAllByNgo(ngo.login);
  }

}

export default new IncidentService();