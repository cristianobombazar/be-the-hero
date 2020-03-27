const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('NGO', () => {
  beforeEach( async () =>{
      await connection.migrate.rollback();
      await connection.migrate.latest();
  });

  afterAll( async () => {
    await connection.destroy();
  });

  it('Should be able to create a new NGO', async () => {
      const response = await request(app)
      .post("/ngo")
      .send({
        name: "APAD",
        email: "contato@apad.com.br",
        whatsapp: "48996779763",
        city: "São Ludgero",
        uf: "SC"
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);

  });
})