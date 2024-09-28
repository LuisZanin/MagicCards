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


  it('/cards (POST)', async () => {
    const newCard = {
      name: 'Card Example',
      description: 'This is a test card.',
      type: 'Creature',
    };

    const response = await request(app.getHttpServer())
      .post('/cards')
      .send(newCard)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toEqual(newCard.name);
  });


  it('/cards (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/cards')
      .expect(200); 

    expect(Array.isArray(response.body)).toBe(true);
  });

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

    const cardId = createResponse.body._id;

    await request(app.getHttpServer())
      .delete(`/cards/${cardId}`)
      .expect(200);
  });
});
