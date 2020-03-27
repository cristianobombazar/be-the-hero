import {Ngo} from "../model/ngo.model";
import crypto from 'crypto';
import repository from '../repository/ngo-repository';

class NgoService {

    async save(ngo: Ngo): Promise<string> {
        ngo.login =  crypto.randomBytes(4).toString('HEX');
        return await repository.save(ngo);
    }

    async findAll(): Promise<any> {
        return await repository.findAll();
    }

    async findByLogin(login: string): Promise<Ngo> {
        return await repository.findByLogin(login);
    }

    async existsByLogin(login: string): Promise<boolean> {
        const ngo = await this.findByLogin(login);
        return !!ngo;
    }

}

export default new NgoService();