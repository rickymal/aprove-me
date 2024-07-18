import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateStudentQuestionDto } from '@integration/student-question/dto/create-student-question.dto';
import { connect } from 'http2';

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
    expect(response.body).toEqual([
      { id: expect.any(String), name: expect.any(String) },
    ]);
  });

  it('should select the test and return the questions', async () => {
    const response = await request(app.getHttpServer())
      .get(
        '/integration/question/by?testId=11816117-2582-4322-80e9-4303c8a9b13f',
      )
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);

    response.body.forEach((el) => {
      expect(el.answers).toBeInstanceOf(Array);
      el.answers.forEach((answer) => {
        expect(answer).toEqual({
          answer_text: expect.any(String),
          created_at: expect.any(String),
          id: expect.any(String),
          is_correct: expect.any(Boolean),
          question_id: expect.any(String),
          updated_at: expect.any(String),
        });
      });

      expect(el.question).not.toBe(null);
    });
  });

  // exploit: é possível que um usuário possa marcar mais de uma resposta mesmo que a questão exiga apenas uma
  it('should be capable of select an option and send', async () => {
    const body: CreateStudentQuestionDto = {
      question: {
        connect: {
          id: 'b3ed26d0-3439-435b-8d33-913190ce47de',
        },
      },
      marked_answers: [
        {
          id: '9012e9a4-79f5-43a3-bcb3-e0c97e5b5bba',
          is_correct: true,
        },
      ],
      student: {
        connect: {
          id: '38f2be71-a882-4fff-baf6-4d11b33fab4e',
        },
      },
    };

    const response = await request(app.getHttpServer())
      .post('/integration/student-question/')
      .send(body)
      .expect(201);

    expect(response.body).toMatchObject({ status: 'created' });
  });

  /**
   * Um outro problema que percebi é que a questão pode ter restrição de quantidade de resspostas.
   * Onde isso seria tratado? (pensar nisso)
   * @todo: pensar nisso
   */
  it.only('should be capable of select multiples options and send', async () => {
    const body: CreateStudentQuestionDto = {
      question: {
        connect: {
          id: 'c3ed26d0-3439-435b-8d33-913190ce47de',
        },
      },
      marked_answers: [
        { id: 'ccb4c804-7178-4aae-82fc-feb5d7309d5c', is_correct: true },
        { id: '41eff63d-71e8-4b77-9109-c783a341d848', is_correct: true },
      ],
      student: {
        connect: {
          id: '38f2be71-a882-4fff-baf6-4d11b33fab4e',
        },
      },
    };

    const response = await request(app.getHttpServer())
      .post('/integration/student-question/')
      .send(body)
      .expect(201);

    expect(response.body).toMatchObject({ status: 'created' });
  });

  it('should be capable of select one or more options as wrong and send', async () => {
    const body = {
      question: {
        connect: {
          id: 'c3ed26d0-3439-435b-8d33-913190ce47de',
        },
      },
      marked_answers: [
        { id: 'c3ed26d0-3439-435b-8d33-913190ce47de', is_correct: false },
        { id: '41eff63d-71e8-4b77-9109-c783a341d848', is_correct: false },
      ],
    };

    const response = await request(app.getHttpServer())
      .post('/integration/student-question/')
      .send(body)
      .expect(201);

    expect(response.body).toMatchObject({ status: 'created' });
  });

  // TODO
  it.todo('should be capable of read an resume created by IA show the results');
});
