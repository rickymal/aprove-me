import { Test } from "@nestjs/testing";
import { AuthService, UserRepository } from "./auth.service";
import { SessionManagerService } from "./session/session-manager.service";
import { RedisService } from "@database/redis/redis.service";
import { User } from "@prisma/client";
import { createHmac, randomBytes, pbkdf2Sync } from 'crypto';


jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe("registration service", () => {
  let authService: AuthService;

  const mockedUserRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    findOneByEmail: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockedRedisService = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    keys: jest.fn(),
  };

  const mockedSessionManagerService = {
    createSession: jest.fn(),
  };


  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useValue: mockedUserRepository },
        { provide: SessionManagerService, useValue: mockedSessionManagerService },
        { provide: RedisService, useValue: mockedRedisService },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be capable to register an user', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const token = 'generated-token';

    const id = '1';
    const user: User = { id, email, password: 'hashedpassword' };

    mockedUserRepository.findOneByEmail.mockResolvedValue(null);
    mockedUserRepository.create.mockResolvedValue(user);
    mockedSessionManagerService.createSession.mockResolvedValue(token);

    const response = await authService.register(email, password);

    expect(mockedUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
    expect(mockedUserRepository.create).toHaveBeenCalledWith({
      email,
      password: expect.any(String),
    });
    expect(mockedSessionManagerService.createSession).toHaveBeenCalledWith(user);
    expect(response).toEqual({ id, email, token });
  });


  
  it('should not be capable to register an user if already exists', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const token = 'generated-token';

    const id = '1';
    const user: User = { id, email, password: 'hashedpassword' };

    mockedUserRepository.findOneByEmail.mockResolvedValue(true);
    mockedUserRepository.create.mockResolvedValue(user);
    mockedSessionManagerService.createSession.mockResolvedValue(token);

    expect(authService.register(email, password)).rejects.toThrow(new Error("User already exists"));
  });
});
