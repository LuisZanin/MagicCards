/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { beforeEach, describe, it, afterAll } from '@jest/globals'; 

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Teste para criar um card
  it('/cards (POST)', async () => {
    const newCard = {
      name: 'Card Example',
      description: 'This is a test card.',
      type: 'Creature',
    };

    const response = await request(app.getHttpServer())
      .post('/cards')
      .send(newCard)
      .expect(201); // Espera que o status seja 201 (Created)

    expect(response.body).toHaveProperty('_id'); // Verifica se o ID foi gerado
    expect(response.body.name).toEqual(newCard.name); // Verifica se o nome está correto
  });

  // Teste para listar cards
  it('/cards (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards')
      .expect(200); // Espera que o status seja 200 (OK)

    expect(Array.isArray(response.body)).toBe(true); // Verifica se a resposta é um array
  });

  // Teste para excluir um card
  it('/cards/:id (DELETE)', async () => {
    const newCard = {
      name: 'Card to Delete',
      description: 'This card will be deleted.',
      type: 'Sorcery',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/cards')
      .send(newCard)
      .expect(201);

    const cardId = createResponse.body._id; // Captura o ID do card criado

    await request(app.getHttpServer())
      .delete(`/cards/${cardId}`)
      .expect(200); // Espera que o status seja 200 (OK)
  });
});
