import {Ngo} from "../model/ngo.model";
import crypto from 'crypto';
import repository from '../repository/ngo-repository';

class NgoService {

    save(ngo: Ngo): Promise<string> {
        ngo.login =  crypto.randomBytes(4).toString('HEX');
        return repository.save(ngo);
    }

    findAll(): Promise<any> {
        return repository.findAll();
    }

    findByLogin(login: string): Promise<Ngo> {
        return repository.findByLogin(login);
    }

    async existsByLogin(login: string): Promise<boolean> {
        const ngo = await this.findByLogin(login);
        return !!ngo;
    }

}

export default new NgoService();