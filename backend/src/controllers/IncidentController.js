const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value  } = request.body;
        const ngo_id = request.headers.authorization;

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ngo_id
        });
        return response.json({ id });

    },
    async findAll(request, response) {
        const { page = 1, size = 5 } = request.query;

        const [count] = await connection('incident').count();

        const ngos = await connection('incident')
                   .join('ngo', 'ngo.id', '=', 'incident.ngo_id')
                   .limit(size)
                   .offset((page-1) * size)
                   .select(['incident.*',
                                    'ngo.name',
                                    'ngo.email',
                                    'ngo.whatsapp',
                                    'ngo.city',
                                    'ngo.uf']);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(ngos);
    },

    async deleteById(request, response) {
        const { id } = request.params;
        const ngo_id = request.headers.authorization;

        const incident = await connection('incident').where('id', id).select('ngo_id').first();
        if (incident.ngo_id !== ngo_id){
            return response.status(401).json( { error: 'Access denied'} );
        }
        await connection('incident').where('id', id).delete();
        return response.status(204).send();
    }
};