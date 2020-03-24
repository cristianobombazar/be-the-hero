const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ngo').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
        return response.json({id});
    },
    async findAll(request, response) {
        const ngos = await connection('ngo').select('*');
        return response.json(ngos);
    }
};