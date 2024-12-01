import {AppModule} from '../backend/src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { beforeEach, describe, it, afterAll, expect } from '@jest/globals';
import { performance } from 'perf_hooks';
import * as io from 'socket.io-client';  

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let socket: SocketIOClient.Socket;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    socket = io('http://localhost:3000');
  });

  afterAll(async () => {
    await app.close();
    socket.close();
  });

  it('/deck/import (POST) - should import a deck', async () => {
    const newDeck = {
      deckName: 'Deck to Import',
      commander: 'Commander Example',
      cards: ['Card1', 'Card2', 'Card3'],
    };

    const response = await request(app.getHttpServer())
      .post('/deck/import')
      .send(newDeck)
      .expect(202);

    expect(response.body.message).toBe('Importação iniciada.');
  });

  it('should notify when deck import is completed via WebSocket', (done) => {
    socket.on('deckUpdate', (data) => {
      expect(data.status).toBe('completed');
      expect(data.deckName).toBe('Deck to Import');
      done();
    });

    request(app.getHttpServer())
      .post('/deck/import')
      .send({
        deckName: 'Deck to Import',
        commander: 'Commander Example',
        cards: ['Card1', 'Card2'],
      })
      .expect(202);
  });

  it('should measure performance of deck import', async () => {
    const start = performance.now();
    await request(app.getHttpServer()).post('/deck/import').send({
      deckName: 'Test Deck for Performance',
      commander: 'Commander Performance',
      cards: ['Card1', 'Card2'],
    });
    const end = performance.now();
    console.log(`Importação de deck levou ${end - start} ms`);
    expect(end - start).toBeLessThan(2000); 
  });
});
