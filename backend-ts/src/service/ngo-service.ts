import {Ngo} from "../model/ngo.model";
import crypto from 'crypto';
import repository from '../repository/ngo-repository';

export class NgoService {

    save(ngo: Ngo): Promise<string> {
        ngo.login =  crypto.randomBytes(4).toString('HEX');
        return repository.save(ngo);
    }

    findAll(): Promise<any> {
        return repository.findAll();
    }

}

export default new NgoService();