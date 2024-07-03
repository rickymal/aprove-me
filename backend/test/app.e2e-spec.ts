import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { response } from 'express';
import exp from 'constants';

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
  let httpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
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

  it('should select the test and return the questions', async () => {
    const response = await request(app.getHttpServer())
      .get("/integration/question/by?testId=da5219a6-1c8e-4b4c-a089-b4ac5a8300bc")
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

    expect(response.body).toEqual([{ "answers": [{ "answer_text": "opção 1", "created_at": "2024-06-20T01:59:41.730Z", "id": "89af43d5-896b-4d1e-a653-94decd0afd4c", "is_correct": true, "question_id": "9c331dd6-0a03-4a31-83e3-f257b5e5f54a", "updated_at": "2024-06-20T01:59:41.730Z" }, { "answer_text": "opção 2", "created_at": "2024-06-20T01:59:41.730Z", "id": "fb932bd8-daa4-4ad9-a478-945594e3919e", "is_correct": true, "question_id": "9c331dd6-0a03-4a31-83e3-f257b5e5f54a", "updated_at": "2024-06-20T01:59:41.730Z" }, { "answer_text": "opção 3", "created_at": "2024-06-20T01:59:41.730Z", "id": "4bec311b-cdcf-4b51-ab84-14f8518003e7", "is_correct": false, "question_id": "9c331dd6-0a03-4a31-83e3-f257b5e5f54a", "updated_at": "2024-06-20T01:59:41.730Z" }], "question": { "created_at": "2024-06-20T01:59:41.730Z", "id": "9c331dd6-0a03-4a31-83e3-f257b5e5f54a", "question_text": "Example 1", "test_id": "da5219a6-1c8e-4b4c-a089-b4ac5a8300bc", "updated_at": "2024-06-20T01:59:41.730Z" } }, { "answers": [{ "answer_text": "opção 1", "created_at": "2024-06-20T02:00:52.380Z", "id": "705a4aec-b737-485d-b0b3-83f1fa4ecb23", "is_correct": true, "question_id": "3ce35365-d342-4f00-9c60-86092cbeee7e", "updated_at": "2024-06-20T02:00:52.380Z" }, { "answer_text": "opção 2", "created_at": "2024-06-20T02:00:52.380Z", "id": "451a4981-bb51-427c-96a9-9cff9467725a", "is_correct": false, "question_id": "3ce35365-d342-4f00-9c60-86092cbeee7e", "updated_at": "2024-06-20T02:00:52.380Z" }, { "answer_text": "opção 3", "created_at": "2024-06-20T02:00:52.380Z", "id": "1f5a801a-87d4-42fa-9ea9-7fb00f8eb645", "is_correct": false, "question_id": "3ce35365-d342-4f00-9c60-86092cbeee7e", "updated_at": "2024-06-20T02:00:52.380Z" }], "question": { "created_at": "2024-06-20T02:00:52.380Z", "id": "3ce35365-d342-4f00-9c60-86092cbeee7e", "question_text": "Example 2", "test_id": "da5219a6-1c8e-4b4c-a089-b4ac5a8300bc", "updated_at": "2024-06-20T02:00:52.380Z" } }, { "answers": [], "question": { "created_at": "2024-06-20T02:01:38.418Z", "id": "6cf7573c-8e41-4178-acd3-8ec3e9af244e", "question_text": "Example 4", "test_id": "da5219a6-1c8e-4b4c-a089-b4ac5a8300bc", "updated_at": "2024-06-20T02:01:38.418Z" } }])

    response.body.forEach(el => {
      expect(el).toMatchObject({
        answers: expect.any(Array),
        question: expect.any(Object)
      })
    })
    // oi
    // response.body.forEach(question => {
    //   expect(question).toMatchObject({
    //     id: expect.any(String),
    //     question_text: expect.any(String),
    //     test_id: expect.any(String),
    //     created_at: expect.any(String),
    //     updated_at: expect.any(String),
    //     answers: expect.any(Object)
    //   });   
    //   if (question.answers) {
    //     question.answers.forEach(answer => {
    //       expect(answer).toMatchObject({
    //         id: expect.any(String),
    //         answer_text: expect.any(String),
    //         is_correct: expect.any(Boolean),
    //         question_id: expect.any(String),
    //         created_at: expect.any(String),
    //         updated_at: expect.any(String)
    //       });
    //     });
    //   }
    // });
  });

  it.todo('should be capable of select an option and send');
  it.todo('should be capable of select multiples options and send');
  it.todo('should be capable of select multiples options as wrong and send');
  it.todo('should be capable of mark the test as finished and receive return');
  it.todo('should be capable of read an resume created by IA show the results');
});
