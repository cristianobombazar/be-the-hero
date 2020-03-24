import connection from '../../knex';
import {Ngo} from "../model/ngo.model";
import uuidGenerator from "../util/uuid.util";

export class NgoRepository {

    async save(ngo: Ngo): Promise<string> {
        ngo.id = uuidGenerator();
        await connection('ngo').insert(ngo);
        return ngo.login;
    }

    async findAll(): Promise<any> {
        return await connection('ngo').select('*');
    }

};

export default new NgoRepository();