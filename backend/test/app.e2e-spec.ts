import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '@database/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockedPrismaService : PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(PrismaService).useValue({}).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

});

describe.only("User journey", () => {
  it.todo('should load all test names')
  it.todo('should select the test and return the questions')
  it.todo('should be capable of select an option and send')
  it.todo('should be capable of select multiples options and send')
  it.todo('should be capable of select multiples options as wrong and send')
  it.todo('should be capable of mark the test as finished and receive return')
  it.todo('should be capable of read an resume created by IA show the results')
})
