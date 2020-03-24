const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;
        const ngo = await connection('ngo').where('id', id).select('name').first();
        if (ngo) {
            return response.json(ngo);
        } else {
            return response.status(400).json( {error: "Resource not found"} )
        }
    }
};