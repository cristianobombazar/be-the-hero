import connection from '../../knex';
import {Ngo} from "../model/ngo.model";
import uuidGenerator from "../util/uuid.util";

class NgoRepository {

    async save(ngo: Ngo): Promise<string> {
        ngo.id = uuidGenerator();
        await connection('ngo').insert(ngo);
        return ngo.login;
    }

    async findAll(): Promise<any> {
        return await connection('ngo').select('*');
    }

    async findByLogin(login: String): Promise<Ngo> {
        return await connection('ngo').where('login', login).select('*').first();
    }

};

export default new NgoRepository();