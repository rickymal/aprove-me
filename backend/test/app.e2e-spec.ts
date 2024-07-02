import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe.only('User journey', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should load all test names', async () => {
    const response = await request(app.getHttpServer())
      .get('/test-question/names')
      .expect(200);
    expect(response.body).toEqual(
      [{"id": "da5219a6-1c8e-4b4c-a089-b4ac5a8300bc", "name": "Prova 1"}, {"id": "ga5219a6-1c8e-4b4c-a089-b4ac5a8300bc", "name": "Prova 2"}, {"id": "fa5219a6-1c8e-4b4c-a089-b4ac5a8300bc", "name": "Prova 3"}, {"id": "ea5219a6-1c8e-4b4c-a089-b4ac5a8300bc", "name": "Prova 4"}]
    );
  });

  it.todo('should select the test and return the questions');
  it.todo('should be capable of select an option and send');
  it.todo('should be capable of select multiples options and send');
  it.todo('should be capable of select multiples options as wrong and send');
  it.todo('should be capable of mark the test as finished and receive return');
  it.todo('should be capable of read an resume created by IA show the results');
});
