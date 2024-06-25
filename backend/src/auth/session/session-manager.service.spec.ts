import { Test, TestingModule } from '@nestjs/testing';
import { SessionManagerService } from './session-manager.service';
import { RedisService } from '@database/redis/redis.service';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('SessionManagerService', () => {
  let service: SessionManagerService;
  let redisService: jest.Mocked<RedisService>;

  const mockRedisService = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    keys: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionManagerService,
        { provide: RedisService, useValue: mockRedisService },
      ],
    }).compile();

    service = module.get<SessionManagerService>(SessionManagerService);
    redisService = module.get<RedisService>(RedisService) as jest.Mocked<RedisService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSession', () => {
    it('should create a session', async () => {
      const user: User = { id: '1', email: 'test@example.com', password: 'hashedpassword' };
      const token = 'generated-token';
      (uuidv4 as jest.Mock).mockReturnValue(token);
      const expiryDuration = 60 * 60 * 1000; // 1 hour

      await service.createSession(user);

      expect(uuidv4).toHaveBeenCalled();
      
      expect(redisService.set).toHaveBeenCalledWith(
        token,
        expect.any(String),
        // JSON.stringify({ user, expiry: expect.any(Number) }), 
        // JSON.stringify({ user, expiry: expect.any(Number) }),
        expect.any(Number),
      );
    });
  });

  describe('getAllSessions', () => {
    it('should return the number of all sessions', async () => {
      redisService.keys.mockResolvedValue(['session1', 'session2', 'session3']);
      const sessionCount = await service.getAllSessions();
      expect(sessionCount).toBe(3);
    });
  });

  describe('getSession', () => {
    it('should return the user if the session is valid', async () => {
      const user: User = { id: '1', email: 'test@example.com', password: 'hashedpassword' };
      const session = { user, expiry: Date.now() + 10000 };
      redisService.get.mockResolvedValue(JSON.stringify(session));

      const result = await service.getSession('valid-token');
      expect(result).toEqual(user);
    });

    it('should return null if the session has expired', async () => {
      const session = { user: { id: '1', email: 'test@example.com', password: 'hashedpassword' }, expiry: Date.now() - 10000 };
      redisService.get.mockResolvedValue(JSON.stringify(session));

      const result = await service.getSession('expired-token');
      expect(result).toBeNull();
      expect(redisService.del).toHaveBeenCalledWith('expired-token');
    });

    it('should return null if the session does not exist', async () => {
      redisService.get.mockResolvedValue(null);

      const result = await service.getSession('non-existent-token');
      expect(result).toBeNull();
    });
  });

  describe('removeSession', () => {
    it('should remove the session', async () => {
      await service.removeSession('valid-token');
      expect(redisService.del).toHaveBeenCalledWith('valid-token');
    });
  });
});
