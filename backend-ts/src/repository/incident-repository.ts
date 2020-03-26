import connection from '../../knex';
import { Incident } from "../model/incident.model";

class IncidentRepository {

  async save(incident: Incident): Promise<number> {
    const [id] = await connection('incident').insert(incident);
    return id;
  }

  async findAll(page: number, size: number): Promise<Array<any>> {
    const [count] = await connection('incident').count();

    const incidents = await connection('incident')
               .join('ngo', 'ngo.login', '=', 'incident.ngo_id')
               .limit(size)
               .offset((page-1) * size)
               .select(['incident.*',
                        'ngo.name',
                        'ngo.email',
                        'ngo.whatsapp',
                        'ngo.city',
                        'ngo.uf']);
    const total = count['count(*)'];
    return [incidents, total];
  }
  
  async deleteById(id: number): Promise<void> {
    await connection('incident').where('id', id).delete();
    return Promise.resolve();
  }

  async findAllByNgo(ngo: string): Promise<Array<Incident>> {
    return await connection('incident').where('ngo_id', ngo).select('*');
  }

}

export default new IncidentRepository();